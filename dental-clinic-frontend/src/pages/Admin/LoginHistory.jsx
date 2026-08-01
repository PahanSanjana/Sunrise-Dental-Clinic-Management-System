import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/LoginHistory.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Monitor: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>),
    Globe: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
    LogIn: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>),
    LogOut: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Smartphone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const generateLoginHistory = () => {
    const users = [
        { username: 'dr.silva', role: 'Dentist' },
        { username: 'kumari.r', role: 'Receptionist' },
        { username: 'asanka.b', role: 'Admin' },
        { username: 'dr.perera', role: 'Dentist' },
        { username: 'mala.w', role: 'Receptionist' },
        { username: 'amara.p', role: 'Patient' },
        { username: 'nandun.f', role: 'Patient' },
    ];

    const devices = [
        'Chrome 92 / Windows 10',
        'Firefox 91 / Windows 10',
        'Safari 14 / MacOS 11',
        'Chrome 91 / Android 11',
        'Safari / iOS 15',
        'Edge 92 / Windows 10',
        'Chrome 90 / MacOS 10.15',
    ];

    const ips = ['192.168.1.100', '192.168.1.101', '192.168.1.102', '10.0.0.1', '10.0.0.2', '203.0.113.1', '198.51.100.1'];
    const failedReasons = [
        'Invalid password',
        'User not found',
        'Account locked',
        'Too many attempts',
        'Session expired',
        'Invalid token',
    ];

    const history = [];
    const startDate = new Date('2026-07-25');
    const endDate = new Date('2026-07-31');

    for (let i = 0; i < 200; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const isSuccess = Math.random() < 0.85;
        const device = devices[Math.floor(Math.random() * devices.length)];
        const ip = ips[Math.floor(Math.random() * ips.length)];

        const date = new Date(startDate);
        date.setDate(date.getDate() + Math.floor(Math.random() * 7));
        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setSeconds(Math.floor(Math.random() * 60));

        const status = isSuccess ? 'Success' : 'Failed';

        history.push({
            id: `LOG-${String(1001 + i).padStart(4, '0')}`,
            timestamp: date.toISOString(),
            username: user.username,
            role: user.role,
            ipAddress: ip,
            device: device,
            status: status,
            failedReason: isSuccess ? null : failedReasons[Math.floor(Math.random() * failedReasons.length)],
            sessionId: isSuccess ? `SESS-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}` : null,
            duration: isSuccess ? Math.floor(Math.random() * 120) + 5 : null,
        });
    }

    return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

const LOGIN_HISTORY = generateLoginHistory();
const USERS = ['All', ...new Set(LOGIN_HISTORY.map(log => log.username))];
const ROLES = ['All', ...new Set(LOGIN_HISTORY.map(log => log.role))];
const STATUSES = ['All', 'Success', 'Failed'];
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

function getStatusBadge(status) {
    const classes = {
        'Success': 'badge-success',
        'Failed': 'badge-danger',
    };
    return classes[status] || 'badge-neutral';
}

function getStatusIcon(status) {
    return status === 'Success' ? <Icon.Check /> : <Icon.X />;
}

function getDeviceIcon(device) {
    if (device.includes('Android') || device.includes('iOS')) {
        return <Icon.Smartphone />;
    }
    return <Icon.Monitor />;
}

function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function toCsv(rows) {
    const header = ['ID', 'Timestamp', 'Username', 'Role', 'IP Address', 'Device', 'Status', 'Failed Reason', 'Session ID', 'Duration (min)'];
    const lines = rows.map((r) => [
        r.id, r.timestamp, r.username, r.role, r.ipAddress, r.device, r.status, r.failedReason || '', r.sessionId || '', r.duration || ''
    ].map((v) => `"${v}"`).join(','));
    return [header.join(','), ...lines].join('\n');
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const LoginHistory = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        user: 'All',
        role: 'All',
        status: 'All',
    });
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [selected, setSelected] = useState(new Set());
    const [isExporting, setIsExporting] = useState(false);

    // Filter logs
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return LOGIN_HISTORY.filter((log) => {
            const matchesQuery = !q ||
                log.username.toLowerCase().includes(q) ||
                log.role.toLowerCase().includes(q) ||
                log.ipAddress.includes(q) ||
                log.device.toLowerCase().includes(q) ||
                log.id.toLowerCase().includes(q);

            const matchesDateFrom = !filters.dateFrom || log.timestamp >= filters.dateFrom;
            const matchesDateTo = !filters.dateTo || log.timestamp <= filters.dateTo + 'T23:59:59';
            const matchesUser = filters.user === 'All' || log.username === filters.user;
            const matchesRole = filters.role === 'All' || log.role === filters.role;
            const matchesStatus = filters.status === 'All' || log.status === filters.status;

            return matchesQuery && matchesDateFrom && matchesDateTo &&
                matchesUser && matchesRole && matchesStatus;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Statistics
    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const todayLogins = LOGIN_HISTORY.filter(log => log.timestamp.startsWith(today));
        const totalToday = todayLogins.length;
        const failedToday = todayLogins.filter(log => log.status === 'Failed').length;
        const totalFailed = LOGIN_HISTORY.filter(log => log.status === 'Failed').length;
        const activeSessions = LOGIN_HISTORY.filter(log => log.status === 'Success' && log.duration !== null && log.duration < 120).length;

        // Get unique users with active sessions (simplified)
        const activeUsers = new Set(LOGIN_HISTORY.filter(log => log.status === 'Success').map(log => log.username)).size;

        return {
            todayLogins: totalToday,
            failedToday: failedToday,
            totalFailed: totalFailed,
            activeSessions: activeUsers,
            totalLogins: LOGIN_HISTORY.length,
            successRate: ((LOGIN_HISTORY.filter(l => l.status === 'Success').length / LOGIN_HISTORY.length) * 100).toFixed(1),
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
    const selectedLogs = LOGIN_HISTORY.filter((log) => selected.has(log.id));

    const applyFilters = () => setPage(1);
    const resetFilters = () => {
        setFilters({
            dateFrom: '',
            dateTo: '',
            user: 'All',
            role: 'All',
            status: 'All',
        });
        setPage(1);
    };

    // Export handler
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const dataToExport = selected.size > 0 ? selectedLogs : filtered;
            download('login_history.csv', toCsv(dataToExport), 'text/csv;charset=utf-8;');
            setIsExporting(false);
        }, 800);
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className="lh-page">
            <div className="lh-blob lh-blob-1" />
            <div className="lh-blob lh-blob-2" />

            <div className="lh-inner">
                {/* Header */}
                <div className="lh-header">
                    <button className="lh-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Dashboard
                    </button>
                    <div className="lh-title-area">
                        <div className="lh-title-row">
                            <div>
                                <h1 className="lh-title">Login History</h1>
                                <p className="lh-subtitle">Track all user login attempts and sessions</p>
                            </div>
                            <div className="lh-actions">
                                <button className="lh-btn secondary" onClick={handleExport} disabled={isExporting}>
                                    <Icon.Download /> {isExporting ? 'Exporting...' : 'Export'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="lh-stats-grid">
                    <div className="glass-card lh-stat-card">
                        <div className="lh-stat-icon tint-sky"><Icon.LogIn /></div>
                        <div className="lh-stat-label">Today's Logins</div>
                        <div className="lh-stat-value">{stats.todayLogins}</div>
                        <div className="lh-stat-sub">{stats.failedToday} failed attempts</div>
                    </div>
                    <div className="glass-card lh-stat-card">
                        <div className="lh-stat-icon tint-amber"><Icon.AlertCircle /></div>
                        <div className="lh-stat-label">Failed Attempts</div>
                        <div className="lh-stat-value">{stats.totalFailed}</div>
                        <div className="lh-stat-sub">{((stats.totalFailed / stats.totalLogins) * 100).toFixed(1)}% of total</div>
                    </div>
                    <div className="glass-card lh-stat-card">
                        <div className="lh-stat-icon tint-mist"><Icon.User /></div>
                        <div className="lh-stat-label">Active Sessions</div>
                        <div className="lh-stat-value">{stats.activeSessions}</div>
                        <div className="lh-stat-sub">Unique users</div>
                    </div>
                    <div className="glass-card lh-stat-card">
                        <div className="lh-stat-icon tint-sage"><Icon.Check /></div>
                        <div className="lh-stat-label">Success Rate</div>
                        <div className="lh-stat-value">{stats.successRate}%</div>
                        <div className="lh-stat-sub">{stats.totalLogins} total attempts</div>
                    </div>
                </div>

                {/* Selected Count */}
                {selected.size > 0 && (
                    <div className="lh-selected-bar">
                        <span className="lh-selected-count">{selected.size} items selected</span>
                        <button className="lh-btn ghost" onClick={clearSelection}>Clear Selection</button>
                    </div>
                )}

                {/* Toolbar */}
                <div className="glass-card lh-toolbar">
                    <div className="lh-search">
                        <Icon.Search />
                        <input
                            placeholder="Search by username, role, IP, or device..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        />
                    </div>
                    <button className={`lh-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                        <Icon.Filter /> Filters
                    </button>
                </div>

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="glass-card lh-filter-panel">
                        <div className="lh-filter-grid">
                            <div className="lh-filter-field">
                                <label className="lh-filter-label">Date From</label>
                                <input type="date" className="lh-input" value={filters.dateFrom} onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} />
                            </div>
                            <div className="lh-filter-field">
                                <label className="lh-filter-label">Date To</label>
                                <input type="date" className="lh-input" value={filters.dateTo} onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} />
                            </div>
                            <div className="lh-filter-field">
                                <label className="lh-filter-label">User</label>
                                <select className="lh-select" value={filters.user} onChange={(e) => setFilters((f) => ({ ...f, user: e.target.value }))}>
                                    {USERS.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                            <div className="lh-filter-field">
                                <label className="lh-filter-label">Role</label>
                                <select className="lh-select" value={filters.role} onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))}>
                                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="lh-filter-field">
                                <label className="lh-filter-label">Status</label>
                                <select className="lh-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="lh-filter-actions">
                            <button className="lh-btn ghost" onClick={resetFilters}>Reset</button>
                            <button className="lh-btn primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="glass-card lh-table-card">
                    {paged.length === 0 ? (
                        <div className="lh-empty">
                            <Icon.LogIn />
                            <div>No login records found</div>
                            <div className="lh-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="lh-table-wrap">
                            <table className="lh-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" className="lh-checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
                                        <th>Timestamp</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>IP Address</th>
                                        <th>Device</th>
                                        <th>Status</th>
                                        <th>Failed Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((log) => (
                                        <tr key={log.id} className={selected.has(log.id) ? 'selected' : ''}>
                                            <td><input type="checkbox" className="lh-checkbox" checked={selected.has(log.id)} onChange={() => toggleOne(log.id)} /></td>
                                            <td className="lh-timestamp">{formatDateTime(log.timestamp)}</td>
                                            <td>
                                                <div className="lh-user-cell">
                                                    <div className="lh-user-avatar">{log.username.slice(0, 2).toUpperCase()}</div>
                                                    <span className="lh-username">{log.username}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="lh-role-badge">{log.role}</span>
                                            </td>
                                            <td className="lh-ip">{log.ipAddress}</td>
                                            <td>
                                                <div className="lh-device-cell">
                                                    {getDeviceIcon(log.device)}
                                                    <span className="lh-device-text">{log.device}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`lh-status-badge ${getStatusBadge(log.status)}`}>
                                                    {getStatusIcon(log.status)}
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="lh-failed-reason">
                                                {log.failedReason ? (
                                                    <span className="lh-failed-text">{log.failedReason}</span>
                                                ) : (
                                                    <span className="lh-no-reason">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="lh-pagination">
                            <div className="lh-pagination-left">
                                Rows per page
                                <select className="lh-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
                            </div>
                            <div className="lh-pagination-controls">
                                <button className="lh-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
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
                                        <button key={pageNum} className={`lh-page-btn ${pageNum === currentPage ? 'active' : ''}`} onClick={() => setPage(pageNum)}>
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button className="lh-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginHistory;