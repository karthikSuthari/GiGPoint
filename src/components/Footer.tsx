'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Droplet, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Headphones, 
  Building2, 
  ArrowUpRight,
  User,
  LayoutDashboard,
  Truck,
  Layers,
  PlusCircle
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-10 pb-24 md:pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#F5A623] text-[#0A4D8C] p-2 rounded-xl font-bold shadow group-hover:scale-105 transition-transform">
              <Droplet className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight text-white">
                Lubeswala<span className="text-[#F5A623]">.com</span>
              </div>
              <div className="text-[10px] text-blue-300 font-medium tracking-wide">
                A PETRO BAZAAR PLATFORM
              </div>
            </div>
          </Link>

          <p className="text-xs text-slate-400 leading-relaxed">
            India's premier digital mobile commerce ecosystem for industrial liquid fuels (Furnace Oil, LDO, LVFO), bitumen, pyrolysis oils, and high-performance lubricants.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 p-2.5 rounded-xl w-fit">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Genuine Sealed Batch Guarantee</span>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Services & Products</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/diesel-delivery" className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400 font-bold">
                <Truck className="w-3.5 h-3.5" /> Doorstep Mobile Diesel Delivery
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#F5A623] font-bold">
                <Layers className="w-3.5 h-3.5" /> Compare Product Specifications
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-white transition-colors flex items-center gap-1">
                Catalog Search & Brand Filters
              </Link>
            </li>
            <li>
              <Link href="/dealers" className="hover:text-white transition-colors flex items-center gap-1">
                Regional Depots & Stockists Map
              </Link>
            </li>
            <li>
              <Link href="/request-quote" className="hover:text-white transition-colors flex items-center gap-1">
                B2B Bulk RFQ Quotation
              </Link>
            </li>
            <li>
              <Link href="/advisor" className="hover:text-white transition-colors flex items-center gap-1 text-blue-300 font-semibold">
                Groq AI Lubricant Advisor
              </Link>
            </li>
          </ul>
        </div>

        {/* Account & Merchant Portal */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Portals & Admin</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-[#F5A623]">
                <PlusCircle className="w-3.5 h-3.5" /> Admin Add Items Portal
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-blue-300">
                <User className="w-3.5 h-3.5" /> Buyer & Merchant Login
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-white transition-colors flex items-center gap-1">
                My Account & Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-slate-300">
                <LayoutDashboard className="w-3.5 h-3.5" /> Distributor Vendor Dashboard
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition-colors flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" /> Help Center & FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">PetroBazaar HQ Contact</h3>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
              <span>Plot 45, Nacharam Industrial Area, Hyderabad, Telangana 500001</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#F5A623] shrink-0" />
              <a href="tel:+919396628880" className="hover:text-white transition-colors">+91 93966 28880</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
              <a href="mailto:srinivas@petrobazaar.com" className="hover:text-white transition-colors">srinivas@petrobazaar.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 Lubeswala.com & PetroBazaar. All Rights Reserved.</p>
        <p className="text-[11px] text-slate-400">Track 3 Mobile Commerce Hackathon Prototype • Powered by Groq Llama-3 & Supabase</p>
      </div>
    </footer>
  );
}
