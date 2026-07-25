'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { QuoteRequest } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { FileText, CheckCircle2, Plus, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function RequestQuotePage() {
  const router = useRouter();
  const quoteItems = useCartStore((state) => state.quoteItems);
  const addToQuote = useCartStore((state) => state.addToQuote);
  const removeFromQuote = useCartStore((state) => state.removeFromQuote);
  const updateQuoteQuantity = useCartStore((state) => state.updateQuoteQuantity);
  const clearQuote = useCartStore((state) => state.clearQuote);
  const addQuoteRequest = useCartStore((state) => state.addQuoteRequest);

  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);

  const handleAddProductToQuote = () => {
    if (!selectedProductId) return;
    const prod = INITIAL_PRODUCTS.find((p) => p.id === selectedProductId);
    if (prod) {
      addToQuote(prod, 1);
      setSelectedProductId('');
    }
  };

  const handleSubmitRFQ = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quoteItems.length === 0) {
      alert('Please add at least one product to your quotation request.');
      return;
    }

    if (!businessName || !contactName || !contactPhone || !deliveryPincode) {
      alert('Please complete all required business and contact details.');
      return;
    }

    setIsSubmitting(true);

    const newQuote: QuoteRequest = {
      id: `RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
      business_name: businessName,
      contact_name: contactName,
      contact_phone: contactPhone,
      contact_email: contactEmail || 'N/A',
      delivery_pincode: deliveryPincode,
      status: 'pending',
      notes,
      items: [...quoteItems],
      total_items: quoteItems.reduce((sum, i) => sum + i.quantity, 0),
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase Postgres DB if configured
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('quote_requests').insert({
          id: newQuote.id,
          business_name: newQuote.business_name,
          contact_name: newQuote.contact_name,
          contact_phone: newQuote.contact_phone,
          contact_email: newQuote.contact_email,
          delivery_pincode: newQuote.delivery_pincode,
          status: newQuote.status,
          notes: newQuote.notes
        });
      } catch (err) {
        console.error('Supabase DB quote insert error (falling back to client state):', err);
      }
    }

    addQuoteRequest(newQuote);
    clearQuote();
    setSubmittedQuote(newQuote);
    setIsSubmitting(false);
  };

  if (submittedQuote) {
    return (
      <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-5">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
            RFQ Received
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Quotation Submitted!</h1>
          <p className="text-xs text-slate-500 mt-1">
            Our B2B petroleum sales desk is processing custom wholesale pricing for <strong>{submittedQuote.business_name}</strong>.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">RFQ Reference ID:</span>
            <span className="font-bold text-[#0A4D8C]">{submittedQuote.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Status:</span>
            <span className="font-bold text-amber-600 capitalize">{submittedQuote.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Requested Items:</span>
            <span className="font-bold text-slate-800">{submittedQuote.items.length} Product Types</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/quotes"
            className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white font-bold py-3 rounded-xl text-xs transition-all shadow"
          >
            View Quotes Dashboard
          </Link>
          <Link
            href="/"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Request Bulk Quotation (RFQ)</h1>
          <p className="text-xs text-slate-500">Dedicated B2B quote request for workshops, fleet operators, and industrial procurement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmitRFQ} className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Business & Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Company / Workshop Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Auto Tech & Fleet"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">GST Email Address</label>
              <input
                type="email"
                placeholder="procurement@apex.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Delivery Pincode *</label>
              <input
                type="text"
                required
                placeholder="411018"
                value={deliveryPincode}
                onChange={(e) => setDeliveryPincode(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pt-3 pb-2 border-b border-slate-100">
            2. Selected Products for Quotation
          </h2>

          {/* Add product dropdown */}
          <div className="flex gap-2">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            >
              <option value="">-- Add another product to RFQ --</option>
              {INITIAL_PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.brand} - {p.grade})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddProductToQuote}
              className="bg-[#0A4D8C] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-[#083C6E]"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {/* Items List */}
          {quoteItems.length === 0 ? (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 text-center">
              No products selected yet. Pick a product above or tap "Get Quote" from the product catalog.
            </div>
          ) : (
            <div className="space-y-2">
              {quoteItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{item.product.name}</span>
                    <span className="text-slate-500">{item.product.brand} | {item.product.unit}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuoteQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuoteQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-700 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromQuote(item.product.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pt-3 pb-2 border-b border-slate-100">
            3. Procurement Notes & Delivery Requirements
          </h2>

          <div>
            <textarea
              rows={3}
              placeholder="e.g. Monthly recurring order required, need delivery in 200L drums, require 30-day corporate credit terms."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-sm font-bold py-3.5 rounded-xl shadow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#F5A623]" /> {isSubmitting ? 'Submitting to Database...' : 'Submit Official B2B RFQ'}
          </button>
        </form>

        {/* Benefits Sidebar */}
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 space-y-4 h-fit">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span>Why Request B2B Quotes?</span>
          </div>

          <ul className="space-y-2.5 text-xs text-amber-950 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Custom Volume Pricing:</strong> Tiered discounts for 50+ liters or bulk tanker loads.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>GST Invoicing:</strong> Official tax invoice with ITC credit compliance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Formal Audit Trail:</strong> Track RFQ status from pending to accepted PO.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
