import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/BillList.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const BILLS = [
    { id: 'BIL-1089', patient: 'Amara Perera', date: '2026-07-28', amount: 18500, status: 'paid', method: 'Card', paymentDate: '2026-07-28' },
    { id: 'BIL-1088', patient: 'Nadun Fernando', date: '2026-07-25', amount: 8500, status: 'paid', method: 'Cash', paymentDate: '2026-07-25' },
    { id: 'BIL-1087', patient: 'Ishara Gunaratne', date: '2026-07-22', amount: 2500, status: 'paid', method: 'Cash', paymentDate: '2026-07-22' },
    { id: 'BIL-1086', patient: 'Kavindu Jayasuriya', date: '2026-07-20', amount: 12000, status: 'paid', method: 'Card', paymentDate: '2026-07-20' },
    { id: 'BIL-1085', patient: 'Sanduni Wickrama', date: '2026-07-18', amount: 4500, status: 'paid', method: 'Cash', paymentDate: '2026-07-18' },
    { id: 'BIL-1084', patient: 'Tharindu Bandara', date: '2026-07-15', amount: 32000, status: 'pending', method: null, paymentDate: null },
    { id: 'BIL-1083', patient: 'Dilini Rathnayake', date: '2026-07-12', amount: 15600, status: 'unpaid', method: null, paymentDate: null },
    { id: 'BIL-1082', patient: 'Chamod Wijesinghe', date: '2026-07-10', amount: 28000, status: 'partial', method: 'Cash', paymentDate: '2026-07-10' },
    { id: 'BIL-1081', patient: 'Yashodha Silva', date: '2026-07-08', amount: 9200, status: 'paid', method: 'Card', paymentDate: '2026-07-08' },
    { id: 'BIL-1080', patient: 'Ruwan Abeysekera', date: '2026-07-05', amount: 41000, status: 'pending', method: null, paymentDate: null },
    { id: 'BIL-1079', patient: 'Menaka de Zoysa', date: '2026-07-03', amount: 7800, status: 'paid', method: 'HICAPS', paymentDate: '2026-07-03' },
    { id: 'BIL-1078', patient: 'Isuru Karunaratne', date: '2026-07-01', amount: 15500, status: 'unpaid', method: null, paymentDate: null },
    { id: 'BIL-1077', patient: 'Nethmi Jayawardena', date: '2026-06-28', amount: 22500, status: 'paid', method: 'Card', paymentDate: '2026-06-28' },
    { id: 'BIL-1076', patient: 'Oshan Mendis', date: '2026-06-25', amount: 9800, status: 'partial', method: 'Cash', paymentDate: '2026-06-25' },
    { id: 'BIL-1075', patient: 'Thilini Ekanayake', date: '2026-06-22', amount: 34500, status: 'pending', method: null, paymentDate: null },
];

const PAYMENT_METHODS = ['All', 'Cash', 'Card', 'HICAPS'];
const STATUS_OPTIONS = ['All', 'paid', 'unpaid', 'pending', 'partial'];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const emptyFilters = { dateFrom: '', dateTo: '', status: 'All', method: 'All', amountMin: '', amountMax: '' };

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

function getStatusBadge(status) {
    const classes = {
        'paid': 'badge-success',
        'unpaid': 'badge-danger',
        'pending': 'badge-warning',
        'partial': 'badge-info',
    };
    return classes[status.toLowerCase()] || 'badge-neutral';
}

function getStatusLabel(status) {
    const labels = {
        'paid': 'Paid',
        'unpaid': 'Unpaid',
        'pending': 'Pending',
        'partial': 'Partial',
    };
    return labels[status.toLowerCase()] || status;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function toCsv(rows) {
    const header = ['Bill Number', 'Patient', 'Date', 'Amount', 'Status', 'Payment Method', 'Payment Date'];
    const lines = rows.map((r) => [
        r.id, r.patient, r.date, r.amount, r.status, r.method || 'N/A', r.paymentDate || 'N/A'
    ].map((v) => `"${v}"`).join(','));
    return [header.join(','), ...lines].join('\n');
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const BillList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState(emptyFilters);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [selected, setSelected] = useState(new Set());
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter bills
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return BILLS.filter((bill) => {
            const matchesQuery = !q ||
                bill.id.toLowerCase().includes(q) ||
                bill.patient.toLowerCase().includes(q);

            const matchesDateFrom = !filters.dateFrom || bill.date >= filters.dateFrom;
            const matchesDateTo = !filters.dateTo || bill.date <= filters.dateTo;
            const matchesStatus = filters.status === 'All' || bill.status === filters.status;
            const matchesMethod = filters.method === 'All' || bill.method === filters.method;
            const matchesAmountMin = !filters.amountMin || bill.amount >= Number(filters.amountMin);
            const matchesAmountMax = !filters.amountMax || bill.amount <= Number(filters.amountMax);

            return matchesQuery && matchesDateFrom && matchesDateTo && matchesStatus &&
                matchesMethod && matchesAmountMin && matchesAmountMax;
        });
    }, [query, filters]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Statistics
    const stats = useMemo(() => {
        const total = BILLS.reduce((sum, bill) => sum + bill.amount, 0);
        const paid = BILLS.filter(b => b.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
        const unpaid = BILLS.filter(b => b.status === 'unpaid').reduce((sum, bill) => sum + bill.amount, 0);
        const pending = BILLS.filter(b => b.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0);
        const partial = BILLS.filter(b => b.status === 'partial').reduce((sum, bill) => sum + bill.amount, 0);
        const outstanding = unpaid + pending + partial;

        const today = new Date().toISOString().split('T')[0];
        const todayRevenue = BILLS
            .filter(b => b.date === today && b.status === 'paid')
            .reduce((sum, bill) => sum + bill.amount, 0);

        return {
            total,
            paid,
            outstanding,
            todayRevenue,
            count: BILLS.length,
        };
    }, []);

    // Selection handlers
    const allOnPageSelected = paged.length > 0 && paged.every((bill) => selected.has(bill.id));

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
            if (allOnPageSelected) paged.forEach((bill) => next.delete(bill.id));
            else paged.forEach((bill) => next.add(bill.id));
            return next;
        });
    };

    const clearSelection = () => setSelected(new Set());
    const selectedBills = BILLS.filter((bill) => selected.has(bill.id));

    const applyFilters = () => setPage(1);
    const resetFilters = () => { setFilters(emptyFilters); setPage(1); };

    // Action handlers
    const handleView = (id) => navigate(`/admin/bills/${id}`);
    const handlePrint = (id) => alert(`Printing bill ${id}...`);
    const handleEmail = (id) => alert(`Emailing bill ${id}...`);
    const handleNewBill = () => navigate('/admin/bills/new');

    // Bulk action handlers
    const handleBulkExport = () => {
        if (selectedBills.length === 0) return alert('Please select bills to export');
        download('bills.csv', toCsv(selectedBills), 'text/csv;charset=utf-8;');
    };

    const handleBulkPrint = () => {
        if (selectedBills.length === 0) return alert('Please select bills to print');
        alert(`Printing ${selectedBills.length} bills...`);
    };

    const handleBulkEmail = () => {
        if (selectedBills.length === 0) return alert('Please select bills to email');
        alert(`Emailing ${selectedBills.length} bills...`);
    };

    return (
        <div className="bl-page">
            <div className="bl-blob bl-blob-1" />
            <div className="bl-blob bl-blob-2" />

            <div className="bl-inner">
                {/* Header */}
                <div className="bl-header">
                    <div>
                        <div className="bl-title">Billing & Invoices</div>
                        <div className="bl-subtitle">Manage all patient bills and track payments</div>
                    </div>
                    <button className="bl-btn primary" onClick={handleNewBill}>
                        <Icon.Plus /> New Bill
                    </button>
                </div>

                {/* Statistics */}
                <div className="bl-stats-grid">
                    <div className="glass-card bl-stat-card">
                        <div className="bl-stat-icon tint-sky"><Icon.DollarSign /></div>
                        <div className="bl-stat-label">Total Revenue</div>
                        <div className="bl-stat-value">{formatCurrency(stats.total)}</div>
                        <div className="bl-stat-sub">{stats.count} bills</div>
                    </div>
                    <div className="glass-card bl-stat-card">
                        <div className="bl-stat-icon tint-mist"><Icon.Check /></div>
                        <div className="bl-stat-label">Paid Amount</div>
                        <div className="bl-stat-value" style={{ color: '#4A7A64' }}>{formatCurrency(stats.paid)}</div>
                        <div className="bl-stat-sub">{((stats.paid / stats.total) * 100).toFixed(1)}% of total</div>
                    </div>
                    <div className="glass-card bl-stat-card">
                        <div className="bl-stat-icon tint-amber"><Icon.AlertCircle /></div>
                        <div className="bl-stat-label">Outstanding</div>
                        <div className="bl-stat-value" style={{ color: '#C4954C' }}>{formatCurrency(stats.outstanding)}</div>
                        <div className="bl-stat-sub">{((stats.outstanding / stats.total) * 100).toFixed(1)}% of total</div>
                    </div>
                    <div className="glass-card bl-stat-card">
                        <div className="bl-stat-icon tint-sage"><Icon.Calendar /></div>
                        <div className="bl-stat-label">Today's Revenue</div>
                        <div className="bl-stat-value" style={{ color: '#3A7A8A' }}>{formatCurrency(stats.todayRevenue)}</div>
                        <div className="bl-stat-sub">Today's collections</div>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selected.size > 0 ? (
                    <div className="glass-card bl-bulk-bar">
                        <div className="bl-bulk-count">{selected.size} selected</div>
                        <div className="bl-bulk-actions">
                            <button className="bl-btn" onClick={handleBulkExport}>
                                <Icon.Download /> Export CSV
                            </button>
                            <button className="bl-btn" onClick={handleBulkPrint}>
                                <Icon.Printer /> Print
                            </button>
                            <button className="bl-btn" onClick={handleBulkEmail}>
                                <Icon.Mail /> Email
                            </button>
                            <button className="bl-btn ghost" onClick={clearSelection}>Clear</button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card bl-toolbar">
                        <div className="bl-search">
                            <Icon.Search />
                            <input
                                placeholder="Search by bill number or patient name..."
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                            />
                        </div>
                        <button className={`bl-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
                            <Icon.Filter /> Filters
                        </button>
                    </div>
                )}

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="glass-card bl-filter-panel">
                        <div className="bl-filter-grid">
                            <div className="bl-filter-field">
                                <label className="bl-filter-label">Date From</label>
                                <input type="date" className="bl-input" value={filters.dateFrom} onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} />
                            </div>
                            <div className="bl-filter-field">
                                <label className="bl-filter-label">Date To</label>
                                <input type="date" className="bl-input" value={filters.dateTo} onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} />
                            </div>
                            <div className="bl-filter-field">
                                <label className="bl-filter-label">Payment Status</label>
                                <select className="bl-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'All' ? 'All' : getStatusLabel(s)}</option>)}
                                </select>
                            </div>
                            <div className="bl-filter-field">
                                <label className="bl-filter-label">Payment Method</label>
                                <select className="bl-select" value={filters.method} onChange={(e) => setFilters((f) => ({ ...f, method: e.target.value }))}>
                                    {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="bl-filter-field span-2">
                                <label className="bl-filter-label">Amount Range</label>
                                <div className="bl-range-row">
                                    <input type="number" className="bl-input" placeholder="Min" value={filters.amountMin} onChange={(e) => setFilters((f) => ({ ...f, amountMin: e.target.value }))} />
                                    <span>to</span>
                                    <input type="number" className="bl-input" placeholder="Max" value={filters.amountMax} onChange={(e) => setFilters((f) => ({ ...f, amountMax: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                        <div className="bl-filter-actions">
                            <button className="bl-btn ghost" onClick={resetFilters}>Reset</button>
                            <button className="bl-btn primary" onClick={applyFilters}>Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="glass-card bl-table-card">
                    {paged.length === 0 ? (
                        <div className="bl-empty">
                            <Icon.Receipt />
                            <div>No bills found</div>
                            <div className="bl-empty-sub">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div className="bl-table-wrap">
                            <table className="bl-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" className="bl-checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
                                        <th>Bill Number</th>
                                        <th>Patient</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Payment Method</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paged.map((bill) => (
                                        <tr key={bill.id} className={selected.has(bill.id) ? 'selected' : ''}>
                                            <td><input type="checkbox" className="bl-checkbox" checked={selected.has(bill.id)} onChange={() => toggleOne(bill.id)} /></td>
                                            <td className="bl-bill-id">{bill.id}</td>
                                            <td>
                                                <div className="bl-patient-cell">
                                                    <div className="bl-avatar">{getInitials(bill.patient)}</div>
                                                    {bill.patient}
                                                </div>
                                            </td>
                                            <td>{formatDate(bill.date)}</td>
                                            <td className="bl-amount">{formatCurrency(bill.amount)}</td>
                                            <td><span className={`bl-badge ${getStatusBadge(bill.status)}`}>{getStatusLabel(bill.status)}</span></td>
                                            <td>{bill.method || '—'}</td>
                                            <td>
                                                <div className="bl-row-actions">
                                                    <button className="bl-icon-btn" onClick={() => handleView(bill.id)} aria-label="View"><Icon.Eye /></button>
                                                    <button className="bl-icon-btn" onClick={() => handlePrint(bill.id)} aria-label="Print"><Icon.Printer /></button>
                                                    <button className="bl-icon-btn" onClick={() => handleEmail(bill.id)} aria-label="Email"><Icon.Mail /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="bl-pagination">
                            <div className="bl-pagination-left">
                                Rows per page
                                <select className="bl-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
                            </div>
                            <div className="bl-pagination-controls">
                                <button className="bl-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button key={n} className={`bl-page-btn ${n === currentPage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                                ))}
                                <button className="bl-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BillList;