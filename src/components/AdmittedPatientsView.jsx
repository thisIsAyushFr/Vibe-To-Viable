import React, { useState } from 'react';
import { 
  Building2, 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  UserCheck, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import { ADMITTED_PATIENTS } from '../data/doctorDemoData';

export default function AdmittedPatientsView() {
  const [filterCondition, setFilterCondition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = ADMITTED_PATIENTS.filter((pat) => {
    const matchesCondition = filterCondition === 'All' || pat.condition === filterCondition;
    const matchesSearch = pat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pat.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pat.ward.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-teal-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 mb-2">
              <Building2 size={14} className="text-cyan-400" />
              <span>Inpatient Ward & Bed Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Admitted Patients & Bed Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Track assigned bed numbers, ward locations, clinical conditions, and vitals for all admitted patients at Aarogya Hospital.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Total Wards</p>
              <p className="text-lg font-black text-emerald-300">5 Wards</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Occupied Beds</p>
              <p className="text-lg font-black text-cyan-300">5 Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-full sm:w-72">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, bed number, or ward..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-xs font-medium text-slate-800 w-full"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Filter size={14} /> Condition Filter:
          </span>
          {['All', 'Critical', 'Post-Op Recovery', 'Under Observation', 'Stable & Improving'].map((cond) => (
            <button
              key={cond}
              onClick={() => setFilterCondition(cond)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filterCondition === cond 
                  ? 'bg-teal-700 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Admitted Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatients.map((patient) => {
          const isCritical = patient.condition === 'Critical';
          const isPostOp = patient.condition === 'Post-Op Recovery';
          const isObservation = patient.condition === 'Under Observation';
          const isStable = patient.condition === 'Stable & Improving';

          return (
            <div 
              key={patient.id} 
              className={`p-5 rounded-3xl bg-white border shadow-md flex flex-col justify-between transition-all hover:shadow-xl ${
                isCritical 
                  ? 'border-rose-300 ring-2 ring-rose-500/20' 
                  : isPostOp 
                  ? 'border-amber-300 ring-2 ring-amber-500/20'
                  : isObservation
                  ? 'border-cyan-300'
                  : 'border-emerald-300'
              }`}
            >
              <div>
                {/* Header: Bed Number & Ward */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Bed</span>
                    <span className="text-sm font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
                      {patient.bedNumber}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                    isCritical 
                      ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse' 
                      : isPostOp 
                      ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                      : isObservation
                      ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {patient.condition}
                  </span>
                </div>

                {/* Patient Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-slate-900">{patient.name}</h3>
                    <span className="text-xs font-semibold text-slate-500">{patient.age} yrs • {patient.gender}</span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    Ward: <span className="font-bold text-slate-800">{patient.ward}</span>
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Clinical Status & Condition</span>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {patient.conditionDetails}
                    </p>
                  </div>

                  {/* Vitals Telemetry Grid */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Live Patient Vitals</span>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                        <span className="text-[9px] font-bold text-slate-400 block">BP</span>
                        <span className="text-xs font-extrabold text-teal-800">{patient.vitals.bp}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                        <span className="text-[9px] font-bold text-slate-400 block">Pulse</span>
                        <span className="text-xs font-extrabold text-teal-800">{patient.vitals.hr}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                        <span className="text-[9px] font-bold text-slate-400 block">SpO2</span>
                        <span className="text-xs font-extrabold text-teal-800">{patient.vitals.spo2}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                        <span className="text-[9px] font-bold text-slate-400 block">Temp</span>
                        <span className="text-xs font-extrabold text-teal-800">{patient.vitals.temp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 truncate">
                  <Stethoscope size={14} className="text-teal-600 flex-shrink-0" />
                  <span className="truncate font-semibold">{patient.attendingDoctor}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Adm: {patient.admissionDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
