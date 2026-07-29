import React from 'react';
import {
  LayoutGrid, CalendarDays, Users, Sparkles, CheckSquare, Gauge,
  Clock3, Settings, HeartPulse, X, Building2, ArrowLeft, Activity, Bed
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOCTOR } from '../data/doctorDemoData';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'ot-schedules', label: 'Operation Theater', icon: Activity },
  { id: 'admitted-patients', label: 'Admitted Patients & Beds', icon: Bed },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'patients', label: 'Outpatient Queue', icon: Users },
  { id: 'ai', label: 'AI Clinical Assistant', icon: Sparkles },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'workload', label: 'Workload Intelligence', icon: Gauge },
  { id: 'schedule', label: 'OPD Schedule', icon: Clock3 },
];

export default function DoctorSidebar({ activeNav, setActiveNav, drawerOpen, setDrawerOpen, onBackToLanding }) {
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRight: "1px solid rgba(255, 255, 255, 0.6)",
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 pb-8 overflow-y-auto no-scrollbar">
      <div>
        {/* Hospital Branding Header */}
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0F766E] shadow-md shadow-[#0F766E]/20 text-white">
            <HeartPulse size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-[#0F172A]">Aarogya Hospital</span>
            </div>
            <p className="text-[10px] font-semibold text-[#0F766E]">Doctor Clinical Portal</p>
          </div>
        </div>

        {/* Back to Hospital Website Button */}
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="w-full mb-4 p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-md flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>Hospital Website</span>
          </button>
        )}

        {/* Hospital Organization Pill */}
        <div className="mx-1 mb-4 p-2.5 rounded-xl bg-[#0F766E]/5 border border-[#0F766E]/15 flex items-center gap-2">
          <Building2 size={15} className="text-[#0F766E] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Hospital</p>
            <p className="text-xs font-bold text-[#0F172A] truncate">{DOCTOR.hospital}</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  if (setDrawerOpen) setDrawerOpen(false);
                }}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 text-left relative ${
                  active
                    ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/25 font-bold'
                    : 'text-[#334155] hover:bg-[#0F766E]/10 hover:text-[#0F766E]'
                }`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.id === 'ai' && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#0284C7]">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: Settings & Doctor Profile */}
      <div className="flex flex-col gap-2 pt-3 mt-4 border-t border-[#0F766E]/10">
        <button
          onClick={() => {
            setActiveNav('settings');
            if (setDrawerOpen) setDrawerOpen(false);
          }}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 ${
            activeNav === 'settings'
              ? 'bg-[#0F766E] text-white'
              : 'text-[#334155] hover:bg-[#0F766E]/10 hover:text-[#0F766E]'
          }`}
        >
          <Settings size={17} />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/90 border border-teal-100 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#14B8A6] flex items-center justify-center text-xs font-extrabold text-white shadow-sm flex-shrink-0">
            {DOCTOR.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#0F172A] truncate">{DOCTOR.name}</p>
            <p className="text-[10px] font-medium text-[#0F766E] truncate">{DOCTOR.role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-30 overflow-hidden" style={glassStyle}>
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="absolute left-0 top-0 h-full w-72 bg-[#F0FDFA] shadow-2xl z-10"
            >
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl bg-slate-200/60 text-[#0F172A] hover:bg-slate-300/60"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="h-[calc(100%-60px)]">
                {navContent}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
