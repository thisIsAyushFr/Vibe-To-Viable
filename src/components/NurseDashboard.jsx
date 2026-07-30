import React, { useState } from 'react';
import {
  Activity, BedDouble, ClipboardCheck, ArrowLeft, Users, ListTodo,
  Pill, Clock3, AlertTriangle, CheckCircle2, Plus, X, UserPlus
} from 'lucide-react';
import StatCard from './StatCard';
import { DEPARTMENTS, DOCTORS_BY_DEPARTMENT, addWalkIn, updateWalkIn, useWalkIns } from '../data/hospitalStore';

const initialPatients = [
  {
    id: 1,
    name: 'Rahul Verma',
    room: 'A12',
    doctor: 'Dr. Arjun Sharma',
    status: 'Checked In',
    vitals: { temp: '98.6°F', bp: '120/80', pulse: '78' }
  },
  {
    id: 2,
    name: 'Nisha Rao',
    room: 'B07',
    doctor: 'Dr. Ananya Rao',
    status: 'Pending Check-In',
    vitals: { temp: '99.1°F', bp: '118/76', pulse: '82' }
  },
  {
    id: 3,
    name: 'Karan Mehta',
    room: 'A14',
    doctor: 'Dr. Priya Nair',
    status: 'Pending Check-In',
    vitals: { temp: '98.9°F', bp: '124/82', pulse: '88' }
  }
];

const initialAttention = [
  { id: 1, label: 'Nisha Rao — Medication overdue', type: 'Medication Due', priority: 'High' },
  { id: 2, label: 'Karan Mehta — Vitals not recorded', type: 'Vitals Due', priority: 'Medium' },
  { id: 3, label: 'Rahul Verma — Waiting for Dr. Sharma', type: 'Waiting for Doctor', priority: 'Low' }
];

const initialTasks = [
  { id: 1, label: 'Record vitals for Karan Mehta', done: false },
  { id: 2, label: 'Administer medication to Nisha Rao', done: false },
  { id: 3, label: 'Update chart for Rahul Verma', done: false },
  { id: 4, label: 'Prepare discharge summary for Bed A11', done: false },
  { id: 5, label: 'Restock ward supplies', done: false }
];

const initialMedications = [
  { id: 1, time: '09:00 AM', patient: 'Nisha Rao', room: 'B07', medication: 'Paracetamol 500mg', status: 'Due' },
  { id: 2, time: '10:30 AM', patient: 'Rahul Verma', room: 'A12', medication: 'Amoxicillin 250mg', status: 'Given' },
  { id: 3, time: '12:00 PM', patient: 'Karan Mehta', room: 'A14', medication: 'Ibuprofen 400mg', status: 'Due' }
];

const priorityStyles = {
  High: 'bg-rose-50 text-rose-600 border border-rose-200',
  Medium: 'bg-amber-50 text-amber-600 border border-amber-200',
  Low: 'bg-sky-50 text-sky-600 border border-sky-200'
};

const statusStyles = {
  'Checked In': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  'Pending Check-In': 'bg-amber-50 text-amber-600 border border-amber-200',
  Due: 'bg-rose-50 text-rose-600 border border-rose-200',
  Given: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
};

const glassCard = 'rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-2xl border border-white/90 shadow-lg shadow-[#0F766E]/5';

const clinics = [
  { id: 'ICU', name: 'ICU' },
  { id: 'Emergency', name: 'Emergency' },
  { id: 'General Ward', name: 'General Ward' },
  { id: 'Private Rooms', name: 'Private Rooms' },
  { id: 'Pediatrics', name: 'Pediatrics' }
];

export default function NurseDashboard({ user, onLogout, onBackToLanding }) {
  const [patients, setPatients] = useState(initialPatients);
  const [tasks, setTasks] = useState(initialTasks);
  const [medications, setMedications] = useState(initialMedications);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [allocateError, setAllocateError] = useState('');

  const updatePatient = (id, updates) => {
    setPatients((current) => current.map((patient) => (
      patient.id === id ? { ...patient, ...updates } : patient
    )));
  };

  const toggleTask = (id) => {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )));
  };

  const toggleMedication = (id) => {
    setMedications((current) => current.map((med) => (
      med.id === id ? { ...med, status: med.status === 'Due' ? 'Given' : 'Due' } : med
    )));
  };

  const handleAllocateBed = async (e) => {
    e.preventDefault();
    setAllocateError('');

    if (!selectedPatient || !selectedClinic) {
      setAllocateError('Please select both a patient and a clinic');
      return;
    }

    try {
      const response = await fetch('/api/analytics/allocate-bed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clinic_id: selectedClinic })
      });

      if (!response.ok) {
        const data = await response.json();
        setAllocateError(data.error || 'Failed to allocate bed');
        return;
      }

      const patient = patients.find(p => p.id === parseInt(selectedPatient));
      setShowAllocateModal(false);
      setSelectedPatient('');
      setSelectedClinic('');
      alert(`Bed allocated to ${patient?.name} in ${selectedClinic}`);
    } catch (error) {
      setAllocateError('Error allocating bed');
      console.error(error);
    }
  };

  const pendingTasksCount = tasks.filter((t) => !t.done).length;
  const medicationsDueCount = medications.filter((m) => m.status === 'Due').length;
  const patientsWaitingCount = patients.filter((p) => p.status === 'Pending Check-In').length
    + walkIns.filter((w) => w.status === 'Waiting').length;

  const stats = [
    { label: 'Assigned Patients', value: patients.length + walkIns.length, icon: Users, color: '#0F766E', trend: 'General Medicine' },
    { label: 'Pending Tasks', value: pendingTasksCount, icon: ListTodo, color: '#F59E0B', trend: 'Action needed' },
    { label: 'Medications Due', value: medicationsDueCount, icon: Pill, color: '#38BDF8', trend: 'Ward A' },
    { label: 'Patients Waiting', value: patientsWaitingCount, icon: Clock3, color: '#EF4444', trend: 'Check-in queue' }
  ];

  return (
    <div className="min-h-screen w-full bg-[#F0FDFA] p-4 sm:p-6 text-[#0F172A]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/90 p-6 shadow-lg shadow-[#0F766E]/5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">Nurse Portal</p>
            <h1 className="text-3xl font-bold text-[#0F172A]">Good Morning, Anjali</h1>
            <p className="mt-2 text-sm text-[#64748B]">Here's your ward activity and patient care tasks for today.</p>
            <p className="mt-1 text-xs font-semibold text-[#64748B]">Anjali Sharma • Staff Nurse • General Medicine • Ward A</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={onLogout}
              className="rounded-2xl bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d5f58]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#0F766E]" />
              <h2 className="text-xl font-bold">Needs Your Attention</h2>
            </div>
            <div className="space-y-3">
              {initialAttention.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4">
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-[#64748B]">{item.type}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${priorityStyles[item.priority]}`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={glassCard}>
            <div className="mb-4 flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-[#0F766E]" />
              <h2 className="text-xl font-bold">Today's Tasks</h2>
              <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#64748B]">
                {pendingTasksCount} pending
              </span>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left text-sm font-semibold transition-colors ${
                    task.done ? 'border-emerald-200 bg-emerald-50 text-emerald-600 line-through' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${task.done ? 'text-emerald-500' : 'text-slate-300'}`} />
                  {task.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-[#0F766E]" />
                <h2 className="text-xl font-bold">Patient Check-In & Walk-Ins</h2>
              </div>
              <button
                onClick={() => setShowWalkInModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#0F766E] px-3 py-2 text-xs font-bold text-white hover:bg-[#0d5f58]"
              >
                <Plus className="h-4 w-4" /> Add Walk-In Patient
              </button>
            </div>

            {successMessage && (
              <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                {successMessage}
              </div>
            )}

            {walkIns.length > 0 && (
              <div className="mb-4 space-y-3">
                {walkIns.map((w) => (
                  <div key={w.patientId} className="rounded-2xl border border-sky-200 bg-sky-50/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">{w.name}</p>
                          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">{w.patientId}</span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">Walk-In</span>
                        </div>
                        <p className="mt-1 text-sm text-[#64748B]">{w.department} • {w.reason} • Arrived {w.arrivalTime}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${walkInStatusStyles[w.status] || walkInStatusStyles.Waiting}`}>
                            {w.status}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${walkInPriorityStyles[w.priority] || walkInPriorityStyles.Normal}`}>
                            {w.priority}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-[#64748B]">
                        <label className="mb-1 block">Assigned Doctor</label>
                        <select
                          value={w.assignedDoctor}
                          onChange={(e) => updateWalkIn(w.patientId, { assignedDoctor: e.target.value })}
                          className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-semibold text-[#0F172A]"
                        >
                          {DOCTORS_BY_DEPARTMENT[w.department].map((doc) => (
                            <option key={doc} value={doc}>{doc}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              {patients.map((patient) => (
                <div key={patient.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-sm text-[#64748B]">Room {patient.room} • {patient.doctor}</p>
                      <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[patient.status]}`}>
                        {patient.status}
                      </span>
                    </div>
                    <button
                      disabled={patient.status === 'Checked In'}
                      onClick={() => updatePatient(patient.id, { status: 'Checked In' })}
                      className="rounded-xl bg-[#0F766E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0d5f58] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      Check In
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={glassCard}>
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#0F766E]" />
              <h2 className="text-xl font-bold">Vitals</h2>
            </div>
            <div className="space-y-3">
              {patients.map((patient) => (
                <div key={`${patient.id}-vitals`} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{patient.name}</p>
                    <button
                      onClick={() => updatePatient(patient.id, {
                        vitals: {
                          temp: `${(97 + Math.random() * 3).toFixed(1)}°F`,
                          bp: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)}`,
                          pulse: `${70 + Math.floor(Math.random() * 25)}`
                        }
                      })}
                      className="rounded-xl border border-[#0F766E] px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                    >
                      Update Vitals
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[#64748B]">Temp</p>
                      <p className="font-bold text-[#0F172A]">{patient.vitals.temp}</p>
                    </div>
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[#64748B]">BP</p>
                      <p className="font-bold text-[#0F172A]">{patient.vitals.bp}</p>
                    </div>
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[#64748B]">Pulse</p>
                      <p className="font-bold text-[#0F172A]">{patient.vitals.pulse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={glassCard}>
          <div className="mb-4 flex items-center gap-2">
            <Pill className="h-5 w-5 text-[#0F766E]" />
            <h2 className="text-xl font-bold">Medication Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wide text-[#64748B]">
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">Patient</th>
                  <th className="py-2 pr-4">Room</th>
                  <th className="py-2 pr-4">Medication</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med) => (
                  <tr key={med.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 text-[#64748B]">{med.time}</td>
                    <td className="py-3 pr-4 font-semibold">{med.patient}</td>
                    <td className="py-3 pr-4">{med.room}</td>
                    <td className="py-3 pr-4">{med.medication}</td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => toggleMedication(med.id)}
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[med.status]}`}
                      >
                        {med.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={glassCard}>
          <div className="mb-4 flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-[#0F766E]" />
            <h2 className="text-xl font-bold">Room & Doctor Assignment</h2>
            <button
              onClick={() => setShowAllocateModal(true)}
              className="ml-auto rounded-xl bg-[#0F766E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0d5f58]"
            >
              Allocate Bed
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {patients.map((patient) => (
              <div key={`${patient.id}-assign`} className="rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold">{patient.name}</p>
                <p className="text-[#64748B]">Room: {patient.room}</p>
                <p className="text-[#64748B]">Doctor: {patient.doctor}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => updatePatient(patient.id, { room: 'A13' })}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold hover:bg-slate-100"
                  >
                    Move Room
                  </button>
                  <button
                    onClick={() => updatePatient(patient.id, { doctor: 'Dr. Priya Nair' })}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold hover:bg-slate-100"
                  >
                    Reassign Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAllocateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className={`${glassCard} w-full max-w-md`}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">Allocate Bed</h3>
                <button
                  onClick={() => {
                    setShowAllocateModal(false);
                    setAllocateError('');
                  }}
                  className="text-lg font-semibold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAllocateBed} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">Select Patient</label>
                  <select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none"
                    required
                  >
                    <option value="">-- Choose a patient --</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">Select Clinic</label>
                  <select
                    value={selectedClinic}
                    onChange={(e) => setSelectedClinic(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none"
                    required
                  >
                    <option value="">-- Choose a clinic --</option>
                    {clinics.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                {allocateError && (
                  <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600 border border-rose-200">
                    {allocateError}
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllocateModal(false);
                      setAllocateError('');
                    }}
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#0F766E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0d5f58]"
                  >
                    Allocate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {showWalkInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[#0F766E]" />
                <h2 className="text-lg font-bold">Add Walk-In Patient</h2>
              </div>
              <button onClick={() => setShowWalkInModal(false)} className="rounded-lg p-1 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submitWalkIn} className="grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Patient Name"
                value={walkInForm.name}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, name: e.target.value }))}
                className="sm:col-span-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                required
                type="number"
                min="0"
                placeholder="Age"
                value={walkInForm.age}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, age: e.target.value }))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={walkInForm.gender}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, gender: e.target.value }))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                placeholder="Phone"
                value={walkInForm.phone}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={walkInForm.priority}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, priority: e.target.value }))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option>Normal</option>
                <option>Priority</option>
                <option>Urgent</option>
              </select>
              <input
                placeholder="Reason for Visit"
                value={walkInForm.reason}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, reason: e.target.value }))}
                className="sm:col-span-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={walkInForm.department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={walkInForm.assignedDoctor}
                onChange={(e) => setWalkInForm((prev) => ({ ...prev, assignedDoctor: e.target.value }))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                {DOCTORS_BY_DEPARTMENT[walkInForm.department].map((doc) => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
              <button
                type="submit"
                className="sm:col-span-2 mt-1 rounded-xl bg-[#0F766E] py-2.5 text-sm font-bold text-white hover:bg-[#0d5f58]"
              >
                Add & Check In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
