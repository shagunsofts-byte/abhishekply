import React, { useState } from 'react';
import { BedDouble, Armchair, Utensils, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'bedroom',
    label: 'Bedroom',
    icon: BedDouble,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'living',
    label: 'Living Room',
    icon: Armchair,
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: Utensils,
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'office',
    label: 'Office',
    icon: Briefcase,
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758870432-af57e54afa26?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

const CARD_LABELS = [
  "Opulent",
  "Artistic Den",
  "Modern Minimalism",
  "Indian Ethos"
];

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
