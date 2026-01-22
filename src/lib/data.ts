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

export const BRAND_ASSETS = {
  logoPrimary: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/Screenshot-2026-01-22-at-10.03.57-PM-1769099641705.png?width=8000&height=8000&resize=contain",
  logoSquare: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/Screenshot-2026-01-22-at-10.03.57-PM-1769099641705.png?width=8000&height=8000&resize=contain",
  logoFooter: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/Screenshot-2026-01-22-at-10.03.48-PM-1769099632415.png?width=8000&height=8000&resize=contain",
  heroImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/ChatGPT-Image-Jan-22-2026-10_04_21-PM-1769099670050.png?width=8000&height=8000&resize=contain",
};

export const CONTACT_DATA = {
  phone: "+91 9873741552",
  whatsapp: "919873741552",
  email: "info@srindustries.co.in",
  address: "Plot No. 9, Gali No. 11, Saroorpur Industrial Area, Ballabhgarh, Faridabad, Haryana – 121004, India",
};

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
    subCategories: ['Prestige', 'GTM', 'Slim', 'Regular', 'Round / Round S', 'Engraving', 'China Series'],
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
    id: 'k-royal-01',
    slug: 'royal-series-01',
    name: 'Royal Series Knob',
    modelNumber: 'SR-K-ROYAL-01',
    category: 'knobs',
    subCategory: 'Royal Series',
    description: 'Premium quality control knob with ergonomic grip and high-gloss finish.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    specs: {
      shaftSize: '6.0 mm / 8.0 mm',
      diameter: '42 mm',
      weight: '14.5g',
      material: 'ABS / Nylon',
    },
    colors: ['#000000', '#C0C0C0', '#FF0000', '#FFFFFF'],
  },
  {
    id: 'k-hob-01',
    slug: 'hob-series-01',
    name: 'Hob Series Knob',
    modelNumber: 'SR-K-HOB-01',
    category: 'knobs',
    subCategory: 'Hob Series',
    description: 'Modern minimalist design specifically for built-in gas hobs.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    specs: {
      shaftSize: '8.0 mm',
      diameter: '38 mm',
      weight: '16.2g',
      material: 'Nylon (Heat Resistant)',
    },
    colors: ['#000000', '#333333', '#1A1A1A'],
  },
  {
    id: 'k-sleek-01',
    slug: 'sleek-series-01',
    name: 'Sleek Series Knob',
    modelNumber: 'SR-K-SLEEK-01',
    category: 'knobs',
    subCategory: 'Sleek Series',
    description: 'Thin profile knob for contemporary stove designs.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    specs: {
      shaftSize: '6.0 mm',
      diameter: '35 mm',
      weight: '11.8g',
      material: 'ABS',
    },
    colors: ['#000000', '#E5E4E2'],
  },
  {
    id: 'k-euro-01',
    slug: 'euro-series-01',
    name: 'Euro Series Knob',
    modelNumber: 'SR-K-EURO-01',
    category: 'knobs',
    subCategory: 'Euro Series',
    description: 'European style control knob with textured grip.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    specs: {
      shaftSize: '6.0 mm',
      diameter: '40 mm',
      weight: '13.5g',
      material: 'ABS',
    },
    colors: ['#000000', '#808080'],
  },
  {
    id: 'k-vguard-01',
    slug: 'vguard-series-01',
    name: 'V-Guard Series Knob',
    modelNumber: 'SR-K-VG-01',
    category: 'knobs',
    subCategory: 'V-Guard Series',
    description: 'Reinforced design for industrial and heavy-duty domestic use.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    specs: {
      shaftSize: '8.0 mm',
      diameter: '45 mm',
      weight: '17.8g',
      material: 'Nylon',
    },
    colors: ['#000000', '#FF0000'],
  },
  {
    id: 'k-metal-01',
    slug: 'metal-series-01',
    name: 'Metal Series Knob',
    modelNumber: 'SR-K-METAL-01',
    category: 'knobs',
    subCategory: 'Metal Series',
    description: 'Premium zinc-alloy knob for high-end designer hobs.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    specs: {
      shaftSize: '8.0 mm',
      diameter: '40 mm',
      weight: '48.0g',
      material: 'Zinc Alloy / Metal',
    },
    colors: ['#C0C0C0', '#848482', '#FFD700'],
  },

  // --- DIAL PLATES ---
  {
    id: 'dp-prestige-01',
    slug: 'prestige-dial-plate',
    name: 'Prestige Dial Plate',
    modelNumber: 'SR-DP-PST-01',
    category: 'dial-plates',
    subCategory: 'Prestige',
    description: 'Classic dial plate design with clear silk-screen printing.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      diameter: '65 mm',
      material: 'Aluminum / Stainless Steel',
    },
  },
  {
    id: 'dp-gtm-01',
    slug: 'gtm-dial-plate',
    name: 'GTM Dial Plate',
    modelNumber: 'SR-DP-GTM-01',
    category: 'dial-plates',
    subCategory: 'GTM',
    description: 'Heavy-duty GTM series dial plate for commercial stoves.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      diameter: '70 mm',
      material: 'Mild Steel (Powder Coated)',
    },
  },

  // --- LEGS ---
  {
    id: 'leg-ls15-01',
    slug: 'leg-ls-15',
    name: 'Stove Leg LS-15',
    modelNumber: 'SR-LEG-LS-15',
    category: 'legs',
    subCategory: 'LS-15',
    description: '15mm height standard leg with anti-skid base.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      height: '15 mm',
      material: 'Nylon / Rubber',
    },
  },
  {
    id: 'leg-ls25-01',
    slug: 'leg-ls-25',
    name: 'Stove Leg LS-25',
    modelNumber: 'SR-LEG-LS-25',
    category: 'legs',
    subCategory: 'LS-25',
    description: '25mm height leg designed for improved air-flow under the stove.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      height: '25 mm',
      material: 'Nylon',
    },
  },

  // --- COUPLER & PINS ---
  {
    id: 'cp-coupler-01',
    slug: 'standard-coupler',
    name: 'Standard Coupler',
    modelNumber: 'SR-CP-CPL-01',
    category: 'coupler-pins',
    subCategory: 'Coupler',
    description: 'Precision machined coupler for secure gas pipe connections.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      material: 'Brass',
    },
  },
  {
    id: 'cp-pin-01',
    slug: 'burner-pin-standard',
    name: 'Burner Pin',
    modelNumber: 'SR-CP-BP-01',
    category: 'coupler-pins',
    subCategory: 'Burner Pin',
    description: 'Standard burner pin for domestic LPG stoves.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      material: 'Stainless Steel',
    },
  },

  // --- AUTO & SAFETY ---
  {
    id: 'as-cellbox-01',
    slug: 'cell-box-hob',
    name: 'Cell Box (Hob)',
    modelNumber: 'SR-AS-CB-01',
    category: 'auto-safety',
    subCategory: 'Cell Box',
    description: 'Protective cell box housing for hob ignition batteries.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      material: 'Flame Retardant Plastic',
    },
  },
  {
    id: 'as-lock-01',
    slug: 'safety-lock-30-deg',
    name: 'Safety Lock (30°)',
    modelNumber: 'SR-AS-SL-30',
    category: 'auto-safety',
    subCategory: 'Safety Lock',
    description: '30-degree safety locking mechanism for precision control.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    specs: {
      type: '30 Degree Lock',
      material: 'Nylon',
    },
  },
];
