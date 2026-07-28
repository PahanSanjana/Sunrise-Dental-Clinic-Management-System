import React, { useState } from 'react';
import './Patients.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
    </svg>
  ),
  home: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
    </svg>
  ),
  cake: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2 1 3.5 1 2-1 3.5-1 2 1 3.5 1 2-1 3.5-1M12 4v4M9 4c0-1 .5-2 1.5-2M15 4c0-1-.5-2-1.5-2" />
    </svg>
  ),
  alert: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  edit: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  print: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" />
    </svg>
  ),
};

// ---------------------------------------------------------------
// Placeholder data — replace with your API call, keyed by patientId
// ---------------------------------------------------------------
const PATIENT = {
  id: 'PT-1042',
  name: 'Amara Perera',
  status: 'Active',
  dob: '14 March 1991',
  gender: 'Female',
  phone: '+94 71 234 5678',
  email: 'amara.perera@mail.com',
  address: '24 Lotus Grove, Colombo 05',
  emergencyContact: 'Nimal Perera · +94 77 812 4321',
  medicalHistory: 'Penicillin allergy. Root canal on lower left molar, 2023.',
};

const APPOINTMENT_HISTORY = [
  { date: '24 Jul 2026', title: 'Root canal — final session', sub: 'Dr. Silva · Completed' },
  { date: '10 Jun 2026', title: 'Root canal — session 2', sub: 'Dr. Silva · Completed' },
  { date: '22 May 2026', title: 'Consultation', sub: 'Dr. Silva · Completed' },
  { date: '3 Feb 2026', title: 'Routine cleaning', sub: 'Dr. Perera · Completed' },
];

const BILLING_HISTORY = [
  { date: '24 Jul 2026', title: 'Root canal — final session', sub: 'Invoice #INV-2216', amount: 'Rs. 28,000', status: 'completed' },
  { date: '10 Jun 2026', title: 'Root canal — session 2', sub: 'Invoice #INV-2189', amount: 'Rs. 22,000', status: 'completed' },
  { date: '22 May 2026', title: 'Consultation', sub: 'Invoice #INV-2144', amount: 'Rs. 3,500', status: 'completed' },
  { date: '3 Feb 2026', title: 'Routine cleaning', sub: 'Invoice #INV-2032', amount: 'Rs. 6,000', status: 'pending' },
];

const MEDICAL_NOTES = [
  { date: '24 Jul 2026', author: 'Dr. Silva', text: 'Final restoration placed, no sensitivity reported. Review in 6 months.' },
  { date: '10 Jun 2026', author: 'Dr. Silva', text: 'Canal cleaned and shaped, temporary filling placed. Patient tolerated procedure well.' },
  { date: '22 May 2026', author: 'Dr. Silva', text: 'Diagnosed irreversible pulpitis on tooth #36. Recommended root canal treatment.' },
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

const TABS = ['Appointments', 'Billing', 'Medical notes'];

const PatientDetails = ({ patient = PATIENT, onEdit, onBookAppointment }) => {
  const [activeTab, setActiveTab] = useState('Appointments');

  return (
    <div className="rp-page">
      <div className="rp-blob rp-blob-1" />
      <div className="rp-blob rp-blob-2" />

      <div className="rp-inner">
        <div className="rp-header">
          <div>
            <div className="rp-title">{patient.name}</div>
            <div className="rp-subtitle">
              {patient.id} · <span className={`status-badge ${patient.status.toLowerCase()}`}>{patient.status}</span>
            </div>
          </div>
          <div className="rp-header-actions no-print">
            <button className="rp-icon-btn" onClick={() => window.print()} aria-label="Print profile">
              <Icon.print />
            </button>
            <button className="rp-btn" onClick={onEdit}>
              <Icon.edit /> Edit
            </button>
            <button className="rp-btn primary" onClick={onBookAppointment}>
              <Icon.plus /> Book appointment
            </button>
          </div>
        </div>

        <div className="rp-details-grid">
          {/* Profile card */}
          <div className="glass-card rp-profile-card">
            <div className="rp-profile-avatar">{initials(patient.name)}</div>
            <div className="rp-profile-name">{patient.name}</div>
            <div className="rp-profile-id">{patient.id} · {patient.gender}</div>

            <div className="rp-profile-divider" />

            <div className="rp-profile-row">
              <Icon.cake />
              <div>
                <div className="rp-profile-row-label">Date of birth</div>
                <div className="rp-profile-row-value">{patient.dob}</div>
              </div>
            </div>
            <div className="rp-profile-row">
              <Icon.phone />
              <div>
                <div className="rp-profile-row-label">Contact</div>
                <div className="rp-profile-row-value">{patient.phone}</div>
              </div>
            </div>
            <div className="rp-profile-row">
              <Icon.mail />
              <div>
                <div className="rp-profile-row-label">Email</div>
                <div className="rp-profile-row-value">{patient.email}</div>
              </div>
            </div>
            <div className="rp-profile-row">
              <Icon.home />
              <div>
                <div className="rp-profile-row-label">Address</div>
                <div className="rp-profile-row-value">{patient.address}</div>
              </div>
            </div>

            <div className="rp-profile-divider" />

            <div className="rp-profile-row">
              <Icon.alert />
              <div>
                <div className="rp-profile-row-label">Emergency contact</div>
                <div className="rp-profile-row-value">{patient.emergencyContact}</div>
              </div>
            </div>
            <div className="rp-profile-row">
              <div>
                <div className="rp-profile-row-label">Medical history</div>
                <div className="rp-profile-row-value">{patient.medicalHistory}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="glass-card rp-tabs no-print">
              {TABS.map((t) => (
                <button key={t} className={`rp-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t}
                </button>
              ))}
            </div>

            <div className="glass-card rp-tab-panel">
              {activeTab === 'Appointments' && APPOINTMENT_HISTORY.map((a) => (
                <div className="rp-timeline-row" key={a.date + a.title}>
                  <div className="rp-timeline-date">{a.date}</div>
                  <div className="rp-timeline-info">
                    <div className="rp-timeline-title">{a.title}</div>
                    <div className="rp-timeline-sub">{a.sub}</div>
                  </div>
                </div>
              ))}

              {activeTab === 'Billing' && BILLING_HISTORY.map((b) => (
                <div className="rp-timeline-row" key={b.date + b.title}>
                  <div className="rp-timeline-date">{b.date}</div>
                  <div className="rp-timeline-info">
                    <div className="rp-timeline-title">{b.title}</div>
                    <div className="rp-timeline-sub">{b.sub}</div>
                  </div>
                  <span className={`status-badge ${b.status}`} style={{ marginRight: 12 }}>
                    {b.status === 'pending' ? 'Pending' : 'Paid'}
                  </span>
                  <div className="rp-timeline-amount">{b.amount}</div>
                </div>
              ))}

              {activeTab === 'Medical notes' && (
                <div style={{ padding: '8px 16px 16px' }}>
                  {MEDICAL_NOTES.map((n) => (
                    <div className="rp-note-card" key={n.date}>
                      <div className="rp-note-meta">{n.date} · {n.author}</div>
                      <div className="rp-note-text">{n.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
