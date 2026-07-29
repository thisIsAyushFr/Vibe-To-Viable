import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ label, value, icon: Icon, color, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.8, 0.25, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between bg-white/90 backdrop-blur-2xl border border-white/90 shadow-lg hover:shadow-xl shadow-[#0F766E]/5 relative overflow-hidden group transition-all"
    >
      {/* Ambient background glow on hover */}
      <div
        className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between gap-1">
        <span className="text-[9px] sm:text-[11px] font-black tracking-wider text-[#64748B] uppercase truncate">
          {label}
        </span>
        <div
          className="w-7 sm:w-10 h-7 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </div>
      </div>

      <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-1 flex-wrap">
        <span className="text-xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          {value}
        </span>

        {trend && (
          <span className="text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-100 text-[#64748B] flex items-center gap-0.5 truncate">
            <TrendingUp size={9} className="text-[#0F766E] flex-shrink-0" /> {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
