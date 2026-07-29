import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Check, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  Building2, 
  Smartphone, 
  Moon, 
  Sun,
  Activity,
  LogOut
} from 'lucide-react';
import { DOCTOR } from '../data/doctorDemoData';

export default function DoctorSettings({ onLogout }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'notifications' | 'security' | 'opd'
  
  // Profile state
  const [doctorName, setDoctorName] = useState(DOCTOR.name);
  const [department, setDepartment] = useState(DOCTOR.department);
  const [email, setEmail] = useState('doctor@aarogyahospital.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  
  // OPD & OT Preferences
  const [opdDays, setOpdDays] = useState('Monday - Saturday');
  const [opdHours, setOpdHours] = useState('10:00 AM – 04:30 PM');
  const [defaultOtRoom, setDefaultOtRoom] = useState('OT 1 — Cardiac & Cardio-Thoracic Suite');

  // Notifications state
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalVitalsAlert, setCriticalVitalsAlert] = useState(true);
  const [otScheduleReminders, setOtScheduleReminders] = useState(true);

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Feedback state
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-[#0F766E] to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/20 mb-2">
              <Settings size={14} className="text-cyan-300" />
              <span>Doctor Portal Configuration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Clinical & Account Settings
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Manage your profile, OPD consultation timings, OT preferences, notifications, and security options at Aarogya Hospital.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-2xl shadow-lg font-bold text-xs animate-bounce">
              <Check size={16} />
              <span>Settings Saved Successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 p-4 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/70 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <User size={16} />
            <span>Profile & Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('opd')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'opd'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <Clock size={16} />
            <span>OPD & OT Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'notifications'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <Bell size={16} />
            <span>Alerts & Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'security'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <Lock size={16} />
            <span>Password & Security</span>
          </button>
        </div>

        {/* Form Body Content */}
        <div className="lg:col-span-9 p-6 sm:p-8">
          <form onSubmit={handleSaveSettings}>
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <User size={18} className="text-[#0F766E]" />
                    <span>Doctor Professional Details</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Your official clinical information displayed on patient receipts & hospital records.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Department
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Official Hospital Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Building2 size={20} className="text-[#0F766E] flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{DOCTOR.hospital}</p>
                      <p className="text-[11px] text-slate-500 font-medium">Department of {department} • Senior Medical Staff</p>
                    </div>
                  </div>

                  {onLogout && (
                    <button
                      type="button"
                      onClick={onLogout}
                      className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
                    >
                      <LogOut size={15} />
                      <span>Logout of Portal</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'opd' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Clock size={18} className="text-[#0F766E]" />
                    <span>OPD Consultation & OT Schedule Preferences</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Configure your OPD availability and preferred Operation Theater suite allocations.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      OPD Days
                    </label>
                    <input
                      type="text"
                      value={opdDays}
                      onChange={(e) => setOpdDays(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Consultation Hours
                    </label>
                    <input
                      type="text"
                      value={opdHours}
                      onChange={(e) => setOpdHours(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Default Operation Theater (OT) Suite
                  </label>
                  <select
                    value={defaultOtRoom}
                    onChange={(e) => setDefaultOtRoom(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                  >
                    <option value="OT 1 — Cardiac Suite">OT 1 — Cardiac & Cardio-Thoracic Suite</option>
                    <option value="OT 2 — Orthopedics Suite">OT 2 — Orthopedics & Joint Surgery</option>
                    <option value="OT 3 — Neuro Suite">OT 3 — Neurosurgery & Brain Suite</option>
                    <option value="OT 4 — Trauma Suite">OT 4 — Emergency Level-1 Trauma Suite</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Bell size={18} className="text-[#0F766E]" />
                    <span>Clinical Alert Preferences</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Control how you receive patient emergency alerts and schedule updates.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Critical Patient Vitals Alerts</span>
                      <span className="text-[11px] text-slate-500 font-medium">Instant notification when an admitted patient's BP/SpO2 drops into critical threshold</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={criticalVitalsAlert}
                      onChange={(e) => setCriticalVitalsAlert(e.target.checked)}
                      className="w-5 h-5 accent-[#0F766E] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Operation Theater Reminders</span>
                      <span className="text-[11px] text-slate-500 font-medium">Get 30-min pre-op preparation reminders prior to scheduled surgeries</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={otScheduleReminders}
                      onChange={(e) => setOtScheduleReminders(e.target.checked)}
                      className="w-5 h-5 accent-[#0F766E] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">SMS Emergency Alerts</span>
                      <span className="text-[11px] text-slate-500 font-medium">Receive direct SMS on mobile for urgent on-call emergency room dispatches</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="w-5 h-5 accent-[#0F766E] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Lock size={18} className="text-[#0F766E]" />
                    <span>Password & Account Security</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Update your password and view portal encryption status.</p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Action Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {onLogout ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-extrabold text-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#0F766E] hover:bg-[#0B5C56] text-white font-extrabold text-xs shadow-lg shadow-[#0F766E]/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Save size={16} />
                <span>Save All Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
