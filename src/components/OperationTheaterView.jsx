import React, { useState } from 'react';
import {
  Activity,
  Clock,
  CheckCircle2,
  Info,
  Building2,
  Siren,
  X
} from 'lucide-react';
import { OPERATION_THEATERS } from '../data/doctorDemoData';

const OT4_RESERVATION_KEY = 'caresync_ot4_emergency_reservation';

export default function OperationTheaterView() {
  const [ot4Reservation, setOt4Reservation] = useState(() => {
    try {
      const stored = localStorage.getItem(OT4_RESERVATION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Standard OT bookings made via the green "Reserve OT Slot" flow, keyed by OT id.
  const [otReservations, setOtReservations] = useState({});
  const [reserveTargetId, setReserveTargetId] = useState(null);
  const [reserveForm, setReserveForm] = useState({ patient: '', procedure: '', surgeon: '', duration: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const standardTheaters = OPERATION_THEATERS.filter((ot) => ot.id !== 'ot-4');
  const reserveTarget = standardTheaters.find((ot) => ot.id === reserveTargetId) || null;

  const isOtAvailable = (ot) => ot.status !== 'occupied' && !otReservations[ot.id];

  const flashSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const updateReserveForm = (field) => (e) => setReserveForm((f) => ({ ...f, [field]: e.target.value }));

  const handleOpenReserve = (ot) => {
    if (!isOtAvailable(ot)) return; // already booked — no double booking
    setReserveTargetId(ot.id);
    setReserveForm({ patient: '', procedure: '', surgeon: '', duration: '' });
  };

  const handleCloseReserve = () => {
    setReserveTargetId(null);
    setReserveForm({ patient: '', procedure: '', surgeon: '', duration: '' });
  };

  const handleConfirmReservation = () => {
    if (!reserveTarget) return;
    if (!isOtAvailable(reserveTarget)) {
      handleCloseReserve();
      return;
    }
    setOtReservations((prev) => ({ ...prev, [reserveTarget.id]: { ...reserveForm } }));
    handleCloseReserve();
    flashSuccess(`${reserveTarget.name} reserved successfully.`);
  };

  const handleReleaseReservation = () => {
    setOt4Reservation(null);
    localStorage.removeItem(OT4_RESERVATION_KEY);
  };

  const handleEmergencyReserve = () => {
    if (ot4Reservation) return; // already reserved — no double booking
    const reservation = {
      patient: 'Incoming Trauma Patient',
      reason: 'Emergency Trauma Dispatch',
      doctor: 'Dr. Priya Nair (On-Call Specialist)',
      duration: 'Until stabilized'
    };
    setOt4Reservation(reservation);
    localStorage.setItem(OT4_RESERVATION_KEY, JSON.stringify(reservation));
    flashSuccess('Emergency OT reserved successfully. Emergency team notified.');
  };

  const isReserveFormValid = reserveForm.patient && reserveForm.procedure && reserveForm.surgeon && reserveForm.duration;

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
              Live OT slot occupancy, surgeon allocations, and emergency trauma readiness at Aarogya Multispeciality Hospital.
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

        {successMessage && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {standardTheaters.map((ot) => {
            const reservation = otReservations[ot.id];
            const isOccupied = ot.status === 'occupied' || Boolean(reservation);
            const displayProcedure = reservation ? reservation.procedure : ot.procedure;
            const displaySurgeon = reservation ? reservation.surgeon : ot.currentSurgeon;
            const displayPatient = reservation ? reservation.patient : ot.patientName;
            const displayTimeSlot = reservation ? reservation.duration : ot.timeSlot;

            return (
              <div
                key={ot.id}
                className={`p-5 rounded-2xl border transition-all shadow-sm flex flex-col justify-between ${
                  isOccupied
                    ? 'bg-rose-50/60 border-rose-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#0F172A]">{ot.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isOccupied
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {isOccupied ? 'occupied' : ot.status}
                    </span>
                  </div>

                  {isOccupied ? (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Procedure</span>
                        <p className="font-bold text-slate-800">{displayProcedure}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Operating Surgeon</span>
                        <p className="font-semibold text-teal-800">{displaySurgeon}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Patient</span>
                        <p className="font-medium text-slate-700">{displayPatient}</p>
                      </div>
                      <div className="pt-2 border-t border-rose-200/60 flex items-center gap-1.5 text-rose-700 text-[11px] font-bold">
                        <Clock size={13} />
                        <span>Slot: {displayTimeSlot}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 py-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-900">OT Fully Cleaned & Vacant</p>
                        <p className="text-[11px] text-emerald-700 mt-0.5">{ot.nextAvailableSlot}</p>
                      </div>
                      <button
                        onClick={() => handleOpenReserve(ot)}
                        className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        Reserve OT Slot
                      </button>
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

          {/* OT 4 — Dedicated Emergency Trauma Suite */}
          <div
            className={`p-5 rounded-2xl border transition-all shadow-sm flex flex-col justify-between ${
              ot4Reservation ? 'bg-rose-50/60 border-rose-200' : 'bg-amber-50/60 border-amber-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#0F172A]">OT 4 — Emergency Trauma Suite</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  ot4Reservation
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {ot4Reservation ? 'Emergency Reserved' : 'Reserved for Emergency'}
                </span>
              </div>

              {ot4Reservation ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Patient</span>
                    <p className="font-bold text-slate-800">{ot4Reservation.patient}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Reason</span>
                    <p className="font-semibold text-rose-800">{ot4Reservation.reason}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Doctor</span>
                    <p className="font-medium text-slate-700">{ot4Reservation.doctor}</p>
                  </div>
                  <div className="pt-2 border-t border-rose-200/60 flex items-center gap-1.5 text-rose-700 text-[11px] font-bold">
                    <Clock size={13} />
                    <span>Expected: {ot4Reservation.duration}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <Siren size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-900">Available 24×7</p>
                    <p className="text-[11px] text-amber-700 mt-0.5 leading-snug">
                      This OT is normally reserved and can be used when normal OTs are unavailable during an emergency.
                    </p>
                  </div>
                  <button
                    onClick={handleEmergencyReserve}
                    className="w-full py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Reserve for Emergency
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Dept: Emergency Medicine</span>
              {ot4Reservation ? (
                <button onClick={handleReleaseReservation} className="font-bold text-rose-700 hover:underline">
                  Release
                </button>
              ) : (
                <span className="font-bold text-teal-700">Available 24×7</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Standard OT Reservation Modal — triggered by the green "Reserve OT Slot" button */}
      {reserveTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseReserve}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-black text-[#0F172A] mb-1">Reserve {reserveTarget.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{reserveTarget.nextAvailableSlot}</p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Patient</label>
                <input
                  value={reserveForm.patient}
                  onChange={updateReserveForm('patient')}
                  placeholder="Patient name"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Procedure</label>
                <input
                  value={reserveForm.procedure}
                  onChange={updateReserveForm('procedure')}
                  placeholder="e.g. Appendectomy"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Operating Surgeon</label>
                <input
                  value={reserveForm.surgeon}
                  onChange={updateReserveForm('surgeon')}
                  placeholder="Attending surgeon"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Expected Duration</label>
                <input
                  value={reserveForm.duration}
                  onChange={updateReserveForm('duration')}
                  placeholder="e.g. 2 hours"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              disabled={!isReserveFormValid}
              className="w-full mt-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md transition-all"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
