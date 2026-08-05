import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { comparisonData } from '../data/comparisonSection';

export const BeforeAfterSection = () => {
  const [position, setPosition] = useState(35);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasInteractedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(e.target.value));
    if (!hasInteracted) {
      setHasInteracted(true);
      hasInteractedRef.current = true;
    }
  };

  useEffect(() => {
    if (isInView && !hasInteractedRef.current) {
      const controls = animate(35, 65, {
        duration: 0.8,
        delay: 0.5,
        ease: "easeInOut",
        onUpdate: (v) => {
          if (!hasInteractedRef.current) setPosition(v);
        },
        onComplete: () => {
          if (!hasInteractedRef.current) {
            animate(65, 50, {
              duration: 0.8,
              delay: 0.2,
              ease: "easeInOut",
              onUpdate: (v) => {
                if (!hasInteractedRef.current) setPosition(v);
              }
            });
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-zinc-50">
      <div className="px-4 md:px-8 lg:px-12 w-full max-w-7xl mx-auto mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[#D4AF37] font-outfit tracking-widest uppercase text-sm font-semibold mb-4 block">
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

      <div className="w-full px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* Premium Glassmorphism Container Frame */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] p-2 md:p-4 rounded-[24px] md:rounded-[32px]">
            
            <div className="relative w-full h-[60vh] md:h-[75vh] rounded-[16px] md:rounded-[24px] overflow-hidden group bg-zinc-200 shadow-inner">
              
              {/* After Image (Background - Right Side) */}
              <div className="absolute inset-0">
                <img 
                  loading="lazy"
                  src={comparisonData.after}
                  alt="After"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-black/50 backdrop-blur-xl px-4 py-2 md:px-6 md:py-2.5 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-none text-right">
                  <span className="text-[10px] md:text-xs font-outfit uppercase tracking-[0.1em] text-white/70 block mb-0.5">After</span>
                  <span className="text-xs md:text-sm font-inter text-white font-medium">Premium Acrylic Finish</span>
                </div>
              </div>

              {/* Before Image (Foreground - Left Side - Clipped) */}
              <div 
                className="absolute inset-0 z-10"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <img 
                  loading="lazy"
                  src={comparisonData.before}
                  alt="Before"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-black/50 backdrop-blur-xl px-4 py-2 md:px-6 md:py-2.5 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-none">
                  <span className="text-[10px] md:text-xs font-outfit uppercase tracking-[0.1em] text-white/70 block mb-0.5">Before</span>
                  <span className="text-xs md:text-sm font-inter text-white font-medium">Raw MDF Finish</span>
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div 
                className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
                style={{ left: `${position}%`, transform: 'translateX(-50%)', width: '4px' }}
              >
                {/* The vertical premium gold line */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                
                {/* The Handle */}
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_8px_32px_rgba(0,0,0,0.2),_inset_0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                  <ArrowLeftRight className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2} />
                </div>
              </div>

              {/* Invisible Range Input for Native Flawless Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={position}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0 outline-none"
                aria-label="Image comparison slider"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Helper Text */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            animate={{ opacity: hasInteracted ? 0 : 1, y: hasInteracted ? 10 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8 text-zinc-400 font-outfit text-sm tracking-widest uppercase flex items-center justify-center gap-3 pointer-events-none select-none"
          >
            <span className="opacity-60">&larr;</span> 
            Drag to Compare 
            <span className="opacity-60">&rarr;</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
