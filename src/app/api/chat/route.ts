import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // 1. Get Live Products from Supabase DB or Fallback Data
    let productsList: Product[] = INITIAL_PRODUCTS;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (data && data.length > 0 && !error) {
          productsList = data as Product[];
        }
      } catch (err) {
        console.error('Supabase query error in chat, using fallback data:', err);
      }
    }

    // 2. Build Database Context Summary for LLM System Prompt
    const catalogContext = productsList.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      grade: p.grade,
      category: p.category_slug,
      price_inr: p.price_inr,
      unit: p.unit,
      stock_qty: p.stock_qty,
      specs: p.spec_sheet,
      bulk_available: p.is_bulk_available
    }));

    const systemPrompt = `You are PetroBazaar & Lubeswala's official AI Petroleum Assistant. You have REAL-TIME direct read access to our live database of industrial fuel oils, lubricants, bitumen, and pyrolysis oils.

LIVE DATABASE CATALOG CONTENT:
${JSON.stringify(catalogContext, null, 2)}

CATEGORIES AVAILABLE:
${JSON.stringify(INITIAL_CATEGORIES, null, 2)}

YOUR INSTRUCTIONS:
1. Answer customer queries accurately using the database content above.
2. If asked about prices, stock, or technical specs (e.g. calorific value, viscosity, flash point), quote exact values from the database.
3. If recommending a product, mention its exact name and price in ₹ INR.
4. Keep answers friendly, professional, concise, and mobile-ready (under 120 words).
5. If the user asks a question unrelated to lubricants or petroleum, politely guide them back to PetroBazaar products.`;

    const groqApiKey = process.env.GROQ_API_KEY;
    let aiMessage = '';

    // 3. Call Groq API with System Context + Chat History
    if (groqApiKey && groqApiKey !== 'your-groq-api-key-here') {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
              }))
            ],
            temperature: 0.3,
            max_tokens: 400
          })
        });

        const data = await response.json();
        aiMessage = data.choices?.[0]?.message?.content || '';
      } catch (err) {
        console.error('Groq API chat error:', err);
      }
    }

    // Fallback response if Groq API key is missing or encounters network error
    if (!aiMessage) {
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      if (lastUserMsg.includes('furnace') || lastUserMsg.includes('fo')) {
        aiMessage = `PetroBazaar Premium Furnace Oil (FO Grade 180) is available at ₹52.50 / Liter (Bulk Tanker dispatch). Gross Calorific Value is 10,200 kcal/kg with flash point of 66°C. Current stock: 50,000 Liters.`;
      } else if (lastUserMsg.includes('ldo') || lastUserMsg.includes('diesel oil')) {
        aiMessage = `Light Diesel Oil (LDO) Industrial Grade is available at ₹68.00 / Liter. Ideal for industrial generators and stationary diesel engines. GCV is 10,300 kcal/kg.`;
      } else if (lastUserMsg.includes('bitumen')) {
        aiMessage = `Bitumen VG-30 Paving Grade (IS 73:2013) is in stock at ₹44.50 / Kg (Bulk Tanker). Viscosity @ 60°C is 2400-3600 Poise for road construction.`;
      } else {
        aiMessage = `Welcome to PetroBazaar AI Assistant! I have direct access to our live inventory of Furnace Oil (FO), LDO, Bitumen VG-30, HP/Servo Engine Oils, Pyrolysis Oils, and Greases. How can I assist your order or technical spec inquiry today?`;
      }
    }

    // Match referenced products to render product cards in chat
    const lastMsgContent = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const matchedProducts = productsList.filter((p) => {
      return (
        lastMsgContent.includes(p.name.toLowerCase()) ||
        lastMsgContent.includes(p.brand.toLowerCase()) ||
        lastMsgContent.includes(p.category_slug.toLowerCase()) ||
        (p.grade && lastMsgContent.includes(p.grade.toLowerCase()))
      );
    }).slice(0, 2);

    return NextResponse.json({
      message: aiMessage,
      matchedProducts
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
