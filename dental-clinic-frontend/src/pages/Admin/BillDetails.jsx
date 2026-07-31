import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Css/BillDetails.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
  User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
  Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
  Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
  Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
  Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
  Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
  X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
  AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
  CreditCard: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>),
  Wallet: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" /><path d="M16 13h4v4h-4z" /></svg>),
  Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
  Percent: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 5 5 19M6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>),
  Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
  RefreshCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const BILL_DATA = {
  id: 'BIL-1089',
  appointmentId: 'APT-1034',
  patient: {
    id: 'PT-1042',
    name: 'Amara Perera',
    phone: '+94 71 234 5678',
    email: 'amara.perera@mail.com',
    address: '45/A, Temple Road, Colombo 03, Sri Lanka',
  },
  dentist: 'Dr. Silva',
  treatment: 'Root Canal',
  appointmentDate: '2026-07-28',
  billDate: '2026-07-28',
  dueDate: '2026-08-11',
  items: [
    { description: 'Consultation Fee', amount: 2500 },
    { description: 'Root Canal Treatment', amount: 18500 },
  ],
  subtotal: 21000,
  discount: 1000,
  discountType: 'fixed',
  afterDiscount: 20000,
  gst: 1600,
  total: 21600,
  status: 'paid',
  paymentMethod: 'Card',
  paymentDate: '2026-07-28',
  amountPaid: 21600,
  change: 0,
  notes: 'Patient has dental anxiety. Please use gentle approach.',
  createdAt: '2026-07-28T10:30:00',
  updatedAt: '2026-07-28T10:45:00',
  paymentHistory: [
    { 
      id: 'PYT-001', 
      date: '2026-07-28', 
      amount: 21600, 
      method: 'Card', 
      status: 'completed',
      reference: 'TXN-123456'
    }
  ],
  timeline: [
    { event: 'Bill generated', timestamp: '2026-07-28T10:30:00', user: 'Receptionist' },
    { event: 'Payment received', timestamp: '2026-07-28T10:45:00', user: 'Receptionist' },
    { event: 'Bill marked as paid', timestamp: '2026-07-28T10:46:00', user: 'System' },
  ],
};

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(iso) {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleString('en-US', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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
    'overdue': 'badge-danger',
    'cancelled': 'badge-neutral',
    'refunded': 'badge-info',
  };
  return classes[status.toLowerCase()] || 'badge-neutral';
}

function getStatusLabel(status) {
  const labels = {
    'paid': 'Paid',
    'unpaid': 'Unpaid',
    'pending': 'Pending',
    'partial': 'Partial',
    'overdue': 'Overdue',
    'cancelled': 'Cancelled',
    'refunded': 'Refunded',
  };
  return labels[status.toLowerCase()] || status;
}

function getStatusIcon(status) {
  switch(status.toLowerCase()) {
    case 'paid': return <Icon.Check />;
    case 'unpaid': return <Icon.X />;
    case 'overdue': return <Icon.AlertCircle />;
    case 'refunded': return <Icon.RefreshCcw />;
    default: return <Icon.Calendar />;
  }
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // In a real app, fetch bill data based on id
  const bill = BILL_DATA;
  const patient = bill.patient;

  // Handlers
  const handleBack = () => navigate('/admin/billing');
  const handleEdit = () => navigate(`/admin/bills/${id}/edit`);
  const handlePrint = () => alert('Printing bill...');
  const handleEmail = () => alert('Emailing bill...');
  const handleDownload = () => alert('Downloading bill...');

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setShowStatusModal(false);
      alert(`Bill status updated to ${getStatusLabel(selectedStatus)}`);
    }, 500);
  };

  // Check if bill is overdue
  const isOverdue = bill.status === 'unpaid' && new Date(bill.dueDate) < new Date();

  return (
    <div className="bd-page">
      <div className="bd-blob bd-blob-1" />
      <div className="bd-blob bd-blob-2" />

      <div className="bd-inner">
        {/* Header */}
        <div className="bd-header">
          <button className="bd-back-btn" onClick={handleBack}>
            <Icon.ArrowLeft /> Back to Billing
          </button>
          <div className="bd-title-area">
            <div className="bd-title-row">
              <div>
                <h1 className="bd-title">Bill Details</h1>
                <div className="bd-id-row">
                  <span className="bd-bill-id">{bill.id}</span>
                  <span className={`bd-status-badge ${getStatusBadge(bill.status)}`}>
                    {getStatusIcon(bill.status)} {getStatusLabel(bill.status)}
                  </span>
                  {isOverdue && <span className="bd-overdue-badge">Overdue</span>}
                </div>
              </div>
              <div className="bd-actions">
                <button className="bd-btn secondary" onClick={handlePrint}>
                  <Icon.Printer /> Print
                </button>
                <button className="bd-btn secondary" onClick={handleEmail}>
                  <Icon.Mail /> Email
                </button>
                <button className="bd-btn secondary" onClick={handleDownload}>
                  <Icon.Download /> Download
                </button>
                <button className="bd-btn primary" onClick={handleEdit}>
                  <Icon.Edit /> Edit
                </button>
              </div>
            </div>
            <p className="bd-subtitle">
              Created {formatDateTime(bill.createdAt)} • Last updated {formatDateTime(bill.updatedAt)}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bd-stats-grid">
          <div className="glass-card bd-stat-card">
            <div className="bd-stat-icon tint-sky"><Icon.DollarSign /></div>
            <div className="bd-stat-label">Total Amount</div>
            <div className="bd-stat-value">{formatCurrency(bill.total)}</div>
          </div>
          <div className="glass-card bd-stat-card">
            <div className="bd-stat-icon tint-mist"><Icon.CreditCard /></div>
            <div className="bd-stat-label">Amount Paid</div>
            <div className="bd-stat-value" style={{ color: '#4A7A64' }}>{formatCurrency(bill.amountPaid || 0)}</div>
          </div>
          <div className="glass-card bd-stat-card">
            <div className="bd-stat-icon tint-amber"><Icon.AlertCircle /></div>
            <div className="bd-stat-label">Balance Due</div>
            <div className="bd-stat-value" style={{ color: bill.status === 'paid' ? '#4A7A64' : '#C4954C' }}>
              {formatCurrency(Math.max(0, bill.total - (bill.amountPaid || 0)))}
            </div>
          </div>
          <div className="glass-card bd-stat-card">
            <div className="bd-stat-icon tint-sage"><Icon.Calendar /></div>
            <div className="bd-stat-label">Due Date</div>
            <div className="bd-stat-value">{formatDate(bill.dueDate)}</div>
          </div>
        </div>

        {/* Status Flow */}
        <div className="glass-card bd-status-flow">
          <div className="bd-status-flow-title">Bill Status Flow</div>
          <div className="bd-status-steps">
            <div className={`bd-status-step ${['paid', 'partial', 'refunded'].includes(bill.status) ? 'completed' : bill.status === 'unpaid' || bill.status === 'pending' ? 'active' : ''}`}>
              <div className="bd-step-circle">1</div>
              <div className="bd-step-label">Generated</div>
              <div className="bd-step-date">{formatDate(bill.billDate)}</div>
            </div>
            <div className="bd-step-line" />
            <div className={`bd-status-step ${['paid', 'partial', 'overdue', 'refunded'].includes(bill.status) ? 'completed' : bill.status === 'unpaid' || bill.status === 'pending' ? 'active' : ''}`}>
              <div className="bd-step-circle">2</div>
              <div className="bd-step-label">Unpaid</div>
              <div className="bd-step-date">Awaiting payment</div>
            </div>
            <div className="bd-step-line" />
            <div className={`bd-status-step ${bill.status === 'paid' ? 'completed' : bill.status === 'partial' ? 'active' : ''}`}>
              <div className="bd-step-circle">3</div>
              <div className="bd-step-label">Paid</div>
              <div className="bd-step-date">{bill.status === 'paid' ? formatDate(bill.paymentDate) : 'Pending'}</div>
            </div>
            <div className="bd-step-line" />
            <div className={`bd-status-step ${bill.status === 'refunded' ? 'completed' : ''}`}>
              <div className="bd-step-circle">4</div>
              <div className="bd-step-label">Refunded</div>
              <div className="bd-step-date">{bill.status === 'refunded' ? 'Completed' : ''}</div>
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div className="bd-status-actions">
          {['unpaid', 'pending'].includes(bill.status) && (
            <>
              <button className="bd-btn primary" onClick={() => handleStatusChange('paid')}>
                <Icon.Check /> Mark as Paid
              </button>
              <button className="bd-btn secondary" onClick={() => handleStatusChange('partial')}>
                <Icon.DollarSign /> Record Partial Payment
              </button>
            </>
          )}
          {bill.status === 'partial' && (
            <button className="bd-btn primary" onClick={() => handleStatusChange('paid')}>
              <Icon.Check /> Settle Balance
            </button>
          )}
          {['paid', 'partial'].includes(bill.status) && (
            <button className="bd-btn secondary" onClick={() => handleStatusChange('refunded')}>
              <Icon.RefreshCcw /> Process Refund
            </button>
          )}
          {['unpaid', 'pending'].includes(bill.status) && isOverdue && (
            <button className="bd-btn danger" onClick={() => handleStatusChange('overdue')}>
              <Icon.AlertCircle /> Mark as Overdue
            </button>
          )}
          {!['cancelled', 'refunded'].includes(bill.status) && (
            <button className="bd-btn danger" onClick={() => handleStatusChange('cancelled')}>
              <Icon.X /> Cancel Bill
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="bd-tabs">
          <button 
            className={`bd-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            <Icon.Receipt /> Invoice Details
          </button>
          <button 
            className={`bd-tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            <Icon.CreditCard /> Payment History
          </button>
          <button 
            className={`bd-tab ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Icon.Clock /> Timeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="bd-tab-content">
          {/* Invoice Details Tab */}
          {activeTab === 'details' && (
            <div className="bd-details-grid">
              {/* Patient Information */}
              <div className="glass-card bd-info-card">
                <div className="bd-card-header">
                  <div className="bd-card-icon"><Icon.User /></div>
                  <div className="bd-card-title">Patient Information</div>
                </div>
                <div className="bd-patient-info">
                  <div className="bd-patient-avatar">{getInitials(patient.name)}</div>
                  <div>
                    <div className="bd-patient-name">{patient.name}</div>
                    <div className="bd-patient-id">{patient.id}</div>
                    <div className="bd-patient-contact">
                      <div>{patient.phone}</div>
                      <div>{patient.email}</div>
                    </div>
                  </div>
                </div>
                <div className="bd-patient-address">
                  <strong>Address:</strong> {patient.address}
                </div>
              </div>

              {/* Appointment Details */}
              <div className="glass-card bd-info-card">
                <div className="bd-card-header">
                  <div className="bd-card-icon"><Icon.Calendar /></div>
                  <div className="bd-card-title">Appointment Details</div>
                </div>
                <div className="bd-info-grid">
                  <div className="bd-info-item">
                    <span className="bd-info-label">Appointment #</span>
                    <span className="bd-info-value">{bill.appointmentId}</span>
                  </div>
                  <div className="bd-info-item">
                    <span className="bd-info-label">Date</span>
                    <span className="bd-info-value">{formatDate(bill.appointmentDate)}</span>
                  </div>
                  <div className="bd-info-item">
                    <span className="bd-info-label">Dentist</span>
                    <span className="bd-info-value">{bill.dentist}</span>
                  </div>
                  <div className="bd-info-item">
                    <span className="bd-info-label">Treatment</span>
                    <span className="bd-info-value">{bill.treatment}</span>
                  </div>
                </div>
              </div>

              {/* Invoice Breakdown */}
              <div className="glass-card bd-info-card span-2">
                <div className="bd-card-header">
                  <div className="bd-card-icon"><Icon.Receipt /></div>
                  <div className="bd-card-title">Invoice Breakdown</div>
                </div>
                <div className="bd-invoice-items">
                  <div className="bd-invoice-header">
                    <span>Description</span>
                    <span>Amount</span>
                  </div>
                  {bill.items.map((item, index) => (
                    <div key={index} className="bd-invoice-item">
                      <span>{item.description}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="bd-invoice-divider" />
                  <div className="bd-invoice-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(bill.subtotal)}</span>
                  </div>
                  {bill.discount > 0 && (
                    <div className="bd-invoice-row discount">
                      <span>Discount ({bill.discountType === 'percentage' ? `${bill.discount}%` : 'Fixed'})</span>
                      <span>-{formatCurrency(bill.discount)}</span>
                    </div>
                  )}
                  <div className="bd-invoice-row">
                    <span>After Discount</span>
                    <span>{formatCurrency(bill.afterDiscount)}</span>
                  </div>
                  <div className="bd-invoice-row">
                    <span>GST (8%)</span>
                    <span>{formatCurrency(bill.gst)}</span>
                  </div>
                  <div className="bd-invoice-total">
                    <span>Total</span>
                    <span>{formatCurrency(bill.total)}</span>
                  </div>
                </div>

                {bill.notes && (
                  <div className="bd-invoice-notes">
                    <strong>Notes:</strong> {bill.notes}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'payment' && (
            <div className="glass-card bd-info-card">
              <div className="bd-card-header">
                <div className="bd-card-icon"><Icon.CreditCard /></div>
                <div className="bd-card-title">Payment History</div>
              </div>
              {bill.paymentHistory.length === 0 ? (
                <div className="bd-empty-state">
                  <p>No payments recorded for this bill</p>
                </div>
              ) : (
                <div className="bd-payment-list">
                  <div className="bd-payment-header">
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Method</span>
                    <span>Status</span>
                    <span>Reference</span>
                  </div>
                  {bill.paymentHistory.map(payment => (
                    <div key={payment.id} className="bd-payment-item">
                      <span>{formatDate(payment.date)}</span>
                      <span className="bd-payment-amount">{formatCurrency(payment.amount)}</span>
                      <span>{payment.method}</span>
                      <span className={`bd-payment-status ${payment.status}`}>
                        {payment.status}
                      </span>
                      <span className="bd-payment-ref">{payment.reference}</span>
                    </div>
                  ))}
                </div>
              )}
              {bill.status === 'unpaid' || bill.status === 'partial' && (
                <div className="bd-payment-actions">
                  <button className="bd-btn primary">
                    <Icon.DollarSign /> Record Payment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="glass-card bd-info-card">
              <div className="bd-card-header">
                <div className="bd-card-icon"><Icon.Clock /></div>
                <div className="bd-card-title">Bill Timeline</div>
              </div>
              <div className="bd-timeline">
                {bill.timeline.map((item, index) => (
                  <div key={index} className="bd-timeline-item">
                    <div className="bd-timeline-dot" />
                    {index < bill.timeline.length - 1 && <div className="bd-timeline-line" />}
                    <div className="bd-timeline-content">
                      <div className="bd-timeline-event">{item.event}</div>
                      <div className="bd-timeline-meta">
                        <span className="bd-timeline-time">{formatDateTime(item.timestamp)}</span>
                        <span className="bd-timeline-user">by {item.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="bd-modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="bd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bd-modal-header">
              <h3>Update Bill Status</h3>
              <button className="bd-modal-close" onClick={() => setShowStatusModal(false)}>✕</button>
            </div>
            <div className="bd-modal-body">
              <p>Are you sure you want to mark this bill as <strong>{getStatusLabel(selectedStatus)}</strong>?</p>
              <div className="bd-modal-status-preview">
                <span className={`bd-modal-status-badge ${getStatusBadge(selectedStatus)}`}>
                  {getStatusLabel(selectedStatus)}
                </span>
              </div>
              {selectedStatus === 'refunded' && (
                <div className="bd-modal-field">
                  <label className="bd-label">Refund Reason</label>
                  <textarea
                    className="bd-textarea"
                    rows="3"
                    placeholder="Please provide a reason for the refund..."
                  />
                </div>
              )}
            </div>
            <div className="bd-modal-footer">
              <button className="bd-btn secondary" onClick={() => setShowStatusModal(false)}>
                Cancel
              </button>
              <button className="bd-btn primary" onClick={confirmStatusChange} disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Confirm Status Change'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;