'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight,
  Droplet,
  Search
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  React.useEffect(() => {
    async function loadDbProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (data && data.length > 0 && !error) {
          setProducts(data as Product[]);
        }
      } catch (err) {
        console.warn('Supabase DB fetch fallback:', err);
      }
    }
    loadDbProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category_slug === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 text-white p-6 md:p-8 shadow-xl">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> B2B & Retail Petroleum Portal
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Nationwide Lubricant & Petroleum Supply Platform
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Order authentic engine oils, greases, furnace oil, and brake fluids directly from leading brands like Servo, HP Lubes, Mobil, and Castrol.
          </p>

          {/* Quick Action Banner CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D98E19] text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all active:scale-95"
            >
              <FileText className="w-4 h-4" /> Request Bulk Quote (RFQ)
            </Link>
            <Link
              href="/advisor"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm border border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#F5A623]" /> Ask AI Advisor
            </Link>
          </div>
        </div>

        {/* Decorative Background Motif */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none hidden md:block">
          <Droplet className="w-80 h-80 text-white fill-current" />
        </div>
      </div>

      {/* Quick Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by product name, brand (Servo, HP), or oil grade (20W-40, DOT 4)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
        />
      </div>

      {/* Category Chips Scrollbar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">Explore Categories</h2>
          <Link href="/search" className="text-xs font-semibold text-[#0A4D8C] hover:underline flex items-center gap-0.5">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#0A4D8C] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Products
          </button>
          {INITIAL_CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === category.slug
                  ? 'bg-[#0A4D8C] text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Value Proposition Highlights */}
      <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col items-center text-center p-2">
          <ShieldCheck className="w-6 h-6 text-[#0A4D8C] mb-1" />
          <h4 className="text-xs font-bold text-slate-900">100% Genuine</h4>
          <p className="text-[10px] text-slate-500 hidden sm:block">Direct Brand Partners</p>
        </div>
        <div className="flex flex-col items-center text-center p-2 border-x border-slate-100">
          <Truck className="w-6 h-6 text-[#F5A623] mb-1" />
          <h4 className="text-xs font-bold text-slate-900">Bulk & Tanker Delivery</h4>
          <p className="text-[10px] text-slate-500 hidden sm:block">Pan-India Logistics</p>
        </div>
        <div className="flex flex-col items-center text-center p-2">
          <Award className="w-6 h-6 text-emerald-600 mb-1" />
          <h4 className="text-xs font-bold text-slate-900">Formal B2B RFQ</h4>
          <p className="text-[10px] text-slate-500 hidden sm:block">GST PO & Quotes</p>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Featured Lubricants Catalog</h2>
            <p className="text-xs text-slate-500">Select Buy Now for retail or Request Quote for bulk B2B purchases</p>
          </div>
          <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
            {filteredProducts.length} Products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No products match your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#0A4D8C] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* B2B Procurement Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Industrial Procurement
          </span>
          <h3 className="text-lg font-bold text-amber-950 mt-1">Need Bulk Furnace Oil or Multi-Brand Quotes?</h3>
          <p className="text-xs text-amber-800 mt-1">
            Submit a formal RFQ to receive custom wholesale pricing, credit terms, and GST invoicing.
          </p>
        </div>
        <Link
          href="/request-quote"
          className="whitespace-nowrap bg-[#0A4D8C] hover:bg-[#083C6E] text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition-all"
        >
          Create Bulk RFQ Request
        </Link>
      </div>
    </div>
  );
}
