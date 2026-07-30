import React, { useState, useEffect } from 'react';
import {
  Users, CheckSquare, Clock3, ClipboardList, LayoutGrid, ArrowLeft, Send,
  Activity, Bed, Calendar, BrainCircuit, Clock, Settings, MessageSquare, LogOut, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Imports from modular data & components
import { DOCTOR, PATIENTS, INITIAL_QUEUE, INITIAL_TASKS } from './data/doctorDemoData';
import { useWalkIns, updateWalkIn } from './data/hospitalStore';
import { useMessages, sendMessage, markAsRead } from './data/messageStore';
import DoctorTopbar from './components/DoctorTopbar';
import StatCard from './components/StatCard';
import NextPatientCard from './components/NextPatientCard';
import AIPatientBrief from './components/AIPatientBrief';
import PatientQueue from './components/PatientQueue';
import StatusBadge from './components/StatusBadge';
import PendingTasks from './components/PendingTasks';
import PatientSnapshot from './components/PatientSnapshot';
import MedicalTimeline from './components/MedicalTimeline';
import DocumentationAssistant from './components/DocumentationAssistant';
import PatientChat from './components/PatientChat';
import WorkloadCard from './components/WorkloadCard';
import WorkloadIndicator from './components/WorkloadIndicator';
import DoctorSchedule from './components/DoctorSchedule';
import QuickActions from './components/QuickActions';

import OperationTheaterView from './components/OperationTheaterView';
import AdmittedPatientsView from './components/AdmittedPatientsView';
import DoctorSettings from './components/DoctorSettings';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'ot-schedules', label: 'Operation Theater', icon: Activity },
  { id: 'admitted-patients', label: 'Admitted Patients & Beds', icon: Bed },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'outpatient-queue', label: 'Outpatient Queue', icon: Users },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'workload', label: 'Workload Intelligence', icon: BrainCircuit },
  { id: 'opd-schedule', label: 'OPD Schedule', icon: Clock },
  { id: 'chat', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function DoctorDashboard({ user, onLogout, onBackToLanding }) {
  const [activeNav, setActiveNav] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('rahul');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [queueFilter, setQueueFilter] = useState('all');
  const [queueStatuses, setQueueStatuses] = useState(
    Object.fromEntries(INITIAL_QUEUE.map((q) => [q.id, q.status]))
  );

  const WALKIN_STATUS_MAP = { Waiting: 'waiting', 'In Consultation': 'in-consultation', Completed: 'completed' };

  const walkIns = useWalkIns().filter((w) => w.assignedDoctor === DOCTOR.name);

  const walkInPatients = Object.fromEntries(
    walkIns.map((w) => [w.patientId, {
      id: w.patientId,
      name: w.name,
      initials: (w.name || '').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      age: w.age,
      gender: w.gender,
      bloodGroup: '-',
      conditions: [w.reason || 'Walk-in visit'],
      medications: [],
      allergies: 'Not recorded',
      lastVisit: 'First visit (Walk-In)',
      vitals: [],
      alert: { title: 'Walk-In Patient', description: w.reason || 'No reason provided' },
      timeline: [{ date: 'Today', title: 'Walk-In Registered', detail: w.reason || 'Walk-in visit' }]
    }])
  );

  const allPatients = { ...PATIENTS, ...walkInPatients };

  const walkInQueue = walkIns.map((w) => ({
    id: w.patientId,
    time: w.arrivalTime,
    patientId: w.patientId,
    visitType: 'Walk-In',
    status: WALKIN_STATUS_MAP[w.status] || 'waiting',
    priority: w.priority,
    reason: w.reason
  }));

  const combinedQueue = [...INITIAL_QUEUE, ...walkInQueue];

  const activeQueueItem = combinedQueue.find(
    (q) => (queueStatuses[q.id] || q.status) !== 'completed'
  );

  const nextPatient = activeQueueItem ? allPatients[activeQueueItem.patientId] : null;
  const isConsultationActive = activeQueueItem
    ? (queueStatuses[activeQueueItem.id] || activeQueueItem.status) === 'in-consultation'
    : false;

  const selectedPatient = allPatients[selectedPatientId] || PATIENTS.rahul;

  const completedQueueCount = Object.values(queueStatuses).filter((s) => s === 'completed').length
    + walkInQueue.filter((q) => q.status === 'completed').length;
  const pendingCount = tasks.filter((t) => !t.done).length;
  const waitingCount = Object.values(queueStatuses).filter((s) => s === 'waiting').length
    + walkInQueue.filter((q) => (queueStatuses[q.id] || q.status) === 'waiting').length;

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const markQueueDone = (queueId) => {
    setQueueStatuses((prev) => ({
      ...prev,
      [queueId]: 'completed',
    }));
    if (queueId.startsWith('P')) {
      updateWalkIn(queueId, { status: 'Completed' });
    }
  };

  const handleStartConsultation = () => {
    if (activeQueueItem) {
      setQueueStatuses((prev) => ({
        ...prev,
        [activeQueueItem.id]: 'in-consultation',
      }));
      setSelectedPatientId(activeQueueItem.patientId);
      if (activeQueueItem.id.startsWith('P')) {
        updateWalkIn(activeQueueItem.id, { status: 'In Consultation' });
      }
    }
  };

  const handleFinishConsultation = () => {
    if (activeQueueItem) {
      setQueueStatuses((prev) => ({
        ...prev,
        [activeQueueItem.id]: 'completed',
      }));
      if (activeQueueItem.id.startsWith('P')) {
        updateWalkIn(activeQueueItem.id, { status: 'Completed' });
      }
    }
  };

  const scrollToId = (id) => {
    setActiveNav('overview');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const stats = [
    { label: "TODAY'S PATIENTS", value: 14, icon: Users, color: '#0F766E', trend: 'On schedule' },
    { label: "COMPLETED", value: 6 + completedQueueCount, icon: CheckSquare, color: '#22C55E', trend: `${6 + completedQueueCount} / 14` },
    { label: "WAITING", value: waitingCount, icon: Clock3, color: '#F59E0B', trend: 'Avg 12m' },
    { label: "PENDING TASKS", value: pendingCount, icon: ClipboardList, color: '#EF4444', trend: 'Action needed' },
  ];

  return (
    <div className="min-h-screen w-full max-w-full bg-[#F0FDFA] relative selection:bg-[#14B8A6] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#0F766E]/25 via-[#14B8A6]/20 to-transparent blur-[120px]" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#38BDF8]/30 via-[#14B8A6]/20 to-transparent blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-[#14B8A6]/20 via-[#0F766E]/15 to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-full overflow-x-hidden">
        {/* NATIVE INTEGRATED SIDEBAR */}
        <InlineDoctorSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onBackToLanding={onBackToLanding}
        />

        <main className="flex-1 lg:ml-64 min-h-screen pb-12 w-full max-w-full min-w-0 overflow-x-hidden">
          <DoctorTopbar
            setDrawerOpen={setDrawerOpen}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            onBackToLanding={onBackToLanding}
            setActiveNav={setActiveNav}
          />

          <div className="px-3 sm:px-8 py-4 sm:py-6 w-full max-w-full min-w-0 overflow-x-hidden">
            {activeNav === 'ot-schedules' ? (
              <OperationTheaterView />
            ) : activeNav === 'admitted-patients' ? (
              <AdmittedPatientsView />
            ) : activeNav === 'settings' ? (
              <DoctorSettings onLogout={onLogout} />
            ) : activeNav === 'chat' ? (
              <DedicatedChatView selectedPatient={selectedPatient} />
            ) : activeNav === 'appointments' ? (
              <AppointmentsView
                queue={INITIAL_QUEUE}
                patients={PATIENTS}
                onViewPatient={(id) => {
                  setSelectedPatientId(id);
                  scrollToId('snapshot');
                }}
              />
            ) : activeNav === 'outpatient-queue' ? (
              <div className="max-w-4xl mx-auto">
                <PatientQueue
                  queue={combinedQueue}
                  patients={allPatients}
                  queueStatuses={queueStatuses}
                  selectedPatientId={selectedPatientId}
                  onSelectPatient={setSelectedPatientId}
                  queueFilter={queueFilter}
                  setQueueFilter={setQueueFilter}
                  onMarkDone={markQueueDone}
                />
              </div>
            ) : activeNav === 'tasks' ? (
              <div className="max-w-2xl mx-auto">
                <PendingTasks tasks={tasks} onToggleTask={toggleTask} />
              </div>
            ) : activeNav === 'workload' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
                <WorkloadCard pendingCount={pendingCount} />
                <WorkloadIndicator />
              </div>
            ) : activeNav === 'opd-schedule' ? (
              <div className="max-w-3xl mx-auto">
                <DoctorSchedule walkIns={walkIns} />
              </div>
            ) : activeNav !== 'overview' ? (
              <PlaceholderView
                navId={activeNav}
                onBack={() => setActiveNav('overview')}
              />
            ) : (
              <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-full min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {stats.map((s, idx) => (
                    <StatCard key={s.label} {...s} delay={idx * 0.05} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full min-w-0">
                  <div id="next-patient" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <NextPatientCard
                      nextPatient={nextPatient}
                      queueItem={activeQueueItem}
                      onViewPatient={() => {
                        if (nextPatient) {
                          setSelectedPatientId(nextPatient.id);
                          scrollToId('snapshot');
                        }
                      }}
                      consultationStarted={isConsultationActive}
                      onStartConsultation={handleStartConsultation}
                      onFinishConsultation={handleFinishConsultation}
                    />
                  </div>

                  <div id="ai-brief" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <AIPatientBrief />
                  </div>

                  <div className="lg:col-span-6 min-w-0">
                    <div 
                      onClick={() => setActiveNav('ot-schedules')}
                      className="p-5 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all border border-teal-800/80 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Surgical Suite Telemetry</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          1 OT Vacant
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                        Operation Theater (OT) Schedules →
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        View live OT occupancy, vacant slots, and surgery allocations for surgical specialists.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 min-w-0">
                    <div 
                      onClick={() => setActiveNav('admitted-patients')}
                      className="p-5 rounded-3xl bg-white border border-teal-200/80 shadow-md cursor-pointer hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Inpatient Beds</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          2 Critical ICU
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                        Admitted Patients & Bed Telemetry →
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Monitor patient bed numbers, assigned wards, vitals telemetry, and clinical condition status.
                      </p>
                    </div>
                  </div>

                  <div id="queue" className="lg:col-span-7 scroll-mt-24 min-w-0">
                    <PatientQueue
                      queue={combinedQueue}
                      patients={allPatients}
                      queueStatuses={queueStatuses}
                      selectedPatientId={selectedPatientId}
                      onSelectPatient={setSelectedPatientId}
                      queueFilter={queueFilter}
                      setQueueFilter={setQueueFilter}
                      onMarkDone={markQueueDone}
                    />
                  </div>

                  <div id="tasks" className="lg:col-span-5 scroll-mt-24 min-w-0">
                    <PendingTasks tasks={tasks} onToggleTask={toggleTask} />
                  </div>

                  <div id="snapshot" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <PatientSnapshot patient={selectedPatient} />
                  </div>

                  <div id="timeline" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <MedicalTimeline
                      timeline={selectedPatient.timeline}
                      patientName={selectedPatient.name}
                    />
                  </div>

                  <div id="doc-assistant" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <DocumentationAssistant />
                  </div>

                  <div id="patient-chat" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <PatientChat selectedPatient={selectedPatient} />
                  </div>

                  <div id="workload" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <WorkloadCard pendingCount={pendingCount} />
                  </div>

                  <div id="burnout" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <WorkloadIndicator />
                  </div>

                  <div id="schedule" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <DoctorSchedule />
                  </div>

                  <div id="quick-actions" className="lg:col-span-12 scroll-mt-24 min-w-0">
                    <QuickActions onActionClick={scrollToId} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================================
   INLINE SIDEBAR COMPONENT (Guarantees the Chat button always renders)
   ========================================================================= */
function InlineDoctorSidebar({ activeNav, setActiveNav, drawerOpen, setDrawerOpen, onBackToLanding }) {
  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-teal-100 shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Activity size={18} strokeWidth={3} />
            </div>
            <div className="min-w-0">
              <p className="text-teal-900 font-black text-sm leading-tight tracking-tight truncate">Aarogya Multispeciality Hospital</p>
              <p className="text-[10px] font-semibold text-slate-400 leading-tight">Powered by CareSync</p>
            </div>
          </div>
          <button 
            onClick={() => setDrawerOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => { 
                  setActiveNav(item.id); 
                  setDrawerOpen(false); 
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group ${
                  isActive 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25' 
                    : 'text-slate-500 hover:bg-teal-50 hover:text-teal-800'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'} transition-colors`} 
                />
                {item.label}
                {item.badge && (
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-black ${
                    isActive 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button 
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-95"
          >
            <LogOut size={16} />
            Exit Portal
          </button>
        </div>
      </motion.aside>
    </>
  );
}

/* =========================================================================
   DEDICATED CHAT VIEW WITH LOCALSTORAGE SYNC
   ========================================================================= */
function DedicatedChatView({ selectedPatient }) {
  const CONVERSATION_ID = 'P001-D001';
  const DOCTOR_ID = 'D001';
  const PATIENT_ID = 'P001';

  const messages = useMessages(CONVERSATION_ID);
  const [input, setInput] = useState('');

  useEffect(() => {
    markAsRead(CONVERSATION_ID, DOCTOR_ID);
  }, [messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({
      conversationId: CONVERSATION_ID,
      senderId: DOCTOR_ID,
      senderRole: 'doctor',
      receiverId: PATIENT_ID,
      text: input.trim()
    });
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg border border-teal-100 flex flex-col h-[75vh] w-full max-w-4xl mx-auto overflow-hidden"
    >
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 p-5 text-white flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Secure Messages</h2>
          <p className="text-xs text-teal-200 mt-1">Currently chatting with: {selectedPatient?.name || 'Ravi Mehta'}</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-slate-50 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col max-w-[70%] ${msg.senderRole === 'doctor' ? 'self-end' : 'self-start'}`}>
            <div className={`p-3 rounded-2xl text-sm shadow-sm break-words ${
              msg.senderRole === 'doctor'
                ? 'bg-teal-600 text-white rounded-br-none'
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
            <span className={`text-[10px] text-slate-400 mt-1 font-semibold ${msg.senderRole === 'doctor' ? 'text-right' : 'text-left'}`}>
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message to the patient..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <button
          onClick={handleSend}
          className="w-12 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-md"
        >
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  );
}

function AppointmentsView({ queue, patients, onViewPatient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl p-5 sm:p-7 max-w-4xl mx-auto bg-white/90 backdrop-blur-2xl border border-white shadow-xl"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E] shadow-inner">
          <Calendar size={18} />
        </div>
        <div>
          <h2 className="text-xs font-black tracking-widest text-[#0F172A] uppercase">TODAY'S APPOINTMENTS</h2>
          <p className="text-[10px] font-bold text-[#64748B]">Scheduled online consultations</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {queue.map((q) => {
          const p = patients[q.patientId];
          if (!p) return null;
          return (
            <div
              key={q.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#0F766E]/30 hover:bg-[#F0FDFA] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-black text-[#0F172A] w-16 flex-shrink-0">{q.time}</span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-[#0F172A] truncate">{p.name}</p>
                  <p className="text-[11px] font-semibold text-[#64748B] truncate">
                    {q.visitType} • {p.age}y {p.gender} • Online Appointment
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={q.status} />
                <button
                  onClick={() => onViewPatient(q.patientId)}
                  className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-[#0F766E] text-white hover:bg-[#0d5f58] transition-all active:scale-95"
                >
                  View Patient
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function PlaceholderView({ navId, onBack }) {
  const item = NAV_ITEMS.find((n) => n.id === navId) || { label: "Module View", icon: LayoutGrid };
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel-accent rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center min-h-[50vh] max-w-2xl mx-auto my-6 shadow-2xl w-full"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mb-4 shadow-inner border border-[#0F766E]/20">
        <Icon size={26} />
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">{item.label} Module</h2>
      <p className="text-xs sm:text-sm font-semibold text-[#64748B] mt-2 max-w-md leading-relaxed">
        This clinical section is integrated with Aarogya Multispeciality Hospital's doctor portal. Explore live telemetry on the <strong>Overview</strong> page.
      </p>

      <button
        onClick={onBack}
        className="mt-6 px-5 py-2.5 rounded-2xl text-xs font-black bg-[#0F766E] text-white shadow-lg shadow-[#0F766E]/25 hover:bg-[#0B5C56] transition-all flex items-center gap-2 active:scale-95"
      >
        <ArrowLeft size={16} /> Return to Dashboard Overview
      </button>
    </motion.div>
  );
}