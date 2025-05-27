export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', 
        messages: [
          {
            role: 'system',
            content: 'Eres un asesor comercial experto en negocios. Responde con ideas claras y útiles.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || 'Lo siento, no tengo una respuesta en este momento.';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error en GPT handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
