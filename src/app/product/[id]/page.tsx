'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';
import { 
  ArrowLeft, 
  ShoppingCart, 
  FileText, 
  Check, 
  ShieldCheck, 
  Truck, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  Zap,
  Sparkles,
  Droplet,
  Layers
} from 'lucide-react';

function FormattedProductDescription({ text }: { text: string }) {
  // Clean up HTML entities & raw text
  const cleanText = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

  // Check if text has newline bullet points
  const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);
  
  // Extract summary (intro) vs bullets
  let intro = lines[0] || '';
  if (intro.length > 250) {
    const periodIdx = intro.indexOf('.', 100);
    if (periodIdx !== -1) {
      intro = intro.substring(0, periodIdx + 1);
    }
  }

  const bulletItems: string[] = [];
  lines.forEach((line) => {
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      bulletItems.push(line.replace(/^[•\-\*]\s*/, ''));
    }
  });

  // If no newline bullets found, extract sentences or key phrases
  if (bulletItems.length === 0) {
    // Check for inline bullet symbols or phrase separators
    if (cleanText.includes('•')) {
      const parts = cleanText.split('•').map(p => p.trim()).filter(p => p.length > 5);
      bulletItems.push(...parts.slice(0, 6));
    } else {
      // Split into key feature sentences
      const sentences = cleanText
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 20 && !s.includes('Unlock the power') && !s.includes('Boost your system'));
      
      bulletItems.push(...sentences.slice(1, 5));
    }
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Short Lead Summary */}
      <div className="p-3.5 bg-gradient-to-r from-slate-50 to-blue-50/40 border-l-4 border-[#0A4D8C] rounded-r-2xl text-xs md:text-sm font-medium text-slate-800 leading-relaxed shadow-xs">
        <span className="font-bold text-[#0A4D8C]">Overview: </span>
        {intro}
      </div>

      {/* Sharp Key Bullet Highlights */}
      {bulletItems.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#F5A623]" /> Key Performance Highlights:
          </span>
          <div className="grid grid-cols-1 gap-2">
            {bulletItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/90 text-xs font-semibold text-emerald-950 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = INITIAL_PRODUCTS.find((p) => p.id === productId) || INITIAL_PRODUCTS[0];
  const addToCart = useCartStore((state) => state.addToCart);
  const addToQuote = useCartStore((state) => state.addToQuote);
  const toggleCompare = useCartStore((state) => state.toggleCompare);
  const compareItems = useCartStore((state) => state.compareItems);

  const [quantity, setQuantity] = useState(1);
  const [addedCart, setAddedCart] = useState(false);
  const [addedQuote, setAddedQuote] = useState(false);
  const [showSpecs, setShowSpecs] = useState(true);
  const [imgError, setImgError] = useState(false);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setAddedCart(true);
    setTimeout(() => {
      router.push('/cart');
    }, 600);
  };

  const handleRequestQuote = () => {
    addToQuote(product, quantity);
    setAddedQuote(true);
    setTimeout(() => {
      router.push('/request-quote');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        {/* Product Image Gallery */}
        <div className="space-y-3">
          <div className="h-72 md:h-96 rounded-2xl overflow-hidden bg-slate-100 relative">
            {/* eslint-disable-next-html-element-suppression */}
            {!imgError ? (
              <img
                src={product.image_url}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0A4D8C] via-[#083C6E] to-slate-900 flex flex-col items-center justify-center text-white p-6 text-center">
                <Droplet className="w-16 h-16 text-[#F5A623] mb-2 animate-pulse" />
                <h3 className="text-base font-extrabold">{product.name}</h3>
                <span className="text-xs text-blue-200 mt-1">{product.brand} • Grade: {product.grade}</span>
              </div>
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span className="bg-[#0A4D8C] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                {product.brand}
              </span>
              <span className="bg-[#F5A623] text-gray-900 text-xs font-extrabold px-2.5 py-1 rounded-md shadow">
                Grade: {product.grade}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Guaranteed 100% genuine sealed container direct from manufacturer distribution.</span>
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category: {product.category_slug}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                In Stock ({product.stock_qty} available)
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-400">₹</span>
              <span className="text-3xl font-black text-[#0A4D8C]">
                {product.price_inr.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ {product.unit}</span>
            </div>

            <FormattedProductDescription text={product.description} />

            {/* Quantity Stepper */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Total: ₹ {(product.price_inr * quantity).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleBuyNow}
                  className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold shadow-md transition-all ${
                    addedCart
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0A4D8C] hover:bg-[#083C6E] text-white active:scale-95'
                  }`}
                >
                  {addedCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  Buy Now
                </button>

                <button
                  onClick={handleRequestQuote}
                  className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold border transition-all ${
                    addedQuote
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 active:scale-95'
                  }`}
                >
                  {addedQuote ? <Check className="w-5 h-5" /> : <FileText className="w-5 h-5 text-amber-700" />}
                  Request RFQ
                </button>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold border transition-all ${
                    compareItems.some((p) => p.id === product.id)
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-extrabold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 active:scale-95'
                  }`}
                >
                  <Layers className="w-5 h-5 text-[#0A4D8C]" />
                  {compareItems.some((p) => p.id === product.id) ? 'Comparing' : 'Compare Specs'}
                </button>
              </div>

            <p className="text-[11px] text-center text-slate-500">
              ⚡ Need 50+ buckets or drum tankers? Request a quote for corporate GST pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Specifications Accordion */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className="w-full p-5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors font-bold text-slate-900 text-sm md:text-base border-b border-slate-200"
        >
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-[#0A4D8C]" />
            Technical Specifications Sheet
          </div>
          {showSpecs ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>

        {showSpecs && (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.spec_sheet).map(([key, value]) => (
                <div key={key} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500">{key}</span>
                  <span className="text-sm font-bold text-slate-900 mt-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delivery & Assurance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
          <Truck className="w-8 h-8 text-[#0A4D8C] shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Direct Transport Delivery</h4>
            <p className="text-[11px] text-slate-500">Dispatched within 24-48 hours with live shipment tracking.</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#F5A623] shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Quality Certified Batch</h4>
            <p className="text-[11px] text-slate-500">Includes manufacturer test report & viscosity compliance certificate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
