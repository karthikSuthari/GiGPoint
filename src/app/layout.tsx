import type { Metadata } from 'next';
import './globals.css';
import CrudeTicker from '@/components/CrudeTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      <body className="antialiased flex flex-col min-h-screen bg-slate-50">
        {/* Real-time Streaming Crude & Petroleum Commodity Price Ticker */}
        <CrudeTicker />

        <Navbar />
        
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>
        
        {/* Floating Groq Llama-3 Database-Connected AI Chatbot */}
        <AIChatBot />

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
