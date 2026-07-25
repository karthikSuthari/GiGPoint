'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Headphones, 
  MessageSquare, 
  Zap, 
  Phone, 
  Mail, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowLeft,
  FileText,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function SupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [ticketName, setTicketName] = useState('');
  const [ticketPhone, setTicketPhone] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Order / Delivery Tracking');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      question: 'How do B2B Request for Quotations (RFQs) work?',
      answer: 'You can add items to your RFQ cart or select "Get Quote" from any product page. Submit your company details and delivery pincode on the /request-quote page. Our sales desk reviews the volume and issues an official wholesale quotation PDF with GST credit terms within 15 minutes.'
    },
    {
      question: 'Are all products 100% genuine and batch certified?',
      answer: 'Yes! PetroBazaar & Lubeswala are direct brand partners with Servo (IOCL), HP Lubes (HPCL), Mobil, and Castrol. Every batch dispatch includes an official Quality & Viscosity Test Report.'
    },
    {
      question: 'What liquid industrial fuels are available for bulk tanker dispatch?',
      answer: 'We supply Furnace Oil (FO 180 cSt), Light Diesel Oil (LDO), Low Viscosity Fuel Oil (LVFO 80 cSt), Bitumen VG-30, Tyre Pyrolysis Oil, and Plastic Pyrolysis Oil in bulk 10,000L+ tanker loads.'
    },
    {
      question: 'Can I pick up lubricants directly from a local depot?',
      answer: 'Yes! Visit our /dealers page to find nearby PetroBazaar regional hubs and express workshop depots for 45-minute pickup.'
    },
    {
      question: 'What payment options are available for retail and bulk orders?',
      answer: 'We accept Pay on Transport Delivery (Cash, UPI, Cheque) for retail orders, and Corporate Net Banking / NEFT Credit Lines for verified B2B buyers.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketPhone || !ticketMessage) {
      alert('Please fill in all required fields.');
      return;
    }
    setTicketSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <Headphones className="w-3.5 h-3.5" /> 24/7 Customer Support Desk
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            PetroBazaar Help & Support Center
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Get instant AI answers, chat on WhatsApp, track RFQ quotes, or submit a support ticket to our technical sales team.
          </p>
        </div>
      </div>

      {/* Quick Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WhatsApp Card */}
        <a
          href="https://wa.me/919396628880?text=Hi%20PetroBazaar%20Support%20Team,%20I%20need%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 p-5 rounded-2xl transition-all shadow-sm flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-3 shadow">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">WhatsApp Sales Chat</h3>
            <p className="text-xs text-emerald-800 mt-1">Instant 1-on-1 response for quotes & order updates.</p>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 mt-4 group-hover:underline flex items-center gap-1">
            Chat on WhatsApp →
          </span>
        </a>

        {/* AI Assistant Card */}
        <Link
          href="/advisor"
          className="bg-amber-50 hover:bg-amber-100 border border-amber-200 p-5 rounded-2xl transition-all shadow-sm flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 bg-[#F5A623] text-slate-950 rounded-xl flex items-center justify-center mb-3 shadow">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Groq AI Petroleum Advisor</h3>
            <p className="text-xs text-amber-900 mt-1">Ask plain English questions about oil grades & specs.</p>
          </div>
          <span className="text-xs font-extrabold text-amber-900 mt-4 group-hover:underline flex items-center gap-1">
            Launch AI Advisor →
          </span>
        </Link>

        {/* Direct Call Card */}
        <a
          href="tel:+919396628880"
          className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-5 rounded-2xl transition-all shadow-sm flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 bg-[#0A4D8C] text-white rounded-xl flex items-center justify-center mb-3 shadow">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Support Helpline</h3>
            <p className="text-xs text-blue-900 mt-1">+91 93966 28880 (Mon-Sat, 9 AM - 6 PM)</p>
          </div>
          <span className="text-xs font-extrabold text-[#0A4D8C] mt-4 group-hover:underline flex items-center gap-1">
            Call Sales Desk →
          </span>
        </a>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-[#0A4D8C]" />
          <h2 className="text-lg font-extrabold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-slate-900 text-xs md:text-sm bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-100 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket Submission Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-extrabold text-slate-900">Submit a Support Ticket</h2>
          <p className="text-xs text-slate-500">Need custom help? Send a ticket to our technical support desk.</p>
        </div>

        {ticketSubmitted ? (
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-extrabold text-slate-900 text-base">Support Ticket Submitted!</h3>
            <p className="text-xs text-emerald-800">
              Reference: <strong>TKT-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our team will contact {ticketPhone} within 2 hours.
            </p>
            <button
              onClick={() => {
                setTicketSubmitted(false);
                setTicketMessage('');
              }}
              className="mt-2 text-xs font-bold text-[#0A4D8C] underline"
            >
              Submit Another Ticket
            </button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Kumar"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={ticketPhone}
                  onChange={(e) => setTicketPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              >
                <option value="Order / Delivery Tracking">Order / Delivery Tracking</option>
                <option value="B2B RFQ Quotation Inquiry">B2B RFQ Quotation Inquiry</option>
                <option value="Product Technical Specifications">Product Technical Specifications</option>
                <option value="Bulk Tanker Dispatch Request">Bulk Tanker Dispatch Request</option>
                <option value="General Support">General Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Message / Inquiry Details *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe your query..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold py-3 px-6 rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Submit Support Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
