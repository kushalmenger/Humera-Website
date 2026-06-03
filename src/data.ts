/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Product, Testimonial, BeforeAfterImage } from './types';

export const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920',
    title: 'Mari Boutique Salon',
    subtitle: 'Where Beauty Meets Elegance',
    description: 'An immersive sensory journey of bespoke beauty, tailored styling, and custom luxury apparel.'
  },
  {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1920',
    title: 'The Bridal Sanctuary',
    subtitle: 'Timeless Radiance for Your Day',
    description: 'Exquisite makeovers, detailed treatments, and holistic care for the modern, high-end bride.'
  },
  {
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1920',
    title: 'Curated Boutique Fashion',
    subtitle: 'Exquisite Curations for the Discerning',
    description: 'A hand-selected capsule collection featuring fine silk garments, rich leatherware, and rare perfumes.'
  }
];

export const SERVICES: Service[] = [
  // Hair Styling
  {
    id: 'hair-cut-signature',
    name: 'The Mari Signature Hair Sculpting & Styling',
    category: 'hair-styling',
    description: 'A transformative hair couture service featuring an in-depth facial architecture assessment, customized botanical wash, head massage, sculpting cut, and signature blow-wear finish.',
    benefits: ['Accentuates facial symmetry', 'Infuses natural movement and volume', 'Scalp detoxifying botanical wrap'],
    price: 150,
    duration: '75 mins',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hair-blow-couture',
    name: 'La Parisienne Blow-Couture Session',
    category: 'hair-styling',
    description: 'An elite blowout using organic shine elixirs, tailoring loose waves, glass-sleek straightness, or high-volume curves designed to endure for days.',
    benefits: ['Mirror-gloss satin finish', 'UV and humidity resistance', 'Lasting root elevation'],
    price: 85,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800'
  },
  // Hair Coloring
  {
    id: 'balayage-lux',
    name: 'Hand-Painted French Balayage & Melt',
    category: 'hair-coloring',
    description: 'Bespoke hand-painted highlights melting from dimensional shadow-roots into sparkling baby-lights. Done using silk-enriched bonding and custom clay softeners.',
    benefits: ['Seamless seamless root regrowth transition', 'Preserves hair structural integrity', 'Includes deep plex hydration treatment'],
    price: 320,
    duration: '180 mins',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'royal-gloss',
    name: 'Royal Caviar Gloss & Glaze infusion',
    category: 'hair-coloring',
    description: 'An ultra-nourishing color pigment glaze that neutralizes warmth, enriches dimensional depths, and deposits intensive caviar protein locks.',
    benefits: ['Restores moisture balance', 'Adds exquisite translucent pigments', 'Repairs cuticle wear'],
    price: 130,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  },
  // Makeup
  {
    id: 'editorial-makeup',
    name: 'Red-Carpet Editorial Makeup',
    category: 'makeup',
    description: 'A customized professional makeover utilizing premium luxury cosmetics. Features micro-precision highlight-contouring, customized mink-alternative lash design, and camera-ready airbrushing.',
    benefits: ['Ultra-longwear HD formula (16+ Hour lock)', 'Perfect photography finish under all light temps', 'Individually curated color selection'],
    price: 180,
    duration: '90 mins',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800'
  },
  // Skincare
  {
    id: 'facials-platinum',
    name: 'Platinum 24K Gold Cellular Lift Facial',
    category: 'skincare',
    description: 'The ultimate skin-renewing ritual utilizing custom enzymatic peeling, pure 24K gold foil sheets, microcurrent sculpting, and hyperbaric oxygen infusions to stimulate collagen.',
    benefits: ['Immediate visible firming & lifting effect', 'Deep dermo-cellular hydration', 'Softens fine mimic lines and fatigue'],
    price: 240,
    duration: '90 mins',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  // Nails
  {
    id: 'manicure-velvet',
    name: 'The Velvet Rose Russian Manicure & Gel-Art',
    category: 'nails',
    description: 'An impeccably precise mechanical cuticle care ritual, structured gel strengthening layer overlay, and bespoke hand-painted minimalist art using premium organic salon polishes.',
    benefits: ['Flawless close-to-cuticle color coat', 'Reinforces compromised nail plates', 'Therapeutic hot-cream rose oil massage'],
    price: 95,
    duration: '75 mins',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800'
  },
  // Spa
  {
    id: 'spa-rituals',
    name: 'Lush Lavender & Himalayan Hot Stone Release',
    category: 'spa',
    description: 'Immersive tension-release body massage utilizing warm volcanic basalt stones, luxury house-blended French lavender oil, dry-body brushing, and sound therapy.',
    benefits: ['Restores myofascial elastic ease', 'Promotes deep parasympathetic tranquility', 'Polishes and detoxifies base epidermic cell layer'],
    price: 210,
    duration: '90 mins',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
  },
  // Bridal (dedicated packages also expanded elsewhere, but we can list a core one)
  {
    id: 'bridal-gold',
    name: 'Mari Luminary Royal Bridal Makeover',
    category: 'bridal',
    description: 'Bespoke high-end bridal beauty service. Includes premium trial makeup setup, wedding day airbrush artistry, customized deluxe hair couture styling, and elite body-glow finishes.',
    benefits: ['Personal bridal suite access with champagne service', 'On-site beauty concierge touch-ups', 'Custom mini bridal vanity kit'],
    price: 550,
    duration: '180 mins',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
  }
];

export const BRIDAL_PACKAGES = [
  {
    id: 'bridal-pack-ivory',
    name: 'The Ivory Petal Bridal Package',
    description: 'A classic, highly polished bridal upgrade ensuring effortless sophistication and grace on your wedding day.',
    price: 450,
    services: [
      'Bespoke HD Wedding Day Makeup Artistry',
      'Couture Wedding Day Hair Design',
      'Classic French Russian Gel Manicure',
      'Hydra-Glow Prep Facial (3 days prior)',
      'Luxury Trial Session (In-salon, 60 mins)'
    ],
    duration: 'Completed across 2 days'
  },
  {
    id: 'bridal-pack-champagne',
    name: 'The Champagne Sovereign Royal Collection',
    description: 'The ultimate royal beauty preparation, promising elite-tier, complete, glowing transformations with dedicated premium service.',
    price: 850,
    isPopular: true,
    services: [
      'Pre-wedding Ultimate Trial Makeup & Hair Blueprint Session',
      'Wedding Day Gold Airbrush HD Makeup & Luxe Body Shimmer',
      'Royal Sculpture Hair Styling with customized veil/headpiece placement',
      '24K Pure Gold Infusion Facial & Diamond Peel',
      'Full Signature Russian Manicure & Pedicure Ritual',
      'Dedicated on-site bridal specialist concierge (2 hours of touch-ups)',
      'Complimentary champagne and gourmet treat basket for the bridal suite'
    ],
    duration: 'Completed across 3 days'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'boutique-silk-dress',
    name: 'Satin Silk Backless Evening Gown',
    category: 'clothing',
    description: 'Woven with ultra-fine, heavy mulberry silk, this dress exhibits an elegant cowl-neck drape, a low scoop-back, and fluid, floating movement perfect for elite soirées.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 38,
    isFeatured: true,
    isNewArrival: true,
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'boutique-cashmere-coat',
    name: 'The Mari Sovereign Cashmere Trench',
    category: 'clothing',
    description: 'Impeccably tailored from premium virgin Italian wool and pure cashmere, featuring double-breasted closure, detailed hand-stitched lapels, and a soft self-tie belt.',
    price: 680,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviewsCount: 19,
    isFeatured: true,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'boutique-amber-perfume',
    name: 'Nuit d’Or Imperial Parfum',
    category: 'perfume',
    description: 'An luxurious, deep olfactory journey. Notes of exquisite Turkish rose, dark oud wood, warm amber crystals, and hints of velvet Madagascan vanilla.',
    price: 185,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 52,
    isNewArrival: true
  },
  {
    id: 'boutique-pearl-earrings',
    name: 'Baroque Pearl Droplets in 18K Gold',
    category: 'accessories',
    description: 'Individually selected high-luster natural South Sea baroque pearls, suspended elegantly from delicate, polished 18K solid gold textured hoops.',
    price: 310,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 27,
    isFeatured: true
  },
  {
    id: 'boutique-leather-clutch',
    name: 'Monceau Quilted Calfskin Clutch',
    category: 'accessories',
    description: 'Handcrafted in Florence from soft, premium quilted full-grain calfskin. Complete with a tuck-away brushed gold serpent-chain strap and luxury interior compartments.',
    price: 490,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 14,
    sizes: ['One Size']
  },
  {
    id: 'boutique-gold-serum',
    name: 'Mari Elixir d’Or Squalane Gold Oil',
    category: 'beauty-care',
    description: 'Rich, dry squalane oil base containing real 24K gold nano-particles, jasmine blossom infusion, and absolute vitamin E lipids to restore timeless facial radiance.',
    price: 115,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 84,
    isNewArrival: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Charlotte Vance',
    role: 'Bespoke Haute Client',
    text: 'Mari is not just a salon; it is a peaceful, luxury sanctuary. The Signature Hair Sculpting gave my thin hair gorgeous shape and motion. Their hand-selected boutique fashion has become my entire wardrobe backbone.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150',
    tag: 'Signature Cut & Boutique'
  },
  {
    id: 't2',
    name: 'Genevieve Du-Pont',
    role: 'Sovereign Bride',
    text: 'My bridal experience was pure heaven. The Champagne sovereign bridal pack delivered perfect radiance and skin preparation. The micro-precision airbrush lasted perfectly until past sunrise. Worth every single penny.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    tag: 'Champagne Bridal Package'
  },
  {
    id: 't3',
    name: 'Isabella Moretti',
    role: 'Fashion Designer & Beauty Enthusiast',
    text: 'The French Balayage results are stunningly beautiful. My hair actually felt healthier and stronger AFTER coloring because of their luxurious caviar treatments. Customer service here is truly top-tier elite.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    tag: 'Luxury Balayage'
  }
];

export const BEFORE_AFTERS: BeforeAfterImage[] = [
  {
    id: 'ba1',
    category: 'Hair Coloring',
    before: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
    after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    title: 'Warm Brass to French Beige Balayage',
    description: 'Transitioned a high-maintenance warm correction into a seamless hand-painted champagne balayage.'
  },
  {
    id: 'ba2',
    category: 'Hair Styling',
    before: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600',
    after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
    title: 'Textured Shag Restructuring',
    description: 'Sculpture haircut custom tailored to structural chin line contours, finished with dynamic silk waves.'
  }
];

export const INSTAGRAM_POSTS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400', likes: '1.2k' },
  { id: 2, url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400', likes: '942' },
  { id: 3, url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400', likes: '2.1k' },
  { id: 4, url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400', likes: '830' },
  { id: 5, url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400', likes: '1.5k' },
  { id: 6, url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400', likes: '3.3k' }
];
