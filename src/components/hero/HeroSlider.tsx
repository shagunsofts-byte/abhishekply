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
    swatch: 'plywood' as const,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
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
    swatch: 'laminate' as const,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop',
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
    swatch: 'hardware' as const,
    image: 'https://images.unsplash.com/photo-1558211583-05bdfa91b29c?q=80&w=1200&auto=format&fit=crop',
  }
];

const SWATCH_COLORS: Record<string, string> = {
  plywood: '#8C6935',
  laminate: '#AD8342',
  hardware: '#5C4530',
};

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
    <section className="relative w-full flex items-center min-h-screen overflow-hidden bg-paper">
      {/* Ambient warm glow — keeps the paper background from feeling flat */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 78% 45%, rgba(173,131,66,0.16) 0%, rgba(173,131,66,0) 70%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none ply-layers opacity-[0.035]" />

      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          {/* Text column */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-6 h-[2px] bg-brass-500" />
              <span className="text-[11px] font-outfit font-semibold uppercase tracking-[0.2em] text-brass-600">
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
                <h1 className="font-serif text-[42px] sm:text-6xl lg:text-[64px] font-semibold text-espresso-950 leading-[1.02] tracking-tight mb-5">
                  {slide.title}
                </h1>
                <p className="text-espresso-600 text-base leading-relaxed max-w-[400px] mb-9 font-inter">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mb-12">
              <button
                onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}`, '_blank')}
                className="bg-rust-600 hover:bg-rust-700 text-white px-7 py-3.5 rounded-full font-outfit font-semibold text-sm transition-all shadow-sm"
              >
                {slide.primaryLabel}
              </button>
              <a
                href={slide.secondaryLink}
                className="group font-outfit font-semibold text-sm text-espresso-900 flex items-center gap-1.5"
              >
                {slide.secondaryLabel}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Material-chip pagination — each chip is the actual material color, not a decorative dot */}
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
                      currentSlide === idx ? 'w-7 h-2.5' : 'w-2.5 h-2.5 opacity-40 group-hover:opacity-70'
                    }`}
                    style={{ backgroundColor: SWATCH_COLORS[s.swatch] }}
                  />
                  <span
                    className={`text-[11px] font-outfit font-medium transition-opacity ${
                      currentSlide === idx ? 'opacity-100 text-espresso-800' : 'opacity-0 w-0 overflow-hidden'
                    }`}
                  >
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Signature visual column — one clean, well-cropped photo per slide,
              crossfading smoothly. No competing elements stacked on top of it. */}
          <div className="relative w-full max-w-[440px] mx-auto lg:max-w-none">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(21,16,11,0.35)]">
              <AnimatePresence mode="sync">
                <motion.img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.tag}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gentle bottom gradient — just enough for the dots below to read clearly */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso-950/55 to-transparent pointer-events-none" />

              {/* Hang tag — the one signature detail, not competing with the photo */}
              <div className="absolute top-5 right-5">
                <div className="bg-paper/95 backdrop-blur px-3.5 py-2 rounded-lg shadow-md">
                  <span className="font-outfit text-[11px] font-bold text-espresso-950 tracking-wide">EST. 1995</span>
                </div>
              </div>

              {/* Category label, bottom-left, sitting on the gradient */}
              <div className="absolute bottom-5 left-5">
                <span className="font-outfit text-xs font-semibold uppercase tracking-[0.15em] text-paper/90">
                  {slide.tag}
                </span>
              </div>

              {/* Image dots, bottom-right, sitting on the gradient */}
              <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Show ${s.tag}`}
                    className={`block rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-5 h-1.5 bg-paper' : 'w-1.5 h-1.5 bg-paper/50 hover:bg-paper/80'
                    }`}
                  />
                ))}
              </div>
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
