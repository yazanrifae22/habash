import { GripVertical, Loader2, Plus, Trash2, Upload, X } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import { adminFetch, useAdminAuth } from './AdminAuthContext'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || ''

interface Category {
  id: string
  name: string
}
interface UploadedImage {
  url: string
  r2_key: string
  preview: string
}

interface ProductFormData {
  id: string
  model: string
  brand: string
  category_id: string
  short_description: string
  full_description: string
  features: string[]
  images: UploadedImage[]
}

interface ProductFormProps {
  categories: Category[]
  initial?: Partial<ProductFormData & { existingImages?: UploadedImage[] }>
  onSave: () => void
  onClose: () => void
}

const emptyForm = (): ProductFormData => ({
  id: '',
  model: '',
  brand: '',
  category_id: '',
  short_description: '',
  full_description: '',
  features: [''],
  images: [],
})

const ProductForm: React.FC<ProductFormProps> = ({ categories, initial, onSave, onClose }) => {
  const { token } = useAdminAuth()
  const [form, setForm] = useState<ProductFormData>(() => ({
    ...emptyForm(),
    ...initial,
    features: initial?.features?.length ? initial.features : [''],
    images: initial?.existingImages || [],
  }))
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const isEdit = !!initial?.id

  const set = (key: keyof ProductFormData, val: any) => setForm((f) => ({ ...f, [key]: val }))

  // ─── Image Upload ──────────────────────────────────────────────────────────
  const uploadFiles = useCallback(
    async (files: File[]) => {
      setUploading(true)
      setError('')
      try {
        const results = await Promise.all(
          files.map(async (file) => {
            const fd = new FormData()
            fd.append('file', file)
            const res = await adminFetch(token!, '/api/upload', { method: 'POST', body: fd })
            if (!res.ok) throw new Error('Upload failed')
            const { url, r2_key } = (await res.json()) as { url: string; r2_key: string }
            return { url, r2_key, preview: url }
          }),
        )
        setForm((f) => ({ ...f, images: [...f.images, ...results] }))
      } catch (e: any) {
        setError(e.message || 'Upload failed')
      } finally {
        setUploading(false)
      }
    },
    [token],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(Array.from(e.target.files))
      e.target.value = ''
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    if (files.length) uploadFiles(files)
  }

  const removeImage = async (index: number) => {
    const img = form.images[index]
    // Optionally delete from R2 (fire and forget — not critical if it fails)
    if (img.r2_key) {
      adminFetch(token!, `/api/upload/${encodeURIComponent(img.r2_key)}`, {
        method: 'DELETE',
      }).catch(() => {})
    }
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
  }

  // ─── Features ─────────────────────────────────────────────────────────────
  const updateFeature = (i: number, val: string) => {
    const feats = [...form.features]
    feats[i] = val
    set('features', feats)
  }
  const addFeature = () => set('features', [...form.features, ''])
  const removeFeature = (i: number) =>
    set(
      'features',
      form.features.filter((_, idx) => idx !== i),
    )

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.model || !form.brand || !form.category_id) {
      setError('Model, brand, and category are required.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        features: form.features.filter(Boolean),
        images: form.images.map(({ url, r2_key }) => ({ url, r2_key })),
      }
      const path = isEdit ? `/api/products/${form.id}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await adminFetch(token!, path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = (await res.json()) as { error: string }
        throw new Error(err.error)
      }
      onSave()
    } catch (e: any) {
      setError(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Row 1: Model + Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Model Name *</label>
              <input
                className="input"
                value={form.model}
                onChange={(e) => set('model', e.target.value)}
                placeholder="e.g. Acriva UD 613"
                required
              />
            </div>
            <div>
              <label className="label">Brand *</label>
              <input
                className="input"
                value={form.brand}
                onChange={(e) => set('brand', e.target.value)}
                placeholder="e.g. VSY Biotechnology"
                required
              />
            </div>
          </div>

          {/* Row 2: Category + ID */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category *</label>
              <select
                className="input"
                value={form.category_id}
                onChange={(e) => set('category_id', e.target.value)}
                required
              >
                <option value="">Select category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Product ID (slug)</label>
              <input
                className="input font-mono text-sm"
                value={form.id}
                onChange={(e) =>
                  set('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
                }
                placeholder="auto-generated from model"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="label">Short Description (card view)</label>
            <input
              className="input"
              value={form.short_description}
              onChange={(e) => set('short_description', e.target.value)}
              placeholder="Brief 1-liner for product cards"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="label">Full Description (detail page)</label>
            <textarea
              className="input resize-none"
              rows={3}
              value={form.full_description}
              onChange={(e) => set('full_description', e.target.value)}
              placeholder="Longer description shown on the product detail page (optional)"
            />
          </div>

          {/* Features */}
          <div>
            <label className="label">Key Features</label>
            <div className="space-y-2">
              {form.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <input
                    className="input flex-1"
                    value={feat}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 text-brand-600 text-sm font-semibold hover:text-brand-700 mt-1"
              >
                <Plus className="w-4 h-4" /> Add Feature
              </button>
            </div>
          </div>

          {/* Image Uploader */}
          <div>
            <label className="label">Product Images</label>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                  <p className="text-slate-500 text-sm">Uploading to Cloudflare R2…</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-slate-400" />
                  <p className="text-slate-600 text-sm font-medium">
                    Drop images here or <span className="text-brand-600">browse</span>
                  </p>
                  <p className="text-slate-400 text-xs">JPG, PNG, WebP supported</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />

            {/* Image Previews */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {form.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={img.preview || img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-brand-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        MAIN
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit as any}
            disabled={saving || uploading}
            className="px-8 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-brand-500/20"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Tailwind utility classes used as strings — keep in global CSS */}
      <style>{`
        .label { display: block; font-size: 0.75rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.375rem; }
        .input { width: 100%; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 0.625rem 0.875rem; font-size: 0.875rem; color: #0f172a; outline: none; transition: border-color 0.15s; }
        .input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
      `}</style>
    </div>
  )
}

export default ProductForm
