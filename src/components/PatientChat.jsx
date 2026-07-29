import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientChat({ selectedPatient }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { from: 'doctor', text },
      { from: 'patient', text: `Message received — ${selectedPatient?.name || 'the patient'} will reply soon.` },
    ]);
    setDraft("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-3xl p-5 sm:p-6 h-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
              <MessageCircle size={17} />
            </div>
            <h2 className="text-xs font-black tracking-wider text-[#0F172A] uppercase">
              PATIENT CHAT
            </h2>
          </div>

          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#14B8A6]/15 text-[#0F766E] border border-[#14B8A6]/30">
            {selectedPatient?.name || 'No patient selected'}
          </span>
        </div>

        <div className="max-h-48 overflow-y-auto flex flex-col gap-2 mb-3">
          {messages.length === 0 && (
            <p className="text-xs text-[#64748B] italic px-1">
              No messages yet with {selectedPatient?.name || 'this patient'}.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`text-xs font-medium rounded-2xl px-3 py-2 max-w-[85%] ${
                m.from === 'doctor'
                  ? 'self-end bg-[#0F766E] text-white'
                  : 'self-start bg-[#F0FDFA] text-[#0F172A] border border-[#14B8A6]/20'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Message ${selectedPatient?.name || 'patient'}...`}
          className="flex-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 outline-none text-xs font-medium text-[#0F172A] placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 transition-all"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shadow-md shadow-[#0F766E]/20 active:scale-95 transition-all"
        >
          <Send size={14} />
        </button>
      </div>
    </motion.div>
  );
}
