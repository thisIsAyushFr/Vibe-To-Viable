import React, { useState } from 'react';
import {
  Users, CheckSquare, Clock3, ClipboardList, LayoutGrid, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

// Imports from modular data & components
import { DOCTOR, PATIENTS, INITIAL_QUEUE, INITIAL_TASKS } from './data/doctorDemoData';
import DoctorSidebar, { NAV_ITEMS } from './components/DoctorSidebar';
import DoctorTopbar from './components/DoctorTopbar';
import StatCard from './components/StatCard';
import NextPatientCard from './components/NextPatientCard';
import AIPatientBrief from './components/AIPatientBrief';
import PatientQueue from './components/PatientQueue';
import PendingTasks from './components/PendingTasks';
import PatientSnapshot from './components/PatientSnapshot';
import MedicalTimeline from './components/MedicalTimeline';
import DocumentationAssistant from './components/DocumentationAssistant';
import WorkloadCard from './components/WorkloadCard';
import WorkloadIndicator from './components/WorkloadIndicator';
import DoctorSchedule from './components/DoctorSchedule';
import QuickActions from './components/QuickActions';

import OperationTheaterView from './components/OperationTheaterView';
import AdmittedPatientsView from './components/AdmittedPatientsView';
import DoctorSettings from './components/DoctorSettings';

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

  // Dynamic Next Patient Promotion Logic
  const activeQueueItem = INITIAL_QUEUE.find(
    (q) => (queueStatuses[q.id] || q.status) !== 'completed'
  );

  const nextPatient = activeQueueItem ? PATIENTS[activeQueueItem.patientId] : null;
  const isConsultationActive = activeQueueItem
    ? (queueStatuses[activeQueueItem.id] || activeQueueItem.status) === 'in-consultation'
    : false;

  const selectedPatient = PATIENTS[selectedPatientId] || PATIENTS.rahul;

  // Dynamic Metrics
  const completedQueueCount = Object.values(queueStatuses).filter((s) => s === 'completed').length;
  const pendingCount = tasks.filter((t) => !t.done).length;
  const waitingCount = Object.values(queueStatuses).filter((s) => s === 'waiting').length;

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
  };

  const handleStartConsultation = () => {
    if (activeQueueItem) {
      setQueueStatuses((prev) => ({
        ...prev,
        [activeQueueItem.id]: 'in-consultation',
      }));
      setSelectedPatientId(activeQueueItem.patientId);
    }
  };

  const handleFinishConsultation = () => {
    if (activeQueueItem) {
      setQueueStatuses((prev) => ({
        ...prev,
        [activeQueueItem.id]: 'completed',
      }));
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
      {/* 🌟 VIBRANT AURORA GLASSMORPHISM BACKDROP MESH 🌟 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating Teal Aurora Orb */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#0F766E]/25 via-[#14B8A6]/20 to-transparent blur-[120px] aurora-orb-1" />
        
        {/* Floating Sky Blue & Cyan Aurora Orb */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#38BDF8]/30 via-[#14B8A6]/20 to-transparent blur-[130px] aurora-orb-2" />
        
        {/* Bottom Emerald Aurora Glow */}
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-[#14B8A6]/20 via-[#0F766E]/15 to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-full overflow-x-hidden">
        {/* SIDEBAR */}
        <DoctorSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onBackToLanding={onBackToLanding}
        />

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 lg:ml-64 min-h-screen pb-12 w-full max-w-full min-w-0 overflow-x-hidden">
          {/* TOPBAR */}
          <DoctorTopbar
            setDrawerOpen={setDrawerOpen}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            onBackToLanding={onBackToLanding}
          />

          {/* PAGE CONTENT */}
          <div className="px-3 sm:px-8 py-4 sm:py-6 w-full max-w-full min-w-0 overflow-x-hidden">
            {activeNav === 'ot-schedules' ? (
              <OperationTheaterView />
            ) : activeNav === 'admitted-patients' ? (
              <AdmittedPatientsView />
            ) : activeNav === 'settings' ? (
              <DoctorSettings onLogout={onLogout} />
            ) : activeNav !== 'overview' ? (
              <PlaceholderView
                navId={activeNav}
                onBack={() => setActiveNav('overview')}
              />
            ) : (
              <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-full min-w-0">
                {/* 1. TOP SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {stats.map((s, idx) => (
                    <StatCard
                      key={s.label}
                      label={s.label}
                      value={s.value}
                      icon={s.icon}
                      color={s.color}
                      trend={s.trend}
                      delay={idx * 0.05}
                    />
                  ))}
                </div>

                {/* 2. BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full min-w-0">
                  {/* NEXT PATIENT CARD (Priority 1) */}
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

                  {/* AI PATIENT BRIEF CARD (Priority 2) */}
                  <div id="ai-brief" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <AIPatientBrief />
                  </div>

                  {/* OPERATION THEATER QUICK ACCESS (Bento Widget) */}
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

                  {/* ADMITTED PATIENTS QUICK ACCESS (Bento Widget) */}
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

                  {/* TODAY'S PATIENT QUEUE (Priority 3) */}
                  <div id="queue" className="lg:col-span-7 scroll-mt-24 min-w-0">
                    <PatientQueue
                      queue={INITIAL_QUEUE}
                      queueStatuses={queueStatuses}
                      selectedPatientId={selectedPatientId}
                      onSelectPatient={(id) => {
                        setSelectedPatientId(id);
                      }}
                      queueFilter={queueFilter}
                      setQueueFilter={setQueueFilter}
                      onMarkDone={markQueueDone}
                    />
                  </div>

                  {/* PENDING TASKS (Priority 4) */}
                  <div id="tasks" className="lg:col-span-5 scroll-mt-24 min-w-0">
                    <PendingTasks
                      tasks={tasks}
                      onToggleTask={toggleTask}
                    />
                  </div>

                  {/* PATIENT SNAPSHOT (Priority 5a) */}
                  <div id="snapshot" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <PatientSnapshot patient={selectedPatient} />
                  </div>

                  {/* MEDICAL TIMELINE (Priority 5b) */}
                  <div id="timeline" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <MedicalTimeline
                      timeline={selectedPatient.timeline}
                      patientName={selectedPatient.name}
                    />
                  </div>

                  {/* DOCUMENTATION ASSISTANT (Priority 6) */}
                  <div id="doc-assistant" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <DocumentationAssistant />
                  </div>

                  {/* WORKLOAD INTELLIGENCE (Priority 7a) */}
                  <div id="workload" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <WorkloadCard pendingCount={pendingCount} />
                  </div>

                  {/* BURNOUT RISK INDICATOR (Priority 7b) */}
                  <div id="burnout" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <WorkloadIndicator />
                  </div>

                  {/* TODAY'S SCHEDULE (Priority 8a) */}
                  <div id="schedule" className="lg:col-span-6 scroll-mt-24 min-w-0">
                    <DoctorSchedule />
                  </div>

                  {/* QUICK ACTIONS (Priority 8b) */}
                  <div id="quick-actions" className="lg:col-span-12 scroll-mt-24 min-w-0">
                    <QuickActions onActionClick={(id) => scrollToId(id)} />
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

/* DEMO PLACEHOLDER VIEW FOR OTHER SIDEBAR NAV ITEMS */
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
