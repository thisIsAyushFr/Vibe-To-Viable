import React, { useEffect, useRef, useState } from 'react';
import { Menu, Bell, Calendar, CheckCircle2, HeartPulse, ArrowLeft } from 'lucide-react';
import { DOCTOR, NOTIFICATIONS } from '../data/doctorDemoData';
import { motion, AnimatePresence } from 'framer-motion';

export default function DoctorTopbar({ setDrawerOpen, onBackToLanding }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadList, setUnreadList] = useState(NOTIFICATIONS);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!notifOpen) return;
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 22) return 'Good Evening';
    return 'Good Night';
  };

  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 px-3 sm:px-8 py-3 backdrop-blur-xl bg-[#F0FDFA]/90 border-b border-white/80 shadow-sm w-full max-w-full">
      <div className="flex items-center justify-between gap-2">
        {/* Left Greeting & Mobile Hamburger */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 shadow-xs active:scale-95 flex-shrink-0"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>

          {/* Mobile CareSync Mini Logo */}
          <div className="lg:hidden w-8 h-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <HeartPulse size={16} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-sm sm:text-xl font-black text-[#0F172A] tracking-tight truncate">
                {greeting}, {DOCTOR.name}
              </h1>
              <span className="hidden sm:inline-flex text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                {DOCTOR.department}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-[#64748B] truncate flex items-center gap-1 mt-0.5">
              <span className="truncate max-w-[150px] sm:max-w-none">{DOCTOR.hospital}</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-[#0F766E] font-bold flex-shrink-0">
                <Calendar size={11} /> {todayStr}
              </span>
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
              title="Return to Hospital Public Website"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Hospital Website</span>
            </button>
          )}
          {/* Notification Button & Popup */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center relative hover:bg-slate-50 shadow-xs transition-all active:scale-95"
            >
              <Bell size={16} className="text-[#0F172A]" />
              {unreadList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center text-white font-extrabold bg-[#EF4444] animate-pulse">
                  {unreadList.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-[20rem] sm:w-80 rounded-2xl p-4 bg-white/95 backdrop-blur-2xl border border-white shadow-2xl z-[60]"
                >
                  <div className="flex items-center justify-between mb-3 border-b pb-2">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-[#0F172A]">Notifications</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F766E]/10 text-[#0F766E]">
                        {unreadList.length} New
                      </span>
                    </div>
                    {unreadList.length > 0 && (
                      <button
                        onClick={() => setUnreadList([])}
                        className="text-[10px] font-bold text-[#0F766E] hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                    {unreadList.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-[#F0FDFA] transition-colors relative group"
                      >
                        <p className="text-xs font-medium text-[#0F172A] pr-4 break-words">{n.text}</p>
                        <p className="text-[10px] font-semibold text-[#64748B] mt-1">{n.time}</p>
                      </div>
                    ))}
                    {unreadList.length === 0 && (
                      <div className="py-6 text-center text-xs text-[#64748B] flex flex-col items-center gap-1">
                        <CheckCircle2 size={20} className="text-[#22C55E]" />
                        <span>All notifications cleared</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Doctor Avatar */}
          <div className="flex items-center gap-2 pl-0.5">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-black text-xs shadow-md border-2 border-white flex-shrink-0">
              {DOCTOR.initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
