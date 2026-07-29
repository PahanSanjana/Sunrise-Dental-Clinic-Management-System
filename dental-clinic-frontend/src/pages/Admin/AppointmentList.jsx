import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentList.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
    Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    Bell: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
    Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Ban: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const APPOINTMENTS = [
    { id: 'APT-1034', date: '2026-07-28', time: '09:00', patient: 'Amara Perera', dentist: 'Dr. Silva', treatment: 'Root Canal', status: 'completed' },
    { id: 'APT-1033', date: '2026-07-28', time: '10:30', patient: 'Nadun Fernando', dentist: 'Dr. Perera', treatment: 'Cleaning', status: 'completed' },
    { id: 'APT-1032', date: '2026-07-28', time: '11:30', patient: 'Ishara Gunaratne', dentist: 'Dr. Silva', treatment: 'Consultation', status: 'confirmed' },
    { id: 'APT-1031', date: '2026-07-28', time: '13:00', patient: 'Kavindu Jayasuriya', dentist: 'Dr. Perera', treatment: 'Whitening', status: 'confirmed' },
    { id: 'APT-1030', date: '2026-07-28', time: '14:30', patient: 'Sanduni Wickrama', dentist: 'Dr. Silva', treatment: 'Filling', status: 'pending' },
    { id: 'APT-1029', date: '2026-07-28', time: '16:00', patient: 'Tharindu Bandara', dentist: 'Dr. Perera', treatment: 'Extraction', status: 'pending' },
    { id: 'APT-1028', date: '2026-07-29', time: '09:00', patient: 'Dilini Rathnayake', dentist: 'Dr. Silva', treatment: 'Root Canal', status: 'confirmed' },
    { id: 'APT-1027', date: '2026-07-29', time: '10:30', patient: 'Chamod Wijesinghe', dentist: 'Dr. Perera', treatment: 'Cleaning', status: 'confirmed' },
    { id: 'APT-1026', date: '2026-07-30', time: '11:00', patient: 'Yashodha Silva', dentist: 'Dr. Silva', treatment: 'Consultation', status: 'scheduled' },
    { id: 'APT-1025', date: '2026-07-30', time: '13:30', patient: 'Ruwan Abeysekera', dentist: 'Dr. Perera', treatment: 'Whitening', status: 'scheduled' },
    { id: 'APT-1024', date: '2026-07-31', time: '09:30', patient: 'Menaka de Zoysa', dentist: 'Dr. Silva', treatment: 'Filling', status: 'scheduled' },
    { id: 'APT-1023', date: '2026-07-31', time: '14:00', patient: 'Isuru Karunaratne', dentist: 'Dr. Perera', treatment: 'Extraction', status: 'scheduled' },
    { id: 'APT-1022', date: '2026-08-01', time: '10:00', patient: 'Nethmi Jayawardena', dentist: 'Dr. Silva', treatment: 'Root Canal', status: 'scheduled' },
    { id: 'APT-1021', date: '2026-08-01', time: '15:00', patient: 'Oshan Mendis', dentist: 'Dr. Perera', treatment: 'Cleaning', status: 'cancelled' },
    { id: 'APT-1020', date: '2026-08-02', time: '11:30', patient: 'Thilini Ekanayake', dentist: 'Dr. Silva', treatment: 'Consultation', status: 'no-show' },
];

const DENTISTS = ['All', 'Dr. Silva', 'Dr. Perera'];
const TREATMENT_TYPES = ['All', 'Root Canal', 'Cleaning', 'Consultation', 'Whitening', 'Filling', 'Extraction'];
const STATUS_OPTIONS = ['All', 'scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const emptyFilters = { dateFrom: '', dateTo: '', dentist: 'All', treatment: 'All', status: 'All' };

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function initials(name) {
    return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

function getStatusBadge(status) {
    const classes = {
        'scheduled': 'badge-info',
        'confirmed': 'badge-success',
        'completed': 'badge-success',
        'cancelled': 'badge-danger',
        'no-show': 'badge-warning',
        'pending': 'badge-warning',
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
    };
    return labels[status.toLowerCase()] || status;
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const AppointmentList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState(emptyFilters);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [selected, setSelected] = useState(new Set());
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter appointments
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return APPOINTMENTS.filter((app) => {
            const matchesQuery = !q ||
                app.id.toLowerCase().includes(q) ||
                app.patient.toLowerCase().includes(q) ||
                app.dentist.toLowerCase().includes(q) ||
                app.treatment.toLowerCase().includes(q);

            const matchesDateFrom = !filters.dateFrom || app.date >= filters.dateFrom;
            const matchesDateTo = !filters.dateTo || app.date <= filters.dateTo;
            const matchesDentist = filters.dentist === 'All' || app.dentist === filters.dentist;
            const matchesTreatment = filters.treatment === 'All' || app.treatment === filters.treatment;
            const matchesStatus = filters.status === 'All' || app.status === filters.status;

            return matchesQuery && matchesDateFrom && matchesDateTo && matchesDentist && matchesTreatment && matchesStatus;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Statistics
    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const todayApps = APPOINTMENTS.filter(a => a.date === today);
        const thisWeek = APPOINTMENTS.filter(a => {
            const appDate = new Date(a.date);
            const now = new Date();
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());
            return appDate >= weekStart;
        });
        const thisMonth = APPOINTMENTS.filter(a => {
            const appDate = new Date(a.date);
            const now = new Date();
            return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
        });
        return {
            today: todayApps.length,
            todayConfirmed: todayApps.filter(a => a.status === 'confirmed').length,
            thisWeek: thisWeek.length,
            thisMonth: thisMonth.length,
        };
    }, []);

    // Selection handlers
    const allOnPageSelected = paged.length > 0 && paged.every((app) => selected.has(app.id));

    const toggleOne = (id) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleAllOnPage = () => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (allOnPageSelected) paged.forEach((app) => next.delete(app.id));
            else paged.forEach((app) => next.add(app.id));
            return next;
        });
    };

    const clearSelection = () => setSelected(new Set());
    const selectedApps = APPOINTMENTS.filter((app) => selected.has(app.id));

    const applyFilters = () => setPage(1);
    const resetFilters = () => { setFilters(emptyFilters); setPage(1); };

    // Action Handlers
    const handleView = (id) => navigate(`/admin/appointments/${id}`);
    const handleEdit = (id) => navigate(`/admin/appointments/${id}/edit`);
    const handleNew = () => navigate('/admin/appointments/new');
    const handleBill = (id) => navigate(`/admin/bills/new?appointment=${id}`);

    // Bulk action handlers (placeholder)
    const handleBulkExport = () => {
        alert(`Exporting ${selectedApps.length} appointments...`);
    };

    const handleBulkReminders = () => {
        alert(`Sending reminders to ${selectedApps.length} patients...`);
    };

    const handleBulkComplete = () => {
        alert(`Marking ${selectedApps.length} appointments as completed...`);
    };

    const handleBulkCancel = () => {
        alert(`Cancelling ${selectedApps.length} appointments...`);
    };

    return (
        <div className="al-page">
            <div className="al-blob al-blob-1" />
            <div className="al-blob al-blob-2" />

            <div className="al-inner">
                {/* Header */}
                <div className="al-header">
                    <div>
                        <div className="al-title">Appointments</div>
                        <div className="al-subtitle">Manage all appointments across the clinic</div>
                    </div>
                    <button className="al-btn primary" onClick={handleNew}>
                        <Icon.Plus /> Book Appointment
                    </button>
                </div>

                {/* Statistics */}
                <div className="al-stats-grid">
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-sky"><Icon.Calendar /></div>
                        <div className="al-stat-label">Today</div>
                        <div className="al-stat-value">{stats.today}</div>
                        <div className="al-stat-sub">{stats.todayConfirmed} confirmed</div>
                    </div>
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-mist"><Icon.Clock /></div>
                        <div className="al-stat-label">This Week</div>
                        <div className="al-stat-value">{stats.thisWeek}</div>
                        <div className="al-stat-sub">Total appointments</div>
                    </div>
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-sage"><Icon.Users /></div>
                        <div className="al-stat-label">This Month</div>
                        <div className="al-stat-value">{stats.thisMonth}</div>
                        <div className="al-stat-sub">Total appointments</div>
                    </div>
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-amber"><Icon.FileText /></div>
                        <div className="al-stat-label">Total</div>
                        <div className="al-stat-value">{APPOINTMENTS.length}</div>
                        <div className="al-stat-sub">All appointments</div>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selected.size > 0 ? (
                    <div className="glass-card al-bulk-bar">
                        <div className="al-bulk-count">{selected.size} selected</div>
                        <div className="al-bulk-actions">
                            <button className="al-btn" onClick={handleBulkExport}>
                                <Icon.Download /> Export
                            </button>
                            <button className="al-btn" onClick={handleBulkReminders}>
                                <Icon.Bell /> Send Reminders
                            </button>
                            <button className="al-btn" onClick={handleBulkComplete}>
                                <Icon.Check /> Mark Completed
                            </button>
                            <button className="al-btn danger" onClick={handleBulkCancel}>
                                <Icon.Ban /> Cancel Selected
                            </button>
                            <button className="al-btn ghost" onClick={clearSelection}>Clear</button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card al-toolbar">
                        <div className="al-search">
                            <Icon.Search />
                            <input
                                placeholder="Search by appointment #, patient, or dentist..."
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                            />
                        </div>
                        <button className={`al-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                            <Icon.Filter /> Filters
                        </button>
                    </div>
                )}

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="glass-card al-filter-panel">
                        <div className="al-filter-grid">
                            <div className="al-filter-field">
                                <label className="al-filter-label">Date From</label>
                                <input type="date" className="al-input" value={filters.dateFrom} onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} />
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Date To</label>
                                <input type="date" className="al-input" value={filters.dateTo} onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} />
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Dentist</label>
                                <select className="al-select" value={filters.dentist} onChange={(e) => setFilters((f) => ({ ...f, dentist: e.target.value }))}>
                                    {DENTISTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Treatment Type</label>
                                <select className="al-select" value={filters.treatment} onChange={(e) => setFilters((f) => ({ ...f, treatment: e.target.value }))}>
                                    {TREATMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Status</label>
                                <select className="al-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'All' ? 'All' : getStatusLabel(s)}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="al-filter-actions">
                            <button className="al-btn ghost" onClick={resetFilters}>Reset</button>
                            <button className="al-btn primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="glass-card al-table-card">
                    {paged.length === 0 ? (
                        <div className="al-empty">
                            <Icon.Calendar />
                            <div>No appointments found</div>
                            <div className="al-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="al-table-wrap">
                            <table className="al-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" className="al-checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
                                        <th>Appointment #</th>
                                        <th>Date & Time</th>
                                        <th>Patient</th>
                                        <th>Dentist</th>
                                        <th>Treatment</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((app) => (
                                        <tr key={app.id} className={selected.has(app.id) ? 'selected' : ''}>
                                            <td><input type="checkbox" className="al-checkbox" checked={selected.has(app.id)} onChange={() => toggleOne(app.id)} /></td>
                                            <td className="al-appointment-id">{app.id}</td>
                                            <td>
                                                <div className="al-datetime">
                                                    <div>{formatDate(app.date)}</div>
                                                    <div className="al-time">{formatTime(app.time)}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="al-patient-cell">
                                                    <div className="al-avatar">{initials(app.patient)}</div>
                                                    {app.patient}
                                                </div>
                                            </td>
                                            <td>{app.dentist}</td>
                                            <td>{app.treatment}</td>
                                            <td><span className={`al-badge ${getStatusBadge(app.status)}`}>{getStatusLabel(app.status)}</span></td>
                                            <td>
                                                <div className="al-row-actions">
                                                    <button className="al-icon-btn" onClick={() => handleView(app.id)} aria-label="View"><Icon.Eye /></button>
                                                    <button className="al-icon-btn" onClick={() => handleEdit(app.id)} aria-label="Edit"><Icon.Edit /></button>
                                                    <button className="al-icon-btn" onClick={() => handleBill(app.id)} aria-label="Generate Bill"><Icon.Receipt /></button>
                                                    <button className="al-icon-btn danger" aria-label="Cancel"><Icon.Trash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="al-pagination">
                            <div className="al-pagination-left">
                                Rows per page
                                <select className="al-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
                            </div>
                            <div className="al-pagination-controls">
                                <button className="al-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button key={n} className={`al-page-btn ${n === currentPage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                                ))}
                                <button className="al-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentList;