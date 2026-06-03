/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, Heart, Check, Filter } from 'lucide-react';

interface BoutiquePanelProps {
  onAddProductToCart: (product: Product, size?: string) => void;
  onOpenCart: () => void;
}

export default function BoutiquePanel({ onAddProductToCart, onOpenCart }: BoutiquePanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductSizes, setSelectedProductSizes] = useState<{ [productId: string]: string }>({});
  const [favorites, setFavorites] = useState<{ [productId: string]: boolean }>({});
  const [successAddMessage, setSuccessAddMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'clothing', label: 'Capsule Clothing' },
    { id: 'accessories', label: 'Fine Accessories' },
    { id: 'beauty-care', label: 'Sovereign Skincare' },
    { id: 'perfume', label: 'Rare Scent Elixirs' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedProductSizes({
      ...selectedProductSizes,
      [productId]: size
    });
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites({
      ...favorites,
      [productId]: !favorites[productId]
    });
  };

  const handleAddClick = (product: Product) => {
    const size = selectedProductSizes[product.id] || (product.sizes ? product.sizes[0] : undefined);
    onAddProductToCart(product, size);
    
    setSuccessAddMessage(`Successfully added "${product.name}" to Bag!`);
    setTimeout(() => {
      setSuccessAddMessage(null);
    }, 4000);
  };

  return (
    <div id="mari-curated-boutique" className="py-20 lg:py-28 bg-luxury-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Boutique Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] md:text-xs text-[#D4AF37] font-bold tracking-[0.3em] uppercase block mb-3">
            Hand-Selected Wardrobe & Essentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-luxury-neutral leading-tight mb-6">
            The Capsule <br />
            <span className="not-italic font-normal text-gold-500 uppercase tracking-widest text-2xl md:text-3xl">Boutique</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto my-6" />
          <p className="text-sm text-luxury-neutral/80 font-light max-w-2xl mx-auto leading-relaxed">
            Curated and tailored garments, bespoke pearl sets, and cellular vanity oils designed in Paris and crafted for the timeless woman of elegance.
          </p>
        </div>

        {/* Dynamic Success Notification */}
        {successAddMessage && (
          <div className="fixed bottom-24 left-6 z-50 bg-[#1C1C1C] text-luxury-ivory border-l-2 border-[#D4AF37] p-4 shadow-2xl max-w-sm flex items-center space-x-3 transition-all duration-300 transform scale-100 rounded-none">
            <div className="bg-[#D4AF37]/20 p-1.5">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37] animate-bounce" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gold-300">Added to Wardrobe</p>
              <p className="text-[11px] text-gray-300 font-light mt-0.5">{successAddMessage}</p>
            </div>
            <button
              onClick={onOpenCart}
              className="text-[10px] text-gold-400 font-bold uppercase hover:underline pl-3 tracking-widest"
            >
              View Box
            </button>
          </div>
        )}

        {/* Category filters bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16">
          {categories.map((c) => (
            <button
              key={c.id}
              id={`boutique-category-${c.id}`}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-5 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 font-bold cursor-pointer rounded-none ${
                selectedCategory === c.id
                  ? 'bg-luxury-neutral text-white border-l-2 border-[#D4AF37] shadow-sm'
                  : 'bg-white text-luxury-neutral hover:text-gold-500 hover:bg-[#F8F5F0] border border-[#D4AF37]/30'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Products Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const hasSizes = product.sizes && product.sizes.length > 0;
            const currentSize = selectedProductSizes[product.id] || (hasSizes ? product.sizes![0] : undefined);
            const isFav = !!favorites[product.id];

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white border border-[#D4AF37]/30 flex flex-col h-full group transition-all duration-500 overflow-hidden hover:shadow-lg rounded-none"
              >
                {/* Image display with tags */}
                <div className="relative h-96 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Luxury tags overlays */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-1.5 z-10">
                    {product.isNewArrival && (
                      <span className="bg-[#D4AF37] text-luxury-neutral text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                        New Arrival
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="bg-[#1C1C1C] text-gold-400 text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 border border-[#D4AF37]/30">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Favorite button overlay */}
                  <button
                    onClick={() => handleToggleFavorite(product.id)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-none shadow-sm text-luxury-neutral hover:text-red-500 transition-colors z-10 cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-transparent to-transparent h-20" />
                </div>

                {/* Info Container */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] tracking-[0.25em] text-gold-500 uppercase font-bold">
                      {product.category.replace('-', ' ')}
                    </span>
                    
                    {/* Star review ratings */}
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      <span className="text-[11px] text-luxury-neutral font-semibold">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-base font-serif italic text-luxury-neutral mb-3 group-hover:text-gold-500 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-luxury-neutral/80 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                    {product.description}
                  </p>

                  {/* Size selectors for apparel */}
                  {hasSizes && (
                    <div className="mb-6">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-neutral/60 font-bold block mb-2">
                        Select Sizing:
                      </span>
                      <div className="flex space-x-2">
                        {product.sizes!.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSelectSize(product.id, size)}
                            className={`w-9 h-9 text-[11px] tracking-wider uppercase font-bold border transition-all cursor-pointer rounded-none ${
                              currentSize === size
                                ? 'bg-luxury-neutral text-white border-luxury-neutral'
                                : 'bg-transparent text-luxury-neutral border-gray-300 hover:border-gold-500'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Add to Bag container */}
                  <div className="flex items-center justify-between border-t border-[#D4AF37]/15 pt-6 mt-auto">
                    <span className="text-xl font-serif italic text-luxury-neutral font-semibold">
                      ${product.price}
                    </span>
                    <button
                      id={`add-product-cart-${product.id}`}
                      onClick={() => handleAddClick(product)}
                      className="bg-luxury-neutral hover:bg-[#D4AF37] hover:text-white text-white px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 flex items-center space-x-2 cursor-pointer rounded-none shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Wardrobe</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Lifestyle Banner */}
        <div className="mt-24 border border-[#D4AF37]/30 relative overflow-hidden bg-[#1C1C1C] text-luxury-ivory p-8 sm:p-16">
          <div className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.13]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200')` }} />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-bold block">The Atelier Standard</span>
            <h3 className="text-2xl sm:text-4xl font-serif italic leading-tight text-white">Private Wardrobe Fitting Sessions</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
              Our showroom offers private fitting services with deep champagne catering. Choose capsule items of bespoke silk and cashmere matching your upcoming blow-couture appointment. Reserve in advance via pre-consultation notes.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('header-booking-button');
                  if (el) el.click();
                }}
                className="bg-white text-luxury-neutral px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer hover:bg-[#D4AF37] hover:text-white transition-all rounded-none"
              >
                Book with Fitting Request
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
