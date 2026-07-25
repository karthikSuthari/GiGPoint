import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { question, vehicleType } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    let aiAdviceText = '';
    let recommendedGrade = '';

    // 1. Try Groq API (Ultra-fast LLM inference)
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
              {
                role: 'system',
                content: 'You are an expert Lubricants & Petroleum Technical Advisor for Lubeswala.com (Petro Bazaar). Answer user queries clearly in non-technical terms. Recommend the ideal oil grade (e.g. 20W-40, 15W-40, DOT 4, NLGI 2, FO 180). Keep response concise, under 80 words.'
              },
              {
                role: 'user',
                content: `User Question: "${question}", Vehicle/Application: "${vehicleType || 'General'}".`
              }
            ],
            temperature: 0.3
          })
        });

        const data = await response.json();
        aiAdviceText = data.choices?.[0]?.message?.content || '';
      } catch (err) {
        console.error('Groq API call error:', err);
      }
    }

    // 2. Fallback to Gemini API if Groq wasn't configured
    if (!aiAdviceText && geminiApiKey && geminiApiKey !== 'your-gemini-api-key-here') {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an expert Lubricants & Petroleum Technical Advisor for Lubeswala.com (Petro Bazaar). Answer the user query clearly in non-technical terms. Recommend the ideal oil grade (e.g. 20W-40, 15W-40, DOT 4, NLGI 2, FO 180). Query: "${question}", Vehicle: "${vehicleType || 'General'}". Keep response under 80 words.`
                    }
                  ]
                }
              ]
            })
          }
        );
        const data = await response.json();
        aiAdviceText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } catch (err) {
        console.error('Gemini API call error:', err);
      }
    }

    // 3. Rule-based Knowledge Matcher if APIs are unavailable
    const qLower = question.toLowerCase();
    if (qLower.includes('diesel') || qLower.includes('truck') || qLower.includes('tractor') || qLower.includes('laal ghoda')) {
      recommendedGrade = '20W-40';
      if (!aiAdviceText) {
        aiAdviceText = 'For heavy-duty diesel engines, commercial trucks, and agricultural tractors operating in Indian climate conditions, we recommend HP Laal Ghoda 20W-40 or Servo Futura D 15W-40. These provide high temperature viscosity and protect against engine wear and soot.';
      }
    } else if (qLower.includes('brake') || qLower.includes('stopping') || qLower.includes('fluid')) {
      recommendedGrade = 'DOT 4';
      if (!aiAdviceText) {
        aiAdviceText = 'For hydraulic braking systems in passenger cars and heavy commercial vehicles, high-boiling DOT 4 brake fluid is essential. Servo Brake Fluid DOT 4 resists vapor lock and protects against cylinder corrosion.';
      }
    } else if (qLower.includes('grease') || qLower.includes('bearing') || qLower.includes('chassis')) {
      recommendedGrade = 'NLGI 2';
      if (!aiAdviceText) {
        aiAdviceText = 'For chassis lubrication, wheel bearings, and high-pressure mechanical joints, a lithium-based NLGI 2 multi-purpose grease like Servo MP Grease provides maximum water resistance and rust protection.';
      }
    } else if (qLower.includes('furnace') || qLower.includes('boiler') || qLower.includes('industrial') || qLower.includes('fuel')) {
      recommendedGrade = 'FO Grade 180';
      if (!aiAdviceText) {
        aiAdviceText = 'For industrial boilers, heat treatment plants, and heavy furnaces, high-calorific Furnace Oil Grade 180 is the recommended liquid fuel, offering superior calorific value (10,200 kcal/kg).';
      }
    } else {
      recommendedGrade = '15W-40';
      if (!aiAdviceText) {
        aiAdviceText = 'For modern engines and general automotive maintenance, a multi-grade synthetic lubricant like Servo Futura 15W-40 or HP 20W-40 ensures optimal fuel efficiency, smooth cold starts, and prolonged engine health.';
      }
    }

    // Match real catalog products
    const matchedProducts = INITIAL_PRODUCTS.filter((product) => {
      if (recommendedGrade && product.grade.toLowerCase().includes(recommendedGrade.toLowerCase())) {
        return true;
      }
      return (
        product.name.toLowerCase().includes(question.toLowerCase()) ||
        product.description.toLowerCase().includes(question.toLowerCase()) ||
        product.category_slug.toLowerCase().includes(question.toLowerCase())
      );
    }).slice(0, 3);

    const productsToReturn = matchedProducts.length > 0 ? matchedProducts : INITIAL_PRODUCTS.slice(0, 3);

    return NextResponse.json({
      advice: aiAdviceText,
      recommendedGrade: recommendedGrade || '15W-40 / 20W-40',
      matchedProducts: productsToReturn
    });
  } catch (error) {
    console.error('AI Advisor error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
