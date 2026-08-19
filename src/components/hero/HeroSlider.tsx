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

// The signature visual: a fanned stack of material swatch cards — plywood
// cross-ply, laminate sheen, wood-grain veneer, brushed hardware — because
// that's literally what this business sells, rather than a stock lifestyle photo.
const SwatchFan: React.FC<{ active: 'plywood' | 'laminate' | 'hardware' }> = ({ active }) => {
  const cards = [
    { key: 'veneer', rotate: -14, x: -58, label: 'Veneer', sub: 'Natural Teak' },
    { key: 'hardware', rotate: -5, x: -22, label: 'Hardware', sub: 'Brass · SS304' },
    { key: 'laminate', rotate: 5, x: 14, label: 'Laminate', sub: 'High Gloss' },
    { key: 'plywood', rotate: 14, x: 50, label: 'Plywood', sub: 'BWP · 19mm' },
  ];

  return (
    <div className="relative w-[300px] h-[340px] sm:w-[340px] sm:h-[380px] mx-auto">
      {cards.map((card, i) => {
        const isActive = card.key === active;
        return (
          <motion.div
            key={card.key}
            initial={false}
            animate={{
              rotate: card.rotate,
              x: card.x,
              y: isActive ? -14 : 0,
              scale: isActive ? 1.04 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-4 -translate-x-1/2 w-[150px] h-[210px] sm:w-[168px] sm:h-[236px] rounded-2xl shadow-[0_20px_40px_-12px_rgba(21,16,11,0.35)] border border-espresso-950/10 overflow-hidden"
            style={{ zIndex: i, transformOrigin: 'bottom center' }}
          >
            {card.key === 'plywood' && <div className="ply-layers w-full h-full" />}
            {card.key === 'laminate' && (
              <div
                className="w-full h-full"
                style={{ background: 'linear-gradient(135deg, #C2984F 0%, #8C6935 60%, #6C512A 100%)' }}
              />
            )}
            {card.key === 'veneer' && (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(100deg, #7C5F3F 0px, #7C5F3F 2px, #A9895F 2px, #A9895F 5px, #5C4530 5px, #5C4530 7px)',
                }}
              />
            )}
            {card.key === 'hardware' && (
              <div
                className="w-full h-full"
                style={{ background: 'linear-gradient(160deg, #E6CE9C 0%, #AD8342 45%, #362A1B 100%)' }}
              />
            )}

            <div className="absolute bottom-0 inset-x-0 bg-paper/95 px-3 py-2.5">
              <p className="font-outfit text-[11px] font-semibold text-espresso-950 leading-none">{card.label}</p>
              <p className="font-outfit text-[9px] text-espresso-600 mt-1 tracking-wide">{card.sub}</p>
            </div>
          </motion.div>
        );
      })}

      {/* Hang tag — a small signature detail, like the sample tags on real material swatches */}
      <motion.div
        initial={{ rotate: -8 }}
        animate={{ rotate: [-8, -4, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 right-2 sm:right-6 z-20"
      >
        <div className="w-16 h-9 bg-brass-500 rounded-md shadow-lg flex items-center justify-center relative">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-paper border-2 border-brass-700" />
          <span className="font-outfit text-[10px] font-bold text-espresso-950 tracking-tight">EST. 1995</span>
        </div>
      </motion.div>
    </div>
  );
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
      {/* Ambient warm glow, not a photo — keeps focus on the swatch fan and type */}
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

          {/* Signature visual column */}
          <div className="relative">
            {/* Photo backdrop — real material/site photography, crossfading per slide.
                Duotone-treated (not shown raw) so it sits behind the illustrated swatch
                fan as depth/context rather than competing with it. */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[280px] h-[300px] sm:w-[320px] sm:h-[340px] rounded-[2rem] overflow-hidden">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={slide.image}
                    src={slide.image}
                    alt=""
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'grayscale(35%) sepia(25%) saturate(1.1) contrast(1.05) brightness(0.88)' }}
                  />
                </AnimatePresence>
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg, rgba(241,234,217,0.15) 0%, rgba(21,16,11,0.55) 100%)' }}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <SwatchFan active={slide.swatch} />
              </motion.div>
            </AnimatePresence>

            {/* Image dots — separate from the material-chip pagination, these hint
                that the backdrop itself is a multi-image slideshow. */}
            <div className="relative flex items-center justify-center gap-1.5 mt-3">
              {SLIDES.map((s, idx) => (
                <span
                  key={s.id}
                  className={`block rounded-full bg-espresso-400 transition-all duration-300 ${
                    currentSlide === idx ? 'w-4 h-1.5 opacity-90' : 'w-1.5 h-1.5 opacity-30'
                  }`}
                />
              ))}
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
