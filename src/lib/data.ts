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
    "id": "lubes-hp-transformer-oil-10-ltrs",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "HP Transformer Oil - 10 ltrs",
    "brand": "Lubeswala",
    "grade": "Industrial Grade",
    "description": "Official HP Transformer Oil - 10 ltrs from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 2360,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/transformeroil10ltrs.png?v=1754127773",
    "spec_sheet": {
      "Manufacturer": "Lubeswala",
      "Product SKU": "hp-transformer-oil-10-ltrs",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-furnace-oil-strainer",
    "category_id": "cat-1",
    "category_slug": "industrial-fuel",
    "name": "Strainer Filter 120 Mesh",
    "brand": "Lubeswala",
    "grade": "Fuel Accessories",
    "description": "Official Strainer Filter 120 Mesh from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 5600,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/refined_basket_strainer.png?v=1753922663",
    "spec_sheet": {
      "Manufacturer": "Lubeswala",
      "Product SKU": "furnace-oil-strainer",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-hp-laalghoda-500-ml",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (500 ml)",
    "brand": "HP",
    "grade": "Diesel Engine Oil",
    "description": "Official HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (500 ml) from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 174,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/laalghoda500ml.jpg?v=1753663384",
    "spec_sheet": {
      "Manufacturer": "HP",
      "Product SKU": "hp-laalghoda-500-ml",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-bitumen-drum-1",
    "category_id": "cat-3",
    "category_slug": "bitumen",
    "name": "Bitumen Drum VG 30 - 225 kgs(220 liters)",
    "brand": "Lubeswala",
    "grade": "Bitumen Drum",
    "description": "Official Bitumen Drum VG 30 - 225 kgs(220 liters) from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 15340,
    "unit": "225 Kg Steel Drum",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/bitumen_drum_white_background.png?v=1753145150",
    "spec_sheet": {
      "Manufacturer": "Lubeswala",
      "Product SKU": "bitumen-drum-1",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-furnace-oil-fo-1",
    "category_id": "cat-1",
    "category_slug": "industrial-fuel",
    "name": "Furnace Oil (FO) - 225 kgs (220 liters)",
    "brand": "Lubeswala",
    "grade": "Industrial Fuel",
    "description": "Official Furnace Oil (FO) - 225 kgs (220 liters) from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 14160,
    "unit": "225 Kg Steel Drum",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/ChatGPTImageJul17_2025_10_59_27PM.png?v=1752776080",
    "spec_sheet": {
      "Manufacturer": "Lubeswala",
      "Product SKU": "furnace-oil-fo-1",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-light-diesel-oil-ldo",
    "category_id": "cat-1",
    "category_slug": "industrial-fuel",
    "name": "Light Diesel Oil (LDO) - 207 kgs (220 liters)",
    "brand": "Lubeswala",
    "grade": "Industrial Grade",
    "description": "Official Light Diesel Oil (LDO) - 207 kgs (220 liters) from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 19116,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/ChatGPTImageJul18_2025_12_33_05AM.png?v=1752803079",
    "spec_sheet": {
      "Manufacturer": "Lubeswala",
      "Product SKU": "light-diesel-oil-ldo",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-hp-enclo-68",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "HP Enclo 68",
    "brand": "Lubeswala",
    "grade": "Industrial Lubricants",
    "description": "Official HP Enclo 68 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 23250,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/n7pYRfT57Vdr.jpg?v=1752578562",
    "spec_sheet": {
      "Manufacturer": "Lubeswala",
      "Product SKU": "hp-enclo-68",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-hp-laal-ghoda-20w-40-synthetic-engine-oil-suitable-for-diesel-engines-1-litre",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (1 Litre)",
    "brand": "HP",
    "grade": "Heavy Duty Diesel Engine Oils",
    "description": "Official HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (1 Litre) from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 230,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/HP_Laal_Ghoda_20W-40_upscaled.png?v=1736078260",
    "spec_sheet": {
      "Manufacturer": "HP",
      "Product SKU": "hp-laal-ghoda-20w-40-synthetic-engine-oil-suitable-for-diesel-engines-1-litre",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-hp-def-diesel-exhaust-fluid-20-litres",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "HP DEF - Diesel Exhaust Fluid 20 Litres",
    "brand": "HP",
    "grade": "Industrial Grade",
    "description": "Official HP DEF - Diesel Exhaust Fluid 20 Litres from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 1200,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/hpadblueimage.webp?v=1736076047",
    "spec_sheet": {
      "Manufacturer": "HP",
      "Product SKU": "hp-def-diesel-exhaust-fluid-20-litres",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-servo-4t-20w40-4-stroke-engine-oil-two-wheelers",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "SERVO 4T 20W40",
    "brand": "Indian Oil",
    "grade": "Four-Stroke Motorcycle Oil",
    "description": "Official SERVO 4T 20W40 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 46054,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_4T_20W40_front_-removebg-preview.png?v=1740700386",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-4t-20w40-4-stroke-engine-oil-two-wheelers",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-2t-supreme",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "SERVO 2T SUPREME",
    "brand": "Indian Oil",
    "grade": "Two-Stroke Engine Oil",
    "description": "Official SERVO 2T SUPREME from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 62180,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_2T_Supreme_front_-removebg-preview.png?v=1740700217",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-2t-supreme",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-premium-cf-4-15w-40",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO PREMIUM CF - 4 15W - 40",
    "brand": "Indian Oil",
    "grade": "Passenger Car Motor Oil",
    "description": "Official SERVO PREMIUM CF - 4 15W - 40 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 49956,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Premium_CF-4_15W-40_front_-removebg-preview.png?v=1740699985",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-premium-cf-4-15w-40",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-super-20w-40-mg",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO SUPER 20W - 40 MG",
    "brand": "Indian Oil",
    "grade": "Heavy-Duty Diesel Engine Oil",
    "description": "Official SERVO SUPER 20W - 40 MG from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 43452,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Super_20W-40MG_front_-removebg-preview.png?v=1740699902",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-super-20w-40-mg",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-gem-htxx",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO GEM HTXX",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO GEM HTXX from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 48933,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_HTXX_front_-removebg-preview.png?v=1740556971",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-gem-htxx",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-gem-3",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO Gem 3",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO Gem 3 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 49159,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_3_front_-removebg-preview.png?v=1740699583",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-gem-3",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-gem-2",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO Gem 2",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO Gem 2 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 47806,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_2_front_-removebg-preview.png?v=1740699795",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-gem-2",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-gem-ep-2",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO GEM EP 2",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO GEM EP 2 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 49610,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_EP2_front_-removebg-preview.png?v=1740556905",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-gem-ep-2",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-mesh-sp-320",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO MESH SP 320",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO MESH SP 320 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 40329,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Mesh_SP_320_front_-removebg-preview.png?v=1740729928",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-mesh-sp-320",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-mesh-sp-220",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO MESH SP 220",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO MESH SP 220 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 39289,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Mesh_SP_220_front_-removebg-preview.png?v=1740730399",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-mesh-sp-220",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-system-220",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO SYSTEM 220",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO SYSTEM 220 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 40069,
    "unit": "20 Liter Container",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_220_front_-removebg-preview.png?v=1740730717",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-system-220",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-cut-s",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO CUT S",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO CUT S from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 35126,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Cust_S_front_-removebg-preview.png?v=1740818800",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-cut-s",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-system-hlp-68",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO SYSTEM HLP 68",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO SYSTEM HLP 68 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 36166,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/ServoSystemHLP68_front.webp?v=1740477286",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-system-hlp-68",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-hydra-shakthi-68",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO HYDRA SHAKTHI 68",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO HYDRA SHAKTHI 68 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 3511.33,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_hydraShakti_68_front_-removebg-preview.png?v=1740476881",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-hydra-shakthi-68",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-servo-system-68",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO SYSTEM 68",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO SYSTEM 68 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 34865,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_68_front.png?v=1740476560",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-system-68",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-system-46",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO SYSTEM 46",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO SYSTEM 46 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 31743,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_46_front.jpg?v=1740476536",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-system-46",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-system-32",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO SYSTEM 32",
    "brand": "Indian Oil",
    "grade": "Industrial Lubricants",
    "description": "Official SERVO SYSTEM 32 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 30702,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_32_front.png?v=1740475979",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-system-32",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-brake-fluid-dot-4",
    "category_id": "cat-6",
    "category_slug": "coolant-brake",
    "name": "SERVO BRAKE FLUID DOT -4",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official SERVO BRAKE FLUID DOT -4 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 91.25,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Brake_Fluid_dot_4_front_-removebg-preview_b1d9eb9e-d517-4f4d-9cf5-829a18d095a6.png?v=1740919360",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-brake-fluid-dot-4",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-servo-brake-fluid-super-hd",
    "category_id": "cat-6",
    "category_slug": "coolant-brake",
    "name": "SERVO BRAKE FLUID SUPER HD",
    "brand": "Indian Oil",
    "grade": "Multigrade Engine Oil",
    "description": "Official SERVO BRAKE FLUID SUPER HD from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 96.75,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Brake_Fluid_Super_HD_500ml_-removebg-preview.png?v=1740924166",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-brake-fluid-super-hd",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-servo-kool-ready",
    "category_id": "cat-6",
    "category_slug": "coolant-brake",
    "name": "SERVO KOOL READY",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official SERVO KOOL READY from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 40850,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Kool_Ready_front_-removebg-preview.png?v=1740924370",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-kool-ready",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-kool-plus",
    "category_id": "cat-6",
    "category_slug": "coolant-brake",
    "name": "SERVO KOOL PLUS",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official SERVO KOOL PLUS from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 60884,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Kool_Ready_Plus_front_-removebg-preview.png?v=1740924397",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-kool-plus",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-tractor-green-15w-40",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "TRACTOR GREEN 15W - 40",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official TRACTOR GREEN 15W - 40 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 1923.9,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Tractor_Green_15W-40_front_-removebg-preview.png?v=1740924612",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "tractor-green-15w-40",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  },
  {
    "id": "lubes-servo-gem-rr-3",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO GEM RR 3",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official SERVO GEM RR 3 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 78924,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_RR3_front_-removebg-preview.png?v=1740730240",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-gem-rr-3",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-indian-oil-grease-mp-3",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO Grease MP 3",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official SERVO Grease MP 3 from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 63139,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Grease_MP3_front_-removebg-preview.png?v=1740918894",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-indian-oil-grease-mp-3",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-servo-long-life-grease-indian-oil",
    "category_id": "cat-5",
    "category_slug": "grease",
    "name": "SERVO Long Life Grease",
    "brand": "Indian Oil",
    "grade": "General Automotive Lubricant",
    "description": "Official SERVO Long Life Grease from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 68777,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Long_Life_Grease_front_-removebg-preview.png?v=1740918548",
    "spec_sheet": {
      "Manufacturer": "Indian Oil",
      "Product SKU": "servo-long-life-grease-indian-oil",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": true
  },
  {
    "id": "lubes-totalenergies-quartz-8000-nfc-5w-30-acea-a5-b5-api-sl-cf-fully-synthetic-engine-oil-for-cars-3-5l",
    "category_id": "cat-2",
    "category_slug": "engine-oil",
    "name": "TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5, API SL/CF Fully Synthetic | Engine Oil for Cars (3.5L)",
    "brand": "TotalEnergies",
    "grade": "Passenger Car Engine Oils",
    "description": "Official TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5, API SL/CF Fully Synthetic | Engine Oil for Cars (3.5L) from Lubeswala. High quality guaranteed sealed container.",
    "price_inr": 2478,
    "unit": "1 Unit",
    "stock_qty": 150,
    "image_url": "https://cdn.shopify.com/s/files/1/0795/3560/3991/files/71xd2PlW0vL._SY879.jpg?v=1731822099",
    "spec_sheet": {
      "Manufacturer": "TotalEnergies",
      "Product SKU": "totalenergies-quartz-8000-nfc-5w-30-acea-a5-b5-api-sl-cf-fully-synthetic-engine-oil-for-cars-3-5l",
      "Authenticity": "100% Sealed Factory Pack"
    },
    "is_bulk_available": false
  }
];
