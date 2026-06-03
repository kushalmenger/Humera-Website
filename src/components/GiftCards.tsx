/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gift, Sparkles, Check, Send, Heart, Download } from 'lucide-react';
import { GiftCardPurchase } from '../types';

interface GiftCardsProps {
  onGiftPurchase: (giftCard: GiftCardPurchase) => void;
}

export default function GiftCards({ onGiftPurchase }: GiftCardsProps) {
  const [cardDesign, setCardDesign] = useState<'champagne' | 'noir' | 'blush'>('champagne');
  const [selectedAmount, setSelectedAmount] = useState<number>(150);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState<string>('');

  const [purchasedCard, setPurchasedCard] = useState<GiftCardPurchase | null>(null);

  const cardDesigns = [
    { id: 'champagne', label: 'Gold Champagne', bg: 'bg-gradient-to-br from-[#E8DCCB] via-[#F8F5F0] to-[#D4AF37]', border: 'border-gold-400', banner: 'Luxury Spa Rituals' },
    { id: 'noir', label: 'Luxury Obsidian', bg: 'bg-gradient-to-br from-zinc-900 via-stone-800 to-black', border: 'border-stone-700', banner: 'Night Haute Curation' },
    { id: 'blush', label: 'Petal Rose Blush', bg: 'bg-gradient-to-br from-[#FAF9F6] via-[#FCE4EC] to-[#E8DCCB]', border: 'border-pink-200', banner: 'Sovereign Bridal Glow' }
  ];

  const handleAmountSelect = (val: number) => {
    setSelectedAmount(val);
    setCustomAmountStr('');
  };

  const handleCustomAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmountStr(e.target.value);
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
  };

  const handleBuyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount;
    if (finalAmount <= 0) return;

    const code = `MARI-GFT-${Math.floor(100000 + Math.random() * 900000).toString()}`;
    const newGiftCard: GiftCardPurchase = {
      id: `GFT-${Math.floor(1000 + Math.random() * 9000)}`,
      cardDesign,
      amount: finalAmount,
      recipientName,
      recipientEmail,
      senderName,
      personalMessage,
      code,
      purchaseDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setPurchasedCard(newGiftCard);
    onGiftPurchase(newGiftCard);
  };

  const handleCreateAnother = () => {
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setPersonalMessage('');
    setSelectedAmount(150);
    setCardDesign('champagne');
    setPurchasedCard(null);
  };

  const getDesignDetails = (style: 'champagne' | 'noir' | 'blush') => {
    switch (style) {
      case 'noir':
        return {
          textColor: 'text-luxury-ivory',
          subColor: 'text-gray-400',
          accentColor: 'text-gold-400',
          bgClass: 'bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-900',
          logoClass: 'text-white'
        };
      case 'blush':
        return {
          textColor: 'text-luxury-neutral',
          subColor: 'text-purple-600',
          accentColor: 'text-rose-500',
          bgClass: 'bg-gradient-to-br from-[#FAF9F6] via-[#FAECEF] to-[#F1DEE1]',
          logoClass: 'text-luxury-neutral'
        };
      default:
        return {
          textColor: 'text-luxury-neutral',
          subColor: 'text-gold-600',
          accentColor: 'text-[#B79222]',
          bgClass: 'bg-gradient-to-br from-[#F8F5F0] via-[#FAF9F6] to-[#E8DCCB]',
          logoClass: 'text-luxury-neutral'
        };
    }
  };

  const designUI = getDesignDetails(cardDesign);

  return (
    <div id="mari-gift-cards" className="py-20 lg:py-28 bg-luxury-ivory text-luxury-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head-branding */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] md:text-sm text-[#D4AF37] font-bold tracking-[0.3em] uppercase block mb-3">
            Pure Elegance Shared
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-luxury-neutral leading-tight mb-6">
            The Digital Gift <br />
            <span className="not-italic font-normal text-gold-505 text-gold-500 uppercase tracking-widest text-2xl sm:text-3xl">Certificate</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/35 mx-auto my-6" />
          <p className="text-sm text-luxury-neutral/80 font-light max-w-2xl mx-auto leading-relaxed">
            Spoil someone special with an elite, customized hair reconstruction, a pristine Russian manicure treatment, or exclusive boutique fashion garments.
          </p>
        </div>

        {/* Dynamic Card display & setup split row */}
        {purchasedCard ? (
          /* Purchased Success Slate */
          <div className="max-w-3xl mx-auto space-y-10 text-center py-6">
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37] p-4 rounded-none w-14 h-14 flex items-center justify-center mx-auto text-[#D4AF37] animate-pulse">
              <Check className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-serif italic text-luxury-neutral">Luxury Gift Is Secured!</h3>
              <p className="text-xs text-luxury-neutral/60 uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                Your customized voucher is generated and locked. A copy is dispatched to recipient inbox <span className="font-bold text-[#D4AF37]">{purchasedCard.recipientEmail}</span>.
              </p>
            </div>

            {/* Rendered Gift Card Voucher design */}
            <div className={`p-8 md:p-12 shadow-2xl relative overflow-hidden text-left border rounded-none max-w-xl mx-auto ${getDesignDetails(purchasedCard.cardDesign).bgClass} ${getDesignDetails(purchasedCard.cardDesign).textColor}`}>
              <div className="flex justify-between items-start mb-10 border-b border-[#D4AF37]/20 pb-4">
                <div>
                  <span className="text-xl tracking-[0.2em] font-bold font-serif block">MARI</span>
                  <span className="text-[9px] tracking-[0.3em] uppercase block font-light text-gold-400">Atelier Boutique</span>
                </div>
                <span className="bg-luxury-neutral text-[#D4AF37] border border-[#D4AF37]/50 font-bold tracking-widest text-[10px] uppercase px-3 py-1.5 shadow">
                  ${purchasedCard.amount} USD
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-bold">Specially Tailored For:</span>
                  <p className="text-md font-serif italic">{purchasedCard.recipientName}</p>
                  <p className="text-[10px] text-gray-400 font-light">{purchasedCard.recipientEmail}</p>
                </div>

                {purchasedCard.personalMessage && (
                  <div className="bg-white/5 p-4 border border-white/5 italic text-xs font-light">
                    "{purchasedCard.personalMessage}"
                  </div>
                )}

                <div className="flex justify-between items-end pt-4 border-t border-[#D4AF37]/20 text-xs">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-bold">Sent Warmly by:</span>
                    <p className="font-semibold">{purchasedCard.senderName || 'Anonymous Friend'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-bold">Secured Voucher Code:</span>
                    <p className="font-mono text-[11px] text-[#D4AF37] tracking-wider font-semibold uppercase">{purchasedCard.code}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Options after purchase */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => window.print()}
                className="bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/45 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer rounded-none flex items-center justify-center space-x-1.5 duration-300"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Print Luxury Certificate</span>
              </button>
              <button
                onClick={handleCreateAnother}
                className="bg-white hover:bg-luxury-neutral text-luxury-neutral hover:text-white border border-[#D4AF37]/45 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer rounded-none duration-300"
              >
                Send Another Gift Certificate
              </button>
            </div>
          </div>
        ) : (
          /* Live Customizer Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* Left Column: Input Forms */}
            <div className="lg:col-span-6 bg-white border border-[#D4AF37]/30 p-6 sm:p-10 text-left rounded-none">
              <h3 className="text-xl font-serif italic text-luxury-neutral mb-6 pb-4 border-b border-gray-100 flex items-center gap-1.5">
                <Gift className="w-5 h-5 text-[#D4AF37]" /> Personalized Voucher Builder
              </h3>

              <form onSubmit={handleBuyGiftCard} className="space-y-6">
                {/* Style selector */}
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-neutral/60 block mb-3">Choose Palette design template</span>
                  <div className="grid grid-cols-3 gap-2">
                    {cardDesigns.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setCardDesign(style.id as any)}
                        className={`p-3 text-[10px] tracking-wider uppercase font-bold border text-center transition-all cursor-pointer rounded-none ${
                          cardDesign === style.id
                            ? 'bg-luxury-neutral text-[#D4AF37] border-[#D4AF37] shadow'
                            : 'bg-white text-luxury-neutral border border-[#D4AF37]/30 hover:border-gold-500'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing values picker */}
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-neutral/60 block mb-3">Set customized monetary worth</span>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[50, 100, 150, 300].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        className={`py-2.5 text-xs tracking-wider uppercase font-bold border transition-all cursor-pointer rounded-none ${
                          selectedAmount === amt && !customAmountStr
                            ? 'bg-[#1C1C1C] text-[#D4AF37] border-[#D4AF37]/45'
                            : 'bg-luxury-ivory text-luxury-neutral border border-[#D4AF37]/20 hover:border-gold-500'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  {/* Custom input */}
                  <div>
                    <input
                      id="custom-gift-amount"
                      type="number"
                      placeholder="Or type custom amount ($)"
                      value={customAmountStr}
                      onChange={handleCustomAmountInput}
                      min="10"
                      max="2000"
                      className="w-full bg-luxury-ivory border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral font-medium rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gift-rec-name" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Recipient Name</label>
                    <input
                      id="gift-rec-name"
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Arabella Vance"
                      className="w-full bg-luxury-ivory border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label htmlFor="gift-rec-email" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Recipient Email</label>
                    <input
                      id="gift-rec-email"
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="e.g. recipient@luxury.com"
                      className="w-full bg-luxury-ivory border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gift-sender-name" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">My Name</label>
                    <input
                      id="gift-sender-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter my name"
                      className="w-full bg-luxury-ivory border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <div className="text-[10px] text-luxury-neutral/60 text-left pt-6 leading-relaxed">
                    Gift certifications do not expire. Use of certificate valid in fashion Boutique showroom, bridal consultations, or salon treatment blocks.
                  </div>
                </div>

                <div>
                  <label htmlFor="gift-message" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">Personal Greeting Card Message (Optional)</label>
                  <textarea
                    id="gift-message"
                    rows={3}
                    maxLength={150}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Wishing you a beautiful, relaxing boutique salon escape. Love warmly, ..."
                    className="w-full bg-luxury-ivory border border-[#D4AF37]/30 p-4 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral font-light rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <button
                  id="buy-giftcard-submit"
                  type="submit"
                  className="w-full py-4 text-center font-bold text-[10px] tracking-[0.2em] uppercase bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/50 transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Deliver Luxury Gift Certificate</span>
                </button>
              </form>
            </div>

            {/* Right Column: Dynamic Live Preview card */}
            <div className="lg:col-span-6 bg-white border border-[#D4AF37]/20 p-6 sm:p-10 flex flex-col justify-center items-center rounded-none shadow-sm">
              <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-neutral/60 block mb-6">Real-Time Design Rendering Studio</span>
              
              {/* The Live Rendered Card */}
              <div className={`p-8 md:p-10 shadow-xl relative overflow-hidden rounded-none w-full max-w-md aspect-video flex flex-col justify-between text-left border border-[#D4AF37]/35 ${designUI.bgClass} ${designUI.textColor}`}>
                {/* glow effects */}
                <span className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl block" />

                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="text-lg tracking-[0.2em] font-bold font-serif block">MARI</span>
                    <span className="text-[8px] tracking-[0.3em] uppercase block font-light text-gold-500">Boutique Salon</span>
                  </div>
                  <span className="bg-luxury-neutral text-[#D4AF37] font-bold tracking-widest text-xs uppercase px-2.5 py-1.5 flex items-center shrink-0 border border-[#D4AF37]/45">
                    ${selectedAmount} USD
                  </span>
                </div>

                <div className="space-y-3 z-10">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-bold">Custom Tailored For:</span>
                    <p className="text-sm font-serif italic leading-tight">{recipientName || 'Arabella Vance (Aesthetic Guest)'}</p>
                    <p className="text-[10px] text-gray-400 font-medium font-sans">{recipientEmail || 'guest@vogue-luxury.com'}</p>
                  </div>

                  <p className="text-[10px] line-clamp-2 italic font-light opacity-90 border-t border-gold-400/10 pt-2 shrink-0">
                    "{personalMessage || 'Wishing you an afternoon of supreme, tranquil pampering. Love warmly...'}"
                  </p>
                </div>

                <div className="border-t border-gold-400/10 pt-3 flex justify-between items-end text-[10px] z-10 mt-2">
                  <div>
                    <span className="text-[7px] uppercase tracking-widest text-gray-400 block font-bold">Sent warmly by:</span>
                    <p className="font-semibold text-[10px]">{senderName || 'My Elegant Friend'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] uppercase tracking-widest text-gray-400 block font-bold">Simulated Barcode:</span>
                    <p className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase font-bold">MARI-GFT-XXXXXX</p>
                  </div>
                </div>
              </div>

              {/* helpful context prompt */}
              <div className="mt-8 text-center max-w-sm space-y-2">
                <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Holographic Gold Crest Series
                </span>
                <p className="text-xs text-luxury-neutral/60 font-light leading-relaxed">
                  Upon completion, your friend receives a bespoke high-resolution secure design voucher. They can print or present their code on an iPhone/Android during checkout in the salon!
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
