import React, { useState, useMemo } from 'react';
import './Patients.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />
    </svg>
  ),
  eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  edit: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  chevronLeft: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  chevronRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  inbox: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
};

// ---------------------------------------------------------------
// Placeholder data — replace with your API call
// ---------------------------------------------------------------
const PATIENTS = [
  { id: 'PT-1042', name: 'Amara Perera', phone: '+94 71 234 5678', email: 'amara.perera@mail.com', status: 'Active' },
  { id: 'PT-1041', name: 'Nadun Fernando', phone: '+94 77 345 1290', email: 'nadun.f@mail.com', status: 'Active' },
  { id: 'PT-1040', name: 'Ishara Gunaratne', phone: '+94 76 812 3456', email: 'ishara.g@mail.com', status: 'Active' },
  { id: 'PT-1039', name: 'Kavindu Jayasuriya', phone: '+94 70 456 7890', email: 'kavindu.j@mail.com', status: 'Inactive' },
  { id: 'PT-1038', name: 'Sanduni Wickrama', phone: '+94 75 901 2345', email: 'sanduni.w@mail.com', status: 'Active' },
  { id: 'PT-1037', name: 'Tharindu Bandara', phone: '+94 72 678 1234', email: 'tharindu.b@mail.com', status: 'Active' },
  { id: 'PT-1036', name: 'Dilini Rathnayake', phone: '+94 71 555 9821', email: 'dilini.r@mail.com', status: 'Inactive' },
  { id: 'PT-1035', name: 'Chamod Wijesinghe', phone: '+94 77 222 4410', email: 'chamod.w@mail.com', status: 'Active' },
  { id: 'PT-1034', name: 'Yashodha Silva', phone: '+94 76 333 8871', email: 'yashodha.s@mail.com', status: 'Active' },
  { id: 'PT-1033', name: 'Ruwan Abeysekera', phone: '+94 70 999 1123', email: 'ruwan.a@mail.com', status: 'Active' },
  { id: 'PT-1032', name: 'Menaka de Zoysa', phone: '+94 75 444 6789', email: 'menaka.dz@mail.com', status: 'Inactive' },
  { id: 'PT-1031', name: 'Isuru Karunaratne', phone: '+94 72 111 2233', email: 'isuru.k@mail.com', status: 'Active' },
];

const PAGE_SIZE = 6;

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function exportToCsv(rows) {
  const header = ['ID', 'Name', 'Contact', 'Email', 'Status'];
  const lines = rows.map((r) => [r.id, r.name, r.phone, r.email, r.status].map((v) => `"${v}"`).join(','));
  const csv = [header.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'patients.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const PatientList = ({ onView, onAddNew }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PATIENTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (v) => { setQuery(v); setPage(1); };
  const handleFilter = (v) => { setStatusFilter(v); setPage(1); };

  return (
    <div className="rp-page">
      <div className="rp-blob rp-blob-1" />
      <div className="rp-blob rp-blob-2" />

      <div className="rp-inner">
        <div className="rp-header">
          <div>
            <div className="rp-title">Patients</div>
            <div className="rp-subtitle">{filtered.length} patients found</div>
          </div>
          <div className="rp-header-actions">
            <button className="rp-btn" onClick={() => exportToCsv(filtered)}>
              <Icon.download /> Export CSV
            </button>
            <button className="rp-btn primary" onClick={onAddNew}>
              <Icon.plus /> Add new patient
            </button>
          </div>
        </div>

        <div className="glass-card rp-toolbar">
          <div className="rp-search">
            <Icon.search />
            <input
              placeholder="Search by name, phone, or email"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <select className="rp-select" value={statusFilter} onChange={(e) => handleFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="glass-card">
          {paged.length === 0 ? (
            <div className="rp-empty">
              <Icon.inbox />
              <div>No patients match your search.</div>
            </div>
          ) : (
            <div className="rp-table-wrap">
              <table className="rp-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((p) => (
                    <tr key={p.id}>
                      <td className="rp-patient-id">{p.id}</td>
                      <td>
                        <div className="rp-patient-cell">
                          <div className="rp-avatar">{initials(p.name)}</div>
                          {p.name}
                        </div>
                      </td>
                      <td>{p.phone}</td>
                      <td>{p.email}</td>
                      <td>
                        <span className={`status-badge ${p.status.toLowerCase()}`}>{p.status}</span>
                      </td>
                      <td>
                        <div className="rp-row-actions">
                          <button className="rp-icon-btn" onClick={() => onView && onView(p.id)} aria-label="View patient">
                            <Icon.eye />
                          </button>
                          <button className="rp-icon-btn" aria-label="Edit patient">
                            <Icon.edit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="rp-pagination">
              <div className="rp-pagination-info">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </div>
              <div className="rp-pagination-controls">
                <button className="rp-page-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page">
                  <Icon.chevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`rp-page-btn ${n === currentPage ? 'active' : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button className="rp-page-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page">
                  <Icon.chevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
