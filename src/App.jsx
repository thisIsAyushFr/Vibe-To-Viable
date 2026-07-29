import React, { useState, useEffect } from 'react';
import HospitalLanding from './components/HospitalLanding';
import DoctorDashboard from './DoctorDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'doctor-dashboard'
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aarogya_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('aarogya_user', JSON.stringify(userData));
    if (userData.role === 'doctor') {
      setCurrentView('doctor-dashboard');
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
        />
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

