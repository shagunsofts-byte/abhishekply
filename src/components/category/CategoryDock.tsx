import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import categoriesData from '../../data/categories.json';

interface CategoryDockProps {
  activeSlug?: string;
}

export const CategoryDock: React.FC<CategoryDockProps> = ({ activeSlug }) => {
  const location = useLocation();

  return (
    <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-[95vw] md:max-w-max px-2 md:px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 md:p-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-x-auto no-scrollbar flex items-center gap-1 md:gap-2">
        {categoriesData.map((item) => {
          const path = `/products/${item.slug}`;
          const isActive = activeSlug ? activeSlug === item.slug : location.pathname.includes(item.slug);

          return (
            <Link 
              key={item.id} 
              to={path}
              className={`relative flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-full transition-all border group overflow-hidden shrink-0 ${
                isActive 
                  ? 'border-amber-500/50 bg-white/20 shadow-[0_0_15px_rgba(245,158,11,0.3)] -translate-y-1' 
                  : 'border-transparent hover:border-amber-500/50 hover:bg-white/10 hover:-translate-y-1'
              }`}
            >
              <motion.span 
                whileTap={{ scale: 0.95, filter: "drop-shadow(0px 0px 15px rgba(245,158,11,1))" }}
                className={`text-2xl md:text-xl relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]' : ''}`}
              >
                {item.icon}
              </motion.span>
              <span className={`hidden md:block font-outfit font-medium text-sm md:text-base whitespace-nowrap transition-colors relative z-10 ${
                isActive ? 'text-amber-400' : 'text-white group-hover:text-amber-400'
              }`}>
                {item.name}
              </span>
              
              {/* Active Indicator / Hover Ripple */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
