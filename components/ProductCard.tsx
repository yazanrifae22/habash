import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.12)] transition-all duration-500 flex flex-col hover:-translate-y-2 h-full"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-slate-50 group-hover:bg-brand-50/30 transition-colors duration-500 p-8 flex items-center justify-center">
        
        {/* Background Pattern (Fades in on hover) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

        {/* Brand Badge */}
        <div className="absolute top-5 left-5 z-20">
             <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/60 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm group-hover:text-brand-600 group-hover:border-brand-200 transition-all duration-300">
                {product.brand}
             </span>
        </div>

        {/* Product Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <img
             src={product.images[0] || `https://picsum.photos/seed/${product.id}/500/400`}
             alt={product.model}
             className="max-h-full max-w-full object-contain transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-110 group-hover:-rotate-2 drop-shadow-sm group-hover:drop-shadow-xl"
           />
        </div>

        {/* Floating Action Button (Slides up on hover) */}
        <div className="absolute bottom-5 right-5 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)">
           <div className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:scale-105 transition-all">
              <Eye className="w-5 h-5" />
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow relative bg-white">
        {/* Category Indicator */}
        <div className="mb-3 flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-400 group-hover:bg-brand-600 transition-colors"></div>
           <span className="text-xs font-medium text-slate-400 uppercase tracking-wide group-hover:text-brand-500 transition-colors">
             {product.category.split(' ')[0]}
           </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors">
          {product.model}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-8 font-light">
          {product.shortDescription}
        </p>

        {/* Footer / Bottom Action */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between group/footer">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider group-hover:text-brand-600 transition-colors">
              <Sparkles className="w-3 h-3 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span>View Specs</span>
           </div>
           
           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-brand-50 text-slate-300 group-hover:text-brand-600 transition-all duration-300">
             <ArrowRight className="w-4 h-4 transform -translate-x-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
           </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;