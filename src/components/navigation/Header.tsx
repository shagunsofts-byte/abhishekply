import { SITE_CONFIG } from "../../data/siteConfig";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, FileText } from 'lucide-react';
import { NAVIGATION_DATA } from '../../data/navigation';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { useStore } from '../../store/useStore';

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  
  const { setQuoteDrawerOpen, items } = useStore();
  const quoteItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

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
        style={{ '--header-bottom': isTransparent ? '88px' : '64px' } as React.CSSProperties}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group cursor-pointer relative z-10"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-700 group-hover:rotate-180 ${isTransparent ? 'text-white' : 'text-zinc-900'}`}>
                <path d="M2 22L12 2l10 20"/>
                <path d="M12 12h8"/>
                <path d="M4 12h8"/>
              </svg>
              <div className="flex flex-col">
                <span className={`font-serif text-xl font-bold tracking-wide leading-none transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-zinc-900'}`}>ABHISHEK</span>
                <span className="text-[0.6rem] font-outfit text-amber-500 tracking-widest uppercase">Ply & Hardware</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 h-full">
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
                        isTransparent ? 'text-white/90 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {item.title}
                      <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${isTransparent ? 'bg-white' : 'bg-amber-500'}`} />
                    </Link>
                  ) : (
                    <div 
                      className={`cursor-pointer font-outfit font-medium text-sm tracking-wide transition-colors relative group py-2 flex items-center gap-1 ${
                        isTransparent ? 'text-white/90 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                      } ${activeMenu === item.title ? (isTransparent ? 'text-white' : 'text-zinc-900') : ''}`}
                    >
                      {item.title}
                      <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${activeMenu === item.title ? 'w-full' : 'w-0'} group-hover:w-full ${isTransparent ? 'bg-white' : 'bg-amber-500'}`} />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4 z-10">
              <button 
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-zinc-600 hover:bg-zinc-100'}`}
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setQuoteDrawerOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors shadow-sm ml-2 ${
                    isTransparent 
                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm' 
                      : 'bg-zinc-900 text-white border border-zinc-900 hover:bg-amber-600 hover:border-amber-600 hover:text-zinc-900'
                }`}
                title="My Quote"
              >
                <FileText className="w-4 h-4" />
                <span className="font-outfit font-medium text-sm">My Quote {quoteItemsCount > 0 ? `(${quoteItemsCount})` : ''}</span>
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 -mr-2 transition-colors ${isTransparent ? 'text-white' : 'text-zinc-900'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu + its own scoped overlay — both live inside the header stacking context */}
        <div className="absolute top-full left-0 w-full" onMouseLeave={() => setActiveMenu(null)}>
          {/* Backdrop: only covers viewport below the header, not the whole page stack */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 w-full bg-zinc-900/30 backdrop-blur-[2px]"
                style={{ top: 'var(--header-bottom, 72px)', bottom: 0, zIndex: 95 }}
                onMouseEnter={() => setActiveMenu(null)}
              />
            )}
          </AnimatePresence>
          <DesktopMegaMenu 
            activeMenu={activeMenu} 
            menuData={NAVIGATION_DATA} 
            onMouseLeave={() => setActiveMenu(null)}
            onMouseEnter={() => {}}
          />
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
