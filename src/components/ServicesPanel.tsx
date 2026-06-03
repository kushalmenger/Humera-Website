/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Clock, Tag, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface ServicesPanelProps {
  onBookService: (service: Service) => void;
}

export default function ServicesPanel({ onBookService }: ServicesPanelProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'hair-styling', label: 'Styling & Cut' },
    { id: 'hair-coloring', label: 'Balayage & Color' },
    { id: 'makeup', label: 'HD Makeup' },
    { id: 'skincare', label: 'Cellular Skincare' },
    { id: 'nails', label: 'Russian Manicure' },
    { id: 'spa', label: 'Spa Wellness' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div id="salon-services-catalog" className="py-20 lg:py-28 bg-luxury-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] md:text-xs text-gold-500 font-bold tracking-[0.3em] uppercase block mb-3">
            Bespoke Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-luxury-neutral leading-tight mb-6">
            The Hair & Beauty <br />
            <span className="not-italic font-normal text-gold-500 uppercase tracking-widest text-2xl md:text-3xl">Menu</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto my-6" />
          <p className="text-sm text-luxury-neutral/80 font-light max-w-2xl mx-auto leading-relaxed">
            All beauty rituals include a sensory botanical wash, curated hot towel scalp treatment, organic elixir protection, and absolute, personalized attentiveness.
          </p>
        </div>

        {/* Category Filters Tab-Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`service-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 font-bold cursor-pointer rounded-none ${
                activeCategory === cat.id
                  ? 'bg-luxury-neutral text-white border-l-2 border-[#D4AF37] shadow-sm'
                  : 'bg-white text-luxury-neutral hover:text-gold-500 hover:bg-[#F8F5F0] border border-[#D4AF37]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Services List Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white border border-[#D4AF37]/30 flex flex-col h-full group hover:shadow-lg hover:border-gold-500 transition-all duration-500 rounded-none"
            >
              {/* Image Header with hover zooms */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Float Duration and Cost */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 text-white">
                  <span className="bg-[#1C1C1C]/90 backdrop-blur-sm text-[9px] tracking-[0.25em] uppercase font-bold px-3 py-1 text-[#D4AF37] border border-[#D4AF37]/45">
                    {service.duration}
                  </span>
                  <span className="text-xl font-serif italic text-white font-semibold">
                    ${service.price}
                  </span>
                </div>
              </div>

              {/* Service Details Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-base font-serif italic text-luxury-neutral mb-3 line-clamp-1 group-hover:text-gold-500 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-luxury-neutral/80 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                  {service.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-[#D4AF37]/15">
                  <span className="text-[9px] tracking-[0.25em] text-gold-500 uppercase font-bold block mb-1">Ritual Highlights</span>
                  {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-2 text-left">
                      <Check className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[11px] text-luxury-neutral/80 font-light">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Book Action CTA */}
                <button
                  id={`service-book-now-${service.id}`}
                  onClick={() => onBookService(service)}
                  className="w-full py-3.5 text-center border border-[#D4AF37] text-luxury-neutral text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-luxury-neutral hover:text-white hover:border-luxury-neutral transition-all duration-300 flex items-center justify-center space-x-2 rounded-none"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customized Policy Callout Block */}
        <div className="mt-20 border border-[#D4AF37]/30 bg-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between rounded-none shadow-sm">
          <div className="flex items-center space-x-4 max-w-2xl text-left">
            <div className="bg-gold-400/15 p-3 flex-shrink-0 rounded-none border border-gold-400/30">
              <AlertCircle className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-sm font-bold text-luxury-neutral uppercase tracking-[0.1em]">Custom Tailored Beauty & Adjustments</p>
              <p className="text-xs text-luxury-neutral/80 font-light leading-relaxed mt-1">
                Have specific allergies or a signature scalp density concern? Our elite hair-technicians and dermal artists customize all color binders, shampoos, and pressure points pre-service, assuring comfortable safety throughout.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                const el = document.getElementById('chat-assistance-trigger');
                if (el) el.click();
              }}
              className="px-6 py-3.5 bg-luxury-neutral text-white hover:bg-gold-500 hover:text-luxury-neutral transition-all duration-300 text-[10px] tracking-[0.2em] uppercase font-bold block whitespace-nowrap cursor-pointer rounded-none"
            >
              Consult Beauty Assistant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
