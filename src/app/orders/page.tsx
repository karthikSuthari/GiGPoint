'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Package, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function OrdersPage() {
  const savedOrders = useCartStore((state) => state.savedOrders);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Order History & Tracking</h1>
          <p className="text-xs text-slate-500">Track dispatch status and view past retail petroleum purchases</p>
        </div>
      </div>

      {savedOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-[#0A4D8C] rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Past Orders Found</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Placed retail orders will appear here with live transport dispatch and delivery status tracking.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#0A4D8C] text-white text-xs font-bold px-6 py-3 rounded-xl shadow"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#0A4D8C] text-base">{order.id}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ordered on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 block">
                    ₹ {order.total_inr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-500">{order.payment_method}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#0A4D8C] shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Dispatch Location: </span>
                  <span className="text-slate-600">
                    {order.delivery_address.street}, {order.delivery_address.city}, {order.delivery_address.state} - {order.delivery_address.pincode}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 block">Ordered Items:</span>
                <div className="space-y-1">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-slate-800 bg-white p-2 rounded-xl border border-slate-100">
                      <span className="font-medium">{item.product.name} (x{item.quantity})</span>
                      <span className="font-bold text-slate-900">₹ {(item.product.price_inr * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
