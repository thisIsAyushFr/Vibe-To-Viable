import React from 'react';
import { Gauge, Info, Sparkles, AlertTriangle, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkloadIndicator() {
  const factors = [
    { label: "Patient Queue Load", level: "Moderate", color: "#D97706", bg: "rgba(245,158,11,0.15)" },
    { label: "Pending Administrative Tasks", level: "Moderate", color: "#D97706", bg: "rgba(245,158,11,0.15)" },
    { label: "Consecutive Working Hours", level: "Normal", color: "#16A34A", bg: "rgba(34,197,94,0.15)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className="rounded-3xl p-6 sm:p-7 h-full bg-white/80 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shadow-inner">
              <Gauge size={18} />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
                BURNOUT RISK INDICATOR
              </h2>
              <p className="text-[10px] font-bold text-[#64748B]">Operational stress reduction assistant</p>
            </div>
          </div>

          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-200/80 text-[#64748B] flex items-center gap-1.5 shadow-2xs">
            <Sparkles size={11} className="text-[#0F766E]" /> Workload indicator — Demo
          </span>
        </div>

        <p className="text-xs font-semibold text-[#64748B] mb-4 leading-relaxed">
          Operational workload awareness to support work-life balance for healthcare staff.
        </p>

        {/* Workload Pressure Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 mb-3.5 flex items-center justify-between">
          <span className="text-xs font-bold text-[#0F172A]">Current Operational Workload Pressure</span>
          <span className="text-xs font-black px-3 py-1 rounded-lg bg-amber-500 text-white shadow-xs">
            MODERATE
          </span>
        </div>

        {/* Factors Breakdown */}
        <div className="flex flex-col gap-2 mb-4">
          {factors.map((f) => (
            <div key={f.label} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
              <span className="text-xs font-extrabold text-[#0F172A]">{f.label}</span>
              <span
                className="text-[10px] font-black px-2.5 py-0.5 rounded-md"
                style={{ backgroundColor: f.bg, color: f.color }}
              >
                {f.level}
              </span>
            </div>
          ))}
        </div>

        {/* Schedule Recommendation Box */}
        <div className="p-3.5 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-start gap-3">
          <Coffee size={17} className="text-[#0284C7] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-black text-[#0284C7] uppercase tracking-wider">SMART REST RECOMMENDATION</p>
            <p className="text-xs font-extrabold text-[#0F172A] mt-0.5">
              You have a 30-minute open window after 2:30 PM. Take a break to refresh.
            </p>
          </div>
        </div>
      </div>

      <p className="text-[9px] text-[#64748B] font-semibold italic mt-4 pt-3 border-t border-slate-200/60">
        Operational workload indicator — Demo only. Not a medical or psychological diagnosis.
      </p>
    </motion.div>
  );
}
