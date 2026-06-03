/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar, Sparkles, User, Gift } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartItemsCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  isLoggedIn: boolean;
  memberPoints: number;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cartItemsCount,
  onOpenCart,
  onOpenBooking,
  isLoggedIn,
  memberPoints
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Story' },
    { id: 'services', label: 'Salon Services' },
    { id: 'boutique', label: 'The Boutique' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'gallery', label: 'Transformations' }
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gold-400/30 py-3 text-luxury-neutral'
          : 'bg-luxury-ivory/80 backdrop-blur-md border-b border-gold-400/20 py-4 text-luxury-neutral'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand Title */}
          <div
            id="brand-logo"
            className="flex-shrink-0 cursor-pointer flex flex-col items-center justify-center group"
            onClick={() => handleNavClick('home')}
          >
            <span className="text-2.5xl font-serif tracking-[0.2em] text-luxury-neutral group-hover:text-gold-500 transition-colors duration-300">
              MARI <span className="text-gold-400 italic">Boutique</span>
            </span>
            <span className="text-[0.55rem] tracking-[0.4em] font-light uppercase text-gold-500 -mt-0.5 group-hover:text-luxury-neutral transition-colors duration-300">
              Salon Atelier
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-1 py-2 text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 cursor-pointer ${
                  currentPage === item.id ? 'text-[#D4AF37]' : 'text-luxury-neutral/80 hover:text-gold-500'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37]" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Loyalty / Membership Status Link */}
            <button
              id="navbar-action-loyalty"
              onClick={() => handleNavClick('loyalty')}
              className={`flex items-center space-x-1.5 text-[11px] tracking-[0.2em] uppercase font-semibold cursor-pointer transition-colors duration-300 ${
                currentPage === 'loyalty' ? 'text-gold-500 font-bold' : 'text-luxury-neutral/80 hover:text-[#D4AF37]'
              }`}
            >
              <User className="w-4 h-4 text-gold-400" />
              {isLoggedIn ? (
                <span className="flex items-center gap-1">
                  VIP <span className="bg-gold-400/20 text-gold-500 px-1.5 py-0.5 rounded text-[10px]">{memberPoints}p</span>
                </span>
              ) : (
                <span>VIP Club</span>
              )}
            </button>

            {/* Gift Card Link */}
            <button
              id="navbar-action-giftcards"
              onClick={() => handleNavClick('gift-cards')}
              className={`flex items-center space-x-1.5 py-1 px-3.5 border border-[#D4AF37]/35 rounded-none hover:border-[#D4AF37] transition-all text-[11px] tracking-[0.2em] uppercase cursor-pointer text-luxury-neutral/80 hover:text-gold-500 ${
                currentPage === 'gift-cards' ? 'border-[#D4AF37] text-gold-500 font-bold' : ''
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Gifts</span>
            </button>

            {/* Cart Button */}
            <button
              id="navbar-shopping-cart-trigger"
              onClick={onOpenCart}
              className="relative p-2 text-luxury-neutral/85 hover:text-gold-500 transition-colors duration-300 cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-400 text-luxury-neutral rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Booking Call-To-Action Button */}
            <button
              id="header-booking-button"
              onClick={onOpenBooking}
              className="flex items-center space-x-2 bg-luxury-neutral text-white hover:bg-gold-400 hover:text-luxury-neutral px-6 py-3 rounded-none font-semibold tracking-[0.2em] uppercase text-[11px] transition-colors duration-300 shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Ritual</span>
            </button>
          </div>

          {/* Mini Header Tools For Tablet/Mobile */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              id="mobile-cart-trigger"
              onClick={onOpenCart}
              className="relative p-2 text-luxury-neutral hover:text-[#D4AF37] cursor-pointer"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-gold-400 text-luxury-neutral rounded-full px-1.5 py-0.5 text-[9px] font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              id="mobile-booking-quick-trigger"
              onClick={onOpenBooking}
              className="p-2 text-luxury-neutral hover:text-[#D4AF37] cursor-pointer"
            >
              <Calendar className="w-5.5 h-5.5" />
            </button>

            {/* Toggle Hamburger */}
            <button
              id="mobile-hamburger-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-luxury-neutral hover:text-[#D4AF37] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-slideout-menu"
          className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#D4AF37]/35 py-6 px-4 space-y-4 shadow-xl text-center flex flex-col justify-center items-center"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full py-2.5 text-xs tracking-[0.25em] uppercase font-bold cursor-pointer transition-colors ${
                currentPage === item.id ? 'text-[#D4AF37] font-extrabold' : 'text-luxury-neutral hover:text-[#D4AF37]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="w-full h-[1px] bg-gold-400/20 my-4" />

          {/* Secondary Mobile Actions */}
          <div className="flex flex-col space-y-3 w-full max-w-xs justify-center items-center">
            <button
              id="mobile-loyalty-link"
              onClick={() => handleNavClick('loyalty')}
              className={`flex items-center space-x-2 py-2 text-xs uppercase tracking-[0.2em] font-semibold text-center cursor-pointer ${
                currentPage === 'loyalty' ? 'text-gold-500 font-bold' : 'text-luxury-neutral'
              }`}
            >
              <User className="w-4 h-4 text-gold-400" />
              <span>{isLoggedIn ? `VIP Club (${memberPoints}p)` : 'VIP Loyalty Club'}</span>
            </button>

            <button
              id="mobile-gifts-link"
              onClick={() => handleNavClick('gift-cards')}
              className={`flex items-center space-x-2 py-2 text-xs uppercase tracking-[0.2em] font-semibold text-center cursor-pointer ${
                currentPage === 'gift-cards' ? 'text-gold-500 font-bold' : 'text-luxury-neutral'
              }`}
            >
              <Gift className="w-4 h-4 text-gold-400" />
              <span>Gift Cards</span>
            </button>

            <button
              id="mobile-action-reserve"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center bg-luxury-neutral text-white py-3.5 text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer hover:bg-gold-400 hover:text-luxury-neutral transition-colors"
            >
              Reserve Hair/Beauty Ritual
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
