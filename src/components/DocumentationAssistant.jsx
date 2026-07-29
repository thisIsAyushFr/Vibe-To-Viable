import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOC_OUTPUTS } from '../data/doctorDemoData';

export default function DocumentationAssistant() {
  const [notesText, setNotesText] = useState("");
  const [activeOutputKey, setActiveOutputKey] = useState(null);
  const [copied, setCopied] = useState(false);

  const chips = [
    { key: "soap", label: "Generate SOAP Note" },
    { key: "summary", label: "Summarize Consultation" },
    { key: "followup", label: "Create Follow-up Note" },
  ];

  const handleChipClick = (key) => {
    setActiveOutputKey(key);
    if (!notesText) {
      setNotesText(`Consultation notes for ${key.toUpperCase()}:\nPatient BP 148/92 mmHg, HR 78 bpm. Advised low sodium diet and continued Amlodipine 5mg.`);
    }
  };

  const handleCopy = () => {
    if (activeOutputKey && DOC_OUTPUTS[activeOutputKey]) {
      navigator.clipboard.writeText(DOC_OUTPUTS[activeOutputKey].text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-3xl p-5 sm:p-6 h-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-lg flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
              <FileText size={17} />
            </div>
            <h2 className="text-xs font-black tracking-wider text-[#0F172A] uppercase">
              DOCUMENTATION ASSISTANT
            </h2>
          </div>

          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#0369A1] border border-[#38BDF8]/30 flex items-center gap-1">
            <Sparkles size={11} className="text-[#38BDF8]" /> Demo AI Assistance
          </span>
        </div>

        {/* Note Textarea */}
        <textarea
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          placeholder="Add quick consultation notes or dictation summary..."
          rows={3}
          className="w-full p-3 rounded-2xl bg-white/90 border border-slate-200 outline-none resize-none text-xs font-medium text-[#0F172A] placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 transition-all shadow-inner"
        />

        {/* Action Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((c) => {
            const active = activeOutputKey === c.key;
            return (
              <button
                key={c.key}
                onClick={() => handleChipClick(c.key)}
                className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-xs active:scale-95 ${
                  active
                    ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                    : 'bg-[#0F766E]/10 text-[#0F766E] hover:bg-[#0F766E]/20'
                }`}
              >
                <Sparkles size={11} />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Generated Output Preview Box */}
        <AnimatePresence>
          {activeOutputKey && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3.5 p-3.5 rounded-2xl bg-white border border-[#0F766E]/20 shadow-md relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-wider">
                  GENERATED {DOC_OUTPUTS[activeOutputKey].label.toUpperCase()} (DEMO OUTPUT)
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[10px] font-bold text-[#64748B] hover:text-[#0F766E] flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100"
                >
                  {copied ? <Check size={11} className="text-[#22C55E]" /> : <Copy size={11} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <pre className="text-xs font-medium text-[#0F172A] whitespace-pre-wrap font-sans leading-relaxed bg-[#F0FDFA] p-3 rounded-xl border border-[#14B8A6]/15 max-h-48 overflow-y-auto">
                {DOC_OUTPUTS[activeOutputKey].text}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[10px] text-[#64748B] italic mt-3 pt-2 border-t border-slate-200/60">
        Aarogya Clinical Documentation Assistant converts brief notes into structured clinical notes in seconds.
      </p>
    </motion.div>
  );
}
