import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import AIChatBot from '@/components/AIChatBot';

export const metadata: Metadata = {
  title: 'Lubeswala.com — PetroBazaar Mobile Commerce Platform',
  description: 'Nationwide B2B & B2C petroleum marketplace. Buy Furnace Oil (FO), LDO, Bitumen VG-30, HP/Servo lubricants with live Groq Llama-3 AI Assistant and RFQ quote tracking.',
  keywords: ['PetroBazaar', 'Lubeswala', 'Furnace Oil', 'LDO', 'Bitumen', 'Engine Oil', 'Servo', 'HP Lubes', 'Pyrolysis Oil'],
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
        
        {/* Floating Groq Llama-3 Database-Connected AI Chatbot */}
        <AIChatBot />

        {/* Footer for desktop view */}
        <footer className="hidden md:block bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-semibold text-slate-200">PetroBazaar & Lubeswala.com — Official Mobile Commerce Platform</p>
            <p className="mt-1 text-xs text-slate-500">Updates of crude markets, industrial fuels (FO/LDO), bitumen & lubricants distribution across India</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
