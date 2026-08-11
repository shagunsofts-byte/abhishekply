import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import categoriesData from '../../data/categories.json';

export const CategoryDock = () => {
  const location = useLocation();

  return (
    <div className="w-full max-w-[92vw] md:max-w-max px-2">
      <div className="bg-white/90 backdrop-blur-xl border border-zinc-100 rounded-full p-1.5 shadow-[0_20px_50px_-12px_rgba(24,24,27,0.18)] overflow-x-auto no-scrollbar flex items-center gap-1">
        {categoriesData.map((item) => {
          const path = `/products/${item.slug}`;
          const isActive = location.pathname.includes(item.slug);

          return (
            <Link
              key={item.id}
              to={path}
              className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full transition-all duration-300 group whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className={`font-outfit font-medium text-xs md:text-sm ${isActive ? 'text-white' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
