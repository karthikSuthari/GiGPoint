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

-- RLS & Grants (Postgres Post-2026 Security Compliance)
GRANT SELECT ON categories, products TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON quote_requests, quote_items, orders TO anon, authenticated;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products read" ON products FOR SELECT USING (true);
CREATE POLICY "Public quote insert" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public quote select" ON quote_requests FOR SELECT USING (true);
CREATE POLICY "Public orders insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public orders select" ON orders FOR SELECT USING (true);

-- =========================================================
-- SEED DATA
-- =========================================================

INSERT INTO categories (name, slug, icon) VALUES
('Engine Oil', 'engine-oil', 'Droplet'),
('Brake Fluid', 'brake-fluid', 'Disc'),
('Grease & Lubricants', 'grease', 'Wrench'),
('Industrial Oil', 'industrial-oil', 'Factory'),
('Coolant & Radiator', 'coolant', 'Thermometer')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_slug, name, brand, grade, description, price_inr, unit, stock_qty, image_url, spec_sheet, is_bulk_available) VALUES
(
  'engine-oil',
  'HP Laal Ghoda 20W-40 Diesel Engine Oil',
  'HP Lubes',
  '20W-40',
  'Heavy-duty diesel engine oil specially formulated for commercial trucks, tractors, and heavy machinery operating under severe conditions.',
  3450.00,
  '15 Liter Bucket',
  120,
  'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
  '{"API Standard": "CF-4 / SG", "Kinematic Viscosity @ 100°C": "14.5 cSt", "Flash Point": "230°C", "Pour Point": "-21°C", "Recommended Change Interval": "10,000 KM"}',
  true
),
(
  'engine-oil',
  'Servo Futura D 15W-40 Synthetic Engine Oil',
  'Servo',
  '15W-40',
  'Premium synthetic diesel engine oil offering maximum oxidation stability, soot control, and extended drain intervals for modern BS-VI engines.',
  4100.00,
  '15 Liter Can',
  85,
  'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
  '{"API Standard": "CI-4 Plus / SL", "Kinematic Viscosity @ 100°C": "15.1 cSt", "Flash Point": "235°C", "Pour Point": "-27°C", "Sulfated Ash": "1.2%"}',
  true
),
(
  'brake-fluid',
  'Servo Brake Fluid DOT 4 High Performance',
  'Servo',
  'DOT 4',
  'Heavy-duty hydraulic brake fluid designed for drum & disc brake systems in passenger cars, commercial fleet, and heavy transport.',
  280.00,
  '500 ml Bottle',
  250,
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
  '{"Dry Boiling Point": "260°C", "Wet Boiling Point": "165°C", "Viscosity @ -40°C": "1400 cSt", "Standard": "FMVSS 116 DOT 4"}',
  false
),
(
  'grease',
  'Servo Grease MP Lithium-Based Heavy Duty',
  'Servo',
  'NLGI 2',
  'Multi-purpose lithium soap grease providing excellent mechanical stability, water resistance, and rust protection for wheel bearings and chassis.',
  1850.00,
  '5 kg Container',
  60,
  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
  '{"Soap Type": "Lithium", "Base Oil Viscosity @ 40°C": "150 cSt", "Drop Point": "190°C", "Penetration @ 25°C": "265-295"}',
  true
),
(
  'industrial-oil',
  'Lubeswala Premium Furnace Oil Heavy Industrial',
  'Lubeswala',
  'FO Grade 180',
  'High-calorific liquid fuel derived from crude distillation. Designed for industrial furnaces, boilers, heat treatment plants, and power generation.',
  52.50,
  'Liter (Bulk)',
  10000,
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  '{"Gross Calorific Value": "10,200 kcal/kg", "Viscosity @ 50°C": "180 cSt", "Flash Point": "66°C", "Sulfur Content": "< 3.5%", "Minimum Order": "500 Liters"}',
  true
),
(
  'coolant',
  'Servo Kool Plus Heavy Duty Radiator Coolant',
  'Servo',
  'JIS K 2234',
  'Ethylene glycol-based long-life radiator coolant concentrate. Prevents engine overheating, freezing, scale formation, and corrosion.',
  650.00,
  '3 Liter Can',
  140,
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  '{"Boiling Point (50% Dilution)": "128°C", "Freezing Point": "-36°C", "Color": "Fluorescent Green", "Mixing Ratio": "1 Part Coolant : 3 Parts Water"}',
  true
);
