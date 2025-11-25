import { ArrowLeft, CheckCircle2, FileText, Home, Phone, Share2, ShieldCheck, Truck } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-slate-50">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Product not found</h2>
          <p className="text-slate-500 mb-8">The item you are looking for might have been removed.</p>
          <Link to="/products" className="px-6 py-3 bg-brand-500 text-white rounded-full font-bold hover:bg-brand-600 transition-colors inline-flex items-center shadow-lg">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const mainImage = product.images[selectedImage] || product.images[0] || `https://picsum.photos/seed/${product.id}/500/400`;

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Modern Header Breadcrumb */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
             <Link to="/" className="text-slate-400 hover:text-brand-600 transition-colors">
                <Home className="w-4 h-4" />
             </Link>
             <span className="text-slate-300">/</span>
             <Link to="/products" className="text-slate-500 hover:text-brand-600 transition-colors font-medium">
                Products
             </Link>
             <span className="text-slate-300">/</span>
             <span className="text-brand-600 font-bold truncate max-w-[150px] sm:max-w-xs">
                {product.model}
             </span>
          </div>
          
          <div className="flex items-center gap-3">
             <Link to="/products" className="hidden sm:flex text-slate-500 hover:text-brand-600 transition-colors text-sm font-bold items-center group mr-4">
               <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
               Back
             </Link>
             <button className="text-slate-400 hover:text-brand-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
               <Share2 className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Column: Image Section */}
            <div className="lg:w-1/2 bg-slate-50/50 p-8 md:p-16 flex flex-col relative border-b lg:border-b-0 lg:border-r border-slate-100">
               {/* Radial Gradient Background */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
               
               {/* Main Image */}
               <div className="relative z-10 flex-grow flex items-center justify-center py-10">
                  <img 
                    src={mainImage}
                    alt={product.model} 
                    className="product-main-image max-w-full max-h-[400px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
               </div>
               
               {/* Image Gallery Thumbnails */}
               {product.images.length > 1 && (
                 <div className="relative z-10 mt-6">
                   <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                     {product.images.map((image, index) => (
                       <button
                         key={index}
                         onClick={() => setSelectedImage(index)}
                         className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white ${
                           selectedImage === index 
                             ? 'border-brand-500 ring-2 ring-brand-200' 
                             : 'border-slate-200 hover:border-brand-300'
                         }`}
                       >
                         <img
                           src={image}
                           alt={`${product.model} view ${index + 1}`}
                           className="w-full h-full object-contain p-1"
                         />
                       </button>
                     ))}
                   </div>
                 </div>
               )}
               
               {/* Trust Badges Grid */}
               <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
                   <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                       <div className="w-8 h-8 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mb-2">
                           <ShieldCheck className="w-4 h-4" />
                       </div>
                       <span className="text-[10px] sm:text-xs text-slate-900 font-bold block">Warranty</span>
                   </div>
                   <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                       <div className="w-8 h-8 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mb-2">
                           <Truck className="w-4 h-4" />
                       </div>
                       <span className="text-[10px] sm:text-xs text-slate-900 font-bold block">Delivery</span>
                   </div>
                   <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                       <div className="w-8 h-8 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mb-2">
                           <FileText className="w-4 h-4" />
                       </div>
                       <span className="text-[10px] sm:text-xs text-slate-900 font-bold block">Certified</span>
                   </div>
               </div>
            </div>

            {/* Right Column: Info */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-white">
               <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                     <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold tracking-widest uppercase">
                        {product.brand}
                     </span>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{product.category}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                    {product.model}
                  </h1>
                  
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    {product.fullDescription || product.shortDescription}
                  </p>
               </div>

               <div className="mb-12">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center">
                    <span className="w-1.5 h-6 bg-brand-500 rounded-full mr-3"></span>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-slate-700 font-medium leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Call to Action Area */}
               <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                     <h3 className="text-xl font-bold mb-2">Interested in this model?</h3>
                     <p className="text-slate-400 text-sm mb-6">Contact our sales team for pricing and availability.</p>
                     
                     <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                           to="/contact" 
                           className="flex-1 bg-brand-500 hover:bg-brand-400 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center shadow-lg shadow-brand-500/25"
                        >
                           <Phone className="w-4 h-4 mr-2" />
                           Request Quote
                        </Link>
                        <a 
                           href={`mailto:sales@habashmed.com?subject=Inquiry: ${product.model}`}
                           className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center border border-white/10"
                        >
                           Email Us
                        </a>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;