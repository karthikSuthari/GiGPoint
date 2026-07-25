import { create } from 'zustand';
import { CartItem, Product, QuoteItem, QuoteRequest, Order } from '@/types';

interface CartStore {
  cart: CartItem[];
  quoteItems: QuoteItem[];
  savedQuotes: QuoteRequest[];
  savedOrders: Order[];
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
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  quoteItems: [],
  savedQuotes: [],
  savedOrders: [],

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
}));
