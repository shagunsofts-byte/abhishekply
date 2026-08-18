import { BeforeAfterSection } from './components/BeforeAfterSection';
import { DoorTransition } from './components/DoorTransition';
import { FeaturedCollection } from './components/FeaturedCollection';
import { TabbedCategoryGallery } from './components/TabbedCategoryGallery';
import { SeoWrapper } from './components/SeoWrapper';
import { HeroSlider } from "./components/hero/HeroSlider";
import { SITE_CONFIG } from './data/siteConfig';
import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import { Link, useLocation } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronDown, Play, Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

// --- DATA ---
const BRANDS = ["Greenply", "CenturyPly", "Greenlam", "Merino", "Action Tesa", "Hettich", "Godrej", "Hafele", "Ebco"];

const COLLECTIONS = [
  { title: "Premium Plywood", href: "/products/plywood", img: "https://images.unsplash.com/photo-1572186789495-2c8ee0134468?q=80&w=1000&auto=format&fit=crop" },
  { title: "Luxury Laminates", href: "/products/laminates", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop" },
  { title: "Architectural Hardware", href: "/products/hardware", img: "https://images.unsplash.com/photo-1558025211-536412e87311?q=80&w=1000&auto=format&fit=crop" },
  { title: "Smart Locks", href: "/products/hardware?type=locks", img: "https://images.unsplash.com/photo-1558025211-16315582f3fb?q=80&w=1000&auto=format&fit=crop" },
  { title: "Modular Wardrobes", href: "/products/interiors?type=wardrobes", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop" },
];

const FAQS = [
  { q: "Do you provide installation support?", a: "Yes, we have a network of verified expert carpenters and installers to ensure your premium products are fitted perfectly." },
  { q: "Are the products covered by warranty?", a: "Absolutely. All our branded products like Greenply, Hettich, and Godrej come with an official manufacturer's warranty." },
  { q: "Can I get a custom quote for a full house interior?", a: "Yes! Visit our showroom or contact us on WhatsApp with your floor plan, and our experts will provide a customized bulk-pricing quote." }
];

const SHORTS_DATA = [
  { id: 1, views: "2.4K", buttonText: "Explore shade", imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop" },
  { id: 2, views: "1.8K", buttonText: "View collection", imageUrl: "https://images.unsplash.com/photo-1572186789495-2c8ee0134468?q=80&w=800&auto=format&fit=crop" },
  { id: 3, views: "3.2K", buttonText: "Shop look", imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop" },
  { id: 4, views: "956", buttonText: "Explore details", imageUrl: "https://images.unsplash.com/photo-1558025211-16315582f3fb?q=80&w=800&auto=format&fit=crop" },
  { id: 5, views: "5.1K", buttonText: "Get inspired", imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop" },
  { id: 6, views: "4.7K", buttonText: "View catalogue", imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" },
  { id: 7, views: "1.1K", buttonText: "Discover more", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop" },
  { id: 8, views: "8.9K", buttonText: "Shop the room", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
];

// --- COMPONENTS ---

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};


const Marquee = () => {
  return (
    <section id="brands" className="py-16 border-y border-stone-200 bg-white overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <motion.div 
          className="flex gap-16 items-center pr-16"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="text-2xl md:text-4xl font-serif font-bold text-stone-700 hover:text-brass-500 transition-colors duration-300 cursor-default">
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CollectionsSection = () => {
  return (
    <section id="collections" className="py-32 bg-stone-50 w-full overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-outfit font-bold uppercase tracking-[0.2em] text-brass-600 mb-4 block">
              Premium Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight text-stone-900">
              Explore Categories
            </h2>
            <p className="text-stone-500 font-inter text-lg">
              Browse premium plywood, laminates, doors & hardware.
            </p>
          </div>
          <Link to="/products">
          <MagneticButton className="px-6 py-3 border border-stone-200 rounded-full flex items-center gap-2 hover:border-brass-500 hover:text-brass-600 transition-colors group">
            View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          </Link>
        </motion.div>
      </div>

      <div className="w-full">
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
          {COLLECTIONS.map((col, idx) => (
            <Link to={col.href} key={idx}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`min-w-[70vw] md:min-w-[280px] h-[360px] md:h-[400px] relative rounded-2xl overflow-hidden group snap-center cursor-pointer ${idx === 0 ? 'ml-4 md:ml-8 lg:ml-12' : ''} ${idx === COLLECTIONS.length - 1 ? 'mr-4 md:mr-8 lg:mr-12' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <img loading="lazy" 
                  src={col.img} 
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                  <h3 className="text-2xl font-serif font-bold mb-2 text-white group-hover:text-brass-500 transition-colors">{col.title}</h3>
                  <div className="w-0 h-[2px] bg-brass-500 transition-all duration-500 group-hover:w-12 mb-4" />
                  <span className="text-sm font-outfit text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                    Explore Range <ChevronDown className="w-4 h-4 -rotate-90" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};
const Timeline = () => {
  const steps = [
    { title: "Consultation", desc: "Share your vision or floor plan with our experts." },
    { title: "Selection", desc: "Choose from 10,000+ premium finishes and hardware." },
    { title: "Quotation", desc: "Receive a transparent, competitive bulk estimate." },
    { title: "Delivery", desc: "Safe, on-time delivery directly to your site." }
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-stone-900">The Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-stone-50 border border-stone-100 rounded-2xl p-6 h-full flex flex-col hover:shadow-lg hover:border-stone-200 transition-all duration-300 relative z-10"
              >
                <div className="self-start">
                  <span className="text-xs font-bold text-brass-700 bg-brass-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Step {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-5 text-stone-900">{step.title}</h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">{step.desc}</p>
              </motion.div>
              
              {/* Connector Icon for large screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-stone-300 pointer-events-none translate-x-1/2">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { num: 25, label: "Years of Trust", suffix: "+" },
    { num: 5000, label: "Projects Completed", suffix: "+" },
    { num: 10, label: "Premium Brands", suffix: "+" },
    { num: 100, label: "Satisfaction", suffix: "%" }
  ];

  return (
    <section className="py-24 bg-brass-500 text-stone-950">
      <div className="px-4 md:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0 }}
                 whileInView={{ scale: 1, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ type: "spring", delay: idx * 0.1 }}
                 className="text-5xl md:text-7xl font-serif font-bold mb-2 tracking-tighter"
               >
                 {stat.num}{stat.suffix}
               </motion.div>
               <span className="font-outfit font-semibold uppercase tracking-widest text-sm opacity-80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-32 bg-stone-50">
      <div className="px-4 md:px-8 lg:px-12 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Questions Answered</h2>
          <p className="text-stone-600 font-outfit">Everything you need to know before stepping into our showroom.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border ${openIdx === idx ? 'border-brass-500/50 bg-white' : 'border-stone-200'} rounded-2xl overflow-hidden transition-colors duration-300`}
            >
              <button 
                className="w-full px-6 py-6 text-left flex justify-between items-center"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <span className="font-serif text-lg md:text-xl font-medium pr-8">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-brass-500 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-stone-600 font-inter leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoShortsCarousel = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIdx === null) return;
    if (e.key === 'ArrowLeft') {
      setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : prev));
    } else if (e.key === 'ArrowRight') {
      setSelectedIdx((prev) => (prev! < SHORTS_DATA.length - 1 ? prev! + 1 : prev));
    } else if (e.key === 'Escape') {
      setSelectedIdx(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  return (
    <section className="bg-[#bebda7] text-stone-900 font-sans overflow-hidden py-24 relative">
      <div className="px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center tracking-tight">
          Explore Real Transformations
        </h2>
      </div>

      <div className="relative w-full group">
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-stone-200 hover:bg-white text-stone-900 hover:scale-110 transition-all duration-300 ease-out ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-stone-900" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className={`absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-stone-200 hover:bg-white text-stone-900 hover:scale-110 transition-all duration-300 ease-out ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-stone-900" />
        </button>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {SHORTS_DATA.map((short, idx) => (
            <motion.div 
              key={short.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedIdx(idx)}
              className={`relative shrink-0 w-64 h-96 rounded-2xl overflow-hidden cursor-pointer snap-center group/card transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5 ${idx === 0 ? 'ml-4 md:ml-8 lg:ml-12' : ''} ${idx === SHORTS_DATA.length - 1 ? 'mr-4 md:mr-8 lg:mr-12' : ''}`}
            >
              <img loading="lazy" 
                src={short.imageUrl} 
                alt={`Inspiration ${short.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/0 to-black/80 pointer-events-none" />

              <div className="absolute top-4 left-4 bg-black/50 text-white text-xs font-medium rounded-full px-2.5 py-1.5 flex items-center gap-1.5 backdrop-blur-md border border-white/10">
                <Eye className="w-3.5 h-3.5" />
                {short.views}
              </div>

              <div className="absolute top-4 right-4 bg-white/10 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 transform group-hover/card:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-6 w-full flex justify-center px-4">
                <button className="w-full max-w-[180px] bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-stone-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl pointer-events-auto">
                  {short.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedIdx(null)}
          >
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-[160] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(Math.max(0, selectedIdx - 1)); }}
              className={`absolute left-4 md:left-12 z-[160] w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 ${selectedIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedIdx === 0}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <motion.div 
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[45vh] md:max-w-md aspect-[9/16] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 z-[160]"
            >
              <img loading="lazy" 
                src={SHORTS_DATA[selectedIdx].imageUrl} 
                alt="Selected content"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
              <div className="absolute top-6 left-6 bg-black/60 text-white text-sm font-medium rounded-full px-3 py-1.5 flex items-center gap-2 backdrop-blur-md border border-white/10">
                <Eye className="w-4 h-4" />
                {SHORTS_DATA[selectedIdx].views}
              </div>
              <div className="absolute bottom-8 w-full flex justify-center px-6">
                <button className="w-full bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-stone-200 active:scale-95 transition-all shadow-xl">
                  {SHORTS_DATA[selectedIdx].buttonText}
                </button>
              </div>
            </motion.div>
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(Math.min(SHORTS_DATA.length - 1, selectedIdx + 1)); }}
              className={`absolute right-4 md:right-12 z-[160] w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 ${selectedIdx === SHORTS_DATA.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedIdx === SHORTS_DATA.length - 1}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer id="contact" className="bg-stone-950 text-stone-400 pt-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-brass-500/10 blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        {/* Middle: brand + links + business hours + map (map only on homepage) */}
        <div className={`grid grid-cols-1 ${isHome ? 'lg:grid-cols-12' : 'lg:grid-cols-9'} gap-10 lg:gap-8 pt-2 pb-14 text-sm font-inter`}>
          <div className="lg:col-span-3">
            <span className="font-serif text-xl font-bold text-white tracking-wide block mb-3">Abhishek Ply & Hardware</span>
            <p className="text-stone-500 text-xs leading-relaxed max-w-[220px]">
              Premium plywood, laminates, veneers and architectural hardware — trusted in Bahraich since 1995.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-outfit font-semibold uppercase tracking-widest text-xs text-stone-500 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link to="/products/plywood" className="hover:text-brass-500 transition-colors">Plywood</Link></li>
              <li><Link to="/products/laminates" className="hover:text-brass-500 transition-colors">Laminates</Link></li>
              <li><Link to="/products/hardware" className="hover:text-brass-500 transition-colors">Hardware</Link></li>
              <li><Link to="/products" className="hover:text-brass-500 transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-outfit font-semibold uppercase tracking-widest text-xs text-stone-500 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/products/interiors?type=kitchen" className="hover:text-brass-500 transition-colors">Modular Kitchens</Link></li>
              <li><a href="#faq" className="hover:text-brass-500 transition-colors">FAQs</a></li>
              <li><Link to="/" className="hover:text-brass-500 transition-colors">Home</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-outfit font-semibold uppercase tracking-widest text-xs text-stone-500 mb-4">Business Hours</h4>
            <p className="leading-relaxed">
              {SITE_CONFIG.businessHours.weekdays}
            </p>
            <p className="leading-relaxed mb-3">
              {SITE_CONFIG.businessHours.weekdayHours}
            </p>
            <p className="leading-relaxed text-stone-500">
              {SITE_CONFIG.businessHours.weekend}: {SITE_CONFIG.businessHours.weekendHours}
            </p>
          </div>

          {isHome && (
            <div className="lg:col-span-3">
              <h4 className="font-outfit font-semibold uppercase tracking-widest text-xs text-stone-500 mb-4">Visit Us</h4>
              <a
                href={SITE_CONFIG.googleMapsUrl.replace('&output=embed', '')}
                target="_blank"
                rel="noreferrer"
                className="group relative block w-full h-[220px] md:h-[260px] rounded-2xl overflow-hidden border border-stone-800 hover:border-brass-500/40 transition-colors"
              >
                <iframe
                  title="Abhishek Ply & Hardware Location"
                  src={SITE_CONFIG.googleMapsUrl}
                  className="w-full h-full grayscale-[45%] contrast-[1.05] opacity-85 pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-inter text-stone-300 leading-relaxed line-clamp-2">
                      {SITE_CONFIG.addressEnglish.split('\n').join(', ')}
                    </p>
                  </div>
                  <span className="shrink-0 bg-brass-500 group-hover:bg-brass-400 text-stone-950 text-xs font-outfit font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                    Get Directions
                  </span>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Bottom bar — dual branding, full width */}
        <div className="pt-6 pb-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-5 text-xs">
          <div className="flex items-center gap-4 order-2 md:order-1">
            <span className="text-stone-500">&copy; {new Date().getFullYear()} Abhishek Ply & Hardware. All Rights Reserved.</span>
            <div className="hidden sm:flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:border-brass-500 hover:text-brass-500 transition-colors"><Instagram className="w-3.5 h-3.5"/></a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:border-brass-500 hover:text-brass-500 transition-colors"><Facebook className="w-3.5 h-3.5"/></a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:border-brass-500 hover:text-brass-500 transition-colors"><Twitter className="w-3.5 h-3.5"/></a>
            </div>
          </div>

          <a
            href="https://shreejiinfosys.com"
            target="_blank"
            rel="noreferrer"
            className="order-1 md:order-2 text-stone-500 hover:text-brass-500 transition-colors font-inter"
          >
            Designed &amp; Built by <span className="font-outfit font-semibold text-stone-300">Shreeji Infosys</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
// --- MAIN APP ---
export default function Home({ hasBootAnimationPlayed = false, setHasBootAnimationPlayed }: { hasBootAnimationPlayed?: boolean, setHasBootAnimationPlayed?: (val: boolean) => void }) {

  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>

      <SeoWrapper />
      <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "${SITE_CONFIG.businessName}",
              "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
              "@id": "https://www.abhishekplyandhardware.com",
              "url": "https://www.abhishekplyandhardware.com",
              "telephone": "+91${SITE_CONFIG.primaryPhone}",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Banjari Mod, Lucknow Road",
                "addressLocality": "Bahraich",
                "addressRegion": "UP",
                "postalCode": "271801",
                "addressCountry": "IN"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              }
            }
          `}
        </script>
      <main className="relative w-full min-h-screen overflow-x-hidden bg-stone-50 text-stone-950 selection:bg-brass-500/30 selection:text-stone-900">
        <DoorTransition hasPlayed={hasBootAnimationPlayed} onComplete={() => setHasBootAnimationPlayed?.(true)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroSlider />
            <TabbedCategoryGallery />
            
            <Marquee />
            <CollectionsSection />
            <BeforeAfterSection />
            <FeaturedCollection />
            <Timeline />
            <Stats />
            <FAQ />
            <VideoShortsCarousel />
          </motion.div>
        </DoorTransition>
      </main>
    </>
  );
}