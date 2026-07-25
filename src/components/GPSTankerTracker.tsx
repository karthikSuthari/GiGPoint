'use client';

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Navigation, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Gauge, 
  Thermometer, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface GPSTankerTrackerProps {
  orderId?: string;
  customerName?: string;
  destinationCity?: string;
}

export default function GPSTankerTracker({
  orderId = 'ORD-894102',
  customerName = 'Apex Auto Tech & Fleet',
  destinationCity = 'Pune MIDC, Bhosari'
}: GPSTankerTrackerProps) {
  const [progress, setProgress] = useState(62); // 62% along route
  const [speed, setSpeed] = useState(48);
  const [etaMins, setEtaMins] = useState(34);

  // Live GPS movement animation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 20 : prev + 1));
      setSpeed(Math.floor(42 + Math.random() * 12));
      setEtaMins((prev) => (prev <= 5 ? 45 : prev - 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 text-white p-6 shadow-2xl space-y-6 overflow-hidden relative">
      {/* Background Dot Motif */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F5A623 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#F5A623] text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
              LIVE GPS ACTIVE
            </span>
            <span className="text-xs font-mono text-slate-400">Order #{orderId}</span>
          </div>
          <h2 className="text-lg font-extrabold text-white mt-1">
            Fuel Bowser Tanker Dispatch Tracking
          </h2>
          <p className="text-xs text-slate-400">Destination: {destinationCity} ({customerName})</p>
        </div>

        <div className="bg-slate-800/90 backdrop-blur px-3.5 py-2 rounded-2xl border border-slate-700 text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
          <span className="text-base font-black text-[#F5A623] flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#F5A623] animate-pulse" /> {etaMins} Minutes
          </span>
        </div>
      </div>

      {/* Visual GPS Tanker Map Canvas Container */}
      <div className="relative z-10 bg-slate-950 rounded-2xl border border-slate-800 p-6 min-h-[220px] flex flex-col justify-between overflow-hidden">
        {/* Route Line */}
        <div className="relative w-full h-3 bg-slate-800 rounded-full my-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0A4D8C] via-[#F5A623] to-emerald-500 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Moving Tanker Marker Pin */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 flex flex-col items-center z-20"
          style={{ left: `calc(${Math.min(92, Math.max(8, progress))}% - 24px)` }}
        >
          <div className="bg-[#F5A623] text-slate-950 px-2 py-1 rounded-lg shadow-lg text-[10px] font-extrabold whitespace-nowrap mb-1 flex items-center gap-1 border border-white/20">
            <Truck className="w-3.5 h-3.5" /> Tanker TS-08-4920
          </div>
          <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg animate-ping" />
        </div>

        {/* Origin & Destination Labels */}
        <div className="flex justify-between items-center text-xs font-bold pt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#0A4D8C] rounded-full" />
            <div>
              <span className="text-white block text-xs">PetroBazaar Central Depot</span>
              <span className="text-[10px] text-slate-500 font-normal">Hyderabad Regional Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            <div>
              <span className="text-white block text-xs">{destinationCity}</span>
              <span className="text-[10px] text-emerald-400 font-normal">Delivery Destination</span>
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Live Tanker Diagnostics Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
            <Gauge className="w-3.5 h-3.5 text-blue-400" /> Live Speed
          </div>
          <span className="font-extrabold text-white text-sm">{speed} km/h</span>
        </div>

        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Seal Status
          </div>
          <span className="font-extrabold text-emerald-400 text-xs">SEAL INTACT ✓</span>
        </div>

        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Oil Temp
          </div>
          <span className="font-extrabold text-white text-sm">34°C (Normal)</span>
        </div>

        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
            <Truck className="w-3.5 h-3.5 text-[#F5A623]" /> Tanker Load
          </div>
          <span className="font-extrabold text-white text-xs">15,000L FO 180</span>
        </div>
      </div>

      {/* Driver Contact & Action Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white text-sm border border-slate-700">
            RS
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">Driver: Ramesh Singh</span>
            <span className="text-[11px] text-slate-400">Verified PetroBazaar Dispatch Logistics</span>
          </div>
        </div>

        <a
          href="tel:+919876512345"
          className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#D98E19] text-slate-950 font-bold text-xs py-2.5 px-5 rounded-xl shadow transition-all flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" /> Call Driver Ramesh (+91 98765 12345)
        </a>
      </div>
    </div>
  );
}
