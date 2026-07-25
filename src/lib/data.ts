import { Category, Product } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Engine Oil', slug: 'engine-oil', icon: 'Droplet' },
  { id: 'cat-2', name: 'Brake Fluid', slug: 'brake-fluid', icon: 'Disc' },
  { id: 'cat-3', name: 'Grease & Lubricants', slug: 'grease', icon: 'Wrench' },
  { id: 'cat-4', name: 'Industrial Oil', slug: 'industrial-oil', icon: 'Factory' },
  { id: 'cat-5', name: 'Coolant & Radiator', slug: 'coolant', icon: 'Thermometer' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    category_id: 'cat-1',
    category_slug: 'engine-oil',
    name: 'HP Laal Ghoda 20W-40 Diesel Engine Oil',
    brand: 'HP Lubes',
    grade: '20W-40',
    description: 'Heavy-duty diesel engine oil specially formulated for commercial trucks, tractors, and heavy machinery operating under severe temperature and load conditions.',
    price_inr: 3450,
    unit: '15 Liter Bucket',
    stock_qty: 120,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CF-4 / SG',
      'Kinematic Viscosity @ 100°C': '14.5 cSt',
      'Flash Point': '230°C',
      'Pour Point': '-21°C',
      'Recommended Change Interval': '10,000 KM'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-2',
    category_id: 'cat-1',
    category_slug: 'engine-oil',
    name: 'Servo Futura D 15W-40 Synthetic Engine Oil',
    brand: 'Servo',
    grade: '15W-40',
    description: 'Premium synthetic diesel engine oil offering maximum oxidation stability, soot control, and extended drain intervals for modern BS-VI commercial engines.',
    price_inr: 4100,
    unit: '15 Liter Can',
    stock_qty: 85,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CI-4 Plus / SL',
      'Kinematic Viscosity @ 100°C': '15.1 cSt',
      'Flash Point': '235°C',
      'Pour Point': '-27°C',
      'Sulfated Ash': '1.2%'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-3',
    category_id: 'cat-2',
    category_slug: 'brake-fluid',
    name: 'Servo Brake Fluid DOT 4 High Performance',
    brand: 'Servo',
    grade: 'DOT 4',
    description: 'Heavy-duty hydraulic brake fluid designed for drum & disc brake systems in passenger cars, commercial fleet, and heavy transport vehicles.',
    price_inr: 280,
    unit: '500 ml Bottle',
    stock_qty: 250,
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Dry Boiling Point': '260°C',
      'Wet Boiling Point': '165°C',
      'Viscosity @ -40°C': '1400 cSt',
      'Standard Specification': 'FMVSS 116 DOT 4'
    },
    is_bulk_available: false
  },
  {
    id: 'prod-4',
    category_id: 'cat-3',
    category_slug: 'grease',
    name: 'Servo Grease MP Lithium-Based Heavy Duty',
    brand: 'Servo',
    grade: 'NLGI 2',
    description: 'Multi-purpose lithium soap grease providing excellent mechanical stability, water resistance, and rust protection for wheel bearings and chassis.',
    price_inr: 1850,
    unit: '5 kg Container',
    stock_qty: 60,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Soap Type': 'Lithium Soap',
      'Base Oil Viscosity @ 40°C': '150 cSt',
      'Drop Point': '190°C',
      'Penetration @ 25°C': '265-295'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-5',
    category_id: 'cat-4',
    category_slug: 'industrial-oil',
    name: 'Lubeswala Premium Furnace Oil Heavy Industrial',
    brand: 'Lubeswala',
    grade: 'FO Grade 180',
    description: 'High-calorific liquid fuel derived from crude distillation. Designed for industrial furnaces, boilers, heat treatment plants, and power generation.',
    price_inr: 52.5,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 10000,
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,200 kcal/kg',
      'Viscosity @ 50°C': '180 cSt',
      'Flash Point': '66°C',
      'Sulfur Content': '< 3.5%',
      'Minimum Order Qty': '500 Liters'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-6',
    category_id: 'cat-5',
    category_slug: 'coolant',
    name: 'Servo Kool Plus Heavy Duty Radiator Coolant',
    brand: 'Servo',
    grade: 'JIS K 2234',
    description: 'Ethylene glycol-based long-life radiator coolant concentrate. Prevents engine overheating, freezing, scale formation, and corrosion.',
    price_inr: 650,
    unit: '3 Liter Can',
    stock_qty: 140,
    image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Boiling Point (50% Dilution)': '128°C',
      'Freezing Point': '-36°C',
      'Fluid Color': 'Fluorescent Green',
      'Mixing Ratio': '1 Part Coolant : 3 Parts Water'
    },
    is_bulk_available: true
  }
];
