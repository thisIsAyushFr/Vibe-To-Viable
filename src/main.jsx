import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import HospitalLanding from './components/HospitalLanding.jsx';
import DoctorDashboard from './DoctorDashboard.jsx';

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

  if (page === "doctor") {
    return <DoctorDashboard />;
  }

  return (
    <HospitalLanding
      user={user}
      onLoginSuccess={handleLogin}
      onLogout={handleLogout}
      onOpenDoctorDashboard={() => setPage("doctor")}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);