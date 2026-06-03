/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BRIDAL_PACKAGES } from '../data';
import { Heart, Sparkles, Check, Send, Star, FileText } from 'lucide-react';

export default function BridalPanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    packageInterest: 'bridal-pack-champagne',
    bridalPartyCount: '1',
    customNotes: ''
  });
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate inquiry submissions
    setSubmittedInquiry(true);
    setTimeout(() => {
      // Keep it up on UI for a nice reward feeling
    }, 4000);
  };

  const handleResetInquiry = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      weddingDate: '',
      packageInterest: 'bridal-pack-champagne',
      bridalPartyCount: '1',
      customNotes: ''
    });
    setSubmittedInquiry(false);
  };

  const bridalPhotos = [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', tag: 'Royal Veil Styling' },
    { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', tag: 'Luminous Airbrush' },
    { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800', tag: 'Blush Radiance Prep' }
  ];

  return (
    <div id="mari-bridal-sanctuary" className="py-20 lg:py-28 bg-luxury-ivory text-luxury-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bridal Main Hero Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 border border-[#D4AF37]/35 bg-white px-4 py-1.5 rounded-none">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-luxury-neutral uppercase font-bold">The Luxury Sanctuary</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif italic text-luxury-neutral leading-tight">
              Crafting Your Hand-Tailored <br />
              <span className="not-italic font-normal text-gold-505 text-gold-500 uppercase tracking-widest text-2xl sm:text-3xl block mt-2">Bridal Glow</span>
            </h1>
            <p className="text-sm text-luxury-neutral/80 font-light leading-relaxed">
              Every client's love story is uniquely stunning. Our elite bridal beauty team organizes complete, state-of-the-art hair, skin, and styling preparations ensuring your walk down the aisle is framed in comfort and timeless splendor.
            </p>
            <p className="text-xs text-luxury-neutral/60 font-light leading-relaxed">
              From our isolated pre-wedding champagne VIP dressing suites to post-vow aesthetic touch-ups, Mari Boutique Salon promises to treat you like royalty.
            </p>
            <div className="pt-4">
              <a
                href="#bridal-packages-tier"
                className="bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/45 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] duration-300 inline-block rounded-none shadow-md"
              >
                Explore Collections
              </a>
            </div>
          </div>

          {/* Right Image Compositions */}
          <div className="relative">
            <div className="relative z-10 border border-[#D4AF37]/35 shadow-2xl rounded-none">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                alt="Beautiful Bride makeup by Mari Salon"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover object-top hover:grayscale-[20%] transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#D4AF37]/25 z-0 hidden md:block" />
            <div className="absolute -top-12 -right-12 text-[10rem] font-serif text-[#D4AF37]/5 -z-0 select-none">
              Love
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div id="bridal-packages-tier" className="border-t border-[#D4AF37]/20 pt-20 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] md:text-sm text-[#D4AF37] uppercase tracking-[0.3em] font-bold block mb-3">
              Imperial Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-luxury-neutral">
              Sovereign Bridal <span className="not-italic font-normal text-gold-505 text-gold-500 uppercase tracking-widest text-xl sm:text-2xl">Packages</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]/35 mx-auto my-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {BRIDAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white border rounded-none p-8 md:p-12 relative flex flex-col justify-between ${
                  pkg.isPopular
                    ? 'border-[#D4AF37] shadow-xl'
                    : 'border-[#D4AF37]/30'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1C1C1C] border border-[#D4AF37] text-white text-[8px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 shadow-md rounded-none">
                    Sovereign Priority Recommendation
                  </span>
                )}

                <div>
                  <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-luxury-neutral/70 font-light leading-relaxed mb-6">{pkg.description}</p>
                  
                  <div className="text-3xl font-light serif-heading text-luxury-neutral mb-8">
                    ${pkg.price} <span className="text-xs font-light tracking-widest text-gold-500 uppercase">all-inclusive</span>
                  </div>

                  {/* Pricing Included Lines */}
                  <div className="space-y-4 mb-10 pt-6 border-t border-[#D4AF37]/20">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">Services Included:</span>
                    {pkg.services.map((srv, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-3 text-left">
                        <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[13px] text-luxury-neutral/80 font-light leading-snug">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <span className="text-[10px] tracking-widest text-luxury-neutral/60 uppercase block mb-4 font-bold">Duration: {pkg.duration}</span>
                  <a
                    href="#bridal-consultation"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        packageInterest: pkg.id
                      });
                    }}
                    className={`w-full py-4 text-center text-[10px] tracking-widest uppercase font-bold block transition-all rounded-none ${
                      pkg.isPopular
                        ? 'bg-[#1C1C1C] hover:bg-[#D4AF37] text-white border border-[#D4AF37]'
                        : 'bg-white text-luxury-neutral border border-[#D4AF37]/35 hover:bg-[#1C1C1C] hover:text-white'
                    }`}
                  >
                    Hold Reservation Inquiry
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Makeover showcase gallery */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral uppercase tracking-widest">
              Bridal Makeover Gallery
            </h3>
            <p className="text-xs text-luxury-neutral/60 uppercase tracking-widest mt-1 font-bold">Real luminous brides, bespoke portrait captures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bridalPhotos.map((photo, pIdx) => (
              <div key={pIdx} className="relative group overflow-hidden border border-[#D4AF37]/35 rounded-none">
                <img
                  src={photo.url}
                  alt={photo.tag}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-neutral/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 z-10 flex overflow-hidden">
                  <span className="text-[10px] text-white tracking-widest uppercase font-bold">
                    {photo.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bride Testimonials */}
        <div className="mb-24 bg-[#1C1C1C] p-8 sm:p-12 md:p-16 border-y border-[#D4AF37]/30 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center space-x-1 text-[#D4AF37]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <p className="text-lg md:text-xl font-light text-gray-100 italic leading-relaxed serif-heading">
              "Mari Salon and their bridal specialists made me feel like the most gorgeous and relaxed bride on earth. The Champagne Sovereign package exceeded absolutely everything we expected. They came directly to our villa, brought gold luxury patches, handled all hair alignments, and left us glowing effortlessly."
            </p>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">Julianne Sterling</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1 block">Sovereign Bride — Ritz Carlton Wedding</p>
            </div>
          </div>
        </div>

        {/* Consultation form */}
        <div id="bridal-consultation" className="max-w-3xl mx-auto border border-[#D4AF37]/35 bg-white p-6 sm:p-12 shadow-xl rounded-none">
          <div className="text-center mb-10">
            <Heart className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral">Request Bridal Consultation</h3>
            <p className="text-[10px] text-luxury-neutral/60 uppercase tracking-wider mt-1 font-bold">Let us craft your timeline beautifully</p>
          </div>

          {submittedInquiry ? (
            <div className="text-center py-10 space-y-6">
              <div className="bg-[#D4AF37]/10 p-4 rounded-none border border-[#D4AF37] w-16 h-16 flex items-center justify-center mx-auto text-gold-500">
                <Check className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <p className="text-xl serif-heading font-medium text-luxury-neutral">Your Inquiry Is Secured</p>
              <p className="text-sm font-light text-luxury-neutral/80 max-w-md mx-auto leading-relaxed">
                Thank you, Darling. A personal bridal concierge has registered your wedding date <span className="font-bold text-gold-500">({formData.weddingDate || 'TBD'})</span> and will contact your email <span className="font-bold text-gold-550 text-[#D4AF37]">{formData.email}</span> within 12 hours with structural planning steps.
              </p>
              <button
                onClick={handleResetInquiry}
                className="text-[10px] text-[#D4AF37] underline uppercase tracking-[0.2em] font-bold hover:text-luxury-neutral cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bridal-name" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Beautiful Bride's Name</label>
                  <input
                    id="bridal-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="bridal-email" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Email Address</label>
                  <input
                    id="bridal-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. bride@luxury.com"
                    className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="bridal-phone" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Contact Number</label>
                  <input
                    id="bridal-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 555-0192"
                    className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="bridal-date" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Wedding Date</label>
                  <input
                    id="bridal-date"
                    type="date"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="bridal-party" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Bridal Party Size</label>
                  <select
                    id="bridal-party"
                    value={formData.bridalPartyCount}
                    onChange={(e) => setFormData({ ...formData, bridalPartyCount: e.target.value })}
                    className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="1">Just the Bride</option>
                    <option value="2-4">Bride + 3 Bridesmaids</option>
                    <option value="5-8">Bride + Suite (Up to 8)</option>
                    <option value="9+">Grand Party (9+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bridal-package" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Selected Package Interest</label>
                <select
                  id="bridal-package"
                  value={formData.packageInterest}
                  onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                  className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  <option value="bridal-pack-ivory">The Ivory Petal Bridal Package — $450</option>
                  <option value="bridal-pack-champagne">The Champagne Sovereign Royal Collection — $850</option>
                  <option value="custom">Custom Bespoke Atelier Package — Pricing varies</option>
                </select>
              </div>

              <div>
                <label htmlFor="bridal-notes" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Custom Fitting & Location Notes</label>
                <textarea
                  id="bridal-notes"
                  rows={4}
                  value={formData.customNotes}
                  onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                  placeholder="Detail your ceremony venue, dressing location preferences, theme colors..."
                  className="w-full bg-luxury-ivory/50 border border-[#D4AF37]/30 p-4 text-xs outline-none focus:border-[#D4AF37] font-sans transition-all text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <button
                id="submit-bridal-inquiry"
                type="submit"
                className="w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/50 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer rounded-none"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Bridal Application</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
