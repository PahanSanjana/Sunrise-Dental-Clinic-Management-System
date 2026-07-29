import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import AdminNavbar from './components/Nav-bar/AdminNavbar';
import DashboardPage from './pages/Admin/DashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard wrapped in Admin Navbar */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminNavbar>
                <DashboardPage />
              </AdminNavbar>
            }
          />
          
          {/* Fallback Admin Sub-routes wrapped in Admin Navbar */}
          <Route
            path="/admin/*"
            element={
              <AdminNavbar>
                <DashboardPage />
              </AdminNavbar>
            }
          />

          <Route path="/dentist/dashboard" element={
            <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
              <h2>Dentist Dashboard</h2>
              <p>Welcome, Dentist! (Dummy Page)</p>
              <a href="/login" style={{ color: '#2F3E3C', textDecoration: 'underline' }}>Back to Login</a>
            </div>
          } />
          <Route path="/patient/dashboard" element={
            <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
              <h2>Patient Portal</h2>
              <p>Welcome, Patient! (Dummy Page)</p>
              <a href="/login" style={{ color: '#2F3E3C', textDecoration: 'underline' }}>Back to Login</a>
            </div>
          } />
          <Route path="/receptionist/dashboard" element={
            <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
              <h2>Receptionist Desk</h2>
              <p>Welcome, Receptionist! (Dummy Page)</p>
              <a href="/login" style={{ color: '#2F3E3C', textDecoration: 'underline' }}>Back to Login</a>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;