/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data';
import { Service, Booking } from '../types';
import { Calendar, Clock, Check, Sparkles, User, FileText, Bookmark, CreditCard, ChevronRight, X, Phone, Mail } from 'lucide-react';

interface InteractiveBookingProps {
  initialService?: Service | null;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
  isLoggedIn: boolean;
  memberEmail?: string;
  memberName?: string;
}

export default function InteractiveBooking({
  initialService,
  onClose,
  onBookingConfirmed,
  isLoggedIn,
  memberEmail,
  memberName
}: InteractiveBookingProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('hair-styling');
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedStylist, setSelectedStylist] = useState<string>('Mari (Artistic Director)');
  
  const [name, setName] = useState<string>(memberName || '');
  const [email, setEmail] = useState<string>(memberEmail || '');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [champagneOption, setChampagneOption] = useState<boolean>(false);

  const [finalTicket, setFinalTicket] = useState<Booking | null>(null);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      setSelectedCategory(initialService.category);
      setStep(2); // Jump direct to date scheduling if service is pre-filled!
    }
  }, [initialService]);

  // Set logged in user info
  useEffect(() => {
    if (isLoggedIn && memberName && memberEmail) {
      setName(memberName);
      setEmail(memberEmail);
    }
  }, [isLoggedIn, memberName, memberEmail]);

  const categories = [
    { id: 'hair-styling', label: 'Styling & Cuts' },
    { id: 'hair-coloring', label: 'Color & Balayage' },
    { id: 'makeup', label: 'Red-Carpet HD Makeup' },
    { id: 'skincare', label: 'Cellular Facials' },
    { id: 'nails', label: 'Structured Nails' },
    { id: 'spa', label: 'Spa Treatment' },
    { id: 'bridal', label: 'Bridal Rituals' }
  ];

  const categoryServices = SERVICES.filter(s => s.category === selectedCategory);

  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'];
  
  const stylists = [
    { name: 'Mari (Artistic Director)', role: 'Master colorist & bridal executive, 15 yrs experience' },
    { name: 'Sophia Bellucci', role: 'Executive derm-aesthetician & cellular specialist, 10 yrs experience' },
    { name: 'Alexandre Laurent', role: 'Senior mechanical nail sculptor & gel artist, 8 yrs experience' }
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!selectedDate || !selectedTime)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const bookingId = `MARI-${Math.floor(100000 + Math.random() * 90000).toString()}`;
    const newBooking: Booking = {
      id: bookingId,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      date: selectedDate,
      time: selectedTime,
      notes: `${notes}${champagneOption ? ' (Champagne & Private showroom browsing requested)' : ''}`,
      status: 'confirmed',
      totalPrice: selectedService.price
    };

    setFinalTicket(newBooking);
    onBookingConfirmed(newBooking);
    setStep(4); // Display digital luxurious receipt!
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      
      {/* Central Card container */}
      <div className="relative bg-white w-full max-w-2xl border border-[#D4AF37]/40 overflow-hidden shadow-2xl transition-all duration-500 rounded-none">
        
        {/* Banner with logo & close */}
        <div className="bg-[#1C1C1C] p-6 text-white flex justify-between items-center border-b border-[#D4AF37]/35">
          <div>
            <h2 className="text-xl font-serif italic text-white tracking-wide">Mari Ritual Booking</h2>
            <p className="text-[9px] uppercase font-bold text-[#D4AF37] tracking-[0.2em]">Aesthetic Reservation Concierge</p>
          </div>
          <button
            id="close-booking-modal"
            onClick={onClose}
            className="p-1 rounded-none text-gray-400 hover:text-[#D4AF37] cursor-pointer transition-colors duration-300"
            aria-label="Close scheduler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step progress bar (only display if not on ticket final preview) */}
        {step < 4 && (
          <div className="bg-luxury-ivory border-b border-[#D4AF37]/20 px-6 py-3 flex justify-between items-center text-[10px] tracking-widest uppercase font-semibold text-gray-500">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#D4AF37] font-bold' : ''}`}>
              <span>01 / Service</span>
            </div>
            <ChevronRight className="w-3 h-3 text-[#D4AF37]/60" />
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#D4AF37] font-bold' : ''}`}>
              <span>02 / DateTime</span>
            </div>
            <ChevronRight className="w-3 h-3 text-[#D4AF37]/60" />
            <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#D4AF37] font-bold' : ''}`}>
              <span>03 / Personalization</span>
            </div>
          </div>
        )}

        {/* Form elements / steps container */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6 text-left">
              <div>
                <span className="text-[9px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-3">Browse Categories</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((catOpt) => (
                    <button
                      key={catOpt.id}
                      onClick={() => {
                        setSelectedCategory(catOpt.id);
                        setSelectedService(null);
                      }}
                      className={`px-3 py-2 text-[10px] tracking-wider uppercase font-bold border transition-all text-center cursor-pointer rounded-none ${
                        selectedCategory === catOpt.id
                          ? 'bg-[#1C1C1C] text-[#D4AF37] border-[#D4AF37]'
                          : 'bg-luxury-ivory text-luxury-neutral border border-[#D4AF37]/20 hover:border-gold-500'
                      }`}
                    >
                      {catOpt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-3">Choose Your Aesthetic Ritual</span>
                <div className="space-y-3">
                  {categoryServices.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 border transition-all cursor-pointer flex justify-between items-center rounded-none ${
                        selectedService?.id === srv.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow'
                          : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/55 bg-luxury-ivory/60'
                      }`}
                    >
                      <div className="space-y-1 pr-6">
                        <p className="text-sm font-bold text-luxury-neutral font-serif italic">{srv.name}</p>
                        <p className="text-[11px] text-luxury-neutral/70 font-light line-clamp-2 leading-relaxed">{srv.description}</p>
                        <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-medium pt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#D4AF37]" /> {srv.duration}</span>
                          <span>•</span>
                          <span className="text-[#D4AF37] font-bold">${srv.price}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-none border flex items-center justify-center flex-shrink-0 ${
                        selectedService?.id === srv.id ? 'bg-luxury-neutral border-[#D4AF37] text-[#D4AF37]' : 'border-gray-300'
                      }`}>
                        {selectedService?.id === srv.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DateTime & Specialist */}
          {step === 2 && (
            <div className="space-y-6 text-left">
              {/* Selected service quick review */}
              <div className="bg-luxury-ivory border-l-2 border-[#D4AF37] p-4 flex justify-between items-center rounded-none">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gold-500">Selected Ritual:</span>
                  <p className="text-sm font-bold text-luxury-neutral font-serif italic">{selectedService?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Pricing</p>
                  <p className="text-md font-bold text-[#D4AF37]">${selectedService?.price}</p>
                </div>
              </div>

              {/* Stylist Selector */}
              <div>
                <span className="text-[9px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-3">Choose Expert Artisan</span>
                <div className="space-y-2">
                  {stylists.map((st) => (
                    <div
                      key={st.name}
                      onClick={() => setSelectedStylist(st.name)}
                      className={`p-3 border text-xs cursor-pointer flex justify-between items-center transition-all rounded-none ${
                        selectedStylist === st.name ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-200'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-luxury-neutral">{st.name}</p>
                        <p className="text-[10px] text-luxury-neutral/60 font-light mt-0.5">{st.role}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-none border flex items-center justify-center ${
                        selectedStylist === st.name ? 'bg-luxury-neutral border-[#D4AF37] text-[#D4AF37]' : 'border-gray-300'
                      }`}>
                        {selectedStylist === st.name && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service-date" className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2 font-bold">Preferred Appointment Date</label>
                  <input
                    id="service-date"
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Block previous dates!
                    className="w-full border border-[#D4AF37]/30 bg-luxury-ivory/40 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral font-medium rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* Slots selection */}
                <div>
                  <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2 font-bold">Available Slots</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 text-[10px] tracking-wider uppercase font-bold border transition-all cursor-pointer rounded-none ${
                          selectedTime === slot
                            ? 'bg-[#1C1C1C] text-[#D4AF37] border-[#D4AF37]'
                            : 'bg-transparent text-luxury-neutral/60 border border-[#D4AF37]/20 hover:border-[#D4AF37]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Personalization Details */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6 text-left">
              <div className="bg-luxury-ivory border-l-2 border-[#D4AF37] p-4 rounded-none">
                <span className="text-[9px] uppercase tracking-widest font-bold text-gold-500 font-bold">Ritual Schedule Outline:</span>
                <p className="text-xs font-bold text-luxury-neutral font-serif italic mt-0.5">
                  {selectedService?.name} — ${selectedService?.price}
                </p>
                <div className="flex items-center space-x-1.5 text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">
                  <span>{selectedDate}</span>
                  <span>at</span>
                  <span>{selectedTime}</span>
                  <span>with</span>
                  <span className="text-[#D4AF37]">{selectedStylist}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client-name" className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">My Full Name</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter gorgeous name"
                    className="w-full border border-[#D4AF37]/30 bg-luxury-ivory/40 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="client-phone" className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">My Phone Number</label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone digits"
                    className="w-full border border-[#D4AF37]/30 bg-luxury-ivory/40 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="client-email" className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">My Email Address</label>
                <input
                  id="client-email"
                  type="email"
                  required
                  value={email}
                  disabled={isLoggedIn} // lock if VIP club logged in
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full border border-[#D4AF37]/30 bg-luxury-ivory/40 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral rounded-none disabled:opacity-70 focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              {/* VIP luxury choice */}
              <div className="border border-[#D4AF37]/30 bg-white p-4 flex items-center justify-between rounded-none">
                <div className="pr-4 text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-luxury-neutral">Exclusive Concierge Option</p>
                  <p className="text-[10px] text-luxury-neutral/60 font-light leading-relaxed mt-0.5">
                    Complementary champagne glass, personalized luxury warm-towels, and pre-scheduled wardrobe styling.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setChampagneOption(!champagneOption)}
                  className={`w-12 h-6 flex-shrink-0 transition-all rounded-full p-0.5 flex relative items-center cursor-pointer ${
                    champagneOption ? 'bg-[#D4AF37] justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-xl block" />
                </button>
              </div>

              <div>
                <label htmlFor="booking-notes" className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Aesthetic Notes / Hair Concerns (Optional)</label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell our hair masters if you have sensitive cuticles, chemical balayage histories or specific hair length requests..."
                  className="w-full border border-[#D4AF37]/30 bg-luxury-ivory/40 p-4 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral font-light rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Submit container */}
              <div className="pt-4">
                <button
                  id="final-book-submit"
                  type="submit"
                  className="w-full py-4 text-center font-bold text-[10px] tracking-[0.2em] uppercase bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/50 transition-all duration-300 shadow-lg flex justify-center items-center gap-1.5 cursor-pointer rounded-none"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Secure Luxury Reservation Voucher</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Digital Premium Ticket Output */}
          {step === 4 && finalTicket && (
            <div className="text-center py-6 space-y-8">
              {/* Animation Header */}
              <div className="space-y-1">
                <div className="bg-[#D4AF37]/10 p-4 border border-[#D4AF37] rounded-none w-14 h-14 flex items-center justify-center mx-auto text-[#D4AF37] animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif italic text-luxury-neutral">Your Oasis is Awaiting</h3>
                <p className="text-[10px] text-luxury-neutral/60 uppercase tracking-[0.2em] font-bold">Sovereign Reservation Voucher Confirmed</p>
              </div>

              {/* Digital Card Draft Ticket */}
              <div className="bg-[#1C1C1C] text-luxury-ivory border-t-4 border-[#D4AF37] max-w-md mx-auto p-6 md:p-8 space-y-6 shadow-2xl relative text-left rounded-none">
                {/* Vintage overlay texture */}
                <div className="absolute top-2 right-4 text-right">
                  <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[#D4AF37]">MARI VIP</span>
                </div>

                <div className="border-b border-gold-400/20 pb-4">
                  <span className="text-[9px] uppercase text-[#D4AF37] font-bold tracking-widest">Client Credentials:</span>
                  <p className="text-md font-serif italic leading-tight text-[#F8F5F0]">{finalTicket.clientName}</p>
                  <p className="text-[10px] text-gray-400 font-light flex items-center gap-1.5 mt-1">
                    <Mail className="w-3 h-3 text-[#D4AF37]" /> {finalTicket.clientEmail}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gold-400/20 text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 block tracking-widest font-bold">Ritual Service:</span>
                    <p className="font-bold text-[#D4AF37] mt-1">{finalTicket.serviceName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 block tracking-widest font-bold">Assigned Expert:</span>
                    <p className="font-semibold mt-1 text-gray-300">{selectedStylist}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-5 text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 block tracking-widest font-bold">Scheduled Arrival:</span>
                    <p className="font-bold text-[#D4AF37] mt-1">{finalTicket.date}</p>
                    <p className="text-[10px] text-gray-300 font-light font-sans mt-0.5">{finalTicket.time}</p>
                  </div>
                  <div className="text-right font-bold">
                    <span className="text-[9px] uppercase text-gray-400 block tracking-widest font-bold text-right">Total Price:</span>
                    <p className="text-lg font-bold text-[#D4AF37] font-serif mt-1">${finalTicket.totalPrice}</p>
                    <p className="text-[8px] text-gray-450 uppercase tracking-widest">Pay at checkout</p>
                  </div>
                </div>

                {/* Simulated barcode for luxury look */}
                <div className="pt-4 border-t border-gold-400/20 text-center space-y-1.5 flex flex-col items-center">
                  <div className="w-full flex items-center space-x-1 justify-center">
                    {[1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 2, 4, 2, 1, 3, 1, 4, 2, 1, 3].map((w, index) => (
                      <span
                        key={index}
                        className="bg-[#D4AF37] block h-8"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-mono py-1 uppercase font-bold">{finalTicket.id}</p>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-xs text-luxury-neutral/60 font-light leading-relaxed max-w-sm mx-auto">
                A gorgeous receipt copy is delivered to your client inbox. Please arrive 10 minutes prior to your salon experience to enjoy our luxury warm facial tea.
              </p>

              <div>
                <button
                  onClick={onClose}
                  className="bg-luxury-neutral text-[#D4AF37] border border-[#D4AF37]/45 hover:bg-[#D4AF37] hover:text-luxury-neutral px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase duration-300 rounded-none cursor-pointer"
                >
                  Return to Salon
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer controls only for scheduler steps */}
        {step < 3 && (
          <div className="bg-luxury-ivory p-6 border-t border-[#D4AF37]/20 flex justify-between items-center rounded-none">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="text-[10px] text-luxury-neutral/65 hover:text-luxury-neutral tracking-widest uppercase font-bold flex items-center space-x-1 cursor-pointer"
              >
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNextStep}
              disabled={step === 1 && !selectedService}
              className="bg-[#1C1C1C] hover:bg-[#D4AF37] text-white disabled:opacity-40 border border-[#D4AF37]/45 text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3.5 duration-300 rounded-none cursor-pointer"
            >
              Next Step
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
