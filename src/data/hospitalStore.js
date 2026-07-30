import { useEffect, useState } from 'react';

const STORAGE_KEY = 'caresync_walkin_patients';
const EVENT_NAME = 'caresync-walkins-updated';

export const DEPARTMENTS = [
  'General Medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology'
];

export const DOCTORS_BY_DEPARTMENT = {
  'General Medicine': ['Dr. Ananya Rao'],
  Cardiology: ['Dr. Arjun Sharma'],
  Neurology: ['Dr. Ananya Rao'],
  Orthopedics: ['Dr. Vikram Patel'],
  Pediatrics: ['Dr. Priya Nair'],
  Dermatology: ['Dr. Priya Nair']
};

export function getWalkIns() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWalkIns(list) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function addWalkIn(details) {
  const list = getWalkIns();
  const patient = {
    patientId: `P${1020 + list.length}`,
    visitType: 'Walk-In',
    status: 'Waiting',
    arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ...details
  };
  saveWalkIns([...list, patient]);
  return patient;
}

export function updateWalkIn(patientId, updates) {
  saveWalkIns(getWalkIns().map((p) => (p.patientId === patientId ? { ...p, ...updates } : p)));
}

export function useWalkIns() {
  const [walkIns, setWalkIns] = useState(getWalkIns());
  useEffect(() => {
    const refresh = () => setWalkIns(getWalkIns());
    window.addEventListener('storage', refresh);
    window.addEventListener(EVENT_NAME, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener(EVENT_NAME, refresh);
    };
  }, []);
  return walkIns;
}
