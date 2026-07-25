-- =========================================================
-- Lubeswala.com & PetroBazaar — Supabase Postgres Schema & Seeding
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Admin, Dealers / Stockists, Customers)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'dealer', 'customer')) NOT NULL DEFAULT 'customer',
  phone TEXT,
  company_name TEXT,
  pincode TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Dealers / Stockist Outlets Table
CREATE TABLE IF NOT EXISTS dealers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Regional Depot' | 'Authorized Stockist' | 'Express Outlet'
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  distance_km NUMERIC(5,2) DEFAULT 0.0,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  services JSONB DEFAULT '[]'::jsonb,
  is_open_now BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT
);

-- 4. Products Table (35 Real Lubeswala SKUs)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT,
  category_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  grade TEXT NOT NULL,
  description TEXT,
  price_inr NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL,
  stock_qty INT DEFAULT 150,
  image_url TEXT,
  spec_sheet JSONB DEFAULT '{}'::jsonb,
  is_bulk_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Orders Table (Retail & Bulk Checkouts)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address JSONB NOT NULL,
  total_inr NUMERIC(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'Pay on Delivery',
  status TEXT CHECK (status IN ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'placed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Routed Orders Table (Online Auto-Routed & Offline POS Sales)
CREATE TABLE IF NOT EXISTS routed_orders (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  pincode TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  dealer_id TEXT REFERENCES dealers(id),
  dealer_name TEXT NOT NULL,
  distance_km NUMERIC(5,2) DEFAULT 0.0,
  estimated_delivery_time TEXT DEFAULT '2-Hour Local Express Delivery',
  source TEXT CHECK (source IN ('Online Auto-Routed', 'Offline Counter')) DEFAULT 'Online Auto-Routed',
  status TEXT DEFAULT 'assigned',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS & Public Table Security Grants
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, postgres, service_role;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE routed_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public users read" ON users;
DROP POLICY IF EXISTS "Public users insert" ON users;
CREATE POLICY "Public users read" ON users FOR SELECT USING (true);
CREATE POLICY "Public users insert" ON users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public dealers read" ON dealers;
CREATE POLICY "Public dealers read" ON dealers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public categories read" ON categories;
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public products read" ON products;
DROP POLICY IF EXISTS "Public products insert" ON products;
DROP POLICY IF EXISTS "Public products update" ON products;
DROP POLICY IF EXISTS "Public products delete" ON products;
CREATE POLICY "Public products read" ON products FOR SELECT USING (true);
CREATE POLICY "Public products insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public products update" ON products FOR UPDATE USING (true);
CREATE POLICY "Public products delete" ON products FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public orders read" ON orders;
DROP POLICY IF EXISTS "Public orders insert" ON orders;
CREATE POLICY "Public orders read" ON orders FOR SELECT USING (true);
CREATE POLICY "Public orders insert" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public routed_orders read" ON routed_orders;
DROP POLICY IF EXISTS "Public routed_orders insert" ON routed_orders;
DROP POLICY IF EXISTS "Public routed_orders update" ON routed_orders;
CREATE POLICY "Public routed_orders read" ON routed_orders FOR SELECT USING (true);
CREATE POLICY "Public routed_orders insert" ON routed_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public routed_orders update" ON routed_orders FOR UPDATE USING (true);

-- =========================================================
-- SEED SAMPLE DATA: USERS & DEALER SHOPS
-- =========================================================

-- Seed Sample Users
TRUNCATE TABLE users CASCADE;
INSERT INTO users (id, name, email, role, phone, company_name, pincode) VALUES
('usr-admin-01', 'PetroBazaar Super Admin', 'admin@petrobazaar.com', 'admin', '+91 93966 28880', 'PetroBazaar Corporate', '500001'),
('usr-dealer-01', 'Srinivas Rao (Nacharam Depot Manager)', 'dealer.nacharam@petrobazaar.com', 'dealer', '+91 93966 28880', 'PetroBazaar Central Hub', '500001'),
('usr-dealer-02', 'Balanagar Stockist Manager', 'dealer.balanagar@petrobazaar.com', 'dealer', '+91 91234 56789', 'Lubeswala Express Outlet', '500037'),
('usr-dealer-03', 'Pune Hub Manager', 'dealer.pune@petrobazaar.com', 'dealer', '+91 98765 43210', 'MIDC Lubricants Hub', '411018'),
('usr-customer-01', 'Srinivas Rao', 'srinivas@apexindustries.in', 'customer', '+91 98888 77777', 'Apex Steel Industries', '500001'),
('usr-customer-02', 'Karthik Suthari', 'karthik@gigpoint.com', 'customer', '+91 97777 66666', 'GiGPoint Logistics Fleet', '500037');

-- Seed Sample Dealer Stockist Shops
TRUNCATE TABLE dealers CASCADE;
INSERT INTO dealers (id, name, type, city, state, pincode, address, phone, email, distance_km, lat, lng, services, is_open_now) VALUES
('dealer-hyd-hq', 'PetroBazaar Headquarters & Central Depot', 'Regional Depot', 'Hyderabad', 'Telangana', '500001', 'Plot 45, Industrial Development Area, Nacharam, Hyderabad', '+91 93966 28880', 'srinivas@petrobazaar.com', 2.40, 17.439900, 78.548200, '["Bulk Tanker Dispatch (FO/LDO)", "Bitumen VG-30 Drums", "HP/Servo Engine Oil Wholesale"]'::jsonb, true),
('dealer-pune-midc', 'Lubeswala West India Hub & MIDC Depot', 'Regional Depot', 'Pune', 'Maharashtra', '411018', 'Block W-12, Bhosari MIDC Industrial Zone, Pune', '+91 98765 43210', 'pune.depot@petrobazaar.com', 5.10, 18.629800, 73.847700, '["Furnace Oil FO 180", "LDO Tanker Trucking", "Pyrolysis Oil Bulk"]'::jsonb, true),
('dealer-mum-bhiwandi', 'PetroBazaar Mumbai Logistics Hub', 'Authorized Stockist', 'Mumbai', 'Maharashtra', '421302', 'Unit 8, Indian Corporation Logistics Park, Bhiwandi, Thane', '+91 98230 11223', 'mumbai.sales@petrobazaar.com', 8.70, 19.296700, 73.062800, '["Bitumen Drums & Tankers", "Servo/HP Lubes Wholesale", "Same-Day Dispatch"]'::jsonb, true),
('dealer-ahmedabad-sanand', 'Gujarat Industrial Fuel & Lubricant Depot', 'Regional Depot', 'Ahmedabad', 'Gujarat', '382110', 'Gate 2, GIDC Engineering Zone, Sanand, Ahmedabad', '+91 97129 44556', 'gujarat@petrobazaar.com', 12.30, 22.990400, 72.380400, '["Furnace Oil FO 180", "Low Viscosity Fuel Oil (LVFO)", "Plastic Pyrolysis Oil"]'::jsonb, true),
('dealer-chennai-hub', 'Chennai Port & South Logistics Hub', 'Authorized Stockist', 'Chennai', 'Tamil Nadu', '600058', 'Phase III, Ambattur Industrial Estate, Chennai', '+91 94440 88990', 'chennai@petrobazaar.com', 15.60, 13.114700, 80.154800, '["Marine Lubricants", "Diesel Engine Oil Buckets", "Hydraulic Brake Fluids"]'::jsonb, true),
('dealer-balanagar-express', 'Lubeswala Express Workshop Depot', 'Express Outlet', 'Hyderabad', 'Telangana', '500037', 'Shop 14, Auto Nagar Main Road, Balanagar, Hyderabad', '+91 91234 56789', 'express.balanagar@petrobazaar.com', 3.80, 17.469700, 78.441900, '["45-Min Express Pickup", "Engine Oil Pails (15L)", "Grease & Coolants"]'::jsonb, true);

-- Seed Sample Routed Orders
TRUNCATE TABLE routed_orders CASCADE;
INSERT INTO routed_orders (id, order_id, customer_name, customer_phone, pincode, address, items, total_amount, dealer_id, dealer_name, distance_km, estimated_delivery_time, source, status) VALUES
('rord-01', 'ORD-8821', 'Srinivas Rao (Apex Industries)', '+91 93966 28880', '500001', 'Plot 12, Nacharam Industrial Area, Hyderabad', '[{"quantity": 2, "product": {"name": "Bitumen Drum VG 30 - 225 kgs(220 liters)", "price_inr": 15340}}]'::jsonb, 30680.00, 'dealer-hyd-hq', 'PetroBazaar Headquarters & Central Depot', 2.40, '2-Hour Local Express Delivery', 'Online Auto-Routed', 'assigned'),
('rord-02', 'ORD-8822', 'Walk-in Workshop Counter', '+91 98765 00000', '500037', 'Over-the-counter Balanagar Outlet', '[{"quantity": 5, "product": {"name": "SERVO 4T 20W40", "price_inr": 340}}]'::jsonb, 1700.00, 'dealer-balanagar-express', 'Lubeswala Express Workshop Depot', 0.10, 'Instant Counter Sale (QR POS)', 'Offline Counter', 'delivered');
