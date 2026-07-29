import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import AdminNavbar from './components/Nav-bar/AdminNavbar';
import DashboardPage from './pages/Admin/DashboardPage';
import AdminPatientList from './pages/Admin/AdminPatientList';
import PatientForm from './pages/Admin/PatientForm';
import PatientDetails from './pages/Admin/PatientDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes wrapped in AdminNavbar */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminNavbar>
                <DashboardPage />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/patients"
            element={
              <AdminNavbar>
                <AdminPatientList />
              </AdminNavbar>
            }
          />

          {/* Patient Form - Add New Patient */}
          <Route
            path="/admin/patients/new"
            element={
              <AdminNavbar>
                <PatientForm />
              </AdminNavbar>
            }
          />

          {/* Patient Form - Edit Existing Patient */}
          <Route
            path="/admin/patients/:id/edit"
            element={
              <AdminNavbar>
                <PatientForm />
              </AdminNavbar>
            }
          />

          {/* Patient Details - View Patient Profile */}
          <Route
            path="/admin/patients/:id"
            element={
              <AdminNavbar>
                <PatientDetails />
              </AdminNavbar>
            }
          />

          {/* Fallback for any other admin routes */}
          <Route
            path="/admin/*"
            element={
              <AdminNavbar>
                <DashboardPage />
              </AdminNavbar>
            }
          />

          {/* Role-based Dashboard Routes (Dummy Pages) */}
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

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;