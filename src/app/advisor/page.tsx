'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Send, Bot, ArrowLeft, Zap } from 'lucide-react';

export default function AdvisorPage() {
  const [question, setQuestion] = useState('');
  const [vehicleType, setVehicleType] = useState('Commercial Diesel Vehicle');
  const [loading, setLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [recommendedGrade, setRecommendedGrade] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const sampleQuestions = [
    'Which engine oil should I use for Swift Dzire diesel?',
    'Need heavy duty grease for tractor wheel bearings',
    'What grade furnace oil is required for industrial boiler?',
    'Best brake fluid for heavy commercial truck fleet'
  ];

  const handleAskAdvisor = async (queryText?: string) => {
    const textToSubmit = queryText || question;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setAiAdvice(null);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSubmit,
          vehicleType
        })
      });

      const data = await res.json();
      if (data.advice) {
        setAiAdvice(data.advice);
        setRecommendedGrade(data.recommendedGrade);
        setRecommendedProducts(data.matchedProducts || []);
      }
    } catch (err) {
      console.error('Advisor request error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F5A623] text-slate-900 rounded-2xl shadow">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#F5A623] text-slate-950 px-2.5 py-0.5 rounded-md">
              Groq Ultra-Fast Llama-3 AI
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
              AI Lubricant & Technical Advisor
            </h1>
            <p className="text-xs md:text-sm font-medium text-slate-300 mt-0.5">
              Not sure which oil grade (20W-40, 15W-40, DOT 4) fits your vehicle or machine? Ask in plain English for instant recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Query Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Application / Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
          >
            <option value="Commercial Diesel Vehicle">Commercial Diesel Truck / Bus / Fleet</option>
            <option value="Agricultural Tractor & Machinery">Agricultural Tractor & Farm Machinery</option>
            <option value="Passenger Car / SUV">Passenger Car / SUV (Petrol / Diesel)</option>
            <option value="Industrial Furnace & Boiler">Industrial Furnace, Boiler & Heat Plant</option>
            <option value="Two Wheeler / Motorbike">Two Wheeler / Motorcycle</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Your Question or Concern</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Which oil is recommended for heavy diesel engine in hot summer?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAdvisor()}
              className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            />
            <button
              onClick={() => handleAskAdvisor()}
              disabled={loading || !question.trim()}
              className="bg-[#0A4D8C] hover:bg-[#083C6E] text-white px-5 py-3.5 rounded-2xl text-xs font-bold shadow flex items-center gap-1.5 disabled:opacity-50 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" /> Ask Groq AI
            </button>
          </div>
        </div>

        {/* Sample Questions Pills */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-2">Or try these sample queries:</span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuestion(q);
                  handleAskAdvisor(q);
                }}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-[#0A4D8C] rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Zap className="w-6 h-6 text-[#F5A623]" />
          </div>
          <p className="text-xs font-bold text-slate-700">Groq LLM engine processing recommendation...</p>
        </div>
      )}

      {/* AI Recommendation Result */}
      {aiAdvice && !loading && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#0A4D8C]" />
                <h2 className="text-base font-bold text-slate-900">Groq AI Recommendation</h2>
              </div>
              {recommendedGrade && (
                <span className="bg-[#F5A623] text-gray-900 text-xs font-extrabold px-3 py-1 rounded-full shadow">
                  Recommended Grade: {recommendedGrade}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
              {aiAdvice}
            </p>
          </div>

          {/* Matched Products from Catalog */}
          {recommendedProducts.length > 0 && (
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3">
                Matching Catalog Lubricants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
