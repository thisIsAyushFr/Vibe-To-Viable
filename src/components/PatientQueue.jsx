import React from 'react';
import { Users, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from './StatusBadge';
import { PATIENTS } from '../data/doctorDemoData';

export default function PatientQueue({
  queue,
  queueStatuses,
  selectedPatientId,
  onSelectPatient,
  queueFilter,
  setQueueFilter,
  onMarkDone
}) {
  const filteredQueue = queue.filter((q) => {
    const status = queueStatuses[q.id] || q.status;
    if (queueFilter === "all") return true;
    return status === queueFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="rounded-3xl p-5 sm:p-7 h-full bg-white/90 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header & Filter Pills */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E] shadow-inner">
              <Users size={18} />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
                TODAY'S PATIENT QUEUE
              </h2>
              <p className="text-[10px] font-bold text-[#64748B]">Click patient row to view history</p>
            </div>
          </div>

          {/* Horizontally scrollable filter pills for mobile */}
          <div className="flex gap-1 bg-slate-100/90 p-1 rounded-xl max-w-full overflow-x-auto no-scrollbar">
            {["all", "waiting", "checked-in", "scheduled"].map((f) => (
              <button
                key={f}
                onClick={() => setQueueFilter(f)}
                className={`text-[10px] font-black px-2.5 py-1 rounded-lg transition-all capitalize whitespace-nowrap flex-shrink-0 ${
                  queueFilter === f
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {f === "checked-in" ? "Checked-in" : f}
              </button>
            ))}
          </div>
        </div>

        {/* Queue Items */}
        <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {filteredQueue.map((q) => {
              const p = PATIENTS[q.patientId];
              const currentStatus = queueStatuses[q.id] || q.status;
              const isSelected = selectedPatientId === q.patientId;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  key={q.id}
                  onClick={() => onSelectPatient(q.patientId)}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#F0FDFA] border-[#0F766E]/50 shadow-md shadow-[#0F766E]/10'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Time Badge */}
                    <div className="w-14 flex-shrink-0">
                      <span className="text-xs font-black text-[#0F172A] block">{q.time}</span>
                      {q.waitMin && currentStatus === 'waiting' && (
                        <span className="text-[9px] font-bold text-amber-600 flex items-center gap-0.5 mt-0.5">
                          <Clock size={9} /> {q.waitMin}m wait
                        </span>
                      )}
                    </div>

                    {/* Patient Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-black text-[#0F172A] truncate">
                          {p.name}
                        </p>
                        {isSelected && (
                          <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-[#0F766E] text-white uppercase flex-shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-[#64748B] truncate mt-0.5">
                        {q.visitType} • {p.age}y {p.gender}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge & Done Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <StatusBadge status={currentStatus} />

                    {currentStatus !== "completed" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkDone(q.id);
                        }}
                        title="Mark Consultation Complete"
                        className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-xl bg-[#0F766E]/10 text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all active:scale-95"
                      >
                        <Check size={12} />
                        <span>Done</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredQueue.length === 0 && (
            <div className="text-center py-8 text-xs font-semibold text-[#64748B] bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No patients matched this filter.
            </div>
          )}
        </div>
      </div>

      <p className="text-[10px] text-[#64748B] font-semibold text-center pt-3 border-t border-slate-100 mt-2">
        Tap any patient to view Patient Snapshot & Medical Timeline.
      </p>
    </motion.div>
  );
}
