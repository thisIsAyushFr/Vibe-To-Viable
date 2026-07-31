import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Siren,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  ListOrdered
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OPERATION_THEATERS, OT_QUEUE_STATUS } from '../data/doctorDemoData';

const OT4_RESERVATION_KEY = 'caresync_ot4_emergency_reservation';

const PRIORITY_STYLES = {
  Emergency: 'bg-rose-100 text-rose-800 border border-rose-200',
  Urgent: 'bg-amber-100 text-amber-800 border border-amber-200',
  Elective: 'bg-teal-100 text-teal-800 border border-teal-200',
};

const POSITION_STYLES = {
  Next: 'bg-emerald-600 text-white',
  Preparing: 'bg-[#38BDF8] text-white',
  Waiting: 'bg-slate-500 text-white',
};

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

  // Each OT card tracks its own expanded/collapsed state independently, keyed
  // by OT id — expanding one card never touches any other card's state.
  const [expandedOtIds, setExpandedOtIds] = useState({});
  const toggleOtExpanded = (id) => setExpandedOtIds((prev) => ({ ...prev, [id]: !prev[id] }));

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
      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {standardTheaters.map((ot) => {
          const reservation = otReservations[ot.id];
          const isOccupied = ot.status === 'occupied' || Boolean(reservation);
          const displayProcedure = reservation ? reservation.procedure : ot.procedure;
          const displaySurgeon = reservation ? reservation.surgeon : ot.currentSurgeon;
          const displayPatient = reservation ? reservation.patient : ot.patientName;
          const displayTimeSlot = reservation ? reservation.duration : ot.timeSlot;
          const queue = OT_QUEUE_STATUS[ot.id] || [];
          const isExpanded = Boolean(expandedOtIds[ot.id]);

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
                      onClick={(e) => { e.stopPropagation(); handleOpenReserve(ot); }}
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

              <button
                onClick={() => toggleOtExpanded(ot.id)}
                className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F766E] hover:text-[#0B5C56] mt-3 transition-colors"
              >
                <span>{isExpanded ? 'View Less' : 'View More'}</span>
                {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 rounded-2xl p-3.5 bg-white border border-slate-100 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-1.5">
                          <ListOrdered size={13} className="text-[#0F766E]" />
                          Queue Status
                        </p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0 ${
                          queue.length ? 'bg-[#0F766E]/10 text-[#0F766E]' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Users size={11} />
                          {queue.length === 0
                            ? 'Queue Empty'
                            : `${queue.length} Patient${queue.length > 1 ? 's' : ''} Waiting`}
                        </span>
                      </div>

                      {queue.length === 0 ? (
                        <p className="text-[11px] font-semibold text-slate-500 text-center py-3">
                          No patients currently waiting for this OT.
                        </p>
                      ) : (
                        <>
                          <p className="text-[11px] font-bold text-teal-700 mb-2.5 flex items-center gap-1.5">
                            <Clock size={12} /> Next Surgery in {queue[0].waitTime}
                          </p>
                          <ul className="flex flex-col gap-2">
                            {queue.map((entry) => (
                              <li
                                key={entry.id}
                                className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-black text-[#0F172A] truncate">
                                    #{entry.position} {entry.status === 'Next' ? 'NEXT' : entry.status.toUpperCase()}
                                  </span>
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${POSITION_STYLES[entry.status]}`}>
                                    {entry.status}
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-slate-800">{entry.patientName}</p>
                                <p className="text-[11px] font-semibold text-slate-600 truncate">{entry.procedure}</p>
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${PRIORITY_STYLES[entry.priority]}`}>
                                    {entry.priority}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 flex-shrink-0">
                                    <Clock size={11} /> Est. wait: {entry.waitTime}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
