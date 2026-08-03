import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import HospitalLanding from './components/HospitalLanding.jsx';
import DoctorDashboard from './DoctorDashboard.jsx';
import NurseDashboard from './components/NurseDashboard.jsx';

import './index.css';

function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setPage("landing");
  };

  const handleBackToLanding = () => {
    setPage("landing");
  };

  if (page === "doctor") {
    return (
      <DoctorDashboard
        user={user}
        onLogout={handleLogout}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  if (page === "nurse") {
    return (
      <NurseDashboard
        user={user}
        onLogout={handleLogout}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  return (
    <HospitalLanding
      user={user}
      onLoginSuccess={handleLogin}
      onLogout={handleLogout}
      onOpenDoctorDashboard={() => setPage("doctor")}
      onOpenNurseDashboard={() => setPage("nurse")}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);