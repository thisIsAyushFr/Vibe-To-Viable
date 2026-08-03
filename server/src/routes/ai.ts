import { Router, Request, Response } from 'express';
import axios from 'axios';
import { ErrorTypes } from '../middleware/errorHandler.js';

const router = Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Never log the full key — just enough to confirm one is actually loaded.
function maskedKey(key: string | undefined) {
  if (!key) return '(none)';
  return `${key.slice(0, 6)}…${key.slice(-4)} (len ${key.length})`;
}

// Proxies chat requests to Groq so the API key stays server-side — never sent
// to the browser. Accepts either { message } (used by the shared-ai.js widget)
// or { systemPrompt, userMessage, jsonMode } (used by callGroqAPI on the React side).
router.post('/chat', async (req: Request, res: Response) => {
  const { message, systemPrompt, userMessage, jsonMode } = req.body || {};

  const finalUserMessage = userMessage || message;
  if (!finalUserMessage) {
    throw ErrorTypes.VALIDATION_ERROR('userMessage (or message) is required');
  }

  const apiKey = process.env.GROQ_API_KEY;
  console.log('[ai/chat] incoming request — jsonMode:', !!jsonMode, 'GROQ_API_KEY:', maskedKey(apiKey));

  if (!apiKey) {
    console.error('[ai/chat] GROQ_API_KEY missing from server env — check server/.env');
    throw ErrorTypes.INTERNAL_ERROR('GROQ_API_KEY is not configured on the server');
  }

  const messages = [
    ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
    { role: 'user', content: finalUserMessage },
  ];

  const requestBody = {
    model: GROQ_MODEL,
    temperature: 0.9,
    messages,
    ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
  };
  console.log('[ai/chat] → POST', GROQ_API_URL, 'model:', GROQ_MODEL, 'headers:', {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${maskedKey(apiKey)}`,
  });

  try {
    const groqResponse = await axios.post(GROQ_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log('[ai/chat] ← Groq responded', groqResponse.status);

    const reply = groqResponse.data?.choices?.[0]?.message?.content;
    if (!reply) {
      console.error('[ai/chat] Groq returned no content:', JSON.stringify(groqResponse.data));
      throw ErrorTypes.INTERNAL_ERROR('Empty response from Groq API');
    }

    res.json({ reply });
  } catch (error: any) {
    if (error.isAxiosError) {
      const status = error.response?.status || 502;
      const detail = error.response?.data?.error?.message || error.message;
      console.error(`[ai/chat] Groq API error (${status}):`, detail, '— full response body:', JSON.stringify(error.response?.data));
      if (status === 401 || status === 403) {
        throw ErrorTypes.INTERNAL_ERROR(`Groq auth failed (${status}) — GROQ_API_KEY is invalid or revoked. ${detail}`);
      }
      if (status === 429) {
        throw ErrorTypes.INTERNAL_ERROR(`Groq rate limit hit (429). ${detail}`);
      }
      throw ErrorTypes.INTERNAL_ERROR(`Groq API error (${status}): ${detail}`);
    }
    console.error('[ai/chat] non-Axios error:', error);
    throw error;
  }
});

export default router;
