import React, { useState } from 'react';
import {
  Activity, BedDouble, ClipboardCheck, ArrowLeft, Users, ListTodo,
  Pill, Clock3, AlertTriangle, CheckCircle2, Plus, X, UserPlus,
  PhoneCall, Bell, MessageSquare, FlaskConical, FileText, Siren,
  Stethoscope, CalendarClock, Radio, ShieldAlert
} from 'lucide-react';
import StatCard from './StatCard';
import AIWidget from './AIWidget';
import { DEPARTMENTS, DOCTORS_BY_DEPARTMENT, addWalkIn, updateWalkIn, useWalkIns } from '../data/hospitalStore';

const initialPatients = [
  {
    id: 1,
    name: 'Rahul Verma',
    room: 'A12',
    doctor: 'Dr. Arjun Sharma',
    status: 'Checked In',
    condition: 'Stable',
    vitals: { temp: '98.6°F', bp: '120/80', pulse: '78', spo2: '98%' }
  },
  {
    id: 2,
    name: 'Nisha Rao',
    room: 'B07',
    doctor: 'Dr. Ananya Rao',
    status: 'Pending Check-In',
    condition: 'Critical',
    vitals: { temp: '99.1°F', bp: '118/76', pulse: '82', spo2: '95%' }
  },
  {
    id: 3,
    name: 'Karan Mehta',
    room: 'A14',
    doctor: 'Dr. Priya Nair',
    status: 'Pending Check-In',
    condition: 'Stable',
    vitals: { temp: '98.9°F', bp: '124/82', pulse: '88', spo2: '99%' }
  }
];

const initialAttention = [
  { id: 1, label: 'Nisha Rao — Medication overdue', type: 'Medication Due', priority: 'High' },
  { id: 2, label: 'Karan Mehta — Vitals not recorded', type: 'Vitals Due', priority: 'Medium' },
  { id: 3, label: 'Rahul Verma — Waiting for Dr. Sharma', type: 'Waiting for Doctor', priority: 'Low' }
];

const initialTasks = [
  { id: 1, label: 'Record vitals for Karan Mehta', priority: 'High', done: false },
  { id: 2, label: 'Administer medication to Nisha Rao', priority: 'High', done: false },
  { id: 3, label: 'Update chart for Rahul Verma', priority: 'Medium', done: false },
  { id: 4, label: 'Prepare discharge summary for Bed A11', priority: 'Medium', done: false },
  { id: 5, label: 'Restock ward supplies', priority: 'Low', done: false }
];

const initialMedications = [
  { id: 1, time: '09:00 AM', patient: 'Nisha Rao', room: 'B07', medication: 'Paracetamol 500mg', status: 'Due' },
  { id: 2, time: '10:30 AM', patient: 'Rahul Verma', room: 'A12', medication: 'Amoxicillin 250mg', status: 'Given' },
  { id: 3, time: '12:00 PM', patient: 'Karan Mehta', room: 'A14', medication: 'Ibuprofen 400mg', status: 'Due' },
  { id: 4, time: '02:00 PM', patient: 'Nisha Rao', room: 'B07', medication: 'Cefixime 200mg', status: 'Due' }
];

const initialCallRequests = [
  { id: 1, room: 'B07', patient: 'Nisha Rao', reason: 'Pain — requesting assistance', priority: 'High', time: '2 min ago', active: true },
  { id: 2, room: 'A14', patient: 'Karan Mehta', reason: 'Water / general assistance', priority: 'Low', time: '6 min ago', active: true },
  { id: 3, room: 'A12', patient: 'Rahul Verma', reason: 'Bathroom assistance', priority: 'Medium', time: '11 min ago', active: false }
];

const initialChecklist = [
  { id: 1, label: 'Handover notes reviewed from night shift', done: true },
  { id: 2, label: 'Ward supplies & PPE stock checked', done: true },
  { id: 3, label: 'Emergency crash cart verified', done: false },
  { id: 4, label: 'All patient IDs and armbands verified', done: false },
  { id: 5, label: 'Isolation room protocols confirmed', done: false }
];

const initialPendingTests = [
  { id: 1, patient: 'Rahul Verma', room: 'A12', test: 'CBC & Blood Sugar', orderedBy: 'Dr. Arjun Sharma', status: 'Sample Pending', eta: '10:30 AM' },
  { id: 2, patient: 'Nisha Rao', room: 'B07', test: 'Chest X-Ray', orderedBy: 'Dr. Ananya Rao', status: 'Awaiting Result', eta: '11:15 AM' },
  { id: 3, patient: 'Karan Mehta', room: 'A14', test: 'Urine Culture', orderedBy: 'Dr. Priya Nair', status: 'Sample Pending', eta: '01:00 PM' }
];

const initialDoctorOrders = [
  { id: 1, patient: 'Rahul Verma', doctor: 'Dr. Arjun Sharma', order: 'Continue IV fluids, monitor BP every 4 hrs', time: '08:15 AM', status: 'In Progress' },
  { id: 2, patient: 'Nisha Rao', doctor: 'Dr. Ananya Rao', order: 'Start antibiotic course, recheck temp in 2 hrs', time: '09:00 AM', status: 'Pending' },
  { id: 3, patient: 'Karan Mehta', doctor: 'Dr. Priya Nair', order: 'Diet: liquids only, mobilize with assistance', time: '09:40 AM', status: 'Acknowledged' }
];

const initialEmergencyAlerts = [
  { id: 1, room: 'B07', message: 'SpO2 dropped below 95% — Nisha Rao', level: 'Critical', time: '3 min ago' }
];

const initialWardBeds = [
  { bed: 'A11', status: 'Available' },
  { bed: 'A12', status: 'Occupied', patient: 'Rahul Verma' },
  { bed: 'A13', status: 'Cleaning' },
  { bed: 'A14', status: 'Occupied', patient: 'Karan Mehta' },
  { bed: 'B07', status: 'Occupied', patient: 'Nisha Rao' },
  { bed: 'B08', status: 'Available' }
];

const initialTeamMessages = [
  { id: 1, from: 'Dr. Arjun Sharma', message: 'Please recheck Rahul Verma\'s BP before noon rounds.', time: '9:12 AM' },
  { id: 2, from: 'Charge Nurse - Meera', message: 'Extra staff assigned to Ward A from 12 PM.', time: '9:30 AM' },
  { id: 3, from: 'Lab', message: 'X-Ray results for Nisha Rao ready for pickup.', time: '9:48 AM' }
];

const shiftTimeline = [
  { time: '07:00 AM', event: 'Shift started — handover from night nurse', done: true },
  { time: '08:00 AM', event: 'Morning rounds with Dr. Sharma', done: true },
  { time: '09:00 AM', event: 'Medication round — Ward A', done: true },
  { time: '11:00 AM', event: 'Vitals check — all patients', done: false },
  { time: '01:00 PM', event: 'Lunch break', done: false },
  { time: '03:00 PM', event: 'Afternoon medication round', done: false },
  { time: '06:30 PM', event: 'Shift handover to evening nurse', done: false }
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

const conditionStyles = {
  Critical: 'bg-rose-50 text-rose-600 border border-rose-200',
  Stable: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
};

const bedStatusStyles = {
  Available: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  Occupied: 'bg-sky-50 text-sky-600 border border-sky-200',
  Cleaning: 'bg-amber-50 text-amber-600 border border-amber-200'
};

const orderStatusStyles = {
  Pending: 'bg-amber-50 text-amber-600 border border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-600 border border-sky-200',
  Acknowledged: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
};

const testStatusStyles = {
  'Sample Pending': 'bg-amber-50 text-amber-600 border border-amber-200',
  'Awaiting Result': 'bg-sky-50 text-sky-600 border border-sky-200',
  Completed: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
};

const glassCard = 'rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-2xl border border-white/90 shadow-lg shadow-[#0F766E]/5';

const clinics = [
  { id: 'ICU', name: 'ICU' },
  { id: 'Emergency', name: 'Emergency' },
  { id: 'General Ward', name: 'General Ward' },
  { id: 'Private Rooms', name: 'Private Rooms' },
  { id: 'Pediatrics', name: 'Pediatrics' }
];

const walkInPriorityStyles = {
  Urgent: 'bg-rose-50 text-rose-600 border border-rose-200',
  Priority: 'bg-amber-50 text-amber-600 border border-amber-200',
  Normal: 'bg-slate-100 text-slate-600 border border-slate-200'
};

const walkInStatusStyles = {
  Waiting: 'bg-amber-50 text-amber-600 border border-amber-200',
  'In Consultation': 'bg-sky-50 text-sky-600 border border-sky-200',
  Completed: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
};

const emptyWalkInForm = {
  name: '', age: '', gender: 'Male', phone: '', reason: '',
  department: DEPARTMENTS[0], assignedDoctor: DOCTORS_BY_DEPARTMENT[DEPARTMENTS[0]][0], priority: 'Normal'
};

const formatHour12 = (hour, minute = 0) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
};

const getGreeting = (hour) => {
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

// Shift boundaries match the hospital-wide schedule (see admin.html shift options): 6AM-4PM, 4PM-10PM, 10PM-6AM.
const getShiftInfo = (now) => {
  const hour = now.getHours();
  let shiftName;
  let endHour;
  if (hour >= 6 && hour < 16) {
    shiftName = 'Morning Shift';
    endHour = 16;
  } else if (hour >= 16 && hour < 22) {
    shiftName = 'Evening Shift';
    endHour = 22;
  } else {
    shiftName = 'Night Shift';
    endHour = 6;
  }

  const shiftEnd = new Date(now);
  shiftEnd.setHours(endHour, 0, 0, 0);
  if (shiftEnd <= now) shiftEnd.setDate(shiftEnd.getDate() + 1);

  const diffMs = shiftEnd - now;
  const hoursRemaining = Math.floor(diffMs / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    shiftName,
    remainingLabel: `${hoursRemaining}h ${minutesRemaining}m`,
    endLabel: `Ends ${formatHour12(endHour)}`
  };
};

const sectionHeader = (Icon, title, badge) => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-[#0F766E]" />
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {badge}
  </div>
);

export default function NurseDashboard({ user, onLogout, onBackToLanding }) {
  const [patients, setPatients] = useState(initialPatients);
  const [tasks, setTasks] = useState(initialTasks);
  const [medications, setMedications] = useState(initialMedications);
  const [callRequests, setCallRequests] = useState(initialCallRequests);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [pendingTests, setPendingTests] = useState(initialPendingTests);
  const [doctorOrders, setDoctorOrders] = useState(initialDoctorOrders);
  const [emergencyAlerts, setEmergencyAlerts] = useState(initialEmergencyAlerts);
  const [wardBeds] = useState(initialWardBeds);
  const [teamMessages, setTeamMessages] = useState(initialTeamMessages);
  const [newMessage, setNewMessage] = useState('');
  const walkIns = useWalkIns();
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInForm, setWalkInForm] = useState(emptyWalkInForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [vitalsModalPatientId, setVitalsModalPatientId] = useState(null);
  const [vitalsForm, setVitalsForm] = useState({ temp: '', bp: '', pulse: '', spo2: '' });
  const [greeting] = useState(() => getGreeting(new Date().getHours()));
  const [shiftInfo] = useState(() => getShiftInfo(new Date()));

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

  const resolveCallRequest = (id) => {
    setCallRequests((current) => current.map((req) => (
      req.id === id ? { ...req, active: false } : req
    )));
  };

  const toggleChecklistItem = (id) => {
    setChecklist((current) => current.map((item) => (
      item.id === id ? { ...item, done: !item.done } : item
    )));
  };

  const acknowledgeOrder = (id) => {
    setDoctorOrders((current) => current.map((order) => (
      order.id === id ? { ...order, status: 'Acknowledged' } : order
    )));
  };

  const advanceTestStatus = (id) => {
    setPendingTests((current) => current.map((test) => {
      if (test.id !== id) return test;
      const next = test.status === 'Sample Pending' ? 'Awaiting Result'
        : test.status === 'Awaiting Result' ? 'Completed' : 'Completed';
      return { ...test, status: next };
    }));
  };

  const dismissAlert = (id) => {
    setEmergencyAlerts((current) => current.filter((alert) => alert.id !== id));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setTeamMessages((current) => [
      ...current,
      { id: current.length + 1, from: 'You (Anjali Sharma)', message: newMessage.trim(), time: 'Just now' }
    ]);
    setNewMessage('');
  };

  const openVitalsModal = (patient) => {
    setVitalsModalPatientId(patient.id);
    setVitalsForm({ ...patient.vitals });
  };

  const closeVitalsModal = () => {
    setVitalsModalPatientId(null);
  };

  const submitVitals = (e) => {
    e.preventDefault();
    updatePatient(vitalsModalPatientId, { vitals: { ...vitalsForm } });
    setVitalsModalPatientId(null);
  };

  const handleDepartmentChange = (department) => {
    setWalkInForm((prev) => ({ ...prev, department, assignedDoctor: DOCTORS_BY_DEPARTMENT[department][0] }));
  };

  const submitWalkIn = (e) => {
    e.preventDefault();
    if (!walkInForm.name || !walkInForm.age) return;
    const patient = addWalkIn({ ...walkInForm, age: Number(walkInForm.age) });
    setShowWalkInModal(false);
    setWalkInForm(emptyWalkInForm);
    setSuccessMessage(`${patient.name} (${patient.patientId}) added and checked in to ${patient.assignedDoctor}'s queue.`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const pendingTasksCount = tasks.filter((t) => !t.done).length;
  const medicationsDueCount = medications.filter((m) => m.status === 'Due').length;
  const patientsWaitingCount = patients.filter((p) => p.status === 'Pending Check-In').length
    + walkIns.filter((w) => w.status === 'Waiting').length;
  const criticalPatientsCount = patients.filter((p) => p.condition === 'Critical').length;
  const activeCallsCount = callRequests.filter((r) => r.active).length;

  const stats = [
    { label: 'Assigned Patients', value: patients.length + walkIns.length, icon: Users, color: '#0F766E', trend: 'General Medicine' },
    { label: 'Pending Tasks', value: pendingTasksCount, icon: ListTodo, color: '#F59E0B', trend: 'Action needed' },
    { label: 'Critical Patients', value: criticalPatientsCount, icon: ShieldAlert, color: '#EF4444', trend: 'Ward A/B' },
    { label: 'Medication Due', value: medicationsDueCount, icon: Pill, color: '#38BDF8', trend: 'Ward A' },
    { label: 'Active Call Requests', value: activeCallsCount, icon: PhoneCall, color: '#F59E0B', trend: 'Live' },
    { label: 'Shift Time Remaining', value: shiftInfo.remainingLabel, icon: Clock3, color: '#14B8A6', trend: shiftInfo.endLabel }
  ];

  return (
    <div className="min-h-screen w-full bg-[#F0FDFA] p-4 sm:p-6 text-[#0F172A]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/90 p-6 shadow-lg shadow-[#0F766E]/5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">Nurse Portal</p>
            <h1 className="text-3xl font-bold text-[#0F172A]">{greeting}, Anjali</h1>
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

        {emergencyAlerts.length > 0 && (
          <div className="space-y-3">
            {emergencyAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl sm:rounded-3xl border border-rose-300 bg-rose-50 p-5 shadow-lg shadow-rose-500/10 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white">
                    <Siren className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-rose-700">Emergency Alert — Room {alert.room}</p>
                    <p className="text-xs text-rose-600">{alert.message} • {alert.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  Respond & Dismiss
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            {sectionHeader(ListTodo, 'Priority Tasks', (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#64748B]">
                {pendingTasksCount} pending
              </span>
            ))}
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
                  <span className="flex-1">{task.label}</span>
                  {!task.done && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityStyles[task.priority]}`}>
                      {task.priority}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={glassCard}>
            {sectionHeader(AlertTriangle, 'Needs Your Attention')}
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
        </div>

        <div className={glassCard}>
          {sectionHeader(Users, 'Assigned Patients', (
            <button
              onClick={() => setShowWalkInModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#0F766E] px-3 py-2 text-xs font-bold text-white hover:bg-[#0d5f58]"
            >
              <Plus className="h-4 w-4" /> Add Walk-In Patient
            </button>
          ))}

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

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {patients.map((patient) => (
              <div key={patient.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-[#64748B]">Room {patient.room} • {patient.doctor}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${conditionStyles[patient.condition]}`}>
                    {patient.condition}
                  </span>
                </div>
                <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[patient.status]}`}>
                  {patient.status}
                </span>
                <div className="mt-3">
                  <button
                    disabled={patient.status === 'Checked In'}
                    onClick={() => updatePatient(patient.id, { status: 'Checked In' })}
                    className="w-full rounded-xl bg-[#0F766E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0d5f58] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    Check In
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            {sectionHeader(Activity, 'Live Vitals Monitor', (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-200">
                <Radio className="h-3 w-3 animate-pulse" /> Live
              </span>
            ))}
            <div className="space-y-3">
              {patients.map((patient) => (
                <div key={`${patient.id}-vitals`} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{patient.name}</p>
                      {patient.condition === 'Critical' && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-600">Critical</span>
                      )}
                    </div>
                    <button
                      onClick={() => openVitalsModal(patient)}
                      className="rounded-xl border border-[#0F766E] px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                    >
                      Update Vitals
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
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
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[#64748B]">SpO2</p>
                      <p className="font-bold text-[#0F172A]">{patient.vitals.spo2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={glassCard}>
            {sectionHeader(PhoneCall, 'Nurse Call Requests', (
              <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 border border-rose-200">
                {activeCallsCount} active
              </span>
            ))}
            <div className="space-y-3">
              {callRequests.map((req) => (
                <div
                  key={req.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-4 ${
                    req.active ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200 opacity-60'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold">Room {req.room} — {req.patient}</p>
                    <p className="text-xs text-[#64748B]">{req.reason} • {req.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityStyles[req.priority]}`}>
                      {req.priority}
                    </span>
                    {req.active ? (
                      <button
                        onClick={() => resolveCallRequest(req.id)}
                        className="rounded-lg bg-[#0F766E] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0d5f58]"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">Resolved</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={glassCard}>
          {sectionHeader(Pill, 'Medication Schedule')}
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

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            {sectionHeader(Stethoscope, 'Doctor Orders / Instructions')}
            <div className="space-y-3">
              {doctorOrders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{order.patient}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${orderStatusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748B]">{order.order}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold text-[#64748B]">{order.doctor} • {order.time}</p>
                    {order.status !== 'Acknowledged' && (
                      <button
                        onClick={() => acknowledgeOrder(order.id)}
                        className="rounded-lg border border-[#0F766E] px-2.5 py-1 text-[10px] font-bold text-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={glassCard}>
            {sectionHeader(FlaskConical, 'Pending Tests')}
            <div className="space-y-3">
              {pendingTests.map((test) => (
                <div key={test.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{test.patient} — Room {test.room}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${testStatusStyles[test.status]}`}>
                      {test.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748B]">{test.test} • Ordered by {test.orderedBy}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold text-[#64748B]">ETA {test.eta}</p>
                    {test.status !== 'Completed' && (
                      <button
                        onClick={() => advanceTestStatus(test.id)}
                        className="rounded-lg border border-[#0F766E] px-2.5 py-1 text-[10px] font-bold text-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            {sectionHeader(BedDouble, 'Ward / Bed Status')}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {wardBeds.map((bed) => (
                <div key={bed.bed} className="rounded-2xl border border-slate-200 p-3 text-center">
                  <p className="text-sm font-bold">{bed.bed}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${bedStatusStyles[bed.status]}`}>
                    {bed.status}
                  </span>
                  {bed.patient && <p className="mt-1 truncate text-[10px] text-[#64748B]">{bed.patient}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className={glassCard}>
            {sectionHeader(ClipboardCheck, 'Shift Checklist', (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#64748B]">
                {checklist.filter((c) => c.done).length}/{checklist.length} done
              </span>
            ))}
            <div className="space-y-3">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left text-sm font-semibold transition-colors ${
                    item.done ? 'border-emerald-200 bg-emerald-50 text-emerald-600 line-through' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${item.done ? 'text-emerald-500' : 'text-slate-300'}`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={glassCard}>
            {sectionHeader(MessageSquare, 'Team Communication')}
            <div className="mb-3 max-h-64 space-y-3 overflow-y-auto pr-1">
              {teamMessages.map((msg) => (
                <div key={msg.id} className="rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#0F172A]">{msg.from}</p>
                    <p className="text-[10px] text-[#64748B]">{msg.time}</p>
                  </div>
                  <p className="mt-1 text-sm text-[#64748B]">{msg.message}</p>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a message to the care team..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d5f58]"
              >
                Send
              </button>
            </form>
          </div>

          <div className={glassCard}>
            {sectionHeader(CalendarClock, 'Shift Timeline')}
            <div className="space-y-4">
              {shiftTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`h-3 w-3 rounded-full ${item.done ? 'bg-[#0F766E]' : 'bg-slate-200'}`} />
                    {idx !== shiftTimeline.length - 1 && (
                      <span className={`w-px flex-1 ${item.done ? 'bg-[#0F766E]/40' : 'bg-slate-200'}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-xs font-bold ${item.done ? 'text-[#0F766E]' : 'text-[#64748B]'}`}>{item.time}</p>
                    <p className={`text-sm ${item.done ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={glassCard}>
          {sectionHeader(FileText, 'Shift Summary')}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-2xl font-black text-[#0F172A]">{patients.length + walkIns.length}</p>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Patients Managed</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-2xl font-black text-[#0F172A]">{medications.filter((m) => m.status === 'Given').length}/{medications.length}</p>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Medications Administered</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-2xl font-black text-[#0F172A]">{tasks.filter((t) => t.done).length}/{tasks.length}</p>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Tasks Completed</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-2xl font-black text-[#0F172A]">{callRequests.filter((r) => !r.active).length}/{callRequests.length}</p>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Call Requests Resolved</p>
            </div>
          </div>
        </div>

        <div className={glassCard}>
          {sectionHeader(BedDouble, 'Room & Doctor Assignment')}
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

      {vitalsModalPatientId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0F766E]" />
                <h2 className="text-lg font-bold">Record Vitals</h2>
              </div>
              <button onClick={closeVitalsModal} className="rounded-lg p-1 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submitVitals} className="grid gap-3 sm:grid-cols-2">
              <div className="text-xs font-semibold text-[#64748B]">
                <label className="mb-1 block">Temperature</label>
                <input
                  required
                  placeholder="e.g. 98.6°F"
                  value={vitalsForm.temp}
                  onChange={(e) => setVitalsForm((prev) => ({ ...prev, temp: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-[#0F172A]"
                />
              </div>
              <div className="text-xs font-semibold text-[#64748B]">
                <label className="mb-1 block">Blood Pressure</label>
                <input
                  required
                  placeholder="e.g. 120/80"
                  value={vitalsForm.bp}
                  onChange={(e) => setVitalsForm((prev) => ({ ...prev, bp: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-[#0F172A]"
                />
              </div>
              <div className="text-xs font-semibold text-[#64748B]">
                <label className="mb-1 block">Pulse</label>
                <input
                  required
                  placeholder="e.g. 78"
                  value={vitalsForm.pulse}
                  onChange={(e) => setVitalsForm((prev) => ({ ...prev, pulse: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-[#0F172A]"
                />
              </div>
              <div className="text-xs font-semibold text-[#64748B]">
                <label className="mb-1 block">Oxygen Saturation (SpO2)</label>
                <input
                  required
                  placeholder="e.g. 98%"
                  value={vitalsForm.spo2}
                  onChange={(e) => setVitalsForm((prev) => ({ ...prev, spo2: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-[#0F172A]"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 mt-1 rounded-xl bg-[#0F766E] py-2.5 text-sm font-bold text-white hover:bg-[#0d5f58]"
              >
                Save Vitals
              </button>
            </form>
          </div>
        </div>
      )}
      <AIWidget />
    </div>
  );
}
