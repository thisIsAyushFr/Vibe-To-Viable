import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Pill, ShieldAlert, RefreshCw, Send, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { callGroqAPI, callGroqAPIForJSON, testAIConnection } from '../services/aiClient';

async function fetchAIBrief(patient) {
  const patientContext = {
    name: patient?.name,
    age: patient?.age,
    gender: patient?.gender,
    bloodGroup: patient?.bloodGroup,
    conditions: patient?.conditions,
    medications: patient?.medications,
    allergies: patient?.allergies,
    lastVisit: patient?.lastVisit,
    vitals: patient?.vitals,
    timeline: patient?.timeline,
  };

  const systemPrompt = `You are a clinical documentation assistant generating a brief for a doctor about to see a patient.
Return ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "summary": "one or two sentence clinical summary, written like a chart note",
  "keyInfo": ["short clinical fact", "short clinical fact", "short clinical fact", "short clinical fact"],
  "attention": "one sentence flagging what needs clinical attention this visit",
  "medications": [{"name": "drug name + dose", "frequency": "e.g. Once Daily"}],
  "risk": {"title": "short risk label", "value": "key metric e.g. a BP or lab value", "detail": "one sentence explaining the risk and a suggested next step"}
}
Vary your exact wording each time you're called, but stay clinically plausible and consistent with the data given. If data is sparse, reason conservatively and say so briefly rather than inventing specific numbers that weren't provided.`;

  const parsed = await callGroqAPIForJSON(
    systemPrompt,
    `Patient data:\n${JSON.stringify(patientContext, null, 2)}`
  );

  return {
    summary: parsed.summary || 'No summary available.',
    keyInfo: Array.isArray(parsed.keyInfo) ? parsed.keyInfo : [],
    attention: parsed.attention || 'No specific concerns flagged.',
    medications: Array.isArray(parsed.medications) ? parsed.medications : [],
    risk: parsed.risk || null,
  };
}

export default function AIPatientBrief({ patient }) {
  const [briefExpanded, setBriefExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'meds' | 'risk'
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const [question, setQuestion] = useState('');
  const [asking, setAsking] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [debugResult, setDebugResult] = useState(null);

  const handleAsk = async () => {
    if (!question.trim() || !patient) return;
    setAsking(true);
    setAnswer(null);
    console.log('[AIPatientBrief] asking:', question, 'for patient:', patient?.name);
    try {
      const reply = await callGroqAPI(
        `You are a clinical assistant. Answer briefly (1-3 sentences) about this patient: ${JSON.stringify(patient)}`,
        question
      );
      setAnswer(reply);
    } catch (err) {
      setAnswer(`⚠️ ${err.message}`);
    } finally {
      setAsking(false);
    }
  };

  const handleDebugTest = async () => {
    setDebugResult('Testing…');
    const result = await testAIConnection();
    setDebugResult(result);
  };

  const loadBrief = useCallback(async () => {
    if (!patient) return;
    const thisRequestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAIBrief(patient);
      if (thisRequestId === requestIdRef.current) {
        setBrief(result);
      }
    } catch (err) {
      if (thisRequestId === requestIdRef.current) {
        setError(err.message || 'Failed to generate AI brief');
      }
    } finally {
      if (thisRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [patient]);

  useEffect(() => {
    loadBrief();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient?.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="rounded-3xl p-5 sm:p-7 h-full flex flex-col justify-between bg-white/90 backdrop-blur-2xl border border-white shadow-xl relative overflow-hidden"
    >
      {/* Background Sparkle Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#38BDF8]/20 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header with Demo Label */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#38BDF8]/20 text-[#0284C7] shadow-inner">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
                AI PATIENT BRIEF
              </h2>
              <p className="text-[10px] font-bold text-[#64748B]">Synthesized from past visits & reports</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadBrief}
              disabled={loading || !patient}
              title="Regenerate AI brief"
              className="p-1.5 rounded-full bg-[#38BDF8]/10 text-[#0369A1] hover:bg-[#38BDF8]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            </button>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#38BDF8]/20 text-[#0369A1] border border-[#38BDF8]/40 flex items-center gap-1 shadow-2xs">
              <Sparkles size={11} className="text-[#38BDF8] animate-pulse" /> Live AI
            </span>
          </div>
        </div>

        {/* Tab Navigation inside AI Brief - Horizontally scrollable on mobile */}
        <div className="flex gap-1 bg-slate-100/90 p-1 rounded-xl mb-3 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'summary', label: 'Summary', icon: Sparkles },
            { id: 'meds', label: 'Medications', icon: Pill },
            { id: 'risk', label: 'Risk Factors', icon: ShieldAlert },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 min-w-[90px] flex items-center justify-center gap-1 text-[10px] font-black py-1.5 px-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                  active
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Icon size={11} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/25 shadow-xs flex items-center gap-2">
            <RefreshCw size={14} className="animate-spin text-[#0F766E]" />
            <p className="text-xs font-bold text-[#0F172A]">Generating AI brief…</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-red-50 border border-red-200 shadow-xs flex items-start gap-2">
            <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-700">Couldn't generate AI brief.</p>
              <p className="text-[10px] font-semibold text-red-500 mt-0.5">{error}</p>
              <button
                onClick={loadBrief}
                className="text-[10px] font-black text-[#0F766E] hover:text-[#0B5C56] mt-1.5 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Core Content based on Active Tab */}
        {!loading && !error && brief && (
          <AnimatePresence mode="wait">
            {activeTab === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/25 shadow-xs"
              >
                <p className="text-xs sm:text-sm font-bold leading-relaxed text-[#0F172A] italic">
                  "{brief.summary}"
                </p>
              </motion.div>
            )}

            {activeTab === 'meds' && (
              <motion.div
                key="meds"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-2xl bg-white border border-slate-100 flex flex-col gap-2"
              >
                {brief.medications.length === 0 && (
                  <p className="text-xs font-semibold text-[#64748B] p-2">No medications listed.</p>
                )}
                {brief.medications.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 gap-2">
                    <span className="text-xs font-black text-[#0F172A] truncate">{m.name}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#0F766E]/10 text-[#0F766E] flex-shrink-0">
                      {m.frequency}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'risk' && brief.risk && (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-amber-800 truncate">{brief.risk.title}</span>
                  <span className="text-[10px] font-bold text-amber-700 flex-shrink-0">{brief.risk.value}</span>
                </div>
                <p className="text-[11px] font-semibold text-[#0F172A]">{brief.risk.detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Toggle Clinical Breakdown */}
        <button
          onClick={() => setBriefExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F766E] hover:text-[#0B5C56] mt-4 transition-colors"
        >
          <span>{briefExpanded ? "Hide detailed history notes" : "Show detailed history notes"}</span>
          {briefExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {/* Expandable Key Info List */}
        <AnimatePresence>
          {briefExpanded && !loading && !error && brief && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 flex flex-col gap-3"
            >
              <div className="rounded-2xl p-3.5 bg-white border border-slate-100 shadow-xs">
                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-2.5">
                  KEY CLINICAL INFORMATION
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {brief.keyInfo.map((item, idx) => (
                    <li key={idx} className="text-xs font-bold text-[#0F172A] flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#0F766E] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Needs Attention Highlight */}
              <div className="rounded-2xl p-3 bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider">
                    NEEDS CLINICAL ATTENTION
                  </p>
                  <p className="text-xs font-bold text-[#0F172A] mt-0.5">
                    {brief.attention}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ask-a-question input — send button only appears once text is entered */}
      <div className="mt-4 pt-3 border-t border-slate-200/60">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask AI about this patient…"
            className="flex-1 text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
          />
          {question.trim() && (
            <button
              onClick={handleAsk}
              disabled={asking}
              className="p-2 rounded-xl bg-[#0F766E] text-white disabled:opacity-50"
              title="Send"
            >
              {asking ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          )}
        </div>
        {answer && (
          <p className="text-xs font-semibold text-[#0F172A] mt-2 bg-[#F0FDFA] p-2.5 rounded-xl border border-[#14B8A6]/20">
            {answer}
          </p>
        )}
      </div>

      {/* Debug helper — logs full request/response detail to the console */}
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handleDebugTest}
          className="text-[10px] font-bold text-[#64748B] hover:text-[#0F766E] flex items-center gap-1"
        >
          <Bug size={11} /> Test AI connection
        </button>
        {debugResult && <span className="text-[10px] font-semibold text-[#0F172A]">{debugResult}</span>}
      </div>

      <p className="text-[10px] text-[#64748B] font-semibold italic mt-3 pt-2">
        Clinical AI Assistant summarizes patient records in seconds to reduce chart review time.
      </p>
    </motion.div>
  );
}
