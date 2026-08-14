import { SITE_CONFIG } from "../../data/siteConfig";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { NAVIGATION_DATA } from '../../data/navigation';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { useQuote } from '../../context/QuoteContext';
import { QuoteDrawer } from '../quote/QuoteDrawer';

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { openDrawer, totalItems } = useQuote();
  
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isTransparent 
            ? 'py-6 bg-transparent' 
            : 'py-3 bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group cursor-pointer relative z-10"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-700 group-hover:rotate-180 ${'text-zinc-900'}`}>
                <path d="M2 22L12 2l10 20"/>
                <path d="M12 12h8"/>
                <path d="M4 12h8"/>
              </svg>
              <div className="flex flex-col">
                <span className={`font-serif text-xl font-bold tracking-wide leading-none transition-colors duration-300 ${'text-zinc-900'}`}>ABHISHEK</span>
                <span className="text-[0.6rem] font-outfit text-amber-500 tracking-widest uppercase">Ply & Hardware</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 h-full ml-12">
              {NAVIGATION_DATA.map((item, idx) => (
                <div 
                  key={idx}
                  className="h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(item.title)}
                >
                  {item.type === 'link' ? (
                    <Link 
                      to={item.href}
                      className={`font-outfit font-medium text-sm tracking-wide transition-colors relative group py-2 ${
                        'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {item.title}
                      <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${'bg-amber-500'}`} />
                    </Link>
                  ) : (
                    <div 
                      className={`cursor-pointer font-outfit font-medium text-sm tracking-wide transition-colors relative group py-2 flex items-center gap-1 ${
                        'text-zinc-600 hover:text-zinc-900'
                      } ${activeMenu === item.title ? ('text-zinc-900') : ''}`}
                    >
                      {item.title}
                      <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${activeMenu === item.title ? 'w-full' : 'w-0'} group-hover:w-full ${'bg-amber-500'}`} />
                    </div>
                  )}
                </div>
              ))}
            </nav>
            </div>


            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4 z-10">

              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="p-2 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={openDrawer}
                aria-label="View quote list"
                className="relative p-2 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-amber-500 text-zinc-950 text-[10px] font-outfit font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-4 ml-2">

                
                <a 
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi, I am looking for a quote.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-6 py-2.5 rounded-full font-outfit font-medium text-sm transition-all duration-300 shadow-sm ml-2 bg-zinc-900 text-white border border-zinc-900 hover:bg-amber-600 hover:border-amber-600`}
                >
                  Get Quote
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 -mr-2 transition-colors ${'text-zinc-900'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu overlay wrapper (so it sits correctly relative to header) */}
        <div className="absolute top-full left-0 w-full" onMouseLeave={() => setActiveMenu(null)}>
          <DesktopMegaMenu 
            activeMenu={activeMenu} 
            menuData={NAVIGATION_DATA} 
            onMouseLeave={() => setActiveMenu(null)}
            onMouseEnter={() => {}}
          />
        </div>
      </motion.header>

      {/* Global Background overlay when mega menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-[90]"
            onMouseEnter={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      <QuoteDrawer />
    </>
  );
};
