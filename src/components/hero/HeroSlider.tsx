import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../data/siteConfig';
import { CategoryDock } from '../category/CategoryDock';

const SLIDES = [
  {
    id: 1,
    tag: 'Plywood',
    title: (
      <>
        Timber You<br />
        Can Trust.
      </>
    ),
    description: "Bahraich's plywood, laminate & hardware specialists since 1995.",
    primaryLabel: 'Get a Quote',
    secondaryLabel: 'Browse Plywood',
    secondaryLink: '/products/plywood',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'Interiors',
    title: (
      <>
        Kitchens,<br />
        Built Right.
      </>
    ),
    description: 'Modular kitchens and wardrobes, made to fit your home.',
    primaryLabel: 'Get a Quote',
    secondaryLabel: 'Explore Interiors',
    secondaryLink: '/products/interiors',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'Hardware',
    title: (
      <>
        Fittings That<br />
        Finish It.
      </>
    ),
    description: 'Locks, handles & fittings from trusted global brands.',
    primaryLabel: 'Get a Quote',
    secondaryLabel: 'Browse Hardware',
    secondaryLink: '/products/hardware',
    image: 'https://images.unsplash.com/photo-1558211583-05bdfa91b29c?q=80&w=1920&auto=format&fit=crop',
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full flex items-center min-h-screen overflow-hidden bg-espresso-950">
      {/* Full-bleed background photo, crossfading per slide */}
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.tag}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Legibility gradient — strong behind the text on the left, lighter on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(21,16,11,0.92) 0%, rgba(21,16,11,0.78) 32%, rgba(21,16,11,0.42) 60%, rgba(21,16,11,0.22) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-espresso-950/20 pointer-events-none" />

      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 py-24 lg:py-0">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-6 h-[2px] bg-brass-400" />
            <span className="text-[11px] font-outfit font-semibold uppercase tracking-[0.2em] text-brass-300">
              Bahraich · Est. 1995
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="font-serif text-[42px] sm:text-6xl lg:text-[64px] font-semibold text-white leading-[1.02] tracking-tight mb-5">
                {slide.title}
              </h1>
              <p className="text-stone-200 text-base leading-relaxed max-w-[400px] mb-9 font-inter">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mb-12">
            <button
              onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}`, '_blank')}
              className="bg-rust-600 hover:bg-rust-700 text-white px-7 py-3.5 rounded-full font-outfit font-semibold text-sm transition-all shadow-lg"
            >
              {slide.primaryLabel}
            </button>
            <a
              href={slide.secondaryLink}
              className="group font-outfit font-semibold text-sm text-white flex items-center gap-1.5"
            >
              {slide.secondaryLabel}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Slide pagination */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className="group flex items-center gap-2"
                aria-label={`Show ${s.tag}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-7 h-1.5 bg-brass-400' : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
                  }`}
                />
                <span
                  className={`text-[11px] font-outfit font-medium transition-opacity ${
                    currentSlide === idx ? 'opacity-100 text-white' : 'opacity-0 w-0 overflow-hidden'
                  }`}
                >
                  {s.tag}
                </span>
              </button>
            ))}
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
