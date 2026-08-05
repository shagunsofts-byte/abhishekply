import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Phone, MessageCircle } from 'lucide-react';

import Home, { Footer } from './Home';
import { Header as Navbar } from './components/navigation/Header';
import { ProductsPage } from './pages/products/ProductsPage';
import { ProductDetails } from './pages/ProductDetails';
import { QuoteRequest } from './pages/QuoteRequest';
import { AdminDashboard } from './pages/Admin';
import { Login } from './pages/Login';

import { useStore } from './store/useStore';
import { AuthProvider } from './context/AuthContext';
import { QuoteDrawer } from './components/QuoteDrawer';
import { SITE_CONFIG } from './data/siteConfig';
import ScrollToTop from './components/ScrollToTop';

// --- FLOATING ACTION BUTTONS ---
const FloatingActions = () => {
  const { items, setQuoteDrawerOpen } = useStore();
  
  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a 
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="hidden md:flex w-14 h-14 bg-green-500 text-white rounded-full items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 transition-all group relative"
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
        className="hidden w-14 h-14 bg-amber-500 text-zinc-950 rounded-full items-center justify-center shadow-xl hover:scale-110 hover:bg-amber-400 transition-all group relative lg:hidden"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap font-outfit">
          Call Us
        </span>
      </motion.a>

      <AnimatePresence>
        {items.length > 0 && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setQuoteDrawerOpen(true)}
            className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform relative group"
          >
            <FileText className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
            <span className="absolute right-full mr-4 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap font-outfit">
              View Quote List
            </span>
          </motion.button>
        )}
      </AnimatePresence>
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
        <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /></>} />
        <Route path="/products/:category" element={<><Navbar /><ProductsPage /><Footer /></>} />
        <Route path="/products/:category/:subcategory" element={<><Navbar /><ProductsPage /><Footer /></>} />
        <Route path="/product/:id" element={<><Navbar /><ProductDetails /><Footer /></>} />
        <Route path="/request-quotation" element={<><Navbar /><QuoteRequest /><Footer /></>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [hasBootAnimationPlayed, setHasBootAnimationPlayed] = useState(false);

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="w-full min-h-screen overflow-x-hidden font-inter flex flex-col selection:bg-amber-500/30">
            <AnimatedRoutes hasBootAnimationPlayed={hasBootAnimationPlayed} setHasBootAnimationPlayed={setHasBootAnimationPlayed} />
            <FloatingActions />
            <QuoteDrawer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
