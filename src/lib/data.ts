export interface Product {
  id: string;
  slug: string;
  name: string;
  modelNumber: string;
  category: 'knobs' | 'dial-plates' | 'legs' | 'coupler-pins' | 'auto-safety';
  subCategory?: string; // For Knobs: Royal, Hob, Sleek, etc. For Dial Plates: Prestige, GTM, etc.
  description: string;
  image: string;
  specs: {
    shaftSize?: string;
    diameter?: string;
    weight?: string;
    material?: string;
    height?: string;
    [key: string]: string | undefined;
  };
  colors?: string[]; // Visual dots
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'knobs',
    name: 'Knobs',
    slug: 'knobs',
    subCategories: [
      'Royal Series',
      'Hob Series',
      'Sleek Series',
      'Euro Series',
      'V-Guard Series',
      'Metal Series',
      'Ultra Series',
      'Metal Prima Series',
    ],
  },
  {
    id: 'dial-plates',
    name: 'Dial Plates',
    slug: 'dial-plates',
    subCategories: ['Prestige', 'GTM', 'Slim', 'Regular', 'Round', 'Round S', 'Engraving', 'China Series'],
  },
  {
    id: 'legs',
    name: 'Legs',
    slug: 'legs',
    subCategories: ['LS-15', 'LS-20', 'LS-25', 'LS-40', 'Round'],
  },
  {
    id: 'coupler-pins',
    name: 'Coupler & Pins',
    slug: 'coupler-pins',
    subCategories: ['Coupler', 'Coupler Big', 'Burner Pin', 'Nozzle Ring'],
  },
  {
    id: 'auto-safety',
    name: 'Auto / Safety Components',
    slug: 'auto-safety',
    subCategories: ['Cell Box', 'Safety Lock', 'Spindle Cap', 'Nozzle Cap'],
  },
];

export const PRODUCTS: Product[] = [
  // --- KNOBS ---
  {
    id: 'k1',
    slug: 'royal-series-knob-r1',
    name: 'Royal Series Knob',
    modelNumber: 'SR-K-ROYAL-01',
    category: 'knobs',
    subCategory: 'Royal Series',
    description: 'Premium finish knob from our Royal Series, designed for high-end LPG stoves.',
    image: '/images/products/knobs/royal-01.jpg',
    specs: {
      shaftSize: '6mm / 8mm',
      diameter: '42mm',
      weight: '15g',
      material: 'ABS',
    },
    colors: ['#000000', '#C0C0C0', '#FF0000'],
  },
  {
    id: 'k2',
    slug: 'hob-series-knob-h1',
    name: 'Hob Series Knob',
    modelNumber: 'SR-K-HOB-01',
    category: 'knobs',
    subCategory: 'Hob Series',
    description: 'Specialized knob designed for built-in hobs with precise control.',
    image: '/images/products/knobs/hob-01.jpg',
    specs: {
      shaftSize: '8mm',
      diameter: '38mm',
      weight: '18g',
      material: 'Nylon',
    },
    colors: ['#000000', '#333333'],
  },
  {
    id: 'k3',
    slug: 'sleek-series-knob-s1',
    name: 'Sleek Series Knob',
    modelNumber: 'SR-K-SLEEK-01',
    category: 'knobs',
    subCategory: 'Sleek Series',
    description: 'Modern, slim design knob for contemporary stove models.',
    image: '/images/products/knobs/sleek-01.jpg',
    specs: {
      shaftSize: '6mm',
      diameter: '35mm',
      weight: '12g',
      material: 'ABS',
    },
    colors: ['#000000', '#E5E4E2'],
  },
  {
    id: 'k4',
    slug: 'metal-series-knob-m1',
    name: 'Metal Series Knob',
    modelNumber: 'SR-K-METAL-01',
    category: 'knobs',
    subCategory: 'Metal Series',
    description: 'Heavy-duty metal knob for maximum durability and premium feel.',
    image: '/images/products/knobs/metal-01.jpg',
    specs: {
      shaftSize: '8mm',
      diameter: '40mm',
      weight: '45g',
      material: 'Zinc Alloy',
    },
    colors: ['#C0C0C0', '#FFD700'],
  },

  // --- DIAL PLATES ---
  {
    id: 'd1',
    slug: 'prestige-dial-plate',
    name: 'Prestige Dial Plate',
    modelNumber: 'SR-DP-PRESTIGE',
    category: 'dial-plates',
    subCategory: 'Prestige',
    description: 'High-quality dial plate with clear markings for LPG stoves.',
    image: '/images/products/dial-plates/prestige.jpg',
    specs: {
      diameter: '60mm',
      material: 'Aluminum',
    },
  },
  {
    id: 'd2',
    slug: 'gtm-dial-plate',
    name: 'GTM Dial Plate',
    modelNumber: 'SR-DP-GTM',
    category: 'dial-plates',
    subCategory: 'GTM',
    description: 'Durable GTM series dial plate with precise engraving.',
    image: '/images/products/dial-plates/gtm.jpg',
    specs: {
      diameter: '55mm',
      material: 'Steel',
    },
  },

  // --- LEGS ---
  {
    id: 'l1',
    slug: 'leg-ls-25',
    name: 'Stove Leg LS-25',
    modelNumber: 'SR-LEG-LS25',
    category: 'legs',
    subCategory: 'LS-25',
    description: 'Standard 25mm height stove leg for stable support.',
    image: '/images/products/legs/ls25.jpg',
    specs: {
      height: '25mm',
      material: 'Rubber / Polymer',
    },
  },
  {
    id: 'l2',
    slug: 'round-leg-large',
    name: 'Round Stove Leg',
    modelNumber: 'SR-LEG-ROUND-L',
    category: 'legs',
    subCategory: 'Round',
    description: 'Large round leg for heavy-duty domestic stoves.',
    image: '/images/products/legs/round.jpg',
    specs: {
      height: '30mm',
      diameter: '40mm',
      material: 'Heavy-duty Rubber',
    },
  },

  // --- COUPLER & PINS ---
  {
    id: 'cp1',
    slug: 'standard-coupler',
    name: 'Standard Coupler',
    modelNumber: 'SR-CP-STD',
    category: 'coupler-pins',
    subCategory: 'Coupler',
    description: 'Essential coupler component for gas flow regulation.',
    image: '/images/products/couplers/standard.jpg',
    specs: {
      material: 'Brass',
    },
  },
  {
    id: 'cp2',
    slug: 'burner-pin',
    name: 'Precision Burner Pin',
    modelNumber: 'SR-BP-01',
    category: 'coupler-pins',
    subCategory: 'Burner Pin',
    description: 'High-precision burner pin for consistent ignition.',
    image: '/images/products/pins/burner-pin.jpg',
    specs: {
      material: 'Stainless Steel',
    },
  },

  // --- AUTO & SAFETY ---
  {
    id: 'as1',
    slug: 'hob-cell-box',
    name: 'Hob Cell Box',
    modelNumber: 'SR-AS-CB-HOB',
    category: 'auto-safety',
    subCategory: 'Cell Box',
    description: 'Protective cell box for hob ignition systems.',
    image: '/images/products/auto/cell-box.jpg',
    specs: {
      material: 'FR Grade Plastic',
    },
  },
  {
    id: 'as2',
    slug: 'safety-lock-30',
    name: 'Safety Lock (30°)',
    modelNumber: 'SR-AS-SL30',
    category: 'auto-safety',
    subCategory: 'Safety Lock',
    description: '30 degree safety lock mechanism for gas stoves.',
    image: '/images/products/auto/safety-lock.jpg',
    specs: {
      type: '30 Degree',
    },
  },
];
