'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const brands = Array.from(new Set(INITIAL_PRODUCTS.map((p) => p.brand)));

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || product.category_slug === selectedCategory;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Search Petroleum Products</h1>
        <p className="text-xs text-slate-500 mt-1">Filter by grade, brand (Servo, HP), or product category</p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by product title, viscosity grade (20W-40, DOT 4, NLGI 2)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-[#0A4D8C]" />
          <span>Refine Catalog Search</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            >
              <option value="all">All Categories</option>
              {INITIAL_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Brand Partner</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            >
              <option value="all">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-700">
            Found {filteredProducts.length} results
          </span>
          {(searchQuery || selectedBrand !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('all');
                setSelectedCategory('all');
              }}
              className="text-xs text-[#0A4D8C] font-semibold underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm font-medium">No matching products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xs text-slate-500">Loading catalog search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
