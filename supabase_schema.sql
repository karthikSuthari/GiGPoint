-- =========================================================
-- Lubeswala.com — Supabase Postgres Migration Script
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  grade TEXT NOT NULL,
  description TEXT,
  price_inr NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL,
  stock_qty INT DEFAULT 50,
  image_url TEXT,
  spec_sheet JSONB,
  is_bulk_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Quotation Requests Table (B2B RFQ Flow)
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  delivery_pincode TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'quoted', 'accepted', 'rejected')) DEFAULT 'pending',
  notes TEXT,
  total_items INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Quotation Items
CREATE TABLE IF NOT EXISTS quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_request_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INT NOT NULL
);

-- 5. Orders Table (Direct Retail Checkout)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address JSONB NOT NULL,
  total_inr NUMERIC(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'Pay on Delivery',
  status TEXT CHECK (status IN ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'placed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS & Grants (Postgres Security Compliance)
GRANT ALL ON categories, products, quote_requests, quote_items, orders TO anon, authenticated;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public categories read" ON categories;
DROP POLICY IF EXISTS "Public products read" ON products;
DROP POLICY IF EXISTS "Public products insert" ON products;
DROP POLICY IF EXISTS "Public products update" ON products;
DROP POLICY IF EXISTS "Public products delete" ON products;
DROP POLICY IF EXISTS "Public quote insert" ON quote_requests;
DROP POLICY IF EXISTS "Public quote select" ON quote_requests;
DROP POLICY IF EXISTS "Public orders insert" ON orders;
DROP POLICY IF EXISTS "Public orders select" ON orders;

CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products read" ON products FOR SELECT USING (true);
CREATE POLICY "Public products insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public products update" ON products FOR UPDATE USING (true);
CREATE POLICY "Public products delete" ON products FOR DELETE USING (true);
CREATE POLICY "Public quote insert" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public quote select" ON quote_requests FOR SELECT USING (true);
CREATE POLICY "Public orders insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public orders select" ON orders FOR SELECT USING (true);

-- =========================================================
-- SEED DATA (35 REAL LUBESWALA PRODUCTS WITH SHOPIFY CDN IMAGES)
-- =========================================================


INSERT INTO categories (name, slug, icon) VALUES
('Industrial Fuel Oils (FO/LDO)', 'industrial-fuel', 'Factory'),
('Engine & Diesel Oils', 'engine-oil', 'Droplet'),
('Bitumen & Construction', 'bitumen', 'Layers'),
('Pyrolysis & Bio-Fuels', 'pyrolysis-bio', 'Flame'),
('Grease & Special Lubricants', 'grease', 'Wrench'),
('Brake Fluids & Coolants', 'coolant-brake', 'Thermometer')
ON CONFLICT (slug) DO NOTHING;


-- Truncate old sample products before inserting 35 real Lubeswala products
TRUNCATE TABLE products CASCADE;

INSERT INTO products (category_slug, name, brand, grade, description, price_inr, unit, stock_qty, image_url, spec_sheet, is_bulk_available) VALUES
(
  'engine-oil',
  'HP Transformer Oil - 10 ltrs',
  'Lubeswala',
  'Industrial Grade',
  'Official HP Transformer Oil - 10 ltrs from Lubeswala. High quality guaranteed sealed container.',
  2360,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/transformeroil10ltrs.png?v=1754127773',
  '{"Manufacturer":"Lubeswala","Product SKU":"hp-transformer-oil-10-ltrs","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'industrial-fuel',
  'Strainer Filter 120 Mesh',
  'Lubeswala',
  'Fuel Accessories',
  'Official Strainer Filter 120 Mesh from Lubeswala. High quality guaranteed sealed container.',
  5600,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/refined_basket_strainer.png?v=1753922663',
  '{"Manufacturer":"Lubeswala","Product SKU":"furnace-oil-strainer","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'engine-oil',
  'HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (500 ml)',
  'HP',
  'Diesel Engine Oil',
  'Official HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (500 ml) from Lubeswala. High quality guaranteed sealed container.',
  174,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/laalghoda500ml.jpg?v=1753663384',
  '{"Manufacturer":"HP","Product SKU":"hp-laalghoda-500-ml","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'bitumen',
  'Bitumen Drum VG 30 - 225 kgs(220 liters)',
  'Lubeswala',
  'Bitumen Drum',
  'Official Bitumen Drum VG 30 - 225 kgs(220 liters) from Lubeswala. High quality guaranteed sealed container.',
  15340,
  '225 Kg Steel Drum',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/bitumen_drum_white_background.png?v=1753145150',
  '{"Manufacturer":"Lubeswala","Product SKU":"bitumen-drum-1","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'industrial-fuel',
  'Furnace Oil (FO) - 225 kgs (220 liters)',
  'Lubeswala',
  'Industrial Fuel',
  'Official Furnace Oil (FO) - 225 kgs (220 liters) from Lubeswala. High quality guaranteed sealed container.',
  14160,
  '225 Kg Steel Drum',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/ChatGPTImageJul17_2025_10_59_27PM.png?v=1752776080',
  '{"Manufacturer":"Lubeswala","Product SKU":"furnace-oil-fo-1","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'industrial-fuel',
  'Light Diesel Oil (LDO) - 207 kgs (220 liters)',
  'Lubeswala',
  'Industrial Grade',
  'Official Light Diesel Oil (LDO) - 207 kgs (220 liters) from Lubeswala. High quality guaranteed sealed container.',
  19116,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/ChatGPTImageJul18_2025_12_33_05AM.png?v=1752803079',
  '{"Manufacturer":"Lubeswala","Product SKU":"light-diesel-oil-ldo","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'HP Enclo 68',
  'Lubeswala',
  'Industrial Lubricants',
  'Official HP Enclo 68 from Lubeswala. High quality guaranteed sealed container.',
  23250,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/n7pYRfT57Vdr.jpg?v=1752578562',
  '{"Manufacturer":"Lubeswala","Product SKU":"hp-enclo-68","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'engine-oil',
  'HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (1 Litre)',
  'HP',
  'Heavy Duty Diesel Engine Oils',
  'Official HP Lubricants Laal Ghoda 20w-40 Synthetic Engine Oil Suitable for Diesel Engines (1 Litre) from Lubeswala. High quality guaranteed sealed container.',
  230,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/HP_Laal_Ghoda_20W-40_upscaled.png?v=1736078260',
  '{"Manufacturer":"HP","Product SKU":"hp-laal-ghoda-20w-40-synthetic-engine-oil-suitable-for-diesel-engines-1-litre","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'engine-oil',
  'HP DEF - Diesel Exhaust Fluid 20 Litres',
  'HP',
  'Industrial Grade',
  'Official HP DEF - Diesel Exhaust Fluid 20 Litres from Lubeswala. High quality guaranteed sealed container.',
  1200,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/hpadblueimage.webp?v=1736076047',
  '{"Manufacturer":"HP","Product SKU":"hp-def-diesel-exhaust-fluid-20-litres","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'engine-oil',
  'SERVO 4T 20W40',
  'Indian Oil',
  'Four-Stroke Motorcycle Oil',
  'Official SERVO 4T 20W40 from Lubeswala. High quality guaranteed sealed container.',
  46054,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_4T_20W40_front_-removebg-preview.png?v=1740700386',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-4t-20w40-4-stroke-engine-oil-two-wheelers","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'engine-oil',
  'SERVO 2T SUPREME',
  'Indian Oil',
  'Two-Stroke Engine Oil',
  'Official SERVO 2T SUPREME from Lubeswala. High quality guaranteed sealed container.',
  62180,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_2T_Supreme_front_-removebg-preview.png?v=1740700217',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-2t-supreme","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO PREMIUM CF - 4 15W - 40',
  'Indian Oil',
  'Passenger Car Motor Oil',
  'Official SERVO PREMIUM CF - 4 15W - 40 from Lubeswala. High quality guaranteed sealed container.',
  49956,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Premium_CF-4_15W-40_front_-removebg-preview.png?v=1740699985',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-premium-cf-4-15w-40","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO SUPER 20W - 40 MG',
  'Indian Oil',
  'Heavy-Duty Diesel Engine Oil',
  'Official SERVO SUPER 20W - 40 MG from Lubeswala. High quality guaranteed sealed container.',
  43452,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Super_20W-40MG_front_-removebg-preview.png?v=1740699902',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-super-20w-40-mg","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO GEM HTXX',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO GEM HTXX from Lubeswala. High quality guaranteed sealed container.',
  48933,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_HTXX_front_-removebg-preview.png?v=1740556971',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-gem-htxx","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO Gem 3',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO Gem 3 from Lubeswala. High quality guaranteed sealed container.',
  49159,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_3_front_-removebg-preview.png?v=1740699583',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-gem-3","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO Gem 2',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO Gem 2 from Lubeswala. High quality guaranteed sealed container.',
  47806,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_2_front_-removebg-preview.png?v=1740699795',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-gem-2","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO GEM EP 2',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO GEM EP 2 from Lubeswala. High quality guaranteed sealed container.',
  49610,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_EP2_front_-removebg-preview.png?v=1740556905',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-gem-ep-2","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO MESH SP 320',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO MESH SP 320 from Lubeswala. High quality guaranteed sealed container.',
  40329,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Mesh_SP_320_front_-removebg-preview.png?v=1740729928',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-mesh-sp-320","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO MESH SP 220',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO MESH SP 220 from Lubeswala. High quality guaranteed sealed container.',
  39289,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Mesh_SP_220_front_-removebg-preview.png?v=1740730399',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-mesh-sp-220","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO SYSTEM 220',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO SYSTEM 220 from Lubeswala. High quality guaranteed sealed container.',
  40069,
  '20 Liter Container',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_220_front_-removebg-preview.png?v=1740730717',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-system-220","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO CUT S',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO CUT S from Lubeswala. High quality guaranteed sealed container.',
  35126,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Cust_S_front_-removebg-preview.png?v=1740818800',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-cut-s","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO SYSTEM HLP 68',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO SYSTEM HLP 68 from Lubeswala. High quality guaranteed sealed container.',
  36166,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/ServoSystemHLP68_front.webp?v=1740477286',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-system-hlp-68","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO HYDRA SHAKTHI 68',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO HYDRA SHAKTHI 68 from Lubeswala. High quality guaranteed sealed container.',
  3511.33,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_hydraShakti_68_front_-removebg-preview.png?v=1740476881',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-hydra-shakthi-68","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'grease',
  'SERVO SYSTEM 68',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO SYSTEM 68 from Lubeswala. High quality guaranteed sealed container.',
  34865,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_68_front.png?v=1740476560',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-system-68","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO SYSTEM 46',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO SYSTEM 46 from Lubeswala. High quality guaranteed sealed container.',
  31743,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_46_front.jpg?v=1740476536',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-system-46","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO SYSTEM 32',
  'Indian Oil',
  'Industrial Lubricants',
  'Official SERVO SYSTEM 32 from Lubeswala. High quality guaranteed sealed container.',
  30702,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_System_32_front.png?v=1740475979',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-system-32","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'coolant-brake',
  'SERVO BRAKE FLUID DOT -4',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official SERVO BRAKE FLUID DOT -4 from Lubeswala. High quality guaranteed sealed container.',
  91.25,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Brake_Fluid_dot_4_front_-removebg-preview_b1d9eb9e-d517-4f4d-9cf5-829a18d095a6.png?v=1740919360',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-brake-fluid-dot-4","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'coolant-brake',
  'SERVO BRAKE FLUID SUPER HD',
  'Indian Oil',
  'Multigrade Engine Oil',
  'Official SERVO BRAKE FLUID SUPER HD from Lubeswala. High quality guaranteed sealed container.',
  96.75,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Brake_Fluid_Super_HD_500ml_-removebg-preview.png?v=1740924166',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-brake-fluid-super-hd","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'coolant-brake',
  'SERVO KOOL READY',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official SERVO KOOL READY from Lubeswala. High quality guaranteed sealed container.',
  40850,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Kool_Ready_front_-removebg-preview.png?v=1740924370',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-kool-ready","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'coolant-brake',
  'SERVO KOOL PLUS',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official SERVO KOOL PLUS from Lubeswala. High quality guaranteed sealed container.',
  60884,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Kool_Ready_Plus_front_-removebg-preview.png?v=1740924397',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-kool-plus","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'engine-oil',
  'TRACTOR GREEN 15W - 40',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official TRACTOR GREEN 15W - 40 from Lubeswala. High quality guaranteed sealed container.',
  1923.9,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Tractor_Green_15W-40_front_-removebg-preview.png?v=1740924612',
  '{"Manufacturer":"Indian Oil","Product SKU":"tractor-green-15w-40","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
),
(
  'grease',
  'SERVO GEM RR 3',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official SERVO GEM RR 3 from Lubeswala. High quality guaranteed sealed container.',
  78924,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Gem_RR3_front_-removebg-preview.png?v=1740730240',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-gem-rr-3","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO Grease MP 3',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official SERVO Grease MP 3 from Lubeswala. High quality guaranteed sealed container.',
  63139,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Grease_MP3_front_-removebg-preview.png?v=1740918894',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-indian-oil-grease-mp-3","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'grease',
  'SERVO Long Life Grease',
  'Indian Oil',
  'General Automotive Lubricant',
  'Official SERVO Long Life Grease from Lubeswala. High quality guaranteed sealed container.',
  68777,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_Long_Life_Grease_front_-removebg-preview.png?v=1740918548',
  '{"Manufacturer":"Indian Oil","Product SKU":"servo-long-life-grease-indian-oil","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  true
),
(
  'engine-oil',
  'TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5, API SL/CF Fully Synthetic | Engine Oil for Cars (3.5L)',
  'TotalEnergies',
  'Passenger Car Engine Oils',
  'Official TotalEnergies Quartz 8000 NFC 5W-30 ACEA A5/B5, API SL/CF Fully Synthetic | Engine Oil for Cars (3.5L) from Lubeswala. High quality guaranteed sealed container.',
  2478,
  '1 Unit',
  150,
  'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/71xd2PlW0vL._SY879.jpg?v=1731822099',
  '{"Manufacturer":"TotalEnergies","Product SKU":"totalenergies-quartz-8000-nfc-5w-30-acea-a5-b5-api-sl-cf-fully-synthetic-engine-oil-for-cars-3-5l","Authenticity":"100% Sealed Factory Pack"}'::jsonb,
  false
);
