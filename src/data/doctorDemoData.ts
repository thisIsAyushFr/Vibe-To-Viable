export interface PatientTimelineEvent {
  date: string;
  title: string;
  detail: string;
}

export interface VitalItem {
  label: string;
  value: string;
  unit: string;
  warning?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  bloodGroup: string;
  conditions: string[];
  medications: string[];
  allergies: string;
  lastVisit: string;
  vitals: VitalItem[];
  alert: {
    title: string;
    description: string;
  };
  timeline: PatientTimelineEvent[];
}

export interface QueueItem {
  id: string;
  time: string;
  patientId: string;
  visitType: string;
  status: 'waiting' | 'checked-in' | 'scheduled' | 'completed' | 'in-consultation';
  waitMin?: number;
}

export interface TaskItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  subtitle: string;
  done: boolean;
}

export interface ScheduleItem {
  time: string;
  type: 'consultation' | 'break' | 'available' | 'patient';
  label: string;
}

export const DOCTOR = {
  name: "Dr. Arjun Sharma",
  role: "Cardiologist",
  department: "Cardiology",
  hospital: "Aarogya Multispeciality Hospital",
  platform: "Aarogya Hospital Portal",
  initials: "AS",
};

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "ot-schedules", label: "Operation Theater (OT)" },
  { id: "admitted-patients", label: "Admitted Patients & Beds" },
  { id: "appointments", label: "Appointments" },
  { id: "patients", label: "Outpatients Queue" },
  { id: "ai", label: "AI Clinical Brief" },
  { id: "tasks", label: "Pending Tasks" },
  { id: "workload", label: "Workload Intelligence" },
  { id: "schedule", label: "My OPD Schedule" },
];

export interface OperationTheater {
  id: string;
  name: string;
  department: string;
  status: 'occupied' | 'vacant' | 'cleaning' | 'standby';
  currentSurgeon?: string;
  procedure?: string;
  patientName?: string;
  timeSlot?: string;
  nextAvailableSlot: string;
  isOtRequiredDept: boolean;
}

export interface ScheduledSurgery {
  id: string;
  otId: string;
  otName: string;
  patientName: string;
  patientAge: number;
  surgeonName: string;
  degree: string;
  department: string;
  procedure: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'In-Progress' | 'Completed' | 'Pre-Op Preparation';
  requiresOt: boolean;
}

export interface AdmittedPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bedNumber: string;
  ward: string;
  department: string;
  condition: 'Critical' | 'Post-Op Recovery' | 'Under Observation' | 'Stable & Improving';
  conditionDetails: string;
  attendingDoctor: string;
  admissionDate: string;
  vitals: {
    bp: string;
    hr: string;
    spo2: string;
    temp: string;
  };
}

export const OPERATION_THEATERS: OperationTheater[] = [
  {
    id: 'ot-1',
    name: 'OT 1 — Cardiac & Cardio-Thoracic Suite',
    department: 'Cardiology',
    status: 'occupied',
    currentSurgeon: 'Dr. Arjun Sharma (MBBS, MD, DM)',
    procedure: 'Coronary Angioplasty (PTCA)',
    patientName: 'Karan Malhotra (52M)',
    timeSlot: '09:00 AM – 01:00 PM',
    nextAvailableSlot: '02:00 PM Today',
    isOtRequiredDept: true
  },
  {
    id: 'ot-2',
    name: 'OT 2 — Orthopedics & Joint Surgery',
    department: 'Orthopedics',
    status: 'occupied',
    currentSurgeon: 'Dr. Vikram Patel (MBBS, MS, M.Ch)',
    procedure: 'Robotic Total Knee Replacement',
    patientName: 'Sunita Agarwal (61F)',
    timeSlot: '10:30 AM – 02:00 PM',
    nextAvailableSlot: '03:00 PM Today',
    isOtRequiredDept: true
  },
  {
    id: 'ot-3',
    name: 'OT 3 — Neurosurgery & Brain Suite',
    department: 'Neurology',
    status: 'vacant',
    nextAvailableSlot: 'Available Now (Full Slot Open)',
    isOtRequiredDept: true
  },
  {
    id: 'ot-4',
    name: 'OT 4 — Emergency Level-1 Trauma Suite',
    department: 'Emergency Medicine',
    status: 'standby',
    currentSurgeon: 'Dr. Priya Nair (On-Call Specialist)',
    nextAvailableSlot: 'Reserved 24×7 for Critical Emergency Trauma',
    isOtRequiredDept: true
  }
];

export const SCHEDULED_SURGERIES: ScheduledSurgery[] = [
  {
    id: 'surg-1',
    otId: 'ot-1',
    otName: 'OT 1 — Cardiac Suite',
    patientName: 'Karan Malhotra',
    patientAge: 52,
    surgeonName: 'Dr. Arjun Sharma',
    degree: 'MBBS, MD (Med), DM (Cardiology)',
    department: 'Cardiology',
    procedure: 'Coronary Angioplasty (PTCA)',
    date: 'Today',
    time: '09:00 AM - 01:00 PM',
    status: 'In-Progress',
    requiresOt: true
  },
  {
    id: 'surg-2',
    otId: 'ot-2',
    otName: 'OT 2 — Orthopedics Suite',
    patientName: 'Sunita Agarwal',
    patientAge: 61,
    surgeonName: 'Dr. Vikram Patel',
    degree: 'MBBS, MS (Ortho), M.Ch (Joint Repl)',
    department: 'Orthopedics',
    procedure: 'Robotic Total Knee Replacement',
    date: 'Today',
    time: '10:30 AM - 02:00 PM',
    status: 'Pre-Op Preparation',
    requiresOt: true
  },
  {
    id: 'surg-3',
    otId: 'ot-3',
    otName: 'OT 3 — Neuro Suite',
    patientName: 'Ramesh Chawla',
    patientAge: 58,
    surgeonName: 'Dr. Ananya Rao',
    degree: 'MBBS, MD, DM (Neurology)',
    department: 'Neurology',
    procedure: 'Decompressive Craniotomy',
    date: 'Today',
    time: '02:30 PM - 05:30 PM',
    status: 'Scheduled',
    requiresOt: true
  },
  {
    id: 'surg-4',
    otId: 'ot-1',
    otName: 'OT 1 — Cardiac Suite',
    patientName: 'Rajendra Prasad',
    patientAge: 64,
    surgeonName: 'Dr. Arjun Sharma',
    degree: 'MBBS, MD, DM (Cardiology)',
    department: 'Cardiology',
    procedure: 'Dual Chamber Pacemaker Implantation',
    date: 'Tomorrow',
    time: '10:00 AM - 12:30 PM',
    status: 'Scheduled',
    requiresOt: true
  }
];

export const ADMITTED_PATIENTS: AdmittedPatient[] = [
  {
    id: 'adm-1',
    name: 'Harish Chandra',
    age: 63,
    gender: 'Male',
    bedNumber: 'ICU-Bed 04',
    ward: 'Intensive Care Unit (ICU)',
    department: 'Cardiology',
    condition: 'Critical',
    conditionDetails: 'Post-Myocardial Infarction. Inotropic & continuous SpO2/BP monitoring.',
    attendingDoctor: 'Dr. Arjun Sharma (Cardiologist)',
    admissionDate: '27 Jul 2026',
    vitals: { bp: '142/90', hr: '94 bpm', spo2: '94%', temp: '98.8°F' }
  },
  {
    id: 'adm-2',
    name: 'Sunita Agarwal',
    age: 61,
    gender: 'Female',
    bedNumber: 'Surgical Bed 204',
    ward: 'Surgical Recovery Ward',
    department: 'Orthopedics',
    condition: 'Post-Op Recovery',
    conditionDetails: 'Day 1 Post-Op Knee Arthroplasty. Pain managed via IV protocol.',
    attendingDoctor: 'Dr. Vikram Patel (Orthopedic Surgeon)',
    admissionDate: '28 Jul 2026',
    vitals: { bp: '124/80', hr: '76 bpm', spo2: '98%', temp: '98.4°F' }
  },
  {
    id: 'adm-3',
    name: 'Rajesh Singhania',
    age: 55,
    gender: 'Male',
    bedNumber: 'CCU-Bed 08',
    ward: 'Cardiac Care Unit (CCU)',
    department: 'Cardiology',
    condition: 'Under Observation',
    conditionDetails: 'Acute Unstable Angina. Continuous ECG Telemetry active.',
    attendingDoctor: 'Dr. Arjun Sharma (Cardiologist)',
    admissionDate: '28 Jul 2026',
    vitals: { bp: '136/86', hr: '82 bpm', spo2: '97%', temp: '98.6°F' }
  },
  {
    id: 'adm-4',
    name: 'Meenakshi Sundaram',
    age: 49,
    gender: 'Female',
    bedNumber: 'Deluxe Room 302',
    ward: 'Neurology Special Ward',
    department: 'Neurology',
    condition: 'Stable & Improving',
    conditionDetails: 'Ischemic stroke recovery. Physical rehabilitation ongoing.',
    attendingDoctor: 'Dr. Ananya Rao (Senior Neurologist)',
    admissionDate: '25 Jul 2026',
    vitals: { bp: '120/78', hr: '70 bpm', spo2: '99%', temp: '98.2°F' }
  },
  {
    id: 'adm-5',
    name: 'Vikramjit Singh',
    age: 38,
    gender: 'Male',
    bedNumber: 'Trauma Bed 12',
    ward: 'Emergency HDU',
    department: 'Emergency Medicine',
    condition: 'Critical',
    conditionDetails: 'Polytrauma post Road Accident. Abdominal observation in progress.',
    attendingDoctor: 'Dr. Priya Nair (Emergency Specialist)',
    admissionDate: '29 Jul 2026',
    vitals: { bp: '108/68', hr: '110 bpm', spo2: '95%', temp: '99.1°F' }
  }
];

export const PATIENTS: Record<string, Patient> = {
  rahul: {
    id: "rahul",
    name: "Rahul Verma",
    initials: "RV",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Amlodipine 5mg", "Metformin 500mg"],
    allergies: "None reported",
    lastVisit: "12 Jul 2026",
    vitals: [
      { label: 'BP', value: '148/92', unit: 'mmHg', warning: true },
      { label: 'Pulse', value: '78', unit: 'bpm', warning: false },
      { label: 'Temp', value: '98.6', unit: '°F', warning: false },
      { label: 'SpO2', value: '98', unit: '%', warning: false },
    ],
    alert: {
      title: "CRITICAL CLINICAL ALERT",
      description: "Hypertension & Type 2 Diabetes — BP elevated (148/92 mmHg) on last 2 visits."
    },
    timeline: [
      { date: "JUL 2026", title: "Follow-up Consultation", detail: "Blood pressure elevated (148/92 mmHg)" },
      { date: "JUN 2026", title: "Blood Test", detail: "HbA1c: 7.4% (above target)" },
      { date: "APR 2026", title: "Medication Updated", detail: "Amlodipine dosage adjusted to 5mg" },
      { date: "JAN 2026", title: "Routine Consultation", detail: "BP 132/84 mmHg, stable control" },
    ],
  },
  priya: {
    id: "priya",
    name: "Priya Mehta",
    initials: "PM",
    age: 32,
    gender: "Female",
    bloodGroup: "O+",
    conditions: ["Migraine"],
    medications: ["Propranolol 10mg"],
    allergies: "Penicillin",
    lastVisit: "02 Jul 2026",
    vitals: [
      { label: 'BP', value: '118/76', unit: 'mmHg', warning: false },
      { label: 'Pulse', value: '72', unit: 'bpm', warning: false },
      { label: 'Temp', value: '98.4', unit: '°F', warning: false },
      { label: 'SpO2', value: '99', unit: '%', warning: false },
    ],
    alert: {
      title: "ALLERGY WARNING & SYMPTOM ALERT",
      description: "Severe Penicillin allergy flagged. Patient reports recurring headaches 3x/week."
    },
    timeline: [
      { date: "JUL 2026", title: "New Consultation", detail: "Reported recurring migraines (3x/week)" },
      { date: "MAY 2026", title: "Blood Test", detail: "CBC within normal reference range" },
    ],
  },
  aman: {
    id: "aman",
    name: "Aman Gupta",
    initials: "AG",
    age: 58,
    gender: "Male",
    bloodGroup: "A+",
    conditions: ["Coronary Artery Disease"],
    medications: ["Atorvastatin 20mg", "Aspirin 75mg"],
    allergies: "None reported",
    lastVisit: "20 Jun 2026",
    vitals: [
      { label: 'BP', value: '130/84', unit: 'mmHg', warning: false },
      { label: 'Pulse', value: '68', unit: 'bpm', warning: false },
      { label: 'Temp', value: '98.6', unit: '°F', warning: false },
      { label: 'SpO2', value: '97', unit: '%', warning: false },
    ],
    alert: {
      title: "CARDIOLOGY MONITORING",
      description: "Mild coronary artery disease — LDL 95 mg/dL. Review lipid panel and ECG."
    },
    timeline: [
      { date: "JUN 2026", title: "Report Review", detail: "Lipid profile improving: LDL 95 mg/dL" },
      { date: "MAR 2026", title: "Angiogram", detail: "Mild coronary blockage, conservatively monitored" },
    ],
  },
  neha: {
    id: "neha",
    name: "Neha Singh",
    initials: "NS",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    conditions: ["Hypothyroidism"],
    medications: ["Levothyroxine 50mcg"],
    allergies: "None reported",
    lastVisit: "15 Jul 2026",
    vitals: [
      { label: 'BP', value: '112/74', unit: 'mmHg', warning: false },
      { label: 'Pulse', value: '74', unit: 'bpm', warning: false },
      { label: 'Temp', value: '98.2', unit: '°F', warning: false },
      { label: 'SpO2', value: '99', unit: '%', warning: false },
    ],
    alert: {
      title: "ENDOCRINE MONITORING",
      description: "TSH levels stabilizing at 2.8 mIU/L on Levothyroxine 50mcg daily."
    },
    timeline: [
      { date: "JUL 2026", title: "Follow-up Consultation", detail: "TSH levels stabilizing (2.8 mIU/L)" },
    ],
  },
};

export const INITIAL_QUEUE: QueueItem[] = [
  { id: "q1", time: "10:30 AM", patientId: "rahul", visitType: "Follow-up Consultation", status: "waiting", waitMin: 12 },
  { id: "q2", time: "10:45 AM", patientId: "priya", visitType: "New Consultation", status: "checked-in" },
  { id: "q3", time: "11:15 AM", patientId: "aman", visitType: "Report Review", status: "scheduled" },
  { id: "q4", time: "11:45 AM", patientId: "neha", visitType: "Follow-up", status: "scheduled" },
];

export const INITIAL_TASKS: TaskItem[] = [
  { id: "t1", priority: "high", title: "Review Rahul Verma's blood report", subtitle: "Due before 10:30 AM", done: false },
  { id: "t2", priority: "medium", title: "Complete consultation notes", subtitle: "Priya Shah", done: false },
  { id: "t3", priority: "medium", title: "Review discharge summary", subtitle: "Amit Kumar", done: false },
  { id: "t4", priority: "low", title: "Approve follow-up request", subtitle: "Neha Singh", done: false },
  { id: "t5", priority: "low", title: "Sign lab requisition", subtitle: "Aman Gupta", done: false },
];

export const SCHEDULE: ScheduleItem[] = [
  { time: "09:00", type: "consultation", label: "Consultation" },
  { time: "09:30", type: "consultation", label: "Consultation" },
  { time: "10:00", type: "break", label: "Break" },
  { time: "10:30", type: "patient", label: "Rahul Verma" },
  { time: "10:45", type: "patient", label: "Priya Mehta" },
  { time: "11:15", type: "patient", label: "Aman Gupta" },
  { time: "12:30", type: "break", label: "Lunch" },
  { time: "13:30", type: "consultation", label: "Consultations" },
  { time: "14:30", type: "available", label: "Available" },
];

export const AI_BRIEF = {
  summary:
    "45-year-old patient returning for hypertension follow-up. BP was elevated during the previous visit. Currently taking Amlodipine. Recent HbA1c was above target.",
  keyInfo: [
    "Hypertension — diagnosed 2019",
    "Type 2 Diabetes — diagnosed 2021",
    "Current medication: Amlodipine 5mg",
    "Last BP: 148/92 mmHg",
    "Recent HbA1c: 7.4%",
  ],
  attention: "Blood pressure remained elevated during the previous visit.",
};

export const DOC_OUTPUTS: Record<string, { label: string; text: string }> = {
  soap: {
    label: "SOAP Note",
    text: "S: Patient reports occasional headaches, no chest pain, palpitations, or shortness of breath.\nO: BP 148/92 mmHg, HR 78 bpm, BMI 27.2. Lungs clear.\nA: 1. Essential Hypertension — suboptimally controlled.\n   2. Type 2 Diabetes Mellitus — HbA1c 7.4%.\nP: Continue Amlodipine 5mg OD. Advise low sodium diet and 30 min daily walking. Recheck BP in 2 weeks.",
  },
  summary: {
    label: "Consultation Summary",
    text: "Follow-up visit for hypertension and type 2 diabetes. BP remains elevated at 148/92 mmHg. Patient adherent to Amlodipine 5mg daily. Reinforced dietary sodium reduction and regular exercise. Scheduled follow-up BP check in 2 weeks.",
  },
  followup: {
    label: "Follow-up Note",
    text: "Follow-up appointment scheduled in 2 weeks to assess blood pressure response. Patient advised to monitor home BP readings daily and report any severe headache, dizziness, or chest discomfort immediately.",
  },
};

export const NOTIFICATIONS = [
  { id: 1, text: "Rahul Verma has checked in and is waiting in Room 3.", time: "2 min ago", type: "alert" },
  { id: 2, text: "Lab report (Lipid Panel) ready for Aman Gupta.", time: "18 min ago", type: "info" },
  { id: 3, text: "Priya Shah's discharge summary requires electronic signature.", time: "1 hr ago", type: "task" },
];
