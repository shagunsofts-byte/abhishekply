import { BeforeAfterSection } from './components/BeforeAfterSection';
import { DoorTransition } from './components/DoorTransition';
import { FeaturedCollection } from './components/FeaturedCollection';
import { TabbedCategoryGallery } from './components/TabbedCategoryGallery';
import { SeoWrapper } from './components/SeoWrapper';
import { HeroSlider } from "./components/hero/HeroSlider";
import { TrustSection } from './components/TrustSection';
import { SITE_CONFIG } from './data/siteConfig';
import { ContactCard } from './components/ContactCard';
import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import { Link, useLocation } from 'react-router-dom';

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Menu, X, ArrowRight, ArrowLeftRight, CheckCircle2, 
  MapPin, Phone, Clock, ChevronDown, Play, Instagram, Facebook, Twitter,
  ChevronLeft, ChevronRight, Eye, Sparkles, MessageCircle, Mail
} from 'lucide-react';

// --- STYLES & FONTS ---
// Injecting premium fonts directly
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  :root {
    --gold: #d97706; /* amber-600 */
    --gold-light: #f59e0b; /* amber-500 */
    --wood-dark: #3f2e23;
  }

  body {
    background-color: #fafafa; /* zinc-50 */
    color: #09090b; /* zinc-950 */
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .font-serif {
    font-family: 'Playfair Display', serif;
  }

  .font-outfit {
    font-family: 'Outfit', sans-serif;
  }

  /* Hide scrollbar for seamless cinematic feel */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .text-gradient {
    background: linear-gradient(135deg, #fef3c7 0%, #d97706 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(245, 158, 11, 0.3);
  }
`;

// --- DATA ---
const COLLECTIONS = [
  { title: "Premium Plywood", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop" },
  { title: "Luxury Laminates", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop" },
  { title: "Flush Doors", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop" },
  { title: "Hardware", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop" },
  { title: "Interiors", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop" },
];

const FAQS = [
  { q: "Do you provide installation support?", a: "Yes, we have a network of verified expert carpenters and installers to ensure your premium products are fitted perfectly." },
  { q: "Are the products covered by warranty?", a: "Absolutely. All our branded products like Greenply, Hettich, and Godrej come with an official manufacturer's warranty." },
  { q: "Can I get a custom quote for a full house interior?", a: "Yes! Visit our showroom or contact us on WhatsApp with your floor plan, and our experts will provide a customized bulk-pricing quote." }
];

const SHORTS_DATA = [
  { id: 1, views: "2.4K", buttonText: "Explore shade", imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop" },
  { id: 2, views: "1.8K", buttonText: "View collection", imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop" },
  { id: 3, views: "3.2K", buttonText: "Shop look", imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop" },
  { id: 4, views: "956", buttonText: "Explore details", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
  { id: 5, views: "5.1K", buttonText: "Get inspired", imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop" },
  { id: 6, views: "4.7K", buttonText: "View catalogue", imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" },
  { id: 7, views: "1.1K", buttonText: "Discover more", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop" },
  { id: 8, views: "8.9K", buttonText: "Shop the room", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
];

// --- COMPONENTS ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'button' || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-amber-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-amber-500/50 rounded-full pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
      />
    </>
  );
};

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

const CollectionsSection = () => {
  return (
    <section id="collections" className="py-32 bg-zinc-50 w-full overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-outfit font-bold uppercase tracking-[0.2em] text-amber-600 mb-4 block">
              Premium Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight text-zinc-900">
              Explore Categories
            </h2>
            <p className="text-zinc-500 font-inter text-lg">
              Browse premium plywood, laminates, doors & hardware.
            </p>
          </div>
          <Link to="/products">
          <MagneticButton className="px-6 py-3 border border-zinc-200 rounded-full flex items-center gap-2 hover:border-amber-500 hover:text-amber-600 transition-colors group">
            View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          </Link>
        </motion.div>
      </div>

      <div className="w-full">
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
          {COLLECTIONS.map((col, idx) => (
            <motion.div 
              key={idx}
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
                <h3 className="text-2xl font-serif font-bold mb-2 text-white group-hover:text-amber-500 transition-colors">{col.title}</h3>
                <div className="w-0 h-[2px] bg-amber-500 transition-all duration-500 group-hover:w-12 mb-4" />
                <span className="text-sm font-outfit text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                  Explore Range <ChevronDown className="w-4 h-4 -rotate-90" />
                </span>
              </div>
            </motion.div>
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
const DoorShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 bg-zinc-50 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 w-full flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Masterpiece<br/>Doors</h2>
            <p className="text-zinc-600 font-inter mb-8 text-lg">
              Solid wood, flush doors, and engineered marvels. Click to experience the grand entrance.
            </p>
            <ul className="space-y-4 font-outfit mb-8">
               {['Termite Resistant', 'Acoustic Insulation', 'Custom Dimensions'].map((feature, i) => (
                 <li key={i} className="flex items-center gap-3 text-zinc-700">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" /> {feature}
                 </li>
               ))}
            </ul>
            <MagneticButton className="px-8 py-3 bg-zinc-900 text-white font-outfit font-medium rounded-full hover:bg-zinc-200 transition-colors">
              View Door Catalog
            </MagneticButton>
          </motion.div>
        </div>

        <div className="md:w-1/2 w-full h-[600px] flex justify-center items-center perspective-[1500px]">
           <div className="relative w-[280px] h-[550px] shadow-2xl transform-style-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-lg overflow-hidden">
                 <img loading="lazy" src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Room interior" />
              </div>
              
              <motion.div 
                className="absolute inset-0 bg-amber-900 origin-left border border-zinc-700/50 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] cursor-pointer"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'multiply'
                }}
                animate={{ rotateY: isOpen ? -85 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="absolute top-1/2 right-4 w-2 h-16 bg-zinc-300 rounded-sm shadow-md" />
                <div className="absolute top-1/2 right-3 w-4 h-4 bg-zinc-400 rounded-full -mt-6 shadow-md" />
              </motion.div>
              
              <div className={`absolute -bottom-12 w-full text-center font-outfit text-amber-500 text-sm tracking-widest uppercase transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                Click to Open
              </div>
           </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-\\[1500px\\] { perspective: 1500px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .origin-left { transform-origin: left center; }
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
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-gray-900">The Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 h-full flex flex-col hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative z-10"
              >
                <div className="self-start">
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Step {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-5 text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{step.desc}</p>
              </motion.div>
              
              {/* Connector Icon for large screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-gray-300 pointer-events-none translate-x-1/2">
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



const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-32 bg-zinc-50">
      <div className="px-4 md:px-8 lg:px-12 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Questions Answered</h2>
          <p className="text-zinc-600 font-outfit">Everything you need to know before stepping into our showroom.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border ${openIdx === idx ? 'border-amber-500/50 bg-white' : 'border-zinc-200'} rounded-2xl overflow-hidden transition-colors duration-300`}
            >
              <button 
                className="w-full px-6 py-6 text-left flex justify-between items-center"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <span className="font-serif text-lg md:text-xl font-medium pr-8">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-zinc-600 font-inter leading-relaxed">
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
    <section className="bg-[#bebda7] text-zinc-900 font-sans overflow-hidden py-24 relative">
      <div className="px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center tracking-tight">
          Explore Real Transformations
        </h2>
      </div>

      <div className="relative w-full group">
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 hover:bg-white text-zinc-900 hover:scale-110 transition-all duration-300 ease-out ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-900" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className={`absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 hover:bg-white text-zinc-900 hover:scale-110 transition-all duration-300 ease-out ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-zinc-900" />
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
                <button className="w-full max-w-[180px] bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl pointer-events-auto">
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
              className="relative w-full max-w-[45vh] md:max-w-md aspect-[9/16] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 z-[160]"
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
                <button className="w-full bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-gray-200 active:scale-95 transition-all shadow-xl">
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
  return (
    <footer id="contact" className="bg-zinc-100 pt-24 pb-8 border-t border-zinc-200 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-900/10 blur-[100px] pointer-events-none" />
      
      <div className="px-4 md:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6 tracking-wide text-zinc-900">ABHISHEK</h3>
            <p className="text-zinc-600 font-inter text-sm mb-6 leading-relaxed">
              The premier destination for luxury plywood, elegant laminates, and state-of-the-art architectural hardware in Bahraich.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer"><Instagram className="w-4 h-4"/></a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer"><Facebook className="w-4 h-4"/></a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer"><Twitter className="w-4 h-4"/></a>
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-semibold tracking-widest uppercase text-sm mb-6 text-zinc-900">Explore</h4>
            <ul className="space-y-3 text-zinc-600 font-inter text-sm">
              <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to="/products">Premium Plywood</Link></li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to="/products">Decorative Laminates</Link></li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to="/products">Modular Kitchens</Link></li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to="/products">Architectural Hardware</Link></li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to="/products">Our Brands</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-semibold tracking-widest uppercase text-sm mb-6 text-zinc-900">Contact Us</h4>
            <ul className="space-y-3 text-zinc-600 font-inter text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:+91${SITE_CONFIG.primaryPhone}`} className="hover:text-amber-500 transition-colors">+91 {SITE_CONFIG.primaryPhone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:+91${SITE_CONFIG.contactNumbers[1] || '9839352502'}`} className="hover:text-amber-500 transition-colors">+91 {SITE_CONFIG.contactNumbers[1] || '9839352502'}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">WhatsApp Chat</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-semibold tracking-widest uppercase text-sm mb-6 text-zinc-900">Visit Showroom</h4>
            <div className="space-y-3 text-zinc-600 font-inter text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <span className="leading-relaxed">{SITE_CONFIG.addressEnglish}</span>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <div>
                  <p><span className="font-medium text-zinc-800">{SITE_CONFIG.businessHours.weekdays}</span>: {SITE_CONFIG.businessHours.weekdayHours}</p>
                  <p><span className="font-medium text-zinc-800">{SITE_CONFIG.businessHours.weekend}</span>: {SITE_CONFIG.businessHours.weekendHours}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-inter">
          <p>&copy; {new Date().getFullYear()} Abhishek Ply & Hardware. All Rights Reserved.</p>
          <p>By <a href="https://shreejiinfosys.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors font-medium">Shreeji Infosys</a></p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-700 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-zinc-700 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
// --- MAIN APP ---
export default function Home({ hasBootAnimationPlayed = false, setHasBootAnimationPlayed }: { hasBootAnimationPlayed?: boolean, setHasBootAnimationPlayed?: (val: boolean) => void }) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: SITE_CONFIG.businessName,
    "image": "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop",
    "@id": "https://www.abhishekplyandhardware.com",
    "url": "https://www.abhishekplyandhardware.com",
    telephone: `+91${SITE_CONFIG.primaryPhone}`,
    "priceRange": "$$",
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
  };
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
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <main className="relative w-full min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 selection:bg-amber-500/30 selection:text-zinc-900">
        <DoorTransition hasPlayed={hasBootAnimationPlayed} onComplete={() => setHasBootAnimationPlayed?.(true)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroSlider />
            <TabbedCategoryGallery />
            
            <CollectionsSection />
            <BeforeAfterSection />
            <FeaturedCollection />
            <Timeline />
            <TrustSection />
            <FAQ />
            <VideoShortsCarousel />
          </motion.div>
        </DoorTransition>
      </main>
    </>
  );
}