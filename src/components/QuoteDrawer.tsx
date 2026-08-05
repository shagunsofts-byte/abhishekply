import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, Minus, Plus, Trash2, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const QuoteDrawer = () => {
  const { isQuoteDrawerOpen, setQuoteDrawerOpen, items, updateQuantity, removeItem, clearQuote } = useStore();
  const navigate = useNavigate();

  const handleClose = () => setQuoteDrawerOpen(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleContinue = () => {
    handleClose();
    navigate('/request-quotation');
  };

  return (
    <AnimatePresence>
      {isQuoteDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[210] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-zinc-900" />
                <h2 className="text-xl font-serif font-bold text-zinc-900">My Quote</h2>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems} items
                </span>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-zinc-300" />
                  </div>
                  <p className="text-zinc-500 font-inter">Your quote list is empty.</p>
                  <button 
                    onClick={handleClose}
                    className="text-amber-600 font-outfit font-medium hover:text-amber-700"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => {
                    return (
                      <div key={`${item.productId}-${item.selectedVariant || ''}`} className="flex gap-4">
                        <Link to={`/product/${item.productSlug || item.productId}`} onClick={handleClose}>
                          <div className="w-24 h-24 bg-zinc-50 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                            <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                          </div>
                        </Link>
                        <div className="flex-1 flex flex-col">
                          <Link to={`/product/${item.productSlug || item.productId}`} onClick={handleClose} className="text-zinc-900 font-medium font-outfit hover:text-amber-600 transition-colors line-clamp-1">
                            {item.productName}
                          </Link>
                          <span className="text-xs text-zinc-500 font-inter mt-1">{item.brand} | {item.category}</span>
                          {item.selectedVariant && (
                            <span className="text-xs text-amber-600 font-inter mt-0.5">Variant: {item.selectedVariant}</span>
                          )}
                          
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex items-center gap-3 bg-zinc-50 rounded-lg border border-zinc-200 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                className="text-zinc-500 hover:text-zinc-900"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium text-zinc-900 w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="text-zinc-500 hover:text-zinc-900"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-red-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={handleContinue}
                  className="w-full py-4 bg-zinc-900 text-white rounded-xl font-outfit font-medium flex items-center justify-center gap-2 hover:bg-amber-600 hover:text-zinc-900 transition-colors"
                >
                  Continue to Request Quote
                </button>
                <button 
                  onClick={clearQuote}
                  className="w-full text-center text-xs font-outfit uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors py-2"
                >
                  Clear Quote
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
