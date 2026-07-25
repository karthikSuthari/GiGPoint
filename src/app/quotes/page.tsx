'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { FileText, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function QuotesPage() {
  const savedQuotes = useCartStore((state) => state.savedQuotes);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">B2B Quotations Dashboard</h1>
          <p className="text-xs text-slate-500">Track and manage your submitted Requests for Quotation (RFQs)</p>
        </div>

        <Link
          href="/request-quote"
          className="bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
        >
          <FileText className="w-4 h-4 text-[#F5A623]" /> New RFQ
        </Link>
      </div>

      {savedQuotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Submitted RFQs Found</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Create a formal quotation request for bulk lubricants, furnace oil, or fleet reorders to receive custom corporate pricing.
          </p>
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center gap-2 bg-[#0A4D8C] text-white text-xs font-bold px-6 py-3 rounded-xl shadow"
          >
            Create First RFQ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#0A4D8C] text-base">{quote.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        quote.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : quote.status === 'quoted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submitted on {new Date(quote.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block">
                    {quote.business_name}
                  </span>
                  <span className="text-[11px] text-slate-500">Contact: {quote.contact_name} ({quote.contact_phone})</span>
                </div>
              </div>

              {/* Items in quote */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700 block">Requested Line Items:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quote.items.map((item) => (
                    <div key={item.product.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between">
                      <span className="font-semibold text-slate-900 line-clamp-1">{item.product.name}</span>
                      <span className="font-bold text-[#0A4D8C] shrink-0">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {quote.notes && (
                <div className="bg-amber-50/50 p-3 rounded-xl text-xs text-amber-900 border border-amber-100">
                  <span className="font-semibold block text-amber-950">Procurement Notes:</span>
                  {quote.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
