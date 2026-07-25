'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { INITIAL_DEALERS, Dealer } from '@/lib/dealers';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { 
  MapPin, 
  Search, 
  Phone, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Truck, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>(INITIAL_DEALERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeDealerId, setActiveDealerId] = useState<string>('dealer-hyd-hq');

  useEffect(() => {
    async function loadDealers() {
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase.from('dealers').select('*');
          if (!error && data && data.length > 0) {
            setDealers(data as Dealer[]);
          }
        } catch (err) {
          console.error('Error fetching dealers from Supabase DB:', err);
        }
      }
    }
    loadDealers();
  }, []);

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.pincode.includes(searchQuery) ||
      dealer.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || dealer.type === selectedType;

    return matchesSearch && matchesType;
  });

  const activeDealer = dealers.find((d) => d.id === activeDealerId) || dealers[0];

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" /> Nationwide Hub Network
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            PetroBazaar Authorized Depots & Dealer Locator
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Locate regional distribution hubs for bulk tanker dispatch or local express outlets for 45-minute workshop pickup.
          </p>
        </div>

        <Link
          href="/request-quote"
          className="whitespace-nowrap bg-[#F5A623] hover:bg-[#D98E19] text-slate-900 font-bold text-xs px-5 py-3 rounded-xl shadow transition-all active:scale-95"
        >
          Request Bulk Tanker Dispatch
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by City (Hyderabad, Pune, Mumbai, Ahmedabad), Pincode, or Hub name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
        >
          <option value="all">All Outlet Types</option>
          <option value="Regional Depot">Regional Depots (Bulk Tankers)</option>
          <option value="Authorized Stockist">Authorized Stockists (Drums)</option>
          <option value="Express Outlet">Express Workshop Outlets (45-Min Pickup)</option>
        </select>
      </div>

      {/* Main Map & Outlets Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Interactive Map Visual Box */}
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 min-h-[380px] flex flex-col justify-between p-6 relative">
          {/* Map Grid Background Motif */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#F5A623 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur border border-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold">
              <MapPin className="w-4 h-4 text-[#F5A623]" />
              <span>Interactive Network Map</span>
            </div>

            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
              GPS Active ({filteredDealers.length} Depots Nearby)
            </span>
          </div>

          {/* Active Depot Highlight Overlay */}
          <div className="relative z-10 bg-slate-800/90 backdrop-blur border border-slate-700 p-5 rounded-2xl text-white space-y-3 shadow-xl max-w-lg my-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold bg-[#0A4D8C] text-blue-100 px-2.5 py-0.5 rounded">
                {activeDealer.type}
              </span>
              <span className="text-xs font-bold text-[#F5A623] flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" /> {activeDealer.distance_km} km away
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white">{activeDealer.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{activeDealer.address}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeDealer.services.map((service) => (
                <span key={service} className="text-[10px] bg-slate-700 text-slate-200 px-2 py-0.5 rounded-md">
                  ✓ {service}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`tel:${activeDealer.phone}`}
                className="flex-1 bg-[#F5A623] hover:bg-[#D98E19] text-slate-950 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> Call Depot ({activeDealer.phone})
              </a>
              <a
                href={`https://maps.google.com/?q=${activeDealer.lat},${activeDealer.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center gap-1 transition-colors"
              >
                Directions <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 text-center">
            Click any depot from the list to pin it on the map.
          </div>
        </div>

        {/* Depots List Sidebar */}
        <div className="lg:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredDealers.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
              <p className="text-slate-500 text-xs font-medium">No authorized hubs found matching your query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                }}
                className="text-xs font-bold text-[#0A4D8C] underline"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredDealers.map((dealer) => {
              const isSelected = dealer.id === activeDealerId;

              return (
                <div
                  key={dealer.id}
                  onClick={() => setActiveDealerId(dealer.id)}
                  className={`bg-white p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#0A4D8C] ring-2 ring-[#0A4D8C]/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A4D8C] bg-blue-50 px-2 py-0.5 rounded">
                      {dealer.city}, {dealer.state}
                    </span>
                    <span className="text-xs font-extrabold text-[#F5A623] flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" /> {dealer.distance_km} km
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">
                    {dealer.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {dealer.address}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Open Now (9 AM - 6 PM)
                    </span>
                    <span className="text-[#0A4D8C] font-bold hover:underline">
                      Select Pin →
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
