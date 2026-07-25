'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
}

export default function CrudeTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([
    { symbol: 'BRENT', name: 'Brent Crude', price: '$78.45/bbl', change: '+1.2%', isUp: true },
    { symbol: 'WTI', name: 'WTI Crude', price: '$74.20/bbl', change: '+0.8%', isUp: true },
    { symbol: 'FO180', name: 'Furnace Oil 180', price: '₹52,500/KL', change: '-0.5%', isUp: false },
    { symbol: 'LDO', name: 'Light Diesel Oil', price: '₹68,000/KL', change: '+0.3%', isUp: true },
    { symbol: 'BIT-VG30', name: 'Bitumen VG-30', price: '₹44,500/MT', change: '+0.0%', isUp: true },
    { symbol: 'HSD', name: 'Commercial Diesel', price: '₹89.62/L', change: '-0.2%', isUp: false },
    { symbol: 'LVFO80', name: 'Low Viscosity FO', price: '₹54,200/KL', change: '+0.6%', isUp: true },
    { symbol: 'TPO', name: 'Tyre Pyrolysis', price: '₹47,800/KL', change: '-0.1%', isUp: false }
  ]);

  const [lastUpdated, setLastUpdated] = useState<string>('Live');

  // Auto tick simulation every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((prev) =>
        prev.map((item) => {
          const delta = (Math.random() * 0.4 - 0.2).toFixed(2);
          const numChange = parseFloat(delta);
          const isUp = numChange >= 0;
          return {
            ...item,
            change: `${isUp ? '+' : ''}${delta}%`,
            isUp
          };
        })
      );
      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 text-white text-[11px] font-medium border-b border-slate-800 overflow-hidden py-1.5 px-3 flex items-center gap-3 shadow-inner">
      {/* Live Badge */}
      <div className="flex items-center gap-1.5 shrink-0 bg-[#0A4D8C] text-blue-100 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-wider uppercase border border-blue-400/30">
        <Activity className="w-3 h-3 text-[#F5A623] animate-pulse" />
        <span className="hidden sm:inline">PetroBazaar</span> Live Market Ticker
      </div>

      {/* Marquee Scrolling Ticker Container */}
      <div className="flex-1 overflow-x-auto scrollbar-none whitespace-nowrap flex items-center gap-6">
        {tickerData.map((item) => (
          <div key={item.symbol} className="inline-flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 font-sans font-bold">{item.name}:</span>
            <span className="font-extrabold text-slate-100">{item.price}</span>
            <span
              className={`inline-flex items-center text-[10px] font-extrabold px-1 rounded ${
                item.isUp ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
              }`}
            >
              {item.isUp ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* Refresh Timestamp */}
      <div className="hidden lg:flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
        <RefreshCw className="w-2.5 h-2.5 animate-spin text-slate-500" />
        <span>Updated {lastUpdated}</span>
      </div>
    </div>
  );
}
