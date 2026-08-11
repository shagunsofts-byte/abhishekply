import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import Home, { Footer } from './Home';
import { Header as Navbar } from './components/navigation/Header';
import { SITE_CONFIG } from './data/siteConfig';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// --- FLOATING ACTION BUTTONS ---
const FloatingActions = () => {
  
  return (
    
    <div className="fixed bottom-8 right-8 z-[100] hidden md:flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a 
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 transition-all group relative"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap font-outfit">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Call Button */}
      <motion.a 
        href={`tel:+91${SITE_CONFIG.primaryPhone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-14 h-14 bg-amber-500 text-zinc-950 rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-amber-400 transition-all group relative lg:hidden"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap font-outfit">
          Call Us
        </span>
      </motion.a>

      
    </div>
  );
};


const AnimatedRoutes = ({ hasBootAnimationPlayed, setHasBootAnimationPlayed }: any) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
        <Route path="/" element={<><Navbar /><Home hasBootAnimationPlayed={hasBootAnimationPlayed} setHasBootAnimationPlayed={setHasBootAnimationPlayed} /><Footer /></>} />
        <Route path="/products" element={<><Navbar /><CatalogPage /><Footer /></>} />
        <Route path="/products/:category" element={<><Navbar /><CatalogPage /><Footer /></>} />
        <Route path="/catalog" element={<Navigate to="/products" replace />} />
        <Route path="/product/:slug" element={<><Navbar /><ProductDetailPage /><Footer /></>} />
        <Route path="*" element={<><Navbar /><NotFoundPage /><Footer /></>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [hasBootAnimationPlayed, setHasBootAnimationPlayed] = useState(false);

  return (
    <HelmetProvider>
              <BrowserRouter>
          <div className="w-full min-h-screen overflow-x-hidden font-inter flex flex-col selection:bg-amber-500/30">
            <AnimatedRoutes hasBootAnimationPlayed={hasBootAnimationPlayed} setHasBootAnimationPlayed={setHasBootAnimationPlayed} />

            <FloatingActions />
                                  </div>
        </BrowserRouter>
          </HelmetProvider>
  );
}
