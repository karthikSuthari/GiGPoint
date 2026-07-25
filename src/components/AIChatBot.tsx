'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { 
  Bot, 
  X, 
  Send, 
  Zap, 
  ShoppingCart, 
  FileText, 
  Sparkles, 
  Check, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  matchedProducts?: Product[];
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToQuote = useCartStore((state) => state.addToQuote);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: '👋 Hi! I am PetroBazaar\'s AI Assistant with direct access to our live database of Furnace Oil, LDO, Bitumen, Pyrolysis oils, and HP/Servo lubricants. Ask me about prices, stock, or technical specs!'
    }
  ]);

  const quickQuestions = [
    'Price & specs of Furnace Oil (FO 180)?',
    'Do you have Bitumen VG-30 in stock?',
    'Which engine oil for heavy diesel truck?',
    'What is the GCV of Light Diesel Oil (LDO)?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      if (data.message) {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          matchedProducts: data.matchedProducts
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#0A4D8C] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group border-2 border-[#F5A623] active:scale-95"
          aria-label="Open AI Petroleum Assistant"
        >
          <div className="relative">
            <Zap className="w-6 h-6 text-[#F5A623] fill-current animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
          </div>
          <span className="text-xs font-extrabold pr-1 hidden sm:inline">
            PetroBazaar AI
          </span>
        </button>
      )}

      {/* Expanded Chatbot Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-[85vh] sm:h-[580px] z-50 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#0A4D8C] text-white p-4 flex items-center justify-between shadow">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#F5A623] text-slate-900 rounded-xl font-bold shadow">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  PetroBazaar Live DB AI
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-extrabold border border-emerald-400/30">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">
                  Real-time inventory, pricing & specs assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#0A4D8C] text-white font-medium rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Inline Matched Product Cards inside Chat */}
                  {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Matching Database Products:
                      </span>
                      {msg.matchedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 line-clamp-1 text-[11px]">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#0A4D8C] font-extrabold block">
                              ₹ {p.price_inr.toLocaleString('en-IN')} / {p.unit}
                            </span>
                          </div>

                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => addToCart(p, 1)}
                              className="bg-[#0A4D8C] text-white p-1.5 rounded-lg hover:bg-[#083C6E]"
                              title="Buy Now"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => addToQuote(p, 1)}
                              className="bg-amber-100 text-amber-900 p-1.5 rounded-lg border border-amber-300 hover:bg-amber-200"
                              title="Get RFQ"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-2.5 rounded-2xl border border-slate-200 w-fit">
                <Bot className="w-4 h-4 text-[#0A4D8C] animate-spin" />
                <span>Querying PetroBazaar Database...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Ask about Furnace Oil, LDO, Bitumen, specs..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              className="bg-[#0A4D8C] hover:bg-[#083C6E] text-white p-2.5 rounded-xl shadow disabled:opacity-50 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
