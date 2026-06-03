/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, Instagram, Facebook, Sparkles } from 'lucide-react';

export default function ContactFooter() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 4000);
  };

  return (
    <footer id="mari-contact-coordinates" className="bg-luxury-neutral text-luxury-ivory pt-20 border-t-2 border-[#D4AF37] font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Newsletter subscription with high-end typography */}
        <div className="border-b border-gold-400/20 pb-16 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold block">Exclusive Capsule Notices</span>
            <h3 className="text-2xl sm:text-3xl font-serif italic text-white font-serif">Join the Mari Elite Digest</h3>
            <p className="text-xs text-gray-400 font-light max-w-xl leading-relaxed">
              Unlock early bookings for seasonal collections, notifications of rare perfume drops, and a <span className="text-[#D4AF37] font-bold">complementary 24K cellular facial voucher</span> with your next balayage.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 text-center flex items-center justify-center space-x-2 text-xs text-gold-300 animate-pulse rounded-none">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Enrolled successfully. Welcome to true luxury, Darling.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-none">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter my exquisite email..."
                  className="bg-white/5 border border-[#D4AF37]/35 focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none px-4 py-4 text-xs flex-grow font-light text-white rounded-none"
                />
                <button
                  id="newsletter-subscribe-button"
                  type="submit"
                  className="bg-[#1C1C1C] hover:bg-[#D4AF37] hover:text-luxury-neutral text-[#D4AF37] border border-[#D4AF37]/45 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] cursor-pointer rounded-none duration-300"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Row 2: Information split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gold-400/20">
          
          {/* Logo & Manifesto */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-2xl md:text-3xl font-bold tracking-[0.18em] display-heading block text-white font-serif">MARI</span>
              <span className="text-[0.6rem] tracking-[0.4em] font-light uppercase text-[#D4AF37] -mt-1 block">Boutique Salon</span>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              We design hair, skin, and capsule wardrobes in absolute organic symmetry. Our mission is to restore peace of mind through bespoke sensory pampering.
            </p>
            {/* Social channels */}
            <div className="flex space-x-4 pt-1">
              <a
                href="https://instagram.com/MariBoutiqueSalon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] p-2.5 rounded-none border border-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/MariBoutiqueSalon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] p-2.5 rounded-none border border-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <div className="flex items-center space-x-1.5 text-[10px] uppercase text-[#D4AF37] font-bold tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> <span>Member of Haute-Sponsor</span>
              </div>
            </div>
          </div>

          {/* Quick Hours */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Consultation Hours</h4>
            <div className="space-y-3.5 text-xs text-gray-300 font-light font-sans">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Mon — Fri</span>
                <span>09:00 AM — 08:30 PM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Saturday</span>
                <span>09:00 AM — 06:00 PM</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Sunday</span>
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider text-[10px]">Bridal Sanctuary Only</span>
              </div>
              <p className="text-[10px] text-gray-500 font-light mt-1">
                * Private showroom dressings can be scheduled until after salon hours.
              </p>
            </div>
          </div>

          {/* Contact Details with vector maps */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">The Headquarters Coordinates</h4>
            <div className="space-y-4 text-xs text-gray-300 font-light font-sans">
              <div className="flex items-start space-x-3 text-left">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="leading-snug">Suite 400, 742 Madison Avenue,<br />New York City, NY 10021</p>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <p>+1 555-0192</p>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <p>concierge@mari-boutique.com</p>
              </div>
            </div>

            {/* Simulated Gold Luxury Map Vector */}
            <div className="border border-[#D4AF37]/35 bg-black/60 p-1.5 pt-2 flex flex-col items-center rounded-none font-sans">
              <span className="text-[8px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold block mb-1">Live Map Location locator</span>
              <svg viewBox="0 0 400 120" className="w-full h-24 bg-[#1C1C1C] rounded-none border border-white/5">
                {/* Simulated grid lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.05" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.05" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.05" />
                <line x1="100" y1="0" x2="100" y2="120" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.05" />
                <line x1="200" y1="0" x2="200" y2="120" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.05" />
                <line x1="300" y1="0" x2="300" y2="120" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.05" />

                {/* Simulated streets of Madison avenue gold traces */}
                <path d="M 50 0 Q 150 40 250 120" stroke="#DDAF37" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                <path d="M 0 60 L 400 30" stroke="#DDAF37" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                <path d="M 120 0 L 190 120" stroke="#DDAF37" strokeWidth="2" strokeOpacity="0.2" fill="none" />
                <path d="M 280 0 L 330 120" stroke="#DDAF37" strokeWidth="1" strokeOpacity="0.25" fill="none" />

                {/* Ripple animation marker */}
                <circle cx="160" cy="45" r="8" fill="#D4AF37" fillOpacity="0.2" className="animate-pulse" />
                <circle cx="160" cy="45" r="4.5" fill="#D4AF37" />

                {/* Text overlays on coordinates */}
                <text x="165" y="42" fill="#FAF9F6" fontSize="8" fontWeight="bold">MARI BOUTIQUE</text>
                <text x="165" y="52" fill="#D4AF37" fontSize="6" letterSpacing="1">Suite 400, Madison</text>
              </svg>
            </div>
          </div>

        </div>

        {/* Row 3: Copyright guidelines */}
        <div className="py-8 text-center text-[10px] text-gray-500 uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Mari Boutique Salon. All Sovereign Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-gold-400 cursor-pointer">Sovereign Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gold-400 cursor-pointer">Atelier Terms</span>
            <span>•</span>
            <span className="hover:text-gold-400 cursor-pointer">Security Ledger</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
