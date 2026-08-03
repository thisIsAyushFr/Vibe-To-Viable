// Single place every AI-powered component talks to. Calls go to our own backend
// (server/src/routes/ai.ts), which holds the Groq API key server-side — the key
// must never live in frontend code, since anything shipped to the browser is
// visible to anyone who opens dev tools.
const AI_CHAT_ENDPOINT = '/api/ai/chat';

async function requestGroq(systemPrompt, userMessage, { jsonMode = false } = {}) {
  const response = await fetch(AI_CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userMessage, jsonMode }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    const detail = errBody?.error?.message || response.statusText;
    throw new Error(`AI request failed (${response.status}): ${detail}`);
  }

  const data = await response.json();
  if (!data.reply) {
    throw new Error('Empty response from AI service');
  }
  return data.reply;
}

// Returns the raw text reply from the model.
export async function callGroqAPI(systemPrompt, userMessage) {
  return requestGroq(systemPrompt, userMessage);
}

// Returns the reply parsed as JSON — use when systemPrompt instructs the model
// to respond with a specific JSON shape.
export async function callGroqAPIForJSON(systemPrompt, userMessage) {
  const raw = await requestGroq(systemPrompt, userMessage, { jsonMode: true });
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('Could not parse AI response as JSON');
  }
}
