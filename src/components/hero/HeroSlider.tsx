import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../data/siteConfig';
import { CategoryDock } from '../category/CategoryDock';

const SLIDES = [
  {
    id: 1,
    title: (
      <>
        Premium Plywood,<br className="hidden sm:inline" />
        Laminates & Hardware<br className="hidden sm:inline" />
        in Lucknow.
      </>
    ),
    description: "Abhishek Ply & Hardware is a Lucknow plywood dealer and laminate, veneer and hardware store for premium homes, modular kitchens, architects and contractors. Since 1995.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: (
      <>
        Exquisite Interiors,<br className="hidden sm:inline" />
        Modular Kitchens<br className="hidden sm:inline" />
        & Wardrobes.
      </>
    ),
    description: "Transform your living spaces with our premium range of modular kitchens, custom wardrobes, and interior solutions tailored to your lifestyle.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: (
      <>
        Top-Tier Hardware,<br className="hidden sm:inline" />
        Security Solutions<br className="hidden sm:inline" />
        & Door Fittings.
      </>
    ),
    description: "Discover a curated collection of architectural hardware, digital locks, and premium door accessories from leading global brands.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
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
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-black text-[#1e1e1e] leading-[1.12] tracking-tight mb-5 font-inter">
                {SLIDES[currentSlide].title}
              </h1>

              {/* Body Paragraph */}
              <p className="text-[#5d5d5d] text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-[490px] mb-8 font-normal font-inter">
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

          {/* Slider Pagination Controls */}
          <div className="flex items-center gap-3 mb-8">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  currentSlide === idx ? 'w-8 bg-[#e05358]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Trusted By Footer Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13px] font-inter">
            <span className="text-gray-500 font-medium">Trusted by</span>
            <div className="flex items-center gap-5 sm:gap-7 font-bold text-[#2d2d2d]">
              <span className="hover:text-[#e05358] transition-colors cursor-default">Century Ply</span>
              <span className="hover:text-[#e05358] transition-colors cursor-default">Hettich</span>
              <span className="hover:text-[#e05358] transition-colors cursor-default">Häfele</span>
              <span className="hover:text-[#e05358] transition-colors cursor-default">Godrej</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick-Browse Dock — overlaps the hero/next-section boundary */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 hidden sm:flex justify-center">
        <CategoryDock />
      </div>
    </section>
  );
};
