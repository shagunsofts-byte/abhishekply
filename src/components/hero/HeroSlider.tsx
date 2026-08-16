import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../data/siteConfig';
import { CategoryDock } from '../category/CategoryDock';

const SLIDES = [
  {
    id: 1,
    eyebrow: "Trusted Since 1995",
    title: (
      <>
        Premium Plywood.<br />
        Built to Last.
      </>
    ),
    description: "Bahraich's trusted source for plywood, laminates & hardware.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    badge: { stat: "29+", label: "Years of Trust" }
  },
  {
    id: 2,
    eyebrow: "Modular Interiors",
    title: (
      <>
        Kitchens That<br />
        Inspire Daily.
      </>
    ),
    description: "Custom modular kitchens & wardrobes, designed around you.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    badge: { stat: "500+", label: "Homes Furnished" }
  },
  {
    id: 3,
    eyebrow: "Architectural Hardware",
    title: (
      <>
        Hardware With a<br />
        Finishing Touch.
      </>
    ),
    description: "Premium locks, handles & fittings from trusted global brands.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    badge: { stat: "12+", label: "Global Brands" }
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex items-center min-h-screen overflow-hidden bg-[#f3f2ee]">
      {/* Background Hardware Showroom Image Layer */}
      <div className="absolute inset-0 w-full h-full flex justify-end z-0 pointer-events-none overflow-hidden">
        {/* Full Image Element */}
        <div className="relative w-full lg:w-[62%] xl:w-[58%] h-full">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentSlide}
              src={SLIDES[currentSlide].image} 
              alt="Abhishek Ply & Hardware Showroom" 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-right"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 100%)'
              }}
            />
          </AnimatePresence>
          {/* Subtle Gradient Blend Overlay for Mobile/Tablet */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3f2ee] via-[#f3f2ee]/80 to-transparent lg:hidden z-10"></div>
        </div>
      </div>

      {/* Floating stat badge — a small signature touch overlapping the image */}
      <div className="hidden lg:block absolute right-10 xl:right-16 top-1/2 -translate-y-1/2 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white/90 backdrop-blur-md border border-white/60 shadow-xl shadow-black/10 rounded-2xl px-6 py-5 text-right"
          >
            <span className="block font-serif text-3xl font-bold text-[#1e1e1e] leading-none">
              {SLIDES[currentSlide].badge.stat}
            </span>
            <span className="block text-[11px] font-outfit uppercase tracking-widest text-amber-600 mt-1.5">
              {SLIDES[currentSlide].badge.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Overlay Gradient to make text 100% crisp and readable */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 hidden lg:block"
        style={{
          background: 'linear-gradient(to right, #f3f2ee 0%, #f3f2ee 42%, rgba(243, 242, 238, 0.85) 55%, rgba(243, 242, 238, 0) 100%)'
        }}
      ></div>

      {/* Main Content Column */}
      <div className="relative z-20 max-w-[1536px] w-full mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-0">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-2xl min-h-[320px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span className="text-[11px] sm:text-xs font-outfit font-semibold uppercase tracking-[0.2em] text-amber-600">
                  {SLIDES[currentSlide].eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-bold text-[#1e1e1e] leading-[1.12] tracking-tight mb-4">
                {SLIDES[currentSlide].title}
              </h1>

              {/* Body Line */}
              <p className="text-[#5d5d5d] text-sm sm:text-base leading-relaxed max-w-[440px] mb-8 font-normal font-inter">
                {SLIDES[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10 sm:mb-14 font-inter">
            {/* Button 1: Get a Quote */}
            <button 
              onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}`, '_blank')} 
              className="bg-[#e05358] hover:bg-[#cc454a] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center"
            >
              Get a Quote
            </button>
            
            {/* Button 2: Explore Collection */}
            <a 
              href="#collections" 
              className="bg-[#1e1e1e] hover:bg-[#000000] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm flex items-center justify-center"
            >
              Explore Collection
            </a>
          </div>

          {/* Slider Pagination — animated progress segments with a counter */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className="relative w-9 h-[3px] rounded-full bg-black/10 overflow-hidden"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {currentSlide === idx && (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-amber-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  )}
                  {currentSlide > idx && <span className="absolute inset-0 bg-[#1e1e1e]/70 rounded-full" />}
                </button>
              ))}
            </div>
            <span className="text-[11px] font-outfit text-gray-400 tabular-nums">
              0{currentSlide + 1} — 0{SLIDES.length}
            </span>
          </div>

          {/* Trusted By Footer Row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-inter">
            <span className="text-gray-400 font-medium">Trusted by</span>
            <div className="flex items-center gap-4 sm:gap-6 font-semibold text-[#3d3d3d]">
              <span className="hover:text-amber-600 transition-colors cursor-default">CenturyPly</span>
              <span className="hover:text-amber-600 transition-colors cursor-default">Hettich</span>
              <span className="hover:text-amber-600 transition-colors cursor-default">Häfele</span>
              <span className="hover:text-amber-600 transition-colors cursor-default">Godrej</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-Browse Dock — desktop only, kept inside the hero's bounds so it isn't clipped */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex justify-center">
        <CategoryDock />
      </div>
    </section>
  );
};
