/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { HERO_IMAGES } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onExploreBoutique: () => void;
}

export default function Hero({ onOpenBooking, onExploreServices, onExploreBoutique }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="hotel-style-hero" className="relative h-[93vh] md:h-screen w-full overflow-hidden bg-luxury-neutral select-none">
      {/* Background Slideshow with crossfades */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Dark luxury radial overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-neutral/95 via-luxury-neutral/60 to-luxury-neutral/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-neutral/30 to-luxury-neutral z-10" />
            <img
              src={HERO_IMAGES[currentSlide].url}
              alt={HERO_IMAGES[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Elements / Trust Badges */}
      <div className="absolute right-8 bottom-24 hidden xl:flex flex-col space-y-4 z-20 text-right">
        <div className="bg-luxury-neutral/60 backdrop-blur-md border border-gold-400/30 p-4 w-64 shadow-xl">
          <div className="flex items-center text-gold-400 space-x-1 justify-end mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <p className="text-xs text-luxury-ivory font-medium tracking-wide">"Indisputably the finest makeover experiences in the territory."</p>
          <span className="text-[10px] tracking-widest text-gold-300 block mt-1 uppercase font-semibold">Couture Magazine</span>
        </div>
        <div className="bg-luxury-neutral/60 backdrop-blur-md border border-gold-400/30 p-4 w-64 shadow-xl flex items-center space-x-3 justify-end text-right">
          <div>
            <p className="text-xs font-semibold text-luxury-ivory uppercase tracking-widest">Aura Sanctuary</p>
            <p className="text-[10px] text-gray-400">100% Organic Extracts & Caviar Oils</p>
          </div>
          <div className="bg-gold-400/20 p-2 border border-gold-400/30">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
          </div>
        </div>
      </div>

      {/* Content Coordinates */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          {/* Large decorative watermark letter */}
          <div className="absolute -top-32 -left-4 text-[150px] md:text-[280px] font-serif text-white/[0.04] leading-none select-none z-0 pointer-events-none">
            {currentSlide === 0 ? 'M' : currentSlide === 1 ? 'B' : 'C'}
          </div>

          <div className="max-w-3xl flex flex-col items-start space-y-6 relative z-10">
            {/* Decorative premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center space-x-2 border border-[#D4AF37]/40 bg-[#D4AF37]/5 px-4 py-1.5 rounded-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-[10px] md:text-xs text-gold-300 font-medium tracking-[0.25em] uppercase">
                Est. {new Date().getFullYear() - 10} • The Private Collection
              </span>
            </motion.div>

            {/* Slider context text with stagger animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 text-left"
              >
                <h2 className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">The Sovereign Sanctuary</h2>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white leading-[1.12] tracking-wide">
                  {currentSlide === 0 ? (
                    <>
                      Where Beauty <br />
                      <span className="not-italic font-normal text-gold-200">Meets Elegance</span>
                    </>
                  ) : currentSlide === 1 ? (
                    <>
                      Timeless Radiance <br />
                      <span className="not-italic font-normal text-gold-200">For Your Special Day</span>
                    </>
                  ) : (
                    <>
                      Exquisite Curations <br />
                      <span className="not-italic font-normal text-gold-200">For The Discerning</span>
                    </>
                  )}
                </h1>
                
                <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed tracking-wide">
                  {HERO_IMAGES[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Action buttons with rectangular blocks */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            >
              <button
                id="hero-cta-book"
                onClick={onOpenBooking}
                className="px-10 py-4 bg-white text-luxury-neutral hover:bg-[#D4AF37] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-none shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-services"
                onClick={onExploreServices}
                className="px-10 py-4 border border-white text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
              >
                <span>Explore Services</span>
              </button>

              <button
                id="hero-cta-boutique"
                onClick={onExploreBoutique}
                className="px-10 py-4 bg-transparent border border-white/20 text-[#D4AF37] text-[11px] uppercase tracking-[0.2em] font-bold hover:text-white hover:border-[#D4AF37] transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
              >
                <span>The Boutique</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide dots indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-35 flex space-x-3">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              currentSlide === index ? 'w-10 bg-gold-400' : 'w-2 bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
