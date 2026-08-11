import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { comparisonData } from '../data/comparisonSection';

export const BeforeAfterSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a spring for buttery smooth movement
  const springX = useSpring(50, {
    stiffness: 400,
    damping: 40,
    mass: 0.8
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handlePointerMove(e.clientX);
  };

  

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Update spring target
    springX.set(percent);
  }, [springX]);

  useEffect(() => {
    const handleGlobalMove = (e: PointerEvent) => {
      if (isDragging) {
        handlePointerMove(e.clientX);
      }
    };
    
    const handleGlobalUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('pointermove', handleGlobalMove);
      window.addEventListener('pointerup', handleGlobalUp);
      window.addEventListener('pointercancel', handleGlobalUp);
    }
    
    return () => {
      window.removeEventListener('pointermove', handleGlobalMove);
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('pointercancel', handleGlobalUp);
    };
  }, [isDragging, handlePointerMove]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const current = springX.get();
    if (e.key === 'ArrowLeft') {
      springX.set(Math.max(0, current - 5));
    } else if (e.key === 'ArrowRight') {
      springX.set(Math.min(100, current + 5));
    }
  };

  const clipPath = useTransform(springX, (val) => `inset(0 ${100 - val}% 0 0)`);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 w-full max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-amber-500 font-outfit tracking-widest uppercase text-sm font-semibold mb-4 block">
            See the Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-zinc-900">
            {comparisonData.title}
          </h2>
          <p className="text-zinc-600 font-inter text-lg max-w-2xl mx-auto">
            {comparisonData.subtitle}
          </p>
        </motion.div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group bg-zinc-100 h-[60vh] md:h-[80vh]"
        >
          {/* Main Container */}
          <div 
            ref={containerRef}
            className="absolute inset-0 touch-none outline-none"
            onPointerDown={handlePointerDown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={springX.get()}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Image comparison slider"
          >
            {/* Before Image (Background) */}
            <div className="absolute inset-0 select-none">
              <img 
                loading="lazy"
                src={comparisonData.before}
                alt="Before"
                className="w-full h-full object-cover pointer-events-none"
              />
              
              {/* Top Left Label: BEFORE */}
              <div className="absolute top-6 left-6 z-10 glass-panel bg-black/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg pointer-events-none">
                <span className="text-xs font-outfit uppercase tracking-widest text-white/80 block mb-0.5">Before</span>
                <span className="text-sm font-inter text-white font-medium">Raw MDF Finish</span>
              </div>
            </div>

            {/* After Image (Foreground, clipped) */}
            <motion.div 
              className="absolute inset-0 select-none pointer-events-none z-10"
              style={{ clipPath }}
            >
              <img 
                loading="lazy"
                src={comparisonData.after}
                alt="After"
                className="w-full h-full object-cover pointer-events-none"
              />
              
              {/* Top Right Label: AFTER */}
              <div className="absolute top-6 right-6 z-10 bg-amber-500/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg shadow-amber-500/20 border border-amber-400 pointer-events-none">
                <span className="text-xs font-outfit uppercase tracking-widest text-zinc-900/80 block mb-0.5">After</span>
                <span className="text-sm font-inter text-zinc-950 font-bold">Premium Acrylic Finish</span>
              </div>
            </motion.div>

            {/* Divider Line */}
            <motion.div 
              className="absolute top-0 bottom-0 w-[1px] md:w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.6)] z-20 pointer-events-none"
              style={{ x: useTransform(springX, (val) => `calc(${val}% - 1px)`) }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300 pointer-events-auto cursor-grab active:cursor-grabbing">
                <div className="flex gap-1 text-amber-400">
                  <motion.div animate={{ x: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <ChevronLeft className="w-5 h-5" />
                  </motion.div>
                  <motion.div animate={{ x: [2, -2, 2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
