export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface SpecSheet {
  [key: string]: string;
}

export interface Product {
  id: string;
  category_id?: string;
  category_slug: string;
  name: string;
  brand: string;
  grade: string;
  description: string;
  price_inr: number;
  unit: string;
  stock_qty: number;
  image_url: string;
  spec_sheet: SpecSheet;
  is_bulk_available: boolean;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  business_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  delivery_pincode: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  notes?: string;
  items: QuoteItem[];
  total_items: number;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  total_inr: number;
  payment_method: string;
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}
