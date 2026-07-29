import React, { useState, useMemo } from 'react';
import './AdminPatientList.css';

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
  Filter: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>),
  Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
  Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
  Sheet: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>),
  Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
  Ban: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>),
  Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
  Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
  ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
  ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
  Inbox: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>),
  Patients: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m22 4-10 10-3-3" /></svg>),
  X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
  Sparkle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder data — replace with your API call
// ---------------------------------------------------------------
const PATIENTS = [
  { id: 'PT-1042', name: 'Amara Perera', phone: '+94 71 234 5678', email: 'amara.perera@mail.com', regDate: '2026-07-24', status: 'Active', portal: true, gender: 'Female', age: 35 },
  { id: 'PT-1041', name: 'Nadun Fernando', phone: '+94 77 345 1290', email: 'nadun.f@mail.com', regDate: '2026-07-20', status: 'Active', portal: true, gender: 'Male', age: 28 },
  { id: 'PT-1040', name: 'Ishara Gunaratne', phone: '+94 76 812 3456', email: 'ishara.g@mail.com', regDate: '2026-07-18', status: 'Active', portal: false, gender: 'Female', age: 41 },
  { id: 'PT-1039', name: 'Kavindu Jayasuriya', phone: '+94 70 456 7890', email: 'kavindu.j@mail.com', regDate: '2026-06-30', status: 'Inactive', portal: false, gender: 'Male', age: 52 },
  { id: 'PT-1038', name: 'Sanduni Wickrama', phone: '+94 75 901 2345', email: 'sanduni.w@mail.com', regDate: '2026-06-22', status: 'Active', portal: true, gender: 'Female', age: 24 },
  { id: 'PT-1037', name: 'Tharindu Bandara', phone: '+94 72 678 1234', email: 'tharindu.b@mail.com', regDate: '2026-06-15', status: 'Active', portal: true, gender: 'Male', age: 33 },
  { id: 'PT-1036', name: 'Dilini Rathnayake', phone: '+94 71 555 9821', email: 'dilini.r@mail.com', regDate: '2026-05-28', status: 'Inactive', portal: false, gender: 'Female', age: 46 },
  { id: 'PT-1035', name: 'Chamod Wijesinghe', phone: '+94 77 222 4410', email: 'chamod.w@mail.com', regDate: '2026-05-19', status: 'Active', portal: true, gender: 'Male', age: 29 },
  { id: 'PT-1034', name: 'Yashodha Silva', phone: '+94 76 333 8871', email: 'yashodha.s@mail.com', regDate: '2026-05-11', status: 'Active', portal: false, gender: 'Female', age: 38 },
  { id: 'PT-1033', name: 'Ruwan Abeysekera', phone: '+94 70 999 1123', email: 'ruwan.a@mail.com', regDate: '2026-04-30', status: 'Active', portal: true, gender: 'Male', age: 61 },
  { id: 'PT-1032', name: 'Menaka de Zoysa', phone: '+94 75 444 6789', email: 'menaka.dz@mail.com', regDate: '2026-04-14', status: 'Inactive', portal: false, gender: 'Female', age: 55 },
  { id: 'PT-1031', name: 'Isuru Karunaratne', phone: '+94 72 111 2233', email: 'isuru.k@mail.com', regDate: '2026-03-27', status: 'Active', portal: true, gender: 'Male', age: 19 },
  { id: 'PT-1030', name: 'Nethmi Jayawardena', phone: '+94 71 888 4567', email: 'nethmi.j@mail.com', regDate: '2026-03-15', status: 'Active', portal: true, gender: 'Female', age: 27 },
  { id: 'PT-1029', name: 'Oshan Mendis', phone: '+94 77 666 3321', email: 'oshan.m@mail.com', regDate: '2026-02-28', status: 'Inactive', portal: false, gender: 'Male', age: 44 },
  { id: 'PT-1028', name: 'Thilini Ekanayake', phone: '+94 76 222 9987', email: 'thilini.e@mail.com', regDate: '2026-02-10', status: 'Active', portal: true, gender: 'Female', age: 31 },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const emptyFilters = { dateFrom: '', dateTo: '', status: 'All', portal: 'All', gender: 'All', ageMin: '', ageMax: '' };

function initials(name) { return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(); }
function formatDate(iso) { return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }); }

function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  const header = ['Patient ID', 'Full Name', 'Contact', 'Email', 'Registration Date', 'Status', 'Portal Access'];
  const lines = rows.map((r) => [r.id, r.name, r.phone, r.email, r.regDate, r.status, r.portal ? 'Yes' : 'No'].map((v) => `"${v}"`).join(','));
  return [header.join(','), ...lines].join('\n');
}

const AdminPatientList = ({ onView, onEdit, onAddNew }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PATIENTS.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.phone.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchesStatus = filters.status === 'All' || p.status === filters.status;
      const matchesPortal = filters.portal === 'All' || (filters.portal === 'Yes' ? p.portal : !p.portal);
      const matchesGender = filters.gender === 'All' || p.gender === filters.gender;
      const matchesDateFrom = !filters.dateFrom || p.regDate >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || p.regDate <= filters.dateTo;
      const matchesAgeMin = !filters.ageMin || p.age >= Number(filters.ageMin);
      const matchesAgeMax = !filters.ageMax || p.age <= Number(filters.ageMax);
      return matchesQuery && matchesStatus && matchesPortal && matchesGender && matchesDateFrom && matchesDateTo && matchesAgeMin && matchesAgeMax;
    });
  }, [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const stats = useMemo(() => {
    const active = PATIENTS.filter((p) => p.status === 'Active').length;
    const inactive = PATIENTS.length - active;
    const now = new Date('2026-07-29');
    const newThisMonth = PATIENTS.filter((p) => {
      const d = new Date(p.regDate);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
    return { total: PATIENTS.length, active, inactive, newThisMonth };
  }, []);

  const allOnPageSelected = paged.length > 0 && paged.every((p) => selected.has(p.id));

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
      if (allOnPageSelected) paged.forEach((p) => next.delete(p.id));
      else paged.forEach((p) => next.add(p.id));
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());
  const selectedRows = PATIENTS.filter((p) => selected.has(p.id));

  const applyFilters = () => setPage(1);
  const resetFilters = () => { setFilters(emptyFilters); setPage(1); };

  return (
    <div className="ap-page">
      <div className="ap-blob ap-blob-1" />
      <div className="ap-blob ap-blob-2" />

      <div className="ap-inner">
        <div className="ap-header">
          <div>
            <div className="ap-title">Patient records</div>
            <div className="ap-subtitle">Manage every patient in the system</div>
          </div>
          <button className="ap-btn primary" onClick={onAddNew}>
            <Icon.Plus /> Add patient
          </button>
        </div>

        {/* Stats */}
        <div className="ap-stats-grid">
          <div className="glass-card ap-stat-card">
            <div className="ap-stat-icon tint-mist"><Icon.Patients /></div>
            <div className="ap-stat-label">Total patients</div>
            <div className="ap-stat-value">{stats.total}</div>
          </div>
          <div className="glass-card ap-stat-card">
            <div className="ap-stat-icon tint-sky"><Icon.Check /></div>
            <div className="ap-stat-label">Active</div>
            <div className="ap-stat-value">{stats.active}</div>
          </div>
          <div className="glass-card ap-stat-card">
            <div className="ap-stat-icon tint-sage"><Icon.X /></div>
            <div className="ap-stat-label">Inactive</div>
            <div className="ap-stat-value">{stats.inactive}</div>
          </div>
          <div className="glass-card ap-stat-card">
            <div className="ap-stat-icon tint-amber"><Icon.Sparkle /></div>
            <div className="ap-stat-label">New this month</div>
            <div className="ap-stat-value">{stats.newThisMonth}</div>
          </div>
        </div>

        {/* Bulk action bar (replaces the plain toolbar when rows are selected) */}
        {selected.size > 0 ? (
          <div className="glass-card ap-bulk-bar">
            <div className="ap-bulk-count">{selected.size} selected</div>
            <div className="ap-bulk-actions">
              <button className="ap-btn" onClick={() => download('patients.csv', toCsv(selectedRows), 'text/csv;charset=utf-8;')}>
                <Icon.Download /> Export CSV
              </button>
              <button className="ap-btn" onClick={() => download('patients.xls', toCsv(selectedRows), 'application/vnd.ms-excel')}>
                <Icon.Sheet /> Export Excel
              </button>
              <button className="ap-btn"><Icon.Mail /> Send bulk SMS/Email</button>
              <button className="ap-btn danger"><Icon.Ban /> Deactivate selected</button>
              <button className="ap-btn ghost" onClick={clearSelection}>Clear</button>
            </div>
          </div>
        ) : (
          <div className="glass-card ap-toolbar">
            <div className="ap-search">
              <Icon.Search />
              <input
                placeholder="Search by name, phone, email, or patient ID"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </div>
            <button className={`ap-btn ${filtersOpen ? 'active-toggle' : ''}`} onClick={() => setFiltersOpen((v) => !v)}>
              <Icon.Filter /> Filters
            </button>
          </div>
        )}

        {/* Filter panel */}
        {filtersOpen && (
          <div className="glass-card ap-filter-panel">
            <div className="ap-filter-grid">
              <div className="ap-filter-field">
                <label className="ap-filter-label">Registered from</label>
                <input type="date" className="ap-input" value={filters.dateFrom} onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} />
              </div>
              <div className="ap-filter-field">
                <label className="ap-filter-label">Registered to</label>
                <input type="date" className="ap-input" value={filters.dateTo} onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} />
              </div>
              <div className="ap-filter-field">
                <label className="ap-filter-label">Status</label>
                <select className="ap-select" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                  <option>All</option><option>Active</option><option>Inactive</option>
                </select>
              </div>
              <div className="ap-filter-field">
                <label className="ap-filter-label">Portal access</label>
                <select className="ap-select" value={filters.portal} onChange={(e) => setFilters((f) => ({ ...f, portal: e.target.value }))}>
                  <option>All</option><option>Yes</option><option>No</option>
                </select>
              </div>
              <div className="ap-filter-field">
                <label className="ap-filter-label">Gender</label>
                <select className="ap-select" value={filters.gender} onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))}>
                  <option>All</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="ap-filter-field span-2">
                <label className="ap-filter-label">Age range</label>
                <div className="ap-range-row">
                  <input type="number" className="ap-input" placeholder="Min" value={filters.ageMin} onChange={(e) => setFilters((f) => ({ ...f, ageMin: e.target.value }))} />
                  <span>to</span>
                  <input type="number" className="ap-input" placeholder="Max" value={filters.ageMax} onChange={(e) => setFilters((f) => ({ ...f, ageMax: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="ap-filter-actions">
              <button className="ap-btn ghost" onClick={resetFilters}>Reset</button>
              <button className="ap-btn primary" onClick={applyFilters}>Apply filters</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="glass-card">
          {paged.length === 0 ? (
            <div className="ap-empty">
              <Icon.Inbox />
              <div>No patients match your search or filters.</div>
            </div>
          ) : (
            <div className="ap-table-wrap">
              <table className="ap-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" className="ap-checkbox" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
                    <th>Patient ID</th>
                    <th>Full name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Registered</th>
                    <th>Status</th>
                    <th>Portal</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((p) => (
                    <tr key={p.id} className={selected.has(p.id) ? 'selected' : ''}>
                      <td><input type="checkbox" className="ap-checkbox" checked={selected.has(p.id)} onChange={() => toggleOne(p.id)} /></td>
                      <td className="ap-patient-id">{p.id}</td>
                      <td>
                        <div className="ap-patient-cell">
                          <div className="ap-avatar">{initials(p.name)}</div>
                          {p.name}
                        </div>
                      </td>
                      <td>{p.phone}</td>
                      <td>{p.email}</td>
                      <td>{formatDate(p.regDate)}</td>
                      <td><span className={`ap-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                      <td><span className={`ap-badge ${p.portal ? 'portal-yes' : 'portal-no'}`}>{p.portal ? 'Yes' : 'No'}</span></td>
                      <td>
                        <div className="ap-row-actions">
                          <button className="ap-icon-btn" onClick={() => onView && onView(p.id)} aria-label="View"><Icon.Eye /></button>
                          <button className="ap-icon-btn" onClick={() => onEdit && onEdit(p.id)} aria-label="Edit"><Icon.Edit /></button>
                          <button className="ap-icon-btn danger" aria-label="Delete"><Icon.Trash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="ap-pagination">
              <div className="ap-pagination-left">
                Rows per page
                <select className="ap-page-size" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                  {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <span>· {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
              </div>
              <div className="ap-pagination-controls">
                <button className="ap-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><Icon.ChevronLeft /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} className={`ap-page-btn ${n === currentPage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className="ap-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><Icon.ChevronRight /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPatientList;
