import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SWATCHES = [
  { id: '1', name: 'Tan/Oak', color: '#D2B48C' },
  { id: '2', name: 'Walnut', color: '#8B5A2B' },
  { id: '3', name: 'Dark Wood', color: '#5C4033' },
  { id: '4', name: 'Concrete', color: '#808080' },
  { id: '5', name: 'Beige', color: '#F5F5DC' },
  { id: '6', name: 'Charcoal', color: '#1A1A1A' },
];

export const FeaturedCollection = () => {
  const [hoveredSwatchId, setHoveredSwatchId] = useState<string | null>(null);

  const hoveredSwatch = SWATCHES.find(s => s.id === hoveredSwatchId);

  return (
    <section className="relative w-full overflow-hidden bg-[#262424] py-24">
      {/* Background Shift Overlay */}
      <AnimatePresence>
        {hoveredSwatch && (
          <motion.div
            key={hoveredSwatch.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 pointer-events-none hidden md:block"
            style={{
              background: `radial-gradient(circle at center, ${hoveredSwatch.color} 0%, transparent 80%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        
        {/* Text Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">SIGNATURE COLLECTION</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600">Surfaces</span>
          </h2>
          <p className="text-lg text-zinc-300 mt-4 max-w-2xl mx-auto">
            Explore a handpicked selection of premium finishes, designed to bring unmatched character and depth to your interiors.
          </p>
        </motion.div>

        {/* Swatch Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="flex overflow-x-auto md:flex-wrap md:justify-center items-center gap-6 pb-6 pt-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {SWATCHES.map((swatch) => (
              <motion.div
                key={swatch.id}
                onMouseEnter={() => setHoveredSwatchId(swatch.id)}
                onMouseLeave={() => setHoveredSwatchId(null)}
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 md:w-24 md:h-24 shrink-0 snap-center rounded-2xl md:rounded-3xl cursor-pointer relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: swatch.color,
                  boxShadow: hoveredSwatchId === swatch.id ? '0 0 15px rgba(255,255,255,0.4), inset 0 0 10px rgba(0,0,0,0.5)' : 'inset 0 0 10px rgba(0,0,0,0.5)',
                }}
              >
                {/* Subtle border to frame the swatches */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl md:rounded-3xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
          <div className="h-6 mt-4">
            <AnimatePresence mode="wait">
              {hoveredSwatchId ? (
                <motion.p
                  key={hoveredSwatchId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-zinc-300 font-outfit uppercase tracking-widest"
                >
                  {SWATCHES.find(s => s.id === hoveredSwatchId)?.name}
                </motion.p>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium text-zinc-500 font-outfit uppercase tracking-widest"
                >
                  Select a shade
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
