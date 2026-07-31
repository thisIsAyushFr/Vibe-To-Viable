import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Pill, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomAiBriefTemplate } from '../data/aiBriefTemplates';

export default function AIPatientBrief({ consultationTrigger }) {
  const [briefExpanded, setBriefExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'meds' | 'risk'

  // Picked once per consultation. Re-renders, tab switches and page refreshes
  // must never change this — only a new `consultationTrigger` value (sent by
  // the parent when the doctor clicks "Start Consultation") picks a new one.
  const [brief, setBrief] = useState(() => getRandomAiBriefTemplate());
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setBrief(getRandomAiBriefTemplate());
  }, [consultationTrigger]);

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

          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#38BDF8]/20 text-[#0369A1] border border-[#38BDF8]/40 flex items-center gap-1 shadow-2xs">
            <Sparkles size={11} className="text-[#38BDF8] animate-pulse" /> AI demo summary
          </span>
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

        {/* Core Content based on Active Tab */}
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
              {brief.medications.map((med) => (
                <div key={med.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 gap-2">
                  <span className="text-xs font-black text-[#0F172A] truncate">{med.name}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#0F766E]/10 text-[#0F766E] flex-shrink-0">{med.frequency}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'risk' && (
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
              <p className="text-[11px] font-semibold text-[#0F172A]">
                {brief.risk.note}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
          {briefExpanded && (
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

      <p className="text-[10px] text-[#64748B] font-semibold italic mt-4 pt-3 border-t border-slate-200/60">
        Clinical AI Assistant summarizes patient records in seconds to reduce chart review time.
      </p>
    </motion.div>
  );
}
