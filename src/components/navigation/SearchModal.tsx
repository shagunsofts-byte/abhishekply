import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import categoriesData from '../../data/categories.json';
import { useProducts } from '../../context/ProductsContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products: PRODUCTS } = useProducts();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setQuery('');
    }
  }, [isOpen, onClose]);

  const popularSearches = ['CenturyPly BWP', 'Modular Kitchen', 'Hettich Hinges', 'Teak Wood Doors', 'Brass Handles'];
  const popularCategories = categoriesData.slice(0, 6);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [PRODUCTS, query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-md flex flex-col"
        >
          {/* Header */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-zinc-100"
          >
            <div className="flex-1 flex items-center gap-4">
              <Search className="w-6 h-6 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full bg-transparent border-none outline-none text-2xl md:text-4xl font-serif text-zinc-900 placeholder:text-zinc-300"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-3 hover:bg-zinc-100 rounded-full transition-colors shrink-0"
            >
              <X className="w-6 h-6 text-zinc-900" />
            </button>
          </form>

          {/* Body */}
          <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
            {query.trim() ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400">
                    {results.length > 0 ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'No matches yet'}
                  </h3>
                  {results.length > 0 && (
                    <button
                      onClick={handleSubmit}
                      className="text-sm font-outfit font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      View all in Products <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {results.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {results.map((p) => (
                      <Link key={p.id} to={`/product/${p.slug}`} onClick={onClose} className="group block">
                        <div className="w-full aspect-square bg-zinc-50 rounded-2xl overflow-hidden mb-3 relative">
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="text-[11px] font-outfit uppercase tracking-widest text-amber-600">{p.brand}</span>
                        <h4 className="font-outfit font-medium text-zinc-900 group-hover:text-amber-600 transition-colors leading-snug">
                          {p.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 text-center">
                    <p className="text-zinc-500 font-inter mb-4">
                      Nothing matched "{query}" in our online catalog yet — our full range is bigger than this site.
                    </p>
                    <a
                      href={`https://wa.me/916386202664?text=${encodeURIComponent(`Hi, I am looking for: ${query}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-outfit font-medium text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left Column */}
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-4">Popular Searches</h3>
                    <ul className="space-y-2">
                      {popularSearches.map((search, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => setQuery(search)}
                            className="flex items-center gap-3 text-zinc-600 hover:text-amber-600 transition-colors py-2 group w-full text-left"
                          >
                            <Search className="w-4 h-4 text-zinc-400 group-hover:text-amber-600" />
                            <span className="font-inter text-lg">{search}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-4">Popular Categories</h3>
                    <div className="flex flex-wrap gap-3">
                      {popularCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/products/${cat.slug}`}
                          onClick={onClose}
                          className="px-6 py-3 rounded-full border border-zinc-200 text-zinc-700 hover:border-amber-500 hover:text-amber-600 font-outfit transition-all hover:shadow-lg hover:shadow-amber-500/10"
                        >
                          {cat.icon} {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Products */}
                <div>
                  <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-6">Trending Now</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {PRODUCTS.filter((p) => p.isFeatured).slice(0, 2).map((p) => (
                      <Link key={p.id} to={`/product/${p.slug}`} onClick={onClose} className="group block">
                        <div className="w-full aspect-square bg-zinc-50 rounded-2xl overflow-hidden mb-4 relative">
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="font-outfit font-medium text-zinc-900 group-hover:text-amber-600 transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-sm text-zinc-500 font-inter flex items-center gap-1 mt-1 group-hover:text-zinc-700">
                          Explore <ArrowRight className="w-3 h-3" />
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
