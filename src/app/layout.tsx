import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Lubeswala.com — Mobile Commerce & Lubricant Marketplace',
  description: 'Nationwide B2B & B2C petroleum and lubricant product marketplace. Buy engine oil, brake fluids, industrial greases, and furnace oil with guided AI advisor and RFQ quote tracking.',
  keywords: ['Lubeswala', 'Petro Bazaar', 'Engine Oil', 'Servo', 'HP Lubes', 'B2B Lubricants', 'Furnace Oil', 'Mobil', 'Castrol'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-slate-50 pb-20 md:pb-6">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>
        
        {/* Footer for desktop view */}
        <footer className="hidden md:block bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-semibold text-slate-200">Lubeswala.com — Trust Built In</p>
            <p className="mt-1 text-xs text-slate-500">Official Mobile Commerce Platform for Petro Bazaar (B2B & B2C Lubricant Distribution)</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
