import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/DentistForm.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    Award: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="6" /><path d="M12 14v8M9 18h6" /></svg>),
    Camera: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
    Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
};

// ---------------------------------------------------------------
// Initial Form Data
// ---------------------------------------------------------------
const initialFormData = {
    // Personal Details
    fullName: '',
    email: '',
    phone: '',
    specialization: 'General Dentistry',
    qualification: '',
    yearsExperience: 0,
    consultationFee: 2500,
    photo: null,

    // Schedule
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: {
        start: '08:00',
        end: '17:00'
    },
    breakTimes: [
        { start: '12:00', end: '13:00' }
    ],

    // Status
    status: 'Active',
};

const SPECIALIZATIONS = [
    'General Dentistry',
    'Orthodontics',
    'Endodontics',
    'Pediatric Dentistry',
    'Periodontics',
    'Prosthodontics',
    'Oral Surgery',
    'Cosmetic Dentistry',
    'Implantology',
];

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const DentistForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Handle nested object changes
    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    // Handle working days toggle
    const toggleWorkingDay = (day) => {
        setFormData((prev) => {
            const days = prev.workingDays.includes(day)
                ? prev.workingDays.filter(d => d !== day)
                : [...prev.workingDays, day];
            return { ...prev, workingDays: days };
        });
    };

    // Handle break times
    const addBreak = () => {
        setFormData((prev) => ({
            ...prev,
            breakTimes: [...prev.breakTimes, { start: '12:00', end: '13:00' }],
        }));
    };

    const removeBreak = (index) => {
        setFormData((prev) => ({
            ...prev,
            breakTimes: prev.breakTimes.filter((_, i) => i !== index),
        }));
    };

    const updateBreak = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            breakTimes: prev.breakTimes.map((b, i) =>
                i === index ? { ...b, [field]: value } : b
            ),
        }));
    };

    // Handle photo upload
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhotoPreview(event.target.result);
                setFormData((prev) => ({ ...prev, photo: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.specialization) {
            newErrors.specialization = 'Please select a specialization';
        }

        if (formData.consultationFee <= 0) {
            newErrors.consultationFee = 'Consultation fee must be greater than 0';
        }

        if (formData.yearsExperience < 0) {
            newErrors.yearsExperience = 'Years of experience cannot be negative';
        }

        if (formData.workingDays.length === 0) {
            newErrors.workingDays = 'Please select at least one working day';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            console.log(isEditing ? 'Dentist updated:' : 'Dentist created:', formData);

            setSuccessMessage(
                isEditing
                    ? 'Dentist updated successfully!'
                    : 'Dentist added successfully!'
            );

            setTimeout(() => {
                navigate('/admin/dentists');
            }, 1500);
        } catch (err) {
            setErrors({ form: 'Failed to save dentist. Please try again.' });
            setIsSubmitting(false);
        }
    };

    // Handle clear form
    const handleClear = () => {
        setFormData(initialFormData);
        setErrors({});
        setSuccessMessage('');
        setPhotoPreview(null);
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/dentists');
    };

    return (
        <div className="df-page">
            <div className="df-blob df-blob-1" />
            <div className="df-blob df-blob-2" />

            <div className="df-inner">
                {/* Header */}
                <div className="df-header">
                    <button className="df-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Dentists
                    </button>
                    <div className="df-title-area">
                        <h1 className="df-title">{isEditing ? 'Edit Dentist' : 'Add New Dentist'}</h1>
                        <p className="df-subtitle">
                            {isEditing
                                ? 'Update dentist information and schedule'
                                : 'Register a new dentist with specialization and schedule'}
                        </p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="df-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Global Error */}
                {errors.form && (
                    <div className="df-banner error">
                        <span>{errors.form}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card df-form">
                    {/* Section 1: Personal Details */}
                    <div className="df-section">
                        <div className="df-section-header">
                            <div className="df-section-icon"><Icon.User /></div>
                            <div>
                                <h3 className="df-section-title">Personal Details</h3>
                                <p className="df-section-desc">Basic information about the dentist</p>
                            </div>
                        </div>

                        <div className="df-grid">
                            {/* Photo Upload */}
                            <div className="df-field span-2">
                                <label className="df-label">Profile Photo</label>
                                <div className="df-photo-upload">
                                    <div className="df-photo-preview">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Profile" className="df-photo-image" />
                                        ) : (
                                            <div className="df-photo-placeholder">
                                                <Icon.Camera />
                                                <span>Upload Photo</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="df-photo-input"
                                    />
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="df-field span-2">
                                <label className="df-label">
                                    Full Name <span className="req">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="e.g. Dr. Anura Silva"
                                    className={`df-input ${errors.fullName ? 'has-error' : ''}`}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && <span className="df-error-text">{errors.fullName}</span>}
                            </div>

                            {/* Email */}
                            <div className="df-field">
                                <label className="df-label">
                                    Email <span className="req">*</span>
                                </label>
                                <div className="df-input-wrap">
                                    <Icon.Mail className="df-field-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="dentist@clinic.com"
                                        className={`df-input with-icon ${errors.email ? 'has-error' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <span className="df-error-text">{errors.email}</span>}
                            </div>

                            {/* Phone */}
                            <div className="df-field">
                                <label className="df-label">
                                    Phone <span className="req">*</span>
                                </label>
                                <div className="df-input-wrap">
                                    <Icon.Phone className="df-field-icon" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+94 71 234 5678"
                                        className={`df-input with-icon ${errors.phone ? 'has-error' : ''}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.phone && <span className="df-error-text">{errors.phone}</span>}
                            </div>

                            {/* Specialization */}
                            <div className="df-field">
                                <label className="df-label">
                                    Specialization <span className="req">*</span>
                                </label>
                                <select
                                    name="specialization"
                                    className={`df-select ${errors.specialization ? 'has-error' : ''}`}
                                    value={formData.specialization}
                                    onChange={handleChange}
                                >
                                    {SPECIALIZATIONS.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                {errors.specialization && <span className="df-error-text">{errors.specialization}</span>}
                            </div>

                            {/* Qualification */}
                            <div className="df-field">
                                <label className="df-label">Qualification</label>
                                <div className="df-input-wrap">
                                    <Icon.Award className="df-field-icon" />
                                    <input
                                        type="text"
                                        name="qualification"
                                        placeholder="e.g. BDS, MDSc"
                                        className="df-input with-icon"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Years of Experience */}
                            <div className="df-field">
                                <label className="df-label">Years of Experience</label>
                                <input
                                    type="number"
                                    name="yearsExperience"
                                    className={`df-input ${errors.yearsExperience ? 'has-error' : ''}`}
                                    value={formData.yearsExperience}
                                    onChange={handleChange}
                                    min="0"
                                />
                                {errors.yearsExperience && <span className="df-error-text">{errors.yearsExperience}</span>}
                            </div>

                            {/* Consultation Fee */}
                            <div className="df-field">
                                <label className="df-label">
                                    Consultation Fee (Rs.) <span className="req">*</span>
                                </label>
                                <div className="df-input-wrap">
                                    <Icon.DollarSign className="df-field-icon" />
                                    <input
                                        type="number"
                                        name="consultationFee"
                                        className={`df-input with-icon ${errors.consultationFee ? 'has-error' : ''}`}
                                        value={formData.consultationFee}
                                        onChange={handleChange}
                                        min="0"
                                        step="100"
                                    />
                                </div>
                                {errors.consultationFee && <span className="df-error-text">{errors.consultationFee}</span>}
                            </div>

                            {/* Status */}
                            <div className="df-field">
                                <label className="df-label">Status</label>
                                <select
                                    name="status"
                                    className="df-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Schedule */}
                    <div className="df-section">
                        <div className="df-section-header">
                            <div className="df-section-icon"><Icon.Calendar /></div>
                            <div>
                                <h3 className="df-section-title">Schedule</h3>
                                <p className="df-section-desc">Working days and hours</p>
                            </div>
                        </div>

                        <div className="df-schedule-grid">
                            {/* Working Days */}
                            <div className="df-field">
                                <label className="df-label">
                                    Working Days <span className="req">*</span>
                                </label>
                                <div className="df-days-grid">
                                    {WEEKDAYS.map(day => (
                                        <button
                                            key={day}
                                            type="button"
                                            className={`df-day-btn ${formData.workingDays.includes(day) ? 'selected' : ''}`}
                                            onClick={() => toggleWorkingDay(day)}
                                        >
                                            {formData.workingDays.includes(day) && <Icon.Check className="df-day-check" />}
                                            {day.slice(0, 3)}
                                        </button>
                                    ))}
                                </div>
                                {errors.workingDays && <span className="df-error-text">{errors.workingDays}</span>}
                            </div>

                            {/* Working Hours */}
                            <div className="df-field">
                                <label className="df-label">Working Hours</label>
                                <div className="df-hours-row">
                                    <div className="df-hour-field">
                                        <span className="df-hour-label">Start</span>
                                        <input
                                            type="time"
                                            className="df-input"
                                            value={formData.workingHours.start}
                                            onChange={(e) => handleNestedChange('workingHours', 'start', e.target.value)}
                                        />
                                    </div>
                                    <span className="df-hour-sep">to</span>
                                    <div className="df-hour-field">
                                        <span className="df-hour-label">End</span>
                                        <input
                                            type="time"
                                            className="df-input"
                                            value={formData.workingHours.end}
                                            onChange={(e) => handleNestedChange('workingHours', 'end', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Break Times */}
                        <div className="df-break-section">
                            <div className="df-break-header">
                                <label className="df-label">Break Times</label>
                                <button type="button" className="df-btn small secondary" onClick={addBreak}>
                                    <Icon.Plus /> Add Break
                                </button>
                            </div>
                            {formData.breakTimes.map((breakTime, index) => (
                                <div key={index} className="df-break-item">
                                    <div className="df-break-fields">
                                        <div className="df-hour-field">
                                            <span className="df-hour-label">Start</span>
                                            <input
                                                type="time"
                                                className="df-input"
                                                value={breakTime.start}
                                                onChange={(e) => updateBreak(index, 'start', e.target.value)}
                                            />
                                        </div>
                                        <span className="df-hour-sep">to</span>
                                        <div className="df-hour-field">
                                            <span className="df-hour-label">End</span>
                                            <input
                                                type="time"
                                                className="df-input"
                                                value={breakTime.end}
                                                onChange={(e) => updateBreak(index, 'end', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="df-break-remove"
                                        onClick={() => removeBreak(index)}
                                    >
                                        <Icon.Trash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="df-actions">
                        <button
                            type="button"
                            className="df-btn secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <div className="df-actions-right">
                            <button
                                type="button"
                                className="df-btn secondary"
                                onClick={handleClear}
                                disabled={isSubmitting}
                            >
                                <Icon.RotateCcw /> Clear Form
                            </button>
                            <button
                                type="submit"
                                className="df-btn primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="df-spinner" />
                                ) : (
                                    <>
                                        <Icon.Check /> {isEditing ? 'Update Dentist' : 'Save Dentist'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DentistForm;