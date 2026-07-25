'use client';

import React from 'react';
import Link from 'next/link';
import GPSTankerTracker from '@/components/GPSTankerTracker';
import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export default function LiveTrackingPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Live GPS Tanker Dispatch Tracking</h1>
          <p className="text-xs text-slate-500">Real-time GPS location and telemetry of your liquid fuel tanker delivery</p>
        </div>
      </div>

      {/* Main GPS Tracking Component */}
      <GPSTankerTracker 
        orderId="ORD-928104"
        customerName="Apex Auto Tech & Fleet"
        destinationCity="Pune MIDC, Bhosari"
      />

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Quality & Security Assurance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Digital Tamper-Proof Seal</span>
              <span className="text-slate-500">The tanker valves are sealed with ISO digital tags that trigger an alert if opened before arrival.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Truck className="w-5 h-5 text-[#0A4D8C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Density & Dip Testing</span>
              <span className="text-slate-500">The driver carries calibrated hydrometer & dip rods for on-site quantity verification before unloading.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
