/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { BEFORE_AFTERS, INSTAGRAM_POSTS } from '../data';
import { ArrowLeftRight, HelpCircle, Eye, Sparkles } from 'lucide-react';

export default function GalleryPanel() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [activeBAIndex, setActiveBAIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    { id: 'g1', url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', category: 'Hair Coloring', desc: 'Satin gloss balayage' },
    { id: 'g2', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', category: 'Bridal', desc: 'Timeless luxury bride' },
    { id: 'g3', url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800', category: 'Hair Styling', desc: 'Bespoke volume blow-couture' },
    { id: 'g4', url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800', category: 'Makeup', desc: 'Red-carpet editorial makeup' },
    { id: 'g5', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800', category: 'Skincare', desc: 'Organic platinum lift facial' },
    { id: 'g6', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800', category: 'Nails', desc: 'Flawless Russian structured manicure' }
  ];

  const categories = ['all', 'Hair Coloring', 'Hair Styling', 'Makeup', 'Skincare', 'Nails', 'Bridal'];

  const filteredGallery = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Before After interaction math
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (cursorX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div id="gallery-manifest" className="py-20 lg:py-28 bg-luxury-ivory text-luxury-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] md:text-xs text-[#D4AF37] font-bold tracking-[0.3em] uppercase block mb-3">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-luxury-neutral leading-tight mb-6">
            The Transformation <br />
            <span className="not-italic font-normal text-gold-505 text-gold-500 uppercase tracking-widest text-2xl md:text-3xl">Exhibit</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/35 mx-auto my-6" />
          <p className="text-sm text-luxury-neutral/80 font-light max-w-2xl mx-auto leading-relaxed">
            Witness the immaculate details and seamless color melts designed by our elite technicians in real-time. Slide your cursor across the showcase below.
          </p>
        </div>

        {/* SECTION 1: Interactive Before & After comparison slider */}
        <div className="mb-24">
          <div className="text-center mb-10 w-full">
            <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold block mb-2">Dual Reveal Frame</span>
            <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral">Hover & Slide Comparative Transformation</h3>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {BEFORE_AFTERS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveBAIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`text-[10px] px-4 py-2 border tracking-[0.2em] uppercase font-bold transition-all cursor-pointer rounded-none ${
                    activeBAIndex === idx
                      ? 'bg-luxury-neutral text-white border-l-2 border-[#D4AF37]'
                      : 'bg-white text-luxury-neutral border border-[#D4AF37]/30 hover:border-gold-500'
                  }`}
                >
                  Example {idx + 1}: {item.category}
                </button>
              ))}
            </div>
          </div>

          {/* Slider frame coordinate */}
          <div className="max-w-4xl mx-auto">
            <div
              id="before-after-comparer"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-video w-full h-[350px] sm:h-[450px] md:h-[500px] select-none overflow-hidden cursor-ew-resize border border-[#D4AF37]/40 shadow-xl rounded-none bg-zinc-950"
            >
              {/* After image - complete background */}
              <img
                src={BEFORE_AFTERS[activeBAIndex].after}
                alt="After transformation"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute right-4 bottom-4 bg-[#1C1C1C]/90 border border-[#D4AF37]/40 text-[9px] tracking-[0.25em] font-bold text-[#D4AF37] px-3 py-1.5 z-10 uppercase">
                After: Radiance
              </div>

              {/* Before image - overlay width clipped by slider position */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none transition-all duration-[60ms] ease-out"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={BEFORE_AFTERS[activeBAIndex].before}
                  alt="Before transformation"
                  referrerPolicy="no-referrer"
                  className="absolute inset-y-0 left-0 max-w-none w-full h-full object-cover object-center"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                />
                <div className="absolute left-4 bottom-4 bg-[#1C1C1C]/95 border border-[#D4AF37]/35 text-[9px] tracking-[0.25em] font-bold text-white px-3 py-1.5 z-10 uppercase">
                  Before: Initial
                </div>
              </div>

              {/* Decorative Sliding Divider vertical line */}
              <div
                className="absolute inset-y-0 w-0.5 bg-[#D4AF37] shadow-xl pointer-events-none transition-all duration-[60ms] ease-out flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Floating slider drag button marker */}
                <div className="w-10 h-10 bg-[#D4AF37] text-luxury-neutral rounded-none border border-white flex items-center justify-center -translate-x-1/2 shadow-2xl">
                  <ArrowLeftRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Slider captions */}
            <div className="bg-white border border-[#D4AF37]/30 p-6 md:p-8 text-left mt-2 rounded-none">
              <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold block mb-1">
                {BEFORE_AFTERS[activeBAIndex].category} Case study
              </span>
              <h4 className="text-base font-serif italic text-luxury-neutral">
                {BEFORE_AFTERS[activeBAIndex].title}
              </h4>
              <p className="text-xs text-luxury-neutral/80 font-light mt-2 leading-relaxed">
                {BEFORE_AFTERS[activeBAIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Filterable Image Galleries */}
        <div className="border-t border-[#D4AF37]/20 pt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold block mb-2">High-Resolution Portfolios</span>
            <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral">Filtered Client Portfolios</h3>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-8 mb-12">
              {categories.map((catSpec) => (
                <button
                  key={catSpec}
                  onClick={() => setActiveFilter(catSpec)}
                  className={`text-[10px] tracking-widest uppercase font-bold px-4 py-2.5 border transition-all cursor-pointer rounded-none/0 rounded-none ${
                    activeFilter === catSpec
                      ? 'bg-luxury-neutral text-white border-l-2 border-[#D4AF37]'
                      : 'bg-white text-luxury-neutral border border-[#D4AF37]/30 hover:border-gold-500'
                  }`}
                >
                  {catSpec === 'all' ? 'Show All' : catSpec}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="relative group bg-white border border-[#D4AF37]/30 rounded-none overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={item.url}
                    alt={item.desc}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 font-light"
                  />
                  {/* Hover visual details */}
                  <div className="absolute inset-0 bg-[#1C1C1C]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-6 text-center z-15">
                    <span className="text-[9px] text-[#D4AF37] tracking-widest uppercase font-bold mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-base font-serif italic text-white tracking-wide">
                      {item.desc}
                    </h4>
                    <div className="w-8 h-[1px] bg-[#D4AF37] my-3" />
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Mari Signature Style
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Curated Instagram feeds */}
        <div className="border-t border-[#D4AF37]/20 pt-20 mt-24">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold block">Social Journeys</span>
            <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral mt-1">@MariBoutiqueSalon</h3>
            <p className="text-xs text-luxury-neutral/60 uppercase tracking-widest mt-1 font-bold">Follow our updates for live, daily transformations.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <div key={post.id} className="relative group overflow-hidden border border-[#D4AF37]/35 shadow-sm hover:shadow-lg transition-all rounded-none duration-500">
                <img
                  src={post.url}
                  alt="Companion styling snap"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-500 font-light"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 duration-[400ms]">
                  <div className="text-white text-center">
                    <span className="block text-xs font-semibold">Likes: {post.likes}</span>
                    <span className="text-[9px] text-[#D4AF37] uppercase tracking-[0.2em] mt-1.5 block font-bold">View Post</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
