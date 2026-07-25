'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';

export default function CompareBar() {
  const compareItems = useCartStore((state) => state.compareItems);
  const removeFromCompare = useCartStore((state) => state.removeFromCompare);
  const clearCompare = useCartStore((state) => state.clearCompare);

  if (!compareItems || compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-2xl shadow-2xl p-3 md:p-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
      {/* Left: Info & Thumbnails */}
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="bg-[#F5A623] text-slate-950 p-2 rounded-xl shrink-0 font-black flex items-center gap-1 text-xs">
          <Layers className="w-4 h-4" />
          <span className="hidden sm:inline">{compareItems.length}/4</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {compareItems.map((product) => (
            <div
              key={product.id}
              className="relative group bg-slate-800 border border-slate-700 rounded-xl p-1 shrink-0 flex items-center gap-1.5 pr-2"
            >
              <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-white shrink-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://cdn.shopify.com/s/files/1/0795/3560/3991/files/Servo_4T_20W40_front_-removebg-preview.png?v=1740700386';
                  }}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="text-[11px] font-bold max-w-[100px] truncate text-slate-200">
                {product.name}
              </span>
              <button
                onClick={() => removeFromCompare(product.id)}
                className="text-slate-400 hover:text-rose-400 p-0.5 rounded-full"
                title="Remove from compare"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Compare Now CTA & Clear */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={clearCompare}
          className="text-slate-400 hover:text-slate-200 text-xs font-medium px-2 py-1 hidden sm:block"
        >
          Clear
        </button>

        <Link
          href="/compare"
          className="bg-[#0A4D8C] hover:bg-blue-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
        >
          <span>Compare Now ({compareItems.length})</span>
          <ArrowRight className="w-4 h-4 text-[#F5A623]" />
        </Link>
      </div>
    </div>
  );
}
