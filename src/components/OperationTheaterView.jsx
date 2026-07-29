import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ShieldAlert, 
  Info, 
  Building2,
  Stethoscope,
  Scissors
} from 'lucide-react';
import { OPERATION_THEATERS, SCHEDULED_SURGERIES } from '../data/doctorDemoData';

export default function OperationTheaterView() {
  const [activeDeptFilter, setActiveDeptFilter] = useState('All');

  const filteredSurgeries = SCHEDULED_SURGERIES.filter((surg) => {
    if (activeDeptFilter === 'All') return true;
    return surg.department === activeDeptFilter;
  });

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 mb-2">
              <Activity size={14} className="text-cyan-400" />
              <span>Aarogya Hospital Surgical Suites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Operation Theater (OT) Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Live OT slot occupancy, surgeon allocations, and surgical schedules at Aarogya Multispeciality Hospital.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 self-start md:self-auto">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Live Status</p>
              <p className="text-xs font-black text-emerald-300">1 OT Vacant • 2 Occupied • 1 Standby</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specialty Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
        <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Surgical Department Note:</span> Operation Theater suites are assigned to surgical departments (<strong>Cardiology</strong>, <strong>Orthopedics</strong>, <strong>Neurology</strong>, and <strong>Emergency Medicine</strong>). Non-surgical departments (e.g. <strong>Dermatology</strong> or routine <strong>Pediatrics OPD</strong>) conduct procedures in outpatient clinical consultation rooms and do not require OT schedules.
        </div>
      </div>

      {/* OT Live Occupancy Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Building2 size={18} className="text-[#0F766E]" />
            <span>Operation Theater Status & Vacant Slots</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">Real-time Suite Telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {OPERATION_THEATERS.map((ot) => {
            const isOccupied = ot.status === 'occupied';
            const isVacant = ot.status === 'vacant';
            const isStandby = ot.status === 'standby';

            return (
              <div 
                key={ot.id}
                className={`p-5 rounded-2xl border transition-all shadow-sm flex flex-col justify-between ${
                  isOccupied 
                    ? 'bg-rose-50/60 border-rose-200' 
                    : isVacant 
                    ? 'bg-emerald-50/60 border-emerald-200' 
                    : 'bg-cyan-50/60 border-cyan-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#0F172A]">{ot.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isOccupied 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : isVacant 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                    }`}>
                      {ot.status}
                    </span>
                  </div>

                  {isOccupied ? (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Procedure</span>
                        <p className="font-bold text-slate-800">{ot.procedure}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Operating Surgeon</span>
                        <p className="font-semibold text-teal-800">{ot.currentSurgeon}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Patient</span>
                        <p className="font-medium text-slate-700">{ot.patientName}</p>
                      </div>
                      <div className="pt-2 border-t border-rose-200/60 flex items-center gap-1.5 text-rose-700 text-[11px] font-bold">
                        <Clock size={13} />
                        <span>Slot: {ot.timeSlot}</span>
                      </div>
                    </div>
                  ) : isVacant ? (
                    <div className="space-y-3 py-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-900">OT Fully Cleaned & Vacant</p>
                        <p className="text-[11px] text-emerald-700 mt-0.5">{ot.nextAvailableSlot}</p>
                      </div>
                      <button className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all">
                        Reserve OT Slot
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 py-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto">
                        <ShieldAlert size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-cyan-900">Level-1 Trauma Standby Suite</p>
                        <p className="text-[11px] text-cyan-700 mt-0.5">{ot.nextAvailableSlot}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Dept: {ot.department}</span>
                  <span className="font-bold text-teal-700">{ot.nextAvailableSlot}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Operations Timeline */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Scissors size={18} className="text-[#0F766E]" />
              <span>Surgical Operation Schedule</span>
            </h3>
            <p className="text-xs text-slate-500">Upcoming procedures for doctors using Operation Theater</p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Cardiology', 'Orthopedics', 'Neurology'].map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDeptFilter(dept)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeDeptFilter === dept 
                    ? 'bg-teal-700 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredSurgeries.map((surg) => (
            <div key={surg.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 px-3 rounded-2xl transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <Stethoscope size={18} />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">{surg.procedure}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800">
                      {surg.otName}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      surg.status === 'In-Progress' 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : surg.status === 'Pre-Op Preparation'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {surg.status}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-600 mt-1">
                    Surgeon: <span className="font-bold text-teal-900">{surg.surgeonName}</span> ({surg.degree})
                  </p>
                  
                  <p className="text-xs text-slate-500 mt-0.5">
                    Patient: <span className="font-semibold text-slate-800">{surg.patientName} ({surg.patientAge} yrs)</span> • Dept: <span className="font-semibold">{surg.department}</span>
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between text-xs text-slate-600 gap-1 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Calendar size={14} className="text-teal-600" />
                  <span>{surg.date}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-teal-700 font-semibold">
                  <Clock size={14} />
                  <span>{surg.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
