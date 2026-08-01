import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ClinicSettings.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Building: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg>),
    Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Globe: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Percent: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 5 5 19M6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>),
    Bell: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
    MessageSquare: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
    Camera: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    MapPin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
};

// ---------------------------------------------------------------
// Initial Settings Data
// ---------------------------------------------------------------
const initialSettings = {
    // Clinic Information
    clinicName: 'Sunrise Dental Clinic',
    address: '45/A, Temple Road, Colombo 03, Sri Lanka',
    phone: '+94 71 234 5678',
    email: 'info@sunrisedental.lk',
    website: 'www.sunrisedental.lk',
    logo: null,

    // Business Hours
    businessHours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '09:00', close: '15:00', closed: false },
        sunday: { open: '00:00', close: '00:00', closed: true },
    },
    breakTimes: [
        { start: '12:00', end: '13:00' },
    ],

    // Appointment Settings
    appointmentDuration: 30,
    minNoticePeriod: 24,
    maxAdvanceBooking: 30,

    // Billing Settings
    defaultConsultationFee: 2500,
    taxRate: 8,
    currencySymbol: 'Rs.',

    // Notification Settings
    emailReminders: true,
    smsReminders: true,
    reminderTiming: 24,
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const ClinicSettings = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(initialSettings);
    const [activeTab, setActiveTab] = useState('clinic');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Handle nested changes
    const handleNestedChange = (section, field, value) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    // Handle business hours change
    const handleBusinessHoursChange = (day, field, value) => {
        setSettings((prev) => ({
            ...prev,
            businessHours: {
                ...prev.businessHours,
                [day]: {
                    ...prev.businessHours[day],
                    [field]: value,
                },
            },
        }));
    };

    // Handle break times
    const addBreak = () => {
        setSettings((prev) => ({
            ...prev,
            breakTimes: [...prev.breakTimes, { start: '12:00', end: '13:00' }],
        }));
    };

    const removeBreak = (index) => {
        setSettings((prev) => ({
            ...prev,
            breakTimes: prev.breakTimes.filter((_, i) => i !== index),
        }));
    };

    const updateBreak = (index, field, value) => {
        setSettings((prev) => ({
            ...prev,
            breakTimes: prev.breakTimes.map((b, i) =>
                i === index ? { ...b, [field]: value } : b
            ),
        }));
    };

    // Handle logo upload
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoPreview(event.target.result);
                setSettings((prev) => ({ ...prev, logo: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validation
    const validateSettings = () => {
        const newErrors = {};

        if (!settings.clinicName.trim()) {
            newErrors.clinicName = 'Clinic name is required';
        }

        if (!settings.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!settings.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!settings.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(settings.email.trim())) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (settings.defaultConsultationFee <= 0) {
            newErrors.defaultConsultationFee = 'Consultation fee must be greater than 0';
        }

        if (settings.taxRate < 0 || settings.taxRate > 100) {
            newErrors.taxRate = 'Tax rate must be between 0 and 100';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateSettings()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            console.log('Settings saved:', settings);
            setSuccessMessage('Settings saved successfully!');
            setTimeout(() => setIsSubmitting(false), 500);
        } catch (err) {
            setErrors({ form: 'Failed to save settings. Please try again.' });
            setIsSubmitting(false);
        }
    };

    // Reset to defaults
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all settings to default values?')) {
            setSettings(initialSettings);
            setLogoPreview(null);
            setSuccessMessage('Settings reset to defaults');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'clinic':
                return renderClinicTab();
            case 'hours':
                return renderHoursTab();
            case 'appointments':
                return renderAppointmentsTab();
            case 'billing':
                return renderBillingTab();
            case 'notifications':
                return renderNotificationsTab();
            default:
                return null;
        }
    };

    const renderClinicTab = () => (
        <div className="cs-tab-content">
            <div className="cs-section">
                <div className="cs-section-header">
                    <div className="cs-section-icon"><Icon.Building /></div>
                    <div>
                        <h3 className="cs-section-title">Clinic Information</h3>
                        <p className="cs-section-desc">Basic information about your clinic</p>
                    </div>
                </div>

                <div className="cs-grid">
                    <div className="cs-field span-2">
                        <label className="cs-label">
                            Clinic Name <span className="req">*</span>
                        </label>
                        <input
                            type="text"
                            name="clinicName"
                            className={`cs-input ${errors.clinicName ? 'has-error' : ''}`}
                            value={settings.clinicName}
                            onChange={handleChange}
                        />
                        {errors.clinicName && <span className="cs-error-text">{errors.clinicName}</span>}
                    </div>

                    <div className="cs-field span-2">
                        <label className="cs-label">
                            Address <span className="req">*</span>
                        </label>
                        <div className="cs-input-wrap">
                            <Icon.MapPin className="cs-field-icon" />
                            <textarea
                                name="address"
                                rows="3"
                                className={`cs-textarea with-icon ${errors.address ? 'has-error' : ''}`}
                                value={settings.address}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.address && <span className="cs-error-text">{errors.address}</span>}
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">
                            Phone <span className="req">*</span>
                        </label>
                        <div className="cs-input-wrap">
                            <Icon.Phone className="cs-field-icon" />
                            <input
                                type="tel"
                                name="phone"
                                className={`cs-input with-icon ${errors.phone ? 'has-error' : ''}`}
                                value={settings.phone}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.phone && <span className="cs-error-text">{errors.phone}</span>}
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">
                            Email <span className="req">*</span>
                        </label>
                        <div className="cs-input-wrap">
                            <Icon.Mail className="cs-field-icon" />
                            <input
                                type="email"
                                name="email"
                                className={`cs-input with-icon ${errors.email ? 'has-error' : ''}`}
                                value={settings.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <span className="cs-error-text">{errors.email}</span>}
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">Website</label>
                        <div className="cs-input-wrap">
                            <Icon.Globe className="cs-field-icon" />
                            <input
                                type="text"
                                name="website"
                                className="cs-input with-icon"
                                value={settings.website}
                                onChange={handleChange}
                                placeholder="www.example.com"
                            />
                        </div>
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">Clinic Logo</label>
                        <div className="cs-logo-upload">
                            <div className="cs-logo-preview">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Clinic Logo" className="cs-logo-image" />
                                ) : (
                                    <div className="cs-logo-placeholder">
                                        <Icon.Camera />
                                        <span>Upload Logo</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="cs-logo-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHoursTab = () => (
        <div className="cs-tab-content">
            <div className="cs-section">
                <div className="cs-section-header">
                    <div className="cs-section-icon"><Icon.Calendar /></div>
                    <div>
                        <h3 className="cs-section-title">Business Hours</h3>
                        <p className="cs-section-desc">Set your clinic's operating hours for each day</p>
                    </div>
                </div>

                <div className="cs-hours-grid">
                    {DAYS.map((day, index) => (
                        <div key={day} className="cs-hour-row">
                            <span className="cs-day-label">{DAY_LABELS[index]}</span>
                            <div className="cs-hour-controls">
                                <label className="cs-toggle">
                                    <input
                                        type="checkbox"
                                        checked={!settings.businessHours[day].closed}
                                        onChange={(e) => handleBusinessHoursChange(day, 'closed', !e.target.checked)}
                                    />
                                    <span className="cs-toggle-slider" />
                                    <span className="cs-toggle-label">Open</span>
                                </label>
                                {!settings.businessHours[day].closed && (
                                    <>
                                        <div className="cs-hour-field">
                                            <span className="cs-hour-label">Open</span>
                                            <input
                                                type="time"
                                                className="cs-input"
                                                value={settings.businessHours[day].open}
                                                onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                                            />
                                        </div>
                                        <span className="cs-hour-sep">to</span>
                                        <div className="cs-hour-field">
                                            <span className="cs-hour-label">Close</span>
                                            <input
                                                type="time"
                                                className="cs-input"
                                                value={settings.businessHours[day].close}
                                                onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cs-break-section">
                    <div className="cs-break-header">
                        <label className="cs-label">Break Times</label>
                        <button type="button" className="cs-btn small secondary" onClick={addBreak}>
                            <Icon.Plus /> Add Break
                        </button>
                    </div>
                    {settings.breakTimes.map((breakTime, index) => (
                        <div key={index} className="cs-break-item">
                            <div className="cs-break-fields">
                                <div className="cs-hour-field">
                                    <span className="cs-hour-label">Start</span>
                                    <input
                                        type="time"
                                        className="cs-input"
                                        value={breakTime.start}
                                        onChange={(e) => updateBreak(index, 'start', e.target.value)}
                                    />
                                </div>
                                <span className="cs-hour-sep">to</span>
                                <div className="cs-hour-field">
                                    <span className="cs-hour-label">End</span>
                                    <input
                                        type="time"
                                        className="cs-input"
                                        value={breakTime.end}
                                        onChange={(e) => updateBreak(index, 'end', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="cs-break-remove"
                                onClick={() => removeBreak(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAppointmentsTab = () => (
        <div className="cs-tab-content">
            <div className="cs-section">
                <div className="cs-section-header">
                    <div className="cs-section-icon"><Icon.Clock /></div>
                    <div>
                        <h3 className="cs-section-title">Appointment Settings</h3>
                        <p className="cs-section-desc">Configure appointment scheduling rules</p>
                    </div>
                </div>

                <div className="cs-grid">
                    <div className="cs-field">
                        <label className="cs-label">Default Appointment Duration</label>
                        <select
                            name="appointmentDuration"
                            className="cs-select"
                            value={settings.appointmentDuration}
                            onChange={handleChange}
                        >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">Minimum Notice Period</label>
                        <div className="cs-input-wrap">
                            <input
                                type="number"
                                name="minNoticePeriod"
                                className="cs-input"
                                value={settings.minNoticePeriod}
                                onChange={handleChange}
                                min="1"
                            />
                            <span className="cs-input-suffix">hours</span>
                        </div>
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">Maximum Advance Booking</label>
                        <div className="cs-input-wrap">
                            <input
                                type="number"
                                name="maxAdvanceBooking"
                                className="cs-input"
                                value={settings.maxAdvanceBooking}
                                onChange={handleChange}
                                min="1"
                            />
                            <span className="cs-input-suffix">days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderBillingTab = () => (
        <div className="cs-tab-content">
            <div className="cs-section">
                <div className="cs-section-header">
                    <div className="cs-section-icon"><Icon.DollarSign /></div>
                    <div>
                        <h3 className="cs-section-title">Billing Settings</h3>
                        <p className="cs-section-desc">Configure billing and tax settings</p>
                    </div>
                </div>

                <div className="cs-grid">
                    <div className="cs-field">
                        <label className="cs-label">
                            Default Consultation Fee <span className="req">*</span>
                        </label>
                        <div className="cs-input-wrap">
                            <span className="cs-input-prefix">Rs.</span>
                            <input
                                type="number"
                                name="defaultConsultationFee"
                                className={`cs-input with-prefix ${errors.defaultConsultationFee ? 'has-error' : ''}`}
                                value={settings.defaultConsultationFee}
                                onChange={handleChange}
                                min="0"
                                step="100"
                            />
                        </div>
                        {errors.defaultConsultationFee && <span className="cs-error-text">{errors.defaultConsultationFee}</span>}
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">
                            Tax/GST Rate <span className="req">*</span>
                        </label>
                        <div className="cs-input-wrap">
                            <input
                                type="number"
                                name="taxRate"
                                className={`cs-input ${errors.taxRate ? 'has-error' : ''}`}
                                value={settings.taxRate}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                step="0.5"
                            />
                            <span className="cs-input-suffix">%</span>
                        </div>
                        {errors.taxRate && <span className="cs-error-text">{errors.taxRate}</span>}
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">Currency Symbol</label>
                        <input
                            type="text"
                            name="currencySymbol"
                            className="cs-input"
                            value={settings.currencySymbol}
                            onChange={handleChange}
                            placeholder="Rs."
                            maxLength="10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="cs-tab-content">
            <div className="cs-section">
                <div className="cs-section-header">
                    <div className="cs-section-icon"><Icon.Bell /></div>
                    <div>
                        <h3 className="cs-section-title">Notification Settings</h3>
                        <p className="cs-section-desc">Configure appointment reminder notifications</p>
                    </div>
                </div>

                <div className="cs-grid">
                    <div className="cs-field span-2">
                        <label className="cs-label">Email Reminders</label>
                        <label className="cs-toggle">
                            <input
                                type="checkbox"
                                name="emailReminders"
                                checked={settings.emailReminders}
                                onChange={handleChange}
                            />
                            <span className="cs-toggle-slider" />
                            <span className="cs-toggle-label">
                                {settings.emailReminders ? 'Enabled' : 'Disabled'}
                            </span>
                        </label>
                    </div>

                    <div className="cs-field span-2">
                        <label className="cs-label">SMS Reminders</label>
                        <label className="cs-toggle">
                            <input
                                type="checkbox"
                                name="smsReminders"
                                checked={settings.smsReminders}
                                onChange={handleChange}
                            />
                            <span className="cs-toggle-slider" />
                            <span className="cs-toggle-label">
                                {settings.smsReminders ? 'Enabled' : 'Disabled'}
                            </span>
                        </label>
                    </div>

                    <div className="cs-field">
                        <label className="cs-label">Reminder Timing</label>
                        <div className="cs-input-wrap">
                            <input
                                type="number"
                                name="reminderTiming"
                                className="cs-input"
                                value={settings.reminderTiming}
                                onChange={handleChange}
                                min="1"
                            />
                            <span className="cs-input-suffix">hours before</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="cs-page">
            <div className="cs-blob cs-blob-1" />
            <div className="cs-blob cs-blob-2" />

            <div className="cs-inner">
                {/* Header */}
                <div className="cs-header">
                    <button className="cs-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Dashboard
                    </button>
                    <div className="cs-title-area">
                        <h1 className="cs-title">Clinic Settings</h1>
                        <p className="cs-subtitle">Configure your clinic information and business settings</p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="cs-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Global Error */}
                {errors.form && (
                    <div className="cs-banner error">
                        <span>{errors.form}</span>
                    </div>
                )}

                {/* Tabs */}
                <div className="cs-tabs">
                    <button
                        className={`cs-tab ${activeTab === 'clinic' ? 'active' : ''}`}
                        onClick={() => setActiveTab('clinic')}
                    >
                        <Icon.Building /> Clinic Info
                    </button>
                    <button
                        className={`cs-tab ${activeTab === 'hours' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hours')}
                    >
                        <Icon.Calendar /> Business Hours
                    </button>
                    <button
                        className={`cs-tab ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        <Icon.Clock /> Appointments
                    </button>
                    <button
                        className={`cs-tab ${activeTab === 'billing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('billing')}
                    >
                        <Icon.DollarSign /> Billing
                    </button>
                    <button
                        className={`cs-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Icon.Bell /> Notifications
                    </button>
                </div>

                {/* Tab Content */}
                <form onSubmit={handleSubmit} className="glass-card cs-form">
                    {renderTabContent()}

                    {/* Form Actions */}
                    <div className="cs-actions">
                        <button
                            type="button"
                            className="cs-btn secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <div className="cs-actions-right">
                            <button
                                type="button"
                                className="cs-btn secondary"
                                onClick={handleReset}
                                disabled={isSubmitting}
                            >
                                <Icon.RotateCcw /> Reset to Defaults
                            </button>
                            <button
                                type="submit"
                                className="cs-btn primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="cs-spinner" />
                                ) : (
                                    <>
                                        <Icon.Check /> Save Settings
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

export default ClinicSettings;