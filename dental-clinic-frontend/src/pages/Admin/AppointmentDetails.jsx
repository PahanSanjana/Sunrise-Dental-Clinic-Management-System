import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Css/AppointmentDetails.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    Dentist: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v4M12 18v4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M4.5 12h4M15.5 12h4M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    Ban: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const APPOINTMENT_DATA = {
    id: 'APT-1034',
    patient: {
        id: 'PT-1042',
        name: 'Amara Perera',
        phone: '+94 71 234 5678',
        email: 'amara.perera@mail.com',
        dob: '1991-05-15',
        gender: 'Female',
    },
    dentist: {
        id: 'D-001',
        name: 'Dr. Silva',
        specialization: 'General Dentistry',
    },
    treatment: {
        id: 'TRT-002',
        name: 'Root Canal',
        cost: 18500,
        duration: 90,
    },
    date: '2026-07-28',
    time: '09:00',
    status: 'confirmed',
    notes: 'Patient has dental anxiety. Please use gentle approach and explain each step.',
    createdAt: '2026-07-25T10:30:00',
    updatedAt: '2026-07-27T14:20:00',
    billGenerated: true,
    billId: 'BIL-1089',
    billAmount: 18500,
    billStatus: 'paid',
    reminders: [
        { type: 'SMS', sentAt: '2026-07-27T09:00:00', status: 'delivered' },
        { type: 'Email', sentAt: '2026-07-27T09:05:00', status: 'delivered' },
    ],
    timeline: [
        { event: 'Appointment booked', timestamp: '2026-07-25T10:30:00', user: 'Receptionist' },
        { event: 'Reminder sent', timestamp: '2026-07-27T09:00:00', user: 'System' },
        { event: 'Appointment confirmed', timestamp: '2026-07-27T14:20:00', user: 'Patient' },
    ],
};

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(iso) {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

function getStatusBadge(status) {
    const classes = {
        'scheduled': 'badge-info',
        'confirmed': 'badge-success',
        'completed': 'badge-success',
        'cancelled': 'badge-danger',
        'no-show': 'badge-warning',
        'pending': 'badge-warning',
        'paid': 'badge-success',
        'delivered': 'badge-success',
    };
    return classes[status.toLowerCase()] || 'badge-neutral';
}

function getStatusLabel(status) {
    const labels = {
        'scheduled': 'Scheduled',
        'confirmed': 'Confirmed',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
        'no-show': 'No-Show',
        'pending': 'Pending',
        'paid': 'Paid',
        'delivered': 'Delivered',
    };
    return labels[status.toLowerCase()] || status;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const AppointmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // In a real app, fetch appointment data based on id
    const appointment = APPOINTMENT_DATA;
    const patient = appointment.patient;
    const dentist = appointment.dentist;
    const treatment = appointment.treatment;

    // Handlers
    const handleBack = () => navigate('/admin/appointments');
    const handleEdit = () => navigate(`/admin/appointments/${id}/edit`);
    const handleGenerateBill = () => navigate(`/admin/bills/new?appointment=${id}`);
    const handleViewPatient = () => navigate(`/admin/patients/${patient.id}`);

    const handleStatusChange = (newStatus) => {
        setIsUpdating(true);
        // Simulate API call
        setTimeout(() => {
            // Update status in real app
            setIsUpdating(false);
            alert(`Appointment status updated to ${newStatus}`);
        }, 500);
    };

    const handleCancel = () => {
        if (!cancelReason.trim()) {
            alert('Please provide a reason for cancellation');
            return;
        }
        setIsUpdating(true);
        // Simulate API call
        setTimeout(() => {
            setIsUpdating(false);
            setShowCancelModal(false);
            setCancelReason('');
            alert('Appointment cancelled successfully');
        }, 500);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExport = () => {
        alert('Exporting appointment details...');
    };

    // Check if appointment is in the past
    const isPast = new Date(`${appointment.date}T${appointment.time}`) < new Date();
    const isUpcoming = !isPast && ['scheduled', 'confirmed'].includes(appointment.status);

    return (
        <div className="ad-page">
            <div className="ad-blob ad-blob-1" />
            <div className="ad-blob ad-blob-2" />

            <div className="ad-inner">
                {/* Header */}
                <div className="ad-header">
                    <button className="ad-back-btn" onClick={handleBack}>
                        <Icon.ArrowLeft /> Back to Appointments
                    </button>
                    <div className="ad-title-area">
                        <div className="ad-title-row">
                            <div>
                                <h1 className="ad-title">Appointment Details</h1>
                                <div className="ad-id-row">
                                    <span className="ad-appointment-id">{appointment.id}</span>
                                    <span className={`ad-status-badge ${getStatusBadge(appointment.status)}`}>
                                        {getStatusLabel(appointment.status)}
                                    </span>
                                    {isUpcoming && <span className="ad-upcoming-badge">Upcoming</span>}
                                    {isPast && appointment.status === 'confirmed' && (
                                        <span className="ad-past-badge">Past Due</span>
                                    )}
                                </div>
                            </div>
                            <div className="ad-actions">
                                <button className="ad-btn secondary" onClick={handlePrint}>
                                    <Icon.Printer /> Print
                                </button>
                                <button className="ad-btn secondary" onClick={handleExport}>
                                    <Icon.Download /> Export
                                </button>
                                <button className="ad-btn primary" onClick={handleEdit}>
                                    <Icon.Edit /> Edit
                                </button>
                            </div>
                        </div>
                        <p className="ad-subtitle">
                            Created {formatDateTime(appointment.createdAt)} • Last updated {formatDateTime(appointment.updatedAt)}
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="ad-quick-actions">
                    <button className="ad-btn secondary" onClick={handleViewPatient}>
                        <Icon.User /> View Patient
                    </button>
                    {!appointment.billGenerated && (
                        <button className="ad-btn secondary" onClick={handleGenerateBill}>
                            <Icon.Receipt /> Generate Bill
                        </button>
                    )}
                    {appointment.billGenerated && (
                        <div className="ad-bill-status">
                            <span className="ad-bill-label">Bill {appointment.billId}</span>
                            <span className={`ad-badge ${getStatusBadge(appointment.billStatus)}`}>
                                {getStatusLabel(appointment.billStatus)}
                            </span>
                            <span className="ad-bill-amount">{formatCurrency(appointment.billAmount)}</span>
                        </div>
                    )}
                    {['scheduled', 'confirmed'].includes(appointment.status) && !isPast && (
                        <button className="ad-btn danger" onClick={() => setShowCancelModal(true)}>
                            <Icon.Ban /> Cancel Appointment
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="ad-tabs">
                    <button
                        className={`ad-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <Icon.FileText /> Overview
                    </button>
                    <button
                        className={`ad-tab ${activeTab === 'patient' ? 'active' : ''}`}
                        onClick={() => setActiveTab('patient')}
                    >
                        <Icon.User /> Patient Info
                    </button>
                    <button
                        className={`ad-tab ${activeTab === 'timeline' ? 'active' : ''}`}
                        onClick={() => setActiveTab('timeline')}
                    >
                        <Icon.Clock /> Timeline
                    </button>
                    <button
                        className={`ad-tab ${activeTab === 'reminders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reminders')}
                    >
                        <Icon.AlertCircle /> Reminders
                    </button>
                </div>

                {/* Tab Content */}
                <div className="ad-tab-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="ad-overview-grid">
                            {/* Appointment Details */}
                            <div className="glass-card ad-info-card">
                                <div className="ad-card-header">
                                    <div className="ad-card-icon"><Icon.Calendar /></div>
                                    <div className="ad-card-title">Appointment Details</div>
                                </div>
                                <div className="ad-info-grid">
                                    <div className="ad-info-item">
                                        <span className="ad-info-label">Date</span>
                                        <span className="ad-info-value">{formatDate(appointment.date)}</span>
                                    </div>
                                    <div className="ad-info-item">
                                        <span className="ad-info-label">Time</span>
                                        <span className="ad-info-value">{formatTime(appointment.time)}</span>
                                    </div>
                                    <div className="ad-info-item span-2">
                                        <span className="ad-info-label">Treatment</span>
                                        <span className="ad-info-value">{treatment.name}</span>
                                        <span className="ad-info-sub">{treatment.duration} min • {formatCurrency(treatment.cost)}</span>
                                    </div>
                                    <div className="ad-info-item span-2">
                                        <span className="ad-info-label">Dentist</span>
                                        <span className="ad-info-value">{dentist.name}</span>
                                        <span className="ad-info-sub">{dentist.specialization}</span>
                                    </div>
                                    <div className="ad-info-item span-2">
                                        <span className="ad-info-label">Notes</span>
                                        <span className="ad-info-value">{appointment.notes || 'No notes provided'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Summary */}
                            <div className="glass-card ad-info-card">
                                <div className="ad-card-header">
                                    <div className="ad-card-icon"><Icon.User /></div>
                                    <div className="ad-card-title">Patient Summary</div>
                                </div>
                                <div className="ad-patient-summary">
                                    <div className="ad-patient-avatar-large">{getInitials(patient.name)}</div>
                                    <div className="ad-patient-details">
                                        <div className="ad-patient-name">{patient.name}</div>
                                        <div className="ad-patient-id">{patient.id}</div>
                                        <div className="ad-patient-contact">
                                            <Icon.Phone className="ad-contact-icon" /> {patient.phone}
                                        </div>
                                        <div className="ad-patient-contact">
                                            <Icon.Mail className="ad-contact-icon" /> {patient.email}
                                        </div>
                                        <button className="ad-btn small secondary" onClick={handleViewPatient}>
                                            View Full Profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Status Actions */}
                            <div className="glass-card ad-info-card span-2">
                                <div className="ad-card-header">
                                    <div className="ad-card-icon"><Icon.Check /></div>
                                    <div className="ad-card-title">Status Actions</div>
                                </div>
                                <div className="ad-status-actions">
                                    <button
                                        className="ad-btn small secondary"
                                        onClick={() => handleStatusChange('confirmed')}
                                        disabled={appointment.status === 'confirmed'}
                                    >
                                        <Icon.Check /> Confirm
                                    </button>
                                    <button
                                        className="ad-btn small secondary"
                                        onClick={() => handleStatusChange('completed')}
                                        disabled={appointment.status === 'completed'}
                                    >
                                        <Icon.Check /> Mark Completed
                                    </button>
                                    <button
                                        className="ad-btn small danger"
                                        onClick={() => handleStatusChange('no-show')}
                                        disabled={appointment.status === 'no-show'}
                                    >
                                        <Icon.X /> Mark No-Show
                                    </button>
                                    <button
                                        className="ad-btn small danger"
                                        onClick={() => setShowCancelModal(true)}
                                        disabled={appointment.status === 'cancelled'}
                                    >
                                        <Icon.Ban /> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Patient Info Tab */}
                    {activeTab === 'patient' && (
                        <div className="glass-card ad-info-card">
                            <div className="ad-card-header">
                                <div className="ad-card-icon"><Icon.User /></div>
                                <div className="ad-card-title">Complete Patient Information</div>
                            </div>
                            <div className="ad-info-grid ad-patient-full">
                                <div className="ad-info-item span-2">
                                    <span className="ad-info-label">Full Name</span>
                                    <span className="ad-info-value">{patient.name}</span>
                                </div>
                                <div className="ad-info-item">
                                    <span className="ad-info-label">Patient ID</span>
                                    <span className="ad-info-value">{patient.id}</span>
                                </div>
                                <div className="ad-info-item">
                                    <span className="ad-info-label">Gender</span>
                                    <span className="ad-info-value">{patient.gender}</span>
                                </div>
                                <div className="ad-info-item">
                                    <span className="ad-info-label">Date of Birth</span>
                                    <span className="ad-info-value">{formatDate(patient.dob)}</span>
                                </div>
                                <div className="ad-info-item">
                                    <span className="ad-info-label">Age</span>
                                    <span className="ad-info-value">
                                        {new Date().getFullYear() - new Date(patient.dob).getFullYear()} years
                                    </span>
                                </div>
                                <div className="ad-info-item">
                                    <span className="ad-info-label">Phone</span>
                                    <span className="ad-info-value">{patient.phone}</span>
                                </div>
                                <div className="ad-info-item">
                                    <span className="ad-info-label">Email</span>
                                    <span className="ad-info-value">{patient.email}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === 'timeline' && (
                        <div className="glass-card ad-info-card">
                            <div className="ad-card-header">
                                <div className="ad-card-icon"><Icon.Clock /></div>
                                <div className="ad-card-title">Appointment Timeline</div>
                            </div>
                            <div className="ad-timeline">
                                {appointment.timeline.map((item, index) => (
                                    <div key={index} className="ad-timeline-item">
                                        <div className="ad-timeline-dot" />
                                        {index < appointment.timeline.length - 1 && <div className="ad-timeline-line" />}
                                        <div className="ad-timeline-content">
                                            <div className="ad-timeline-event">{item.event}</div>
                                            <div className="ad-timeline-meta">
                                                <span className="ad-timeline-time">{formatDateTime(item.timestamp)}</span>
                                                <span className="ad-timeline-user">by {item.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reminders Tab */}
                    {activeTab === 'reminders' && (
                        <div className="glass-card ad-info-card">
                            <div className="ad-card-header">
                                <div className="ad-card-icon"><Icon.AlertCircle /></div>
                                <div className="ad-card-title">Reminders & Notifications</div>
                            </div>
                            {appointment.reminders.length === 0 ? (
                                <div className="ad-empty-state">
                                    <p>No reminders sent for this appointment</p>
                                </div>
                            ) : (
                                <div className="ad-reminders">
                                    {appointment.reminders.map((reminder, index) => (
                                        <div key={index} className="ad-reminder-item">
                                            <div className="ad-reminder-type">
                                                <span className={`ad-reminder-badge ${reminder.type.toLowerCase()}`}>
                                                    {reminder.type}
                                                </span>
                                            </div>
                                            <div className="ad-reminder-info">
                                                <div className="ad-reminder-date">Sent: {formatDateTime(reminder.sentAt)}</div>
                                                <div className={`ad-reminder-status ${reminder.status}`}>
                                                    Status: {getStatusLabel(reminder.status)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="ad-reminder-actions">
                                <button className="ad-btn secondary">
                                    <Icon.AlertCircle /> Send Reminder
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="ad-modal-overlay" onClick={() => setShowCancelModal(false)}>
                    <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="ad-modal-header">
                            <h3>Cancel Appointment</h3>
                            <button className="ad-modal-close" onClick={() => setShowCancelModal(false)}>✕</button>
                        </div>
                        <div className="ad-modal-body">
                            <p>Are you sure you want to cancel this appointment?</p>
                            <div className="ad-modal-field">
                                <label className="ad-label">Reason for cancellation</label>
                                <textarea
                                    className="ad-textarea"
                                    rows="3"
                                    placeholder="Please provide a reason..."
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ad-modal-footer">
                            <button className="ad-btn secondary" onClick={() => setShowCancelModal(false)}>
                                Keep Appointment
                            </button>
                            <button className="ad-btn danger" onClick={handleCancel} disabled={isUpdating}>
                                {isUpdating ? 'Cancelling...' : 'Yes, Cancel Appointment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentDetails;