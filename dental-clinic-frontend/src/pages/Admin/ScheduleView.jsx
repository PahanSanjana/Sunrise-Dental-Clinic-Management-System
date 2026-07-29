import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ScheduleView.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    RefreshCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const DENTISTS = [
    { id: 'D-001', name: 'Dr. Silva', specialty: 'General Dentistry' },
    { id: 'D-002', name: 'Dr. Perera', specialty: 'Orthodontics' },
    { id: 'D-003', name: 'Dr. Fernando', specialty: 'Endodontics' },
];

const TIME_SLOTS = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
];

// Sample appointments for today
const TODAY = '2026-07-29';
const SAMPLE_APPOINTMENTS = [
    { id: 'APT-1034', patient: 'Amara Perera', dentist: 'Dr. Silva', treatment: 'Root Canal', time: '09:00', status: 'confirmed', duration: 90 },
    { id: 'APT-1033', patient: 'Nadun Fernando', dentist: 'Dr. Perera', treatment: 'Cleaning', time: '08:30', status: 'completed', duration: 30 },
    { id: 'APT-1032', patient: 'Ishara Gunaratne', dentist: 'Dr. Silva', treatment: 'Consultation', time: '11:30', status: 'confirmed', duration: 30 },
    { id: 'APT-1031', patient: 'Kavindu Jayasuriya', dentist: 'Dr. Perera', treatment: 'Whitening', time: '10:00', status: 'confirmed', duration: 45 },
    { id: 'APT-1030', patient: 'Sanduni Wickrama', dentist: 'Dr. Fernando', treatment: 'Filling', time: '09:30', status: 'pending', duration: 60 },
    { id: 'APT-1029', patient: 'Tharindu Bandara', dentist: 'Dr. Perera', treatment: 'Extraction', time: '14:00', status: 'pending', duration: 45 },
    { id: 'APT-1028', patient: 'Dilini Rathnayake', dentist: 'Dr. Silva', treatment: 'Root Canal', time: '13:30', status: 'confirmed', duration: 90 },
    { id: 'APT-1027', patient: 'Chamod Wijesinghe', dentist: 'Dr. Fernando', treatment: 'Cleaning', time: '11:00', status: 'confirmed', duration: 30 },
    { id: 'APT-1026', patient: 'Yashodha Silva', dentist: 'Dr. Silva', treatment: 'Consultation', time: '16:00', status: 'scheduled', duration: 30 },
    { id: 'APT-1025', patient: 'Ruwan Abeysekera', dentist: 'Dr. Perera', treatment: 'Whitening', time: '15:30', status: 'scheduled', duration: 45 },
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

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getStatusBadge(status) {
    const classes = {
        'scheduled': 'status-scheduled',
        'confirmed': 'status-confirmed',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled',
        'no-show': 'status-no-show',
        'pending': 'status-pending',
        'in-progress': 'status-in-progress',
    };
    return classes[status.toLowerCase()] || 'status-scheduled';
}

function getStatusLabel(status) {
    const labels = {
        'scheduled': 'Scheduled',
        'confirmed': 'Confirmed',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
        'no-show': 'No-Show',
        'pending': 'Pending',
        'in-progress': 'In Progress',
    };
    return labels[status.toLowerCase()] || status;
}

function getStatusIcon(status) {
    switch (status.toLowerCase()) {
        case 'completed': return <Icon.Check />;
        case 'cancelled': return <Icon.X />;
        case 'no-show': return <Icon.AlertCircle />;
        case 'in-progress': return <Icon.Clock />;
        default: return <Icon.Calendar />;
    }
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const ScheduleView = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(TODAY);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDentist, setSelectedDentist] = useState('All');
    const [selectedTreatment, setSelectedTreatment] = useState('All');
    const [viewMode, setViewMode] = useState('day'); // 'day' or 'week'
    const [hoveredAppointment, setHoveredAppointment] = useState(null);

    // Get appointments for the selected date
    const dayAppointments = useMemo(() => {
        return SAMPLE_APPOINTMENTS.filter(app => {
            const matchesDate = true; // In real app, check date
            const matchesDentist = selectedDentist === 'All' || app.dentist === selectedDentist;
            const matchesTreatment = selectedTreatment === 'All' || app.treatment === selectedTreatment;
            return matchesDate && matchesDentist && matchesTreatment;
        });
    }, [selectedDentist, selectedTreatment]);

    // Get unique treatments for filter
    const treatments = useMemo(() => {
        const unique = new Set(SAMPLE_APPOINTMENTS.map(a => a.treatment));
        return ['All', ...unique];
    }, []);

    // Build schedule grid
    const scheduleGrid = useMemo(() => {
        const grid = {};
        DENTISTS.forEach(dentist => {
            grid[dentist.id] = {};
            TIME_SLOTS.forEach(time => {
                const appointment = dayAppointments.find(a =>
                    a.dentist === dentist.name && a.time === time
                );
                grid[dentist.id][time] = appointment || null;
            });
        });
        return grid;
    }, [dayAppointments]);

    // Calculate statistics
    const stats = useMemo(() => {
        const total = dayAppointments.length;
        const completed = dayAppointments.filter(a => a.status === 'completed').length;
        const confirmed = dayAppointments.filter(a => a.status === 'confirmed').length;
        const pending = dayAppointments.filter(a => a.status === 'pending' || a.status === 'scheduled').length;
        return { total, completed, confirmed, pending };
    }, [dayAppointments]);

    // Navigation handlers
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today.toISOString().split('T')[0]);
    };

    const goToPreviousDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };

    const goToNextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };

    const isToday = selectedDate === new Date().toISOString().split('T')[0];

    // Action handlers
    const handleBookAppointment = () => navigate('/admin/appointments/new');
    const handleViewAppointment = (id) => navigate(`/admin/appointments/${id}`);
    const handleEditAppointment = (id) => navigate(`/admin/appointments/${id}/edit`);

    const handlePrint = () => window.print();
    const handleExport = () => alert('Exporting schedule...');

    return (
        <div className="sc-page">
            <div className="sc-blob sc-blob-1" />
            <div className="sc-blob sc-blob-2" />

            <div className="sc-inner">
                {/* Header */}
                <div className="sc-header">
                    <div>
                        <div className="sc-title">Daily Schedule</div>
                        <div className="sc-subtitle">View and manage appointments for the day</div>
                    </div>
                    <div className="sc-header-actions">
                        <button className="sc-btn primary" onClick={handleBookAppointment}>
                            <Icon.Plus /> Book Appointment
                        </button>
                    </div>
                </div>

                {/* Date Navigation */}
                <div className="sc-date-nav">
                    <div className="sc-date-controls">
                        <button className="sc-date-btn" onClick={goToPreviousDay}>
                            <Icon.ChevronLeft />
                        </button>
                        <button className="sc-date-btn today" onClick={goToToday}>
                            <Icon.Calendar /> {isToday ? 'Today' : 'Go to Today'}
                        </button>
                        <button className="sc-date-btn" onClick={goToNextDay}>
                            <Icon.ChevronRight />
                        </button>
                    </div>
                    <div className="sc-date-display">
                        <span className="sc-date-label">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="sc-view-toggle">
                        <button
                            className={`sc-view-btn ${viewMode === 'day' ? 'active' : ''}`}
                            onClick={() => setViewMode('day')}
                        >
                            Day
                        </button>
                        <button
                            className={`sc-view-btn ${viewMode === 'week' ? 'active' : ''}`}
                            onClick={() => setViewMode('week')}
                        >
                            Week
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="sc-stats-grid">
                    <div className="sc-stat-card">
                        <span className="sc-stat-value">{stats.total}</span>
                        <span className="sc-stat-label">Total</span>
                    </div>
                    <div className="sc-stat-card completed">
                        <span className="sc-stat-value">{stats.completed}</span>
                        <span className="sc-stat-label">Completed</span>
                    </div>
                    <div className="sc-stat-card confirmed">
                        <span className="sc-stat-value">{stats.confirmed}</span>
                        <span className="sc-stat-label">Confirmed</span>
                    </div>
                    <div className="sc-stat-card pending">
                        <span className="sc-stat-value">{stats.pending}</span>
                        <span className="sc-stat-label">Pending</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="sc-filters-section">
                    <div className="sc-filters-toggle">
                        <button className="sc-btn secondary" onClick={() => setShowFilters(!showFilters)}>
                            <Icon.Filter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
                    {showFilters && (
                        <div className="glass-card sc-filters-panel">
                            <div className="sc-filter-group">
                                <label className="sc-filter-label">Dentist</label>
                                <select
                                    className="sc-filter-select"
                                    value={selectedDentist}
                                    onChange={(e) => setSelectedDentist(e.target.value)}
                                >
                                    <option value="All">All Dentists</option>
                                    {DENTISTS.map(d => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sc-filter-group">
                                <label className="sc-filter-label">Treatment</label>
                                <select
                                    className="sc-filter-select"
                                    value={selectedTreatment}
                                    onChange={(e) => setSelectedTreatment(e.target.value)}
                                >
                                    {treatments.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Schedule Grid */}
                <div className="glass-card sc-schedule">
                    <div className="sc-schedule-header">
                        <div className="sc-time-label-header">Time</div>
                        {DENTISTS.map(dentist => (
                            <div key={dentist.id} className="sc-dentist-header">
                                <div className="sc-dentist-name">{dentist.name}</div>
                                <div className="sc-dentist-specialty">{dentist.specialty}</div>
                            </div>
                        ))}
                    </div>

                    <div className="sc-schedule-body">
                        {TIME_SLOTS.map(time => (
                            <div key={time} className="sc-schedule-row">
                                <div className="sc-time-label">{formatTime(time)}</div>
                                {DENTISTS.map(dentist => {
                                    const appointment = scheduleGrid[dentist.id]?.[time];
                                    const isHovered = hoveredAppointment === appointment?.id;
                                    return (
                                        <div key={dentist.id} className="sc-slot">
                                            {appointment ? (
                                                <div
                                                    className={`sc-appointment-card ${getStatusBadge(appointment.status)} ${isHovered ? 'hovered' : ''}`}
                                                    onMouseEnter={() => setHoveredAppointment(appointment.id)}
                                                    onMouseLeave={() => setHoveredAppointment(null)}
                                                    onClick={() => handleViewAppointment(appointment.id)}
                                                >
                                                    <div className="sc-appointment-time">
                                                        {getStatusIcon(appointment.status)}
                                                        <span>{appointment.duration}min</span>
                                                    </div>
                                                    <div className="sc-appointment-patient">{appointment.patient}</div>
                                                    <div className="sc-appointment-treatment">{appointment.treatment}</div>
                                                    <div className="sc-appointment-actions">
                                                        <button
                                                            className="sc-appt-action-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleViewAppointment(appointment.id);
                                                            }}
                                                            title="View"
                                                        >
                                                            <Icon.Eye />
                                                        </button>
                                                        <button
                                                            className="sc-appt-action-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditAppointment(appointment.id);
                                                            }}
                                                            title="Edit"
                                                        >
                                                            <Icon.Edit />
                                                        </button>
                                                    </div>
                                                    <div className="sc-appointment-status">
                                                        {getStatusLabel(appointment.status)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="sc-slot-empty">
                                                    <span>Available</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="sc-quick-actions">
                    <button className="sc-btn secondary" onClick={handleBookAppointment}>
                        <Icon.Plus /> Book Appointment
                    </button>
                    <button className="sc-btn secondary" onClick={handlePrint}>
                        <Icon.Printer /> Print Schedule
                    </button>
                    <button className="sc-btn secondary" onClick={handleExport}>
                        <Icon.Download /> Export
                    </button>
                </div>

                {/* Legend */}
                <div className="glass-card sc-legend">
                    <div className="sc-legend-title">Status Legend</div>
                    <div className="sc-legend-items">
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-scheduled" />
                            Scheduled
                        </div>
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-confirmed" />
                            Confirmed
                        </div>
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-in-progress" />
                            In Progress
                        </div>
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-completed" />
                            Completed
                        </div>
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-pending" />
                            Pending
                        </div>
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-cancelled" />
                            Cancelled
                        </div>
                        <div className="sc-legend-item">
                            <span className="sc-legend-dot status-no-show" />
                            No-Show
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleView;