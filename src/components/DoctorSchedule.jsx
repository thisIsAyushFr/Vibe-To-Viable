import React from 'react';
import { Clock3, Stethoscope, Coffee, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { SCHEDULE } from '../data/doctorDemoData';

export default function DoctorSchedule({ walkIns = [] }) {
  const combinedSchedule = [
    ...SCHEDULE,
    ...walkIns
      .filter((w) => w.status !== 'Completed')
      .map((w) => ({ time: w.arrivalTime, type: 'patient', label: `${w.name} (Walk-In)` }))
  ];

  const getStyleMap = (type) => {
    switch (type) {
      case 'consultation':
        return { bg: 'rgba(15,118,110,0.08)', fg: '#0F766E', icon: Stethoscope, border: 'rgba(15,118,110,0.2)' };
      case 'break':
        return { bg: 'rgba(100,116,139,0.08)', fg: '#64748B', icon: Coffee, border: 'rgba(100,116,139,0.2)' };
      case 'available':
        return { bg: 'rgba(34,197,94,0.08)', fg: '#16A34A', icon: Zap, border: 'rgba(34,197,94,0.2)' };
      case 'patient':
      default:
        return { bg: 'rgba(56,189,248,0.08)', fg: '#0284C7', icon: User, border: 'rgba(56,189,248,0.2)' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-3xl p-5 sm:p-6 h-full bg-white/95 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
              <Clock3 size={17} />
            </div>
            <h2 className="text-xs font-black tracking-wider text-[#0F172A] uppercase">
              TODAY'S SCHEDULE
            </h2>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0F766E]/10 text-[#0F766E]">
            {combinedSchedule.length} Time Slots
          </span>
        </div>

        {/* Schedule List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
          {combinedSchedule.map((s, idx) => {
            const st = getStyleMap(s.type);
            const Icon = st.icon;

            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-2xl border transition-all hover:scale-[1.01]"
                style={{ backgroundColor: st.bg, borderColor: st.border }}
              >
                <span className="text-xs font-black text-[#0F172A] w-12 flex-shrink-0">
                  {s.time}
                </span>
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/80 shadow-2xs"
                  style={{ color: st.fg }}
                >
                  <Icon size={14} />
                </div>
                <span className="text-xs font-bold text-[#0F172A] truncate">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-[#64748B] italic mt-3 pt-2 border-t border-slate-100">
        Color legend: Blue (Patient), Teal (Consultation), Grey (Break), Green (Available).
      </p>
    </motion.div>
  );
}
