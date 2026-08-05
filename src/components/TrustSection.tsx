import React from 'react';
import { motion } from 'framer-motion';
import { trustHighlights } from '../data/trustHighlights';
import { brands } from '../data/brands';

export const TrustSection = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] text-zinc-900 border-y border-amber-900/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-outfit font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block"
          >
            Why Choose Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-zinc-900"
          >
            Trust Highlights
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustHighlights.map((highlight, idx) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-[#D4AF37]/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-500 relative group"
            >
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6">
                <highlight.icon className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-serif font-bold text-zinc-900 mb-3">{highlight.title}</h3>
              <p className="text-zinc-600 font-inter text-sm leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Premium Brand Showcase */}
        <div className="mt-28 pt-16 border-t border-[#D4AF37]/20">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-3"
            >
              Premium Brands Available
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-600 font-inter max-w-xl mx-auto"
            >
              We offer products from trusted and industry-leading brands.
            </motion.p>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative w-full overflow-hidden flex items-center py-8">
            {/* Left and Right Fade for Marquee */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-6 sm:gap-8 min-w-max pr-6 sm:pr-8 animate-marquee">
              {[...brands, ...brands].map((brand, idx) => (
                <div 
                  key={`${brand.id}-${idx}`}
                  className="bg-white px-8 py-6 rounded-xl border border-[#D4AF37]/20 shadow-[0_4px_15px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-1 hover:scale-105 hover:border-[#D4AF37]/60 transition-all duration-500 flex items-center justify-center min-w-[160px] md:min-w-[200px] cursor-pointer group/brand"
                >
                  <span className="font-outfit font-semibold text-lg md:text-xl text-zinc-400 tracking-wider uppercase group-hover/brand:text-zinc-800 transition-colors duration-500">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
