'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  FileText, 
  Sparkles, 
  Package, 
  MessageSquare,
  Droplet,
  MapPin,
  Headphones,
  User,
  PlusCircle
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const quoteItems = useCartStore((state) => state.quoteItems);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalQuoteCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/request-quote', label: 'RFQ Quote', icon: FileText, badge: totalQuoteCount },
    { href: '/advisor', label: 'AI Advisor', icon: Sparkles, highlight: true },
    { href: '/admin', label: 'Add Items', icon: PlusCircle },
    { href: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0A4D8C] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#F5A623] text-[#0A4D8C] p-2 rounded-lg font-bold shadow group-hover:scale-105 transition-transform">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight">
                Lubeswala<span className="text-[#F5A623]">.com</span>
              </div>
              <div className="text-[10px] text-blue-200 font-medium tracking-wide">
                A PETRO BAZAAR PLATFORM
              </div>
            </div>
          </Link>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs font-bold bg-[#F5A623] hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-full shadow transition-transform hover:scale-105"
              title="Admin Portal - Add Items"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Add Items (Admin)</span>
              <span className="sm:hidden">Admin</span>
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full border border-white/20 transition-colors"
              title="User Profile"
            >
              <User className="w-4 h-4 text-[#F5A623]" />
              <span className="hidden md:inline">Profile</span>
            </Link>

            <Link
              href="/dealers"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-blue-100 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Depots</span>
            </Link>

            <Link
              href="/support"
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-blue-100 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Help</span>
            </Link>

            <Link
              href="/request-quote"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-blue-100 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              <FileText className="w-4 h-4 text-[#F5A623]" />
              <span>Bulk RFQ</span>
              {totalQuoteCount > 0 && (
                <span className="bg-[#F5A623] text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalQuoteCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F5A623] text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/919396628880?text=Hi%20PetroBazaar%20Lubeswala%20Team,%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-400 hover:bg-white/10 rounded-full transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-6 h-6 fill-emerald-500/20" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg md:hidden">
        <div className="flex justify-around items-center h-16 px-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center w-full h-full relative text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-[#0A4D8C] font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 ${
                      link.highlight
                        ? 'text-[#F5A623] animate-pulse'
                        : isActive
                        ? 'text-[#0A4D8C]'
                        : 'text-slate-500'
                    }`}
                  />
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#F5A623] text-slate-900 text-[10px] font-bold px-1 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[11px]">{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-8 h-1 bg-[#0A4D8C] rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
