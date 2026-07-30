import React, { useMemo, useState } from 'react';
import { Activity, BedDouble, ClipboardCheck, Stethoscope, UserCheck, ArrowLeft } from 'lucide-react';
import { getNursePermissions } from '../utils/nursePermissions';

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
  }
];

export default function NurseDashboard({ user, onLogout, onBackToLanding }) {
  const permissions = useMemo(() => getNursePermissions(), []);
  const [patients, setPatients] = useState(initialPatients);

  const updatePatient = (id, updates) => {
    setPatients((current) => current.map((patient) => (
      patient.id === id ? { ...patient, ...updates } : patient
    )));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">Nurse Portal</p>
            <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Nurse'}</h1>
            <p className="mt-2 text-sm text-slate-600">Helping staff workspace with limited permissions for daily ward support.</p>
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
              className="rounded-2xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {permissions.map((permission) => (
            <div key={permission} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-600">{permission.replace(/_/g, ' ')}</p>
              <p className="mt-2 text-xs text-slate-500">Enabled for this role</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold">Patient Check-In</h2>
            </div>
            <div className="space-y-3">
              {patients.map((patient) => (
                <div key={patient.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-sm text-slate-600">Room {patient.room} • Assigned to {patient.doctor}</p>
                    </div>
                    <button
                      onClick={() => updatePatient(patient.id, { status: 'Checked In' })}
                      className="rounded-xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                    >
                      Check In
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" />
                <h2 className="text-xl font-bold">Vitals</h2>
              </div>
              {patients.map((patient) => (
                <div key={`${patient.id}-vitals`} className="mb-3 rounded-2xl bg-slate-50 p-3 text-sm">
                  <p className="font-semibold">{patient.name}</p>
                  <p>Temp: {patient.vitals.temp}</p>
                  <p>BP: {patient.vitals.bp}</p>
                  <p>Pulse: {patient.vitals.pulse}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-teal-600" />
                <h2 className="text-xl font-bold">Room & Doctor Assignment</h2>
              </div>
              {patients.map((patient) => (
                <div key={`${patient.id}-assign`} className="mb-3 rounded-2xl bg-slate-50 p-3 text-sm">
                  <p className="font-semibold">{patient.name}</p>
                  <p>Room: {patient.room}</p>
                  <p>Doctor: {patient.doctor}</p>
                  <div className="mt-2 flex gap-2">
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
      </div>
    </div>
  );
}
