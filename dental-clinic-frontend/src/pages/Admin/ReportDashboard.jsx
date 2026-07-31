import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ReportDashboard.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
  Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
  Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
  TrendingUp: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 6l-6.5 6.5-5-5L2 17" /><path d="M17 6h6v6" /></svg>),
  TrendingDown: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 18l-6.5-6.5-5 5L2 7" /><path d="M17 18h6v-6" /></svg>),
  ArrowRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M12 5l7 7-7 7" /></svg>),
  Settings: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>),
  Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
  Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const REPORT_CATEGORIES = [
  {
    id: 'financial',
    title: 'Financial Reports',
    icon: 'DollarSign',
    description: 'Revenue, billing, and payment analytics',
    reports: [
      { id: 'revenue', title: 'Revenue Report', description: 'Daily, monthly, and yearly revenue breakdown', path: '/admin/reports/revenue' },
      { id: 'billing', title: 'Billing Report', description: 'Bill generation and payment status analysis', path: '/admin/reports/billing' },
      { id: 'collection', title: 'Collection Report', description: 'Payment collection efficiency and outstanding', path: '/admin/reports/collection' },
    ]
  },
  {
    id: 'operational',
    title: 'Operational Reports',
    icon: 'Calendar',
    description: 'Appointment and schedule performance',
    reports: [
      { id: 'appointments', title: 'Appointment Report', description: 'Appointment volume, trends, and patterns', path: '/admin/reports/appointments' },
      { id: 'schedule', title: 'Schedule Report', description: 'Schedule utilization and capacity analysis', path: '/admin/reports/schedule' },
      { id: 'no-show', title: 'No-Show Report', description: 'Patient no-show patterns and analysis', path: '/admin/reports/no-show' },
    ]
  },
  {
    id: 'patient',
    title: 'Patient Reports',
    icon: 'Users',
    description: 'Patient demographics and engagement',
    reports: [
      { id: 'demographics', title: 'Demographics Report', description: 'Patient age, gender, and location distribution', path: '/admin/reports/demographics' },
      { id: 'retention', title: 'Retention Report', description: 'Patient retention and loyalty analysis', path: '/admin/reports/retention' },
      { id: 'acquisition', title: 'Acquisition Report', description: 'New patient sources and trends', path: '/admin/reports/acquisition' },
    ]
  },
  {
    id: 'clinical',
    title: 'Clinical Reports',
    icon: 'FileText',
    description: 'Treatment and clinical performance',
    reports: [
      { id: 'treatments', title: 'Treatment Report', description: 'Most common treatments and procedures', path: '/admin/reports/treatments' },
      { id: 'dentist-performance', title: 'Dentist Performance', description: 'Individual dentist performance metrics', path: '/admin/reports/dentist-performance' },
      { id: 'referral', title: 'Referral Report', description: 'Referral sources and patterns', path: '/admin/reports/referral' },
    ]
  }
];

// Quick Stats Data
const QUICK_STATS = {
  revenue: { value: 'Rs. 1,245,000', change: '+12%', trend: 'up', label: 'Total Revenue (This Month)' },
  appointments: { value: '1,847', change: '+8%', trend: 'up', label: 'Total Appointments (This Month)' },
  newPatients: { value: '1,243', change: '+15%', trend: 'up', label: 'New Patients (This Month)' },
  noShowRate: { value: '5.2%', change: '-0.8%', trend: 'down', label: 'No-Show Rate' },
};

// Scheduled Reports Data
const SCHEDULED_REPORTS = [
  { id: 'SR-001', name: 'Weekly Revenue Summary', frequency: 'Weekly', day: 'Monday', time: '09:00 AM', recipients: 'admin@clinic.com, finance@clinic.com', active: true },
  { id: 'SR-002', name: 'Monthly Patient Report', frequency: 'Monthly', day: '1st', time: '08:00 AM', recipients: 'admin@clinic.com', active: true },
  { id: 'SR-003', name: 'Daily Appointment Report', frequency: 'Daily', day: 'Every day', time: '06:00 PM', recipients: 'reception@clinic.com', active: false },
];

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const ReportDashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    frequency: 'Weekly',
    day: 'Monday',
    time: '09:00',
    recipients: '',
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter reports by category
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'all') return REPORT_CATEGORIES;
    return REPORT_CATEGORIES.filter(cat => cat.id === activeCategory);
  }, [activeCategory]);

  const handleNavigateToReport = (path) => {
    navigate(path);
  };

  const handleScheduleReport = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowScheduleModal(false);
      alert('Report scheduled successfully!');
    }, 800);
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return Icon[iconName] || null;
  };

  return (
    <div className="rd-page">
      <div className="rd-blob rd-blob-1" />
      <div className="rd-blob rd-blob-2" />

      <div className="rd-inner">
        {/* Header */}
        <div className="rd-header">
          <div>
            <div className="rd-title">Report Dashboard</div>
            <div className="rd-subtitle">Central hub for all clinic reports and analytics</div>
          </div>
          <div className="rd-header-actions">
            <button className="rd-btn primary" onClick={handleScheduleReport}>
              <Icon.Plus /> Schedule Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rd-stats-grid">
          {Object.values(QUICK_STATS).map((stat, index) => (
            <div key={index} className="glass-card rd-stat-card">
              <div className="rd-stat-header">
                <span className="rd-stat-label">{stat.label}</span>
                <span className={`rd-stat-trend ${stat.trend}`}>
                  {stat.trend === 'up' ? <Icon.TrendingUp /> : <Icon.TrendingDown />}
                  {stat.change}
                </span>
              </div>
              <div className="rd-stat-value">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="rd-category-filter">
          <button 
            className={`rd-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Reports
          </button>
          {REPORT_CATEGORIES.map(cat => {
            const IconComponent = getIcon(cat.icon);
            return (
              <button 
                key={cat.id}
                className={`rd-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {IconComponent && <IconComponent />} {cat.title}
              </button>
            );
          })}
        </div>

        {/* Report Cards */}
        {filteredCategories.map(category => {
          const IconComponent = getIcon(category.icon);
          return (
            <div key={category.id} className="rd-category-section">
              <div className="rd-category-header">
                <div className="rd-category-icon">
                  {IconComponent && <IconComponent />}
                </div>
                <div>
                  <h3 className="rd-category-title">{category.title}</h3>
                  <p className="rd-category-desc">{category.description}</p>
                </div>
              </div>
              <div className="rd-reports-grid">
                {category.reports.map(report => (
                  <div 
                    key={report.id} 
                    className="glass-card rd-report-card"
                    onClick={() => handleNavigateToReport(report.path)}
                  >
                    <div className="rd-report-content">
                      <div className="rd-report-title">{report.title}</div>
                      <div className="rd-report-desc">{report.description}</div>
                    </div>
                    <div className="rd-report-action">
                      <Icon.ArrowRight />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Scheduled Reports Section */}
        <div className="glass-card rd-scheduled-section">
          <div className="rd-scheduled-header">
            <div>
              <h3 className="rd-scheduled-title">Scheduled Reports</h3>
              <p className="rd-scheduled-desc">Automated reports sent to your email</p>
            </div>
            <button className="rd-btn secondary" onClick={handleScheduleReport}>
              <Icon.Plus /> Schedule New
            </button>
          </div>

          <div className="rd-scheduled-list">
            {SCHEDULED_REPORTS.map(report => (
              <div key={report.id} className="rd-scheduled-item">
                <div className="rd-scheduled-info">
                  <div className="rd-scheduled-name">{report.name}</div>
                  <div className="rd-scheduled-details">
                    <span><Icon.Clock className="rd-scheduled-icon" /> {report.frequency} - {report.day} at {report.time}</span>
                    <span><Icon.Mail className="rd-scheduled-icon" /> {report.recipients}</span>
                  </div>
                </div>
                <div className="rd-scheduled-status">
                  <span className={`rd-status-badge ${report.active ? 'active' : 'inactive'}`}>
                    {report.active ? 'Active' : 'Inactive'}
                  </span>
                  <button className="rd-icon-btn" title="Edit Schedule">
                    <Icon.Settings />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="rd-modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="rd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rd-modal-header">
              <h3>Schedule Report</h3>
              <button className="rd-modal-close" onClick={() => setShowScheduleModal(false)}>✕</button>
            </div>
            <form onSubmit={handleScheduleSubmit}>
              <div className="rd-modal-body">
                <div className="rd-form-group">
                  <label className="rd-label">Report Name</label>
                  <input
                    type="text"
                    className="rd-input"
                    placeholder="e.g. Weekly Revenue Summary"
                    value={scheduleForm.name}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="rd-form-row">
                  <div className="rd-form-group">
                    <label className="rd-label">Frequency</label>
                    <select 
                      className="rd-select"
                      value={scheduleForm.frequency}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, frequency: e.target.value })}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="rd-form-group">
                    <label className="rd-label">Day</label>
                    <select 
                      className="rd-select"
                      value={scheduleForm.day}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                    >
                      {scheduleForm.frequency === 'Daily' && <option value="Every day">Every day</option>}
                      {scheduleForm.frequency === 'Weekly' && (
                        <>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </>
                      )}
                      {scheduleForm.frequency === 'Monthly' && (
                        <>
                          <option value="1st">1st</option>
                          <option value="15th">15th</option>
                          <option value="Last day">Last day</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="rd-form-group">
                    <label className="rd-label">Time</label>
                    <input
                      type="time"
                      className="rd-input"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="rd-form-group">
                  <label className="rd-label">Recipients (comma separated)</label>
                  <input
                    type="text"
                    className="rd-input"
                    placeholder="email1@clinic.com, email2@clinic.com"
                    value={scheduleForm.recipients}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, recipients: e.target.value })}
                    required
                  />
                </div>
                <div className="rd-form-group">
                  <label className="rd-label">Report Type</label>
                  <select className="rd-select">
                    <option value="revenue">Revenue Report</option>
                    <option value="appointments">Appointment Report</option>
                    <option value="patients">Patient Report</option>
                    <option value="billing">Billing Report</option>
                  </select>
                </div>
                <div className="rd-form-group">
                  <label className="rd-label">Format</label>
                  <select className="rd-select">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
                <div className="rd-form-group">
                  <label className="rd-toggle">
                    <input
                      type="checkbox"
                      checked={scheduleForm.active}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, active: e.target.checked })}
                    />
                    <span className="rd-toggle-slider" />
                    <span className="rd-toggle-label">Active</span>
                  </label>
                </div>
              </div>
              <div className="rd-modal-footer">
                <button type="button" className="rd-btn secondary" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="rd-btn primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Scheduling...' : 'Schedule Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDashboard;