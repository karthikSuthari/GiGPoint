'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import GPSTankerTracker from '@/components/GPSTankerTracker';
import { Package, Truck, Clock, ArrowLeft, ChevronRight, Navigation } from 'lucide-react';

export default function OrdersPage() {
  const savedOrders = useCartStore((state) => state.savedOrders);

  // Demo fallback order if empty
  const ordersList = savedOrders.length > 0 ? savedOrders : [
    {
      id: 'ORD-928104',
      customer_name: 'Apex Auto Tech & Fleet',
      customer_phone: '9876543210',
      delivery_address: {
        street: 'Plot No. 42, MIDC Industrial Area, Phase 2',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411018'
      },
      items: [
        {
          product: {
            id: 'pb-fo-180',
            name: 'PetroBazaar Premium Furnace Oil (FO Grade 180)',
            brand: 'PetroBazaar',
            price_inr: 52.50,
            unit: 'Liter (Bulk Tanker)'
          },
          quantity: 10000
        }
      ],
      total_inr: 619500,
      payment_method: 'Corporate Account Credit / Net Banking',
      status: 'in-transit',
      created_at: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Your Retail & Tanker Orders</h1>
          <p className="text-xs text-slate-500">Track delivery dispatch status and live GPS tanker location</p>
        </div>
      </div>

      {/* Featured Live GPS Tracker Component for Active Order */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#0A4D8C] uppercase tracking-wider flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-[#F5A623] animate-pulse" /> Active Live Tanker Location
          </span>
          <Link href="/tracking" className="text-xs font-bold text-[#0A4D8C] hover:underline">
            Full Screen GPS View →
          </Link>
        </div>
        <GPSTankerTracker 
          orderId={ordersList[0].id}
          customerName={ordersList[0].customer_name}
          destinationCity={`${ordersList[0].delivery_address.city}, ${ordersList[0].delivery_address.pincode}`}
        />
      </div>

      {/* Orders History List */}
      <div className="space-y-3 pt-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
          Order History ({ordersList.length})
        </h2>

        {ordersList.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-extrabold text-[#0A4D8C]">{order.id}</span>
                <span className="text-xs text-slate-400 ml-2 font-medium">
                  {new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {order.status}
                </span>
                <Link
                  href="/tracking"
                  className="bg-[#0A4D8C] text-white text-xs font-bold px-3 py-1 rounded-xl shadow hover:bg-[#083C6E] transition-all flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-[#F5A623]" /> GPS Map
                </Link>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-700">
                  <span className="font-semibold">{item.product.name} (x{item.quantity})</span>
                  <span className="font-bold">₹ {(item.product.price_inr * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Deliver to: <strong>{order.delivery_address.city}, {order.delivery_address.pincode}</strong>
              </span>
              <span className="font-extrabold text-slate-900">
                Total: ₹ {order.total_inr.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
