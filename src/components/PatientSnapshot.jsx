import React from 'react';
import { User, Pill, Droplet, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientSnapshot({ patient }) {
  if (!patient) return null;

  return (
    <motion.div
      key={patient.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl p-5 sm:p-6 h-full bg-white/95 backdrop-blur-2xl border border-white shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
              <User size={17} />
            </div>
            <h2 className="text-xs font-black tracking-wider text-[#0F172A] uppercase">
              PATIENT SNAPSHOT
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0F766E]/10 text-[#0F766E]">
            ID: {patient.id.toUpperCase()}
          </span>
        </div>

        {/* Patient Name & Demographics */}
        <div className="border-b border-slate-100 pb-3 mb-3">
          <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
            {patient.name}
          </h3>
          <p className="text-xs font-semibold text-[#64748B] mt-0.5">
            {patient.age} years • {patient.gender} • Blood Group: <span className="text-[#0F766E] font-black">{patient.bloodGroup}</span>
          </p>
        </div>

        {/* Clinical Summary Fields */}
        <div className="flex flex-col gap-3 text-xs">
          {/* Conditions */}
          <div>
            <p className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider mb-1.5">
              KNOWN CONDITIONS
            </p>
            <div className="flex flex-wrap gap-1.5">
              {patient.conditions.map((cond) => (
                <span
                  key={cond}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20"
                >
                  {cond}
                </span>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div>
            <p className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Pill size={11} className="text-[#14B8A6]" /> CURRENT MEDICATIONS
            </p>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-[#0F172A]">
              {patient.medications.join(", ")}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <p className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Droplet size={11} className="text-[#EF4444]" /> KNOWN ALLERGIES
            </p>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-[#0F172A]">
              {patient.allergies}
            </div>
          </div>

          {/* Last Visit */}
          <div>
            <p className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar size={11} className="text-[#38BDF8]" /> LAST VISIT
            </p>
            <p className="font-bold text-[#0F172A]">{patient.lastVisit}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-[#64748B]">CareSync Electronic Record</span>
        <span className="font-bold text-[#0F766E]">Verified</span>
      </div>
    </motion.div>
  );
}
