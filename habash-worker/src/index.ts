/**
 * Habash Med — Cloudflare Worker API
 * Handles: Admin Auth, Products CRUD, Categories CRUD, R2 Image Upload
 */

export interface Env {
  DB: D1Database
  IMAGES: R2Bucket
  R2_PUBLIC_URL: string
  ADMIN_PASSWORD: string
  JWT_SECRET: string
}

// ─── CORS ────────────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

function corsResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

function errorResponse(message: string, status = 400): Response {
  return corsResponse({ error: message }, status)
}

// ─── JWT (Web Crypto) ─────────────────────────────────────────────────────────

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

function base64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

async function signJWT(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const body = base64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key = await getKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${header}.${body}`))
  return `${header}.${body}.${base64url(sig)}`
}

async function verifyJWT(token: string, secret: string): Promise<Record<string, unknown> | null> {
  try {
    const [header, body, sig] = token.split('.')
    if (!header || !body || !sig) return null
    const key = await getKey(secret)
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)),
      new TextEncoder().encode(`${header}.${body}`),
    )
    if (!valid) return null
    const payload = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

async function requireAuth(request: Request, env: Env): Promise<Response | null> {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return errorResponse('Unauthorized', 401)
  const token = authHeader.slice(7)
  const payload = await verifyJWT(token, env.JWT_SECRET)
  if (!payload) return errorResponse('Invalid or expired token', 401)
  return null // OK
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getProductWithImages(env: Env, productId: string) {
  const product = await env.DB.prepare('SELECT * FROM products WHERE id = ?')
    .bind(productId)
    .first()
  if (!product) return null
  const images = await env.DB.prepare(
    'SELECT url, r2_key, sort_order FROM product_images WHERE product_id = ? ORDER BY sort_order ASC',
  )
    .bind(productId)
    .all()
  return {
    ...product,
    features: JSON.parse((product.features as string) || '[]'),
    images: images.results.map((i: any) => i.url),
  }
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    // ── /api/admin/login ──────────────────────────────────────────────────────
    if (path === '/api/admin/login' && method === 'POST') {
      const body = (await request.json()) as { password?: string }
      if (body.password !== env.ADMIN_PASSWORD) {
        return errorResponse('Invalid password', 401)
      }
      const token = await signJWT(
        { role: 'admin', exp: Math.floor(Date.now() / 1000) + 8 * 3600 },
        env.JWT_SECRET,
      )
      return corsResponse({ token })
    }

    // ── /api/admin/verify ─────────────────────────────────────────────────────
    if (path === '/api/admin/verify' && method === 'GET') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      return corsResponse({ valid: true })
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CATEGORIES
    // ═══════════════════════════════════════════════════════════════════════════

    // GET /api/categories — public
    if (path === '/api/categories' && method === 'GET') {
      const result = await env.DB.prepare('SELECT * FROM categories ORDER BY name ASC').all()
      return corsResponse(result.results)
    }

    // POST /api/categories — admin
    if (path === '/api/categories' && method === 'POST') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      const body = (await request.json()) as {
        id?: string
        name: string
        description?: string
        image_url?: string
      }
      if (!body.name) return errorResponse('name is required')
      const id = body.id || slugify(body.name)
      await env.DB.prepare(
        'INSERT INTO categories (id, name, description, image_url) VALUES (?, ?, ?, ?)',
      )
        .bind(id, body.name, body.description || '', body.image_url || '')
        .run()
      return corsResponse({ id, name: body.name }, 201)
    }

    // PUT /api/categories/:id — admin
    const catEditMatch = path.match(/^\/api\/categories\/([^/]+)$/)
    if (catEditMatch && (method === 'PUT' || method === 'DELETE')) {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      const catId = catEditMatch[1]
      if (method === 'DELETE') {
        await env.DB.prepare('DELETE FROM categories WHERE id = ?').bind(catId).run()
        return corsResponse({ success: true })
      }
      const body = (await request.json()) as {
        name?: string
        description?: string
        image_url?: string
      }
      // Build update dynamically so clearing image_url to '' is respected
      await env.DB.prepare(
        'UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description), image_url = ? WHERE id = ?',
      )
        .bind(body.name ?? null, body.description ?? null, body.image_url ?? null, catId)
        .run()
      return corsResponse({ success: true })
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PRODUCTS
    // ═══════════════════════════════════════════════════════════════════════════

    // GET /api/products — public (returns all products with their images)
    if (path === '/api/products' && method === 'GET') {
      const categoryFilter = url.searchParams.get('category')
      let query =
        'SELECT p.*, c.name as category FROM products p LEFT JOIN categories c ON p.category_id = c.id'
      const bindings: string[] = []
      if (categoryFilter) {
        query += ' WHERE c.id = ? OR c.name = ?'
        bindings.push(categoryFilter, categoryFilter)
      }
      query += ' ORDER BY p.created_at DESC'
      const stmt = env.DB.prepare(query)
      const products = bindings.length ? await stmt.bind(...bindings).all() : await stmt.all()
      // Attach images for each product
      const result = await Promise.all(
        products.results.map(async (p: any) => {
          const imgs = await env.DB.prepare(
            'SELECT url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC',
          )
            .bind(p.id)
            .all()
          return {
            ...p,
            features: JSON.parse(p.features || '[]'),
            images: imgs.results.map((i: any) => i.url),
          }
        }),
      )
      return corsResponse(result)
    }

    // GET /api/products/:id — public
    const productGetMatch = path.match(/^\/api\/products\/([^/]+)$/)
    if (productGetMatch && method === 'GET') {
      const product = await getProductWithImages(env, productGetMatch[1])
      if (!product) return errorResponse('Product not found', 404)
      return corsResponse(product)
    }

    // POST /api/products — admin
    if (path === '/api/products' && method === 'POST') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      const body = (await request.json()) as {
        id?: string
        model: string
        brand: string
        category_id: string
        short_description?: string
        full_description?: string
        features?: string[]
        images?: Array<{ url: string; r2_key: string }>
      }
      if (!body.model || !body.brand || !body.category_id) {
        return errorResponse('model, brand and category_id are required')
      }
      const id = body.id || slugify(body.model)
      await env.DB.prepare(
        `INSERT INTO products (id, model, brand, category_id, short_description, full_description, features)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          id,
          body.model,
          body.brand,
          body.category_id,
          body.short_description || '',
          body.full_description || '',
          JSON.stringify(body.features || []),
        )
        .run()
      // Insert images
      if (body.images?.length) {
        for (let i = 0; i < body.images.length; i++) {
          const img = body.images[i]
          await env.DB.prepare(
            'INSERT INTO product_images (product_id, r2_key, url, sort_order) VALUES (?, ?, ?, ?)',
          )
            .bind(id, img.r2_key, img.url, i)
            .run()
        }
      }
      return corsResponse({ id }, 201)
    }

    // PUT /api/products/:id — admin
    const productEditMatch = path.match(/^\/api\/products\/([^/]+)$/)
    if (productEditMatch && method === 'PUT') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      const productId = productEditMatch[1]
      const body = (await request.json()) as {
        model?: string
        brand?: string
        category_id?: string
        short_description?: string
        full_description?: string
        features?: string[]
        images?: Array<{ url: string; r2_key: string }>
      }
      await env.DB.prepare(
        `UPDATE products SET
          model             = COALESCE(?, model),
          brand             = COALESCE(?, brand),
          category_id       = COALESCE(?, category_id),
          short_description = COALESCE(?, short_description),
          full_description  = COALESCE(?, full_description),
          features          = COALESCE(?, features),
          updated_at        = datetime('now')
         WHERE id = ?`,
      )
        .bind(
          body.model,
          body.brand,
          body.category_id,
          body.short_description,
          body.full_description,
          body.features ? JSON.stringify(body.features) : null,
          productId,
        )
        .run()
      // Replace images if provided
      if (body.images !== undefined) {
        await env.DB.prepare('DELETE FROM product_images WHERE product_id = ?')
          .bind(productId)
          .run()
        for (let i = 0; i < body.images.length; i++) {
          const img = body.images[i]
          await env.DB.prepare(
            'INSERT INTO product_images (product_id, r2_key, url, sort_order) VALUES (?, ?, ?, ?)',
          )
            .bind(productId, img.r2_key, img.url, i)
            .run()
        }
      }
      return corsResponse({ success: true })
    }

    // DELETE /api/products/:id — admin
    if (productEditMatch && method === 'DELETE') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      const productId = productEditMatch[1]
      // Get R2 keys to delete from bucket
      const imgRows = await env.DB.prepare('SELECT r2_key FROM product_images WHERE product_id = ?')
        .bind(productId)
        .all()
      // Delete from R2
      await Promise.all(imgRows.results.map((r: any) => env.IMAGES.delete(r.r2_key)))
      // Delete from DB (cascades to product_images)
      await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(productId).run()
      return corsResponse({ success: true })
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGE UPLOAD
    // ═══════════════════════════════════════════════════════════════════════════

    // POST /api/upload — admin — multipart/form-data with field "file"
    if (path === '/api/upload' && method === 'POST') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr

      const formData = await request.formData()
      const file = formData.get('file') as File | null
      if (!file) return errorResponse('No file provided')

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif']
      if (!allowed.includes(ext)) return errorResponse('File type not allowed')

      // unique key: products/timestamp-random.ext
      const key = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = await file.arrayBuffer()

      await env.IMAGES.put(key, buffer, {
        httpMetadata: { contentType: file.type || `image/${ext}` },
      })

      const publicUrl = `${env.R2_PUBLIC_URL}/${key}`
      return corsResponse({ url: publicUrl, r2_key: key }, 201)
    }

    // DELETE /api/upload/:key — admin — deletes a single image from R2
    const uploadDeleteMatch = path.match(/^\/api\/upload\/(.+)$/)
    if (uploadDeleteMatch && method === 'DELETE') {
      const authErr = await requireAuth(request, env)
      if (authErr) return authErr
      const key = decodeURIComponent(uploadDeleteMatch[1])
      await env.IMAGES.delete(key)
      return corsResponse({ success: true })
    }

    // ─── 404 ──────────────────────────────────────────────────────────────────
    return errorResponse('Not found', 404)
  },
}
