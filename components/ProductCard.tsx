import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-900/5 hover:border-brand-100 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="relative h-72 p-8 flex items-center justify-center bg-slate-50/50 group-hover:bg-white transition-colors duration-500 overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <img 
          src={product.imageUrl} 
          alt={product.model} 
          className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-xl"
        />
        
        {/* Badge */}
        <div className="absolute top-5 left-5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-brand-600 group-hover:border-brand-100 transition-colors">
          {product.brand}
        </div>

        {/* Quick View Icon Overlay */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20">
          <Eye className="w-4 h-4" />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-7 flex flex-col flex-grow relative">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-1">
          {product.model}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed font-light">
          {product.shortDescription}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-50 group-hover:border-slate-100 transition-colors">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-brand-400 transition-colors">View Specs</span>
          <div className="flex items-center text-brand-950 font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
            Details 
            <ArrowRight className="w-4 h-4 ml-2 text-brand-500" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;