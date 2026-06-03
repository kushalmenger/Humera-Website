/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Check, ArrowRight, Star, Heart, Instagram, MapPin, Sparkles, AlertCircle } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ServicesPanel from './components/ServicesPanel';
import BoutiquePanel from './components/BoutiquePanel';
import BridalPanel from './components/BridalPanel';
import GalleryPanel from './components/GalleryPanel';
import LoyaltyMembership from './components/LoyaltyMembership';
import GiftCards from './components/GiftCards';
import InteractiveBooking from './components/InteractiveBooking';
import LiveChatAndSupport from './components/LiveChatAndSupport';
import ContactFooter from './components/ContactFooter';

import { Product, CartItem, Booking, LoyaltyMember, GiftCardPurchase, Service } from './types';
import { SERVICES, PRODUCTS, TESTIMONIALS, INSTAGRAM_POSTS } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingService, setSelectedBookingService] = useState<Service | null>(null);

  // VIP membership state (persisted via localStorage for maximum realism)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [member, setMember] = useState<LoyaltyMember | null>(null);

  // Status and success alerts
  const [globalFeedback, setGlobalFeedback] = useState<{ type: 'booking' | 'cart' | 'vip' | 'gift'; message: string } | null>(null);

  // Hook up localStorage persistence
  useEffect(() => {
    const savedMember = localStorage.getItem('mari_vip_member');
    if (savedMember) {
      setMember(JSON.parse(savedMember));
      setIsLoggedIn(true);
    }

    const savedCart = localStorage.getItem('mari_boutique_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Sync cart shifts
  const updateCartLocalStorage = (updated: CartItem[]) => {
    setCartItems(updated);
    localStorage.setItem('mari_boutique_cart', JSON.stringify(updated));
  };

  // VIP actions
  const handleVIPLogin = (email: string, name: string) => {
    const newMember: LoyaltyMember = {
      email,
      name,
      tier: 'Ivory',
      points: 100, // 100 free starting points
      joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    setMember(newMember);
    setIsLoggedIn(true);
    localStorage.setItem('mari_vip_member', JSON.stringify(newMember));
    triggerFeedback('vip', `Welcome to the Royal Sovereign Club, ${name}! Your starting 100 points are banked.`);
  };

  const handleVIPLogout = () => {
    localStorage.removeItem('mari_vip_member');
    setMember(null);
    setIsLoggedIn(false);
    triggerFeedback('vip', 'Successfully logged out of your VIP sanctuary card.');
  };

  const handleUpdatePoints = (pointsAdded: number) => {
    if (!member) return;
    const currentPoints = Math.max(0, member.points + pointsAdded);
    
    let tier: 'Ivory' | 'Gold' | 'Champagne VIP' = 'Ivory';
    if (currentPoints >= 500) tier = 'Champagne VIP';
    else if (currentPoints >= 150) tier = 'Gold';

    const updated: LoyaltyMember = {
      ...member,
      points: currentPoints,
      tier
    };
    setMember(updated);
    localStorage.setItem('mari_vip_member', JSON.stringify(updated));
  };

  // Feedback Trigger
  const triggerFeedback = (type: 'booking' | 'cart' | 'vip' | 'gift', message: string) => {
    setGlobalFeedback({ type, message });
    setTimeout(() => {
      setGlobalFeedback(null);
    }, 5000);
  };

  // Cart operations
  const handleAddProductToCart = (product: Product, size?: string) => {
    const existingIdx = cartItems.findIndex(
      item => item.product.id === product.id && item.selectedSize === size
    );

    let updated: CartItem[];
    if (existingIdx > -1) {
      updated = [...cartItems];
      updated[existingIdx].quantity += 1;
    } else {
      updated = [...cartItems, { product, quantity: 1, selectedSize: size }];
    }
    updateCartLocalStorage(updated);
    
    // Earn VIP points of shopping
    if (isLoggedIn) {
      handleUpdatePoints(Math.floor(product.price * 0.1)); // 10% points reward
    }
  };

  const handleRemoveItem = (index: number) => {
    const updated = cartItems.filter((_, idx) => idx !== index);
    updateCartLocalStorage(updated);
  };

  const handleUpdateQuantity = (index: number, change: number) => {
    const updated = [...cartItems];
    const newQty = updated[index].quantity + change;
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      updated[index].quantity = newQty;
      updateCartLocalStorage(updated);
    }
  };

  const handleBookingConfirmed = (booking: Booking) => {
    // Earn 50 loyalty points on booking
    if (isLoggedIn) {
      handleUpdatePoints(50);
    }
    triggerFeedback('booking', `Voucher Confirmed! Appointment secured for ${booking.date} at ${booking.time}.`);
  };

  const handleGiftCardPurchased = (gift: GiftCardPurchase) => {
    // Earn 30 VIP points
    if (isLoggedIn) {
      handleUpdatePoints(30);
    }
    triggerFeedback('gift', `Sovereign gift card dispatched warmly to ${gift.recipientName}!`);
  };

  const handleCheckoutCart = () => {
    // Simulate luxury dispatch
    updateCartLocalStorage([]);
    setIsCartOpen(false);
    triggerFeedback('cart', 'Wardrobe parcel secured! Our logistics coordinates will email tracker notes shortly.');
  };

  // Navigation handlers from hero
  const handleExploreServices = () => {
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreBoutique = () => {
    setCurrentPage('boutique');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart metrics calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTax = parseFloat((cartSubtotal * 0.08).toFixed(2));
  const cartDelivery = cartSubtotal > 150 ? 'Complimentary' : '$15.00';
  const cartTotal = (cartSubtotal + cartTax + (cartSubtotal > 150 ? 0 : 15)).toFixed(2);

  return (
    <div className="relative min-h-screen bg-luxury-cream text-luxury-neutral selection:bg-gold-400 selection:text-luxury-neutral outline-none">
      
      {/* Top micro urgent banner displaying salon perks */}
      <div className="bg-luxury-neutral border-b border-gold-400/25 py-2 px-4 text-center text-white text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-1 sm:space-x-2 z-50 relative">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>Complimentary Undergound Valet Parking with any Signature Styling</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">Summer Bridal Slots open now</span>
      </div>

      {/* Global overlay warnings for success feedback notifications */}
      <AnimatePresence>
        {globalFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-55 w-full max-w-lg px-4"
          >
            <div className="bg-luxury-neutral text-white border border-gold-400 p-5 shadow-2xl flex items-center space-x-4">
              <div className="bg-gold-400 text-luxury-neutral p-1.5 shrink-0 rounded-full">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-left flex-grow">
                <p className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">
                  {globalFeedback.type === 'booking' && 'Sovereign Appointment Secure'}
                  {globalFeedback.type === 'cart' && 'Wardrobe Box Transferred'}
                  {globalFeedback.type === 'vip' && 'Loyalty Status Update'}
                  {globalFeedback.type === 'gift' && 'Gift Certificate Issued'}
                </p>
                <p className="text-xs text-gray-200 font-light mt-0.5 leading-relaxed">{globalFeedback.message}</p>
              </div>
              <button
                onClick={() => setGlobalFeedback(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary header navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => {
          setSelectedBookingService(null);
          setIsBookingOpen(true);
        }}
        isLoggedIn={isLoggedIn}
        memberPoints={member?.points || 0}
      />

      {/* Dynamic Main view switcher */}
      <main className="pt-16 pb-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Immersive high resolution Hero */}
              <Hero
                onOpenBooking={() => {
                  setSelectedBookingService(null);
                  setIsBookingOpen(true);
                }}
                onExploreServices={handleExploreServices}
                onExploreBoutique={handleExploreBoutique}
              />

              {/* Home featured categories panel */}
              <div id="welcome-featured-teasers" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
                <div className="max-w-3xl mx-auto text-center">
                  <span className="text-[10px] md:text-xs text-[#D4AF37] font-bold tracking-[0.3em] uppercase block mb-3">
                    The Mari Philosophy
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-luxury-neutral leading-tight mb-8">
                    The Ultimate Intersection of <br />
                    <span className="not-italic font-normal text-gold-505 text-gold-500 uppercase tracking-widest text-2xl md:text-3xl">Beauty & Lifestyle</span>
                  </h2>
                  <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto my-6" />
                  <p className="text-sm text-luxury-neutral/80 font-light max-w-2xl mx-auto leading-relaxed">
                    We invite you to step away from the velocity of modern life. Cozy up into our high-contrast luxury chambers, hold an organic herbal custom tea of your preference, and watch our team craft perfection on your hair, skin, and tailoring wardrobe.
                  </p>
                </div>

                {/* 3 Featured visual cards pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  {[
                    {
                      title: 'The Salon Artistry',
                      tag: 'Hair Couture & Highlights',
                      desc: 'Award-winning hand-painted balayage and structural sculpts tailormade to complement your chin angles.',
                      action: 'View Menu',
                      page: 'services',
                      img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
                    },
                    {
                      title: 'Capsule Wardrobes',
                      tag: 'Luxurious Silks & Cashmere',
                      desc: 'A collection of tailored satin evening gowns, natural South Sea baroque pearl droplets, and private showroom viewings.',
                      action: 'Browse boutique',
                      page: 'boutique',
                      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
                    },
                    {
                      title: 'Royal Bridal Suites',
                      tag: 'Pre-vow luxury preparation',
                      desc: 'Complete trial designs, gold airbrush makeup lock formulations, and villa-concierge touch-ups.',
                      action: 'Explore bridal',
                      page: 'bridal',
                      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
                    }
                  ].map((card, index) => (
                    <div key={index} className="bg-white border border-[#D4AF37]/35 group overflow-hidden flex flex-col justify-between h-[450px] rounded-none hover:shadow-lg transition-all duration-500">
                      <div>
                        <div className="relative h-56 overflow-hidden bg-zinc-200">
                          <img
                            src={card.img}
                            alt={card.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6 md:p-8 space-y-2">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">{card.tag}</span>
                          <h3 className="text-base font-serif italic text-luxury-neutral line-clamp-1">{card.title}</h3>
                          <p className="text-xs text-luxury-neutral/80 leading-relaxed font-light line-clamp-3">{card.desc}</p>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 pt-0">
                        <button
                          onClick={() => {
                            setCurrentPage(card.page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#1C1C1C] flex items-center space-x-1.5 cursor-pointer"
                        >
                          <span>{card.action}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick static testimonial block */}
              <div className="py-20 bg-[#1C1C1C] border-y border-[#D4AF37]/30 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                  <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold block">The Verdict of Vogue</span>
                  <p className="text-xl md:text-2xl font-light italic font-serif leading-relaxed max-w-4xl mx-auto text-gray-105">
                    "The single outstanding sanctuary in New York that masterfully aligns French baby-lights, pristine structural Russ cuticle manicures, and cashmeres without compromising an inch on hospitality. Mari is a state of absolute grace."
                  </p>
                  <div>
                    <div className="flex justify-center space-x-1 text-[#D4AF37] mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-300">The Salon Guild Journal</span>
                  </div>
                </div>
              </div>

              {/* Instagram section preview */}
              <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center">
                  <span className="text-[10px] tracking-widest text-gold-505 text-gold-500 uppercase block font-bold">@MariBoutiqueSalon</span>
                  <h3 className="text-xl md:text-2xl font-light serif-heading mt-1">Our Collective Digital Diary</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {INSTAGRAM_POSTS.slice(0, 6).map((post) => (
                    <div key={post.id} className="relative group overflow-hidden border border-gold-400/10">
                      <img
                        src={post.url}
                        alt="Instagram style preview"
                        referrerPolicy="no-referrer"
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="text-xs text-white font-medium uppercase tracking-wider cursor-pointer font-sans" onClick={() => setCurrentPage('gallery')}>View Portfolio</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <About />
            </motion.div>
          )}

          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ServicesPanel
                onBookService={(srv) => {
                  setSelectedBookingService(srv);
                  setIsBookingOpen(true);
                }}
              />
            </motion.div>
          )}

          {currentPage === 'boutique' && (
            <motion.div
              key="boutique"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <BoutiquePanel
                onAddProductToCart={handleAddProductToCart}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          )}

          {currentPage === 'bridal' && (
            <motion.div
              key="bridal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <BridalPanel />
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <GalleryPanel />
            </motion.div>
          )}

          {currentPage === 'loyalty' && (
            <motion.div
              key="loyalty"
              initial={{ opacity: 0, v: 15 }}
              animate={{ opacity: 1, v: 0 }}
              exit={{ opacity: 0 }}
            >
              <LoyaltyMembership
                isLoggedIn={isLoggedIn}
                onLogin={handleVIPLogin}
                onLogout={handleVIPLogout}
                member={member}
                onUpdatePoints={handleUpdatePoints}
              />
            </motion.div>
          )}

          {currentPage === 'gift-cards' && (
            <motion.div
              key="gift-cards"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <GiftCards onGiftPurchase={handleGiftCardPurchased} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Chat Support widget concierge */}
      <LiveChatAndSupport />

      {/* Persistent global footer */}
      <ContactFooter />

      {/* MODAL: Sliding Wardrobe bag / Shopping cart drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-55 flex justify-end" id="global-shopping-bag">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 border-l border-gold-400/20 text-left"
            >
              <div className="p-6 md:p-8 bg-luxury-neutral text-white flex justify-between items-center border-b border-gold-400/20">
                <div>
                  <h3 className="text-lg serif-heading font-light tracking-widest text-gold-400">MY WARDROBE BAG</h3>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">Selected Boutique Pieces</p>
                </div>
                <button
                  id="close-cart-drawer"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List area */}
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="bg-luxury-cream p-4 rounded-full w-14 h-14 flex items-center justify-center mx-auto text-gold-500">
                      <ShoppingBag className="w-6 h-6 text-gold-400" />
                    </div>
                    <p className="text-md font-semibold text-luxury-neutral serif-heading">Bag is entirely empty</p>
                    <p className="text-xs text-gray-400 font-light max-w-xs mx-auto leading-relaxed">
                      Wander into our Capsule Boutique menu, choose exquisite satin dresses, fragrances and drop baroque pearls.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentPage('boutique');
                      }}
                      className="text-xs text-gold-500 font-bold uppercase tracking-widest hover:underline cursor-pointer"
                    >
                      Browse Boutique Store
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex py-4 border-b border-gray-100 items-start space-x-4"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-20 object-cover object-center border animate-pulse bg-gray-50 shrink-0"
                        />
                        <div className="flex-grow space-y-1">
                          <span className="text-[9px] uppercase text-gold-500 tracking-wider font-bold block">{item.product.category}</span>
                          <h4 className="text-xs font-semibold text-luxury-neutral font-display line-clamp-1">{item.product.name}</h4>
                          {item.selectedSize && (
                            <span className="text-[10px] text-gray-500 uppercase font-medium">Size: {item.selectedSize}</span>
                          )}
                          <div className="flex justify-between items-center pt-2">
                            {/* Qty increments */}
                            <div className="flex border border-gray-300 items-center text-xs">
                              <button
                                onClick={() => handleUpdateQuantity(idx, -1)}
                                className="px-2 py-0.5 text-gray-500 hover:bg-gray-150 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 font-mono">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(idx, 1)}
                                className="px-2 py-0.5 text-gray-500 hover:bg-gray-150 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-semibold text-luxury-neutral font-mono">${item.product.price * item.quantity}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cost specifications footer */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-luxury-ivory border-t border-gold-400/15 space-y-4 text-xs font-light text-luxury-neutral">
                  <div className="space-y-2 border-b border-gray-200 pb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px]">Cabinet Subtotal:</span>
                      <span className="font-semibold font-mono">${cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px]">Tax Estimate (8%):</span>
                      <span className="font-semibold font-mono">${cartTax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px]">VIP Delivery Courier:</span>
                      <span className="font-semibold text-gold-600">{cartDelivery}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-bold text-sm text-luxury-neutral font-display">
                    <span className="uppercase tracking-widest text-[#B79222]">Total Balance:</span>
                    <span className="text-lg text-luxury-neutral font-serif font-semibold">${cartTotal}</span>
                  </div>

                  {isLoggedIn && (
                    <div className="bg-gold-400/5 border border-gold-400/20 p-2.5 text-[10px] tracking-wide text-gold-600 font-semibold text-center uppercase">
                      VIP Purchase reward (+{Math.floor(cartSubtotal * 0.1)} points)
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      id="cart-submit-checkout"
                      onClick={handleCheckoutCart}
                      className="w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] bg-luxury-neutral hover:bg-[#D4AF37] text-white transition-all duration-300 shadow-md cursor-pointer flex justify-center items-center gap-2 rounded-none"
                    >
                      <span>Secure At-Home Courier Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Appointment reservation booking flow scheduler */}
      <AnimatePresence>
        {isBookingOpen && (
          <InteractiveBooking
            initialService={selectedBookingService}
            onClose={() => {
              setSelectedBookingService(null);
              setIsBookingOpen(false);
            }}
            onBookingConfirmed={(booking) => {
              handleBookingConfirmed(booking);
              setIsBookingOpen(false);
            }}
            isLoggedIn={isLoggedIn}
            memberEmail={member?.email}
            memberName={member?.name}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
