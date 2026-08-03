// Single place every AI-powered component talks to. Calls go to our own backend
// (server/src/routes/ai.ts), which holds the Groq API key server-side — the key
// must never live in frontend code, since anything shipped to the browser is
// visible to anyone who opens dev tools.
const AI_CHAT_ENDPOINT = '/api/ai/chat';

async function requestGroq(systemPrompt, userMessage, { jsonMode = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const body = { systemPrompt, userMessage, jsonMode };

  console.log('[aiClient] → POST', AI_CHAT_ENDPOINT, { headers, body });

  let response;
  try {
    response = await fetch(AI_CHAT_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  } catch (networkErr) {
    // fetch() itself threw: DNS failure, connection refused, CORS preflight
    // rejected, offline, etc. — the backend was never reached.
    console.error('[aiClient] network error (request never reached the server):', networkErr);
    throw new Error(
      `Could not reach the AI backend at ${AI_CHAT_ENDPOINT}. Is the Express server ` +
      `running on :5000 and is vite's dev proxy configured? Raw error: ${networkErr.message}`
    );
  }

  const rawText = await response.text();
  console.log('[aiClient] ← status', response.status, response.statusText, 'body:', rawText);

  if (!response.ok) {
    let detail = rawText;
    try {
      detail = JSON.parse(rawText)?.error?.message || rawText;
    } catch {
      // rawText wasn't JSON (e.g. an HTML error page from a wrong URL) — keep as-is
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error(`Auth failed (${response.status}): GROQ_API_KEY on the server is missing or invalid. ${detail}`);
    }
    if (response.status === 429) {
      throw new Error(`Rate limited (429) by Groq. ${detail}`);
    }
    if (response.status === 0) {
      throw new Error('Request blocked, likely by CORS — check the browser Network tab.');
    }
    throw new Error(`AI request failed (${response.status}): ${detail}`);
  }

  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error('AI backend returned non-JSON response — check server logs.');
  }

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

// Wire this to a "Test AI connection" button. Logs everything and returns a
// short human-readable result string instead of throwing, so the UI can just
// display it.
export async function testAIConnection() {
  console.log('[aiClient] running connection test against', AI_CHAT_ENDPOINT);
  try {
    const reply = await callGroqAPI('Reply with exactly one word: OK', 'ping');
    console.log('[aiClient] test succeeded, reply:', reply);
    return `✅ Connected — AI replied: "${reply}"`;
  } catch (err) {
    console.error('[aiClient] test failed:', err);
    return `❌ ${err.message}`;
  }
}
