/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  category: 'hair-styling' | 'hair-coloring' | 'makeup' | 'bridal' | 'skincare' | 'nails' | 'spa';
  description: string;
  benefits: string[];
  price: number;
  duration: string; // e.g. "60 mins"
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'clothing' | 'accessories' | 'beauty-care' | 'perfume';
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  notes?: string;
  status: 'confirmed' | 'pending';
  totalPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
  tag?: string;
}

export interface BeforeAfterImage {
  id: string;
  category: string;
  before: string;
  after: string;
  title: string;
  description: string;
}

export interface GiftCardPurchase {
  id: string;
  cardDesign: 'champagne' | 'noir' | 'blush';
  amount: number;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  personalMessage: string;
  code: string;
  purchaseDate: string;
}

export interface LoyaltyMember {
  email: string;
  name: string;
  tier: 'Ivory' | 'Gold' | 'Champagne VIP';
  points: number;
  joinedDate: string;
}
