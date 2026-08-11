import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';
import { SITE_CONFIG } from '../../data/siteConfig';
import { submitQuoteRequest, buildQuoteWhatsAppMessage } from '../../lib/quoteRequests';

export const QuoteDrawer: React.FC = () => {
  const { items, isDrawerOpen, closeDrawer, removeFromQuote, updateQty, clearQuote, totalItems } = useQuote();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSend = async () => {
    if (items.length === 0) return;
    setSubmitting(true);

    await submitQuoteRequest({
      customerName: name.trim() || 'Not provided',
      customerPhone: phone.trim() || 'Not provided',
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        brand: i.product.brand,
        qty: i.qty,
      })),
    });

    const message = buildQuoteWhatsAppMessage(items, name.trim() || undefined);
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    closeDrawer();
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
        clearQuote();
        setName('');
        setPhone('');
      }, 400);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[210] bg-zinc-950/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[211] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <h3 className="font-serif text-xl font-bold text-zinc-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                Your Quote List
              </h3>
              <button onClick={handleClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-zinc-700" />
              </button>
            </div>

            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="font-serif text-xl font-bold text-zinc-900 mb-2">Quote request sent</h4>
                <p className="text-sm text-zinc-500 font-inter mb-6 leading-relaxed">
                  We've opened WhatsApp with your item list — just hit send there. Our team typically replies
                  within business hours with pricing and availability.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-zinc-900 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-outfit font-medium transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-5">
                  <ShoppingBag className="w-7 h-7 text-zinc-300" />
                </div>
                <h4 className="font-serif text-lg font-bold text-zinc-900 mb-2">Your quote list is empty</h4>
                <p className="text-sm text-zinc-500 font-inter mb-6">
                  Add products you're interested in and request a single combined quote.
                </p>
                <Link
                  to="/products"
                  onClick={handleClose}
                  className="bg-zinc-900 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-outfit font-medium transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3 pb-4 border-b border-zinc-100 last:border-0">
                      <Link to={`/product/${product.slug}`} onClick={handleClose} className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-outfit uppercase tracking-widest text-amber-600">{product.brand}</span>
                        <Link to={`/product/${product.slug}`} onClick={handleClose}>
                          <h4 className="font-outfit font-medium text-sm text-zinc-900 leading-snug truncate hover:text-amber-600 transition-colors">
                            {product.name}
                          </h4>
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-zinc-200 rounded-full">
                            <button
                              onClick={() => updateQty(product.id, qty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-outfit font-medium w-4 text-center">{qty}</span>
                            <button
                              onClick={() => updateQty(product.id, qty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromQuote(product.id)}
                            className="text-zinc-300 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer form */}
                <div className="px-6 py-5 border-t border-zinc-100 space-y-3 bg-zinc-50/60">
                  <p className="text-xs font-outfit text-zinc-400 uppercase tracking-widest mb-1">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} — {items.length} product{items.length !== 1 ? 's' : ''}
                  </p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 bg-white"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number (optional)"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 bg-white"
                  />
                  <button
                    onClick={handleSend}
                    disabled={submitting}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-3.5 rounded-full flex items-center justify-center gap-2 font-outfit font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {submitting ? 'Sending...' : 'Request Quote via WhatsApp'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
