import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, QuoteItem, QuoteRequest, Order } from '@/types';
import { RoutedOrder } from '@/lib/orderRouting';
import { INITIAL_DEALERS } from '@/lib/dealers';

interface CartStore {
  cart: CartItem[];
  quoteItems: QuoteItem[];
  savedQuotes: QuoteRequest[];
  savedOrders: Order[];
  compareItems: Product[];
  routedOrders: RoutedOrder[];
  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  addToQuote: (product: Product, quantity?: number) => void;
  removeFromQuote: (productId: string) => void;
  updateQuoteQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  
  addQuoteRequest: (quote: QuoteRequest) => void;
  addOrder: (order: Order) => void;

  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;

  addRoutedOrder: (order: RoutedOrder) => void;
  updateOrderStatus: (orderId: string, status: RoutedOrder['status']) => void;
}

const INITIAL_ROUTED_ORDERS: RoutedOrder[] = [
  {
    orderId: 'ORD-8821',
    customerName: 'Srinivas Rao (Apex Industries)',
    customerPhone: '+91 93966 28880',
    pincode: '500001',
    address: 'Plot 12, Nacharam Industrial Area, Hyderabad',
    items: [
      {
        product: {
          id: 'lubes-bitumen-drum-vg30',
          category_id: 'cat-3',
          category_slug: 'bitumen',
          name: 'Bitumen Drum VG 30 - 225 kgs(220 liters)',
          brand: 'Lubeswala',
          grade: 'Bitumen Drum',
          description: 'Official Bitumen Drum VG 30 - 225 kgs(220 liters) from Lubeswala.',
          price_inr: 15340,
          unit: '225 Kg Steel Drum',
          stock_qty: 150,
          image_url: 'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/bitumen_drum_white_background.png?v=1753145150',
          spec_sheet: {},
          is_bulk_available: true
        },
        quantity: 2
      }
    ],
    totalAmount: 30680,
    assignedDealer: INITIAL_DEALERS[0], // PetroBazaar HQ Nacharam
    distanceKm: 2.4,
    estimatedDeliveryTime: '2-Hour Local Express Delivery',
    source: 'Online Auto-Routed',
    status: 'assigned',
    createdAt: '10 minutes ago'
  },
  {
    orderId: 'ORD-8822',
    customerName: 'Walk-in Workshop Counter',
    customerPhone: '+91 98765 00000',
    pincode: '500037',
    address: 'Over-the-counter Balanagar Outlet',
    items: [
      {
        product: {
          id: 'lubes-servo-4t-20w40-4-stroke-engine-oil-two-wheelers',
          category_id: 'cat-2',
          category_slug: 'engine-oil',
          name: 'SERVO 4T 20W40',
          brand: 'Indian Oil',
          grade: 'Four-Stroke Motorcycle Oil',
          description: 'Official SERVO 4T 20W40',
          price_inr: 340,
          unit: '1 Litre Bottle',
          stock_qty: 150,
          image_url: 'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_4T_20W40_front_-removebg-preview.png?v=1740700386',
          spec_sheet: {},
          is_bulk_available: false
        },
        quantity: 5
      }
    ],
    totalAmount: 1700,
    assignedDealer: INITIAL_DEALERS[5], // Balanagar Express Outlet
    distanceKm: 0.1,
    estimatedDeliveryTime: 'Instant Counter Sale (QR POS)',
    source: 'Offline Counter',
    status: 'delivered',
    createdAt: '1 hour ago'
  }
];

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      quoteItems: [],
      savedQuotes: [],
      savedOrders: [],
      compareItems: [],
      routedOrders: INITIAL_ROUTED_ORDERS,

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: quantity <= 0
            ? state.cart.filter((item) => item.product.id !== productId)
            : state.cart.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
              ),
        })),

      clearCart: () => set({ cart: [] }),

      addToQuote: (product, quantity = 1) =>
        set((state) => {
          const existing = state.quoteItems.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              quoteItems: state.quoteItems.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { quoteItems: [...state.quoteItems, { product, quantity }] };
        }),

      removeFromQuote: (productId) =>
        set((state) => ({
          quoteItems: state.quoteItems.filter((item) => item.product.id !== productId),
        })),

      updateQuoteQuantity: (productId, quantity) =>
        set((state) => ({
          quoteItems: quantity <= 0
            ? state.quoteItems.filter((item) => item.product.id !== productId)
            : state.quoteItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
              ),
        })),

      clearQuote: () => set({ quoteItems: [] }),

      addQuoteRequest: (quote) =>
        set((state) => ({
          savedQuotes: [quote, ...state.savedQuotes],
        })),

      addOrder: (order) =>
        set((state) => ({
          savedOrders: [order, ...state.savedOrders],
        })),

      addToCompare: (product) =>
        set((state) => {
          if (state.compareItems.some((p) => p.id === product.id)) return state;
          if (state.compareItems.length >= 4) {
            alert('You can compare up to 4 products at a time.');
            return state;
          }
          return { compareItems: [...state.compareItems, product] };
        }),

      removeFromCompare: (productId) =>
        set((state) => ({
          compareItems: state.compareItems.filter((p) => p.id !== productId),
        })),

      toggleCompare: (product) =>
        set((state) => {
          const exists = state.compareItems.some((p) => p.id === product.id);
          if (exists) {
            return { compareItems: state.compareItems.filter((p) => p.id !== product.id) };
          }
          if (state.compareItems.length >= 4) {
            alert('You can compare up to 4 products at a time.');
            return state;
          }
          return { compareItems: [...state.compareItems, product] };
        }),

      clearCompare: () => set({ compareItems: [] }),

      addRoutedOrder: (order) =>
        set((state) => ({
          routedOrders: [order, ...state.routedOrders]
        })),

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          routedOrders: state.routedOrders.map((o) =>
            o.orderId === orderId ? { ...o, status } : o
          )
        }))
    }),
    {
      name: 'lubeswala_cart_store',
      storage: createJSONStorage(() => localStorage),
      skipHydration: false
    }
  )
);
