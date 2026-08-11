import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { Product } from '../data/catalog';
import { useQuote } from '../context/QuoteContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToQuote, isInQuote } = useQuote();
  const added = isInQuote(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!added) addToQuote(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-zinc-100 mb-3">
          <img
            src={product.thumbnail || product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {(product.isNew || product.isPopular) && (
            <span
              className={`absolute top-2.5 left-2.5 text-[9px] font-outfit font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                product.isNew ? 'bg-amber-500 text-zinc-950' : 'bg-white/90 text-zinc-900 backdrop-blur'
              }`}
            >
              {product.isNew ? 'New' : 'Popular'}
            </span>
          )}

          <button
            onClick={handleAdd}
            aria-label={added ? 'Added to quote' : `Add ${product.name} to quote`}
            className={`absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              added
                ? 'bg-zinc-900 text-amber-400 scale-100'
                : 'bg-white text-zinc-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-amber-500 hover:text-zinc-950'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-start justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <span className="text-[10px] font-outfit font-semibold uppercase tracking-widest text-amber-600">
              {product.brand}
            </span>
            <h3 className="font-serif text-[15px] font-bold text-zinc-900 leading-snug truncate group-hover:text-amber-700 transition-colors">
              {product.shortName || product.name}
            </h3>
          </div>
          <span className="shrink-0 text-xs font-outfit font-medium text-zinc-400 pt-3.5">
            {product.priceLabel === 'Best Price Available' || product.priceLabel === 'Enquire for Price'
              ? 'On Request'
              : product.priceLabel}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
