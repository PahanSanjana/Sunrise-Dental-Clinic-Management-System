import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ActivityLog.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    Activity: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const generateActivityLogs = () => {
    const users = [
        { name: 'Dr. Anura Silva', role: 'Dentist' },
        { name: 'Kumari Rathnayake', role: 'Receptionist' },
        { name: 'Asanka Bandara', role: 'Admin' },
        { name: 'Dr. Chandana Perera', role: 'Dentist' },
        { name: 'Mala Wijesinghe', role: 'Receptionist' },
    ];

    const actions = ['View', 'Edit', 'Create', 'Delete', 'Login', 'Logout'];
    const modules = ['Patient', 'Appointment', 'Billing', 'Staff', 'Settings', 'Report', 'Authentication'];
    const details = [
        'Patient record viewed',
        'Appointment booked for patient',
        'Billing updated',
        'Staff member added',
        'Settings changed',
        'Report generated',
        'User logged in',
        'Patient data exported',
        'Appointment cancelled',
        'Bill generated',
    ];
    const ips = ['192.168.1.100', '192.168.1.101', '192.168.1.102', '10.0.0.1', '10.0.0.2'];

    const logs = [];
    const startDate = new Date('2026-07-25');
    const endDate = new Date('2026-07-31');

    for (let i = 0; i < 150; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const module = modules[Math.floor(Math.random() * modules.length)];
        const detail = details[Math.floor(Math.random() * details.length)];
        const ip = ips[Math.floor(Math.random() * ips.length)];

        const date = new Date(startDate);
        date.setDate(date.getDate() + Math.floor(Math.random() * 7));
        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setSeconds(Math.floor(Math.random() * 60));

        logs.push({
            id: `ACT-${String(1001 + i).padStart(4, '0')}`,
            timestamp: date.toISOString(),
            user: user.name,
            role: user.role,
            action: action,
            module: module,
            details: detail,
            ipAddress: ip,
            userAgent: 'Chrome/Windows 10',
        });
    }

    // Sort by timestamp descending
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

const ACTIVITY_LOGS = generateActivityLogs();
const USERS = ['All', ...new Set(ACTIVITY_LOGS.map(log => log.user))];
const ROLES = ['All', ...new Set(ACTIVITY_LOGS.map(log => log.role))];
const ACTIONS = ['All', 'View', 'Edit', 'Create', 'Delete', 'Login', 'Logout'];
const MODULES = ['All', 'Patient', 'Appointment', 'Billing', 'Staff', 'Settings', 'Report', 'Authentication'];
const PAGE_SIZE_OPTIONS = [25, 50, 100, 200];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDateTime(iso) {
    return new Date(iso).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function getActionBadge(action) {
    const classes = {
        'View': 'badge-info',
        'Edit': 'badge-warning',
        'Create': 'badge-success',
        'Delete': 'badge-danger',
        'Login': 'badge-success',
        'Logout': 'badge-neutral',
    };
    return classes[action] || 'badge-neutral';
}

function getModuleIcon(module) {
    const icons = {
        'Patient': 'User',
        'Appointment': 'Calendar',
        'Billing': 'FileText',
        'Staff': 'User',
        'Settings': 'Settings',
        'Report': 'FileText',
        'Authentication': 'Lock',
    };
    return Icon[icons[module]] || Icon.Activity;
}

function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function toCsv(rows) {
    const header = ['ID', 'Timestamp', 'User', 'Role', 'Action', 'Module', 'Details', 'IP Address'];
    const lines = rows.map((r) => [
        r.id, r.timestamp, r.user, r.role, r.action, r.module, r.details, r.ipAddress
    ].map((v) => `"${v}"`).join(','));
    return [header.join(','), ...lines].join('\n');
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const ActivityLog = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        user: 'All',
        role: 'All',
        action: 'All',
        module: 'All',
    });
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [selected, setSelected] = useState(new Set());
    const [showClearModal, setShowClearModal] = useState(false);
    const [clearDays, setClearDays] = useState(30);
    const [isExporting, setIsExporting] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    // Filter logs
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return ACTIVITY_LOGS.filter((log) => {
            const matchesQuery = !q ||
                log.user.toLowerCase().includes(q) ||
                log.action.toLowerCase().includes(q) ||
                log.module.toLowerCase().includes(q) ||
                log.details.toLowerCase().includes(q) ||
                log.id.toLowerCase().includes(q);

            const matchesDateFrom = !filters.dateFrom || log.timestamp >= filters.dateFrom;
            const matchesDateTo = !filters.dateTo || log.timestamp <= filters.dateTo + 'T23:59:59';
            const matchesUser = filters.user === 'All' || log.user === filters.user;
            const matchesRole = filters.role === 'All' || log.role === filters.role;
            const matchesAction = filters.action === 'All' || log.action === filters.action;
            const matchesModule = filters.module === 'All' || log.module === filters.module;

            return matchesQuery && matchesDateFrom && matchesDateTo &&
                matchesUser && matchesRole && matchesAction && matchesModule;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Statistics
    const stats = useMemo(() => {
        const total = ACTIVITY_LOGS.length;
        const today = new Date().toISOString().split('T')[0];
        const todayLogs = ACTIVITY_LOGS.filter(log => log.timestamp.startsWith(today));
        const uniqueUsers = new Set(ACTIVITY_LOGS.map(log => log.user)).size;
        const actionCounts = ACTIVITY_LOGS.reduce((acc, log) => {
            acc[log.action] = (acc[log.action] || 0) + 1;
            return acc;
        }, {});
        const mostCommonAction = Object.entries(actionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        return {
            total,
            today: todayLogs.length,
            uniqueUsers,
            mostCommonAction,
        };
    }, []);

    // Selection handlers
    const allOnPageSelected = paged.length > 0 && paged.every((log) => selected.has(log.id));

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
            if (allOnPageSelected) paged.forEach((log) => next.delete(log.id));
            else paged.forEach((log) => next.add(log.id));
            return next;
        });
    };

    const clearSelection = () => setSelected(new Set());
    const selectedLogs = ACTIVITY_LOGS.filter((log) => selected.has(log.id));

    const applyFilters = () => setPage(1);
    const resetFilters = () => {
        setFilters({
            dateFrom: '',
            dateTo: '',
            user: 'All',
            role: 'All',
            action: 'All',
            module: 'All',
        });
        setPage(1);
    };

    // Export handler
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const dataToExport = selected.size > 0 ? selectedLogs : filtered;
            download('activity_logs.csv', toCsv(dataToExport), 'text/csv;charset=utf-8;');
            setIsExporting(false);
        }, 800);
    };

    // Clear logs handler
    const handleClearLogs = () => {
        setIsClearing(true);
        setTimeout(() => {
            setIsClearing(false);
            setShowClearModal(false);
            alert(`Cleared ${clearDays} days of logs successfully!`);
            clearSelection();
        }, 800);
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    // Get action icon
    const getActionIcon = (action) => {
        switch (action) {
            case 'View': return <Icon.Eye />;
            case 'Edit': return <Icon.Edit />;
            case 'Create': return <Icon.Plus />;
            case 'Delete': return <Icon.Trash />;
            case 'Login': return <Icon.Check />;
            case 'Logout': return <Icon.X />;
            default: return <Icon.Activity />;
        }
    };

    // Get status color for action
    const getActionColor = (action) => {
        switch (action) {
            case 'View': return '#3A7A8A';
            case 'Edit': return '#C4954C';
            case 'Create': return '#4A7A64';
            case 'Delete': return '#A24438';
            case 'Login': return '#4A7A64';
            case 'Logout': return '#8A8A8A';
            default: return '#2F3E3C';
        }
    };

    return (
        <div className="al-page">
            <div className="al-blob al-blob-1" />
            <div className="al-blob al-blob-2" />

            <div className="al-inner">
                {/* Header */}
                <div className="al-header">
                    <button className="al-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Dashboard
                    </button>
                    <div className="al-title-area">
                        <div className="al-title-row">
                            <div>
                                <h1 className="al-title">Activity Log</h1>
                                <p className="al-subtitle">Track all user activities and system changes</p>
                            </div>
                            <div className="al-actions">
                                <button className="al-btn secondary" onClick={handleExport} disabled={isExporting}>
                                    <Icon.Download /> {isExporting ? 'Exporting...' : 'Export'}
                                </button>
                                <button className="al-btn danger" onClick={() => setShowClearModal(true)}>
                                    <Icon.Trash /> Clear Old Logs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="al-stats-grid">
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-sky"><Icon.Activity /></div>
                        <div className="al-stat-label">Total Logs</div>
                        <div className="al-stat-value">{stats.total}</div>
                    </div>
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-mist"><Icon.Clock /></div>
                        <div className="al-stat-label">Today</div>
                        <div className="al-stat-value">{stats.today}</div>
                    </div>
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-sage"><Icon.User /></div>
                        <div className="al-stat-label">Active Users</div>
                        <div className="al-stat-value">{stats.uniqueUsers}</div>
                    </div>
                    <div className="glass-card al-stat-card">
                        <div className="al-stat-icon tint-amber"><Icon.FileText /></div>
                        <div className="al-stat-label">Most Common Action</div>
                        <div className="al-stat-value">{stats.mostCommonAction}</div>
                    </div>
                </div>

                {/* Selected Count */}
                {selected.size > 0 && (
                    <div className="al-selected-bar">
                        <span className="al-selected-count">{selected.size} items selected</span>
                        <button className="al-btn ghost" onClick={clearSelection}>Clear Selection</button>
                    </div>
                )}

                {/* Toolbar */}
                <div className="glass-card al-toolbar">
                    <div className="al-search">
                        <Icon.Search />
                        <input
                            placeholder="Search by user, action, module, or details..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        />
                    </div>
                    <button className={`al-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                        <Icon.Filter /> Filters
                    </button>
                </div>

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
                                <label className="al-filter-label">User</label>
                                <select className="al-select" value={filters.user} onChange={(e) => setFilters((f) => ({ ...f, user: e.target.value }))}>
                                    {USERS.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Role</label>
                                <select className="al-select" value={filters.role} onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))}>
                                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Action Type</label>
                                <select className="al-select" value={filters.action} onChange={(e) => setFilters((f) => ({ ...f, action: e.target.value }))}>
                                    {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                            <div className="al-filter-field">
                                <label className="al-filter-label">Module</label>
                                <select className="al-select" value={filters.module} onChange={(e) => setFilters((f) => ({ ...f, module: e.target.value }))}>
                                    {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
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
                            <Icon.Activity />
                            <div>No activity logs found</div>
                            <div className="al-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="al-table-wrap">
                            <table className="al-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" className="al-checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
                                        <th>Timestamp</th>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Module</th>
                                        <th>Details</th>
                                        <th>IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((log) => {
                                        const ModuleIcon = getModuleIcon(log.module);
                                        return (
                                            <tr key={log.id} className={selected.has(log.id) ? 'selected' : ''}>
                                                <td><input type="checkbox" className="al-checkbox" checked={selected.has(log.id)} onChange={() => toggleOne(log.id)} /></td>
                                                <td className="al-timestamp">
                                                    <span className="al-timestamp-time">{formatDateTime(log.timestamp)}</span>
                                                </td>
                                                <td>
                                                    <div className="al-user-cell">
                                                        <div className="al-user-avatar">{log.user.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                                                        <div>
                                                            <div className="al-user-name">{log.user}</div>
                                                            <div className="al-user-role">{log.role}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`al-action-badge ${getActionBadge(log.action)}`}>
                                                        {getActionIcon(log.action)}
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="al-module-badge">
                                                        <ModuleIcon />
                                                        {log.module}
                                                    </span>
                                                </td>
                                                <td className="al-details">{log.details}</td>
                                                <td className="al-ip">{log.ipAddress}</td>
                                            </tr>
                                        );
                                    })}
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
                                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 7) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 4) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 3) {
                                        pageNum = totalPages - 6 + i;
                                    } else {
                                        pageNum = currentPage - 3 + i;
                                    }
                                    if (pageNum < 1 || pageNum > totalPages) return null;
                                    return (
                                        <button key={pageNum} className={`al-page-btn ${pageNum === currentPage ? 'active' : ''}`} onClick={() => setPage(pageNum)}>
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button className="al-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Clear Logs Modal */}
            {showClearModal && (
                <div className="al-modal-overlay" onClick={() => setShowClearModal(false)}>
                    <div className="al-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="al-modal-header">
                            <h3>Clear Old Logs</h3>
                            <button className="al-modal-close" onClick={() => setShowClearModal(false)}>✕</button>
                        </div>
                        <div className="al-modal-body">
                            <p>This action will permanently delete all activity logs older than the selected number of days.</p>
                            <div className="al-modal-field">
                                <label className="al-label">Delete logs older than</label>
                                <div className="al-clear-input-wrap">
                                    <input
                                        type="number"
                                        className="al-input"
                                        value={clearDays}
                                        onChange={(e) => setClearDays(parseInt(e.target.value) || 0)}
                                        min="1"
                                        max="365"
                                    />
                                    <span className="al-input-suffix">days</span>
                                </div>
                                <p className="al-clear-hint">
                                    This will delete approximately {Math.floor(ACTIVITY_LOGS.filter(log => {
                                        const logDate = new Date(log.timestamp);
                                        const cutoff = new Date();
                                        cutoff.setDate(cutoff.getDate() - clearDays);
                                        return logDate < cutoff;
                                    }).length / ACTIVITY_LOGS.length * 100)}% of your logs.
                                </p>
                            </div>
                        </div>
                        <div className="al-modal-footer">
                            <button className="al-btn secondary" onClick={() => setShowClearModal(false)}>
                                Cancel
                            </button>
                            <button className="al-btn danger" onClick={handleClearLogs} disabled={isClearing}>
                                {isClearing ? 'Deleting...' : 'Delete Old Logs'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityLog;