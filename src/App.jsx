import React, { useState, useEffect } from 'react';
import HospitalLanding from './components/HospitalLanding';
import DoctorDashboard from './DoctorDashboard';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aarogya_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentView] = useState(() => {
    const saved = localStorage.getItem('aarogya_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.role === 'doctor') return 'doctor-dashboard';
        if (u.role === 'patient') return 'patient-dashboard';
      } catch (e) {}
    }
    return 'landing';
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('aarogya_user', JSON.stringify(userData));
    if (userData.role === 'doctor') {
      setCurrentView('doctor-dashboard');
    } else if (userData.role === 'patient') {
      setCurrentView('patient-dashboard');
      try {
        window.location.href = 'Patient.html';
      } catch (e) {}
    } else if (userData.role === 'admin') {
      try {
        window.location.href = 'admin.html';
      } catch (e) {}
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aarogya_user');
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
          onOpenPatientDashboard={() => setCurrentView('patient-dashboard')}
        />
      ) : currentView === 'patient-dashboard' ? (
        <div className="w-full h-screen relative">
          <iframe 
            src="Patient.html" 
            className="w-full h-full border-none"
            title="Patient Dashboard"
          />
        </div>
      ) : (
        <DoctorDashboard 
          user={user}
          onLogout={handleLogout}
          onBackToLanding={() => setCurrentView('landing')} 
        />
      )}
    </div>
  );
}

