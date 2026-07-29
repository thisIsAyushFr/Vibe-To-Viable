import React from 'react';
import { ChevronsUpDown, ChevronRight, Eye, Activity, CheckSquare, FileText, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickActions({ onActionClick }) {
  const actions = [
    { id: 'next-patient', label: 'Next Patient', icon: Eye },
    { id: 'timeline', label: 'Patient History', icon: Activity },
    { id: 'tasks', label: 'Pending Tasks', icon: CheckSquare },
    { id: 'doc-assistant', label: 'Documentation Assistant', icon: FileText },
    { id: 'schedule', label: 'Full Schedule', icon: Clock3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.45 }}
      className="rounded-3xl p-5 sm:p-7 h-full bg-white/80 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E] shadow-inner">
              <ChevronsUpDown size={18} />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
                QUICK SHORTCUTS
              </h2>
              <p className="text-[10px] font-bold text-[#64748B]">Focus dashboard section instantly</p>
            </div>
          </div>

          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E]">
            {actions.length} Shortcuts
          </span>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.id}
                onClick={() => onActionClick(a.id)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-[#0F766E]/50 hover:bg-[#F0FDFA] transition-all group active:scale-95 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors flex-shrink-0">
                    <Icon size={15} />
                  </div>
                  <span className="text-xs font-black text-[#0F172A] truncate">{a.label}</span>
                </div>
                <ChevronRight size={15} className="text-[#0F766E] group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-[#64748B] font-semibold italic mt-4 pt-3 border-t border-slate-200/60">
        Tap any shortcut to instantly focus and smooth scroll to that dashboard section.
      </p>
    </motion.div>
  );
}
