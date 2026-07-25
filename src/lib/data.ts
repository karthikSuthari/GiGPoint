import { Category, Product } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Industrial Fuel Oils (FO/LDO)', slug: 'industrial-fuel', icon: 'Factory' },
  { id: 'cat-2', name: 'Engine & Diesel Oils', slug: 'engine-oil', icon: 'Droplet' },
  { id: 'cat-3', name: 'Bitumen & Construction', slug: 'bitumen', icon: 'Layers' },
  { id: 'cat-4', name: 'Pyrolysis & Bio-Fuels', slug: 'pyrolysis-bio', icon: 'Flame' },
  { id: 'cat-5', name: 'Grease & Special Lubricants', slug: 'grease', icon: 'Wrench' },
  { id: 'cat-6', name: 'Brake Fluids & Coolants', slug: 'coolant-brake', icon: 'Thermometer' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'pb-fo-180',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'PetroBazaar Premium Furnace Oil (FO Grade 180)',
    brand: 'PetroBazaar',
    grade: 'FO 180 cSt',
    description: 'High-calorific heavy liquid fuel derived from petroleum refining. Designed for industrial furnaces, steel re-heating, power boilers, and ceramic kilns.',
    price_inr: 52.50,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 50000,
    image_url: 'https://test.petrobazaar.com/wp-content/uploads/2023/12/FO-LDO-watermarked.png',
    spec_sheet: {
      'Gross Calorific Value': '10,200 kcal/kg',
      'Kinematic Viscosity @ 50°C': '180 cSt',
      'Flash Point (Pensky-Martens)': '66°C',
      'Sulfur Content': '< 3.5% Max',
      'Water Content': '< 1.0% Max',
      'Minimum Delivery Order': '10,000 Liters (Tanker Dispatch)'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-ldo-01',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'Light Diesel Oil (LDO) Industrial Grade',
    brand: 'PetroBazaar',
    grade: 'Class Class-C LDO',
    description: 'Medium-distillate fuel oil blended for stationary diesel engines, pumpsets, low-speed diesel generators, and industrial heating applications.',
    price_inr: 68.00,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 35000,
    image_url: 'https://test.petrobazaar.com/wp-content/uploads/2024/01/LDO.png',
    spec_sheet: {
      'Gross Calorific Value': '10,300 kcal/kg',
      'Kinematic Viscosity @ 40°C': '2.5 - 15.7 cSt',
      'Flash Point': '66°C',
      'Pour Point': '12°C Max',
      'Density @ 15°C': '0.850 - 0.890 g/cm³'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-lvfo-01',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'LVFO – Low Viscosity Fuel Oil',
    brand: 'PetroBazaar',
    grade: 'LVFO 80 cSt',
    description: 'Specially engineered low-viscosity liquid fuel offering easy pumpability and smooth atomization without requiring heavy pre-heating.',
    price_inr: 54.20,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 40000,
    image_url: 'https://test.petrobazaar.com/wp-content/uploads/2024/01/LVFO-Watermarked.png',
    spec_sheet: {
      'Gross Calorific Value': '10,150 kcal/kg',
      'Kinematic Viscosity @ 50°C': '80 cSt',
      'Flash Point': '60°C',
      'Ash Content': '< 0.1%'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-bitumen-vg30',
    category_id: 'cat-3',
    category_slug: 'bitumen',
    name: 'Bitumen VG-30 Paving Grade (Bulk Tanker)',
    brand: 'PetroBazaar',
    grade: 'VG-30 (IS 73:2013)',
    description: 'Standard viscosity-graded paving bitumen widely used for highway construction, road surfacing, and heavy traffic corridor asphalt paving.',
    price_inr: 44.50,
    unit: 'Kg (Bulk Tanker)',
    stock_qty: 80000,
    image_url: 'https://test.petrobazaar.com/wp-content/uploads/2023/12/Bitumen-Bulk.png',
    spec_sheet: {
      'Absolute Viscosity @ 60°C': '2400 - 3600 Poise',
      'Kinematic Viscosity @ 135°C': '350 cSt Min',
      'Penetration @ 25°C': '45 - 70 (0.1 mm)',
      'Softening Point': '47°C Min',
      'Standard Specification': 'IS 73:2013 Compliance'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-tyre-pyro',
    category_id: 'cat-4',
    category_slug: 'pyrolysis-bio',
    name: 'Tyre Pyrolysis Oil (TPO) Industrial Grade',
    brand: 'PetroBazaar Bio',
    grade: 'TPO Fuel',
    description: 'Cost-effective alternative fuel oil produced from waste tyre pyrolysis recycling. Ideal for boilers, furnaces, lime kilns, and glass factories.',
    price_inr: 47.80,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 25000,
    image_url: 'https://test.petrobazaar.com/wp-content/uploads/2024/01/Tyre-Pyrolysis-Oil-watermarked.png',
    spec_sheet: {
      'Gross Calorific Value': '10,400 kcal/kg',
      'Flash Point': '45°C - 55°C',
      'Density @ 15°C': '0.910 - 0.940 g/cm³',
      'Sulfur Content': '< 1.2%'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-plastic-pyro',
    category_id: 'cat-4',
    category_slug: 'pyrolysis-bio',
    name: 'Plastic Pyrolysis Oil (PPO) Clean Grade',
    brand: 'PetroBazaar Bio',
    grade: 'PPO Fuel',
    description: 'Eco-friendly recycled liquid fuel synthesized from mixed waste plastic processing, delivering high heat release and low carbon residue.',
    price_inr: 49.00,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 20000,
    image_url: 'https://test.petrobazaar.com/wp-content/uploads/2024/01/Plastic-Pyrolysis-Oil-watermarked.png',
    spec_sheet: {
      'Gross Calorific Value': '10,500 kcal/kg',
      'Flash Point': '42°C',
      'Density @ 15°C': '0.820 - 0.860 g/cm³',
      'Ash Content': '< 0.05%'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-laal-ghoda',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'HP Laal Ghoda 20W-40 Heavy Diesel Engine Oil',
    brand: 'HP Lubes',
    grade: '20W-40',
    description: 'Heavy-duty diesel engine oil specially formulated for commercial trucks, tractors, and agricultural machinery operating under severe loads.',
    price_inr: 3450.00,
    unit: '15 Liter Bucket',
    stock_qty: 120,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CF-4 / SG',
      'Kinematic Viscosity @ 100°C': '14.5 cSt',
      'Flash Point': '230°C',
      'Pour Point': '-21°C'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-[#0A4D8C]-servo',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Servo Futura D 15W-40 Synthetic Diesel Oil',
    brand: 'Servo',
    grade: '15W-40',
    description: 'Premium synthetic diesel engine oil offering maximum oxidation stability, soot control, and extended drain intervals for modern BS-VI engines.',
    price_inr: 4100.00,
    unit: '15 Liter Can',
    stock_qty: 85,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CI-4 Plus / SL',
      'Kinematic Viscosity @ 100°C': '15.1 cSt',
      'Flash Point': '235°C',
      'Pour Point': '-27°C'
    },
    is_bulk_available: true
  },
  {
    id: 'prod-servo-grease',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'Servo Grease MP Lithium-Based Heavy Duty',
    brand: 'Servo',
    grade: 'NLGI 2',
    description: 'Multi-purpose lithium soap grease providing excellent mechanical stability, water resistance, and rust protection for wheel bearings and chassis.',
    price_inr: 1850.00,
    unit: '5 kg Container',
    stock_qty: 60,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Soap Type': 'Lithium Soap',
      'Drop Point': '190°C',
      'Penetration @ 25°C': '265-295'
    },
    is_bulk_available: true
  }
];
