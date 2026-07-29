import React from 'react';
import { CheckSquare, Check, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PriorityTag({ priority }) {
  const map = {
    high: { label: "HIGH PRIORITY", bg: "rgba(239,68,68,0.12)", fg: "#EF4444", border: "rgba(239,68,68,0.3)" },
    medium: { label: "MEDIUM", bg: "rgba(245,158,11,0.12)", fg: "#D97706", border: "rgba(245,158,11,0.3)" },
    low: { label: "LOW", bg: "rgba(100,116,139,0.12)", fg: "#64748B", border: "rgba(100,116,139,0.2)" },
  };

  const p = map[priority] || map.low;

  return (
    <span
      className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md border uppercase"
      style={{ background: p.bg, color: p.fg, borderColor: p.border }}
    >
      {p.label}
    </span>
  );
}

export default function PendingTasks({ tasks, onToggleTask }) {
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const pendingCount = totalTasks - completedCount;
  const progressPct = Math.round((completedCount / totalTasks) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="rounded-3xl p-6 sm:p-7 h-full bg-white/80 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EF4444]/10 text-[#EF4444] shadow-inner">
              <CheckSquare size={18} />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
                PENDING TASKS ({pendingCount})
              </h2>
              <p className="text-[10px] font-bold text-[#64748B]">Actionable doctor workload queue</p>
            </div>
          </div>

          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
            {progressPct}% Done
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 bg-slate-100 p-2 rounded-2xl border border-slate-200/60">
          <div className="flex items-center justify-between text-[10px] font-black text-[#0F172A] mb-1 px-1">
            <span>Progress Today</span>
            <span>{completedCount} of {totalTasks} Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6]"
            />
          </div>
        </div>

        {/* Task Item List */}
        <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
          <AnimatePresence>
            {tasks.map((t) => (
              <motion.div
                layout
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: t.done ? 0.55 : 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => onToggleTask(t.id)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  t.done
                    ? 'bg-slate-100/70 border-slate-200 line-through'
                    : 'bg-white border-slate-100 hover:border-[#0F766E]/40 hover:bg-[#F0FDFA] shadow-xs hover:shadow-md'
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    t.done
                      ? 'bg-[#22C55E] text-white shadow-xs'
                      : 'bg-slate-100 border border-slate-300 text-transparent hover:border-[#0F766E]'
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                    <PriorityTag priority={t.priority} />
                    <span className="text-[9px] font-bold text-[#64748B] flex items-center gap-1">
                      <Clock size={9} /> Today
                    </span>
                  </div>
                  <p className={`text-xs font-black text-[#0F172A] ${t.done ? 'text-slate-400' : ''}`}>
                    {t.title}
                  </p>
                  <p className="text-[10px] font-bold text-[#64748B] mt-0.5">
                    {t.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-[10px] text-[#64748B] font-semibold italic mt-4 pt-3 border-t border-slate-200/60">
        Click any task to mark complete. Pending task count will update automatically.
      </p>
    </motion.div>
  );
}
