import React, { useState } from 'react';
import { BedDouble, Armchair, Utensils, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'plywood',
    label: 'Plywood',
    icon: Briefcase,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'laminates',
    label: 'Laminates',
    icon: BedDouble,
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'doors',
    label: 'Doors',
    icon: Armchair,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'hardware',
    label: 'Hardware',
    icon: Utensils,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

const CARD_LABELS = ['Premium Standard', 'Executive Finish', 'Designer Edition', 'Architectural Series'];

export const TabbedCategoryGallery = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);

  const currentCategory = CATEGORIES.find(cat => cat.id === activeTab) || CATEGORIES[0];

  return (
    <section className="bg-white py-16">
      <div className="px-4 md:px-8 lg:px-12 w-full">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 border-b border-gray-200">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 pb-2 -mb-[1px] border-b-4 transition-colors duration-300 font-medium ${
                  isActive 
                    ? 'text-green-700 border-green-700' 
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentCategory.images.map((imgUrl, index) => (
              <div key={index} className="flex flex-col group cursor-pointer">
                <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]">
                  <img 
                    src={imgUrl} 
                    alt={CARD_LABELS[index]} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  {CARD_LABELS[index]}
                </h3>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
