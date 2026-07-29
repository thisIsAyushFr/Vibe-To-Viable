import React, { useEffect } from 'react';
import { X, Calendar, Clock, Award, Star, BookOpen, Stethoscope, ChevronRight } from 'lucide-react';

export default function DoctorProfileModal({ doctor, isOpen, onClose, onBookAppointment }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !doctor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-teal-100 shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className="relative h-32 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 p-6 flex justify-between items-start">
          <div className="flex items-center space-x-2 text-white/90 text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{doctor.department}</span>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Main Info Bar (Floating avatar) */}
        <div className="px-6 relative -mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-end space-x-4">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80';
              }}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-teal-50"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600 mr-1" />
                  4.9 Rating
                </span>
              </div>
              <p className="text-xs font-bold text-teal-700">{doctor.degree || 'MBBS, MD / MS'}</p>
              <p className="text-xs font-medium text-slate-600">{doctor.specialty} • {doctor.experience} Exp.</p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookAppointment(doctor.name, doctor.department);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-semibold shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
          >
            <span>Book Appointment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Details Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5 text-slate-700">
          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>About {doctor.name}</span>
            </h4>
            <p className="text-xs leading-relaxed text-slate-600">
              {doctor.bio || `${doctor.name} is a highly accomplished ${doctor.specialty} at Aarogya Multispeciality Hospital with over ${doctor.experience} of clinical excellence.`}
            </p>
          </div>

          {/* Doctor Degree & Qualification Box */}
          <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-100">
            <h4 className="text-xs font-bold text-teal-900 mb-1 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-teal-600" />
              <span>Medical Qualifications & Degree</span>
            </h4>
            <p className="text-xs font-semibold text-teal-800">
              {doctor.degree || 'MBBS, MD / MS, Senior Consultant'}
            </p>
          </div>

          {/* Doctor Specialization */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Doctor Specialization</span>
            </h4>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                {doctor.specialization || doctor.specialty}
              </p>
            </div>
          </div>

          {/* OPD Timings & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mb-1">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>OPD Days</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{doctor.availability || 'Monday - Saturday'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mb-1">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Consultation Hours</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">10:00 AM – 04:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
