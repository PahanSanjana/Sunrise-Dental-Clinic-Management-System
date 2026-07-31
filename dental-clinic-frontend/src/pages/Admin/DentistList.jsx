import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/DentistList.css';

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
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const DENTISTS = [
    {
        id: 'D-001',
        name: 'Dr. Anura Silva',
        specialization: 'General Dentistry',
        consultationFee: 2500,
        status: 'Active',
        totalAppointments: 145,
        rating: 4.8,
        yearsExperience: 15,
        email: 'anura.silva@clinic.com',
        phone: '+94 71 234 5678'
    },
    {
        id: 'D-002',
        name: 'Dr. Chandana Perera',
        specialization: 'Orthodontics',
        consultationFee: 3500,
        status: 'Active',
        totalAppointments: 98,
        rating: 4.6,
        yearsExperience: 12,
        email: 'chandana.perera@clinic.com',
        phone: '+94 77 345 1290'
    },
    {
        id: 'D-003',
        name: 'Dr. Nimal Fernando',
        specialization: 'Endodontics',
        consultationFee: 3000,
        status: 'Active',
        totalAppointments: 67,
        rating: 4.9,
        yearsExperience: 8,
        email: 'nimal.fernando@clinic.com',
        phone: '+94 76 812 3456'
    },
    {
        id: 'D-004',
        name: 'Dr. Kumari Wijesinghe',
        specialization: 'Pediatric Dentistry',
        consultationFee: 2800,
        status: 'Inactive',
        totalAppointments: 43,
        rating: 4.7,
        yearsExperience: 6,
        email: 'kumari.w@clinic.com',
        phone: '+94 70 456 7890'
    },
    {
        id: 'D-005',
        name: 'Dr. Ruwan Bandara',
        specialization: 'Periodontics',
        consultationFee: 3200,
        status: 'Active',
        totalAppointments: 52,
        rating: 4.5,
        yearsExperience: 10,
        email: 'ruwan.b@clinic.com',
        phone: '+94 75 901 2345'
    },
    {
        id: 'D-006',
        name: 'Dr. Sanduni Jayawardena',
        specialization: 'Prosthodontics',
        consultationFee: 4000,
        status: 'Active',
        totalAppointments: 34,
        rating: 4.9,
        yearsExperience: 5,
        email: 'sanduni.j@clinic.com',
        phone: '+94 72 678 1234'
    },
    {
        id: 'D-007',
        name: 'Dr. Tharindu Ekanayake',
        specialization: 'Oral Surgery',
        consultationFee: 4500,
        status: 'Active',
        totalAppointments: 29,
        rating: 4.4,
        yearsExperience: 7,
        email: 'tharindu.e@clinic.com',
        phone: '+94 71 555 9821'
    },
];

const SPECIALIZATIONS = ['All', 'General Dentistry', 'Orthodontics', 'Endodontics', 'Pediatric Dentistry', 'Periodontics', 'Prosthodontics', 'Oral Surgery'];
const STATUSES = ['All', 'Active', 'Inactive'];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
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
    const header = ['Dentist ID', 'Full Name', 'Specialization', 'Consultation Fee', 'Status', 'Total Appointments', 'Rating', 'Years Experience'];
    const lines = rows.map((r) => [
        r.id, r.name, r.specialization, r.consultationFee, r.status, r.totalAppointments, r.rating, r.yearsExperience
    ].map((v) => `"${v}"`).join(','));
    return [header.join(','), ...lines].join('\n');
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const DentistList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ specialization: 'All', status: 'All' });
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter dentists
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return DENTISTS.filter((dentist) => {
            const matchesQuery = !q ||
                dentist.name.toLowerCase().includes(q) ||
                dentist.specialization.toLowerCase().includes(q) ||
                dentist.id.toLowerCase().includes(q);

            const matchesSpecialization = filters.specialization === 'All' || dentist.specialization === filters.specialization;
            const matchesStatus = filters.status === 'All' || dentist.status === filters.status;

            return matchesQuery && matchesSpecialization && matchesStatus;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Statistics
    const stats = useMemo(() => {
        const total = DENTISTS.length;
        const active = DENTISTS.filter(d => d.status === 'Active').length;
        const inactive = DENTISTS.filter(d => d.status === 'Inactive').length;
        const avgConsultation = DENTISTS.reduce((sum, d) => sum + d.consultationFee, 0) / total;
        const totalAppointments = DENTISTS.reduce((sum, d) => sum + d.totalAppointments, 0);
        return { total, active, inactive, avgConsultation: Math.round(avgConsultation), totalAppointments };
    }, []);

    const applyFilters = () => setPage(1);
    const resetFilters = () => { setFilters({ specialization: 'All', status: 'All' }); setPage(1); };

    // Action handlers
    const handleView = (id) => navigate(`/admin/dentists/${id}`);
    const handleEdit = (id) => navigate(`/admin/dentists/${id}/edit`);
    const handleAddDentist = () => navigate('/admin/dentists/new');
    const handleExportCSV = () => {
        download('dentists.csv', toCsv(DENTISTS), 'text/csv;charset=utf-8;');
    };

    return (
        <div className="dl-page">
            <div className="dl-blob dl-blob-1" />
            <div className="dl-blob dl-blob-2" />

            <div className="dl-inner">
                {/* Header */}
                <div className="dl-header">
                    <div>
                        <div className="dl-title">Dentist Management</div>
                        <div className="dl-subtitle">View and manage all dentists in the clinic</div>
                    </div>
                    <div className="dl-header-actions">
                        <button className="dl-btn secondary" onClick={handleExportCSV}>
                            <Icon.Download /> Export CSV
                        </button>
                        <button className="dl-btn primary" onClick={handleAddDentist}>
                            <Icon.Plus /> Add Dentist
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="dl-stats-grid">
                    <div className="glass-card dl-stat-card">
                        <div className="dl-stat-icon tint-sky"><Icon.User /></div>
                        <div className="dl-stat-label">Total Dentists</div>
                        <div className="dl-stat-value">{stats.total}</div>
                    </div>
                    <div className="glass-card dl-stat-card">
                        <div className="dl-stat-icon tint-mist"><Icon.Check /></div>
                        <div className="dl-stat-label">Active</div>
                        <div className="dl-stat-value">{stats.active}</div>
                    </div>
                    <div className="glass-card dl-stat-card">
                        <div className="dl-stat-icon tint-amber"><Icon.X /></div>
                        <div className="dl-stat-label">Inactive</div>
                        <div className="dl-stat-value">{stats.inactive}</div>
                    </div>
                    <div className="glass-card dl-stat-card">
                        <div className="dl-stat-icon tint-sage"><Icon.DollarSign /></div>
                        <div className="dl-stat-label">Avg Consultation Fee</div>
                        <div className="dl-stat-value">{formatCurrency(stats.avgConsultation)}</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="glass-card dl-toolbar">
                    <div className="dl-search">
                        <Icon.Search />
                        <input
                            placeholder="Search by name, specialization, or dentist ID..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        />
                    </div>
                    <button className={`dl-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                        <Icon.Filter /> Filters
                    </button>
                </div>

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="glass-card dl-filter-panel">
                        <div className="dl-filter-grid">
                            <div className="dl-filter-field">
                                <label className="dl-filter-label">Specialization</label>
                                <select className="dl-select" value={filters.specialization} onChange={(e) => setFilters((f) => ({ ...f, specialization: e.target.value }))}>
                                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="dl-filter-field">
                                <label className="dl-filter-label">Status</label>
                                <select className="dl-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="dl-filter-actions">
                            <button className="dl-btn ghost" onClick={resetFilters}>Reset</button>
                            <button className="dl-btn primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="glass-card dl-table-card">
                    {paged.length === 0 ? (
                        <div className="dl-empty">
                            <Icon.User />
                            <div>No dentists found</div>
                            <div className="dl-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="dl-table-wrap">
                            <table className="dl-table">
                                <thead>
                                    <tr>
                                        <th>Dentist ID</th>
                                        <th>Name</th>
                                        <th>Specialization</th>
                                        <th>Consultation Fee</th>
                                        <th>Status</th>
                                        <th>Appointments</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((dentist) => (
                                        <tr key={dentist.id}>
                                            <td className="dl-dentist-id">{dentist.id}</td>
                                            <td>
                                                <div className="dl-dentist-cell">
                                                    <div className="dl-avatar">{getInitials(dentist.name)}</div>
                                                    {dentist.name}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="dl-specialization-badge">{dentist.specialization}</span>
                                            </td>
                                            <td className="dl-fee">{formatCurrency(dentist.consultationFee)}</td>
                                            <td><span className={`dl-badge ${getStatusBadge(dentist.status)}`}>{dentist.status}</span></td>
                                            <td>{dentist.totalAppointments}</td>
                                            <td>
                                                <div className="dl-row-actions">
                                                    <button className="dl-icon-btn" onClick={() => handleView(dentist.id)} aria-label="View"><Icon.Eye /></button>
                                                    <button className="dl-icon-btn" onClick={() => handleEdit(dentist.id)} aria-label="Edit"><Icon.Edit /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="dl-pagination">
                            <div className="dl-pagination-left">
                                Rows per page
                                <select className="dl-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
                            </div>
                            <div className="dl-pagination-controls">
                                <button className="dl-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button key={n} className={`dl-page-btn ${n === currentPage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                                ))}
                                <button className="dl-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DentistList;