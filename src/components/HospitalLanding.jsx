import React, { useState } from 'react';
import { 
  Heart, 
  Stethoscope, 
  ShieldCheck, 
  Clock, 
  Users, 
  Building2, 
  Sparkles, 
  PhoneCall, 
  ChevronRight, 
  Award, 
  Activity, 
  Calendar, 
  FileText, 
  Brain, 
  Microscope, 
  Syringe, 
  ShieldAlert, 
  UserCheck, 
  ArrowRight, 
  Check, 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  Lock, 
  Menu, 
  X,
  Zap,
  Globe,
  TrendingUp,
  Cpu,
  User,
  LogOut,
  Send,
  Bot
} from 'lucide-react';

import AppointmentModal from './AppointmentModal';
import LoginModal from './LoginModal';
import DoctorProfileModal from './DoctorProfileModal';

// Static Data
const DEPARTMENTS = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: Heart,
    description: 'Comprehensive heart care, interventional cardiology, angioplasty, and cardiac rehabilitation.',
    patientCount: '12,500+ Patients Treated'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: Brain,
    description: 'Advanced stroke management, brain surgery, epilepsy care, and neurological diagnostics.',
    patientCount: '8,400+ Patients Treated'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: Activity,
    description: 'Joint replacement, spine surgery, sports injury management, and trauma care.',
    patientCount: '15,200+ Surgeries'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: Sparkles,
    description: 'Neonatal intensive care (NICU), pediatric surgery, growth monitoring, and vaccinations.',
    patientCount: '18,000+ Children Cared'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: Microscope,
    description: 'Advanced clinical dermatology, laser treatments, cosmetic skincare, and allergy therapy.',
    patientCount: '9,600+ Consultations'
  },
  {
    id: 'emergency',
    name: 'Emergency Medicine',
    icon: ShieldAlert,
    description: '24×7 Level-1 trauma center, cardiac emergency units, and critical resuscitation.',
    patientCount: '24/7 Immediate Response'
  }
];

const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Arjun Sharma',
    degree: 'MBBS, MD (Med), DM (Cardiology), FACC',
    specialty: 'Senior Cardiologist',
    specialization: 'Interventional Cardiology, Coronary Angioplasty & Heart Failure',
    department: 'Cardiology',
    experience: '12 Years',
    availability: 'Mon – Sat (10:00 AM - 04:00 PM)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Arjun Sharma is a renowned Senior Cardiologist with over 12 years of clinical excellence in non-invasive and interventional cardiac procedures.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Rao',
    degree: 'MBBS, MD (Medicine), DM (Neurology)',
    specialty: 'Senior Neurologist',
    specialization: 'Acute Stroke Intervention, Epilepsy Therapy & Neuro-Rehabilitation',
    department: 'Neurology',
    experience: '15 Years',
    availability: 'Tue – Sun (11:00 AM - 05:00 PM)',
    image: 'https://images.unsplash.com/photo-1594824813566-88855ce78c91?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Ananya Rao brings 15 years of neurological expertise specializing in complex stroke intervention and comprehensive brain disorders.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikram Patel',
    degree: 'MBBS, MS (Orthopedics), M.Ch (Joint Replacement)',
    specialty: 'Orthopedic Surgeon',
    specialization: 'Total Knee Replacement, Robotic Surgery & Arthroscopy',
    department: 'Orthopedics',
    experience: '14 Years',
    availability: 'Mon – Fri (09:00 AM - 03:00 PM)',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Vikram Patel is a pioneer in joint replacement and minimally invasive orthopedic surgery, restoring active lifestyles for patients.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sunita Rao',
    degree: 'MBBS, MD (Pediatrics), DCH',
    specialty: 'Pediatric Specialist',
    specialization: 'Neonatal Care, Pediatric Pulmonology & Child Growth',
    department: 'Pediatrics',
    experience: '10 Years',
    availability: 'Mon – Sat (10:00 AM - 04:30 PM)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Sunita Rao specializes in infant & child healthcare with a gentle, compassionate approach towards young patients.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Rajesh Iyer',
    degree: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    specialty: 'Consultant Dermatologist',
    specialization: 'Cosmetic Laser Surgery, Psoriasis Treatment & Trichology',
    department: 'Dermatology',
    experience: '9 Years',
    availability: 'Tue – Sat (11:30 AM - 06:00 PM)',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Rajesh Iyer delivers evidence-based clinical dermatology and state-of-the-art aesthetic skincare procedures.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Priya Nair',
    degree: 'MBBS, MD (Emergency Medicine), MEM (USA)',
    specialty: 'Emergency Specialist',
    specialization: 'Trauma Resuscitation, Critical Care & Acute Toxicology',
    department: 'Emergency Medicine',
    experience: '11 Years',
    availability: '24×7 Rotational Shifts',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Priya Nair leads the emergency resuscitation wing at Aarogya Hospital, managing life-critical interventions with speed and precision.'
  }
];

const SERVICES_BENTO = [
  {
    title: 'Emergency Care',
    description: '24×7 trauma center equipped with immediate resuscitation units and dedicated cardiac care.',
    icon: ShieldAlert,
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    accentBg: 'bg-rose-50 border-rose-100',
    iconColor: 'text-rose-600'
  },
  {
    title: 'Health Checkups',
    description: 'Comprehensive preventive health packages tailored for every age group and wellness goal.',
    icon: Activity,
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accentBg: 'bg-teal-50 border-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    title: 'Laboratory Services',
    description: 'NABL-aligned automated pathology lab delivering precise blood, biopsy, and molecular test results.',
    icon: Microscope,
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accentBg: 'bg-cyan-50 border-cyan-100',
    iconColor: 'text-cyan-600'
  },
  {
    title: 'Radiology & Imaging',
    description: '3T MRI, 128-slice CT Scanner, High-Definition Ultrasound, and Digital X-ray facilities.',
    icon: Cpu,
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    accentBg: 'bg-sky-50 border-sky-100',
    iconColor: 'text-sky-600'
  },
  {
    title: 'ICU & Critical Care',
    description: 'Advanced multi-disciplinary intensive care unit with 1:1 nurse-to-patient ratio.',
    icon: Stethoscope,
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accentBg: 'bg-indigo-50 border-indigo-100',
    iconColor: 'text-indigo-600'
  },
  {
    title: '24/7 Pharmacy',
    description: 'Fully stocked in-house pharmacy providing authentic medications and doorstep delivery.',
    icon: Syringe,
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accentBg: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    title: 'Online Appointment',
    description: 'Instant doctor consultation scheduling with digital queue token tracking.',
    icon: Calendar,
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accentBg: 'bg-purple-50 border-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Digital Reports',
    description: 'Secure digital access to medical test results, diagnostic scans, and clinical notes.',
    icon: FileText,
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accentBg: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-600'
  }
];

const CARE_SYNC_FEATURES = [
  {
    title: 'Smarter Appointment Management',
    description: 'Automated scheduling and digital token tracking to streamline patient visits.',
    icon: Calendar
  },
  {
    title: 'Digital Medical Records',
    description: 'Centralized, encrypted patient health histories accessible anytime securely.',
    icon: FileText
  },
  {
    title: 'Reduced Waiting Time',
    description: 'Predictive queue algorithms that minimize patient wait times in OPD rooms.',
    icon: Clock
  },
  {
    title: 'Better Care Coordination',
    description: 'Seamless communication between doctors, nurses, labs, and pharmacies.',
    icon: Users
  },
  {
    title: 'Patient Progress Tracking',
    description: 'Real-time vitals monitoring and automated medication recovery guidance.',
    icon: TrendingUp
  },
  {
    title: 'Intelligent Hospital Operations',
    description: 'Resource monitoring and workload analytics that prevent doctor burnout.',
    icon: Cpu
  }
];

const TESTIMONIALS = [
  {
    quote: "The care I received at Aarogya Hospital was world-class. From OPD booking to post-surgery follow-up, the experience was smooth and reassuring.",
    author: "Rajesh Malhotra",
    role: "Cardiology Patient",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    quote: "Dr. Vikram Patel and the orthopedics team restored my mobility after my knee surgery. Their smart digital reports made managing prescriptions so simple.",
    author: "Sunita Deshmukh",
    role: "Orthopedics Patient",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    quote: "Outstanding critical care department! When my father needed emergency attention, the doctors acted swiftly and kept our family informed at every stage.",
    author: "Alok Verma",
    role: "Family of Emergency Patient",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  }
];

export default function HospitalLanding({ user, onLoginSuccess, onLogout, onOpenDoctorDashboard, onOpenPatientDashboard }) {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedDoctorProfile, setSelectedDoctorProfile] = useState(null);
  const [preselectedDept, setPreselectedDept] = useState(null);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDeptFilter, setActiveDeptFilter] = useState('All');

  // Floating AI Assistant state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! 👋 I am Aarogya AI Assistant. How can I assist you with doctors, OPD timings, or appointments today?'
    }
  ]);
  const [aiInput, setAiInput] = useState('');

  const handleSendAiMessage = (customText = null) => {
    const query = (customText || aiInput).trim();
    if (!query) return;

    const updated = [...aiMessages, { sender: 'user', text: query }];
    setAiMessages(updated);
    if (!customText) setAiInput('');

    let responseText = "Thank you for reaching out to Aarogya Hospital AI! For appointments, OPD schedules, or emergencies, please click 'Book Appointment' above or call our 24x7 helpline: +91 1800 123 4567.";
    const qLower = query.toLowerCase();

    if (qLower.includes('opd') || qLower.includes('timing') || qLower.includes('time') || qLower.includes('hours') || qLower.includes('schedule')) {
      responseText = "🗓️ OPD Timings: Monday to Saturday from 09:00 AM – 05:00 PM across all departments (Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology).";
    } else if (qLower.includes('doctor') || qLower.includes('specialist') || qLower.includes('cardio') || qLower.includes('neuro') || qLower.includes('ortho')) {
      responseText = "👨‍⚕️ Top Specialists available: Dr. Arjun Sharma (Cardiology), Dr. Ananya Rao (Neurology), Dr. Vikram Patel (Orthopedics), and Dr. Priya Nair (Emergency).";
    } else if (qLower.includes('appoint') || qLower.includes('book') || qLower.includes('consult') || qLower.includes('visit')) {
      responseText = "📅 You can book a consultation instantly! Click the 'Book Appointment' button at the top right to select your preferred doctor and time slot.";
    } else if (qLower.includes('emerg') || qLower.includes('trauma') || qLower.includes('help') || qLower.includes('call') || qLower.includes('phone') || qLower.includes('bed')) {
      responseText = "🚨 For 24/7 Trauma & Emergency assistance, call our priority hotline directly: +91 1800 123 4567 or visit Emergency Gate 1.";
    }

    setTimeout(() => {
      setAiMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    }, 350);
  };

  const handleOpenAppointment = (docName = null, deptName = null) => {
    setPreselectedDoctor(docName);
    setPreselectedDept(deptName);
    setIsAppointmentOpen(true);
  };

  const filteredDoctors = activeDeptFilter === 'All' 
    ? DOCTORS 
    : DOCTORS.filter(d => d.department.toLowerCase() === activeDeptFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F0FDFA] text-slate-800 relative selection:bg-teal-500 selection:text-white font-sans overflow-x-hidden pt-20 sm:pt-24">
      
      {/* Background Aurora Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-300/30 via-cyan-200/20 to-transparent blur-3xl aurora-orb-1" />
        <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-cyan-300/25 via-teal-200/20 to-transparent blur-3xl aurora-orb-2" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-emerald-200/20 via-sky-200/20 to-transparent blur-3xl aurora-orb-3" />
      </div>

      {/* FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo */}
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-600/30 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                  Aarogya <span className="text-gradient">Multispeciality</span>
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-teal-700 uppercase">
                  Hospital & Healthcare
                </span>
              </div>
            </a>

            {/* Middle: Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Home</a>
              <a href="#departments" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Departments</a>
              <a href="#doctors" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Doctors</a>
              <a href="#services" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Services</a>
            </div>

            {/* Right: Actions (Login & Book Appointment or Logged-in User Profile) */}
            <div className="hidden sm:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (user.role === 'doctor' && onOpenDoctorDashboard) {
                        onOpenDoctorDashboard();
                      } else if (user.role === 'patient') {
                        if (onOpenPatientDashboard) onOpenPatientDashboard();
                        window.location.replace('Patient.html');
                      } else if (user.role === 'admin') {
                        window.location.replace('admin.html');
                      }
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 transition-all flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{user.name}</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-bold uppercase">
                      {user.role}
                    </span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="p-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => handleOpenAppointment()}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 text-teal-900 border border-teal-300/80 transition-all transform hover:-translate-y-0.5"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-teal-50 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-b border-teal-100 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50"
            >
              Home
            </a>
            <a 
              href="#departments" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50"
            >
              Departments
            </a>
            <a 
              href="#doctors" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50"
            >
              Doctors
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50"
            >
              Services
            </a>
            
            <div className="pt-3 border-t border-slate-200/60 flex flex-col space-y-2">
              {user ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      if (user.role === 'doctor' && onOpenDoctorDashboard) {
                        onOpenDoctorDashboard();
                      } else if (user.role === 'patient') {
                        if (onOpenPatientDashboard) onOpenPatientDashboard();
                        window.location.replace('Patient.html');
                      } else if (user.role === 'admin') {
                        window.location.replace('admin.html');
                      }
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-teal-600 text-white shadow-md flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name} ({user.role})</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsLoginOpen(true); }}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-teal-600 text-white shadow-md"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); handleOpenAppointment(); }}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-teal-50 text-teal-800 border border-teal-200"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/15 via-cyan-500/10 to-teal-500/5 border border-teal-200/80 text-teal-800 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Compassion. Innovation. Trusted Healthcare.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Exceptional Healthcare, <br />
                <span className="text-gradient">Powered by Compassion.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Providing comprehensive healthcare with experienced doctors, modern facilities, and intelligent hospital services for every patient.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleOpenAppointment()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-xl shadow-teal-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </button>

                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/80 hover:bg-white text-slate-800 font-bold text-base border border-slate-200/80 shadow-lg shadow-teal-900/5 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  <Lock className="w-5 h-5 text-teal-600" />
                  <span>Login</span>
                </button>
              </div>

              {/* Floating Quick Key Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-teal-100/80">
                <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-sm text-left">
                  <div className="flex items-center space-x-1.5 text-emerald-600 font-bold text-xs">
                    <Check className="w-4 h-4" />
                    <span>24×7 Emergency</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Trauma Response</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-sm text-left">
                  <div className="flex items-center space-x-1.5 text-teal-600 font-bold text-xs">
                    <Check className="w-4 h-4" />
                    <span>250+ Doctors</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Expert Specialists</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-sm text-left">
                  <div className="flex items-center space-x-1.5 text-cyan-600 font-bold text-xs">
                    <Check className="w-4 h-4" />
                    <span>35+ Departments</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Full Spectrum Care</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-sm text-left">
                  <div className="flex items-center space-x-1.5 text-blue-600 font-bold text-xs">
                    <Check className="w-4 h-4" />
                    <span>NABH Quality</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">High Standards</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hospital Visual Card */}
                <div className="relative rounded-3xl overflow-hidden glass-panel-accent p-2 shadow-2xl border border-white/90">
                  <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80" 
                      alt="Aarogya Hospital Building"
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    
                    {/* Visual Card Overlay Banner */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/80 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-teal-700 uppercase">State-Of-The-Art Center</span>
                          <h4 className="text-base font-extrabold text-slate-900">Aarogya Multispeciality</h4>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>OPD Open</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: Emergency Badge */}
                <div className="absolute -top-6 -left-6 hidden sm:flex items-center space-x-3 p-3.5 rounded-2xl glass-panel border border-white/90 shadow-xl max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">24×7 Emergency</span>
                    <span className="text-[11px] text-slate-500 font-medium">Ambulance: 108</span>
                  </div>
                </div>

                {/* Floating Card 2: Quality Badge */}
                <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center space-x-3 p-3.5 rounded-2xl glass-panel border border-white/90 shadow-xl max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">NABH Standards</span>
                    <span className="text-[11px] text-slate-500 font-medium">Quality Accredited</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white/60 backdrop-blur-md relative z-10 border-y border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Why Choose Aarogya
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              Standard of Excellence in Healthcare
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Combining world-class medical expertise with futuristic patient care services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl glass-panel glass-card-hover border border-teal-100/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Experienced Specialists</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 250+ highly qualified doctors and surgeons across 35 medical specialties dedicated to patient wellness.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel glass-card-hover border border-teal-100/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-600/20">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Advanced Facilities</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                State-of-the-art modular operation theaters, 3T MRI, robotic surgical tools, and multi-bed ICUs.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel glass-card-hover border border-teal-100/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Patient-Centered Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compassionate nursing, personalized treatment plans, and continuous recovery support every step of the way.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel glass-card-hover border border-teal-100/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Smart Digital Experience</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless online OPD booking, digital prescriptions, and zero waiting time for every patient.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* OUR DEPARTMENTS */}
      <section id="departments" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Specialized Medicine
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Our Clinical Departments
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                World-class multi-disciplinary medical departments equipped for complex clinical treatments.
              </p>
            </div>

            <a href="#doctors" className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-teal-700 hover:text-teal-800">
              <span>View All Doctors</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              return (
                <div 
                  key={dept.id}
                  className="p-6 rounded-3xl glass-panel glass-card-hover border border-white/90 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100/80 px-2.5 py-1 rounded-full">
                        {dept.patientCount}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setActiveDeptFilter(dept.name);
                        const docElement = document.getElementById('doctors');
                        if (docElement) docElement.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all"
                    >
                      <span>Meet Doctors</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* OUR DOCTORS */}
      <section id="doctors" className="py-20 bg-white/70 backdrop-blur-md relative z-10 border-y border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Medical Team
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              Meet Our Eminent Doctors
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Leading specialists committed to clinical excellence and patient care.
            </p>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Emergency Medicine'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDeptFilter(dept)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeDeptFilter === dept
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id}
                className="rounded-3xl glass-panel glass-card-hover border border-teal-100/80 overflow-hidden flex flex-col justify-between"
              >
                {/* Doctor Visual Header */}
                <div className="relative h-60 bg-teal-900 overflow-hidden">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-teal-800 shadow-sm">
                    {doc.experience} Exp.
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block mb-0.5">
                      {doc.department}
                    </span>
                    <h3 className="text-lg font-extrabold text-white leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] font-medium text-teal-200 truncate mt-0.5">
                      {doc.degree}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-teal-700">{doc.specialty}</p>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Specialization
                      </span>
                      <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-100/80">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          {doc.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center space-x-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span className="font-medium">{doc.availability}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedDoctorProfile(doc)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleOpenAppointment(doc.name, doc.department)}
                      className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all"
                    >
                      Book OPD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOSPITAL SERVICES (Bento Grid) */}
      <section id="services" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Hospital Services
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Designed in a Bento layout to provide quick insights into our medical capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICES_BENTO.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-3xl glass-panel glass-card-hover border border-white/90 flex flex-col justify-between ${service.span}`}
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${service.accentBg}`}>
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs text-teal-700 font-semibold border-t border-slate-100/60 mt-4">
                    <span>Available 24×7</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* STATISTICS */}
      <section className="py-16 bg-white/70 backdrop-blur-md relative z-10 border-b border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            
            <div className="p-6 rounded-3xl glass-panel border border-teal-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-700">250+</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Experienced Doctors</div>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-teal-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-700">35+</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Medical Departments</div>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-teal-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700">500+</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Hospital Beds</div>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-teal-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-600">24×7</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Emergency Service</div>
            </div>

            <div className="col-span-2 lg:col-span-1 p-6 rounded-3xl glass-panel border border-teal-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700">50,000+</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Patients Served</div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Patient Trust
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              What Our Patients Say
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Real experiences from individuals cared for by Aarogya Multispeciality Hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi, i) => (
              <div key={i} className="p-6 rounded-3xl glass-panel glass-card-hover border border-white/90 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{testi.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img 
                    src={testi.avatar} 
                    alt={testi.author} 
                    className="w-10 h-10 rounded-full object-cover border border-teal-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{testi.author}</h4>
                    <span className="text-[11px] text-teal-700 font-medium">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOOK APPOINTMENT CTA BANNER */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 p-8 sm:p-12 text-white shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-bold border border-white/20">
                Always Ready To Serve
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Your Health Deserves Expert Care.
              </h2>
              <p className="text-sm text-teal-100 leading-relaxed">
                Schedule your consultation with top specialists at Aarogya Multispeciality Hospital today. Instant booking & digital queue confirmation.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => handleOpenAppointment()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-teal-900 hover:bg-slate-100 font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all transform active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Book Appointment</span>
                </button>

                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-800/60 hover:bg-teal-800 text-white font-bold text-sm border border-white/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-16 relative z-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Hospital Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-white">Aarogya Multispeciality Hospital</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Providing compassionate, modern, and trustworthy healthcare services across all medical specialties with state-of-the-art diagnostic facilities.
              </p>
              <div className="text-xs space-y-2 text-slate-400 pt-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>124 Healthcare Boulevard, Knowledge Park, Sector 62</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>+91 (11) 4567 8900 | Helpline: 1800-AAROGYA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>contact@aarogyahospital.com</span>
                </div>
              </div>
            </div>

            {/* Col 2: Departments */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Departments</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Cardiology</a></li>
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Neurology</a></li>
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Orthopedics</a></li>
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Pediatrics</a></li>
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Dermatology</a></li>
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Emergency Medicine</a></li>
              </ul>
            </div>

            {/* Col 3: Emergency Contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Emergency Contact</h4>
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/60 space-y-2">
                <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-widest block">24×7 Trauma Helpline</span>
                <div className="text-lg font-mono font-bold text-white flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-rose-400" />
                  <span>108 / +91 99999 00000</span>
                </div>
                <p className="text-[11px] text-slate-400">Immediate Ambulance & Critical Care Unit dispatch.</p>
              </div>
            </div>

            {/* Col 4: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setIsLoginOpen(true)} className="hover:text-teal-400 text-left">Login to Portal</button></li>
                <li><button onClick={() => handleOpenAppointment()} className="hover:text-teal-400 text-left">Book OPD Appointment</button></li>
                <li><a href="#departments" className="hover:text-teal-400 transition-colors">Speciality Clinics</a></li>
                <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Our Specialists</a></li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
            <p>© {new Date().getFullYear()} Aarogya Multispeciality Hospital. All Rights Reserved.</p>
            <div className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-400 font-semibold text-[11px]">
              NABH & ISO 9001:2015 Accredited Healthcare Facility
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING AI ASSISTANT WIDGET (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat Popup Window */}
        {isAiOpen && (
          <div className="mb-3 w-[92vw] sm:w-[380px] h-[480px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-teal-200 shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Brain className="w-5 h-5 text-cyan-200" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight">Aarogya Health AI</h4>
                  <p className="text-[10px] text-cyan-100 font-medium">Virtual Assistant • Instant Hospital Guidance</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {aiMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0F766E] text-white rounded-br-none'
                      : 'bg-white border border-teal-100 text-slate-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Quick Chips */}
            <div className="px-3 py-2 bg-slate-100/80 border-t border-slate-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => handleSendAiMessage("OPD Timings")}
                className="px-2.5 py-1 rounded-full bg-white border border-teal-200 text-[#0F766E] text-[10px] font-bold whitespace-nowrap hover:bg-teal-50"
              >
                🩺 OPD Timings
              </button>
              <button 
                onClick={() => handleSendAiMessage("Top Specialists")}
                className="px-2.5 py-1 rounded-full bg-white border border-teal-200 text-[#0F766E] text-[10px] font-bold whitespace-nowrap hover:bg-teal-50"
              >
                👨‍⚕️ Specialists
              </button>
              <button 
                onClick={() => handleSendAiMessage("Book Appointment")}
                className="px-2.5 py-1 rounded-full bg-white border border-teal-200 text-[#0F766E] text-[10px] font-bold whitespace-nowrap hover:bg-teal-50"
              >
                📅 Appointment
              </button>
              <button 
                onClick={() => handleSendAiMessage("Emergency Contact")}
                className="px-2.5 py-1 rounded-full bg-white border border-teal-200 text-[#0F766E] text-[10px] font-bold whitespace-nowrap hover:bg-teal-50"
              >
                🚨 Emergency
              </button>
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendAiMessage(); }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask Aarogya AI assistant..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#0F766E] hover:bg-[#0B5C56] text-white shadow-md shadow-[#0F766E]/20 transition-all"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="px-4 py-3 rounded-full bg-gradient-to-r from-[#0F766E] via-teal-600 to-cyan-600 text-white font-extrabold text-xs shadow-xl shadow-[#0F766E]/30 border border-cyan-300/40 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F766E]" />
          </div>
          <span>Aarogya AI</span>
        </button>
      </div>

      {/* MODALS */}
      <AppointmentModal 
        isOpen={isAppointmentOpen} 
        onClose={() => setIsAppointmentOpen(false)}
        preselectedDoctor={preselectedDoctor}
        preselectedDept={preselectedDept}
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={onLoginSuccess}
      />

      <DoctorProfileModal 
        doctor={selectedDoctorProfile} 
        isOpen={!!selectedDoctorProfile} 
        onClose={() => setSelectedDoctorProfile(null)} 
        onBookAppointment={(docName, deptName) => handleOpenAppointment(docName, deptName)}
      />

    </div>
  );
}
