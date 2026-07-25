'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, FileText, Check, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToQuote = useCartStore((state) => state.addToQuote);
  const [addedCart, setAddedCart] = React.useState(false);
  const [addedQuote, setAddedQuote] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedCart(true);
    setTimeout(() => setAddedCart(false), 1800);
  };

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQuote(product, 1);
    setAddedQuote(true);
    setTimeout(() => setAddedQuote(false), 1800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden flex flex-col group">
      {/* Product Image & Badges */}
      <Link href={`/product/${product.id}`} className="relative block h-44 overflow-hidden bg-slate-100">
        {/* eslint-disable-next-html-element-suppression */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-[#0A4D8C] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {product.brand}
          </span>
          <span className="bg-[#F5A623] text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
            Grade: {product.grade}
          </span>
        </div>

        {product.is_bulk_available && (
          <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
            Bulk RFQ Available
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-slate-900 line-clamp-2 hover:text-[#0A4D8C] transition-colors text-sm md:text-base">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing & Stock */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">₹ </span>
              <span className="text-lg font-extrabold text-[#0A4D8C]">
                {product.price_inr.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500 ml-1 font-medium">
                / {product.unit}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
              In Stock
            </span>
          </div>

          {/* Dual Action Buttons: Retail Cart vs B2B RFQ */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                addedCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0A4D8C] hover:bg-[#083C6E] text-white active:scale-95'
              }`}
            >
              {addedCart ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                </>
              )}
            </button>

            <button
              onClick={handleAddToQuote}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                addedQuote
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 active:scale-95'
              }`}
            >
              {addedQuote ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added RFQ
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-amber-700" /> Get Quote
                </>
              )}
            </button>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="w-full mt-2 inline-flex items-center justify-center text-[11px] font-semibold text-slate-500 hover:text-[#0A4D8C] transition-colors py-0.5"
          >
            View Technical Specs <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
