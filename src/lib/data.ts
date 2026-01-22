export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  specifications: string[];
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Burners',
    slug: 'burners',
    image: '/images/categories/burners.jpg',
  },
  {
    id: '2',
    name: 'Knobs',
    slug: 'knobs',
    image: '/images/categories/knobs.jpg',
  },
  {
    id: '3',
    name: 'Mixing Tubes',
    slug: 'mixing-tubes',
    image: '/images/categories/mixing-tubes.jpg',
  },
  {
    id: '4',
    name: 'Pan Supports',
    slug: 'pan-supports',
    image: '/images/categories/pan-supports.jpg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'brass-burner-head-large',
    name: 'Large Brass Burner Head',
    category: 'burners',
    description: 'High-quality precision-engineered brass burner head designed for optimal gas flow and uniform flame distribution. Built to withstand high temperatures and ensure long-term durability.',
    specifications: [
      'Material: 100% Pure Brass',
      'Diameter: 100mm',
      'Weight: 450g',
      'Finish: Polished Brass',
      'Compatibility: Standard Domestic LPG Stoves'
    ],
    image: '/images/products/brass-burner-large.jpg',
  },
  {
    id: '2',
    slug: 'premium-metallic-knob',
    name: 'Premium Metallic Control Knob',
    category: 'knobs',
    description: 'Ergonomically designed control knob with a premium metallic finish. Provides smooth rotation and precise flame control for enhanced cooking experience.',
    specifications: [
      'Material: Zinc Alloy / High-Grade Polymer',
      'Finish: Brushed Chrome',
      'Shaft Diameter: 8mm',
      'Heat Resistance: Up to 150°C',
      'Grip Type: Textured Non-Slip'
    ],
    image: '/images/products/metallic-knob.jpg',
  },
  {
    id: '3',
    slug: 'aluminum-mixing-tube',
    name: 'Aluminum Alloy Mixing Tube',
    category: 'mixing-tubes',
    description: 'Precision-cast aluminum mixing tube designed for efficient air-gas mixing. Ensures a stable blue flame and prevents backfire issues.',
    specifications: [
      'Material: Cast Aluminum Alloy',
      'Length: 120mm',
      'Inlet Diameter: 12mm',
      'Coating: Anti-Corrosion Treatment',
      'Design: Venturi Style'
    ],
    image: '/images/products/mixing-tube.jpg',
  },
  {
    id: '4',
    slug: 'heavy-duty-pan-support',
    name: 'Heavy Duty Enameled Pan Support',
    category: 'pan-supports',
    description: 'Rugged pan support designed to handle heavy cookware with ease. Features a high-quality enamel coating for superior heat and corrosion resistance.',
    specifications: [
      'Material: Reinforced Mild Steel',
      'Coating: Vitreous Enamel',
      'Load Capacity: Up to 25kg',
      'Design: 4-Prong Universal',
      'Color: Matte Black'
    ],
    image: '/images/products/pan-support.jpg',
  },
  {
    id: '5',
    slug: 'brass-burner-head-small',
    name: 'Small Brass Burner Head',
    category: 'burners',
    description: 'Compact brass burner head perfect for auxiliary stove burners. Delivers consistent heat output and exceptional fuel efficiency.',
    specifications: [
      'Material: 100% Pure Brass',
      'Diameter: 65mm',
      'Weight: 220g',
      'Finish: Polished Brass',
      'Compatibility: Standard Domestic LPG Stoves'
    ],
    image: '/images/products/brass-burner-small.jpg',
  },
  {
    id: '6',
    slug: 'abs-industrial-knob',
    name: 'Industrial Grade ABS Knob',
    category: 'knobs',
    description: 'Durable ABS plastic knob designed for heavy-duty industrial and domestic use. Impact-resistant and highly reliable.',
    specifications: [
      'Material: High-Impact ABS',
      'Finish: Matte Black',
      'Shaft Diameter: 8mm',
      'Heat Resistance: Up to 120°C',
      'Mounting: Push-Fit'
    ],
    image: '/images/products/abs-knob.jpg',
  },
];
