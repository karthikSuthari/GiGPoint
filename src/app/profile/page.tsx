'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { 
  User, 
  Building2, 
  FileText, 
  Package, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  ArrowLeft, 
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const savedOrders = useCartStore((state) => state.savedOrders);
  const savedQuotes = useCartStore((state) => state.savedQuotes);
  const [user, setUser] = useState<{
    name: string;
    role: string;
    email: string;
    phone: string;
    business_name: string;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lubeswala_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    } else {
      // Default demo profile
      setUser({
        name: 'Priya Sharma',
        role: 'buyer',
        email: 'procurement@apex.com',
        phone: '+91 98765 43210',
        business_name: 'Apex Auto Tech & Fleet Pvt Ltd'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lubeswala_user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F5A623] text-slate-950 rounded-2xl flex items-center justify-center text-2xl font-black shadow">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold">{user.name}</h1>
              <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                {user.role === 'merchant' ? 'Distributor Vendor' : 'Verified Buyer'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-[#F5A623]" /> {user.business_name}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#0A4D8C] transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-2xl font-black text-[#0A4D8C]">{savedOrders.length}</span>
            <h3 className="text-xs font-bold text-slate-700 mt-1">Retail Orders Placed</h3>
          </div>
          <Package className="w-8 h-8 text-blue-100 group-hover:text-[#0A4D8C] transition-colors" />
        </Link>

        <Link
          href="/quotes"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#0A4D8C] transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-2xl font-black text-[#F5A623]">{savedQuotes.length}</span>
            <h3 className="text-xs font-bold text-slate-700 mt-1">Active B2B RFQs</h3>
          </div>
          <FileText className="w-8 h-8 text-amber-100 group-hover:text-[#F5A623] transition-colors" />
        </Link>

        <Link
          href="/dealers"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#0A4D8C] transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-2xl font-black text-emerald-600">6</span>
            <h3 className="text-xs font-bold text-slate-700 mt-1">Nearby Depots</h3>
          </div>
          <MapPin className="w-8 h-8 text-emerald-100 group-hover:text-emerald-600 transition-colors" />
        </Link>
      </div>

      {/* Business Details & Account Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Details */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Account Profile & Contact
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Business / Company Name:</span>
              <span className="font-bold text-slate-900">{user.business_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Contact Email:</span>
              <span className="font-bold text-slate-900">{user.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Contact Phone:</span>
              <span className="font-bold text-slate-900">{user.phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">GST Identification Number:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">27AAAAA0000A1Z5</span>
            </div>
          </div>
        </div>

        {/* Portals & Actions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Portals & Shortcuts
          </h2>

          <Link
            href="/dashboard"
            className="p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-2xl flex items-center justify-between hover:scale-[1.01] transition-transform shadow-sm text-xs"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5" />
              <span>Distributor Vendor Upload Dashboard</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="/request-quote"
            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold rounded-2xl flex items-center justify-between transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0A4D8C]" />
              <span>Submit New B2B Bulk RFQ</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            href="/support"
            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold rounded-2xl flex items-center justify-between transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>24/7 Support & Quality Reports</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
