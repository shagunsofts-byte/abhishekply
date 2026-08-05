import React from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const ContactCard = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/50 p-6 md:p-8 rounded-3xl shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
      <h3 className="text-2xl font-serif font-bold text-zinc-900 mb-6 tracking-wide">
        {SITE_CONFIG.businessName}
      </h3>
      
      <div className="space-y-5 text-zinc-700 font-inter">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium mb-1">Call Us</p>
            {SITE_CONFIG.contactNumbers.map((num, i) => (
              <a key={i} href={`tel:+91${num}`} className="block text-lg font-medium hover:text-amber-600 transition-colors">
                +91 {num}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium mb-1">Visit Us</p>
            <p className="text-base whitespace-pre-line leading-relaxed">
              {SITE_CONFIG.addressEnglish}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium mb-1">Business Hours</p>
            <p className="text-base">
              <span className="font-medium">{SITE_CONFIG.businessHours.weekdays}</span>: {SITE_CONFIG.businessHours.weekdayHours}<br />
              <span className="font-medium">{SITE_CONFIG.businessHours.weekend}</span>: {SITE_CONFIG.businessHours.weekendHours}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a 
          href={`tel:+91${SITE_CONFIG.primaryPhone}`}
          className="flex-1 bg-zinc-900 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 font-outfit font-medium hover:bg-amber-500 transition-colors"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <a 
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-green-500 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 font-outfit font-medium hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
      
      <div className="mt-4">
         <a 
            href={SITE_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-zinc-100 text-zinc-800 py-3 px-6 rounded-full flex items-center justify-center gap-2 font-outfit font-medium hover:bg-zinc-200 transition-colors"
          >
            <MapPin className="w-4 h-4" /> Get Directions
          </a>
      </div>
    </div>
  );
};
