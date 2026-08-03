import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { callGroqAPI } from '../services/aiClient';

const CHIP_LABELS = {
  soap: "Generate SOAP Note",
  summary: "Summarize Consultation",
  followup: "Create Follow-up Note",
};

const CHIP_INSTRUCTIONS = {
  soap: "Generate a structured SOAP note (Subjective, Objective, Assessment, Plan) from the consultation notes below.",
  summary: "Write a concise clinical summary of this consultation for the patient's chart.",
  followup: "Draft a short follow-up note covering what was discussed, changes to care, and next steps.",
};

function buildContext(patient, queueItem) {
  if (!patient) return '';
  const lines = [
    `Patient: ${patient.name}, ${patient.age}${patient.gender ? ` ${patient.gender}` : ''}`,
    patient.conditions?.length ? `Conditions: ${patient.conditions.join(', ')}` : null,
    patient.medications?.length ? `Medications: ${patient.medications.join(', ')}` : null,
    patient.allergies ? `Allergies: ${patient.allergies}` : null,
    patient.vitals?.length ? `Vitals: ${patient.vitals.map((v) => `${v.label} ${v.value}${v.unit}`).join(', ')}` : null,
    queueItem?.visitType ? `Visit type: ${queueItem.visitType}` : null,
  ].filter(Boolean);
  return lines.join('\n');
}

export default function DocumentationAssistant({ patient, queueItem }) {
  const [notesText, setNotesText] = useState("");
  const [activeOutputKey, setActiveOutputKey] = useState(null);
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const chips = Object.entries(CHIP_LABELS).map(([key, label]) => ({ key, label }));

  const handleChipClick = async (key) => {
    setActiveOutputKey(key);
    setError(null);
    setGeneratedText('');
    setLoading(true);

    const systemPrompt = `You are a clinical documentation assistant helping a doctor write chart notes. ${CHIP_INSTRUCTIONS[key]} Be clinically plausible, concise, and use plain text (no markdown headers).`;
    const patientContext = buildContext(patient, queueItem);
    const userMessage = [
      patientContext ? `Patient context:\n${patientContext}` : null,
      notesText ? `Consultation notes:\n${notesText}` : 'No dictated notes were provided — write a brief plausible note from the patient context alone.',
    ].filter(Boolean).join('\n\n');

    try {
      const reply = await callGroqAPI(systemPrompt, userMessage);
      setGeneratedText(reply);
    } catch (err) {
      setError(err.message || 'Failed to generate documentation');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
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
            <Sparkles size={11} className="text-[#38BDF8]" /> Live AI
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
                  GENERATED {CHIP_LABELS[activeOutputKey].toUpperCase()}
                </span>
                {generatedText && !loading && (
                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-bold text-[#64748B] hover:text-[#0F766E] flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100"
                  >
                    {copied ? <Check size={11} className="text-[#22C55E]" /> : <Copy size={11} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </div>

              {loading && (
                <div className="flex items-center gap-2 p-3 text-xs font-bold text-[#0F766E]">
                  <RefreshCw size={13} className="animate-spin" />
                  Generating…
                </div>
              )}

              {!loading && error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle size={13} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] font-semibold text-red-600">{error}</p>
                </div>
              )}

              {!loading && !error && generatedText && (
                <pre className="text-xs font-medium text-[#0F172A] whitespace-pre-wrap font-sans leading-relaxed bg-[#F0FDFA] p-3 rounded-xl border border-[#14B8A6]/15 max-h-48 overflow-y-auto">
                  {generatedText}
                </pre>
              )}
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
