import { useEffect, useState } from 'react'
import { Category, Product } from '../types'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || ''

export interface UseProductsResult {
  products: Product[]
  categories: Category[]
  loading: boolean
  error: string | null
  reload: () => void
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([
      fetch(`${WORKER_URL}/api/products`).then((r) => {
        if (!r.ok) throw new Error('Failed to fetch products')
        return r.json()
      }),
      fetch(`${WORKER_URL}/api/categories`).then((r) => {
        if (!r.ok) throw new Error('Failed to fetch categories')
        return r.json()
      }),
    ])
      .then(([prods, cats]: [any[], any[]]) => {
        if (cancelled) return
        // Normalize API response to match the Product type the UI expects
        const normalized: Product[] = prods.map((p: any) => ({
          id: p.id,
          model: p.model,
          brand: p.brand,
          category: p.category || '', // Worker joins category name
          shortDescription: p.short_description || '',
          fullDescription: p.full_description || undefined,
          features: Array.isArray(p.features) ? p.features : [],
          images: Array.isArray(p.images) ? p.images : [],
        }))
        const normalizedCats: Category[] = cats.map((c: any) => ({
          id: c.id,
          name: c.name,
          description: c.description || '',
          imageUrl: c.image_url || '',
        }))
        setProducts(normalized)
        setCategories(normalizedCats)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [tick])

  return { products, categories, loading, error, reload: () => setTick((t) => t + 1) }
}
