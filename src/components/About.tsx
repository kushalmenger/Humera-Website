/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Heart, Eye, Star, Compass } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-gold-400" />,
      title: 'Artisanal Perfection',
      desc: 'We reject standard defaults. Every hair sculpture, balayage highlight, or precision massage is engineered as a bespoke, hand-crafted piece of personal expression.'
    },
    {
      icon: <Heart className="w-5 h-5 text-gold-400" />,
      title: 'Organic Well-Being',
      desc: 'Your health is our ultimate guide. We prioritize toxic-free, caviar enriched color carriers, and 24K dermal matrices to enrich with total bio-compatible care.'
    },
    {
      icon: <Eye className="w-5 h-5 text-gold-400" />,
      title: 'Visionary Aesthetics',
      desc: 'Blending time-tested classical techniques with fresh contemporary bridal trends to create styles that balance elegance, comfort, and breathtaking performance.'
    },
    {
      icon: <Compass className="w-5 h-5 text-gold-400" />,
      title: 'Unrivaled Privacy',
      desc: 'Our client suites, high-ceiling dressing rooms, and secluded relaxation zones are configured to provide absolute, quiet sanctuary for your peace.'
    }
  ];

  return (
    <div id="about-us-narrative" className="py-20 lg:py-28 bg-luxury-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Branding Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="text-[10px] md:text-xs text-gold-500 font-bold tracking-[0.3em] uppercase block mb-3">
            The Mari Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-luxury-neutral mb-6 leading-tight">
            Bespoke Rituals, <br />
            <span className="not-italic font-normal text-gold-500 uppercase tracking-widest text-2xl md:text-3xl">Timeless Radiance</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 mx-auto my-6" />
          <p className="text-base text-luxury-neutral/80 font-light leading-relaxed max-w-2xl mx-auto">
            Established for over a decade in premium beauty services, Mari Boutique Salon represents the culmination of avant-garde cosmetology, custom-fitted fashion curation, and pristine high-end hospitality.
          </p>
        </div>

        {/* Brand Story & Founder Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          {/* Left: Interactive Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 border border-[#D4AF37]/20 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
                alt="Mari Boutique Salon interior"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#D4AF37]/5 hover:bg-transparent transition-all duration-500" />
            </div>
            {/* Secondary offset backing card */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#D4AF37]/20 -z-0 hidden md:block" />
            
            {/* Decorative founder badge */}
            <div className="absolute -bottom-8 left-6 bg-[#1C1C1C] text-luxury-ivory p-6 border-l-2 border-[#D4AF37] z-20 max-w-xs shadow-xl">
              <p className="text-xs tracking-widest text-gold-400 uppercase font-bold mb-1">Founder's Oath</p>
              <p className="text-xs font-light italic text-gray-300">
                "We do not merely change look; we polish the natural diamond that exists in every woman."
              </p>
              <span className="block text-[10px] tracking-wider uppercase text-gold-300 mt-2 font-semibold">— Mari, Creative Director</span>
            </div>
          </div>

          {/* Right: Rich Copy Narrative */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="text-[11px] text-gold-500 tracking-[0.25em] uppercase font-bold">Crafting the standard</span>
            <h3 className="text-2xl sm:text-3xl font-serif italic text-luxury-neutral leading-snug">
              "Where high couture fashion Meets elite-level beauty science."
            </h3>
            <p className="text-luxury-neutral/80 font-light leading-relaxed text-sm md:text-base">
              Mari Boutique Salon was born out of a simple vision: to eliminate the separation between high-end salon care and luxury retail. Our founder, Mari, envisioned a unified sanctuary where a woman could enjoy a structural Russian manicure, have her hair painted in seamlessly glowing French baby-lights, receive an oxygen cellular facial, and find a custom Cashmere knit trench—all in a single, deeply relaxing afternoon.
            </p>
            <p className="text-luxury-neutral/80 font-light leading-relaxed text-sm">
              We design hair, skin, and apparel in perfect harmony. Every service starts with an in-depth botanical briefing, allowing our certified master stylists to craft custom formulas tailored precisely to your specific anatomical features, lifestyle, and hair health goals.
            </p>

            {/* Quote Block */}
            <div className="border-l-2 border-[#D4AF37]/60 pl-6 py-2 bg-[#F8F5F0] my-2">
              <span className="text-[#D4AF37] font-serif font-semibold text-3xl">“</span>
              <p className="text-xs text-luxury-neutral/90 italic font-medium -mt-2">
                "The atmosphere is immediately calming. It feels less like a noisy commercial salon and more like checking into a boutique hotel suite in Paris."
              </p>
              <span className="text-[9px] uppercase tracking-widest text-[#1C1C1C]/60 block mt-2 font-bold">— Vogue Beauty Reviews</span>
            </div>
          </div>
        </div>

        {/* Core Pillars / Mission & values */}
        <div id="brand-values" className="border-t border-[#D4AF37]/35 pt-20">
          <div className="text-center mb-16">
            <h3 className="text-xl sm:text-2xl tracking-[0.2em] font-serif text-luxury-neutral uppercase">
              Our Core Pillars of Service
            </h3>
            <p className="text-[10px] text-gold-500 uppercase tracking-widest mt-2 font-semibold">No shortcuts, no compromises. Only excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white hover:bg-[#F8F5F0] border border-[#D4AF37]/30 hover:border-gold-500 p-8 transition-all duration-300 group hover:-translate-y-1 block shadow-sm"
              >
                <div className="bg-[#F8F5F0] p-3.5 w-max mb-6 group-hover:bg-[#1C1C1C] group-hover:text-white transition-colors duration-300 text-[#D4AF37]">
                  {v.icon}
                </div>
                <h4 className="text-base font-serif italic mb-3 text-luxury-neutral">
                  {v.title}
                </h4>
                <p className="text-xs text-luxury-neutral/80 font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Luxury Experience Block */}
        <div className="mt-24 bg-[#1C1C1C] text-luxury-ivory p-8 sm:p-12 md:p-16 border-t border-[#D4AF37] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -z-0" />
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-bold block">Exclusive Invitation</span>
              <h3 className="text-2xl sm:text-3xl font-serif italic text-white">Experience the Apothecary Consultation</h3>
              <p className="text-xs text-gray-300 font-light max-w-xl">
                Become part of our coveted community. Book an initial hair, skin, or bridal consultation, and our executive aesthetician will design a personalized aesthetic blueprint for you.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => {
                  const el = document.getElementById('header-booking-button');
                  if (el) el.click();
                }}
                className="bg-white text-luxury-neutral px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 rounded-none cursor-pointer shadow-lg inline-block whitespace-nowrap"
              >
                Claim Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
