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
  // Official Lubeswala.com Real Product Catalog (35 Real SKUs)
  
  // 1. Bitumen Drum VG 30
  {
    id: 'lubes-bitumen-drum-vg30',
    category_id: 'cat-3',
    category_slug: 'bitumen',
    name: 'Bitumen Drum VG 30 - 225 kgs (220 liters)',
    brand: 'Lubeswala',
    grade: 'VG 30 (IS 73:2013)',
    description: 'Authentic 225 Kg / 220 Liter steel drum of viscosity-graded VG 30 paving bitumen for road construction, asphalt paving, and waterproofing.',
    price_inr: 8180.00,
    unit: '225 Kg Steel Drum',
    stock_qty: 150,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity Grade': 'VG 30',
      'Absolute Viscosity @ 60°C': '2400-3600 Poise',
      'Softening Point': '47°C Min',
      'Packaging': '225 Kg Heavy Duty Sealed Drum'
    },
    is_bulk_available: true
  },

  // 2. Furnace Oil (FO) - 225 kgs (220 liters)
  {
    id: 'lubes-furnace-oil-fo-225kg',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'Furnace Oil (FO) - 225 kgs (220 liters)',
    brand: 'Lubeswala',
    grade: 'FO 180 cSt',
    description: 'Factory sealed 225 Kg / 220 Liter drum of Furnace Oil 180 cSt designed for industrial boilers, steel reheating furnaces, and ceramic kilns.',
    price_inr: 10496.00,
    unit: '225 Kg Steel Drum',
    stock_qty: 180,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,200 kcal/kg',
      'Viscosity @ 50°C': '180 cSt',
      'Flash Point': '66°C',
      'Sulfur Content': '< 3.5%'
    },
    is_bulk_available: true
  },

  // 3. HP DEF - Diesel Exhaust Fluid 20 Litres
  {
    id: 'hp-def-20l',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'HP DEF - Diesel Exhaust Fluid 20 Litres',
    brand: 'HP Lubes',
    grade: 'AUS 32 / ISO 22241',
    description: 'High-purity 32.5% aqueous urea solution designed for SCR-equipped BS-VI commercial diesel trucks and buses to reduce NOx emissions.',
    price_inr: 920.00,
    unit: '20 Liter Container',
    stock_qty: 240,
    image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Standard': 'ISO 22241 / AdBlue Standard',
      'Urea Content': '32.5% ± 0.7%',
      'Density @ 20°C': '1.087 - 1.093 g/cm³'
    },
    is_bulk_available: false
  },

  // 4. HP Enclo 68
  {
    id: 'hp-enclo-68',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'HP Enclo 68 Hydraulic & Industrial Gear Oil',
    brand: 'HP Lubes',
    grade: 'VG 68',
    description: 'Premium anti-wear hydraulic oil formulated with high quality base stocks for high pressure hydraulic systems and industrial machinery.',
    price_inr: 4650.00,
    unit: '20 Liter Bucket',
    stock_qty: 90,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity Grade': 'ISO VG 68',
      'Viscosity Index': '95 Min',
      'Flash Point': '220°C'
    },
    is_bulk_available: true
  },

  // 5. HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil (1 Litre)
  {
    id: 'hp-laal-ghoda-1l-real',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil (1 Litre)',
    brand: 'HP Lubes',
    grade: '20W-40',
    description: 'Official 1 Liter bottle of HP Laal Ghoda 20W-40 multi-grade engine oil suitable for commercial diesel engines, tractors, and utility vehicles.',
    price_inr: 320.00,
    unit: '1 Litre Bottle',
    stock_qty: 400,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'API Standard': 'CF-4 / SG',
      'Viscosity Grade': '20W-40',
      'Flash Point': '230°C'
    },
    is_bulk_available: false
  },

  // 6. HP Lubricants Laal Ghoda 20w-40 (500 ml)
  {
    id: 'hp-laal-ghoda-500ml',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil (500 ml)',
    brand: 'HP Lubes',
    grade: '20W-40',
    description: '500 ml compact bottle of HP Laal Ghoda 20W-40 engine oil for quick top-ups and small engine maintenance.',
    price_inr: 175.00,
    unit: '500 ml Bottle',
    stock_qty: 300,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'API Standard': 'CF-4',
      'Viscosity': '20W-40'
    },
    is_bulk_available: false
  },

  // 7. HP Transformer Oil - 10 ltrs
  {
    id: 'hp-transformer-oil-10l',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'HP Transformer Oil - 10 ltrs',
    brand: 'HP Lubes',
    grade: 'IEC 60296 Class I',
    description: 'Highly refined uninhibited electrical insulating oil designed for distribution transformers, circuit breakers, and electrical switchgear.',
    price_inr: 2150.00,
    unit: '10 Liter Can',
    stock_qty: 60,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Breakdown Voltage': '70 kV Min',
      'Flash Point': '140°C Min',
      'Standard': 'IS 335 / IEC 60296'
    },
    is_bulk_available: false
  },

  // 8. Light Diesel Oil (LDO) - 207 kgs (220 liters)
  {
    id: 'lubes-ldo-220l',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'Light Diesel Oil (LDO) - 207 kgs (220 liters)',
    brand: 'Lubeswala',
    grade: 'Class-C LDO',
    description: 'Standard 220 Liter (207 kg) steel drum of Light Diesel Oil. Medium distillate fuel for stationary diesel engines, DG backup sets, and pumpsets.',
    price_inr: 13564.00,
    unit: '220 Liter Drum',
    stock_qty: 110,
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Gross Calorific Value': '10,300 kcal/kg',
      'Viscosity @ 40°C': '2.5 - 15.7 cSt',
      'Density': '0.860 g/cm³'
    },
    is_bulk_available: true
  },

  // 9. SERVO 2T SUPREME
  {
    id: 'servo-2t-supreme-real',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'SERVO 2T SUPREME 2-Stroke Engine Oil',
    brand: 'Indian Oil (Servo)',
    grade: '2T Supreme',
    description: 'Premium self-mixing 2-stroke engine oil for scooters, mopeds, auto-rickshaws, and 2T motorcycles. Ensures minimal exhaust smoke and spark plug fouling.',
    price_inr: 260.00,
    unit: '1 Litre Bottle',
    stock_qty: 350,
    image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'JASO Standard': 'FC',
      'API Specification': 'TC',
      'Mixing Ratio': '1:50 with Petrol'
    },
    is_bulk_available: false
  },

  // 10. SERVO 4T 20W40
  {
    id: 'servo-4t-20w40-real',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'SERVO 4T 20W40 4-Stroke Motorcycle Oil',
    brand: 'Indian Oil (Servo)',
    grade: '4T 20W-40',
    description: 'High-performance 4-stroke motorcycle engine oil providing excellent clutch friction control, thermal stability, and engine wear protection.',
    price_inr: 340.00,
    unit: '1 Litre Bottle',
    stock_qty: 450,
    image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'JASO Standard': 'MA2',
      'API Specification': 'SL'
    },
    is_bulk_available: false
  },

  // 11. SERVO BRAKE FLUID DOT -4
  {
    id: 'servo-brake-fluid-dot4-real',
    category_id: 'cat-6',
    category_slug: 'coolant-brake',
    name: 'SERVO BRAKE FLUID DOT -4',
    brand: 'Indian Oil (Servo)',
    grade: 'DOT 4',
    description: 'Heavy-duty synthetic brake fluid for disc & drum hydraulic brake systems in passenger cars, trucks, and commercial vehicles.',
    price_inr: 280.00,
    unit: '500 ml Bottle',
    stock_qty: 280,
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Dry Boiling Point': '260°C Min',
      'Wet Boiling Point': '165°C Min',
      'Standard': 'FMVSS 116 DOT 4'
    },
    is_bulk_available: false
  },

  // 12. SERVO BRAKE FLUID SUPER HD
  {
    id: 'servo-brake-fluid-super-hd-real',
    category_id: 'cat-6',
    category_slug: 'coolant-brake',
    name: 'SERVO BRAKE FLUID SUPER HD',
    brand: 'Indian Oil (Servo)',
    grade: 'Super HD',
    description: 'High-boiling point hydraulic brake fluid formulated for commercial buses, multi-axle trucks, and heavy transport operating in hot tropical climates.',
    price_inr: 220.00,
    unit: '500 ml Bottle',
    stock_qty: 320,
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Standard': 'SAE J 1703 / IS 8654',
      'Dry Boiling Point': '230°C Min'
    },
    is_bulk_available: false
  },

  // 13. SERVO CUT S
  {
    id: 'servo-cut-s',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO CUT S Water Soluble Cutting Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'Soluble Cutting Fluid',
    description: 'Premium bio-stable soluble cutting oil forming a milky white emulsion with water for metal machining, turning, drilling, and milling operations.',
    price_inr: 4850.00,
    unit: '20 Liter Bucket',
    stock_qty: 75,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Emulsion Type': 'Milky White Stable Emulsion',
      'Mixing Ratio': '1 Part Oil : 20 Parts Water',
      'Standard': 'IS 1115:1986'
    },
    is_bulk_available: true
  },

  // 14. SERVO Gem 2
  {
    id: 'servo-gem-2',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO Gem 2 Multi-Purpose Lithium Grease',
    brand: 'Indian Oil (Servo)',
    grade: 'NLGI 2',
    description: 'General purpose lithium soap grease possessing high oxidation stability, structural stability, and water resistance for automotive wheel bearings.',
    price_inr: 1820.00,
    unit: '5 kg Container',
    stock_qty: 140,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Soap Type': 'Lithium Soap',
      'Drop Point': '190°C Min',
      'Penetration @ 25°C': '265-295'
    },
    is_bulk_available: true
  },

  // 15. SERVO Gem 3
  {
    id: 'servo-gem-3',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO Gem 3 Heavy Duty Lithium Grease',
    brand: 'Indian Oil (Servo)',
    grade: 'NLGI 3',
    description: 'Stiffer consistency NLGI 3 lithium grease offering superior sealing against dust and moisture in high temperature automotive wheel bearings.',
    price_inr: 1890.00,
    unit: '5 kg Container',
    stock_qty: 110,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Soap Type': 'Lithium Soap',
      'Drop Point': '190°C Min',
      'Penetration @ 25°C': '220-250'
    },
    is_bulk_available: true
  },

  // 16. SERVO GEM EP 2
  {
    id: 'servo-gem-ep2-real',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO GEM EP 2 Heavy Industrial Extreme Pressure Grease',
    brand: 'Indian Oil (Servo)',
    grade: 'NLGI 2 EP',
    description: 'Extreme pressure lithium grease with EP additives for heavy industrial rolling bearings, crushers, steel mills, and heavy equipment.',
    price_inr: 6400.00,
    unit: '18 kg Bucket',
    stock_qty: 55,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Timken OK Load': '20 kg Min',
      'Drop Point': '195°C',
      'Soap Type': 'Lithium Soap'
    },
    is_bulk_available: true
  },

  // 17. SERVO GEM HTXX
  {
    id: 'servo-gem-htxx',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO GEM HTXX High Temperature Non-Soap Grease',
    brand: 'Indian Oil (Servo)',
    grade: 'High Temp Non-Melting',
    description: 'Non-soap synthetic thickener high temperature grease designed for oven conveyors, furnace door bearings, and steel plant machinery.',
    price_inr: 3250.00,
    unit: '5 kg Container',
    stock_qty: 40,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Operating Temperature': 'Up to 280°C',
      'Drop Point': 'None (Non-melting)'
    },
    is_bulk_available: false
  },

  // 18. SERVO GEM RR 3
  {
    id: 'servo-gem-rr3-real',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO GEM RR 3 Railway & Heavy Roller Bearing Grease',
    brand: 'Indian Oil (Servo)',
    grade: 'NLGI 3 Railway',
    description: 'Premium lithium soap grease approved by RDSO for railway axle journal roller bearings and heavy transport equipment.',
    price_inr: 6850.00,
    unit: '18 kg Bucket',
    stock_qty: 45,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Specification': 'RDSO Spec M&C/RP-102/77',
      'Drop Point': '190°C Min'
    },
    is_bulk_available: true
  },

  // 19. SERVO Grease MP 3
  {
    id: 'servo-grease-mp3-real',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO Grease MP 3 Multi-Purpose Grease',
    brand: 'Indian Oil (Servo)',
    grade: 'NLGI 3 MP',
    description: 'General purpose multi-application lithium grease providing structural stability and rust inhibition for automotive chassis & water pump bearings.',
    price_inr: 1850.00,
    unit: '5 kg Container',
    stock_qty: 120,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Soap Type': 'Lithium Soap',
      'Drop Point': '190°C'
    },
    is_bulk_available: true
  },

  // 20. SERVO HYDRA SHAKTHI 68
  {
    id: 'servo-hydra-shakthi-68',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO HYDRA SHAKTHI 68 Heavy Duty Hydraulic Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 68',
    description: 'High performance anti-wear hydraulic oil formulated for heavy earthmoving machinery, excavators, plastic injection molding, and industrial presses.',
    price_inr: 4550.00,
    unit: '20 Liter Bucket',
    stock_qty: 85,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '68 cSt',
      'Viscosity Index': '98 Min',
      'Flash Point': '224°C'
    },
    is_bulk_available: true
  },

  // 21. SERVO KOOL PLUS
  {
    id: 'servo-kool-plus-real',
    category_id: 'cat-6',
    category_slug: 'coolant-brake',
    name: 'SERVO KOOL PLUS Long Life Radiator Coolant',
    brand: 'Indian Oil (Servo)',
    grade: 'JIS K 2234',
    description: 'Ethylene glycol based concentrated radiator coolant providing boil-over protection, anti-freeze performance, and anti-corrosion for aluminum radiators.',
    price_inr: 280.00,
    unit: '1 Litre Bottle',
    stock_qty: 250,
    image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Boiling Point @ 1:1 Mix': '128°C',
      'Freezing Point': '-36°C',
      'Color': 'Fluorescent Green'
    },
    is_bulk_available: false
  },

  // 22. SERVO KOOL READY
  {
    id: 'servo-kool-ready-real',
    category_id: 'cat-6',
    category_slug: 'coolant-brake',
    name: 'SERVO KOOL READY Premixed Coolant',
    brand: 'Indian Oil (Servo)',
    grade: 'Ready-to-Use',
    description: 'Pre-diluted 1:3 ready-to-use engine coolant. Requires no water addition. Provides year-round cooling and anti-rust protection.',
    price_inr: 180.00,
    unit: '1 Litre Bottle',
    stock_qty: 320,
    image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Dilution': 'Pre-mixed 1:3 with Deionized Water',
      'Boiling Point': '108°C'
    },
    is_bulk_available: false
  },

  // 23. SERVO Long Life Grease
  {
    id: 'servo-long-life-grease-real',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO Long Life Grease (Indian Oil)',
    brand: 'Indian Oil (Servo)',
    grade: 'Long Life NLGI 3',
    description: 'Extended drain premium automotive wheel bearing grease engineered for heavy commercial vehicles and long-distance haulage trucks.',
    price_inr: 2150.00,
    unit: '5 kg Container',
    stock_qty: 90,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Recommended Drain Interval': '1,00,000 KM',
      'Drop Point': '260°C Min'
    },
    is_bulk_available: true
  },

  // 24. SERVO MESH SP 220
  {
    id: 'servo-mesh-sp-220',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO MESH SP 220 Industrial Extreme Pressure Gear Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 220 EP',
    description: 'Heavy duty industrial gear oil containing lead-free EP additives for spur, helical, bevel, and worm gearboxes operating under severe shock loads.',
    price_inr: 4950.00,
    unit: '20 Liter Bucket',
    stock_qty: 60,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '220 cSt',
      'FZG Gear Test Stage': '12 Passed',
      'Flash Point': '230°C'
    },
    is_bulk_available: true
  },

  // 25. SERVO MESH SP 320
  {
    id: 'servo-mesh-sp-320',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO MESH SP 320 Heavy Industrial Gear Lubricant',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 320 EP',
    description: 'High viscosity industrial gear oil designed for heavy cement plant gearboxes, steel rolling mills, and mining machinery.',
    price_inr: 5200.00,
    unit: '20 Liter Bucket',
    stock_qty: 50,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '320 cSt',
      'Flash Point': '240°C'
    },
    is_bulk_available: true
  },

  // 26. SERVO PREMIUM CF - 4 15W - 40
  {
    id: 'servo-premium-cf4-15w40',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'SERVO PREMIUM CF - 4 15W - 40 Heavy Duty Diesel Engine Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'CF-4 15W-40',
    description: 'Multi-grade diesel engine oil for turbocharged commercial trucks, buses, tractors, and earthmoving machinery requiring API CF-4 specification.',
    price_inr: 3550.00,
    unit: '15 Liter Bucket',
    stock_qty: 110,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'API Rating': 'CF-4 / SG',
      'Viscosity': '15W-40'
    },
    is_bulk_available: true
  },

  // 27. SERVO SUPER 20W - 40 MG
  {
    id: 'servo-super-20w40-mg',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'SERVO SUPER 20W - 40 MG Multigrade Engine Oil',
    brand: 'Indian Oil (Servo)',
    grade: '20W-40 MG',
    description: 'High-performance multigrade engine oil designed for mixed fleet commercial vehicles, diesel pickup trucks, and agricultural equipment.',
    price_inr: 3250.00,
    unit: '15 Liter Bucket',
    stock_qty: 130,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'API Rating': 'CF / SF',
      'Viscosity': '20W-40'
    },
    is_bulk_available: true
  },

  // 28. SERVO SYSTEM 220
  {
    id: 'servo-system-220',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO SYSTEM 220 Industrial Circulation & Bearing Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 220',
    description: 'Straight mineral oil for industrial circulation systems, enclosed gearboxes, and plain & anti-friction bearings operating under moderate loads.',
    price_inr: 4600.00,
    unit: '20 Liter Bucket',
    stock_qty: 40,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '220 cSt',
      'Flash Point': '240°C'
    },
    is_bulk_available: true
  },

  // 29. SERVO SYSTEM 32
  {
    id: 'servo-system-32',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO SYSTEM 32 Anti-Wear Hydraulic Fluid',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 32',
    description: 'Light viscosity anti-wear hydraulic oil for high-speed CNC machines, precision machine tools, and cold climate hydraulic equipment.',
    price_inr: 4200.00,
    unit: '20 Liter Bucket',
    stock_qty: 65,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '32 cSt',
      'Flash Point': '210°C'
    },
    is_bulk_available: true
  },

  // 30. SERVO SYSTEM 46
  {
    id: 'servo-system-46',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO SYSTEM 46 Industrial Hydraulic Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 46',
    description: 'Standard medium-viscosity hydraulic oil formulated with anti-wear additives, anti-foam agents, and rust inhibitors for industrial hydraulic pumps.',
    price_inr: 4350.00,
    unit: '20 Liter Bucket',
    stock_qty: 85,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '46 cSt',
      'Flash Point': '218°C'
    },
    is_bulk_available: true
  },

  // 31. SERVO SYSTEM 68
  {
    id: 'servo-system-68',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO SYSTEM 68 General Purpose Hydraulic Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'ISO VG 68',
    description: 'Heavy duty anti-wear hydraulic fluid for industrial power packs, plastic molding machines, and heavy machinery hydraulic circuits.',
    price_inr: 4450.00,
    unit: '20 Liter Bucket',
    stock_qty: 95,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Viscosity @ 40°C': '68 cSt',
      'Flash Point': '224°C'
    },
    is_bulk_available: true
  },

  // 32. SERVO SYSTEM HLP 68
  {
    id: 'servo-system-hlp-68',
    category_id: 'cat-5',
    category_slug: 'grease',
    name: 'SERVO SYSTEM HLP 68 High Performance Hydraulic Oil',
    brand: 'Indian Oil (Servo)',
    grade: 'DIN 51524 Part 2 HLP',
    description: 'Premium DIN 51524 Part 2 HLP compliant hydraulic fluid providing thermal stability, rapid air release, and filterability for modern CNC hydraulics.',
    price_inr: 4750.00,
    unit: '20 Liter Bucket',
    stock_qty: 70,
    image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Standard': 'DIN 51524 Part 2 HLP',
      'Viscosity @ 40°C': '68 cSt'
    },
    is_bulk_available: true
  },

  // 33. Strainer Filter 120 Mesh
  {
    id: 'furnace-oil-strainer-120mesh',
    category_id: 'cat-1',
    category_slug: 'industrial-fuel',
    name: 'Furnace Oil Strainer Filter 120 Mesh',
    brand: 'Lubeswala',
    grade: '120 Mesh Stainless Steel',
    description: 'Heavy duty stainless steel 120-mesh simplex fuel strainer for furnace oil, LDO, and heavy liquid fuel burner supply pipelines.',
    price_inr: 1250.00,
    unit: '1 Unit Stainless Steel Filter',
    stock_qty: 180,
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Mesh Rating': '120 Mesh SS304 Wire',
      'Application': 'Furnace Oil & LDO Burner Lines',
      'Pressure Rating': '10 Bar Max'
    },
    is_bulk_available: false
  },

  // 34. TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5
  {
    id: 'totalenergies-quartz-8000-real',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5, API SL/CF Fully Synthetic (3.5L)',
    brand: 'TotalEnergies',
    grade: '5W-30 Fully Synthetic',
    description: 'Fully synthetic high-performance motor oil formulated for modern petrol & diesel engines delivering maximum fuel economy and engine protection.',
    price_inr: 2850.00,
    unit: '3.5 Liter Can',
    stock_qty: 110,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'ACEA Standard': 'A5 / B5',
      'API Rating': 'SL / CF',
      'Viscosity': '5W-30 Full Synthetic'
    },
    is_bulk_available: false
  },

  // 35. TRACTOR GREEN 15W - 40
  {
    id: 'tractor-green-15w40-real',
    category_id: 'cat-2',
    category_slug: 'engine-oil',
    name: 'TRACTOR GREEN 15W - 40 Multi-Purpose Engine Oil',
    brand: 'Indian Oil (Servo)',
    grade: '15W-40 Universal',
    description: 'Universal tractor transmission & engine lubricant designed for agricultural tractors, harvesters, and farm machinery operating under heavy field loads.',
    price_inr: 3650.00,
    unit: '15 Liter Bucket',
    stock_qty: 90,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
    spec_sheet: {
      'Application': 'Tractor Engine + Hydraulics + PTO',
      'API Rating': 'CF-4 / GL-4'
    },
    is_bulk_available: true
  }
];
