import React, { useState, useEffect } from 'react';
import HospitalLanding from './components/HospitalLanding';
import DoctorDashboard from './DoctorDashboard';
import NurseDashboard from './components/NurseDashboard';

function getPreviewRole() {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('previewRole');
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const previewRole = getPreviewRole();
    if (previewRole === 'nurse') return 'nurse-dashboard';
    if (previewRole === 'doctor') return 'doctor-dashboard';
    return 'landing';
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aarogya_user');
    if (saved) return JSON.parse(saved);

    const previewRole = getPreviewRole();
    if (previewRole === 'nurse') {
      return {
        name: 'Nurse Preview',
        email: 'nurse@aarogyahospital.com',
        role: 'nurse'
      };
    }

    return null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('aarogya_user', JSON.stringify(userData));
    if (userData.role === 'doctor') {
      setCurrentView('doctor-dashboard');
    } else if (userData.role === 'nurse') {
      setCurrentView('nurse-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aarogya_user');
    if (getPreviewRole()) {
      window.history.replaceState({}, '', window.location.pathname);
    }
    setCurrentView('landing');
  };

  return (
    <div className="w-full min-h-screen">
      {currentView === 'landing' ? (
        <HospitalLanding 
          user={user}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onOpenDoctorDashboard={() => setCurrentView('doctor-dashboard')} 
        />
      ) : currentView === 'doctor-dashboard' ? (
        <DoctorDashboard 
          user={user}
          onLogout={handleLogout}
          onBackToLanding={() => setCurrentView('landing')} 
        />
      ) : (
        <NurseDashboard 
          user={user}
          onLogout={handleLogout}
          onBackToLanding={() => setCurrentView('landing')} 
        />
      )}
    </div>
  );
}

