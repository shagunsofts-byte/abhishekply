import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useFirebase';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { products } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearchQuery('');
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const recentSearches = ['Plywood', 'Laminates', 'Hardware'];
  const popularCategories = ['plywood', 'laminates', 'doors', 'hardware', 'interiors'];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(p => 
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    ).slice(0, 6);
  }, [searchQuery, products]);

  const trendingProducts = useMemo(() => {
     return products.slice(0, 2);
  }, [products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app we might route to a search page. For now just close or nav to products.
      onClose();
      navigate('/products');
    }
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
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-zinc-100">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-4">
              <Search className="w-6 h-6 text-zinc-400" />
              <input 
                ref={inputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..." 
                className="w-full bg-transparent border-none outline-none text-2xl md:text-4xl font-serif text-zinc-900 placeholder:text-zinc-300"
              />
            </form>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-zinc-100 rounded-full transition-colors shrink-0"
            >
              <X className="w-6 h-6 text-zinc-900" />
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
            
            {searchQuery.trim() ? (
               <div className="space-y-8">
                  <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-6">Search Results</h3>
                  
                  {filteredProducts.length === 0 ? (
                    <div className="text-zinc-500 font-inter">No products found matching "{searchQuery}".</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {filteredProducts.map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} onClick={onClose} className="group flex gap-4">
                          <div className="w-24 h-24 bg-zinc-50 rounded-xl overflow-hidden shrink-0">
                            <img 
                              src={product.thumbnail || product.image || (product.images && product.images[0]) || ''} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h4 className="font-outfit font-medium text-zinc-900 line-clamp-2 group-hover:text-amber-600 transition-colors">{product.name}</h4>
                            <p className="text-sm text-zinc-500 font-inter mt-1">{product.brand}</p>
                            <p className="font-inter text-zinc-900 font-bold mt-1 text-sm">{product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left Column */}
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-4">Popular Categories</h3>
                    <div className="flex flex-wrap gap-3">
                      {popularCategories.map((cat, idx) => (
                        <Link 
                          key={idx} 
                          to={`/products/${cat.toLowerCase()}`}
                          onClick={onClose}
                          className="px-6 py-3 rounded-full border border-zinc-200 text-zinc-700 hover:border-amber-500 hover:text-amber-600 font-outfit transition-all hover:shadow-lg hover:shadow-amber-500/10 capitalize"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Products Suggestion */}
                <div>
                  <h3 className="text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-6">Trending Now</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {trendingProducts.map(product => (
                      <Link key={product.id} to={`/product/${product.id}`} onClick={onClose} className="group block">
                        <div className="w-full aspect-square bg-zinc-50 rounded-2xl overflow-hidden mb-4 relative">
                          <img 
                             src={product.thumbnail || product.image || (product.images && product.images[0]) || ''} 
                             alt={product.name}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="font-outfit font-medium text-zinc-900 group-hover:text-amber-600 transition-colors truncate">{product.name}</h4>
                        <p className="text-sm text-zinc-500 font-inter flex items-center gap-1 mt-1 group-hover:text-zinc-700">
                          {product.price}
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
