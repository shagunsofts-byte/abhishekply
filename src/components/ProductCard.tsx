import { SITE_CONFIG } from '../data/siteConfig';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, FileText, Check, Eye, Maximize2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Product } from '../hooks/useFirebase';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem, items } = useStore();
  
  const isInCart = items.some(i => i.productId === product.id);

  const displayImage = product.thumbnail || product.images?.[0] || product.image;

  return (
    <motion.div 
      className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { e.preventDefault(); }}
          className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-600 hover:text-red-500 shadow-sm transition-colors hover:scale-105"
          title="Add to Wishlist"
        >
          <Heart className={`w-5 h-5 `} />
        </button>
        <Link 
          to={`/product/${product.id}`}
          className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-600 hover:text-black shadow-sm transition-colors hover:scale-105"
          title="Quick View"
        >
          <Eye className="w-5 h-5" />
        </Link>
      </div>

      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
        <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-outfit shadow-sm border border-zinc-100">
          {product.brand}
        </span>
        {product.isNew && (
          <span className="bg-amber-500 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-outfit shadow-sm">
            New Arrival
          </span>
        )}
      </div>

      <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-zinc-50">
        <img 
          src={displayImage} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-outfit uppercase tracking-widest text-zinc-400">{product.category} {product.subcategory ? `• ${product.subcategory}` : ''}</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        
        <p className="text-sm font-inter text-zinc-500 line-clamp-2 mt-2 mb-4">
          {product.shortDescription || product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {product.sizes && product.sizes.length > 0 && (
            <div className="text-xs font-outfit text-zinc-600 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
              {product.sizes.length} Sizes
            </div>
          )}
          {product.colors && product.colors.length > 0 && (
            <div className="text-xs font-outfit text-zinc-600 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
              {product.colors.length} Colors
            </div>
          )}
          {product.availability && (
            <div className="text-xs font-outfit text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
              <Check className="w-3 h-3"/> {product.availability}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => addItem({
              productId: product.id,
              productSlug: product.slug,
              productName: product.name,
              brand: product.brand,
              category: product.category,
              image: product.thumbnail || product.image || product.images?.[0] || "",
              quantity: 1
            })}
            className={`flex-1 py-3 rounded-xl font-outfit text-sm font-semibold transition-all flex items-center justify-center gap-2 ${isInCart ? 'bg-zinc-100 text-zinc-800' : 'bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/10'}`}
          >
            {isInCart ? <><Check className="w-4 h-4"/> Added</> : <><FileText className="w-4 h-4"/> Add to Quote</>}
          </button>
          
          <button 
            onClick={() => {
              const msg = product.whatsappMessage || `Hi, I am interested in ${product.name}.`;
              window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            }}
            className="w-12 h-12 flex-shrink-0 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl flex items-center justify-center transition-colors"
            title="WhatsApp Enquire"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
