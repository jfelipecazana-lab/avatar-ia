export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system, tts } = req.body;

  // Modo TTS: convertir texto a voz
  if (tts) {
    try {
      const voiceRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/CdAqYBLnsNjmTqYgD5Ha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: tts,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        })
      });

      if (!voiceRes.ok) {
        const err = await voiceRes.text();
        return res.status(500).json({ error: 'ElevenLabs error: ' + err });
      }

      const audioBuffer = await voiceRes.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString('base64');
      return res.status(200).json({ audio: base64Audio });
    } catch (err) {
      return res.status(500).json({ error: 'TTS error: ' + err.message });
    }
  }

  // Modo chat: respuesta de texto
  if (!messages || !system) {
    return res.status(400).json({ error: 'Missing messages or system prompt' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        system,
        messages
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error' });
    return res.status(200).json({ reply: data.content[0].text });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
  }
}
