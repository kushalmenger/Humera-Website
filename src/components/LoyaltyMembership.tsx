/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Sparkles, Check, Gift, LogIn, Award, Bookmark, Compass } from 'lucide-react';
import { LoyaltyMember } from '../types';

interface LoyaltyMembershipProps {
  isLoggedIn: boolean;
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
  member: LoyaltyMember | null;
  onUpdatePoints: (pointsAdded: number) => void;
}

export default function LoyaltyMembership({
  isLoggedIn,
  onLogin,
  onLogout,
  member,
  onUpdatePoints
}: LoyaltyMembershipProps) {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [successClaimMsg, setSuccessClaimMsg] = useState<string | null>(null);

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !nameInput) return;
    onLogin(emailInput, nameInput);
    setEmailInput('');
    setNameInput('');
  };

  const handleDailyCheckIn = () => {
    onUpdatePoints(15);
    setSuccessClaimMsg('Enriched! Daily salon wellness boost unlocked (+15 points)');
    setTimeout(() => setSuccessClaimMsg(null), 4000);
  };

  const handleClaimReward = (cost: number, rewardLabel: string) => {
    if (!member || member.points < cost) return;
    onUpdatePoints(-cost);
    setSuccessClaimMsg(`Redeemed Voucher code! "${rewardLabel}" registered in your inbox.`);
    setTimeout(() => setSuccessClaimMsg(null), 5000);
  };

  const getTierDetails = (points: number) => {
    if (points >= 500) {
      return {
        tier: 'Champagne VIP',
        color: 'from-amber-600 via-gold-400 to-amber-700',
        perks: [
          'Complimentary full-bottle champagne service',
          'Free signature blow-dry with any custom coloring',
          'Dual Priority 24-hour emergency wedding styling concierge access',
          'Private quarterly fashion preview showcase custom-fittings'
        ]
      };
    } else if (points >= 150) {
      return {
        tier: 'Gold Elite',
        color: 'from-yellow-600 via-yellow-500 to-yellow-700',
        perks: [
          'Guaranteed custom hot stone release upgrade on any massage',
          '10% off all Capsule fashion boutique apparel',
          'Pre-opening bookings access before public announcements',
          'Exclusive gold-foil facial upgrade on birthdays'
        ]
      };
    } else {
      return {
        tier: 'Ivory Club',
        color: 'from-gray-800 via-zinc-700 to-black',
        perks: [
          'Complimentary botanical wash organic deep condition wash',
          'Priority cancellation list scheduling',
          'Early VIP notice of new boutique arrivals',
          'Free customized tea luxury and chocolates session'
        ]
      };
    }
  };

  const tierInfo = member ? getTierDetails(member.points) : null;

  return (
    <div id="mari-vip-loyalty" className="py-20 lg:py-28 bg-luxury-ivory text-luxury-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] md:text-xs text-[#D4AF37] font-bold tracking-[0.3em] uppercase block mb-3">
            Elite Loyalty Program
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-luxury-neutral leading-tight mb-6">
            The Mari VIP <br />
            <span className="not-italic font-normal text-gold-505 text-gold-500 uppercase tracking-widest text-2xl sm:text-3xl">Sovereign Club</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/35 mx-auto my-6" />
          <p className="text-sm text-luxury-neutral/80 font-light max-w-2xl mx-auto leading-relaxed">
            Earn aesthetic wellness tokens on every hair sculpture, custom coloring, and boutique wardrobe selection. Save points to redeem 24K pure face elements.
          </p>
        </div>

        {/* Dynamic Success notifications */}
        {successClaimMsg && (
          <div className="max-w-md mx-auto mb-8 bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37] p-4 rounded-none text-[10px] tracking-[0.2em] uppercase text-center flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>{successClaimMsg}</span>
          </div>
        )}

        {/* Guest View: Enroll or Authenticate */}
        {!isLoggedIn || !member ? (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 border border-[#D4AF37]/30 bg-white shadow-xl rounded-none">
            {/* Promo card text */}
            <div className="bg-luxury-neutral text-white p-8 sm:p-12 flex flex-col justify-between text-left rounded-none">
              <div className="space-y-6">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">VIP Status Tiers</span>
                <h3 className="text-2xl font-serif italic leading-tight text-white">Unlock Bespoke Privileges</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Join our exclusive inner circle. To express our gratitude of pampering you, guests receive <span className="text-[#D4AF37] font-bold">100 complimentary point tokens</span> instantly upon enrollment. Use points on bespoke organic masks, facial lifts, and luxury boutique discounts.
                </p>

                {/* mini tier breakdown */}
                <div className="space-y-3 pt-4 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="font-semibold text-gold-300">Ivory Club Member</span>
                    <span className="text-gray-400">0 - 149 pts</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="font-semibold text-yellow-500">Gold Elite</span>
                    <span className="text-gray-400">150 - 499 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-amber-500 flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Champagne VIP</span>
                    <span className="text-gray-400 font-semibold">500+ pts</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-8 font-light">Secure • Non-tracking • High-end privacy</p>
            </div>

            {/* Login enroll form */}
            <div className="p-8 sm:p-12 text-left bg-white rounded-none">
              <LogIn className="w-8 h-8 text-[#D4AF37] mb-6" />
              <h3 className="text-lg font-serif italic text-luxury-neutral mb-2">Claim My VIP Identity Card</h3>
              <p className="text-xs text-luxury-neutral/60 font-light mb-6">Enter details below. Your phone and billing will synchronize with offline salon treatments automatically.</p>
              
              <form onSubmit={handleEnroll} className="space-y-6">
                <div>
                  <label htmlFor="vip-name" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">My Full Name</label>
                  <input
                    id="vip-name"
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Arabella Laurent"
                    className="w-full bg-luxury-ivory border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral font-medium rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="vip-email" className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">Email Address</label>
                  <input
                    id="vip-email"
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. arabella@vogue.com"
                    className="w-full bg-luxury-ivory border border-[#D4AF37]/30 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-luxury-neutral font-medium rounded-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <button
                  id="enroll-vip-submit"
                  type="submit"
                  className="w-full py-4 text-center font-bold text-[10px] tracking-[0.2em] uppercase bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/50 transition-all duration-300 shadow rounded-none cursor-pointer"
                >
                  Create & Claim My 100 Points
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Loyal Member VIP Portal */
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Card & quick stats block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Metallic VIP Holographic Card representation */}
              <div className="lg:col-span-5">
                <div className={`p-8 bg-gradient-to-br ${tierInfo?.color} text-white shadow-2xl relative overflow-hidden h-72 flex flex-col justify-between border border-[#D4AF37]/40 select-none group rounded-none`}>
                  
                  {/* Holographic glowing bubbles decoration */}
                  <div className="absolute right-0 top-0 w-44 h-44 bg-white/10 rounded-full blur-2xl group-hover:bg-white/25 transition-all duration-700" />
                  <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-gold-200/5 rounded-full blur-3xl" />

                  <div className="flex justify-between items-start z-10">
                    <div className="text-left">
                      <span className="text-2xl font-bold tracking-[0.16em] font-serif block text-white/95">MARI</span>
                      <span className="text-[0.55rem] tracking-[0.4em] font-light uppercase text-gold-300 block">Sovereign Board</span>
                    </div>
                    <span className="bg-white/15 px-3 py-1 rounded-none text-[9px] uppercase tracking-[0.2em] font-bold border border-white/25">
                      VIP CARD
                    </span>
                  </div>

                  <div className="space-y-0.5 text-left z-10">
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest block font-light">Sovereign Tier:</span>
                    <p className="text-xl font-serif italic tracking-wide text-gold-100 flex items-center gap-1">
                      <Award className="w-5 h-5 text-gold-200 animate-pulse" />
                      {tierInfo?.tier}
                    </p>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/15 pt-4 z-10 text-left">
                    <div>
                      <span className="text-[8px] text-gray-400 uppercase tracking-widest block font-bold">VIP Identifier:</span>
                      <p className="text-xs font-semibold tracking-wider text-gray-200">{member.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-gray-400 uppercase tracking-widest block font-bold text-right">Points Tracked:</span>
                      <p className="text-xl font-bold font-serif text-gold-200">{member.points} pts</p>
                    </div>
                  </div>
                </div>

                {/* Fast Action Point Booster */}
                <div className="mt-4 bg-white border border-[#D4AF37]/35 rounded-none p-5 flex justify-between items-center text-xs">
                  <div className="text-left pr-4">
                    <p className="font-bold text-luxury-neutral uppercase tracking-wider text-[11px]">Wellness Check-In Booster</p>
                    <p className="text-[10px] text-luxury-neutral/60 font-light mt-0.5">Claim points daily to unlock elite Gold and Champagne status.</p>
                  </div>
                  <button
                    id="daily-points-collect-trigger"
                    onClick={handleDailyCheckIn}
                    className="bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/50 transition-all duration-300 font-bold uppercase px-4 py-3 text-[10px] tracking-[0.2em] cursor-pointer rounded-none whitespace-nowrap block"
                  >
                    Hold check-in (+15 pts)
                  </button>
                </div>
              </div>

              {/* Tier details, active privileges */}
              <div className="lg:col-span-7 bg-white border border-[#D4AF37]/35 p-8 md:p-10 flex flex-col justify-between text-left rounded-none">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">Membership Benefits Status</span>
                  <h3 className="text-lg font-serif italic text-luxury-neutral mb-4">
                    My Current Active Privileges ({tierInfo?.tier}):
                  </h3>
                  
                  <div className="space-y-3 pt-2">
                    {tierInfo?.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-3 text-left">
                        <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-luxury-neutral/80 font-light leading-relaxed">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-center mt-6">
                  <span className="text-[10px] text-gray-400 uppercase font-light">Enrolled: {member.joinedDate}</span>
                  <button
                    onClick={onLogout}
                    className="text-[10px] tracking-widest uppercase font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Logout VIP Box
                  </button>
                </div>
              </div>

            </div>

            {/* SECTION: REDEEMABLE REWARDS */}
            <div className="border-t border-[#D4AF37]/25 pt-12 text-left">
              <h3 className="text-lg font-serif italic text-luxury-neutral mb-8 flex items-center gap-1.5 justify-center md:justify-start">
                <Gift className="w-5 h-5 text-[#D4AF37]" /> Save & Redeem Point Vouchers
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { cost: 80, label: 'Pure Kaviar Hydration Mask', desc: 'Add luxurious deep oil cavity conditioning to your signature blowout treatment.', tag: 'Hair Wellness' },
                  { cost: 180, label: 'Gold Squalane Facial Infusion', desc: 'Pure 10ml mini bottle of Squalane absolute and 24K gold foil flakes.', tag: 'Aesthetic skincare' },
                  { cost: 250, label: '$60 boutique capsule voucher', desc: 'Receive instant cash off any evening satin gowns, pearl droplets, or cashmeres.', tag: 'Capsule boutique shopping' }
                ].map((reward, rIdx) => {
                  const eligible = member.points >= reward.cost;
                  return (
                    <div
                      key={rIdx}
                      className={`bg-white p-6 border flex flex-col justify-between rounded-none ${
                        eligible ? 'border-[#D4AF37] shadow-sm' : 'border-[#D4AF37]/20 opacity-80'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-neutral bg-luxury-ivory px-2.5 py-1 border border-[#D4AF37]/25">
                            {reward.cost} Points
                          </span>
                          <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">{reward.tag}</span>
                        </div>
                        <h4 className="text-sm font-serif italic text-luxury-neutral mb-2">{reward.label}</h4>
                        <p className="text-[11px] text-luxury-neutral/75 font-light leading-relaxed mb-6">{reward.desc}</p>
                      </div>

                      <button
                        onClick={() => handleClaimReward(reward.cost, reward.label)}
                        disabled={!eligible}
                        className={`w-full py-3 text-center text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer transition-all duration-300 rounded-none ${
                          eligible
                            ? 'bg-luxury-neutral hover:bg-[#D4AF37] text-white border border-[#D4AF37]/45'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        }`}
                      >
                        {eligible ? 'Claim Point Reward' : `Need ${reward.cost - member.points} more points`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
