import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Eres Aliado, un asistente útil y directo para pequeñas empresas en WhatsApp.'
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.7
    });

    const respuestaGenerada = completion.choices[0].message.content;

    return NextResponse.json({
      reply: respuestaGenerada
    });

  } catch (error) {
    console.error('Error en /respond:', error);
    return NextResponse.json(
      { error: 'Hubo un error procesando tu mensaje' },
      { status: 500 }
    );
  }
}
