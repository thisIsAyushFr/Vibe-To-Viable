import React from 'react';
import { Gauge, BarChart3, Clock, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function GaugeBar({ level }) {
  const pct = level === "Low" ? 30 : level === "Moderate" ? 65 : 90;
  const color = level === "Low" ? "#22C55E" : level === "Moderate" ? "#F59E0B" : "#EF4444";

  return (
    <div className="w-full h-3 rounded-full bg-slate-200/80 overflow-hidden relative p-0.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full shadow-xs bg-gradient-to-r from-amber-400 to-amber-600"
      />
    </div>
  );
}

export default function WorkloadCard({ pendingCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="rounded-3xl p-6 sm:p-7 h-full bg-white/80 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E] shadow-inner">
              <BarChart3 size={18} />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
                WORKLOAD INTELLIGENCE
              </h2>
              <p className="text-[10px] font-bold text-[#64748B]">Real-time shift analytics & capacity</p>
            </div>
          </div>

          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
            Shift Active • 4.2 hrs
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">TOTAL PATIENTS</p>
            <p className="text-2xl font-black text-[#0F172A] mt-1">14</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">COMPLETED</p>
            <p className="text-2xl font-black text-[#22C55E] mt-1">6 / 14</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">HOURS WORKED</p>
            <p className="text-2xl font-black text-[#0F172A] mt-1">4.2h</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">PENDING TASKS</p>
            <p className="text-2xl font-black text-[#EF4444] mt-1">{pendingCount}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs col-span-2 sm:col-span-2">
            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">AVG CONSULT TIME</p>
            <p className="text-2xl font-black text-[#0F766E] mt-1">18 min / patient</p>
          </div>
        </div>

        {/* Workload Level Gauge */}
        <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">
              OPERATIONAL SHIFT LOAD LEVEL
            </span>
            <span className="text-xs font-black text-amber-700 bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 rounded-full">
              MODERATE (65%)
            </span>
          </div>
          <GaugeBar level="Moderate" />
        </div>
      </div>

      <p className="text-[10px] text-[#64748B] font-semibold italic mt-4 pt-3 border-t border-slate-200/60">
        Workload analytics assist hospital administrators in balancing clinical load.
      </p>
    </motion.div>
  );
}
