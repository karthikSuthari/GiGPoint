import { create } from 'zustand';
import { CartItem, Product, QuoteItem, QuoteRequest, Order } from '@/types';

interface CartStore {
  cart: CartItem[];
  quoteItems: QuoteItem[];
  savedQuotes: QuoteRequest[];
  savedOrders: Order[];
  compareItems: Product[];
  
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
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  quoteItems: [],
  savedQuotes: [],
  savedOrders: [],
  compareItems: [],

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
}));
