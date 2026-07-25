'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Order } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useCartStore((state) => state.addOrder);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<Order | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price_inr * item.quantity,
    0
  );
  const grandTotal = subtotal * 1.18; // Subtotal + 18% GST

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !street || !city || !pincode) {
      alert('Please fill in all required delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_address: {
        street,
        city,
        state,
        pincode,
      },
      items: [...cart],
      total_inr: grandTotal,
      payment_method: paymentMethod,
      status: 'placed',
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase Postgres DB if configured
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('orders').insert({
          id: newOrder.id,
          customer_name: newOrder.customer_name,
          customer_phone: newOrder.customer_phone,
          delivery_address: newOrder.delivery_address,
          total_inr: newOrder.total_inr,
          payment_method: newOrder.payment_method,
          status: newOrder.status
        });
      } catch (err) {
        console.error('Supabase DB order insert error (falling back to client state):', err);
      }
    }

    addOrder(newOrder);
    clearCart();
    setOrderPlaced(newOrder);
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order Confirmed</span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Thank You, {orderPlaced.customer_name}!</h1>
          <p className="text-xs text-slate-500 mt-1">Your lubricant order has been received and sent to dispatch.</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Order Reference:</span>
            <span className="font-bold text-[#0A4D8C]">{orderPlaced.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Payment Mode:</span>
            <span className="font-bold text-slate-800">{orderPlaced.payment_method}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Total Amount:</span>
            <span className="font-bold text-slate-900">₹ {orderPlaced.total_inr.toLocaleString('en-IN')}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 text-slate-600">
            <span className="font-semibold block text-slate-800">Delivery Address:</span>
            {orderPlaced.delivery_address.street}, {orderPlaced.delivery_address.city}, {orderPlaced.delivery_address.state} - {orderPlaced.delivery_address.pincode}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/orders"
            className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white font-bold py-3 rounded-xl text-xs transition-all shadow"
          >
            Track Order Status
          </Link>
          <Link
            href="/"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-sm">Your cart is empty. Please add items to checkout.</p>
        <Link href="/" className="text-xs font-bold text-[#0A4D8C] underline mt-2 inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Checkout & Dispatch</h1>
          <p className="text-xs text-slate-500">Provide shipping address for direct transport delivery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Container */}
        <form onSubmit={handleSubmitOrder} className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Customer & Delivery Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name / Business Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pt-3 pb-2 border-b border-slate-100">
            2. Shipping Address
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Street Address / Workshop Location *</label>
            <input
              type="text"
              required
              placeholder="e.g. Plot No. 42, MIDC Industrial Area, Phase 2"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">City *</label>
              <input
                type="text"
                required
                placeholder="e.g. Pune"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Pincode *</label>
              <input
                type="text"
                required
                placeholder="411018"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pt-3 pb-2 border-b border-slate-100">
            3. Payment Method
          </h2>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Pay on Delivery"
                checked={paymentMethod === 'Pay on Delivery'}
                onChange={() => setPaymentMethod('Pay on Delivery')}
                className="text-[#0A4D8C]"
              />
              <span className="text-xs font-bold text-slate-900">Pay on Transport Delivery (Cash / UPI / Cheque)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Corporate Account Credit / Net Banking"
                checked={paymentMethod === 'Corporate Account Credit / Net Banking'}
                onChange={() => setPaymentMethod('Corporate Account Credit / Net Banking')}
                className="text-[#0A4D8C]"
              />
              <span className="text-xs font-bold text-slate-900">Net Banking / NEFT Credit Term</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-sm font-bold py-3.5 rounded-xl shadow transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting to Database...' : `Place Retail Order (₹ ${grandTotal.toLocaleString('en-IN')})`}
          </button>
        </form>

        {/* Mini Summary Sidebar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 h-fit">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Order Items ({cart.length})
          </h3>

          <div className="space-y-2 text-xs">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center text-slate-700">
                <span className="line-clamp-1 font-medium">{item.product.name} (x{item.quantity})</span>
                <span className="font-bold shrink-0">₹ {(item.product.price_inr * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs space-y-1">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Total Incl. GST</span>
              <span className="text-[#0A4D8C]">₹ {grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
