/* ================================================================
   CareSync AI widget — single shared script
   ----------------------------------------------------------------
   Owns the ONE copy of the widget markup and all of its behaviour.
   Every page (index/React, admin.html, Patient.html, Doctor, Nurse)
   only has to load shared-ai.css + this file; the widget injects and
   wires itself. Do not duplicate the markup in a page or component.

   Behaviour is ported from the Patient dashboard reference:
     - click the FAB           -> toggle panel
     - click the close button  -> close panel
     - click outside the panel -> close panel
     - send / Enter            -> "You: <msg>", a "Thinking..." bubble, then
                                  the reply replaces the thinking bubble

   Public API (window.CareSyncAI):
     open() close() toggle()
     send()                    - send whatever is in the input
     addMessage(label, text)   - append a message bubble
     clearChat()
     onSend                    - assign a (message) => string | Promise<string>
                                 handler to replace the transport entirely

   The reply transport posts to our own backend (server/src/routes/ai.ts, see
   DEFAULT_PROXY_URL below), which holds the Groq API key server-side — the key
   never reaches the browser. Override the endpoint by setting, before this
   script loads:

     window.CARESYNC_AI_CONFIG = { proxyUrl: '/some/other/endpoint' };
   ================================================================ */

(function () {
  'use strict';

  // Guard: the script may be injected more than once by SPA navigation.
  if (window.CareSyncAI && window.CareSyncAI.__initialised) return;

  var PANEL_ID = 'aiPanel';
  var FAB_ID = 'aiFab';

  /* ----------------------------------------------------------------
     The single source of truth for the widget markup.
     Copied from the Patient dashboard reference. The reference panel
     carried a `raised` class for its surface styling; those three
     properties now live in shared-ai.css on `.ai-panel` instead, so
     the widget is self-contained on pages without that class.
     ---------------------------------------------------------------- */
  var MARKUP = [
    '<button class="ai-fab" id="' + FAB_ID + '" type="button" aria-label="Open CareSync AI Assistant">',
    '  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    '    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    '  </svg>',
    '</button>',
    '<div class="ai-panel" id="' + PANEL_ID + '" role="dialog" aria-label="CareSync AI Assistant">',
    '  <div class="ai-panel-inner">',
    '    <div class="ai-panel-head">',
    '      <span class="dot"></span>',
    '      <span class="ai-panel-title">CareSync AI</span>',
    '      <button class="ai-panel-close" id="aiPanelClose" type="button" aria-label="Close CareSync AI Assistant">×</button>',
    '    </div>',
    '    <div class="ai-panel-sub">How can I help today?</div>',
    '    <div class="ai-chat-log"></div>',
    '    <div class="ai-chat-input-row">',
    '      <input class="ai-chat-input" type="text" placeholder="Ask CareSync AI..." aria-label="Ask CareSync AI">',
    '      <button class="ai-chat-send" type="button" aria-label="Send message">',
    '        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    '          <path d="m22 2-7 20-4-9-9-4Z"/>',
    '          <path d="M22 2 11 13"/>',
    '        </svg>',
    '      </button>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  /* ---------------------------------------------------------------- */

  function panel() {
    return document.getElementById(PANEL_ID);
  }

  function within(selector, target) {
    // Scoped so the widget never reacts to lookalike controls elsewhere on the
    // page — Patient.html reuses .ai-chat-send / .ai-chat-input for its
    // "chat with doctor" card and its appointment form.
    var el = target && target.closest ? target.closest(selector) : null;
    if (!el) return null;
    return el.closest('#' + PANEL_ID) ? el : null;
  }

  function mount() {
    if (document.getElementById(FAB_ID)) return; // already on the page
    if (!document.body) return;
    var holder = document.createElement('div');
    holder.innerHTML = MARKUP;
    while (holder.firstChild) document.body.appendChild(holder.firstChild);
  }

  function open() {
    var p = panel();
    if (p) p.classList.add('open');
  }

  function close() {
    var p = panel();
    if (p) p.classList.remove('open');
  }

  function toggle() {
    var p = panel();
    if (p) p.classList.toggle('open');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Matches the reference bubble exactly: "<strong>You:</strong> message".
  // Values are escaped rather than interpolated, closing the XSS hole the
  // reference had while rendering identically for normal text.
  function addMessage(label, text) {
    var p = panel();
    if (!p) return null;
    var log = p.querySelector('.ai-chat-log');
    if (!log) return null;
    var msg = document.createElement('div');
    msg.className = 'ai-chat-msg';
    msg.innerHTML = '<strong>' + escapeHtml(label) + '</strong> ' + escapeHtml(text);
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
    return msg;
  }

  function clearChat() {
    var p = panel();
    if (!p) return;
    var log = p.querySelector('.ai-chat-log');
    if (log) log.innerHTML = '';
  }

  function config() {
    return window.CARESYNC_AI_CONFIG || {};
  }

  // Default proxy: our own backend (server/src/routes/ai.ts) holds the Groq key
  // server-side. Override by setting window.CARESYNC_AI_CONFIG = { proxyUrl }
  // before this script loads.
  var DEFAULT_PROXY_URL = 'http://localhost:5000/api/ai/chat';

  // Grounding context + guardrails, promoted from index.html (the most complete
  // of the previous per-page implementations). The guardrails matter: per
  // CLAUDE.md the assistant provides decision support only and must never give
  // a diagnosis or replace professional medical judgement.
  var WEBSITE_CONTEXT = [
    'CareSync Hospital Information:',
    '',
    'SERVICES & DEPARTMENTS:',
    '- 35+ Medical Specialties',
    '- Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology',
    '- 24x7 Emergency & Trauma Services',
    '- Advanced Operation Theaters',
    '- 3T MRI & Diagnostic Facilities',
    '- Multi-bed ICUs',
    '- Robotic Surgical Tools',
    '',
    'DOCTORS & SPECIALISTS:',
    '- 250+ Qualified Doctors',
    '- Dr. Arjun Sharma - Cardiology',
    '- Dr. Ananya Rao - Neurology',
    '- Dr. Vikram Patel - Orthopedics',
    '- Dr. Priya Nair - Emergency Medicine',
    '',
    'OPD TIMINGS:',
    '- Monday to Saturday: 09:00 AM - 05:00 PM',
    '- All departments available',
    '- 24x7 Emergency services',
    '',
    'PATIENT SERVICES:',
    '- Digital health records',
    '- Real-time appointment booking',
    '- Medicine reminders',
    '- Medical report access',
    '- AI-powered health summaries',
    '- Recovery guidance',
    '',
    'FACILITIES:',
    '- State-of-the-art diagnostic facilities',
    '- NABH & ISO 9001:2015 Accredited',
    '- Modern patient care services',
    '- Digital queue confirmation',
    '- Instant consultation booking',
    '',
    'EMERGENCY:',
    '- 24x7 Trauma & Emergency: +91 1800 123 4567',
    '- Ambulance: 108',
    '- Emergency Gate 1 available',
    '',
    'PATIENT HEALTH MONITORING:',
    '- Vitals tracking (Blood pressure, Oxygen, Temperature)',
    '- Blood sugar monitoring',
    '- Medication adherence tracking',
    '- Lab results access',
    '- Health trends analysis',
    '- Recovery progress tracking',
    '',
    'MEDICINES & PRESCRIPTIONS:',
    '- Digital prescription management',
    '- Medicine reminders',
    '- Dosage instructions',
    '- Allergy tracking',
    '- Drug interaction checks',
    '',
    'APPOINTMENTS:',
    '- Instant online booking',
    '- Doctor selection by specialty',
    '- Time slot availability',
    '- Digital confirmation',
    '- Follow-up scheduling',
    '',
    'PATIENT DASHBOARD FEATURES:',
    '- Upcoming appointments',
    '- Active diagnoses',
    '- Allergies & precautions',
    '- Lab results',
    '- Recovery milestones',
    '- Care team information',
    '- Hospital journey tracking'
  ].join('\n');

  var SYSTEM_PROMPT = [
    "You are CareSync Hospital's AI assistant. Answer ONLY based on the provided",
    'hospital information below. If a question is not related to CareSync Hospital',
    'or cannot be answered from the provided information, politely decline and',
    'redirect to hospital services.',
    '',
    'Hospital Information:',
    WEBSITE_CONTEXT,
    '',
    'IMPORTANT RULES:',
    '1. Only answer questions about CareSync Hospital services, doctors, facilities, and patient care',
    '2. Do NOT answer general knowledge questions unrelated to the hospital',
    '3. Do NOT provide medical diagnosis or treatment advice - refer to doctors',
    '4. Be helpful, concise, and professional',
    '5. If uncertain, suggest contacting the hospital directly at +91 1800 123 4567'
  ].join('\n');

  // Posts to our backend, which holds the Groq key server-side — the key is
  // never sent to the browser.
  async function askViaProxy(proxyUrl, message) {
    var response = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt: SYSTEM_PROMPT, userMessage: message })
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    var data = await response.json();
    return data.reply || data.message || '';
  }

  async function sendMessageToAI(message) {
    var cfg = config();
    try {
      return await askViaProxy(cfg.proxyUrl || DEFAULT_PROXY_URL, message);
    } catch (err) {
      console.error(err);
      return "Sorry, I couldn't reach the AI service.";
    }
  }

  function resolveHandler() {
    if (typeof api.onSend === 'function') return api.onSend;
    return sendMessageToAI;
  }

  async function send() {
    var p = panel();
    if (!p) return;
    var input = p.querySelector('.ai-chat-input');
    if (!input) return;

    var message = input.value.trim();
    if (!message) return;

    addMessage('You:', message);
    input.value = '';

    var thinking = addMessage('AI:', 'Thinking...');

    var reply;
    try {
      reply = await resolveHandler()(message);
    } catch (err) {
      console.error('CareSync AI: send handler failed', err);
      reply = "Sorry, I couldn't reach the AI service.";
    }

    if (thinking) thinking.remove();
    addMessage('AI:', reply);
  }

  /* ---- delegated events: bound once, work for markup added at any time ---- */

  document.addEventListener('click', function (e) {
    var p = panel();
    if (!p) return;

    if (e.target.closest && e.target.closest('#' + FAB_ID)) {
      toggle();
      return;
    }
    if (within('.ai-panel-close', e.target)) {
      close();
      return;
    }
    if (within('.ai-chat-send', e.target)) {
      send();
      return;
    }
    if (p.classList.contains('open') && !p.contains(e.target)) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (!within('.ai-chat-input', e.target)) return;
    e.preventDefault();
    send();
  });

  /* ---- mount ---- */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  var api = {
    __initialised: true,
    mount: mount,
    open: open,
    close: close,
    toggle: toggle,
    send: send,
    addMessage: addMessage,
    clearChat: clearChat,
    sendMessageToAI: sendMessageToAI,
    onSend: null
  };

  window.CareSyncAI = api;
})();
