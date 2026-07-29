import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import AdminNavbar from './components/Nav-bar/AdminNavbar';
import DashboardPage from './pages/Admin/DashboardPage';
import AdminPatientList from './pages/Admin/AdminPatientList';
import PatientForm from './pages/Admin/PatientForm';
import PatientDetails from './pages/Admin/PatientDetails';
import AppointmentList from './pages/Admin/AppointmentList';
import AppointmentForm from './pages/Admin/AppointmentForm';
import AppointmentDetails from './pages/Admin/AppointmentDetails';

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

          {/* Patient Management Routes */}
          <Route
            path="/admin/patients"
            element={
              <AdminNavbar>
                <AdminPatientList />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/patients/new"
            element={
              <AdminNavbar>
                <PatientForm />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/patients/:id/edit"
            element={
              <AdminNavbar>
                <PatientForm />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/patients/:id"
            element={
              <AdminNavbar>
                <PatientDetails />
              </AdminNavbar>
            }
          />

          {/* Appointment Management Routes */}
          <Route
            path="/admin/appointments"
            element={
              <AdminNavbar>
                <AppointmentList />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/appointments/new"
            element={
              <AdminNavbar>
                <AppointmentForm />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/appointments/:id"
            element={
              <AdminNavbar>
                <AppointmentDetails />
              </AdminNavbar>
            }
          />

          <Route
            path="/admin/appointments/:id/edit"
            element={
              <AdminNavbar>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Edit Appointment</h2>
                  <p>Appointment edit form coming soon...</p>
                </div>
              </AdminNavbar>
            }
          />

          {/* Billing Routes (Placeholder) */}
          <Route
            path="/admin/bills/new"
            element={
              <AdminNavbar>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Generate Bill</h2>
                  <p>Bill generation form coming soon...</p>
                </div>
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