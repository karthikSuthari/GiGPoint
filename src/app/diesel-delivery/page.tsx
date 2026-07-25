'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Fuel, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  Calculator,
  ChevronRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types';

export default function DoorstepDieselDeliveryPage() {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  // Form State
  const [liters, setLiters] = useState<number>(500);
  const [pincode, setPincode] = useState<string>('500001');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (08:00 AM - 12:00 PM)');
  const [businessName, setBusinessName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const pricePerLiter = 89.62; // Telangana HSD Commercial Benchmark Rate
  const totalAmount = liters * pricePerLiter;
  const isEligible = pincode.startsWith('500') || pincode.startsWith('501') || pincode.startsWith('502');

  const handleBookBowser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !deliveryAddress) {
      alert('Please fill in contact name, phone, and delivery address.');
      return;
    }

    const dieselProduct: Product = {
      id: `diesel-bowser-${Date.now()}`,
      category_id: 'cat-1',
      category_slug: 'industrial-fuel',
      name: `Doorstep Diesel Delivery (${liters} Liters)`,
      brand: 'PetroBazaar Mobile Bowser',
      grade: 'BS-VI HSD Commercial',
      description: `PESO-certified automated fuel bowser delivery to ${deliveryAddress} (Pincode: ${pincode}). Scheduled for ${deliveryDate || 'Tomorrow'} (${timeSlot}).`,
      price_inr: pricePerLiter,
      unit: 'Liter (Doorstep Delivery)',
      stock_qty: 50000,
      image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      spec_sheet: {
        'Delivery Type': 'PESO Smart Mobile Fuel Bowser',
        'Quantity': `${liters} Liters`,
        'Time Slot': timeSlot,
        'Pincode': pincode
      },
      is_bulk_available: true
    };

    addToCart(dieselProduct, liters);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm">
            <Truck className="w-3.5 h-3.5" /> PESO Certified Smart Mobile Bowser Service
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Door to Door Diesel Delivery in Hyderabad & Telangana
          </h1>
          <p className="text-xs md:text-sm text-slate-300">
            Automated mobile diesel refueling for DG sets, factories, construction sites, commercial fleets, and heavy earthmovers directly at your location.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl text-center shrink-0 w-full md:w-auto">
          <span className="text-xs text-blue-200 font-medium block">Today's HSD Rate</span>
          <span className="text-3xl font-black text-[#F5A623]">₹ 89.62</span>
          <span className="text-[11px] block text-emerald-400 font-semibold mt-0.5">per Liter (Zero Spillage Guarantee)</span>
        </div>
      </div>

      {/* Booking Confirmation Box */}
      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-300 p-6 md:p-8 rounded-3xl text-center space-y-4 shadow-md animate-in fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-emerald-950">Mobile Bowser Delivery Booked!</h2>
            <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
              Your order of <strong className="font-bold">{liters} Liters</strong> of High-Speed Diesel (₹{totalAmount.toLocaleString('en-IN')}) has been added to your cart & scheduled for doorstep dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/checkout"
              className="bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-all"
            >
              Proceed to Checkout & Confirm Dispatch
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold px-4 py-3 rounded-xl border border-slate-200"
            >
              Modify Delivery Details
            </button>
          </div>
        </div>
      ) : (
        /* Main Grid: Calculator & Delivery Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Calculator & Service Features (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live Instant Price Calculator */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Calculator className="w-5 h-5 text-[#0A4D8C]" />
                <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Instant Fuel Cost Calculator
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex justify-between">
                    <span>Required Diesel Volume (Liters):</span>
                    <span className="font-extrabold text-[#0A4D8C]">{liters} Liters</span>
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={10000}
                    step={100}
                    value={liters}
                    onChange={(e) => setLiters(parseInt(e.target.value))}
                    className="w-full accent-[#0A4D8C] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                    <span>200L (Min)</span>
                    <span>2,500L</span>
                    <span>5,000L</span>
                    <span>10,000L</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rate per Liter:</span>
                    <span className="font-bold text-slate-900">₹ {pricePerLiter.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Charge:</span>
                    <span className="font-bold text-emerald-600">FREE (PESO Smart Bowser)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold">
                    <span className="text-slate-900">Total Payable:</span>
                    <span className="text-[#0A4D8C]">₹ {totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Service Availability Badge */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-[11px] text-blue-900 font-semibold">
                  <MapPin className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>
                    {isEligible
                      ? '✓ Doorstep Mobile Bowser available in your pincode area!'
                      : 'Covering Hyderabad, Nacharam, Cherlapally, Jeedimetla, Patancheru & Telangana industrial hubs.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Why Choose Lubeswala Doorstep Diesel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs pb-2 border-b border-slate-100">
                Why PetroBazaar Mobile Bowser?
              </h3>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>PESO Approved Bowser:</strong> 100% compliant automated smart dispensing bowser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Fuel className="w-4 h-4 text-[#0A4D8C] shrink-0 mt-0.5" />
                  <span><strong>Zero Spillage & No Theft:</strong> Sealed digital flow meter with automated receipt generation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed On-Time Delivery:</strong> Express 2-hour or scheduled time slot dispatch.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Delivery Booking Form (7 cols) */}
          <form onSubmit={handleBookBowser} className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                Book Mobile Diesel Bowser Delivery
              </h2>
              <p className="text-xs text-slate-500">Provide your location & contact details for automated dispatch</p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Industrial Generators Pvt Ltd"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinivas Rao"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 93966 28880"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exact Site / Delivery Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Plot number, industrial estate, factory landmark..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Delivery Date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  >
                    <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                    <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                    <option value="Express 2-Hour Dispatch">Express 2-Hour Dispatch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Delivery Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Fill DG set 1 & DG set 2 directly, gate pass required..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-sm font-extrabold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5 text-[#F5A623]" />
              Book {liters}L Mobile Bowser Delivery (₹ {totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })})
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
