import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/SystemConfig.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Settings: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>),
    Building: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    Lock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Server: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><rect x="8" y="2" width="8" height="4" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" /></svg>),
    Plug: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    Globe: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
    MapPin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    Camera: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>),
    Bell: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
    CreditCard: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>),
    Shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Info: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
};

// ---------------------------------------------------------------
// Initial Settings Data
// ---------------------------------------------------------------
const initialSettings = {
    // Clinic Information
    clinicName: 'Sunrise Dental Clinic',
    abn: '12 345 678 901',
    phone: '(02) 9876 5432',
    email: 'info@sunrisedental.com',
    website: 'www.sunrisedental.com',
    address: '123 Dental Street, Sydney NSW 2000',
    logo: null,

    // Appointment Settings
    defaultDuration: 30,
    minNoticePeriod: 24,
    maxAdvanceBooking: 30,
    timeSlotInterval: 15,
    allowSameDay: true,
    requireConfirmation: true,
    autoConfirmationEmail: true,
    preventDoubleBooking: true,
    preventOverlapping: true,
    businessHours: {
        monday: { open: '08:00', close: '17:00', closed: false },
        tuesday: { open: '08:00', close: '17:00', closed: false },
        wednesday: { open: '08:00', close: '17:00', closed: false },
        thursday: { open: '08:00', close: '17:00', closed: false },
        friday: { open: '08:00', close: '17:00', closed: false },
        saturday: { open: '09:00', close: '13:00', closed: false },
        sunday: { open: '08:00', close: '17:00', closed: true },
    },
    breakTimes: [
        { start: '12:00', end: '13:00', active: true },
    ],
    reminderSms: true,
    reminderEmail: true,
    reminderTiming: 24,
    secondReminder: 1,
    cancellationFee: 50,
    freeCancellationPeriod: 24,

    // Billing Settings
    currency: 'AUD ($)',
    defaultConsultationFee: 50,
    taxRate: 10,
    invoicePrefix: 'INV-2024-',
    paymentMethods: {
        cash: true,
        creditCard: true,
        debitCard: true,
        hicaps: true,
        bankTransfer: true,
        installment: false,
    },
    acceptedCards: {
        visa: true,
        mastercard: true,
        amex: true,
        discover: false,
        diners: false,
    },

    // Security Settings
    passwordMinLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true,
    sessionTimeout: 30,
    rememberMe: true,
    maxLoginAttempts: 5,
    accountLockoutDuration: 15,
    enable2FA: false,
    twoFAMethod: 'SMS',
    autoLogout: true,
    encryptData: true,

    // Notification Settings
    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@sunrisedental.com',
    smtpPassword: '',
    senderEmail: 'noreply@sunrisedental.com',
    senderName: 'Sunrise Dental Clinic',
    smsProvider: 'Twilio',
    smsApiKey: '',
    smsSenderId: 'SunriseDental',
    notificationTypes: {
        appointmentConfirmation: { email: true, sms: true },
        appointmentReminder: { email: true, sms: true },
        appointmentCancellation: { email: true, sms: true },
        appointmentReschedule: { email: true, sms: true },
        billGenerated: { email: true, sms: true },
        paymentReceived: { email: true, sms: true },
        paymentReminder: { email: true, sms: true },
        staffNotifications: { email: true, sms: false },
        systemAlerts: { email: true, sms: false },
    },

    // System Settings
    defaultLanguage: 'English',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12-hour (AM/PM)',
    timeZone: 'Sydney (AEST)',
    backupFrequency: 'Daily',
    backupTime: '02:00',
    backupsToKeep: 30,
    backupLocation: '/backups/dental/',
    enableAuditLogging: true,
    logRetentionDays: 90,
    enableApiLogging: true,
    enableErrorLogging: true,
    maintenanceMode: false,
    maintenanceMessage: 'System is undergoing maintenance. Please try again later.',

    // Integration Settings
    googleAnalyticsId: '',
    enableAnalytics: false,
    enableGoogleCalendar: false,
    calendarId: '',
    enableOutlookSync: false,
    syncFrequency: 15,
    paymentGateway: 'Stripe',
    publishableKey: '',
    secretKey: '',
    enableTestMode: true,
    hicapsTerminalId: '',
    enableHicaps: false,
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['15', '20', '30', '45', '60'];

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const SystemConfig = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(initialSettings);
    const [activeSection, setActiveSection] = useState('clinic');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);

    const sections = [
        { id: 'clinic', label: 'Clinic Information', icon: 'Building' },
        { id: 'appointments', label: 'Appointment Settings', icon: 'Calendar' },
        { id: 'billing', label: 'Billing Settings', icon: 'DollarSign' },
        { id: 'security', label: 'Security Settings', icon: 'Lock' },
        { id: 'notifications', label: 'Notification Settings', icon: 'Mail' },
        { id: 'system', label: 'System Settings', icon: 'Server' },
        { id: 'integrations', label: 'Integration Settings', icon: 'Plug' },
    ];

    const getIcon = (iconName) => Icon[iconName] || Icon.Settings;

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

    // Handle business hours
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
    const handleBreakChange = (index, field, value) => {
        setSettings((prev) => ({
            ...prev,
            breakTimes: prev.breakTimes.map((b, i) =>
                i === index ? { ...b, [field]: value } : b
            ),
        }));
    };

    const addBreak = () => {
        setSettings((prev) => ({
            ...prev,
            breakTimes: [...prev.breakTimes, { start: '12:00', end: '13:00', active: true }],
        }));
    };

    const removeBreak = (index) => {
        setSettings((prev) => ({
            ...prev,
            breakTimes: prev.breakTimes.filter((_, i) => i !== index),
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

    // Validate settings
    const validateSettings = () => {
        const newErrors = {};

        // Clinic validation
        if (!settings.clinicName.trim()) newErrors.clinicName = 'Clinic name is required';
        if (!settings.abn.trim()) newErrors.abn = 'ABN is required';
        if (!settings.phone.trim()) newErrors.phone = 'Phone is required';
        if (!settings.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Security validation
        if (settings.passwordMinLength < 6) {
            newErrors.passwordMinLength = 'Minimum length must be at least 6';
        }
        if (settings.sessionTimeout < 5) {
            newErrors.sessionTimeout = 'Session timeout must be at least 5 minutes';
        }
        if (settings.maxLoginAttempts < 1) {
            newErrors.maxLoginAttempts = 'Must be at least 1';
        }

        // Billing validation
        if (settings.taxRate < 0 || settings.taxRate > 100) {
            newErrors.taxRate = 'Tax rate must be between 0 and 100';
        }
        if (settings.defaultConsultationFee < 0) {
            newErrors.defaultConsultationFee = 'Fee cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle save
    const handleSave = async () => {
        if (!validateSettings()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setSuccessMessage('All settings saved successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setErrors({ form: 'Failed to save settings' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle reset
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

    // Render section content
    const renderSection = () => {
        switch (activeSection) {
            case 'clinic': return renderClinicSection();
            case 'appointments': return renderAppointmentSection();
            case 'billing': return renderBillingSection();
            case 'security': return renderSecuritySection();
            case 'notifications': return renderNotificationSection();
            case 'system': return renderSystemSection();
            case 'integrations': return renderIntegrationSection();
            default: return null;
        }
    };

    const renderClinicSection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.Building /></div>
                <div>
                    <h3 className="sc-section-title">Clinic Information</h3>
                    <p className="sc-section-desc">Basic information about your clinic</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field span-2">
                    <label className="sc-label">Clinic Name <span className="req">*</span></label>
                    <input
                        type="text"
                        name="clinicName"
                        className={`sc-input ${errors.clinicName ? 'has-error' : ''}`}
                        value={settings.clinicName}
                        onChange={handleChange}
                    />
                    {errors.clinicName && <span className="sc-error-text">{errors.clinicName}</span>}
                </div>

                <div className="sc-field">
                    <label className="sc-label">ABN <span className="req">*</span></label>
                    <input
                        type="text"
                        name="abn"
                        className={`sc-input ${errors.abn ? 'has-error' : ''}`}
                        value={settings.abn}
                        onChange={handleChange}
                    />
                    {errors.abn && <span className="sc-error-text">{errors.abn}</span>}
                </div>

                <div className="sc-field">
                    <label className="sc-label">Phone <span className="req">*</span></label>
                    <div className="sc-input-wrap">
                        <Icon.Phone className="sc-field-icon" />
                        <input
                            type="text"
                            name="phone"
                            className={`sc-input with-icon ${errors.phone ? 'has-error' : ''}`}
                            value={settings.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.phone && <span className="sc-error-text">{errors.phone}</span>}
                </div>

                <div className="sc-field">
                    <label className="sc-label">Email <span className="req">*</span></label>
                    <div className="sc-input-wrap">
                        <Icon.Mail className="sc-field-icon" />
                        <input
                            type="email"
                            name="email"
                            className={`sc-input with-icon ${errors.email ? 'has-error' : ''}`}
                            value={settings.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <span className="sc-error-text">{errors.email}</span>}
                </div>

                <div className="sc-field">
                    <label className="sc-label">Website</label>
                    <div className="sc-input-wrap">
                        <Icon.Globe className="sc-field-icon" />
                        <input
                            type="text"
                            name="website"
                            className="sc-input with-icon"
                            value={settings.website}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Address</label>
                    <div className="sc-input-wrap">
                        <Icon.MapPin className="sc-field-icon" />
                        <textarea
                            name="address"
                            rows="3"
                            className="sc-textarea with-icon"
                            value={settings.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Clinic Logo</label>
                    <div className="sc-logo-upload">
                        <div className="sc-logo-preview">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Clinic Logo" className="sc-logo-image" />
                            ) : (
                                <div className="sc-logo-placeholder">
                                    <Icon.Camera />
                                    <span>Upload Logo</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="sc-logo-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAppointmentSection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.Calendar /></div>
                <div>
                    <h3 className="sc-section-title">Appointment Settings</h3>
                    <p className="sc-section-desc">Configure booking rules and business hours</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field">
                    <label className="sc-label">Default Appointment Duration</label>
                    <select
                        name="defaultDuration"
                        className="sc-select"
                        value={settings.defaultDuration}
                        onChange={handleChange}
                    >
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t} minutes</option>)}
                    </select>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Time Slot Interval</label>
                    <select
                        name="timeSlotInterval"
                        className="sc-select"
                        value={settings.timeSlotInterval}
                        onChange={handleChange}
                    >
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t} minutes</option>)}
                    </select>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Minimum Notice Period</label>
                    <div className="sc-input-wrap">
                        <input
                            type="number"
                            name="minNoticePeriod"
                            className="sc-input"
                            value={settings.minNoticePeriod}
                            onChange={handleChange}
                            min="1"
                        />
                        <span className="sc-input-suffix">hours</span>
                    </div>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Maximum Advance Booking</label>
                    <div className="sc-input-wrap">
                        <input
                            type="number"
                            name="maxAdvanceBooking"
                            className="sc-input"
                            value={settings.maxAdvanceBooking}
                            onChange={handleChange}
                            min="1"
                        />
                        <span className="sc-input-suffix">days</span>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Business Hours</label>
                    <div className="sc-hours-grid">
                        {DAYS.map((day, index) => (
                            <div key={day} className="sc-hour-row">
                                <span className="sc-day-label">{DAY_LABELS[index]}</span>
                                <div className="sc-hour-controls">
                                    <label className="sc-toggle">
                                        <input
                                            type="checkbox"
                                            checked={!settings.businessHours[day].closed}
                                            onChange={(e) => handleBusinessHoursChange(day, 'closed', !e.target.checked)}
                                        />
                                        <span className="sc-toggle-slider" />
                                        <span className="sc-toggle-label">Open</span>
                                    </label>
                                    {!settings.businessHours[day].closed && (
                                        <>
                                            <input
                                                type="time"
                                                className="sc-input sc-hour-input"
                                                value={settings.businessHours[day].open}
                                                onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                                            />
                                            <span className="sc-hour-sep">to</span>
                                            <input
                                                type="time"
                                                className="sc-input sc-hour-input"
                                                value={settings.businessHours[day].close}
                                                onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Break Times</label>
                    {settings.breakTimes.map((breakTime, index) => (
                        <div key={index} className="sc-break-item">
                            <div className="sc-break-fields">
                                <input
                                    type="time"
                                    className="sc-input sc-hour-input"
                                    value={breakTime.start}
                                    onChange={(e) => handleBreakChange(index, 'start', e.target.value)}
                                />
                                <span className="sc-hour-sep">to</span>
                                <input
                                    type="time"
                                    className="sc-input sc-hour-input"
                                    value={breakTime.end}
                                    onChange={(e) => handleBreakChange(index, 'end', e.target.value)}
                                />
                                <label className="sc-toggle">
                                    <input
                                        type="checkbox"
                                        checked={breakTime.active}
                                        onChange={(e) => handleBreakChange(index, 'active', e.target.checked)}
                                    />
                                    <span className="sc-toggle-slider" />
                                    <span className="sc-toggle-label">Active</span>
                                </label>
                            </div>
                            <button
                                type="button"
                                className="sc-break-remove"
                                onClick={() => removeBreak(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" className="sc-btn small secondary" onClick={addBreak}>
                        + Add Break
                    </button>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Appointment Rules</label>
                    <div className="sc-checkbox-grid">
                        <label className="sc-checkbox">
                            <input type="checkbox" name="allowSameDay" checked={settings.allowSameDay} onChange={handleChange} />
                            <span className="sc-checkbox-label">Allow same-day bookings</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="requireConfirmation" checked={settings.requireConfirmation} onChange={handleChange} />
                            <span className="sc-checkbox-label">Require patient confirmation</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="autoConfirmationEmail" checked={settings.autoConfirmationEmail} onChange={handleChange} />
                            <span className="sc-checkbox-label">Send confirmation emails automatically</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="preventDoubleBooking" checked={settings.preventDoubleBooking} onChange={handleChange} />
                            <span className="sc-checkbox-label">Prevent double booking</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="preventOverlapping" checked={settings.preventOverlapping} onChange={handleChange} />
                            <span className="sc-checkbox-label">Prevent overlapping appointments</span>
                        </label>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Reminder Settings</label>
                    <div className="sc-reminder-grid">
                        <label className="sc-checkbox">
                            <input type="checkbox" name="reminderSms" checked={settings.reminderSms} onChange={handleChange} />
                            <span className="sc-checkbox-label">Send SMS reminders</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="reminderEmail" checked={settings.reminderEmail} onChange={handleChange} />
                            <span className="sc-checkbox-label">Send Email reminders</span>
                        </label>
                        <div className="sc-reminder-timing">
                            <label className="sc-label">Reminder timing</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="reminderTiming"
                                    className="sc-input"
                                    value={settings.reminderTiming}
                                    onChange={handleChange}
                                    min="1"
                                />
                                <span className="sc-input-suffix">hours before</span>
                            </div>
                        </div>
                        <div className="sc-reminder-timing">
                            <label className="sc-label">Second reminder</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="secondReminder"
                                    className="sc-input"
                                    value={settings.secondReminder}
                                    onChange={handleChange}
                                    min="1"
                                />
                                <span className="sc-input-suffix">hour(s) before</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Cancellation Policy</label>
                    <div className="sc-cancellation-grid">
                        <div className="sc-cancellation-field">
                            <label className="sc-label">Cancellation fee</label>
                            <div className="sc-input-wrap">
                                <span className="sc-input-prefix">$</span>
                                <input
                                    type="number"
                                    name="cancellationFee"
                                    className="sc-input with-prefix"
                                    value={settings.cancellationFee}
                                    onChange={handleChange}
                                    min="0"
                                    step="5"
                                />
                            </div>
                        </div>
                        <div className="sc-cancellation-field">
                            <label className="sc-label">Free cancellation period</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="freeCancellationPeriod"
                                    className="sc-input"
                                    value={settings.freeCancellationPeriod}
                                    onChange={handleChange}
                                    min="1"
                                />
                                <span className="sc-input-suffix">hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderBillingSection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.DollarSign /></div>
                <div>
                    <h3 className="sc-section-title">Billing Settings</h3>
                    <p className="sc-section-desc">Configure financial and payment settings</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field">
                    <label className="sc-label">Currency</label>
                    <select
                        name="currency"
                        className="sc-select"
                        value={settings.currency}
                        onChange={handleChange}
                    >
                        <option value="AUD ($)">AUD ($)</option>
                        <option value="USD ($)">USD ($)</option>
                        <option value="EUR (€)">EUR (€)</option>
                        <option value="GBP (£)">GBP (£)</option>
                        <option value="LKR (Rs.)">LKR (Rs.)</option>
                    </select>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Default Consultation Fee</label>
                    <div className="sc-input-wrap">
                        <span className="sc-input-prefix">$</span>
                        <input
                            type="number"
                            name="defaultConsultationFee"
                            className={`sc-input with-prefix ${errors.defaultConsultationFee ? 'has-error' : ''}`}
                            value={settings.defaultConsultationFee}
                            onChange={handleChange}
                            min="0"
                            step="5"
                        />
                    </div>
                    {errors.defaultConsultationFee && <span className="sc-error-text">{errors.defaultConsultationFee}</span>}
                </div>

                <div className="sc-field">
                    <label className="sc-label">Tax Rate (GST)</label>
                    <div className="sc-input-wrap">
                        <input
                            type="number"
                            name="taxRate"
                            className={`sc-input ${errors.taxRate ? 'has-error' : ''}`}
                            value={settings.taxRate}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.5"
                        />
                        <span className="sc-input-suffix">%</span>
                    </div>
                    {errors.taxRate && <span className="sc-error-text">{errors.taxRate}</span>}
                </div>

                <div className="sc-field">
                    <label className="sc-label">Invoice Prefix</label>
                    <input
                        type="text"
                        name="invoicePrefix"
                        className="sc-input"
                        value={settings.invoicePrefix}
                        onChange={handleChange}
                    />
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Payment Methods</label>
                    <div className="sc-checkbox-grid">
                        {Object.entries(settings.paymentMethods).map(([key, value]) => (
                            <label key={key} className="sc-checkbox">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleNestedChange('paymentMethods', key, e.target.checked)}
                                />
                                <span className="sc-checkbox-label">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Accepted Credit Cards</label>
                    <div className="sc-checkbox-grid">
                        {Object.entries(settings.acceptedCards).map(([key, value]) => (
                            <label key={key} className="sc-checkbox">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleNestedChange('acceptedCards', key, e.target.checked)}
                                />
                                <span className="sc-checkbox-label">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.Lock /></div>
                <div>
                    <h3 className="sc-section-title">Security & Authentication</h3>
                    <p className="sc-section-desc">Configure security policies and authentication</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field span-2">
                    <label className="sc-label">Password Policy</label>
                    <div className="sc-password-grid">
                        <div className="sc-password-field">
                            <label className="sc-label">Minimum Length</label>
                            <input
                                type="number"
                                name="passwordMinLength"
                                className={`sc-input ${errors.passwordMinLength ? 'has-error' : ''}`}
                                value={settings.passwordMinLength}
                                onChange={handleChange}
                                min="6"
                            />
                            {errors.passwordMinLength && <span className="sc-error-text">{errors.passwordMinLength}</span>}
                        </div>
                        <div className="sc-password-field">
                            <label className="sc-label">Require Uppercase</label>
                            <label className="sc-toggle">
                                <input type="checkbox" name="requireUppercase" checked={settings.requireUppercase} onChange={handleChange} />
                                <span className="sc-toggle-slider" />
                            </label>
                        </div>
                        <div className="sc-password-field">
                            <label className="sc-label">Require Lowercase</label>
                            <label className="sc-toggle">
                                <input type="checkbox" name="requireLowercase" checked={settings.requireLowercase} onChange={handleChange} />
                                <span className="sc-toggle-slider" />
                            </label>
                        </div>
                        <div className="sc-password-field">
                            <label className="sc-label">Require Numbers</label>
                            <label className="sc-toggle">
                                <input type="checkbox" name="requireNumbers" checked={settings.requireNumbers} onChange={handleChange} />
                                <span className="sc-toggle-slider" />
                            </label>
                        </div>
                        <div className="sc-password-field">
                            <label className="sc-label">Require Special Characters</label>
                            <label className="sc-toggle">
                                <input type="checkbox" name="requireSpecial" checked={settings.requireSpecial} onChange={handleChange} />
                                <span className="sc-toggle-slider" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Session Settings</label>
                    <div className="sc-session-grid">
                        <div className="sc-session-field">
                            <label className="sc-label">Session Timeout</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="sessionTimeout"
                                    className={`sc-input ${errors.sessionTimeout ? 'has-error' : ''}`}
                                    value={settings.sessionTimeout}
                                    onChange={handleChange}
                                    min="5"
                                />
                                <span className="sc-input-suffix">minutes</span>
                            </div>
                            {errors.sessionTimeout && <span className="sc-error-text">{errors.sessionTimeout}</span>}
                        </div>
                        <div className="sc-session-field">
                            <label className="sc-label">Enable "Remember Me"</label>
                            <label className="sc-toggle">
                                <input type="checkbox" name="rememberMe" checked={settings.rememberMe} onChange={handleChange} />
                                <span className="sc-toggle-slider" />
                            </label>
                        </div>
                        <div className="sc-session-field">
                            <label className="sc-label">Max Login Attempts</label>
                            <input
                                type="number"
                                name="maxLoginAttempts"
                                className={`sc-input ${errors.maxLoginAttempts ? 'has-error' : ''}`}
                                value={settings.maxLoginAttempts}
                                onChange={handleChange}
                                min="1"
                            />
                            {errors.maxLoginAttempts && <span className="sc-error-text">{errors.maxLoginAttempts}</span>}
                        </div>
                        <div className="sc-session-field">
                            <label className="sc-label">Account Lockout Duration</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="accountLockoutDuration"
                                    className="sc-input"
                                    value={settings.accountLockoutDuration}
                                    onChange={handleChange}
                                    min="1"
                                />
                                <span className="sc-input-suffix">minutes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Two-Factor Authentication</label>
                    <div className="sc-2fa-grid">
                        <div className="sc-2fa-field">
                            <label className="sc-label">Enable 2FA</label>
                            <label className="sc-toggle">
                                <input type="checkbox" name="enable2FA" checked={settings.enable2FA} onChange={handleChange} />
                                <span className="sc-toggle-slider" />
                            </label>
                        </div>
                        {settings.enable2FA && (
                            <div className="sc-2fa-field">
                                <label className="sc-label">2FA Method</label>
                                <select
                                    name="twoFAMethod"
                                    className="sc-select"
                                    value={settings.twoFAMethod}
                                    onChange={handleChange}
                                >
                                    <option value="SMS">SMS</option>
                                    <option value="Email">Email</option>
                                    <option value="Authenticator App">Authenticator App</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Data Security</label>
                    <div className="sc-checkbox-grid">
                        <label className="sc-checkbox">
                            <input type="checkbox" name="autoLogout" checked={settings.autoLogout} onChange={handleChange} />
                            <span className="sc-checkbox-label">Auto-logout on inactivity</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="encryptData" checked={settings.encryptData} onChange={handleChange} />
                            <span className="sc-checkbox-label">Encrypt sensitive data</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationSection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.Mail /></div>
                <div>
                    <h3 className="sc-section-title">Notification Settings</h3>
                    <p className="sc-section-desc">Configure email and SMS notifications</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field span-2">
                    <label className="sc-label">Email Configuration</label>
                    <div className="sc-email-grid">
                        <div className="sc-email-field">
                            <label className="sc-label">SMTP Server</label>
                            <input
                                type="text"
                                name="smtpServer"
                                className="sc-input"
                                value={settings.smtpServer}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sc-email-field">
                            <label className="sc-label">SMTP Port</label>
                            <input
                                type="number"
                                name="smtpPort"
                                className="sc-input"
                                value={settings.smtpPort}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sc-email-field span-2">
                            <label className="sc-label">Username</label>
                            <input
                                type="text"
                                name="smtpUsername"
                                className="sc-input"
                                value={settings.smtpUsername}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sc-email-field span-2">
                            <label className="sc-label">Password</label>
                            <input
                                type="password"
                                name="smtpPassword"
                                className="sc-input"
                                value={settings.smtpPassword}
                                onChange={handleChange}
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="sc-email-field span-2">
                            <label className="sc-label">Sender Email</label>
                            <input
                                type="email"
                                name="senderEmail"
                                className="sc-input"
                                value={settings.senderEmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sc-email-field span-2">
                            <label className="sc-label">Sender Name</label>
                            <input
                                type="text"
                                name="senderName"
                                className="sc-input"
                                value={settings.senderName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">SMS Configuration</label>
                    <div className="sc-sms-grid">
                        <div className="sc-sms-field">
                            <label className="sc-label">SMS Provider</label>
                            <select
                                name="smsProvider"
                                className="sc-select"
                                value={settings.smsProvider}
                                onChange={handleChange}
                            >
                                <option value="Twilio">Twilio</option>
                                <option value="MessageBird">MessageBird</option>
                                <option value="Vonage">Vonage</option>
                                <option value="AWS SNS">AWS SNS</option>
                            </select>
                        </div>
                        <div className="sc-sms-field span-2">
                            <label className="sc-label">API Key</label>
                            <input
                                type="password"
                                name="smsApiKey"
                                className="sc-input"
                                value={settings.smsApiKey}
                                onChange={handleChange}
                                placeholder="Enter API key"
                            />
                        </div>
                        <div className="sc-sms-field">
                            <label className="sc-label">Sender ID</label>
                            <input
                                type="text"
                                name="smsSenderId"
                                className="sc-input"
                                value={settings.smsSenderId}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Notification Types</label>
                    <div className="sc-notification-grid">
                        {Object.entries(settings.notificationTypes).map(([key, value]) => (
                            <div key={key} className="sc-notification-item">
                                <span className="sc-notification-label">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </span>
                                <label className="sc-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={value.email}
                                        onChange={(e) => handleNestedChange('notificationTypes', key, { ...value, email: e.target.checked })}
                                    />
                                    <span className="sc-checkbox-label">Email</span>
                                </label>
                                <label className="sc-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={value.sms}
                                        onChange={(e) => handleNestedChange('notificationTypes', key, { ...value, sms: e.target.checked })}
                                    />
                                    <span className="sc-checkbox-label">SMS</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSystemSection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.Server /></div>
                <div>
                    <h3 className="sc-section-title">System Settings</h3>
                    <p className="sc-section-desc">Configure language, backup, and logging settings</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field">
                    <label className="sc-label">Default Language</label>
                    <select
                        name="defaultLanguage"
                        className="sc-select"
                        value={settings.defaultLanguage}
                        onChange={handleChange}
                    >
                        <option value="English">English</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="Tamil">Tamil</option>
                    </select>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Date Format</label>
                    <select
                        name="dateFormat"
                        className="sc-select"
                        value={settings.dateFormat}
                        onChange={handleChange}
                    >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Time Format</label>
                    <select
                        name="timeFormat"
                        className="sc-select"
                        value={settings.timeFormat}
                        onChange={handleChange}
                    >
                        <option value="12-hour (AM/PM)">12-hour (AM/PM)</option>
                        <option value="24-hour">24-hour</option>
                    </select>
                </div>

                <div className="sc-field">
                    <label className="sc-label">Time Zone</label>
                    <select
                        name="timeZone"
                        className="sc-select"
                        value={settings.timeZone}
                        onChange={handleChange}
                    >
                        <option value="Sydney (AEST)">Sydney (AEST)</option>
                        <option value="Sydney (AEDT)">Sydney (AEDT)</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Brisbane">Brisbane</option>
                        <option value="Perth">Perth</option>
                        <option value="Colombo">Colombo</option>
                    </select>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Data & Backup</label>
                    <div className="sc-backup-grid">
                        <div className="sc-backup-field">
                            <label className="sc-label">Auto-backup Frequency</label>
                            <select
                                name="backupFrequency"
                                className="sc-select"
                                value={settings.backupFrequency}
                                onChange={handleChange}
                            >
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div className="sc-backup-field">
                            <label className="sc-label">Backup Time</label>
                            <input
                                type="time"
                                name="backupTime"
                                className="sc-input"
                                value={settings.backupTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sc-backup-field">
                            <label className="sc-label">Backups to Keep</label>
                            <input
                                type="number"
                                name="backupsToKeep"
                                className="sc-input"
                                value={settings.backupsToKeep}
                                onChange={handleChange}
                                min="1"
                            />
                        </div>
                        <div className="sc-backup-field span-2">
                            <label className="sc-label">Backup Location</label>
                            <input
                                type="text"
                                name="backupLocation"
                                className="sc-input"
                                value={settings.backupLocation}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Logging & Audit</label>
                    <div className="sc-logging-grid">
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableAuditLogging" checked={settings.enableAuditLogging} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable audit logging</span>
                        </label>
                        <div className="sc-logging-field">
                            <label className="sc-label">Log retention period</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="logRetentionDays"
                                    className="sc-input"
                                    value={settings.logRetentionDays}
                                    onChange={handleChange}
                                    min="1"
                                />
                                <span className="sc-input-suffix">days</span>
                            </div>
                        </div>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableApiLogging" checked={settings.enableApiLogging} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable API logging</span>
                        </label>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableErrorLogging" checked={settings.enableErrorLogging} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable error logging</span>
                        </label>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Maintenance Mode</label>
                    <div className="sc-maintenance-grid">
                        <label className="sc-checkbox">
                            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable Maintenance Mode</span>
                        </label>
                        {settings.maintenanceMode && (
                            <div className="sc-maintenance-field">
                                <label className="sc-label">Maintenance Message</label>
                                <textarea
                                    name="maintenanceMessage"
                                    className="sc-textarea"
                                    rows="3"
                                    value={settings.maintenanceMessage}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderIntegrationSection = () => (
        <div className="sc-section">
            <div className="sc-section-header">
                <div className="sc-section-icon"><Icon.Plug /></div>
                <div>
                    <h3 className="sc-section-title">Integration Settings</h3>
                    <p className="sc-section-desc">Configure third-party integrations</p>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-field span-2">
                    <label className="sc-label">Google Analytics</label>
                    <div className="sc-analytics-grid">
                        <div className="sc-analytics-field">
                            <label className="sc-label">Tracking ID</label>
                            <input
                                type="text"
                                name="googleAnalyticsId"
                                className="sc-input"
                                value={settings.googleAnalyticsId}
                                onChange={handleChange}
                                placeholder="UA-XXXXX-X"
                            />
                        </div>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableAnalytics" checked={settings.enableAnalytics} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable Analytics</span>
                        </label>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Calendar Integration</label>
                    <div className="sc-calendar-grid">
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableGoogleCalendar" checked={settings.enableGoogleCalendar} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable Google Calendar</span>
                        </label>
                        {settings.enableGoogleCalendar && (
                            <div className="sc-calendar-field">
                                <label className="sc-label">Calendar ID</label>
                                <input
                                    type="text"
                                    name="calendarId"
                                    className="sc-input"
                                    value={settings.calendarId}
                                    onChange={handleChange}
                                    placeholder="clinic@calendar.com"
                                />
                            </div>
                        )}
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableOutlookSync" checked={settings.enableOutlookSync} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable Outlook Sync</span>
                        </label>
                        <div className="sc-calendar-field">
                            <label className="sc-label">Sync Frequency</label>
                            <div className="sc-input-wrap">
                                <input
                                    type="number"
                                    name="syncFrequency"
                                    className="sc-input"
                                    value={settings.syncFrequency}
                                    onChange={handleChange}
                                    min="5"
                                />
                                <span className="sc-input-suffix">minutes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">Payment Gateway</label>
                    <div className="sc-payment-grid">
                        <div className="sc-payment-field">
                            <label className="sc-label">Gateway Provider</label>
                            <select
                                name="paymentGateway"
                                className="sc-select"
                                value={settings.paymentGateway}
                                onChange={handleChange}
                            >
                                <option value="Stripe">Stripe</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Square">Square</option>
                            </select>
                        </div>
                        <div className="sc-payment-field span-2">
                            <label className="sc-label">Publishable Key</label>
                            <input
                                type="text"
                                name="publishableKey"
                                className="sc-input"
                                value={settings.publishableKey}
                                onChange={handleChange}
                                placeholder="pk_test_xxxxxxxxx"
                            />
                        </div>
                        <div className="sc-payment-field span-2">
                            <label className="sc-label">Secret Key</label>
                            <input
                                type="password"
                                name="secretKey"
                                className="sc-input"
                                value={settings.secretKey}
                                onChange={handleChange}
                                placeholder="sk_test_xxxxxxxxx"
                            />
                        </div>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableTestMode" checked={settings.enableTestMode} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable test mode</span>
                        </label>
                    </div>
                </div>

                <div className="sc-field span-2">
                    <label className="sc-label">HICAPS Integration</label>
                    <div className="sc-hicaps-grid">
                        <div className="sc-hicaps-field">
                            <label className="sc-label">HICAPS Terminal ID</label>
                            <input
                                type="text"
                                name="hicapsTerminalId"
                                className="sc-input"
                                value={settings.hicapsTerminalId}
                                onChange={handleChange}
                                placeholder="HIC-12345"
                            />
                        </div>
                        <label className="sc-checkbox">
                            <input type="checkbox" name="enableHicaps" checked={settings.enableHicaps} onChange={handleChange} />
                            <span className="sc-checkbox-label">Enable HICAPS</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSidebar = () => (
        <div className="sc-sidebar">
            <div className="sc-sidebar-title">Settings</div>
            {sections.map(section => {
                const IconComponent = getIcon(section.icon);
                return (
                    <button
                        key={section.id}
                        className={`sc-sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        <IconComponent />
                        <span>{section.label}</span>
                    </button>
                );
            })}
        </div>
    );

    // Last updated info
    const lastUpdated = new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="sc-page">
            <div className="sc-blob sc-blob-1" />
            <div className="sc-blob sc-blob-2" />

            <div className="sc-inner">
                {/* Header */}
                <div className="sc-header">
                    <button className="sc-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Dashboard
                    </button>
                    <div className="sc-header-content">
                        <div className="sc-header-left">
                            <div className="sc-header-icon"><Icon.Settings /></div>
                            <div>
                                <h1 className="sc-title">System Configuration</h1>
                                <p className="sc-subtitle">Configure system settings for Sunrise Dental Clinic</p>
                                <div className="sc-header-meta">
                                    <span className="sc-last-updated">Last Updated: {lastUpdated} by Admin</span>
                                </div>
                            </div>
                        </div>
                        <div className="sc-header-actions">
                            <button
                                className="sc-btn primary"
                                onClick={handleSave}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="sc-spinner" />
                                ) : (
                                    <>
                                        <Icon.Check /> Save All Settings
                                    </>
                                )}
                            </button>
                            <button
                                className="sc-btn secondary"
                                onClick={handleReset}
                                disabled={isSubmitting}
                            >
                                <Icon.RotateCcw /> Reset to Default
                            </button>
                        </div>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="sc-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Content */}
                <div className="sc-content">
                    {renderSidebar()}
                    <div className="sc-main">
                        <div className="glass-card sc-form-container">
                            {renderSection()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemConfig;