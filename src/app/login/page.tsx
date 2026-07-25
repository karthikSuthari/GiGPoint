'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  Droplet
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'buyer' | 'merchant'>('buyer');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'phone' && !phone) {
      alert('Please enter your mobile phone number.');
      return;
    }
    if (loginMethod === 'email' && (!email || !password)) {
      alert('Please enter your GST email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (loginMethod === 'phone') {
        setOtpSent(true);
      } else {
        // Direct Login for Email
        const userObj = {
          name: role === 'buyer' ? 'Priya Sharma (Apex Auto)' : 'Srinivas Rao (PetroBazaar Distributor)',
          role,
          email,
          phone: '9876543210',
          business_name: role === 'buyer' ? 'Apex Industrial Logistics' : 'PetroBazaar Central Stockist'
        };
        localStorage.setItem('lubeswala_user', JSON.stringify(userObj));
        router.push(role === 'merchant' ? '/dashboard' : '/profile');
      }
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      alert('Please enter the 4-digit verification code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userObj = {
        name: role === 'buyer' ? 'Rajesh Kumar' : 'Srinivas Rao',
        role,
        email: 'user@petrobazaar.com',
        phone,
        business_name: role === 'buyer' ? 'Rajesh Auto Works' : 'PetroBazaar Regional Hub'
      };
      localStorage.setItem('lubeswala_user', JSON.stringify(userObj));
      router.push(role === 'merchant' ? '/dashboard' : '/profile');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto my-6 space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#F5A623] text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Droplet className="w-7 h-7 fill-current text-[#0A4D8C]" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome to Lubeswala</h1>
          <p className="text-xs text-slate-500">Sign in to track orders, submit B2B RFQs, or manage product dispatches</p>
        </div>

        {/* Account Role Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setRole('buyer')}
            className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              role === 'buyer'
                ? 'bg-[#0A4D8C] text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" /> Buyer / Workshop
          </button>
          <button
            onClick={() => setRole('merchant')}
            className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              role === 'merchant'
                ? 'bg-[#0A4D8C] text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#F5A623]" /> Merchant Seller
          </button>
        </div>

        {/* Login Form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Toggle Phone vs Email */}
            <div className="flex justify-end gap-3 text-xs">
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`font-bold ${loginMethod === 'phone' ? 'text-[#0A4D8C] underline' : 'text-slate-400'}`}
              >
                Mobile OTP
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`font-bold ${loginMethod === 'email' ? 'text-[#0A4D8C] underline' : 'text-slate-400'}`}
              >
                GST Email
              </button>
            </div>

            {loginMethod === 'phone' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GST Registered Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold py-3.5 rounded-xl shadow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Processing...' : loginMethod === 'phone' ? 'Get OTP Verification Code' : 'Sign In to Account'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Preset Login Accounts */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                Quick Demo Presets (Database Seed Accounts)
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const userObj = {
                      name: 'PetroBazaar Super Admin',
                      role: 'admin',
                      email: 'admin@petrobazaar.com',
                      phone: '+91 93966 28880',
                      business_name: 'PetroBazaar Corporate HQ'
                    };
                    localStorage.setItem('lubeswala_user', JSON.stringify(userObj));
                    router.push('/admin');
                  }}
                  className="p-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-[11px] font-extrabold text-amber-950 transition-all text-center"
                >
                  👑 Admin
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const userObj = {
                      name: 'Srinivas Rao (Nacharam Depot)',
                      role: 'dealer',
                      email: 'dealer.nacharam@petrobazaar.com',
                      phone: '+91 93966 28880',
                      business_name: 'PetroBazaar Central Stockist Hub'
                    };
                    localStorage.setItem('lubeswala_user', JSON.stringify(userObj));
                    router.push('/dashboard');
                  }}
                  className="p-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-xl text-[11px] font-extrabold text-blue-950 transition-all text-center"
                >
                  🏪 Stockist
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const userObj = {
                      name: 'Srinivas Rao (Apex Industries)',
                      role: 'customer',
                      email: 'srinivas@apexindustries.in',
                      phone: '+91 98888 77777',
                      business_name: 'Apex Steel Industries'
                    };
                    localStorage.setItem('lubeswala_user', JSON.stringify(userObj));
                    router.push('/profile');
                  }}
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-[11px] font-extrabold text-emerald-950 transition-all text-center"
                >
                  🏢 Buyer
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* OTP Verification Form */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-900 text-center">
              Enter the 4-digit verification code sent to <strong>+91 {phone}</strong>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 text-center">Enter 4-Digit OTP</label>
              <input
                type="text"
                maxLength={4}
                required
                placeholder="1 2 3 4"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold py-3.5 rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP & Continue'}
            </button>

            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-center text-xs text-slate-500 hover:underline"
            >
              Change Phone Number
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secure GST Authenticated Account Access</span>
        </div>
      </div>
    </div>
  );
}
