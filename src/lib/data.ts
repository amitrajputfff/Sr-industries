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
  colors?: string[]; // Deprecated - use colorVariants instead
  colorVariants?: {
    color: string;      // hex color code
    name: string;       // e.g., "Black", "Silver"
    image: string;      // URL to color-specific image
    modelNumber?: string; // e.g., "RS-GL" for Royal Series Gold
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: string[];
}

export const BRAND_ASSETS = {
  logoPrimary: "/logo.png",
  logoSquare: "/logo.png",
  logoFooter: "/logo.png",
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
    subCategories: [
      'Prestige',
      'GTM',
      'Regular',
      'Slim',
      'China Series',
      'Round',
      'Round S',
      'Engraving',
    ],
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
    modelNumber: 'RS',
    category: 'knobs',
    subCategory: 'Royal Series',
    description: 'Premium quality control knob available in Nylon & ABS materials with ergonomic grip and high-gloss finish.',
    image: '/Royal-series/royal-series-gold.png',
    specs: {
      shaftSize: '8 mm',
      diameter: 'Ø 38 mm',
      material: 'Nylon / ABS',
    },
    colorVariants: [
      {
        color: '#FFD700',
        name: 'Gold',
        image: '/Royal-series/royal-series-gold.png',
        modelNumber: 'RS-GL',
      },
      {
        color: '#808080',
        name: 'Grey',
        image: '/Royal-series/royal-series-grey.png',
        modelNumber: 'RS-GR',
      },
      {
        color: '#FF6600',
        name: 'Orange',
        image: '/Royal-series/royal-series-orange.png',
        modelNumber: 'RS-OR',
      },
      {
        color: '#FF0000',
        name: 'Red',
        image: '/Royal-series/royal-series-red.png',
        modelNumber: 'RS-R',
      },
      {
        color: '#87CEEB',
        name: 'Light Blue',
        image: '/Royal-series/royal-series-lightblue.png',
        modelNumber: 'RS-LB',
      },
      {
        color: '#00008B',
        name: 'Dark Blue',
        image: '/Royal-series/royal-series-darkblue.png',
        modelNumber: 'RS-DB',
      },
    ],
  },
  {
    id: 'k-hob-01',
    slug: 'hob-series-01',
    name: 'Hob Series Knob',
    modelNumber: 'HB',
    category: 'knobs',
    subCategory: 'Hob Series',
    description: 'Modern minimalist design specifically for built-in gas hobs. Available in ABS material (Shaft Size 6 mm, Weight 10 gm).',
    image: '/Hob-Series/HobSeries-Copper.png',
    specs: {
      shaftSize: '6 mm',
      weight: '10 gm',
      material: 'ABS',
    },
    colorVariants: [
      {
        color: '#B87333',
        name: 'Copper',
        image: '/Hob-Series/HobSeries-Copper.png',
        modelNumber: 'HB-CP',
      },
      {
        color: '#C0C0C0',
        name: 'Silver',
        image: '/Hob-Series/HobSeries-Silver.png',
        modelNumber: 'HB-SL',
      },
      {
        color: '#FFD700',
        name: 'Golden',
        image: '/Hob-Series/HobSeries-Golden.png',
        modelNumber: 'HB-GL',
      },
      {
        color: '#808080',
        name: 'Grey',
        image: '/Hob-Series/HobSeries-Grey.png',
        modelNumber: 'HB-GR',
      },
      {
        color: '#D2B48C',
        name: 'Natural',
        image: '/Hob-Series/HobSeries-Natural.png',
        modelNumber: 'HB-NT',
      },
    ],
  },
  {
    id: 'k-sleek-01',
    slug: 'sleek-series-01',
    name: 'Sleek Series Knob',
    modelNumber: 'SR-K-SLEEK-01',
    category: 'knobs',
    subCategory: 'Sleek Series',
    description: 'Thin profile knob for contemporary stove designs. Available in ABS material (Shaft Size 8 mm, Dimensions 34 mm x 18 mm).',
    image: '/Sleek-Series/Sleekseries-Black.png',
    specs: {
      shaftSize: '8 mm',
      dimensions: '34 mm x 18 mm',
      material: 'ABS',
    },
    colorVariants: [
      {
        color: '#000000',
        name: 'Black',
        image: '/Sleek-Series/Sleekseries-Black.png',
      },
      {
        color: '#B87333',
        name: 'Copper',
        image: '/Sleek-Series/Sleekseries-Copper.png',
      },
      {
        color: '#FFC0CB',
        name: 'Pink',
        image: '/Sleek-Series/Sleekseries-Pink.png',
      },
      {
        color: '#F5F5F5',
        name: 'Painted',
        image: '/Sleek-Series/Sleekseries-Painted.png',
      },
      {
        color: '#FFFFE0',
        name: 'Sticker',
        image: '/Sleek-Series/Sleekseries-Sticker.png',
      },
    ],
  },
  {
    id: 'k-euro-01',
    slug: 'euro-series-01',
    name: 'Euro Series Knob',
    modelNumber: 'EURO',
    category: 'knobs',
    subCategory: 'Euro Series',
    description: 'European style control knob with multiple premium top and ring combinations. Available in Nylon & ABS.',
    image: '/Euro-series/WhiteTop-Black.png',
    specs: {
      shaftSize: '6.0 mm',
      diameter: '40 mm',
      weight: '13.5g',
      material: 'ABS',
    },
    colorVariants: [
      {
        color: '#FFFFFF',
        name: 'White Top / Black Ring',
        image: '/Euro-series/WhiteTop-Black.png',
      },
      {
        color: '#FFD700',
        name: 'White Top / Gold Ring',
        image: '/Euro-series/WhiteTop-Gold.png',
      },
      {
        color: '#B0B0B0',
        name: 'White Top / Grey Ring',
        image: '/Euro-series/WhiteTop-Gray.png',
      },
      {
        color: '#000000',
        name: 'Black Top / Gold Ring',
        image: '/Euro-series/BlackTop-Gold.png',
      },
      {
        color: '#4F4F4F',
        name: 'Black Top / Grey Ring',
        image: '/Euro-series/BlackTop-Gray.png',
      },
      {
        color: '#C0C0C0',
        name: 'Silver Series / Black Pointer',
        image: '/Euro-series/SilverSeries-Black.png',
      },
      {
        color: '#FF0000',
        name: 'Silver Series / Red Pointer',
        image: '/Euro-series/SilverSeries-Red.png',
      },
      {
        color: '#FFFFFF',
        name: 'Silver Series / White Pointer',
        image: '/Euro-series/SilverSeries-White.png',
      },
      {
        color: '#B87333',
        name: 'Black Copper Series',
        image: '/Euro-series/CopperSeries-Black.png',
      },
    ],
  },
  {
    id: 'k-vguard-01',
    slug: 'vguard-series-01',
    name: 'V-Guard Series Knob',
    modelNumber: 'SR-K-VG-01',
    category: 'knobs',
    subCategory: 'V-Guard Series',
    description: 'Reinforced design for industrial and heavy-duty domestic use. Available in Nylon & ABS.',
    image: '/VGuard-Series/V-GuardSeries-Black.png',
    specs: {
      shaftSize: '8 mm',
      diameter: 'Ø 40 mm',
      material: 'Nylon / ABS',
    },
    colorVariants: [
      {
        color: '#000000',
        name: 'Black',
        image: '/VGuard-Series/V-GuardSeries-Black.png',
      },
      {
        color: '#C0C0C0',
        name: 'Silver',
        image: '/VGuard-Series/V-GuardSeries-Silver.png',
      },
      {
        color: '#FFD700',
        name: 'Golden',
        image: '/VGuard-Series/V-GuardSeries-Golden.png',
      },
    ],
  },
  {
    id: 'k-metal-01',
    slug: 'metal-series-01',
    name: 'Metal Series Knob - Normal',
    modelNumber: 'METAL-N',
    category: 'knobs',
    subCategory: 'Metal Series',
    description: 'Premium zinc-alloy knob (Normal model) for high-end designer hobs.',
    image: '/Metal-Series/MetalSeries-Model-1-Black.png',
    specs: {
      shaftSize: '8 mm',
      diameter: '40 mm',
      weight: '30 gm',
      material: 'Zinc Alloy / Metal',
    },
    colorVariants: [
      {
        color: '#C0C0C0',
        name: 'Silver',
        image: '/Metal-Series/MetalSeries-Model-1-Silver.png',
      },
      {
        color: '#000000',
        name: 'Black',
        image: '/Metal-Series/MetalSeries-Model-1-Black.png',
      },
      {
        color: '#FFD700',
        name: 'Copper',
        image: '/Metal-Series/MetalSeries-Model-1-Copper.png',
      },
    ],
  },

  {
    id: 'k-metal-02',
    slug: 'metal-series-sleek',
    name: 'Metal Series Knob - Sleek',
    modelNumber: 'METAL-S',
    category: 'knobs',
    subCategory: 'Metal Series',
    description: 'Sleek model zinc-alloy knob with refined profile for premium glass-top hobs.',
    image: '/Metal-Series/MetalSeries-Model-2-Black.png',
    specs: {
      shaftSize: '8 mm',
      diameter: '40 mm',
      weight: '35 gm',
      material: 'Zinc Alloy / Metal',
    },
    colorVariants: [
      {
        color: '#000000',
        name: 'Black',
        image: '/Metal-Series/MetalSeries-Model-2-Black.png',
      },
      {
        color: '#FFD700',
        name: 'Golden',
        image: '/Metal-Series/MetalSeries-Model-2-Golden.png',
      },
      {
        color: '#B87333',
        name: 'Copper',
        image: '/Metal-Series/MetalSeries-Model-2-Copper.png',
      },
    ],
  },

  {
    id: 'k-ultra-01',
    slug: 'ultra-series-01',
    name: 'Ultra Series Knob',
    modelNumber: 'ULTRA',
    category: 'knobs',
    subCategory: 'Ultra Series',
    description:
      'High-precision slim profile knob designed for compact glass-top hobs. Ultra Series is available in multiple models (1–5 & Golden) with shaft size 8 mm. Models 1, 2 & 4 use Ø 40 mm, Model 3 uses Ø 32 mm, and Models 5 & Golden are optimised at 35 gm weight.',
    image: '/Ultra-Series/UltaSeriesBlack-Model1.png',
    specs: {
      shaftSize: '8 mm',
      diameter: 'Ø 40 mm',
      weight: '35 gm',
      material: 'ABS',
    },
    colorVariants: [
      {
        color: '#000000',
        name: 'Model 1 (Black)',
        image: '/Ultra-Series/UltaSeriesBlack-Model1.png',
      },
      {
        color: '#111111',
        name: 'Model 2 (Black)',
        image: '/Ultra-Series/UltaSeriesBlack-Model2.png',
      },
      {
        color: '#222222',
        name: 'Model 3 (Black)',
        image: '/Ultra-Series/UltaSeriesBlack-Model3.png',
      },
      {
        color: '#000000',
        name: 'Model 4 (Black)',
        image: '/Ultra-Series/UltaSeriesBlack-Model4.png',
      },
      {
        color: '#000000',
        name: 'Model 5 (Black)',
        image: '/Ultra-Series/UltaSeriesBlack-Model5.png',
      },
      {
        color: '#FFD700',
        name: 'Golden Model',
        image: '/Ultra-Series/UltaSeriesGolden.png',
      },
    ],
  },

  {
    id: 'k-metal-prima-01',
    slug: 'metal-prima-series-01',
    name: 'Metal Prima Series Knob',
    modelNumber: 'PR-SS / PR-SL / PR-RD',
    category: 'knobs',
    subCategory: 'Metal Prima Series',
    description:
      'Metal Prima Series premium knobs in SS Matte, Silver, Golden and Black / Chrome variants. Models support shaft sizes 6 mm and 8 mm with weights from 38 gm to 55 gm for precise feel.',
    image: '/MetalPrima-Series/MetalPrimaSeries-SSMATTE.png',
    specs: {
      shaftSize: '6 mm / 8 mm',
      diameter: '40 mm',
      weight: '38–55 gm',
      material: 'Zinc Alloy / Metal',
    },
    colorVariants: [
      {
        color: '#C0C0C0',
        name: 'SS Matte (PR-SS MATTE)',
        image: '/MetalPrima-Series/MetalPrimaSeries-SSMATTE.png',
        modelNumber: 'PR-SS MATTE',
      },
      {
        color: '#808080',
        name: 'Silver (PR-SL)',
        image: '/MetalPrima-Series/MetalPrimaSeries-Silver.png',
        modelNumber: 'PR-SL',
      },
      {
        color: '#DAA520',
        name: 'Golden (PR-RD GL)',
        image: '/MetalPrima-Series/MetalPrimaSeries-Golden.png',
        modelNumber: 'PR-RD GL',
      },
      {
        color: '#000000',
        name: 'Black Model 1 (PR-RD BL)',
        image: '/MetalPrima-Series/MetalPrimaSeries-BlackModel1.png',
        modelNumber: 'PR-RD BL',
      },
      {
        color: '#C0C0C0',
        name: 'Chrome (PR-RD CH)',
        image: '/MetalPrima-Series/MetalPrimaSeries-Chrome.png',
        modelNumber: 'PR-RD CH',
      },
      {
        color: '#111111',
        name: 'Black Model 2 Glossy (PR-RD BL GLOSSY)',
        image: '/MetalPrima-Series/MetalPrimaSeries-BlackModel2.png',
        modelNumber: 'PR-RD BL GLOSSY',
      },
    ],
  },

  // --- DIAL PLATES ---
  {
    id: 'dp-prestige-01',
    slug: 'prestige-dial-plate',
    name: 'Prestige Dial Plate',
    modelNumber: 'DP-PRM',
    category: 'dial-plates',
    subCategory: 'Prestige',
    description: 'Prestige series rectangular dial plate with bold, easy-to-read markings. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-Presige.png',
    specs: {
      dimensions: '60 mm x 25 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-gtm-01',
    slug: 'gtm-dial-plate',
    name: 'GTM Dial Plate',
    modelNumber: 'DP-GT',
    category: 'dial-plates',
    subCategory: 'GTM',
    description: 'GTM series rectangular dial plate designed for heavy-duty stoves. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-GTM.png',
    specs: {
      dimensions: '60 mm x 40 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-regular-01',
    slug: 'regular-dial-plate',
    name: 'Regular Dial Plate',
    modelNumber: 'DP-RG',
    category: 'dial-plates',
    subCategory: 'Regular',
    description: 'Regular series dial plate with standard rectangular window for flame graphics. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-Regular.png',
    specs: {
      dimensions: '60 mm x 45 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-slim-01',
    slug: 'slim-dial-plate',
    name: 'Slim Dial Plate',
    modelNumber: 'DP-SL',
    category: 'dial-plates',
    subCategory: 'Slim',
    description: 'Slim series low-height dial plate suited for compact glass-top stoves. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-Slim.png',
    specs: {
      dimensions: '60 mm x 22 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-china-01',
    slug: 'china-dial-plate',
    name: 'China Series Dial Plate',
    modelNumber: 'DP-CH',
    category: 'dial-plates',
    subCategory: 'China Series',
    description: 'China series dial plate with extended rectangular profile for larger graphics. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-China.png',
    specs: {
      dimensions: '90 mm x 45 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-round-01',
    slug: 'round-dial-plate',
    name: 'Round Dial Plate',
    modelNumber: 'DP-RD',
    category: 'dial-plates',
    subCategory: 'Round',
    description: 'Round series dial plate with circular layout and clear indexing. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-Round.png',
    specs: {
      diameter: 'Ø 55 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-engraving-01',
    slug: 'engraving-dial-plate',
    name: 'Engraving Dial Plate (Slim EV)',
    modelNumber: 'DP-SL EV',
    category: 'dial-plates',
    subCategory: 'Engraving',
    description: 'Slim EV engraving series dial plate with deep engraved markings for long life. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-Engraving.png',
    specs: {
      dimensions: '60 mm x 22 mm',
      material: 'Nylon / ABS',
    },
  },
  {
    id: 'dp-round-s-01',
    slug: 'round-s-dial-plate',
    name: 'Round S Dial Plate',
    modelNumber: 'DP-RDS',
    category: 'dial-plates',
    subCategory: 'Round S',
    description: 'Round S compact dial plate with smaller circular form factor. Available in Nylon & ABS.',
    image: '/DialPlate-Series/DialPlateSeries-RoundS.png',
    specs: {
      diameter: 'Ø 45 mm',
      material: 'Nylon / ABS',
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
    description: '15mm height standard PVC leg with anti-skid base. Available in PP & ABS.',
    image: '/LegSeries/LegSeries-PVC-LS15.png',
    specs: {
      height: '15 mm',
      material: 'PP / ABS',
    },
  },
  {
    id: 'leg-ls25-01',
    slug: 'leg-ls-25',
    name: 'Stove Leg LS-25',
    modelNumber: 'SR-LEG-LS-25',
    category: 'legs',
    subCategory: 'LS-25',
    description: '25mm height PVC leg designed for improved air-flow under the stove. Available in PP & ABS.',
    image: '/LegSeries/LegSeries-PVC-LS25.png',
    specs: {
      height: '25 mm',
      material: 'PP / ABS',
    },
  },
  {
    id: 'leg-ls20-01',
    slug: 'leg-ls-20',
    name: 'Stove Leg LS-20',
    modelNumber: 'LS-20',
    category: 'legs',
    subCategory: 'LS-20',
    description: '20mm height PVC leg for standard cooktops. Available in PP & ABS.',
    image: '/LegSeries/LegSeries-PVC-LS20.png',
    specs: {
      height: '20 mm',
      material: 'PP / ABS',
    },
  },
  {
    id: 'leg-ls40-01',
    slug: 'leg-ls-40',
    name: 'Stove Leg LS-40',
    modelNumber: 'LS-40',
    category: 'legs',
    subCategory: 'LS-40',
    description: '40mm height PVC leg for increased clearance and air-flow. Available in PP & ABS.',
    image: '/LegSeries/LegSeries-PVC-LS40.png',
    specs: {
      height: '40 mm',
      material: 'PP / ABS',
    },
  },
  {
    id: 'leg-lsrd20-01',
    slug: 'leg-ls-rd20',
    name: 'Stove Leg Round 20',
    modelNumber: 'LS-RD20',
    category: 'legs',
    subCategory: 'Round',
    description: 'Round 20mm PVC leg for premium glass-top hobs. Available in PP & ABS.',
    image: '/LegSeries/LegSeries-PVC-lsrd20.png',
    specs: {
      height: '20 mm',
      material: 'PP / ABS',
    },
  },

  // --- COUPLER & PINS ---
  {
    id: 'cp-coupler-01',
    slug: 'standard-coupler',
    name: 'Coupler',
    modelNumber: 'SR-CP',
    category: 'coupler-pins',
    subCategory: 'Coupler',
    description: 'Standard brass coupler for secure gas inlet connections on LPG stoves.',
    image: '/CouplerPins/Coupler1-CPB.png',
    specs: {
      material: 'Brass',
    },
  },
  {
    id: 'cp-pin-01',
    slug: 'burner-pin-standard',
    name: 'Burner Pin',
    modelNumber: 'SR-BP',
    category: 'coupler-pins',
    subCategory: 'Burner Pin',
    description: 'Standard burner pin for domestic LPG stoves.',
    image: '/CouplerPins/BurnerPin.png',
    specs: {
      material: 'Stainless Steel',
    },
  },
  {
    id: 'cp-coupler-big-01',
    slug: 'coupler-big',
    name: 'Coupler Big',
    modelNumber: 'SR-CPB',
    category: 'coupler-pins',
    subCategory: 'Coupler Big',
    description: 'Heavy-duty big coupler for higher capacity LPG stoves and commercial burners.',
    image: '/CouplerPins/Coupler2.png',
    specs: {
      material: 'Brass',
    },
  },
  {
    id: 'cp-nozzle-ring-01',
    slug: 'nozzle-ring',
    name: 'Nozzle Ring',
    modelNumber: 'SR-NR',
    category: 'coupler-pins',
    subCategory: 'Nozzle Ring',
    description: 'Precision nozzle ring for controlled gas flow and stable flame profile.',
    image: '/CouplerPins/NozzleRing.png',
    specs: {
      material: 'Brass',
    },
  },

  // --- AUTO & SAFETY ---
  {
    id: 'as-cellbox-01',
    slug: 'cell-box-hob',
    name: 'Cell Box Hob',
    modelNumber: 'SR-HB',
    category: 'auto-safety',
    subCategory: 'Cell Box',
    description: 'Protective cell box housing for hob ignition batteries. Designed for safe and neat cable routing.',
    image: '/AutoSeries/Cellbox-Hob.png',
    specs: {
      material: 'Flame Retardant Plastic',
    },
  },
  {
    id: 'as-cellbox-02',
    slug: 'cell-box-stove',
    name: 'Cell Box Stove',
    modelNumber: 'SR-GS',
    category: 'auto-safety',
    subCategory: 'Cell Box',
    description: 'Battery cell box for gas stove ignition systems with secure mounting design.',
    image: '/AutoSeries/Cellbox-GasStove.png',
    specs: {
      material: 'Flame Retardant Plastic',
    },
  },
  {
    id: 'as-spindle-01',
    slug: 'spindle-cap',
    name: 'Spindle Cap',
    modelNumber: 'SR-SC',
    category: 'auto-safety',
    subCategory: 'Spindle Cap',
    description: 'Precision spindle cap for sealing and protecting valve spindles in LPG hobs and stoves.',
    image: '/AutoSeries/SplinderCap.png',
    specs: {
      material: 'Nylon',
    },
  },
  {
    id: 'as-nozzlecap-01',
    slug: 'nozzle-cap',
    name: 'Nozzle Cap',
    modelNumber: 'SR-NC',
    category: 'auto-safety',
    subCategory: 'Nozzle Cap',
    description: 'Nozzle cap for controlled gas outflow and protection of burner nozzles.',
    image: '/AutoSeries/NozzleCap.png',
    specs: {
      material: 'Nylon',
    },
  },
  {
    id: 'as-lock-01',
    slug: 'safety-lock-30-deg',
    name: 'Safety Lock 30 Degree',
    modelNumber: 'SR-SL30',
    category: 'auto-safety',
    subCategory: 'Safety Lock',
    description: '30-degree safety locking mechanism for precision control in gas flow operation.',
    image: '/AutoSeries/Safetylock-30degree.png',
    specs: {
      type: '30 Degree Lock',
      material: 'Nylon',
    },
  },
  {
    id: 'as-lock-02',
    slug: 'safety-lock-0-deg',
    name: 'Safety Lock 0 Degree',
    modelNumber: 'SR-SLO',
    category: 'auto-safety',
    subCategory: 'Safety Lock',
    description: '0-degree safety lock mechanism for direct open-close operations with positive locking.',
    image: '/AutoSeries/SafetyLock0degree.png',
    specs: {
      type: '0 Degree Lock',
      material: 'Nylon',
    },
  },
];
