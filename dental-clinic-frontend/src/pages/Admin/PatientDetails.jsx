import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PatientDetails.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    MapPin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    HeartPulse: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></svg>),
    Pill: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10.5 5.5 18 13M5.5 10.5 13 18M15 3l6 6M3 15l6 6" /></svg>),
    Shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const PATIENT_DATA = {
    id: 'PT-1042',
    fullName: 'Amara Perera',
    gender: 'Female',
    age: 35,
    dob: '1991-05-15',
    phone: '+94 71 234 5678',
    email: 'amara.perera@mail.com',
    address: '45/A, Temple Road, Colombo 03, Sri Lanka',
    registrationDate: '2026-07-24',
    lastVisit: '2026-07-28',
    status: 'Active',
    portalAccess: true,
    medicalHistory: 'Patient has a history of mild hypertension. No known cardiac issues. Previous dental treatments include 2 root canals and routine cleanings.',
    allergies: 'Penicillin (mild rash), Latex (contact allergy)',
    currentMedications: 'Lisinopril 10mg daily, Vitamin D supplement 1000IU daily',
    emergencyName: 'Nimal Perera (Spouse)',
    emergencyPhone: '+94 77 987 6543',
    referralSource: 'Friend/Family',
    notes: 'Prefers morning appointments. Has dental anxiety - please use gentle approach.',
};

const APPOINTMENTS = [
    { id: 'APT-1034', date: '2026-07-28', time: '9:00 AM', dentist: 'Dr. Silva', treatment: 'Root Canal', status: 'completed' },
    { id: 'APT-1033', date: '2026-07-15', time: '10:30 AM', dentist: 'Dr. Perera', treatment: 'Cleaning', status: 'completed' },
    { id: 'APT-1032', date: '2026-06-28', time: '2:00 PM', dentist: 'Dr. Silva', treatment: 'Consultation', status: 'completed' },
    { id: 'APT-1031', date: '2026-06-10', time: '11:00 AM', dentist: 'Dr. Perera', treatment: 'Filling', status: 'completed' },
    { id: 'APT-1030', date: '2026-05-25', time: '3:30 PM', dentist: 'Dr. Silva', treatment: 'Extraction', status: 'completed' },
    { id: 'APT-1029', date: '2026-08-05', time: '9:30 AM', dentist: 'Dr. Perera', treatment: 'Root Canal Follow-up', status: 'confirmed' },
    { id: 'APT-1028', date: '2026-08-12', time: '11:00 AM', dentist: 'Dr. Silva', treatment: 'Crown Placement', status: 'confirmed' },
];

const BILLS = [
    { id: 'BIL-1089', date: '2026-07-28', amount: 18500, status: 'paid', paymentMethod: 'Card' },
    { id: 'BIL-1088', date: '2026-07-15', amount: 8500, status: 'paid', paymentMethod: 'Cash' },
    { id: 'BIL-1087', date: '2026-06-28', amount: 2500, status: 'paid', paymentMethod: 'Cash' },
    { id: 'BIL-1086', date: '2026-06-10', amount: 12000, status: 'paid', paymentMethod: 'Card' },
    { id: 'BIL-1085', date: '2026-05-25', amount: 4500, status: 'paid', paymentMethod: 'Cash' },
    { id: 'BIL-1084', date: '2026-07-28', amount: 32000, status: 'pending', paymentMethod: null },
];

const TREATMENTS = [
    { id: 'TRT-0056', type: 'Root Canal', dentist: 'Dr. Silva', date: '2026-07-28', notes: 'Procedure completed successfully. Patient tolerated well.' },
    { id: 'TRT-0055', type: 'Dental Cleaning', dentist: 'Dr. Perera', date: '2026-07-15', notes: 'Regular scaling and polishing. Some sensitivity noted.' },
    { id: 'TRT-0054', type: 'Composite Filling', dentist: 'Dr. Perera', date: '2026-06-10', notes: 'Filling placed on tooth #14. Patient reported no issues.' },
    { id: 'TRT-0053', type: 'Extraction', dentist: 'Dr. Silva', date: '2026-05-25', notes: 'Extraction of tooth #18. Healing progressing well.' },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getStatusBadge(status) {
    const classes = {
        'active': 'badge-success',
        'inactive': 'badge-neutral',
        'paid': 'badge-success',
        'pending': 'badge-warning',
        'completed': 'badge-success',
        'confirmed': 'badge-info',
        'cancelled': 'badge-danger',
    };
    return classes[status.toLowerCase()] || 'badge-neutral';
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('overview');
    const [appointmentFilter, setAppointmentFilter] = useState({ from: '', to: '' });
    const [billFilter, setBillFilter] = useState({ from: '', to: '' });

    // In a real app, fetch patient data based on id
    const patient = PATIENT_DATA;
    const appointments = APPOINTMENTS;
    const bills = BILLS;
    const treatments = TREATMENTS;

    // Filter appointments by date range
    const filteredAppointments = useMemo(() => {
        return appointments.filter(app => {
            const matchesFrom = !appointmentFilter.from || app.date >= appointmentFilter.from;
            const matchesTo = !appointmentFilter.to || app.date <= appointmentFilter.to;
            return matchesFrom && matchesTo;
        });
    }, [appointments, appointmentFilter]);

    // Filter bills by date range
    const filteredBills = useMemo(() => {
        return bills.filter(bill => {
            const matchesFrom = !billFilter.from || bill.date >= billFilter.from;
            const matchesTo = !billFilter.to || bill.date <= billFilter.to;
            return matchesFrom && matchesTo;
        });
    }, [bills, billFilter]);

    const totalBilled = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const totalPaid = bills.filter(b => b.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
    const pendingAmount = bills.filter(b => b.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0);

    // Action Handlers
    const handleBack = () => navigate('/admin/patients');
    const handleEdit = () => navigate(`/admin/patients/${id}/edit`);
    const handleBookAppointment = () => navigate(`/admin/appointments/new?patient=${id}`);
    const handleGenerateBill = () => navigate(`/admin/bills/new?patient=${id}`);

    // Summary Card Data
    const summaryData = [
        { label: 'Total Appointments', value: appointments.length, icon: 'Calendar', tint: 'tint-sky' },
        { label: 'Total Bills', value: bills.length, icon: 'Receipt', tint: 'tint-mist' },
        { label: 'Amount Billed', value: formatCurrency(totalBilled), icon: 'FileText', tint: 'tint-sage' },
        { label: 'Pending Amount', value: formatCurrency(pendingAmount), icon: 'Clock', tint: 'tint-amber' },
    ];

    return (
        <div className="pd-page">
            <div className="pd-blob pd-blob-1" />
            <div className="pd-blob pd-blob-2" />

            <div className="pd-inner">
                {/* Header */}
                <div className="pd-header">
                    <button className="pd-back-btn" onClick={handleBack}>
                        <Icon.ArrowLeft /> Back to Patients
                    </button>
                    <div className="pd-title-area">
                        <div className="pd-title-row">
                            <div className="pd-title-with-avatar">
                                <div className="pd-avatar-large">
                                    {getInitials(patient.fullName)}
                                </div>
                                <div>
                                    <h1 className="pd-title">{patient.fullName}</h1>
                                    <div className="pd-id-row">
                                        <span className="pd-patient-id">{patient.id}</span>
                                        <span className={`pd-status-badge ${getStatusBadge(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="pd-actions">
                                <button className="pd-btn primary" onClick={handleEdit}>
                                    <Icon.Edit /> Edit
                                </button>
                                <button className="pd-btn secondary" onClick={handleBookAppointment}>
                                    <Icon.Calendar /> Book Appointment
                                </button>
                                <button className="pd-btn secondary" onClick={handleGenerateBill}>
                                    <Icon.Receipt /> Generate Bill
                                </button>
                            </div>
                        </div>
                        <p className="pd-subtitle">Patient profile • Registered {formatDate(patient.registrationDate)} • Last visit {formatDate(patient.lastVisit)}</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="pd-stats-grid">
                    {summaryData.map((stat, idx) => {
                        const IconComponent = Icon[stat.icon];
                        return (
                            <div className="glass-card pd-stat-card" key={idx}>
                                <div className={`pd-stat-icon ${stat.tint}`}>
                                    <IconComponent />
                                </div>
                                <div className="pd-stat-label">{stat.label}</div>
                                <div className="pd-stat-value">{stat.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="pd-tabs">
                    <button
                        className={`pd-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <Icon.User /> Overview
                    </button>
                    <button
                        className={`pd-tab ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        <Icon.Calendar /> Appointments
                    </button>
                    <button
                        className={`pd-tab ${activeTab === 'bills' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bills')}
                    >
                        <Icon.Receipt /> Billing History
                    </button>
                    <button
                        className={`pd-tab ${activeTab === 'treatments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('treatments')}
                    >
                        <Icon.HeartPulse /> Treatment History
                    </button>
                </div>

                {/* Tab Content */}
                <div className="pd-tab-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="pd-overview-grid">
                            {/* Personal Information */}
                            <div className="glass-card pd-info-card">
                                <div className="pd-card-header">
                                    <div className="pd-card-icon"><Icon.User /></div>
                                    <div className="pd-card-title">Personal Information</div>
                                </div>
                                <div className="pd-info-grid">
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Full Name</span>
                                        <span className="pd-info-value">{patient.fullName}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Gender</span>
                                        <span className="pd-info-value">{patient.gender}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Date of Birth</span>
                                        <span className="pd-info-value">{formatDate(patient.dob)} (Age {patient.age})</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Phone</span>
                                        <span className="pd-info-value">{patient.phone}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Email</span>
                                        <span className="pd-info-value">{patient.email}</span>
                                    </div>
                                    <div className="pd-info-item span-2">
                                        <span className="pd-info-label">Address</span>
                                        <span className="pd-info-value">{patient.address}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Portal Access</span>
                                        <span className={`pd-badge ${patient.portalAccess ? 'badge-success' : 'badge-neutral'}`}>
                                            {patient.portalAccess ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Referral Source</span>
                                        <span className="pd-info-value">{patient.referralSource}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Information */}
                            <div className="glass-card pd-info-card">
                                <div className="pd-card-header">
                                    <div className="pd-card-icon"><Icon.HeartPulse /></div>
                                    <div className="pd-card-title">Medical Information</div>
                                </div>
                                <div className="pd-medical-grid">
                                    <div className="pd-info-item span-2">
                                        <span className="pd-info-label">Medical History</span>
                                        <span className="pd-info-value">{patient.medicalHistory}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Allergies</span>
                                        <span className="pd-info-value">{patient.allergies}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Current Medications</span>
                                        <span className="pd-info-value">{patient.currentMedications}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Emergency Contact</span>
                                        <span className="pd-info-value">{patient.emergencyName}</span>
                                    </div>
                                    <div className="pd-info-item">
                                        <span className="pd-info-label">Emergency Phone</span>
                                        <span className="pd-info-value">{patient.emergencyPhone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="glass-card pd-info-card span-2">
                                <div className="pd-card-header">
                                    <div className="pd-card-icon"><Icon.FileText /></div>
                                    <div className="pd-card-title">Notes & Remarks</div>
                                </div>
                                <p className="pd-notes">{patient.notes}</p>
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="glass-card pd-table-card">
                            <div className="pd-table-header">
                                <div className="pd-table-title">
                                    <Icon.Calendar /> Appointment History
                                </div>
                                <div className="pd-table-filters">
                                    <input
                                        type="date"
                                        className="pd-filter-input"
                                        value={appointmentFilter.from}
                                        onChange={(e) => setAppointmentFilter(f => ({ ...f, from: e.target.value }))}
                                    />
                                    <span className="pd-filter-sep">to</span>
                                    <input
                                        type="date"
                                        className="pd-filter-input"
                                        value={appointmentFilter.to}
                                        onChange={(e) => setAppointmentFilter(f => ({ ...f, to: e.target.value }))}
                                    />
                                    {(appointmentFilter.from || appointmentFilter.to) && (
                                        <button
                                            className="pd-filter-clear"
                                            onClick={() => setAppointmentFilter({ from: '', to: '' })}
                                        >
                                            <Icon.X /> Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="pd-table-wrap">
                                <table className="pd-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Dentist</th>
                                            <th>Treatment</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="pd-empty">No appointments found</td>
                                            </tr>
                                        ) : (
                                            filteredAppointments.map(app => (
                                                <tr key={app.id}>
                                                    <td>{formatDate(app.date)}</td>
                                                    <td>{app.time}</td>
                                                    <td>{app.dentist}</td>
                                                    <td>{app.treatment}</td>
                                                    <td><span className={`pd-badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === 'bills' && (
                        <>
                            <div className="pd-bill-summary">
                                <div className="glass-card pd-bill-stat">
                                    <span className="pd-bill-stat-label">Total Billed</span>
                                    <span className="pd-bill-stat-value">{formatCurrency(totalBilled)}</span>
                                </div>
                                <div className="glass-card pd-bill-stat">
                                    <span className="pd-bill-stat-label">Total Paid</span>
                                    <span className="pd-bill-stat-value" style={{ color: '#4A7A64' }}>{formatCurrency(totalPaid)}</span>
                                </div>
                                <div className="glass-card pd-bill-stat">
                                    <span className="pd-bill-stat-label">Pending</span>
                                    <span className="pd-bill-stat-value" style={{ color: '#C4954C' }}>{formatCurrency(pendingAmount)}</span>
                                </div>
                            </div>

                            <div className="glass-card pd-table-card">
                                <div className="pd-table-header">
                                    <div className="pd-table-title">
                                        <Icon.Receipt /> Billing History
                                    </div>
                                    <div className="pd-table-filters">
                                        <input
                                            type="date"
                                            className="pd-filter-input"
                                            value={billFilter.from}
                                            onChange={(e) => setBillFilter(f => ({ ...f, from: e.target.value }))}
                                        />
                                        <span className="pd-filter-sep">to</span>
                                        <input
                                            type="date"
                                            className="pd-filter-input"
                                            value={billFilter.to}
                                            onChange={(e) => setBillFilter(f => ({ ...f, to: e.target.value }))}
                                        />
                                        {(billFilter.from || billFilter.to) && (
                                            <button
                                                className="pd-filter-clear"
                                                onClick={() => setBillFilter({ from: '', to: '' })}
                                            >
                                                <Icon.X /> Clear
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="pd-table-wrap">
                                    <table className="pd-table">
                                        <thead>
                                            <tr>
                                                <th>Bill Number</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Payment Method</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBills.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="pd-empty">No bills found</td>
                                                </tr>
                                            ) : (
                                                filteredBills.map(bill => (
                                                    <tr key={bill.id}>
                                                        <td className="pd-bill-id">{bill.id}</td>
                                                        <td>{formatDate(bill.date)}</td>
                                                        <td>{formatCurrency(bill.amount)}</td>
                                                        <td><span className={`pd-badge ${getStatusBadge(bill.status)}`}>{bill.status}</span></td>
                                                        <td>{bill.paymentMethod || '-'}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Treatments Tab */}
                    {activeTab === 'treatments' && (
                        <div className="glass-card pd-table-card">
                            <div className="pd-table-header">
                                <div className="pd-table-title">
                                    <Icon.HeartPulse /> Treatment History
                                </div>
                                <div className="pd-export-actions">
                                    <button className="pd-btn small secondary">
                                        <Icon.Download /> Export
                                    </button>
                                    <button className="pd-btn small secondary">
                                        <Icon.Printer /> Print
                                    </button>
                                </div>
                            </div>
                            <div className="pd-table-wrap">
                                <table className="pd-table">
                                    <thead>
                                        <tr>
                                            <th>Treatment</th>
                                            <th>Dentist</th>
                                            <th>Date</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {treatments.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="pd-empty">No treatments recorded</td>
                                            </tr>
                                        ) : (
                                            treatments.map(treatment => (
                                                <tr key={treatment.id}>
                                                    <td className="pd-treatment-type">{treatment.type}</td>
                                                    <td>{treatment.dentist}</td>
                                                    <td>{formatDate(treatment.date)}</td>
                                                    <td className="pd-treatment-notes">{treatment.notes}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;