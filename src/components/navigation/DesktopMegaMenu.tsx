import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../data/navigation';

interface DesktopMegaMenuProps {
  activeMenu: string | null;
  menuData: MenuItem[];
  onMouseLeave: () => void;
  onMouseEnter: () => void;
}

export const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({ 
  activeMenu, 
  menuData,
  onMouseLeave,
  onMouseEnter
}) => {
  const activeItem = menuData.find(item => item.title === activeMenu && item.type === 'mega');
  const [hoveredCategory, setHoveredCategory] = useState<string>('');

  useEffect(() => {
    if (activeItem && activeItem.columns && activeItem.columns.length > 0) {
      setHoveredCategory(activeItem.columns[0].id);
    }
  }, [activeItem]);

  const currentHoverImage = activeItem?.columns?.find(c => c.id === hoveredCategory)?.hoverImage || activeItem?.columns?.[0]?.hoverImage;

  return (
    <AnimatePresence>
      {activeItem && activeItem.columns ? (
        <motion.div
          key="unified-mega"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-full bg-white text-zinc-900 shadow-2xl border-t border-zinc-200 z-[110]"
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {currentHoverImage && (
                <motion.img 
                  key={hoveredCategory}
                  src={currentHoverImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent pointer-events-none" />
          </div>

          <div className="max-w-[90rem] mx-auto px-4 md:px-8 lg:px-12 py-12 w-full relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {activeItem.columns.map((category) => (
                <div 
                  key={category.id} 
                  className="flex flex-col"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                >
                  <h3 className={`font-serif text-lg font-bold mb-6 transition-colors duration-300 ${hoveredCategory === category.id ? 'text-amber-600' : 'text-zinc-900'}`}>
                    {category.title}
                  </h3>
                  <ul className="space-y-1 font-inter -ml-4">
                    {category.subItems.map((item, idx) => (
                      <li key={idx}>
                        <Link to={item.href} onClick={onMouseLeave} className="text-left text-zinc-700 hover:text-zinc-950 text-sm transition-all duration-300 block px-4 py-2.5 rounded-xl border border-transparent hover:border-[#ebdcf9] hover:bg-gradient-to-r hover:from-[#f4ebff] hover:to-[#ffedd5] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
