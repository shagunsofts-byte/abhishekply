import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, ChevronLeft, ChevronRight, Mouse } from 'lucide-react';
import { HERO_SLIDES } from '../../data/heroSlides';
import { CategoryDock } from '../category/CategoryDock';


export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const SLIDE_DURATION = 9000;
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isHovered) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length);
            return 0;
          }
          return prev + (100 / (SLIDE_DURATION / 100));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isHovered, currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
        setProgress(0);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setProgress(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -10000) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setProgress(0);
    } else if (swipe > 10000) {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setProgress(0);
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  // Helper to highlight a keyword
  const renderTitle = (title: string, highlight: string) => {
    // If highlight is not found in title, we just return title. But requirement says we must highlight keyword.
    // Given the prompt, the title has the keyword or we can just replace. 
    // Actually the prompt says "Example: Premium Plywood". Let's split by newline to handle the line breaks nicely.
    
    // A simpler way: we know highlightKeyword might not exactly match the title text if there's casing diff, but we can do a replace.
    // Let's do a case-insensitive replace.
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? 
          <span key={i} className="text-amber-500 italic">{part}</span> : 
          part
        )}
      </>
    );
  };

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 15, ease: "linear" }
          }}
          style={{ y: y1, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
        >
          {slide.type === 'video' && slide.video ? (
            <video
              ref={videoRef}
              src={slide.video}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-[1.05]"
            />
          ) : (
            <img
              src={slide.desktopImage}
              alt={slide.title}
              className="w-full h-full object-cover brightness-110 contrast-[1.08] saturate-[1.05]"
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.35),rgba(20,20,20,0.25))]" />
          <div className="absolute inset-0 bg-[#3a2000]/20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="px-4 md:px-8 lg:px-12 w-full relative z-10 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
            className="flex flex-col items-center bg-black/5 backdrop-blur-[4px] p-6 md:p-10 rounded-3xl mb-12 md:mb-0"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.3] md:leading-[1.1] mb-6 md:mb-6 text-white whitespace-pre-line drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] line-clamp-2 md:line-clamp-none max-h-[35vh] md:max-h-none overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {renderTitle(slide.title, slide.highlightKeyword)}
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-gray-200 font-inter text-base md:text-xl mb-8 md:mb-10 leading-relaxed whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] line-clamp-2 md:line-clamp-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slide.subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to={slide.primaryLink} 
                className="bg-amber-500 text-zinc-950 rounded-full font-outfit font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all px-6 py-3 md:px-8 md:py-4 flex items-center gap-2"
              >
                {slide.primaryButton} <ArrowRight className="w-5 h-5" />
              </Link>
              {slide.secondaryLink.startsWith('http') ? (
              <a 
                href={slide.secondaryLink}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-outfit font-medium text-lg hover:bg-white/20 shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all px-8 py-4 items-center gap-2"
              >
                {slide.secondaryButton}
              </a>
            ) : (
              <Link 
                to={slide.secondaryLink}
                className="hidden sm:flex bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-outfit font-medium text-lg hover:bg-white/20 shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all px-8 py-4 items-center gap-2"
              >
                {slide.secondaryButton}
              </Link>
            )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="hidden md:flex absolute bottom-32 right-4 md:right-12 z-20 flex-col items-end gap-4">
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => {
              setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
              setProgress(0);
            }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
              setProgress(0);
            }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white font-outfit font-bold text-xl">
            {(currentSlide + 1).toString().padStart(2, '0')}
          </span>
          <div className="w-32 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-amber-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/50 font-outfit font-medium text-sm">
            {HERO_SLIDES.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Mobile Pagination Dots */}
      <div className="md:hidden absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-amber-500 w-4' : 'bg-white/30'}`} />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-gray-400"
      >
        <span className="text-xs font-outfit uppercase tracking-widest text-white/70">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse className="w-6 h-6 text-amber-500 mb-2 opacity-80" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto" />
        </motion.div>
      </motion.div>

      {/* Hero Bottom Dock */}
      <CategoryDock activeSlug={slide.primaryLink.split('/').pop()} />
    </section>
  );
};
