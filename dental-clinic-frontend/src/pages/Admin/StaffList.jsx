import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/StaffList.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    UserPlus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Lock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
    Ban: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const STAFF = [
    {
        id: 'STF-001',
        fullName: 'Dr. Anura Silva',
        username: 'dr.silva',
        email: 'anura.silva@clinic.com',
        role: 'Dentist',
        status: 'Active',
        lastLogin: '2026-07-31 09:30 AM',
        createdAt: '2024-01-15'
    },
    {
        id: 'STF-002',
        fullName: 'Dr. Chandana Perera',
        username: 'dr.perera',
        email: 'chandana.perera@clinic.com',
        role: 'Dentist',
        status: 'Active',
        lastLogin: '2026-07-30 04:15 PM',
        createdAt: '2024-03-20'
    },
    {
        id: 'STF-003',
        fullName: 'Dr. Nimal Fernando',
        username: 'dr.fernando',
        email: 'nimal.fernando@clinic.com',
        role: 'Dentist',
        status: 'Active',
        lastLogin: '2026-07-29 11:45 AM',
        createdAt: '2024-06-01'
    },
    {
        id: 'STF-004',
        fullName: 'Kumari Rathnayake',
        username: 'kumari.r',
        email: 'kumari.r@clinic.com',
        role: 'Receptionist',
        status: 'Active',
        lastLogin: '2026-07-31 08:00 AM',
        createdAt: '2024-02-10'
    },
    {
        id: 'STF-005',
        fullName: 'Mala Wijesinghe',
        username: 'mala.w',
        email: 'mala.w@clinic.com',
        role: 'Receptionist',
        status: 'Inactive',
        lastLogin: '2026-07-15 05:30 PM',
        createdAt: '2024-04-05'
    },
    {
        id: 'STF-006',
        fullName: 'Asanka Bandara',
        username: 'asanka.b',
        email: 'asanka.b@clinic.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2026-07-31 10:20 AM',
        createdAt: '2023-11-01'
    },
    {
        id: 'STF-007',
        fullName: 'Sanjeewa Rathnayake',
        username: 'sanjeewa.r',
        email: 'sanjeewa.r@clinic.com',
        role: 'Dentist',
        status: 'Inactive',
        lastLogin: '2026-06-28 02:30 PM',
        createdAt: '2024-07-01'
    },
];

const ROLES = ['All', 'Admin', 'Receptionist', 'Dentist'];
const STATUSES = ['All', 'Active', 'Inactive'];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getRoleBadge(role) {
    const classes = {
        'Admin': 'badge-admin',
        'Dentist': 'badge-dentist',
        'Receptionist': 'badge-receptionist',
    };
    return classes[role] || 'badge-neutral';
}

function getStatusBadge(status) {
    const classes = {
        'Active': 'badge-success',
        'Inactive': 'badge-danger',
        'Pending': 'badge-warning',
    };
    return classes[status] || 'badge-neutral';
}

function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function toCsv(rows) {
    const header = ['Staff ID', 'Full Name', 'Username', 'Email', 'Role', 'Status', 'Last Login', 'Created At'];
    const lines = rows.map((r) => [
        r.id, r.fullName, r.username, r.email, r.role, r.status, r.lastLogin, r.createdAt
    ].map((v) => `"${v}"`).join(','));
    return [header.join(','), ...lines].join('\n');
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const StaffList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ role: 'All', status: 'All' });
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [selected, setSelected] = useState(new Set());
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter staff
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return STAFF.filter((staff) => {
            const matchesQuery = !q ||
                staff.fullName.toLowerCase().includes(q) ||
                staff.username.toLowerCase().includes(q) ||
                staff.email.toLowerCase().includes(q) ||
                staff.id.toLowerCase().includes(q);

            const matchesRole = filters.role === 'All' || staff.role === filters.role;
            const matchesStatus = filters.status === 'All' || staff.status === filters.status;

            return matchesQuery && matchesRole && matchesStatus;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Selection handlers
    const allOnPageSelected = paged.length > 0 && paged.every((staff) => selected.has(staff.id));

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
            if (allOnPageSelected) paged.forEach((staff) => next.delete(staff.id));
            else paged.forEach((staff) => next.add(staff.id));
            return next;
        });
    };

    const clearSelection = () => setSelected(new Set());
    const selectedStaff = STAFF.filter((staff) => selected.has(staff.id));

    const applyFilters = () => setPage(1);
    const resetFilters = () => { setFilters({ role: 'All', status: 'All' }); setPage(1); };

    // Action handlers
    const handleView = (id) => navigate(`/admin/staff/${id}`);
    const handleEdit = (id) => navigate(`/admin/staff/${id}/edit`);
    const handleAddStaff = () => navigate('/admin/staff/new');

    // Bulk action handlers
    const handleBulkExport = () => {
        if (selectedStaff.length === 0) return alert('Please select staff members to export');
        download('staff.csv', toCsv(selectedStaff), 'text/csv;charset=utf-8;');
    };

    const handleBulkDeactivate = () => {
        if (selectedStaff.length === 0) return alert('Please select staff members to deactivate');
        if (window.confirm(`Are you sure you want to deactivate ${selectedStaff.length} staff member(s)?`)) {
            alert(`${selectedStaff.length} staff member(s) deactivated successfully!`);
            clearSelection();
        }
    };

    const handleBulkResetPassword = () => {
        if (selectedStaff.length === 0) return alert('Please select staff members to reset passwords');
        if (window.confirm(`Reset passwords for ${selectedStaff.length} staff member(s)?`)) {
            alert(`Password reset emails sent to ${selectedStaff.length} staff member(s)!`);
            clearSelection();
        }
    };

    return (
        <div className="sl-page">
            <div className="sl-blob sl-blob-1" />
            <div className="sl-blob sl-blob-2" />

            <div className="sl-inner">
                {/* Header */}
                <div className="sl-header">
                    <div>
                        <div className="sl-title">Staff Management</div>
                        <div className="sl-subtitle">Manage all staff accounts and permissions</div>
                    </div>
                    <button className="sl-btn primary" onClick={handleAddStaff}>
                        <Icon.UserPlus /> Add Staff
                    </button>
                </div>

                {/* Statistics */}
                <div className="sl-stats-grid">
                    <div className="glass-card sl-stat-card">
                        <div className="sl-stat-icon tint-sky"><Icon.User /></div>
                        <div className="sl-stat-label">Total Staff</div>
                        <div className="sl-stat-value">{STAFF.length}</div>
                    </div>
                    <div className="glass-card sl-stat-card">
                        <div className="sl-stat-icon tint-mist"><Icon.Check /></div>
                        <div className="sl-stat-label">Active</div>
                        <div className="sl-stat-value">{STAFF.filter(s => s.status === 'Active').length}</div>
                    </div>
                    <div className="glass-card sl-stat-card">
                        <div className="sl-stat-icon tint-amber"><Icon.Ban /></div>
                        <div className="sl-stat-label">Inactive</div>
                        <div className="sl-stat-value">{STAFF.filter(s => s.status === 'Inactive').length}</div>
                    </div>
                    <div className="glass-card sl-stat-card">
                        <div className="sl-stat-icon tint-sage"><Icon.AlertCircle /></div>
                        <div className="sl-stat-label">Dentists</div>
                        <div className="sl-stat-value">{STAFF.filter(s => s.role === 'Dentist').length}</div>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selected.size > 0 ? (
                    <div className="glass-card sl-bulk-bar">
                        <div className="sl-bulk-count">{selected.size} selected</div>
                        <div className="sl-bulk-actions">
                            <button className="sl-btn" onClick={handleBulkExport}>
                                <Icon.Download /> Export CSV
                            </button>
                            <button className="sl-btn" onClick={handleBulkResetPassword}>
                                <Icon.Lock /> Reset Passwords
                            </button>
                            <button className="sl-btn danger" onClick={handleBulkDeactivate}>
                                <Icon.Ban /> Deactivate
                            </button>
                            <button className="sl-btn ghost" onClick={clearSelection}>Clear</button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card sl-toolbar">
                        <div className="sl-search">
                            <Icon.Search />
                            <input
                                placeholder="Search by name, username, email, or staff ID..."
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                            />
                        </div>
                        <button className={`sl-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                            <Icon.Filter /> Filters
                        </button>
                    </div>
                )}

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="glass-card sl-filter-panel">
                        <div className="sl-filter-grid">
                            <div className="sl-filter-field">
                                <label className="sl-filter-label">Role</label>
                                <select className="sl-select" value={filters.role} onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))}>
                                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="sl-filter-field">
                                <label className="sl-filter-label">Status</label>
                                <select className="sl-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="sl-filter-actions">
                            <button className="sl-btn ghost" onClick={resetFilters}>Reset</button>
                            <button className="sl-btn primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="glass-card sl-table-card">
                    {paged.length === 0 ? (
                        <div className="sl-empty">
                            <Icon.User />
                            <div>No staff members found</div>
                            <div className="sl-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="sl-table-wrap">
                            <table className="sl-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" className="sl-checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
                                        <th>Staff ID</th>
                                        <th>Full Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Last Login</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((staff) => (
                                        <tr key={staff.id} className={selected.has(staff.id) ? 'selected' : ''}>
                                            <td><input type="checkbox" className="sl-checkbox" checked={selected.has(staff.id)} onChange={() => toggleOne(staff.id)} /></td>
                                            <td className="sl-staff-id">{staff.id}</td>
                                            <td>
                                                <div className="sl-staff-cell">
                                                    <div className="sl-avatar">{getInitials(staff.fullName)}</div>
                                                    {staff.fullName}
                                                </div>
                                            </td>
                                            <td>@{staff.username}</td>
                                            <td>{staff.email}</td>
                                            <td><span className={`sl-badge ${getRoleBadge(staff.role)}`}>{staff.role}</span></td>
                                            <td><span className={`sl-badge ${getStatusBadge(staff.status)}`}>{staff.status}</span></td>
                                            <td className="sl-last-login">{staff.lastLogin}</td>
                                            <td>
                                                <div className="sl-row-actions">
                                                    <button className="sl-icon-btn" onClick={() => handleView(staff.id)} aria-label="View"><Icon.Eye /></button>
                                                    <button className="sl-icon-btn" onClick={() => handleEdit(staff.id)} aria-label="Edit"><Icon.Edit /></button>
                                                    <button className="sl-icon-btn danger" aria-label="Deactivate"><Icon.Ban /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="sl-pagination">
                            <div className="sl-pagination-left">
                                Rows per page
                                <select className="sl-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
                            </div>
                            <div className="sl-pagination-controls">
                                <button className="sl-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button key={n} className={`sl-page-btn ${n === currentPage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                                ))}
                                <button className="sl-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffList;