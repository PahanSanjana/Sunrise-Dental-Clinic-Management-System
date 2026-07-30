import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Css/BillForm.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    CreditCard: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>),
    Wallet: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" /><path d="M16 13h4v4h-4z" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    Percent: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 5 5 19M6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>),
    Receipt: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const APPOINTMENTS = [
    {
        id: 'APT-1034',
        patient: 'Amara Perera',
        dentist: 'Dr. Silva',
        treatment: 'Root Canal',
        date: '2026-07-28',
        time: '09:00',
        status: 'completed',
        treatmentCost: 18500,
        consultationFee: 2500,
        billed: false
    },
    {
        id: 'APT-1033',
        patient: 'Nadun Fernando',
        dentist: 'Dr. Perera',
        treatment: 'Dental Cleaning',
        date: '2026-07-28',
        time: '10:30',
        status: 'completed',
        treatmentCost: 8500,
        consultationFee: 2500,
        billed: false
    },
    {
        id: 'APT-1032',
        patient: 'Ishara Gunaratne',
        dentist: 'Dr. Silva',
        treatment: 'Consultation',
        date: '2026-07-28',
        time: '11:30',
        status: 'completed',
        treatmentCost: 0,
        consultationFee: 2500,
        billed: false
    },
    {
        id: 'APT-1031',
        patient: 'Kavindu Jayasuriya',
        dentist: 'Dr. Perera',
        treatment: 'Teeth Whitening',
        date: '2026-07-28',
        time: '13:00',
        status: 'completed',
        treatmentCost: 15000,
        consultationFee: 2500,
        billed: false
    },
];

const TREATMENT_COSTS = {
    'Root Canal': 18500,
    'Dental Cleaning': 8500,
    'Consultation': 0,
    'Teeth Whitening': 15000,
    'Extraction': 4500,
    'Filling': 12000,
};

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(time) {
    if (!time) return 'N/A';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const BillForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const appointmentParam = params.get('appointment');

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // Bill Details
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState('fixed'); // 'fixed' or 'percentage'
    const [notes, setNotes] = useState('');

    // Payment Details
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [amountPaid, setAmountPaid] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Auto-select appointment from URL param
    useEffect(() => {
        if (appointmentParam) {
            const app = APPOINTMENTS.find(a => a.id === appointmentParam);
            if (app && !app.billed) {
                setSelectedAppointment(app);
            }
        }
    }, [appointmentParam]);

    // Search appointments
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.trim().toLowerCase();
        return APPOINTMENTS.filter(app =>
            (app.id.toLowerCase().includes(query) ||
                app.patient.toLowerCase().includes(query)) &&
            !app.billed
        );
    }, [searchQuery]);

    // Calculate bill amounts
    const billDetails = useMemo(() => {
        if (!selectedAppointment) return null;

        const treatmentCost = selectedAppointment.treatmentCost || 0;
        const consultationFee = selectedAppointment.consultationFee || 0;
        const subtotal = treatmentCost + consultationFee;

        let discountAmount = 0;
        if (discountType === 'percentage') {
            discountAmount = (subtotal * discount) / 100;
        } else {
            discountAmount = discount;
        }

        const afterDiscount = subtotal - discountAmount;
        const gst = afterDiscount * 0.08; // 8% GST
        const total = afterDiscount + gst;

        return {
            treatmentCost,
            consultationFee,
            subtotal,
            discountAmount,
            afterDiscount,
            gst,
            total,
        };
    }, [selectedAppointment, discount, discountType]);

    // Handle appointment selection
    const handleSelectAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setSearchQuery('');
        setShowSearchResults(false);
        setDiscount(0);
        setAmountPaid('');
        setErrors({});
    };

    // Handle clear selection
    const handleClearSelection = () => {
        setSelectedAppointment(null);
        setDiscount(0);
        setAmountPaid('');
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!selectedAppointment) {
            newErrors.appointment = 'Please select an appointment';
        }

        if (!paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method';
        }

        if (amountPaid) {
            const paid = parseFloat(amountPaid);
            if (isNaN(paid) || paid <= 0) {
                newErrors.amountPaid = 'Please enter a valid amount';
            } else if (billDetails && paid > billDetails.total) {
                newErrors.amountPaid = 'Amount paid cannot exceed total amount';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            const billData = {
                appointmentId: selectedAppointment.id,
                patient: selectedAppointment.patient,
                dentist: selectedAppointment.dentist,
                treatment: selectedAppointment.treatment,
                date: selectedAppointment.date,
                ...billDetails,
                discount,
                discountType,
                paymentMethod,
                amountPaid: amountPaid ? parseFloat(amountPaid) : billDetails.total,
                paymentDate,
                notes,
                status: amountPaid && parseFloat(amountPaid) >= billDetails.total ? 'paid' : 'partial',
            };

            console.log('Bill generated:', billData);
            setSuccessMessage('Bill generated successfully!');

            setTimeout(() => {
                navigate('/admin/billing');
            }, 1500);
        } catch (err) {
            setErrors({ form: 'Failed to generate bill. Please try again.' });
            setIsSubmitting(false);
        }
    };

    // Calculate change
    const change = useMemo(() => {
        if (!amountPaid || !billDetails) return 0;
        const paid = parseFloat(amountPaid);
        if (isNaN(paid) || paid <= 0) return 0;
        return Math.max(0, paid - billDetails.total);
    }, [amountPaid, billDetails]);

    return (
        <div className="bf-page">
            <div className="bf-blob bf-blob-1" />
            <div className="bf-blob bf-blob-2" />

            <div className="bf-inner">
                {/* Header */}
                <div className="bf-header">
                    <button className="bf-back-btn" onClick={() => navigate('/admin/billing')}>
                        <Icon.ArrowLeft /> Back to Billing
                    </button>
                    <div className="bf-title-area">
                        <h1 className="bf-title">Generate Bill</h1>
                        <p className="bf-subtitle">Create a bill for a completed appointment</p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="bf-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card bf-form">
                    {/* Section 1: Appointment Lookup */}
                    <div className="bf-section">
                        <div className="bf-section-header">
                            <div className="bf-section-icon"><Icon.Search /></div>
                            <div>
                                <h3 className="bf-section-title">Find Appointment</h3>
                                <p className="bf-section-desc">Search for a completed appointment to bill</p>
                            </div>
                        </div>

                        {selectedAppointment ? (
                            <div className="bf-selected-appointment">
                                <div className="bf-appointment-card selected">
                                    <div className="bf-appointment-info">
                                        <div className="bf-appointment-id">{selectedAppointment.id}</div>
                                        <div className="bf-appointment-patient">
                                            <Icon.User className="bf-icon-sm" />
                                            {selectedAppointment.patient}
                                        </div>
                                        <div className="bf-appointment-detail">
                                            <Icon.Stethoscope className="bf-icon-sm" />
                                            {selectedAppointment.treatment}
                                        </div>
                                        <div className="bf-appointment-detail">
                                            <Icon.Calendar className="bf-icon-sm" />
                                            {formatDate(selectedAppointment.date)} at {formatTime(selectedAppointment.time)}
                                        </div>
                                        <div className="bf-appointment-detail">
                                            <Icon.User className="bf-icon-sm" />
                                            {selectedAppointment.dentist}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="bf-remove-btn"
                                        onClick={handleClearSelection}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bf-search-wrap">
                                <div className="bf-search-input">
                                    <Icon.Search />
                                    <input
                                        type="text"
                                        placeholder="Search by appointment number or patient name..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSearchResults(true);
                                        }}
                                        onFocus={() => setShowSearchResults(true)}
                                        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                                    />
                                </div>

                                {showSearchResults && searchResults.length > 0 && (
                                    <div className="bf-search-results">
                                        {searchResults.map(app => (
                                            <div
                                                key={app.id}
                                                className="bf-search-result-item"
                                                onClick={() => handleSelectAppointment(app)}
                                            >
                                                <div className="bf-result-id">{app.id}</div>
                                                <div className="bf-result-patient">{app.patient}</div>
                                                <div className="bf-result-treatment">{app.treatment}</div>
                                                <div className="bf-result-date">{formatDate(app.date)}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showSearchResults && searchQuery && searchResults.length === 0 && (
                                    <div className="bf-no-results">
                                        <p>No unbilled appointments found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {errors.appointment && <div className="bf-error">{errors.appointment}</div>}
                    </div>

                    {/* Section 2: Charges */}
                    {selectedAppointment && billDetails && (
                        <div className="bf-section">
                            <div className="bf-section-header">
                                <div className="bf-section-icon"><Icon.DollarSign /></div>
                                <div>
                                    <h3 className="bf-section-title">Bill Details</h3>
                                    <p className="bf-section-desc">Review and adjust charges</p>
                                </div>
                            </div>

                            <div className="bf-charges-grid">
                                <div className="bf-charge-item">
                                    <span className="bf-charge-label">Treatment Cost</span>
                                    <span className="bf-charge-value">{formatCurrency(billDetails.treatmentCost)}</span>
                                </div>
                                <div className="bf-charge-item">
                                    <span className="bf-charge-label">Consultation Fee</span>
                                    <span className="bf-charge-value">{formatCurrency(billDetails.consultationFee)}</span>
                                </div>
                                <div className="bf-charge-item subtotal">
                                    <span className="bf-charge-label">Subtotal</span>
                                    <span className="bf-charge-value">{formatCurrency(billDetails.subtotal)}</span>
                                </div>

                                <div className="bf-charge-item discount">
                                    <span className="bf-charge-label">
                                        Discount
                                        <div className="bf-discount-controls">
                                            <select
                                                className="bf-discount-type"
                                                value={discountType}
                                                onChange={(e) => setDiscountType(e.target.value)}
                                            >
                                                <option value="fixed">Fixed</option>
                                                <option value="percentage">%</option>
                                            </select>
                                        </div>
                                    </span>
                                    <span className="bf-charge-value">
                                        <input
                                            type="number"
                                            className="bf-discount-input"
                                            min="0"
                                            step={discountType === 'percentage' ? 1 : 100}
                                            value={discount}
                                            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                    </span>
                                </div>

                                {billDetails.discountAmount > 0 && (
                                    <div className="bf-charge-item">
                                        <span className="bf-charge-label">Discount Amount</span>
                                        <span className="bf-charge-value" style={{ color: '#4A7A64' }}>
                                            -{formatCurrency(billDetails.discountAmount)}
                                        </span>
                                    </div>
                                )}

                                <div className="bf-charge-item">
                                    <span className="bf-charge-label">After Discount</span>
                                    <span className="bf-charge-value">{formatCurrency(billDetails.afterDiscount)}</span>
                                </div>

                                <div className="bf-charge-item">
                                    <span className="bf-charge-label">GST (8%)</span>
                                    <span className="bf-charge-value">{formatCurrency(billDetails.gst)}</span>
                                </div>

                                <div className="bf-charge-item total">
                                    <span className="bf-charge-label">Total Amount</span>
                                    <span className="bf-charge-value total-amount">{formatCurrency(billDetails.total)}</span>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="bf-notes-field">
                                <label className="bf-label">Notes & Remarks</label>
                                <textarea
                                    className="bf-textarea"
                                    rows="2"
                                    placeholder="Add any special notes about this bill..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Section 3: Payment Details */}
                    {selectedAppointment && billDetails && (
                        <div className="bf-section">
                            <div className="bf-section-header">
                                <div className="bf-section-icon"><Icon.CreditCard /></div>
                                <div>
                                    <h3 className="bf-section-title">Payment Details</h3>
                                    <p className="bf-section-desc">Record payment information</p>
                                </div>
                            </div>

                            <div className="bf-payment-grid">
                                <div className="bf-payment-field">
                                    <label className="bf-label">Payment Method</label>
                                    <select
                                        className="bf-select"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="HICAPS">HICAPS</option>
                                        <option value="Installment">Installment</option>
                                    </select>
                                    {errors.paymentMethod && <div className="bf-error">{errors.paymentMethod}</div>}
                                </div>

                                <div className="bf-payment-field">
                                    <label className="bf-label">Amount Paid</label>
                                    <div className="bf-input-wrap">
                                        <span className="bf-input-prefix">Rs.</span>
                                        <input
                                            type="number"
                                            className="bf-input with-prefix"
                                            placeholder="Enter amount"
                                            min="0"
                                            step="100"
                                            value={amountPaid}
                                            onChange={(e) => setAmountPaid(e.target.value)}
                                        />
                                    </div>
                                    {errors.amountPaid && <div className="bf-error">{errors.amountPaid}</div>}
                                </div>

                                <div className="bf-payment-field">
                                    <label className="bf-label">Payment Date</label>
                                    <input
                                        type="date"
                                        className="bf-input"
                                        value={paymentDate}
                                        onChange={(e) => setPaymentDate(e.target.value)}
                                    />
                                </div>

                                {amountPaid && parseFloat(amountPaid) > 0 && (
                                    <div className="bf-payment-field">
                                        <label className="bf-label">Change</label>
                                        <div className="bf-change-display">
                                            {formatCurrency(change)}
                                        </div>
                                    </div>
                                )}

                                <div className="bf-payment-field span-2">
                                    <div className="bf-payment-summary">
                                        <div className="bf-payment-row">
                                            <span>Total Amount Due</span>
                                            <span className="bf-payment-total">{formatCurrency(billDetails.total)}</span>
                                        </div>
                                        <div className="bf-payment-row">
                                            <span>Amount Paid</span>
                                            <span className="bf-payment-paid">
                                                {amountPaid ? formatCurrency(parseFloat(amountPaid)) : formatCurrency(0)}
                                            </span>
                                        </div>
                                        <div className="bf-payment-row balance">
                                            <span>Remaining Balance</span>
                                            <span className="bf-payment-balance">
                                                {amountPaid ? formatCurrency(Math.max(0, billDetails.total - parseFloat(amountPaid))) : formatCurrency(billDetails.total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="bf-actions">
                        <button
                            type="button"
                            className="bf-btn secondary"
                            onClick={() => navigate('/admin/billing')}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <div className="bf-actions-right">
                            {selectedAppointment && billDetails && (
                                <>
                                    <button
                                        type="button"
                                        className="bf-btn secondary"
                                        onClick={() => alert('Previewing bill...')}
                                        disabled={isSubmitting}
                                    >
                                        <Icon.Eye /> Preview
                                    </button>
                                    <button
                                        type="button"
                                        className="bf-btn secondary"
                                        onClick={() => alert('Printing bill...')}
                                        disabled={isSubmitting}
                                    >
                                        <Icon.Printer /> Print
                                    </button>
                                    <button
                                        type="button"
                                        className="bf-btn secondary"
                                        onClick={() => alert('Emailing bill...')}
                                        disabled={isSubmitting}
                                    >
                                        <Icon.Mail /> Email
                                    </button>
                                </>
                            )}
                            <button
                                type="submit"
                                className="bf-btn primary"
                                disabled={isSubmitting || !selectedAppointment}
                            >
                                {isSubmitting ? (
                                    <span className="bf-spinner" />
                                ) : (
                                    <>
                                        <Icon.Check /> {amountPaid && parseFloat(amountPaid) >= (billDetails?.total || 0) ? 'Save & Pay' : 'Save Bill'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {errors.form && <div className="bf-error">{errors.form}</div>}
                </form>
            </div>
        </div>
    );
};

export default BillForm;
