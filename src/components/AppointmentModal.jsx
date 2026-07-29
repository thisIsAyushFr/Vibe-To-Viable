import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ChevronRight, Stethoscope, Building2 } from 'lucide-react';

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Emergency Medicine'
];

const DOCTORS = {
  'Cardiology': ['Dr. Arjun Sharma (Senior Cardiologist)'],
  'Neurology': ['Dr. Ananya Rao (Senior Neurologist)'],
  'Orthopedics': ['Dr. Vikram Patel (Orthopedic Surgeon)'],
  'Pediatrics': ['Dr. Sunita Rao (Pediatric Specialist)'],
  'Dermatology': ['Dr. Rajesh Iyer (Consultant Dermatologist)'],
  'Emergency Medicine': ['Dr. Priya Nair (Emergency Specialist)']
};

export default function AppointmentModal({ isOpen, onClose, preselectedDoctor = null, preselectedDept = null }) {
  const [department, setDepartment] = useState(preselectedDept || 'Cardiology');
  const [doctor, setDoctor] = useState(preselectedDoctor || DOCTORS[preselectedDept || 'Cardiology'][0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Re-sync form state with the latest preselected doctor/department and clear
  // stale data every time the modal is (re)opened.
  useEffect(() => {
    if (isOpen) {
      const dept = preselectedDept || 'Cardiology';
      setDepartment(dept);
      setDoctor(preselectedDoctor || (DOCTORS[dept] && DOCTORS[dept][0]) || '');
      setDate(new Date().toISOString().split('T')[0]);
      setTimeSlot('10:00 AM');
      setFormData({ name: '', phone: '', email: '', notes: '' });
      setIsSubmitted(false);
      setBookingId('');
    }
  }, [isOpen, preselectedDoctor, preselectedDept]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleResetAndClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDepartmentChange = (dept) => {
    setDepartment(dept);
    if (DOCTORS[dept] && DOCTORS[dept].length > 0) {
      setDoctor(DOCTORS[dept][0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = 'ARGY-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', email: '', notes: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl border border-teal-100 shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-teal-100/60 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Book Appointment</h3>
              <p className="text-xs text-teal-700 font-medium">Aarogya Multispeciality Hospital</p>
            </div>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Appointment Confirmed!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{formData.name || 'Patient'}</span>. Your appointment has been scheduled successfully.
              </p>
              
              <div className="bg-teal-50/80 border border-teal-200/70 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-teal-200/50 pb-2">
                  <span className="text-slate-500 font-medium">Booking ID:</span>
                  <span className="font-mono font-bold text-teal-700">{bookingId}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/50 pb-2">
                  <span className="text-slate-500 font-medium">Department:</span>
                  <span className="font-semibold text-slate-800">{department}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/50 pb-2">
                  <span className="text-slate-500 font-medium">Doctor:</span>
                  <span className="font-semibold text-slate-800">{doctor}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/50 pb-2">
                  <span className="text-slate-500 font-medium">Date & Time:</span>
                  <span className="font-semibold text-slate-800">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-medium">Hospital Location:</span>
                  <span className="font-semibold text-teal-800">Aarogya Hospital, Block B, Main OPD</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-lg shadow-teal-600/20 transition-all"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Department & Doctor Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Select Department
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={department}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Select Doctor
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                    >
                      {(DOCTORS[department] || []).map((doc) => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                    >
                      <option value="09:00 AM">09:00 AM - Morning</option>
                      <option value="10:00 AM">10:00 AM - Morning</option>
                      <option value="11:30 AM">11:30 AM - Morning</option>
                      <option value="02:00 PM">02:00 PM - Afternoon</option>
                      <option value="04:30 PM">04:30 PM - Evening</option>
                      <option value="06:00 PM">06:00 PM - Evening</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient Personal Details */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-1">
                  Patient Information
                </h4>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Reason for Visit / Symptoms (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of symptoms or consultation reason..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  ⚡ instant confirmation & SMS alert
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 flex items-center space-x-2 transition-all transform active:scale-95"
                >
                  <span>Confirm Appointment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
