import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ReceptionistDashboard';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    UserPlus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>),
    Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
    Bell: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
    Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    LogOut: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>),
    CheckIn: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const TODAY = '2026-07-31';
const CURRENT_TIME = '10:45';

const TODAY_APPOINTMENTS = [
    { id: 'APT-1034', time: '09:00', patient: 'Amara Perera', dentist: 'Dr. Silva', treatment: 'Root Canal', status: 'completed' },
    { id: 'APT-1033', time: '10:30', patient: 'Nadun Fernando', dentist: 'Dr. Perera', treatment: 'Cleaning', status: 'in-progress' },
    { id: 'APT-1032', time: '11:30', patient: 'Ishara Gunaratne', dentist: 'Dr. Silva', treatment: 'Consultation', status: 'confirmed' },
    { id: 'APT-1031', time: '13:00', patient: 'Kavindu Jayasuriya', dentist: 'Dr. Perera', treatment: 'Whitening', status: 'confirmed' },
    { id: 'APT-1030', time: '14:30', patient: 'Sanduni Wickrama', dentist: 'Dr. Silva', treatment: 'Filling', status: 'scheduled' },
    { id: 'APT-1029', time: '16:00', patient: 'Tharindu Bandara', dentist: 'Dr. Perera', treatment: 'Extraction', status: 'scheduled' },
    { id: 'APT-1028', time: '08:30', patient: 'Dilini Rathnayake', dentist: 'Dr. Silva', treatment: 'Root Canal', status: 'no-show' },
];

const WAITING_PATIENTS = [
    { id: 'PT-1041', name: 'Nadun Fernando', checkIn: '10:15', estimatedWait: '15 min', appointmentId: 'APT-1033' },
    { id: 'PT-1040', name: 'Ishara Gunaratne', checkIn: '10:45', estimatedWait: '30 min', appointmentId: 'APT-1032' },
];

const PENDING_TASKS = [
    { id: 'TASK-001', type: 'unconfirmed', description: 'Appointment confirmation needed', patient: 'Kavindu Jayasuriya', time: '13:00' },
    { id: 'TASK-002', type: 'pending-bill', description: 'Payment pending', patient: 'Sanduni Wickrama', amount: 8500 },
    { id: 'TASK-003', type: 'call-back', description: 'Patient requested call back', patient: 'Yashodha Silva', priority: 'High' },
];

const NOTIFICATIONS = [
    { id: 'NOT-001', type: 'reminder', message: 'Send reminder to Amara Perera for tomorrow\'s appointment', time: '1 hour ago' },
    { id: 'NOT-002', type: 'message', message: 'New message from Dr. Silva regarding patient treatment', time: '2 hours ago' },
    { id: 'NOT-003', type: 'reminder', message: 'Send reminder to Nadun Fernando for follow-up', time: '3 hours ago' },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
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
        'no-show': 'badge-danger',
        'in-progress': 'badge-warning',
        'pending': 'badge-warning',
    };
    return classes[status] || 'badge-neutral';
}

function getStatusLabel(status) {
    const labels = {
        'scheduled': 'Scheduled',
        'confirmed': 'Confirmed',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
        'no-show': 'No-Show',
        'in-progress': 'In Progress',
        'pending': 'Pending',
    };
    return labels[status] || status;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const ReceptionistDashboard = ({ receptionistName = 'Kumari Rathnayake' }) => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedDate, setSelectedDate] = useState(TODAY);

    // Update time every minute
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Statistics
    const stats = useMemo(() => {
        const todayApps = TODAY_APPOINTMENTS.filter(a => a.status !== 'cancelled');
        const completed = TODAY_APPOINTMENTS.filter(a => a.status === 'completed').length;
        const confirmed = TODAY_APPOINTMENTS.filter(a => a.status === 'confirmed' || a.status === 'scheduled').length;
        const inProgress = TODAY_APPOINTMENTS.filter(a => a.status === 'in-progress').length;
        const noShows = TODAY_APPOINTMENTS.filter(a => a.status === 'no-show').length;
        const waiting = WAITING_PATIENTS.length;

        // Calculate revenue (mock)
        const todayRevenue = 18500 + 8500 + 2500 + 15000 + 4500 + 18500; // Sum of completed/completed treatments

        return {
            total: todayApps.length,
            completed,
            confirmed,
            inProgress,
            noShows,
            waiting,
            revenue: todayRevenue,
            newPatients: 2,
        };
    }, []);

    // Handlers
    const handleBookAppointment = () => navigate('/admin/appointments/new');
    const handleRegisterPatient = () => navigate('/admin/patients/new');
    const handleGenerateBill = () => navigate('/admin/bills/new');
    const handleViewSchedule = () => navigate('/admin/schedule');
    const handleViewAppointment = (id) => navigate(`/admin/appointments/${id}`);
    const handleViewPatient = (id) => navigate(`/admin/patients/${id}`);

    const handleCheckIn = (patientId) => {
        alert(`Checked in patient ${patientId}`);
    };

    const handleCompleteAppointment = (appointmentId) => {
        alert(`Marked appointment ${appointmentId} as completed`);
    };

    const handleCancelAppointment = (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            alert(`Cancelled appointment ${appointmentId}`);
        }
    };

    return (
        <div className="rd-page">
            <div className="rd-blob rd-blob-1" />
            <div className="rd-blob rd-blob-2" />

            <div className="rd-inner">
                {/* Header */}
                <div className="rd-header">
                    <div className="rd-header-left">
                        <div className="rd-avatar">
                            {receptionistName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div className="rd-greeting">Good Morning, {receptionistName}!</div>
                            <div className="rd-date-time">
                                {formatDate(new Date().toISOString())} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                    <div className="rd-header-right">
                        <button
                            className="rd-notification-btn"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Icon.Bell />
                            {NOTIFICATIONS.length > 0 && (
                                <span className="rd-notification-badge">{NOTIFICATIONS.length}</span>
                            )}
                        </button>
                        {showNotifications && (
                            <div className="rd-notification-dropdown">
                                <div className="rd-notification-header">
                                    <span>Notifications</span>
                                    <button className="rd-notification-clear">Mark all as read</button>
                                </div>
                                {NOTIFICATIONS.map(notif => (
                                    <div key={notif.id} className="rd-notification-item">
                                        <div className="rd-notification-icon">
                                            {notif.type === 'reminder' ? <Icon.Bell /> : <Icon.AlertCircle />}
                                        </div>
                                        <div className="rd-notification-content">
                                            <div className="rd-notification-message">{notif.message}</div>
                                            <div className="rd-notification-time">{notif.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="rd-stats-grid">
                    <div className="glass-card rd-stat-card">
                        <div className="rd-stat-icon tint-sky"><Icon.Calendar /></div>
                        <div className="rd-stat-label">Today's Appointments</div>
                        <div className="rd-stat-value">{stats.total}</div>
                        <div className="rd-stat-sub">{stats.completed} completed</div>
                    </div>
                    <div className="glass-card rd-stat-card">
                        <div className="rd-stat-icon tint-mist"><Icon.UserPlus /></div>
                        <div className="rd-stat-label">New Patients Today</div>
                        <div className="rd-stat-value">{stats.newPatients}</div>
                        <div className="rd-stat-sub">+{stats.newPatients} registered</div>
                    </div>
                    <div className="glass-card rd-stat-card">
                        <div className="rd-stat-icon tint-amber"><Icon.Users /></div>
                        <div className="rd-stat-label">Patients Waiting</div>
                        <div className="rd-stat-value">{stats.waiting}</div>
                        <div className="rd-stat-sub">{stats.inProgress} in progress</div>
                    </div>
                    <div className="glass-card rd-stat-card">
                        <div className="rd-stat-icon tint-sage"><Icon.DollarSign /></div>
                        <div className="rd-stat-label">Revenue Today</div>
                        <div className="rd-stat-value">{formatCurrency(stats.revenue)}</div>
                        <div className="rd-stat-sub">From {stats.completed} appointments</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rd-quick-actions">
                    <button className="rd-action-btn primary" onClick={handleBookAppointment}>
                        <Icon.Plus /> Book Appointment
                    </button>
                    <button className="rd-action-btn" onClick={handleRegisterPatient}>
                        <Icon.UserPlus /> Register Patient
                    </button>
                    <button className="rd-action-btn" onClick={handleGenerateBill}>
                        <Icon.Receipt /> Generate Bill
                    </button>
                    <button className="rd-action-btn" onClick={handleViewSchedule}>
                        <Icon.Calendar /> View Schedule
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="rd-content-grid">
                    {/* Today's Schedule */}
                    <div className="rd-schedule-section">
                        <div className="glass-card rd-schedule-card">
                            <div className="rd-card-header">
                                <div>
                                    <div className="rd-card-title">Today's Schedule</div>
                                    <div className="rd-card-subtitle">{formatDate(new Date().toISOString())}</div>
                                </div>
                                <button className="rd-card-action" onClick={handleViewSchedule}>View All</button>
                            </div>
                            <div className="rd-schedule-list">
                                {TODAY_APPOINTMENTS.filter(a => a.status !== 'cancelled').sort((a, b) => a.time.localeCompare(b.time)).map(app => (
                                    <div key={app.id} className="rd-schedule-item">
                                        <div className="rd-schedule-time">{formatTime(app.time)}</div>
                                        <div className="rd-schedule-info">
                                            <div className="rd-schedule-patient">{app.patient}</div>
                                            <div className="rd-schedule-detail">{app.treatment} • {app.dentist}</div>
                                        </div>
                                        <span className={`rd-schedule-status ${getStatusBadge(app.status)}`}>
                                            {getStatusLabel(app.status)}
                                        </span>
                                        <div className="rd-schedule-actions">
                                            {app.status === 'confirmed' || app.status === 'scheduled' ? (
                                                <>
                                                    <button
                                                        className="rd-schedule-btn check-in"
                                                        onClick={() => handleCheckIn(app.id)}
                                                        title="Check In"
                                                    >
                                                        <Icon.CheckIn />
                                                    </button>
                                                    <button
                                                        className="rd-schedule-btn complete"
                                                        onClick={() => handleCompleteAppointment(app.id)}
                                                        title="Complete"
                                                    >
                                                        <Icon.Check />
                                                    </button>
                                                    <button
                                                        className="rd-schedule-btn cancel"
                                                        onClick={() => handleCancelAppointment(app.id)}
                                                        title="Cancel"
                                                    >
                                                        <Icon.X />
                                                    </button>
                                                </>
                                            ) : app.status === 'in-progress' ? (
                                                <button
                                                    className="rd-schedule-btn complete"
                                                    onClick={() => handleCompleteAppointment(app.id)}
                                                    title="Complete"
                                                >
                                                    <Icon.Check /> Complete
                                                </button>
                                            ) : null}
                                            <button
                                                className="rd-schedule-btn view"
                                                onClick={() => handleViewAppointment(app.id)}
                                                title="View"
                                            >
                                                <Icon.Eye />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="rd-sidebar">
                        {/* Waiting Patients */}
                        <div className="glass-card rd-waiting-card">
                            <div className="rd-card-header">
                                <div>
                                    <div className="rd-card-title">Waiting Patients</div>
                                    <div className="rd-card-subtitle">{WAITING_PATIENTS.length} patients waiting</div>
                                </div>
                            </div>
                            <div className="rd-waiting-list">
                                {WAITING_PATIENTS.map(patient => (
                                    <div key={patient.id} className="rd-waiting-item">
                                        <div className="rd-waiting-avatar">{getInitials(patient.name)}</div>
                                        <div className="rd-waiting-info">
                                            <div className="rd-waiting-name">{patient.name}</div>
                                            <div className="rd-waiting-detail">
                                                Checked in: {patient.checkIn} • Wait: {patient.estimatedWait}
                                            </div>
                                        </div>
                                        <button
                                            className="rd-waiting-btn"
                                            onClick={() => handleViewPatient(patient.id)}
                                        >
                                            <Icon.Eye />
                                        </button>
                                    </div>
                                ))}
                                {WAITING_PATIENTS.length === 0 && (
                                    <div className="rd-waiting-empty">No patients waiting</div>
                                )}
                            </div>
                        </div>

                        {/* Pending Tasks */}
                        <div className="glass-card rd-tasks-card">
                            <div className="rd-card-header">
                                <div>
                                    <div className="rd-card-title">Pending Tasks</div>
                                    <div className="rd-card-subtitle">{PENDING_TASKS.length} tasks to complete</div>
                                </div>
                            </div>
                            <div className="rd-tasks-list">
                                {PENDING_TASKS.map(task => {
                                    const iconMap = {
                                        'unconfirmed': <Icon.AlertCircle />,
                                        'pending-bill': <Icon.Receipt />,
                                        'call-back': <Icon.User />,
                                    };
                                    const colorMap = {
                                        'unconfirmed': 'task-unconfirmed',
                                        'pending-bill': 'task-pending-bill',
                                        'call-back': 'task-call-back',
                                    };
                                    return (
                                        <div key={task.id} className={`rd-task-item ${colorMap[task.type] || ''}`}>
                                            <div className="rd-task-icon">{iconMap[task.type] || <Icon.AlertCircle />}</div>
                                            <div className="rd-task-info">
                                                <div className="rd-task-description">{task.description}</div>
                                                <div className="rd-task-meta">
                                                    {task.patient && <span>{task.patient}</span>}
                                                    {task.time && <span>{formatTime(task.time)}</span>}
                                                    {task.amount && <span>{formatCurrency(task.amount)}</span>}
                                                    {task.priority && <span className="rd-task-priority">{task.priority}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {PENDING_TASKS.length === 0 && (
                                    <div className="rd-tasks-empty">All tasks completed!</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;