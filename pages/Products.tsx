import {
  AlertCircle,
  ChevronRight,
  Filter,
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  X,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

const Products: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { products, categories, loading, error } = useProducts()

  const searchParams = new URLSearchParams(location.search)
  const initialCategory = searchParams.get('category') || 'All'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category')
    setSelectedCategory(category || 'All')
  }, [location.search])

  const handleCategoryChange = (catName: string) => {
    if (catName === 'All') navigate('/products')
    else navigate(`/products?category=${encodeURIComponent(catName)}`)
    setMobileFiltersOpen(false)
  }

  const filteredProducts =
    selectedCategory === 'All' ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Hero Header */}
      <div className="relative bg-slate-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0f172a_0%,#020617_100%)]"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-900/50 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 mr-2 text-brand-400" /> Premium Equipment
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Professional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                Ophthalmic Catalogue
              </span>
            </h1>
            <p className="text-slate-400 text-lg font-light max-w-2xl leading-relaxed">
              Discover our range of high-precision diagnostic and surgical instruments designed to
              elevate your practice.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Filter className="w-4 h-4 text-brand-500" /> Categories
                </h3>
              </div>
              <div className="p-3 space-y-1">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                    selectedCategory === 'All'
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                  }`}
                >
                  <span className="flex items-center">
                    <Tag
                      className={`w-4 h-4 mr-3 transition-colors ${selectedCategory === 'All' ? 'text-brand-200' : 'text-slate-400 group-hover:text-brand-500'}`}
                    />
                    All Products
                  </span>
                  {selectedCategory === 'All' && <ChevronRight className="w-4 h-4" />}
                </button>
                {loading ? (
                  <div className="px-4 py-3 text-slate-400 text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                  </div>
                ) : (
                  categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === cat.name
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                      }`}
                    >
                      <span className="flex items-center">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-4 transition-colors ${selectedCategory === cat.name ? 'bg-white' : 'bg-slate-300 group-hover:bg-brand-500'}`}
                        ></span>
                        {cat.name}
                      </span>
                      {selectedCategory === cat.name && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Browsing
                </span>
                <span className="font-bold text-brand-900 text-lg leading-none">
                  {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                </span>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="bg-brand-50 text-brand-700 px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-brand-100 transition-colors border border-brand-100"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 hidden md:block">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <span className="text-sm text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-200">
                {loading ? (
                  '…'
                ) : (
                  <>
                    <span className="text-brand-600 font-bold">{filteredProducts.length}</span>{' '}
                    items
                  </>
                )}
              </span>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <p className="font-semibold text-red-700">Failed to load products</p>
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden animate-pulse"
                  >
                    <div className="h-72 bg-slate-100" />
                    <div className="p-8 space-y-3">
                      <div className="h-3 bg-slate-100 rounded w-1/3" />
                      <div className="h-6 bg-slate-100 rounded w-2/3" />
                      <div className="h-4 bg-slate-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-20 text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No products found</h3>
                <p className="text-slate-500 mb-8 text-lg">
                  We couldn't find any items in this category.
                </p>
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="px-8 py-3 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Filter Products</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto flex-1">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all ${selectedCategory === 'All' ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all ${selectedCategory === cat.name ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
