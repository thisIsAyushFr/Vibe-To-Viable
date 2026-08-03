import { Router, Request, Response } from 'express';
import axios from 'axios';
import { ErrorTypes } from '../middleware/errorHandler.js';

const router = Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

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
  if (!apiKey) {
    throw ErrorTypes.INTERNAL_ERROR('GROQ_API_KEY is not configured on the server');
  }

  const messages = [
    ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
    { role: 'user', content: finalUserMessage },
  ];

  try {
    const groqResponse = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        temperature: 0.9,
        messages,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const reply = groqResponse.data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw ErrorTypes.INTERNAL_ERROR('Empty response from Groq API');
    }

    res.json({ reply });
  } catch (error: any) {
    if (error.isAxiosError) {
      const status = error.response?.status || 502;
      const detail = error.response?.data?.error?.message || error.message;
      throw ErrorTypes.INTERNAL_ERROR(`Groq API error (${status}): ${detail}`);
    }
    throw error;
  }
});

export default router;
