import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/TreatmentList.css';

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
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const TREATMENTS = [
    {
        id: 'TRT-001',
        name: 'Dental Cleaning',
        baseCost: 8500,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 156,
        duration: 30,
        category: 'Preventive'
    },
    {
        id: 'TRT-002',
        name: 'Root Canal',
        baseCost: 18500,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 89,
        duration: 90,
        category: 'Restorative'
    },
    {
        id: 'TRT-003',
        name: 'Extraction',
        baseCost: 4500,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 234,
        duration: 45,
        category: 'Surgical'
    },
    {
        id: 'TRT-004',
        name: 'Filling',
        baseCost: 12000,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 178,
        duration: 60,
        category: 'Restorative'
    },
    {
        id: 'TRT-005',
        name: 'Teeth Whitening',
        baseCost: 15000,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 67,
        duration: 45,
        category: 'Cosmetic'
    },
    {
        id: 'TRT-006',
        name: 'Consultation',
        baseCost: 0,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 312,
        duration: 30,
        category: 'Diagnostic'
    },
    {
        id: 'TRT-007',
        name: 'Crown Placement',
        baseCost: 22000,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 45,
        duration: 120,
        category: 'Restorative'
    },
    {
        id: 'TRT-008',
        name: 'Orthodontic Braces',
        baseCost: 45000,
        consultationFee: 3500,
        status: 'Active',
        usageCount: 23,
        duration: 60,
        category: 'Orthodontic'
    },
    {
        id: 'TRT-009',
        name: 'Dental Implant',
        baseCost: 35000,
        consultationFee: 3500,
        status: 'Inactive',
        usageCount: 12,
        duration: 90,
        category: 'Surgical'
    },
    {
        id: 'TRT-010',
        name: 'Gum Treatment',
        baseCost: 18000,
        consultationFee: 2500,
        status: 'Active',
        usageCount: 34,
        duration: 60,
        category: 'Periodontic'
    },
];

const STATUSES = ['All', 'Active', 'Inactive'];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
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

function getCategoryBadge(category) {
    const classes = {
        'Preventive': 'badge-preventive',
        'Restorative': 'badge-restorative',
        'Surgical': 'badge-surgical',
        'Cosmetic': 'badge-cosmetic',
        'Diagnostic': 'badge-diagnostic',
        'Orthodontic': 'badge-orthodontic',
        'Periodontic': 'badge-periodontic',
    };
    return classes[category] || 'badge-neutral';
}

function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function toCsv(rows) {
    const header = ['Treatment ID', 'Name', 'Base Cost', 'Consultation Fee', 'Status', 'Usage Count', 'Duration (min)', 'Category'];
    const lines = rows.map((r) => [
        r.id, r.name, r.baseCost, r.consultationFee, r.status, r.usageCount, r.duration, r.category
    ].map((v) => `"${v}"`).join(','));
    return [header.join(','), ...lines].join('\n');
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const TreatmentList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ status: 'All' });
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter treatments
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return TREATMENTS.filter((treatment) => {
            const matchesQuery = !q ||
                treatment.name.toLowerCase().includes(q) ||
                treatment.id.toLowerCase().includes(q) ||
                treatment.category.toLowerCase().includes(q);

            const matchesStatus = filters.status === 'All' || treatment.status === filters.status;

            return matchesQuery && matchesStatus;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Statistics
    const stats = useMemo(() => {
        const total = TREATMENTS.length;
        const active = TREATMENTS.filter(t => t.status === 'Active').length;
        const inactive = TREATMENTS.filter(t => t.status === 'Inactive').length;
        const avgCost = TREATMENTS.reduce((sum, t) => sum + t.baseCost, 0) / total;
        const totalUsage = TREATMENTS.reduce((sum, t) => sum + t.usageCount, 0);
        return { total, active, inactive, avgCost: Math.round(avgCost), totalUsage };
    }, []);

    const applyFilters = () => setPage(1);
    const resetFilters = () => { setFilters({ status: 'All' }); setPage(1); };

    // Action handlers
    const handleView = (id) => navigate(`/admin/treatments/${id}`);
    const handleEdit = (id) => navigate(`/admin/treatments/${id}/edit`);
    const handleAddTreatment = () => navigate('/admin/treatments/new');
    const handleExportCSV = () => {
        download('treatments.csv', toCsv(TREATMENTS), 'text/csv;charset=utf-8;');
    };

    return (
        <div className="tl-page">
            <div className="tl-blob tl-blob-1" />
            <div className="tl-blob tl-blob-2" />

            <div className="tl-inner">
                {/* Header */}
                <div className="tl-header">
                    <div>
                        <div className="tl-title">Treatment Management</div>
                        <div className="tl-subtitle">View and manage all treatment types and prices</div>
                    </div>
                    <div className="tl-header-actions">
                        <button className="tl-btn secondary" onClick={handleExportCSV}>
                            <Icon.Download /> Export CSV
                        </button>
                        <button className="tl-btn primary" onClick={handleAddTreatment}>
                            <Icon.Plus /> Add Treatment
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="tl-stats-grid">
                    <div className="glass-card tl-stat-card">
                        <div className="tl-stat-icon tint-sky"><Icon.Stethoscope /></div>
                        <div className="tl-stat-label">Total Treatments</div>
                        <div className="tl-stat-value">{stats.total}</div>
                    </div>
                    <div className="glass-card tl-stat-card">
                        <div className="tl-stat-icon tint-mist"><Icon.Check /></div>
                        <div className="tl-stat-label">Active</div>
                        <div className="tl-stat-value">{stats.active}</div>
                    </div>
                    <div className="glass-card tl-stat-card">
                        <div className="tl-stat-icon tint-amber"><Icon.X /></div>
                        <div className="tl-stat-label">Inactive</div>
                        <div className="tl-stat-value">{stats.inactive}</div>
                    </div>
                    <div className="glass-card tl-stat-card">
                        <div className="tl-stat-icon tint-sage"><Icon.DollarSign /></div>
                        <div className="tl-stat-label">Avg Base Cost</div>
                        <div className="tl-stat-value">{formatCurrency(stats.avgCost)}</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="glass-card tl-toolbar">
                    <div className="tl-search">
                        <Icon.Search />
                        <input
                            placeholder="Search by name, category, or treatment ID..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        />
                    </div>
                    <button className={`tl-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                        <Icon.Filter /> Filters
                    </button>
                </div>

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="glass-card tl-filter-panel">
                        <div className="tl-filter-grid">
                            <div className="tl-filter-field">
                                <label className="tl-filter-label">Status</label>
                                <select className="tl-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="tl-filter-actions">
                            <button className="tl-btn ghost" onClick={resetFilters}>Reset</button>
                            <button className="tl-btn primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="glass-card tl-table-card">
                    {paged.length === 0 ? (
                        <div className="tl-empty">
                            <Icon.Stethoscope />
                            <div>No treatments found</div>
                            <div className="tl-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="tl-table-wrap">
                            <table className="tl-table">
                                <thead>
                                    <tr>
                                        <th>Treatment ID</th>
                                        <th>Name</th>
                                        <th>Base Cost</th>
                                        <th>Consultation Fee</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                        <th>Usage Count</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((treatment) => (
                                        <tr key={treatment.id}>
                                            <td className="tl-treatment-id">{treatment.id}</td>
                                            <td>
                                                <div className="tl-treatment-cell">
                                                    <div className="tl-category-badge">
                                                        <span className={`tl-category-dot ${getCategoryBadge(treatment.category)}`} />
                                                        {treatment.category}
                                                    </div>
                                                    <span className="tl-treatment-name">{treatment.name}</span>
                                                </div>
                                            </td>
                                            <td className="tl-cost">{formatCurrency(treatment.baseCost)}</td>
                                            <td className="tl-cost">{formatCurrency(treatment.consultationFee)}</td>
                                            <td>{treatment.duration} min</td>
                                            <td><span className={`tl-badge ${getStatusBadge(treatment.status)}`}>{treatment.status}</span></td>
                                            <td className="tl-usage">{treatment.usageCount}</td>
                                            <td>
                                                <div className="tl-row-actions">
                                                    <button className="tl-icon-btn" onClick={() => handleView(treatment.id)} aria-label="View"><Icon.Eye /></button>
                                                    <button className="tl-icon-btn" onClick={() => handleEdit(treatment.id)} aria-label="Edit"><Icon.Edit /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="tl-pagination">
                            <div className="tl-pagination-left">
                                Rows per page
                                <select className="tl-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
                            </div>
                            <div className="tl-pagination-controls">
                                <button className="tl-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button key={n} className={`tl-page-btn ${n === currentPage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                                ))}
                                <button className="tl-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TreatmentList;