import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalTimeline({ timeline, patientName }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-3xl p-5 sm:p-6 h-full bg-white/95 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
              <Activity size={17} />
            </div>
            <h2 className="text-xs font-black tracking-wider text-[#0F172A] uppercase">
              MEDICAL TIMELINE — {patientName?.toUpperCase()}
            </h2>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#14B8A6]/15 text-[#0F766E]">
            {timeline.length} History Events
          </span>
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col relative pl-2 pr-1 max-h-[360px] overflow-y-auto">
          {timeline.map((ev, i) => (
            <div key={i} className="flex gap-4 group">
              {/* Vertical line and bullet */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 ${
                    i === 0
                      ? 'bg-[#0F766E] ring-4 ring-[#0F766E]/20'
                      : 'bg-[#14B8A6] border-2 border-white shadow-xs'
                  }`}
                />
                {i < timeline.length - 1 && (
                  <div className="w-0.5 flex-1 my-1 bg-slate-200 group-hover:bg-[#0F766E]/30 transition-colors" />
                )}
              </div>

              {/* Event Content */}
              <div className="pb-5 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-wider text-[#0F766E] uppercase bg-[#0F766E]/10 px-2 py-0.5 rounded-md">
                    {ev.date}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-[#0F172A] mt-1">
                  {ev.title}
                </h4>
                <p className="text-[11px] font-semibold text-[#64748B] mt-0.5 leading-relaxed">
                  {ev.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[#64748B] italic mt-2 pt-2 border-t border-slate-100">
        CareSync organizes longitudinal medical records into a clean timeline to eliminate manual chart searching.
      </p>
    </motion.div>
  );
}
