import {
  AlertCircle,
  Edit2,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Tag,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminFetch, useAdminAuth } from './AdminAuthContext'
import ProductForm from './ProductForm'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || ''

interface Category {
  id: string
  name: string
  description: string
  image_url?: string
}
interface Product {
  id: string
  model: string
  brand: string
  category: string
  short_description: string
  features: string[]
  images: string[]
}

interface CatFormState {
  open: boolean
  editing?: string
  id: string
  name: string
  description: string
  image_url: string
  imagePreview: string
  imageUploading: boolean
}

const emptyForm = (): CatFormState => ({
  open: false,
  id: '',
  name: '',
  description: '',
  image_url: '',
  imagePreview: '',
  imageUploading: false,
})

const AdminDashboard: React.FC = () => {
  const { token, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'products' | 'categories'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [productForm, setProductForm] = useState<{ open: boolean; product?: Product }>({
    open: false,
  })
  const [catForm, setCatForm] = useState<CatFormState>(emptyForm())
  const [catSaving, setCatSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const catImageRef = useRef<HTMLInputElement>(null)

  // ── Load all data ───────────────────────────────────────────────────────────
  const loadAll = async () => {
    setLoading(true)
    setError('')
    try {
      const [prodsRes, catsRes] = await Promise.all([
        fetch(`${WORKER_URL}/api/products`),
        fetch(`${WORKER_URL}/api/categories`),
      ])
      setProducts(await prodsRes.json())
      setCategories(await catsRes.json())
    } catch {
      setError('Failed to load data. Check Worker URL in .env.local')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadAll()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  // ── Delete Product ──────────────────────────────────────────────────────────
  const deleteProduct = async (id: string) => {
    try {
      await adminFetch(token!, `/api/products/${id}`, { method: 'DELETE' })
      setProducts((p) => p.filter((x) => x.id !== id))
      setDeleteConfirm(null)
    } catch {
      setError('Delete failed')
    }
  }

  // ── Category image upload ───────────────────────────────────────────────────
  const uploadCatImage = async (file: File) => {
    setCatForm((f) => ({ ...f, imageUploading: true }))
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await adminFetch(token!, '/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = (await res.json()) as { url: string; r2_key: string }
      setCatForm((f) => ({ ...f, image_url: url, imagePreview: url, imageUploading: false }))
    } catch {
      setCatForm((f) => ({ ...f, imageUploading: false }))
      setError('Image upload failed')
    }
  }

  const handleCatImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadCatImage(file)
      e.target.value = ''
    }
  }

  const handleCatImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith('image/'))
    if (file) uploadCatImage(file)
  }

  // ── Open category form ──────────────────────────────────────────────────────
  const openCatForm = (cat?: Category) => {
    setCatForm({
      open: true,
      editing: cat?.id,
      id: cat?.id || '',
      name: cat?.name || '',
      description: cat?.description || '',
      image_url: cat?.image_url || '',
      imagePreview: cat?.image_url || '',
      imageUploading: false,
    })
  }

  // ── Save category ───────────────────────────────────────────────────────────
  const saveCat = async (e: React.FormEvent) => {
    e.preventDefault()
    setCatSaving(true)
    try {
      const payload = {
        name: catForm.name,
        description: catForm.description,
        image_url: catForm.image_url,
      }
      if (catForm.editing) {
        await adminFetch(token!, `/api/categories/${catForm.editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await adminFetch(token!, '/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: catForm.id, ...payload }),
        })
      }
      setCatForm(emptyForm())
      loadAll()
    } catch {
      setError('Save failed')
    } finally {
      setCatSaving(false)
    }
  }

  const deleteCat = async (id: string) => {
    if (!window.confirm('Delete this category? Products in it will be unlinked.')) return
    await adminFetch(token!, `/api/categories/${id}`, { method: 'DELETE' })
    loadAll()
  }

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]))

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Top Bar */}
      <header className="bg-slate-950 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-sm font-black">
              H
            </div>
            <div>
              <span className="font-bold text-white">Habash Med</span>
              <span className="text-slate-500 text-xs ml-2">Super Admin</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Total Products',
              value: products.length,
              icon: Package,
              color: 'bg-brand-50 text-brand-600',
            },
            {
              label: 'Categories',
              value: categories.length,
              icon: Tag,
              color: 'bg-emerald-50 text-emerald-600',
            },
            {
              label: 'With Images',
              value: products.filter((p) => p.images?.length > 0).length,
              icon: ImageIcon,
              color: 'bg-violet-50 text-violet-600',
            },
            {
              label: 'No Images',
              value: products.filter((p) => !p.images?.length).length,
              icon: AlertCircle,
              color: 'bg-orange-50 text-orange-600',
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div
                className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">{value}</div>
              <div className="text-slate-500 text-xs font-semibold mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            <button onClick={() => setError('')} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100">
            {(['products', 'categories'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 px-6 py-4 text-sm font-bold capitalize transition-all flex items-center justify-center gap-2 ${tab === t ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                {t === 'products' ? <Package className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
                {t} ({t === 'products' ? products.length : categories.length})
              </button>
            ))}
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
              </div>
            ) : tab === 'products' ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-slate-900">All Products</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={loadAll}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setProductForm({ open: true })}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-brand-500/20 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-bold">Image</th>
                        <th className="text-left px-4 py-3 font-bold">Model</th>
                        <th className="text-left px-4 py-3 font-bold">Brand</th>
                        <th className="text-left px-4 py-3 font-bold">Category</th>
                        <th className="text-left px-4 py-3 font-bold">Images</th>
                        <th className="text-right px-4 py-3 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3">
                            {p.images?.[0] ? (
                              <img
                                src={p.images[0]}
                                alt={p.model}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-slate-300" />
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900">{p.model}</td>
                          <td className="px-4 py-3 text-slate-600">{p.brand}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
                              {p.category || catMap[p.category] || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {p.images?.length || 0} image{p.images?.length !== 1 ? 's' : ''}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setProductForm({ open: true, product: p })}
                                className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              {deleteConfirm === p.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-3 py-1.5 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(p.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {products.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                      <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="font-semibold">No products yet</p>
                      <p className="text-xs mt-1">Click "Add Product" to get started</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Categories toolbar */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-slate-900">All Categories</h2>
                  <button
                    onClick={() => openCatForm()}
                    className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-brand-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                </div>

                {/* ── Category inline form ── */}
                {catForm.open && (
                  <form
                    onSubmit={saveCat}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6"
                  >
                    <h3 className="font-bold text-slate-800 mb-5 text-lg">
                      {catForm.editing ? 'Edit Category' : 'New Category'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left — Fields */}
                      <div className="space-y-4">
                        {!catForm.editing && (
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                              Slug (ID) *
                            </label>
                            <input
                              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono outline-none focus:border-brand-500 bg-white"
                              value={catForm.id}
                              onChange={(e) =>
                                setCatForm((f) => ({
                                  ...f,
                                  id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                                }))
                              }
                              placeholder="e.g. iols"
                              required
                            />
                          </div>
                        )}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                            Name *
                          </label>
                          <input
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 bg-white"
                            value={catForm.name}
                            onChange={(e) => setCatForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="e.g. Intraocular Lenses (IOLs)"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                            Description
                          </label>
                          <textarea
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 bg-white resize-none"
                            rows={3}
                            value={catForm.description}
                            onChange={(e) =>
                              setCatForm((f) => ({ ...f, description: e.target.value }))
                            }
                            placeholder="Brief description shown on category cards"
                          />
                        </div>
                      </div>

                      {/* Right — Image Upload */}
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                          Category Image
                        </label>

                        {catForm.imagePreview ? (
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 group">
                            <img
                              src={catForm.imagePreview}
                              alt="Category preview"
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay to change */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => catImageRef.current?.click()}
                                className="px-4 py-2 bg-white text-slate-800 font-bold text-xs rounded-lg flex items-center gap-2"
                              >
                                <Upload className="w-3 h-3" /> Change
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setCatForm((f) => ({ ...f, image_url: '', imagePreview: '' }))
                                }
                                className="px-4 py-2 bg-red-500 text-white font-bold text-xs rounded-lg flex items-center gap-2"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                            {catForm.imageUploading && (
                              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleCatImageDrop}
                            onClick={() => catImageRef.current?.click()}
                            className="border-2 border-dashed border-slate-200 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-400 hover:bg-brand-50/50 transition-all"
                          >
                            {catForm.imageUploading ? (
                              <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                            ) : (
                              <>
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                  <ImageIcon className="w-6 h-6 text-slate-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-slate-600">
                                    Drop image here
                                  </p>
                                  <p className="text-xs text-slate-400 mt-0.5">
                                    or click to browse • JPG, PNG, WebP
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        <input
                          ref={catImageRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCatImageFile}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-5">
                      <button
                        type="submit"
                        disabled={catSaving || catForm.imageUploading}
                        className="bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-brand-500/20"
                      >
                        {catSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                        {catForm.editing ? 'Save Changes' : 'Create Category'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCatForm(emptyForm())}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Categories list */}
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-4 bg-slate-50 hover:bg-white px-5 py-4 rounded-2xl border border-slate-100 transition-colors"
                    >
                      {/* Category image thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-100">
                        {cat.image_url ? (
                          <img
                            src={cat.image_url}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-slate-900">{cat.name}</span>
                        <span className="ml-2 text-slate-400 font-mono text-xs bg-slate-200 px-2 py-0.5 rounded-full">
                          #{cat.id}
                        </span>
                        {cat.description && (
                          <p className="text-slate-500 text-xs mt-1 truncate">{cat.description}</p>
                        )}
                        {!cat.image_url && (
                          <span className="inline-block mt-1 text-xs text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full">
                            No image — add one to show on Home page
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-slate-400 font-medium">
                          {products.filter((p) => p.category === cat.name).length} products
                        </span>
                        <button
                          onClick={() => openCatForm(cat)}
                          className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCat(cat.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                      <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="font-semibold">No categories yet</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {productForm.open && (
        <ProductForm
          categories={categories}
          initial={
            productForm.product
              ? {
                  ...productForm.product,
                  category_id:
                    categories.find((c) => c.name === productForm.product!.category)?.id || '',
                  existingImages: productForm.product.images.map((url) => ({
                    url,
                    r2_key: '',
                    preview: url,
                  })),
                }
              : undefined
          }
          onSave={() => {
            setProductForm({ open: false })
            loadAll()
          }}
          onClose={() => setProductForm({ open: false })}
        />
      )}
    </div>
  )
}

export default AdminDashboard
