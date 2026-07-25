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
  // 1. Industrial Fuels (FO, LDO, LVFO)
  {
    id: 'pb-fo-180-tanker',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'PetroBazaar Premium Furnace Oil (FO Grade 180)',
    brand: 'PetroBazaar',
    grade: 'FO 180 cSt',
    description: 'High-calorific heavy liquid fuel derived from petroleum refining. Designed for industrial furnaces, steel re-heating, power boilers, and ceramic kilns.',
    price_inr: 52.50,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 50000,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,200 kcal/kg',
      'Kinematic Viscosity @ 50°C': '180 cSt',
      'Flash Point': '66°C',
      'Sulfur Content': '< 3.5% Max',
      'Minimum Delivery Order': '10,000 Liters (Tanker Dispatch)'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-fo-180-drum',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'PetroBazaar Furnace Oil (FO Grade 180) Industrial Drum',
    brand: 'PetroBazaar',
    grade: 'FO 180 cSt',
    description: 'Standard 200 Liter sealed industrial drum of Furnace Oil FO 180 cSt for small kilns, boilers, and hot air generators.',
    price_inr: 10800.00,
    unit: '200 Liter Drum',
    stock_qty: 150,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,200 kcal/kg',
      'Viscosity @ 50°C': '180 cSt',
      'Flash Point': '66°C',
      'Packaging': '200L Heavy Duty Steel Drum'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-ldo-tanker',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'Light Diesel Oil (LDO) Industrial Grade Tanker',
    brand: 'PetroBazaar',
    grade: 'Class-C LDO',
    description: 'Medium-distillate fuel oil blended for stationary diesel engines, pumpsets, low-speed diesel generators, and industrial heating applications.',
    price_inr: 68.00,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 35000,
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,300 kcal/kg',
      'Kinematic Viscosity @ 40°C': '2.5 - 15.7 cSt',
      'Flash Point': '66°C',
      'Pour Point': '12°C Max'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-ldo-drum',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'Light Diesel Oil (LDO) 200L Steel Drum',
    brand: 'PetroBazaar',
    grade: 'Class-C LDO',
    description: '200 Liter factory sealed steel drum of Light Diesel Oil. Ideal for DG sets and factory backup pumps.',
    price_inr: 13900.00,
    unit: '200 Liter Drum',
    stock_qty: 80,
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,300 kcal/kg',
      'Viscosity @ 40°C': '3.2 cSt',
      'Density': '0.860 g/cm³'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-lvfo-tanker',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'LVFO – Low Viscosity Fuel Oil (80 cSt)',
    brand: 'PetroBazaar',
    grade: 'LVFO 80 cSt',
    description: 'Specially engineered low-viscosity liquid fuel offering easy pumpability and smooth atomization without requiring heavy pre-heating.',
    price_inr: 54.20,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 40000,
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,150 kcal/kg',
      'Kinematic Viscosity @ 50°C': '80 cSt',
      'Flash Point': '60°C'
    },
    is_bulk_available: true
  },

  // 2. Bitumen & Construction SKUs
  {
    id: 'pb-bitumen-vg30-tanker',
    category_id: 'cat-3',
    category_slug: 'bitumen',
    name: 'Bitumen VG-30 Paving Grade (Bulk Tanker)',
    brand: 'PetroBazaar',
    grade: 'VG-30 (IS 73:2013)',
    description: 'Standard viscosity-graded paving bitumen widely used for highway construction, road surfacing, and heavy traffic corridor asphalt paving.',
    price_inr: 44.50,
    unit: 'Kg (Bulk Tanker)',
    stock_qty: 80000,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Absolute Viscosity @ 60°C': '2400 - 3600 Poise',
      'Kinematic Viscosity @ 135°C': '350 cSt Min',
      'Penetration @ 25°C': '45 - 70 (0.1 mm)'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-bitumen-vg30-drum',
    category_id: 'cat-3',
    category_slug: 'bitumen',
    name: 'Bitumen VG-30 Paving Grade (180 Kg Drum)',
    brand: 'PetroBazaar',
    grade: 'VG-30 (IS 73:2013)',
    description: '180 Kg sealed steel drum of viscosity-graded VG-30 bitumen for local road repairs and waterproofing.',
    price_inr: 8200.00,
    unit: '180 Kg Drum',
    stock_qty: 200,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Viscosity @ 60°C': '2400-3600 Poise',
      'Softening Point': '47°C Min'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-bitumen-vg40-tanker',
    category_id: 'cat-3',
    category_slug: 'bitumen',
    name: 'Bitumen VG-40 Heavy Duty Highway Grade',
    brand: 'PetroBazaar',
    grade: 'VG-40 (IS 73:2013)',
    description: 'High-viscosity paving grade bitumen formulated for extreme weather conditions, heavy axle loading, and airport runway paving.',
    price_inr: 46.80,
    unit: 'Kg (Bulk Tanker)',
    stock_qty: 60000,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Absolute Viscosity @ 60°C': '3200 - 4800 Poise',
      'Softening Point': '50°C Min'
    },
    is_bulk_available: true
  },

  // 3. Pyrolysis & Bio-Fuels
  {
    id: 'pb-tyre-pyro-tanker',
    category_id: 'cat-4',
    category_slug: 'pyrolysis-bio',
    name: 'Tyre Pyrolysis Oil (TPO) Industrial Grade',
    brand: 'PetroBazaar Bio',
    grade: 'TPO Fuel',
    description: 'Cost-effective alternative fuel oil produced from waste tyre pyrolysis recycling. Ideal for boilers, furnaces, lime kilns, and glass factories.',
    price_inr: 47.80,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 25000,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,400 kcal/kg',
      'Flash Point': '45°C - 55°C',
      'Sulfur Content': '< 1.2%'
    },
    is_bulk_available: true
  },
  {
    id: 'pb-plastic-pyro-tanker',
    category_id: 'cat-4',
    category_slug: 'pyrolysis-bio',
    name: 'Plastic Pyrolysis Oil (PPO) Clean Grade',
    brand: 'PetroBazaar Bio',
    grade: 'PPO Fuel',
    description: 'Eco-friendly recycled liquid fuel synthesized from mixed waste plastic processing, delivering high heat release and low carbon residue.',
    price_inr: 49.00,
    unit: 'Liter (Bulk Tanker)',
    stock_qty: 20000,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,500 kcal/kg',
      'Flash Point': '42°C'
    },
    is_bulk_available: true
  },

  // 4. Engine & Diesel Oils (Various Container Sizes & Brands)
  {
    id: 'hp-laal-ghoda-15l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'HP Laal Ghoda 20W-40 Heavy Diesel Engine Oil (15L)',
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
      'Flash Point': '230°C'
    },
    is_bulk_available: true
  },
  {
    id: 'hp-laal-ghoda-1l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'HP Laal Ghoda 20W-40 Synthetic Engine Oil (1L Bottle)',
    brand: 'HP Lubes',
    grade: '20W-40',
    description: '1 Liter bottle of HP Laal Ghoda 20W-40 engine oil for quick top-ups and small diesel engines.',
    price_inr: 320.00,
    unit: '1 Liter Bottle',
    stock_qty: 350,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CF-4',
      'Viscosity': '20W-40'
    },
    is_bulk_available: false
  },
  {
    id: 'servo-futura-d-15l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Servo Futura D 15W-40 Synthetic Diesel Oil (15L Can)',
    brand: 'Servo',
    grade: '15W-40',
    description: 'Premium synthetic diesel engine oil offering maximum oxidation stability, soot control, and extended drain intervals for modern BS-VI engines.',
    price_inr: 4100.00,
    unit: '15 Liter Can',
    stock_qty: 85,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CI-4 Plus / SL',
      'Viscosity @ 100°C': '15.1 cSt'
    },
    is_bulk_available: true
  },
  {
    id: 'servo-futura-d-5l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Servo Futura D 15W-40 Synthetic Diesel Oil (5L Can)',
    brand: 'Servo',
    grade: '15W-40',
    description: '5 Liter container of Servo Futura D 15W-40 for light commercial vehicles, SUVs, and passenger cars.',
    price_inr: 1450.00,
    unit: '5 Liter Can',
    stock_qty: 180,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CI-4 Plus',
      'Viscosity': '15W-40'
    },
    is_bulk_available: false
  },
  {
    id: 'servo-futura-d-1l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Servo Futura D 15W-40 Engine Oil (1L Bottle)',
    brand: 'Servo',
    grade: '15W-40',
    description: '1 Liter bottle of Servo Futura D 15W-40 engine oil.',
    price_inr: 340.00,
    unit: '1 Liter Bottle',
    stock_qty: 400,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Standard': 'CI-4 Plus',
      'Viscosity': '15W-40'
    },
    is_bulk_available: false
  },
  {
    id: 'total-quartz-8000-3-5l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5 (3.5L)',
    brand: 'TotalEnergies',
    grade: '5W-30 Synthetic',
    description: 'Fully synthetic high-performance engine oil designed for modern petrol and diesel passenger cars, delivering maximum fuel economy.',
    price_inr: 2850.00,
    unit: '3.5 Liter Can',
    stock_qty: 90,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'ACEA Standard': 'A5 / B5',
      'API Rating': 'SL / CF',
      'Viscosity': '5W-30 Full Synthetic'
    },
    is_bulk_available: false
  },
  {
    id: 'castrol-magnatec-3-5l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Castrol Magnatec 5W-30 Full Synthetic Engine Oil (3.5L)',
    brand: 'Castrol',
    grade: '5W-30 Full Synthetic',
    description: 'Dualock technology engine oil with intelligent molecules that cling to critical engine components, dramatically reducing warm-up wear.',
    price_inr: 2950.00,
    unit: '3.5 Liter Can',
    stock_qty: 110,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Rating': 'SN / CF',
      'Viscosity': '5W-30'
    },
    is_bulk_available: false
  },
  {
    id: 'mobil1-esp-4l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Mobil 1 ESP 5W-30 Advanced Synthetic Oil (4L Can)',
    brand: 'Mobil',
    grade: '5W-30 Advanced Synthetic',
    description: 'Flagship synthetic motor oil formulated to provide exceptional cleaning power, wear protection, and overall performance in DPF-equipped engines.',
    price_inr: 3800.00,
    unit: '4 Liter Can',
    stock_qty: 65,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'API Rating': 'SP / SN Plus',
      'Viscosity': '5W-30'
    },
    is_bulk_available: false
  },
  {
    id: 'servo-2t-supreme-1l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Servo 2T Supreme 2-Stroke Engine Oil (1L)',
    brand: 'Servo',
    grade: '2T Supreme',
    description: 'Self-mixing 2-stroke engine oil for scooters, auto-rickshaws, and two-stroke mopeds offering low smoke emissions.',
    price_inr: 260.00,
    unit: '1 Liter Bottle',
    stock_qty: 250,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'JASO Standard': 'FC',
      'API Specification': 'TC'
    },
    is_bulk_available: false
  },
  {
    id: 'servo-tractor-green-15l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'Servo Tractor Green 15W-40 Multi-Purpose (15L Bucket)',
    brand: 'Servo',
    grade: '15W-40 Universal',
    description: 'Premium universal tractor transmission and engine lubricant suitable for agricultural tractors and combined harvesters.',
    price_inr: 3650.00,
    unit: '15 Liter Bucket',
    stock_qty: 95,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Application': 'Tractor Engine + Transmission + Hydraulics',
      'API Rating': 'CF-4'
    },
    is_bulk_available: true
  },

  // 5. Greases & Special Lubricants
  {
    id: 'servo-grease-mp-5kg',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'Servo Grease MP Lithium-Based Heavy Duty (5 kg)',
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
  },
  {
    id: 'servo-grease-mp-18kg',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'Servo Grease MP Lithium Heavy Duty (18 kg Bucket)',
    brand: 'Servo',
    grade: 'NLGI 2',
    description: '18 kg commercial workshop bucket of Servo MP Lithium Grease for fleet lubrication.',
    price_inr: 5800.00,
    unit: '18 kg Bucket',
    stock_qty: 45,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Soap Type': 'Lithium Soap',
      'Drop Point': '190°C'
    },
    is_bulk_available: true
  },
  {
    id: 'servo-gem-ep2-18kg',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'Servo Gem EP 2 Heavy Industrial Extreme Pressure Grease (18 kg)',
    brand: 'Servo',
    grade: 'NLGI 2 EP',
    description: 'Extreme pressure lithium grease containing EP additives for heavy industrial rolling bearings, crushers, and steel mill machinery.',
    price_inr: 6400.00,
    unit: '18 kg Bucket',
    stock_qty: 30,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Timken OK Load': '20 kg Min',
      'Drop Point': '195°C'
    },
    is_bulk_available: true
  },

  // 6. Brake Fluids & Coolants
  {
    id: 'servo-brake-fluid-dot4-500ml',
    category_id: 'cat-6',
    category_slug: 'coolant-brake',
    name: 'Servo Brake Fluid DOT-4 High Boiling Point (500ml)',
    brand: 'Servo',
    grade: 'DOT 4',
    description: 'Heavy-duty synthetic brake fluid formulated for disc and drum brake systems requiring FMVSS 116 DOT 4 specification.',
    price_inr: 190.00,
    unit: '500 ml Bottle',
    stock_qty: 300,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Dry Boiling Point': '260°C Min',
      'Wet Boiling Point': '165°C Min'
    },
    is_bulk_available: false
  },
  {
    id: 'servo-kool-plus-1l',
    category_id: 'cat-6',
    category_slug: 'coolant-brake',
    name: 'Servo Kool Plus Long Life Radiator Coolant (1L)',
    brand: 'Servo',
    grade: 'JIS K 2234',
    description: 'Ethylene glycol based concentrated radiator coolant providing boil-over protection, anti-freeze performance, and rust inhibition for aluminum engines.',
    price_inr: 280.00,
    unit: '1 Liter Bottle',
    stock_qty: 220,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    spec_sheet: {
      'Boiling Point @ 1:1 Mix': '128°C',
      'Freezing Point': '-36°C'
    },
    is_bulk_available: false
  }
];
