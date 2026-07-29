import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, UserCheck, Stethoscope, HeartPulse, ShieldAlert, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';

const ROLES = [
  {
    id: 'patient',
    title: 'Patient Portal',
    icon: HeartPulse,
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    description: 'Access personal health records, appointments, and prescriptions.',
    features: [
      'View & manage upcoming appointments',
      'Instant access to lab & radiology reports',
      'Download digitized prescriptions',
      'Automated medicine reminders & schedules',
      'Personalized recovery guidance & advice'
    ]
  },
  {
    id: 'doctor',
    title: 'Doctor Portal',
    icon: Stethoscope,
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    description: 'Intelligent clinical tools to reduce cognitive & documentation load.',
    features: [
      'Today\'s patient queue & consultation schedule',
      'AI patient history summaries & timelines',
      'Gemini-powered documentation assistant',
      'Comprehensive electronic medical records',
      'Real-time workload & burnout monitoring'
    ]
  },
  {
    id: 'nurse',
    title: 'Nurse Station',
    icon: UserCheck,
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description: 'Care coordination & medication administration tasks.',
    features: [
      'Assigned ward & bed patient lists',
      'Automated medication tasks & alerts',
      'Vitals recording & patient progress updates',
      'Daily shift workflow management'
    ]
  },
  {
    id: 'admin',
    title: 'Hospital Admin',
    icon: ShieldCheck,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Operational oversight and department resource optimization.',
    features: [
      'Real-time hospital bed & occupancy analytics',
      'Department workload & waiting time monitoring',
      'Staff & resource allocation tracking',
      'Operational workflow dashboards'
    ]
  },
  {
    id: 'owner',
    title: 'Executive / Owner',
    icon: ShieldAlert,
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'High-level hospital intelligence and financial performance insights.',
    features: [
      'Hospital intelligence & growth analytics',
      'Executive performance & revenue insights',
      'Multi-department operational health'
    ]
  }
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onOpenDoctorDashboard }) {
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [demoLoginStatus, setDemoLoginStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const currentRoleData = ROLES.find(r => r.id === selectedRole) || ROLES[1];

  const handleClose = () => {
    setSelectedRole('doctor');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setDemoLoginStatus(null);
    setErrorMessage('');
    if (onClose) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrorMessage('');
  };

  const getExpectedCredentials = (role) => {
    switch (role) {
      case 'doctor':
        return { email: 'doctor@aarogyahospital.com', pass: 'doctor123' };
      case 'patient':
        return { email: 'patient@aarogyahospital.com', pass: 'patient123' };
      case 'nurse':
        return { email: 'nurse@aarogyahospital.com', pass: 'nurse123' };
      case 'admin':
        return { email: 'admin@aarogyahospital.com', pass: 'admin123' };
      case 'owner':
        return { email: 'owner@aarogyahospital.com', pass: 'owner123' };
      default:
        return { email: 'doctor@aarogyahospital.com', pass: 'doctor123' };
    }
  };

  const executeLogin = (userData) => {
    setDemoLoginStatus(`Authenticating ${userData.name}...`);
    localStorage.setItem('aarogya_user', JSON.stringify(userData));

    setTimeout(() => {
      setDemoLoginStatus(null);
      handleClose();
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
      if (userData.role === 'doctor' && onOpenDoctorDashboard) {
        onOpenDoctorDashboard();
      }
    }, 600);
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const expected = getExpectedCredentials(selectedRole);
    const enteredEmail = email.trim().toLowerCase();
    const enteredPass = password.trim();

    // Check credentials match
    const isEmailValid = enteredEmail === expected.email || (selectedRole === 'doctor' && enteredEmail === 'arjun@aarogyahospital.com');
    const isPassValid = enteredPass === expected.pass;

    if (!isEmailValid || !isPassValid) {
      setErrorMessage(`Authentication Failed! Invalid Email or Password for ${currentRoleData.title}. Please check your credentials and try again.`);
      return;
    }

    const userData = {
      name: selectedRole === 'doctor' ? 'Dr. Arjun Sharma' : selectedRole === 'patient' ? 'Rahul Verma' : 'Hospital Administrator',
      email: enteredEmail,
      role: selectedRole
    };

    executeLogin(userData);
  };

  const expectedCreds = getExpectedCredentials(selectedRole);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-teal-100 shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-teal-100/60 bg-gradient-to-r from-teal-600/10 via-cyan-500/10 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Secure Hospital Portal Login</h3>
              <p className="text-xs text-teal-700 font-medium">Aarogya Multispeciality Hospital</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {/* Error Message Toast Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-start justify-between gap-3 animate-shake">
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>{errorMessage}</span>
              </div>
              <button 
                onClick={() => setErrorMessage('')}
                className="text-rose-500 hover:text-rose-800 font-extrabold text-sm"
              >
                ✕
              </button>
            </div>
          )}

          {/* Role Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Role to Login
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isActive 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/25 scale-[1.02]' 
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                    <span className="text-xs font-semibold leading-tight">{role.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Feature Overview Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentRoleData.badgeColor}`}>
                {currentRoleData.title}
              </span>
              <span className="text-xs text-slate-500 font-medium">Aarogya Clinical Platform</span>
            </div>
            <p className="text-xs text-slate-600">{currentRoleData.description}</p>
          </div>

          {/* Simulated Login Form */}
          {demoLoginStatus ? (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto animate-bounce">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-teal-800">{demoLoginStatus}</p>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email / User ID
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. doctor@aarogyahospital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500 font-medium">
                  Enter your credentials to access portal.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 flex items-center space-x-2 transition-all transform active:scale-95"
                >
                  <span>Login & Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-[11px] text-slate-500 border-t border-slate-100 pt-3">
            Aarogya Multispeciality Hospital uses end-to-end encryption for health data protection.
          </p>
        </div>
      </div>
    </div>
  );
}
