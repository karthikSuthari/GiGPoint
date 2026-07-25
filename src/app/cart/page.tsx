'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, ShoppingBag, ArrowRight, FileText, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartQuantity = useCartStore((state) => state.updateCartQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price_inr * item.quantity,
    0
  );
  const gstEstimated = subtotal * 0.18; // 18% GST estimate
  const grandTotal = subtotal + gstEstimated;

  if (!mounted) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto my-8 p-6">
        <p className="text-xs font-semibold text-slate-400">Loading your saved cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto my-8 p-6 space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-[#0A4D8C] rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Retail Cart is Empty</h2>
        <p className="text-xs text-slate-500">Browse our petroleum & lubricant products catalog and add items to your cart.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-all"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Shopping Cart (Retail)</h1>
          <p className="text-xs text-slate-500">Review your selected lubricant products before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Line Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-extrabold bg-[#0A4D8C] text-white px-2 py-0.5 rounded">
                      {item.product.brand}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ₹ {item.product.price_inr.toLocaleString('en-IN')} / {item.product.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity controls & Price */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 block">
                    ₹ {(item.product.price_inr * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div className="text-xs text-amber-900 font-medium">
              Buying for a business or fleet? Convert this cart to a formal RFQ quotation.
            </div>
            <Link
              href="/request-quote"
              className="whitespace-nowrap text-xs font-bold bg-amber-200 hover:bg-amber-300 text-amber-950 px-3 py-1.5 rounded-lg border border-amber-300 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> Convert to RFQ
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({cart.length} items)</span>
              <span className="font-semibold text-slate-900">
                ₹ {subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated GST (18%)</span>
              <span className="font-semibold text-slate-900">
                ₹ {gstEstimated.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Transport / Dispatch</span>
              <span className="font-semibold text-emerald-600">FREE / Standard Rate</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
              <span>Total Payable</span>
              <span className="text-[#0A4D8C]">₹ {grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-sm font-bold py-3.5 rounded-xl shadow transition-all active:scale-95"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Secure Cash on Delivery or Net Banking on dispatch.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
