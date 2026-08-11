import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { Product } from '../data/catalog';
import { SITE_CONFIG } from '../data/siteConfig';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    product.whatsappMessage || `Hi, I am interested in ${product.name}. Please share more details.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:border-amber-200 shadow-sm hover:shadow-xl hover:shadow-zinc-200/60 transition-all duration-500"
    >
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <img
          src={product.thumbnail || product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-amber-500 text-zinc-950 text-[10px] font-outfit font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.isPopular && !product.isNew && (
            <span className="bg-zinc-900/90 text-white text-[10px] font-outfit font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Popular
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-zinc-900" />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <span className="text-[11px] font-outfit font-semibold uppercase tracking-widest text-amber-600 mb-1.5">
          {product.brand}
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-bold text-zinc-900 leading-snug mb-1.5 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-zinc-500 font-inter leading-relaxed mb-4 line-clamp-2">
          {product.shortDescription || product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-zinc-100">
          <span className="text-sm font-outfit font-medium text-zinc-700">
            {product.priceLabel || 'Enquire for Price'}
          </span>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
