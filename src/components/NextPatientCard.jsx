import React from 'react';
import {
  Stethoscope, Clock3, AlertTriangle, Eye, Play, CheckCircle2,
  HeartPulse, Activity, Thermometer, Wind, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NextPatientCard({
  nextPatient,
  queueItem,
  onViewPatient,
  consultationStarted,
  onStartConsultation,
  onFinishConsultation
}) {
  if (!nextPatient || !queueItem) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center bg-white/90 backdrop-blur-2xl border border-white shadow-xl relative overflow-hidden w-full min-w-0"
      >
        <div className="w-14 h-14 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mb-3 border border-[#22C55E]/30 shadow-md">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="text-lg sm:text-xl font-black text-[#0F172A]">All Consultations Completed!</h2>
        <p className="text-xs font-bold text-[#64748B] mt-1 max-w-sm">
          Great job, Dr. Arjun Sharma! You have completed all scheduled consultations for today.
        </p>
      </motion.div>
    );
  }

  const vitalsMap = nextPatient.vitals || [
    { label: 'BP', value: '120/80', unit: 'mmHg', warning: false },
    { label: 'Pulse', value: '72', unit: 'bpm', warning: false },
    { label: 'Temp', value: '98.6', unit: '°F', warning: false },
    { label: 'SpO2', value: '98', unit: '%', warning: false },
  ];

  const getIcon = (label) => {
    if (label === 'BP') return HeartPulse;
    if (label === 'Pulse') return Activity;
    if (label === 'Temp') return Thermometer;
    return Wind;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={nextPatient.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl p-4 sm:p-7 h-full flex flex-col justify-between bg-white/90 backdrop-blur-2xl border border-white shadow-xl relative overflow-hidden group w-full min-w-0"
        style={{
          boxShadow: "0 16px 40px -12px rgba(15, 118, 110, 0.18)",
        }}
      >
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br from-[#38BDF8]/25 via-[#14B8A6]/20 to-transparent blur-3xl pointer-events-none" />

        <div className="w-full min-w-0">
          {/* Top Header & Live Urgency Status */}
          <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E] shadow-inner flex-shrink-0">
                <Stethoscope size={16} />
              </div>
              <div className="min-w-0">
                <h2 className="text-[10px] sm:text-xs font-black tracking-widest text-[#0F766E] uppercase truncate">
                  NEXT PATIENT — HIGH PRIORITY
                </h2>
                <p className="text-[10px] font-bold text-[#64748B] truncate">Scheduled {queueItem.time} • Room 3</p>
              </div>
            </div>

            {consultationStarted ? (
              <span className="text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/30 flex items-center gap-1.5 animate-pulse flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                IN CONSULTATION
              </span>
            ) : queueItem.waitMin ? (
              <span className="text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center gap-1 shadow-2xs flex-shrink-0">
                <Clock3 size={11} className="animate-spin-slow text-amber-600" /> Waiting {queueItem.waitMin}m
              </span>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-full bg-[#38BDF8]/20 text-[#0284C7] border border-[#38BDF8]/40 shadow-2xs flex-shrink-0">
                CHECKED IN
              </span>
            )}
          </div>

          {/* Patient Profile Card Header */}
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#F0FDFA]/80 border border-[#14B8A6]/20 shadow-xs mb-3.5 min-w-0">
            <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-lg sm:text-xl font-black text-white shadow-md flex-shrink-0">
              {nextPatient.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <h3 className="text-lg sm:text-2xl font-black text-[#0F172A] tracking-tight truncate">
                  {nextPatient.name}
                </h3>
                <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md bg-[#0F766E]/10 text-[#0F766E] flex-shrink-0">
                  {nextPatient.bloodGroup} POSITIVE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-[#64748B] mt-0.5 truncate">
                {nextPatient.age}y • {nextPatient.gender} • {queueItem.visitType}
              </p>
            </div>
          </div>

          {/* Live Vitals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
            {vitalsMap.map((v) => {
              const Icon = getIcon(v.label);
              return (
                <div
                  key={v.label}
                  className={`p-2 sm:p-2.5 rounded-xl border flex flex-col justify-between ${
                    v.warning
                      ? 'bg-rose-500/10 border-rose-500/30'
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-[#64748B]">{v.label}</span>
                    <Icon size={11} className={v.warning ? 'text-[#EF4444]' : 'text-[#0F766E]'} />
                  </div>
                  <div className="mt-1">
                    <span className={`text-sm sm:text-base font-black ${v.warning ? 'text-[#EF4444]' : 'text-[#0F172A]'}`}>
                      {v.value}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-[#64748B] ml-0.5">{v.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Important Alert Box */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 min-w-0">
            <AlertTriangle size={16} className="text-[#EF4444] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-black text-[#EF4444] uppercase tracking-wider truncate">
                {nextPatient.alert?.title || "CLINICAL ALERT"}
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-[#0F172A] mt-0.5 leading-snug">
                {nextPatient.alert?.description || "Patient queued for clinical evaluation."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-2.5 mt-4 pt-3.5 border-t border-slate-100">
          <button
            onClick={onViewPatient}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-extrabold bg-slate-100 text-[#0F172A] hover:bg-[#0F766E]/15 hover:text-[#0F766E] transition-all active:scale-95 shadow-2xs"
          >
            <Eye size={15} /> View Full Profile
          </button>
          
          {consultationStarted ? (
            <button
              onClick={onFinishConsultation}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black text-white bg-[#22C55E] hover:bg-[#16A34A] transition-all shadow-lg shadow-[#22C55E]/25 active:scale-95"
            >
              <CheckCircle size={15} /> Complete Consultation
            </button>
          ) : (
            <button
              onClick={onStartConsultation}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black text-white bg-[#0F766E] hover:bg-[#0B5C56] transition-all shadow-lg shadow-[#0F766E]/30 active:scale-95"
            >
              <Play size={15} /> Start Consultation
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
