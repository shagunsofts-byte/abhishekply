import { SITE_CONFIG } from '../../data/siteConfig';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAVIGATION_DATA } from '../../data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setActiveAccordion(prev => prev === title ? null : title);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ type: 'tween', ease: 'circOut', duration: 0.4 }}
          className="fixed inset-0 z-[120] bg-white text-zinc-900 flex flex-col h-[100dvh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-100 shrink-0">
            <span className="font-serif text-2xl font-bold tracking-tight">Abhishek<span className="text-amber-500">.</span></span>
            <button onClick={onClose} className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-6">
              {NAVIGATION_DATA.map((item, idx) => (
                <div key={idx} className="border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                  {item.type === 'link' ? (
                    <Link 
                      to={item.href} 
                      onClick={onClose}
                      className="text-3xl font-serif text-zinc-900 hover:text-amber-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div>
                      <button 
                        onClick={() => toggleAccordion(item.title)}
                        className="flex items-center justify-between w-full text-3xl font-serif text-zinc-900 hover:text-amber-600 transition-colors"
                      >
                        {item.title}
                        <motion.div
                          animate={{ rotate: activeAccordion === item.title ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-6 h-6 text-zinc-400" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {activeAccordion === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 flex flex-col gap-6 pl-4 border-l-2 border-amber-500/20 ml-2">
                              {item.columns?.map((col, cIdx) => (
                                <div key={cIdx} className="flex flex-col gap-3">
                                  <span className="text-lg font-serif font-medium text-zinc-900">{col.title}</span>
                                  <div className="flex flex-col gap-2 pl-3 border-l border-zinc-100">
                                    {col.subItems.map((sub, sIdx) => (
                                      <Link 
                                        key={sIdx} 
                                        to={sub.href} 
                                        onClick={onClose}
                                        className="text-base font-outfit text-zinc-500 hover:text-amber-600 transition-colors"
                                      >
                                        {sub.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="p-4 bg-zinc-50 border-t border-zinc-200 shrink-0 flex gap-2">
            <a href={`tel:+91${SITE_CONFIG.primaryPhone}`} className="flex-1 bg-white border border-zinc-200 rounded-xl py-3 flex items-center justify-center gap-2 text-zinc-900 font-outfit font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex-1 bg-green-500 rounded-xl py-3 flex items-center justify-center gap-2 text-white font-outfit font-medium hover:bg-green-600 transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="https://maps.google.com/?q=Bahraich" target="_blank" rel="noreferrer" className="w-12 shrink-0 bg-white border border-zinc-200 rounded-xl py-3 flex items-center justify-center text-zinc-900 hover:border-zinc-400 transition-colors">
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
