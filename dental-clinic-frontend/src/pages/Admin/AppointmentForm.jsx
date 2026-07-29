import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Css/AppointmentForm.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    UserPlus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    Dentist: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v4M12 18v4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M4.5 12h4M15.5 12h4M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const PATIENTS = [
    { id: 'PT-1042', name: 'Amara Perera', phone: '+94 71 234 5678', email: 'amara.perera@mail.com' },
    { id: 'PT-1041', name: 'Nadun Fernando', phone: '+94 77 345 1290', email: 'nadun.f@mail.com' },
    { id: 'PT-1040', name: 'Ishara Gunaratne', phone: '+94 76 812 3456', email: 'ishara.g@mail.com' },
    { id: 'PT-1039', name: 'Kavindu Jayasuriya', phone: '+94 70 456 7890', email: 'kavindu.j@mail.com' },
    { id: 'PT-1038', name: 'Sanduni Wickrama', phone: '+94 75 901 2345', email: 'sanduni.w@mail.com' },
];

const DENTISTS = [
    { id: 'D-001', name: 'Dr. Silva', specialization: 'General Dentistry', active: true },
    { id: 'D-002', name: 'Dr. Perera', specialization: 'Orthodontics', active: true },
    { id: 'D-003', name: 'Dr. Fernando', specialization: 'Endodontics', active: false },
];

const TREATMENTS = [
    { id: 'TRT-001', name: 'Dental Cleaning', cost: 8500, duration: 30 },
    { id: 'TRT-002', name: 'Root Canal', cost: 18500, duration: 90 },
    { id: 'TRT-003', name: 'Extraction', cost: 4500, duration: 45 },
    { id: 'TRT-004', name: 'Filling', cost: 12000, duration: 60 },
    { id: 'TRT-005', name: 'Whitening', cost: 15000, duration: 45 },
    { id: 'TRT-006', name: 'Consultation', cost: 2500, duration: 30 },
];

// Available time slots (business hours: 8:00 AM - 6:00 PM)
const TIME_SLOTS = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
];

// Booked slots for demo (simulating booked appointments)
const BOOKED_SLOTS = {
    '2026-07-29': ['09:00', '11:00', '14:30'],
    '2026-07-30': ['10:30', '13:00', '15:30'],
    '2026-07-31': ['08:30', '12:00', '16:00'],
};

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
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
const AppointmentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const patientIdParam = params.get('patient');

    // State
    const [step, setStep] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientSearchQuery, setPatientSearchQuery] = useState('');
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Get current date for min date validation
    const today = new Date().toISOString().split('T')[0];
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateStr = minDate.toISOString().split('T')[0];

    // Filter patients based on search
    const filteredPatients = useMemo(() => {
        const query = patientSearchQuery.trim().toLowerCase();
        if (!query) return PATIENTS;
        return PATIENTS.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.phone.includes(query) ||
            p.id.toLowerCase().includes(query)
        );
    }, [patientSearchQuery]);

    // Get booked slots for selected date
    const bookedSlotsForDate = useMemo(() => {
        if (!selectedDate) return [];
        return BOOKED_SLOTS[selectedDate] || [];
    }, [selectedDate]);

    // Available time slots (excluding booked ones)
    const availableSlots = useMemo(() => {
        return TIME_SLOTS.filter(slot => !bookedSlotsForDate.includes(slot));
    }, [bookedSlotsForDate]);

    // Check if date is within business hours and valid
    const isValidDate = (date) => {
        const selected = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
    };

    // Handle patient selection
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setPatientSearchQuery('');
    };

    // Handle clear patient
    const handleClearPatient = () => {
        setSelectedPatient(null);
        setPatientSearchQuery('');
    };

    // Handle quick register
    const handleQuickRegister = () => {
        navigate('/admin/patients/new');
    };

    // Handle navigation
    const handleNext = () => {
        if (validateStep()) {
            if (step < 5) {
                setStep(step + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Validation
    const validateStep = () => {
        const newErrors = {};

        if (step === 1 && !selectedPatient) {
            newErrors.patient = 'Please select a patient';
        }

        if (step === 2 && !selectedTreatment) {
            newErrors.treatment = 'Please select a treatment';
        }

        if (step === 3 && !selectedDentist) {
            newErrors.dentist = 'Please select a dentist';
        }

        if (step === 4) {
            if (!selectedDate) {
                newErrors.date = 'Please select a date';
            } else if (!isValidDate(selectedDate)) {
                newErrors.date = 'Please select a future date';
            }
            if (!selectedTime) {
                newErrors.time = 'Please select a time slot';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            const appointmentData = {
                patientId: selectedPatient.id,
                patientName: selectedPatient.name,
                treatmentId: selectedTreatment.id,
                treatmentName: selectedTreatment.name,
                dentistId: selectedDentist.id,
                dentistName: selectedDentist.name,
                date: selectedDate,
                time: selectedTime,
                notes: notes,
                status: 'confirmed',
            };

            console.log('Appointment booked:', appointmentData);
            setSuccessMessage('Appointment booked successfully!');

            setTimeout(() => {
                navigate('/admin/appointments');
            }, 1500);
        } catch (err) {
            setErrors({ form: 'Failed to book appointment. Please try again.' });
            setIsSubmitting(false);
        }
    };

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    // Generate calendar days for the month
    const getCalendarDays = () => {
        const date = selectedDate ? new Date(selectedDate) : new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date().toISOString().split('T')[0];

        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isPast = dateStr < today;
            const isBooked = BOOKED_SLOTS[dateStr] && BOOKED_SLOTS[dateStr].length >= TIME_SLOTS.length;
            days.push({ date: dateStr, day: d, isPast, isBooked });
        }
        return days;
    };

    const calendarDays = getCalendarDays();
    const monthLabel = selectedDate
        ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Step indicator
    const steps = ['Patient', 'Treatment', 'Dentist', 'Date & Time', 'Confirm'];

    // Render step content
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return renderPatientStep();
            case 2:
                return renderTreatmentStep();
            case 3:
                return renderDentistStep();
            case 4:
                return renderDateTimeStep();
            case 5:
                return renderConfirmationStep();
            default:
                return null;
        }
    };

    // Step 1: Select Patient
    const renderPatientStep = () => (
        <div className="af-step-content">
            <div className="af-step-header">
                <h3>Select Patient</h3>
                <p>Search for an existing patient or register a new one</p>
            </div>

            {selectedPatient ? (
                <div className="af-selected-patient">
                    <div className="af-patient-card selected">
                        <div className="af-patient-avatar">{getInitials(selectedPatient.name)}</div>
                        <div className="af-patient-info">
                            <div className="af-patient-name">{selectedPatient.name}</div>
                            <div className="af-patient-detail">{selectedPatient.id}</div>
                            <div className="af-patient-detail">{selectedPatient.phone}</div>
                        </div>
                        <button className="af-remove-btn" onClick={handleClearPatient}>✕</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="af-search-wrap">
                        <div className="af-search-input">
                            <Icon.Search />
                            <input
                                type="text"
                                placeholder="Search by name, phone, or patient ID..."
                                value={patientSearchQuery}
                                onChange={(e) => setPatientSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="af-btn secondary" onClick={handleQuickRegister}>
                            <Icon.UserPlus /> New Patient
                        </button>
                    </div>

                    <div className="af-patient-list">
                        {filteredPatients.length === 0 ? (
                            <div className="af-empty-state">
                                <p>No patients found</p>
                                <button className="af-btn primary" onClick={handleQuickRegister}>
                                    <Icon.UserPlus /> Register New Patient
                                </button>
                            </div>
                        ) : (
                            filteredPatients.map(patient => (
                                <div
                                    key={patient.id}
                                    className="af-patient-card"
                                    onClick={() => handleSelectPatient(patient)}
                                >
                                    <div className="af-patient-avatar">{getInitials(patient.name)}</div>
                                    <div className="af-patient-info">
                                        <div className="af-patient-name">{patient.name}</div>
                                        <div className="af-patient-detail">{patient.id}</div>
                                        <div className="af-patient-detail">{patient.phone}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {errors.patient && <div className="af-error">{errors.patient}</div>}
        </div>
    );

    // Step 2: Select Treatment
    const renderTreatmentStep = () => (
        <div className="af-step-content">
            <div className="af-step-header">
                <h3>Select Treatment</h3>
                <p>Choose the treatment type and review the cost</p>
            </div>

            <div className="af-treatment-grid">
                {TREATMENTS.map(treatment => (
                    <div
                        key={treatment.id}
                        className={`af-treatment-card ${selectedTreatment?.id === treatment.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTreatment(treatment)}
                    >
                        <div className="af-treatment-icon"><Icon.Stethoscope /></div>
                        <div className="af-treatment-name">{treatment.name}</div>
                        <div className="af-treatment-detail">{treatment.duration} min</div>
                        <div className="af-treatment-cost">{formatCurrency(treatment.cost)}</div>
                    </div>
                ))}
            </div>

            {errors.treatment && <div className="af-error">{errors.treatment}</div>}
        </div>
    );

    // Step 3: Select Dentist
    const renderDentistStep = () => (
        <div className="af-step-content">
            <div className="af-step-header">
                <h3>Select Dentist</h3>
                <p>Choose an available dentist for the appointment</p>
            </div>

            <div className="af-dentist-grid">
                {DENTISTS.filter(d => d.active).map(dentist => (
                    <div
                        key={dentist.id}
                        className={`af-dentist-card ${selectedDentist?.id === dentist.id ? 'selected' : ''}`}
                        onClick={() => setSelectedDentist(dentist)}
                    >
                        <div className="af-dentist-avatar">{getInitials(dentist.name)}</div>
                        <div className="af-dentist-info">
                            <div className="af-dentist-name">{dentist.name}</div>
                            <div className="af-dentist-specialization">{dentist.specialization}</div>
                        </div>
                    </div>
                ))}
            </div>

            {errors.dentist && <div className="af-error">{errors.dentist}</div>}
        </div>
    );

    // Step 4: Select Date & Time
    const renderDateTimeStep = () => (
        <div className="af-step-content">
            <div className="af-step-header">
                <h3>Select Date & Time</h3>
                <p>Choose an available date and time slot for the appointment</p>
            </div>

            <div className="af-datetime-grid">
                {/* Calendar */}
                <div className="af-calendar">
                    <div className="af-calendar-header">
                        <span>{monthLabel}</span>
                    </div>
                    <div className="af-calendar-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                            <div key={day} className="af-calendar-dow">{day}</div>
                        ))}
                        {calendarDays.map((day, index) => {
                            if (!day) return <div key={index} />;
                            const isSelected = day.date === selectedDate;
                            return (
                                <button
                                    key={index}
                                    className={`af-calendar-day ${isSelected ? 'selected' : ''} ${day.isPast ? 'past' : ''} ${day.isBooked ? 'booked' : ''}`}
                                    disabled={day.isPast || day.isBooked}
                                    onClick={() => handleDateChange(day.date)}
                                >
                                    {day.day}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Time Slots */}
                <div className="af-time-slots">
                    <div className="af-time-header">Available Time Slots</div>
                    {!selectedDate ? (
                        <div className="af-time-hint">Please select a date first</div>
                    ) : availableSlots.length === 0 ? (
                        <div className="af-time-hint">No slots available for this date</div>
                    ) : (
                        <div className="af-time-grid">
                            {availableSlots.map(time => (
                                <button
                                    key={time}
                                    className={`af-time-slot ${selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {errors.date && <div className="af-error">{errors.date}</div>}
            {errors.time && <div className="af-error">{errors.time}</div>}
        </div>
    );

    // Step 5: Confirmation
    const renderConfirmationStep = () => (
        <div className="af-step-content">
            <div className="af-step-header">
                <h3>Confirm Booking</h3>
                <p>Review all details before confirming the appointment</p>
            </div>

            <div className="af-confirmation">
                <div className="af-confirm-grid">
                    <div className="af-confirm-item">
                        <span className="af-confirm-label">Patient</span>
                        <span className="af-confirm-value">{selectedPatient?.name}</span>
                        <span className="af-confirm-sub">{selectedPatient?.id}</span>
                    </div>
                    <div className="af-confirm-item">
                        <span className="af-confirm-label">Treatment</span>
                        <span className="af-confirm-value">{selectedTreatment?.name}</span>
                        <span className="af-confirm-sub">{selectedTreatment?.duration} min • {formatCurrency(selectedTreatment?.cost)}</span>
                    </div>
                    <div className="af-confirm-item">
                        <span className="af-confirm-label">Dentist</span>
                        <span className="af-confirm-value">{selectedDentist?.name}</span>
                        <span className="af-confirm-sub">{selectedDentist?.specialization}</span>
                    </div>
                    <div className="af-confirm-item">
                        <span className="af-confirm-label">Date & Time</span>
                        <span className="af-confirm-value">{formatDate(selectedDate)}</span>
                        <span className="af-confirm-sub">{selectedTime}</span>
                    </div>
                </div>

                <div className="af-confirm-notes">
                    <label className="af-label">Notes (Optional)</label>
                    <textarea
                        className="af-textarea"
                        rows="3"
                        placeholder="Add any special notes or requests..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                {errors.form && <div className="af-error">{errors.form}</div>}
            </div>
        </div>
    );

    return (
        <div className="af-page">
            <div className="af-blob af-blob-1" />
            <div className="af-blob af-blob-2" />

            <div className="af-inner">
                {/* Header */}
                <div className="af-header">
                    <button className="af-back-btn" onClick={() => navigate('/admin/appointments')}>
                        <Icon.ArrowLeft /> Back to Appointments
                    </button>
                    <div className="af-title-area">
                        <h1 className="af-title">Book Appointment</h1>
                        <p className="af-subtitle">Schedule a new appointment for a patient</p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="af-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Stepper */}
                <div className="af-stepper">
                    {steps.map((label, index) => {
                        const stepNum = index + 1;
                        const isActive = stepNum === step;
                        const isCompleted = stepNum < step;
                        return (
                            <div key={index} className="af-step-item">
                                <div className={`af-step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                                    {isCompleted ? <Icon.Check /> : stepNum}
                                </div>
                                <div className="af-step-label">{label}</div>
                                {index < steps.length - 1 && <div className="af-step-line" />}
                            </div>
                        );
                    })}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card af-form">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="af-nav">
                        <button
                            type="button"
                            className="af-btn secondary"
                            onClick={handleBack}
                            disabled={step === 1 || isSubmitting}
                        >
                            <Icon.ChevronLeft /> Back
                        </button>
                        <div className="af-nav-right">
                            {step < 5 ? (
                                <button
                                    type="button"
                                    className="af-btn primary"
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                >
                                    Next <Icon.ChevronRight />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="af-btn primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="af-spinner" />
                                    ) : (
                                        <>
                                            <Icon.Check /> Confirm Booking
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;