'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { 
  ArrowLeft, 
  Layers, 
  Plus, 
  Trash2, 
  Check, 
  ShoppingCart, 
  ShieldCheck, 
  FileText,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function ProductComparePage() {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToQuote = useCartStore((state) => state.addToQuote);
  const compareItems = useCartStore((state) => state.compareItems);
  const removeFromCompare = useCartStore((state) => state.removeFromCompare);

  const initialIds = compareItems.length > 0
    ? compareItems.map((p) => p.id)
    : [INITIAL_PRODUCTS[0]?.id || '', INITIAL_PRODUCTS[3]?.id || '', INITIAL_PRODUCTS[8]?.id || ''];

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(initialIds);

  React.useEffect(() => {
    if (compareItems.length > 0) {
      setSelectedProductIds(compareItems.map((p) => p.id));
    }
  }, [compareItems]);

  const selectedProducts = selectedProductIds
    .map((id) => INITIAL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleSelectProduct = (index: number, id: string) => {
    const updated = [...selectedProductIds];
    updated[index] = id;
    setSelectedProductIds(updated);
  };

  const handleRemoveProduct = (index: number) => {
    const targetId = selectedProductIds[index];
    if (targetId) {
      removeFromCompare(targetId);
    }
    const updated = selectedProductIds.filter((_, i) => i !== index);
    setSelectedProductIds(updated);
  };

  const handleAddSlot = () => {
    if (selectedProductIds.length < 4) {
      const unused = INITIAL_PRODUCTS.find((p) => !selectedProductIds.includes(p.id));
      if (unused) {
        setSelectedProductIds([...selectedProductIds, unused.id]);
      }
    }
  };

  // Extract all unique spec sheet keys across selected products
  const allSpecKeys = Array.from(
    new Set(
      selectedProducts.flatMap((p) => Object.keys(p.spec_sheet || {}))
    )
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" /> Product Technical Specification Comparator
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Compare Lubricants, Fuel Oils & Specifications
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Side-by-side comparison of viscosity grades, flash points, calorific values, prices, and batch standards across top brands.
          </p>
        </div>

        {selectedProductIds.length < 4 && (
          <button
            onClick={handleAddSlot}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 text-[#F5A623]" /> Add Comparison Item
          </button>
        )}
      </div>

      {/* Comparison Table Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 w-48 text-xs font-extrabold text-slate-700 uppercase tracking-wider bg-slate-100/70">
                  Product Attribute
                </th>
                {selectedProductIds.map((id, index) => {
                  const product = INITIAL_PRODUCTS.find((p) => p.id === id);
                  return (
                    <th key={index} className="p-4 w-64 border-l border-slate-200 align-top">
                      <div className="space-y-2">
                        {/* Selector Dropdown */}
                        <div className="flex items-center justify-between gap-1">
                          <select
                            value={id}
                            onChange={(e) => handleSelectProduct(index, e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                          >
                            {INITIAL_PRODUCTS.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.brand} – {p.name}
                              </option>
                            ))}
                          </select>

                          {selectedProductIds.length > 2 && (
                            <button
                              onClick={() => handleRemoveProduct(index)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {product && (
                          <div className="pt-2 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase bg-[#0A4D8C] text-white px-2 py-0.5 rounded">
                              {product.grade}
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-xs line-clamp-2">{product.name}</h3>
                            <div className="text-base font-black text-[#0A4D8C]">
                              ₹ {product.price_inr.toLocaleString('en-IN')}
                              <span className="text-[10px] text-slate-500 font-normal ml-1">/ {product.unit}</span>
                            </div>

                            <div className="pt-2 flex flex-col gap-1.5">
                              <button
                                onClick={() => addToCart(product, 1)}
                                className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-[11px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-sm"
                              >
                                <ShoppingCart className="w-3.5 h-3.5 text-[#F5A623]" /> Add to Cart
                              </button>
                              <button
                                onClick={() => addToQuote(product, 1)}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#0A4D8C]" /> Add to RFQ Quote
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Brand Row */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Brand Manufacturer</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-extrabold text-slate-900">
                    {p.brand}
                  </td>
                ))}
              </tr>

              {/* Viscosity / Grade Row */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Viscosity / Grade Rating</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-bold text-blue-900 bg-blue-50/30">
                    {p.grade}
                  </td>
                ))}
              </tr>

              {/* Packaging / Unit */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Packaging Unit</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-medium text-slate-800">
                    {p.unit}
                  </td>
                ))}
              </tr>

              {/* Stock Quantity */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Available Inventory</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-semibold text-emerald-700">
                    {p.stock_qty.toLocaleString('en-IN')} units
                  </td>
                ))}
              </tr>

              {/* Spec Sheet Key Rows */}
              {allSpecKeys.map((key) => (
                <tr key={key}>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">{key}</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-slate-200 font-medium text-slate-800">
                      {p.spec_sheet?.[key] || '—'}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Bulk Dispatch Availability */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Bulk Tanker Dispatch</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200">
                    {p.is_bulk_available ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <Check className="w-4 h-4" /> Available
                      </span>
                    ) : (
                      <span className="text-slate-400">Standard Pack Only</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
