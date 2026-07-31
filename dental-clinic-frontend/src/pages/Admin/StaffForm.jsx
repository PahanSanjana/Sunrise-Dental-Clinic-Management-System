import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/StaffForm.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    UserPlus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Lock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
    Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    EyeOff: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>),
    Shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
};

// ---------------------------------------------------------------
// Role Permissions Configuration
// ---------------------------------------------------------------
const ROLE_PERMISSIONS = {
    Admin: {
        label: 'Administrator',
        description: 'Full system access with all permissions',
        permissions: {
            dashboard: true,
            patients: { view: true, create: true, edit: true, delete: true },
            appointments: { view: true, create: true, edit: true, delete: true },
            billing: { view: true, create: true, edit: true, delete: true },
            reports: { view: true, create: true, export: true },
            staff: { view: true, create: true, edit: true, delete: true },
            settings: { view: true, edit: true },
        }
    },
    Dentist: {
        label: 'Dentist',
        description: 'View patient records, manage appointments, access treatment history',
        permissions: {
            dashboard: true,
            patients: { view: true, create: false, edit: true, delete: false },
            appointments: { view: true, create: true, edit: true, delete: false },
            billing: { view: true, create: false, edit: false, delete: false },
            reports: { view: true, create: false, export: false },
            staff: { view: false, create: false, edit: false, delete: false },
            settings: { view: false, edit: false },
        }
    },
    Receptionist: {
        label: 'Receptionist',
        description: 'Manage patients, appointments, and billing operations',
        permissions: {
            dashboard: true,
            patients: { view: true, create: true, edit: true, delete: false },
            appointments: { view: true, create: true, edit: true, delete: false },
            billing: { view: true, create: true, edit: true, delete: false },
            reports: { view: true, create: false, export: false },
            staff: { view: false, create: false, edit: false, delete: false },
            settings: { view: false, edit: false },
        }
    }
};

// ---------------------------------------------------------------
// Initial Form Data
// ---------------------------------------------------------------
const initialFormData = {
    fullName: '',
    username: '',
    email: '',
    role: 'Receptionist',
    password: '',
    confirmPassword: '',
    status: 'Active',
};

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const StaffForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [customPermissions, setCustomPermissions] = useState(null);

    // Get permissions for selected role
    const rolePermissions = useMemo(() => {
        return ROLE_PERMISSIONS[formData.role] || ROLE_PERMISSIONS.Receptionist;
    }, [formData.role]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear specific field error on change
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Handle permission toggle (for custom overrides)
    const handlePermissionChange = (category, permission, value) => {
        setCustomPermissions((prev) => ({
            ...prev,
            [category]: {
                ...prev?.[category],
                [permission]: value,
            },
        }));
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        // Full Name
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        // Username
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, dots, underscores, and hyphens';
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        // Password (only for new staff)
        if (!isEditing) {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        // Role
        if (!formData.role) {
            newErrors.role = 'Please select a role';
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

            const staffData = {
                ...formData,
                permissions: customPermissions || rolePermissions.permissions,
            };

            console.log(isEditing ? 'Staff updated:' : 'Staff created:', staffData);

            setSuccessMessage(
                isEditing
                    ? 'Staff member updated successfully!'
                    : 'Staff member created successfully!'
            );

            setTimeout(() => {
                navigate('/admin/staff');
            }, 1500);
        } catch (err) {
            setErrors({ form: 'Failed to save staff member. Please try again.' });
            setIsSubmitting(false);
        }
    };

    // Handle clear form
    const handleClear = () => {
        setFormData(initialFormData);
        setErrors({});
        setSuccessMessage('');
        setCustomPermissions(null);
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/staff');
    };

    // Helper to check if a permission is enabled
    const hasPermission = (category, permission) => {
        const perms = customPermissions || rolePermissions.permissions;
        if (typeof perms[category] === 'boolean') {
            return perms[category];
        }
        return perms[category]?.[permission] || false;
    };

    // Render permission checkboxes
    const renderPermissionSection = (category, label, permissions) => {
        if (typeof permissions === 'boolean') {
            return (
                <div className="sf-permission-item">
                    <span className="sf-permission-label">{label}</span>
                    <span className={`sf-permission-status ${permissions ? 'enabled' : 'disabled'}`}>
                        {permissions ? <Icon.Check /> : <Icon.X />}
                        {permissions ? 'Enabled' : 'Disabled'}
                    </span>
                </div>
            );
        }

        return (
            <div className="sf-permission-group">
                <div className="sf-permission-group-title">{label}</div>
                <div className="sf-permission-grid">
                    {Object.entries(permissions).map(([key, value]) => {
                        const isEnabled = customPermissions
                            ? customPermissions[category]?.[key] !== undefined
                                ? customPermissions[category][key]
                                : value
                            : value;
                        const labelMap = {
                            view: 'View',
                            create: 'Create',
                            edit: 'Edit',
                            delete: 'Delete',
                            export: 'Export',
                        };
                        return (
                            <label key={key} className="sf-permission-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isEnabled}
                                    onChange={(e) => handlePermissionChange(category, key, e.target.checked)}
                                />
                                <span className="sf-checkbox-label">{labelMap[key] || key}</span>
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="sf-page">
            <div className="sf-blob sf-blob-1" />
            <div className="sf-blob sf-blob-2" />

            <div className="sf-inner">
                {/* Header */}
                <div className="sf-header">
                    <button className="sf-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Staff
                    </button>
                    <div className="sf-title-area">
                        <h1 className="sf-title">{isEditing ? 'Edit Staff' : 'Add New Staff'}</h1>
                        <p className="sf-subtitle">
                            {isEditing
                                ? 'Update staff account details and permissions'
                                : 'Create a new staff account with role-based permissions'}
                        </p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="sf-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Global Error */}
                {errors.form && (
                    <div className="sf-banner error">
                        <Icon.AlertCircle />
                        <span>{errors.form}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card sf-form">
                    {/* Section 1: Personal Details */}
                    <div className="sf-section">
                        <div className="sf-section-header">
                            <div className="sf-section-icon"><Icon.User /></div>
                            <div>
                                <h3 className="sf-section-title">Personal Details</h3>
                                <p className="sf-section-desc">Basic information about the staff member</p>
                            </div>
                        </div>

                        <div className="sf-grid">
                            {/* Full Name */}
                            <div className="sf-field span-2">
                                <label className="sf-label">
                                    Full Name <span className="req">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="e.g. Dr. Anura Silva"
                                    className={`sf-input ${errors.fullName ? 'has-error' : ''}`}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && <span className="sf-error-text">{errors.fullName}</span>}
                            </div>

                            {/* Username */}
                            <div className="sf-field">
                                <label className="sf-label">
                                    Username <span className="req">*</span>
                                </label>
                                <div className="sf-input-wrap">
                                    <span className="sf-input-prefix">@</span>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        className={`sf-input with-prefix ${errors.username ? 'has-error' : ''}`}
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.username && <span className="sf-error-text">{errors.username}</span>}
                            </div>

                            {/* Email */}
                            <div className="sf-field">
                                <label className="sf-label">
                                    Email Address <span className="req">*</span>
                                </label>
                                <div className="sf-input-wrap">
                                    <Icon.Mail className="sf-field-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="staff@clinic.com"
                                        className={`sf-input with-icon ${errors.email ? 'has-error' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <span className="sf-error-text">{errors.email}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Role Selection */}
                    <div className="sf-section">
                        <div className="sf-section-header">
                            <div className="sf-section-icon"><Icon.Shield /></div>
                            <div>
                                <h3 className="sf-section-title">Role & Permissions</h3>
                                <p className="sf-section-desc">Select a role to assign predefined permissions</p>
                            </div>
                        </div>

                        <div className="sf-role-grid">
                            {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                                <div
                                    key={roleKey}
                                    className={`sf-role-card ${formData.role === roleKey ? 'selected' : ''}`}
                                    onClick={() => {
                                        setFormData((prev) => ({ ...prev, role: roleKey }));
                                        setCustomPermissions(null);
                                    }}
                                >
                                    <div className="sf-role-header">
                                        <span className="sf-role-name">{roleData.label}</span>
                                        {formData.role === roleKey && (
                                            <span className="sf-role-check"><Icon.Check /></span>
                                        )}
                                    </div>
                                    <div className="sf-role-description">{roleData.description}</div>
                                </div>
                            ))}
                        </div>
                        {errors.role && <div className="sf-error-text">{errors.role}</div>}
                    </div>

                    {/* Section 3: Permissions Preview */}
                    <div className="sf-section">
                        <div className="sf-section-header">
                            <div className="sf-section-icon"><Icon.Shield /></div>
                            <div>
                                <h3 className="sf-section-title">Permissions</h3>
                                <p className="sf-section-desc">
                                    {customPermissions
                                        ? 'Custom permissions (overriding role defaults)'
                                        : `Default permissions for ${rolePermissions.label}`}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="sf-btn small secondary"
                                onClick={() => setCustomPermissions(null)}
                                disabled={!customPermissions}
                            >
                                <Icon.RotateCcw /> Reset to Default
                            </button>
                        </div>

                        <div className="sf-permissions-container">
                            {Object.entries(rolePermissions.permissions).map(([category, perms]) => {
                                const labelMap = {
                                    dashboard: 'Dashboard Access',
                                    patients: 'Patient Management',
                                    appointments: 'Appointment Management',
                                    billing: 'Billing Management',
                                    reports: 'Reports',
                                    staff: 'Staff Management',
                                    settings: 'System Settings',
                                };
                                return (
                                    <div key={category} className="sf-permission-category">
                                        {renderPermissionSection(category, labelMap[category] || category, perms)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 4: Account Details */}
                    <div className="sf-section">
                        <div className="sf-section-header">
                            <div className="sf-section-icon"><Icon.Lock /></div>
                            <div>
                                <h3 className="sf-section-title">Account Details</h3>
                                <p className="sf-section-desc">
                                    {isEditing
                                        ? 'Update account status or change password'
                                        : 'Set up account credentials'}
                                </p>
                            </div>
                        </div>

                        <div className="sf-grid">
                            {/* Password */}
                            <div className="sf-field">
                                <label className="sf-label">
                                    Password {!isEditing && <span className="req">*</span>}
                                </label>
                                <div className="sf-input-wrap">
                                    <Icon.Lock className="sf-field-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder={isEditing ? 'Leave blank to keep current' : 'Min 8 characters'}
                                        className={`sf-input with-icon with-action ${errors.password ? 'has-error' : ''}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="sf-pass-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                                    </button>
                                </div>
                                {errors.password && <span className="sf-error-text">{errors.password}</span>}
                                {!isEditing && (
                                    <div className="sf-password-hint">
                                        Password must be at least 8 characters with uppercase, lowercase, and numbers
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="sf-field">
                                <label className="sf-label">
                                    Confirm Password {!isEditing && <span className="req">*</span>}
                                </label>
                                <div className="sf-input-wrap">
                                    <Icon.Lock className="sf-field-icon" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Re-enter password"
                                        className={`sf-input with-icon with-action ${errors.confirmPassword ? 'has-error' : ''}`}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="sf-pass-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="sf-error-text">{errors.confirmPassword}</span>}
                            </div>

                            {/* Status */}
                            <div className="sf-field">
                                <label className="sf-label">Status</label>
                                <select
                                    name="status"
                                    className="sf-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="sf-actions">
                        <button
                            type="button"
                            className="sf-btn secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <div className="sf-actions-right">
                            <button
                                type="button"
                                className="sf-btn secondary"
                                onClick={handleClear}
                                disabled={isSubmitting}
                            >
                                <Icon.RotateCcw /> Clear Form
                            </button>
                            <button
                                type="submit"
                                className="sf-btn primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="sf-spinner" />
                                ) : (
                                    <>
                                        <Icon.Check /> {isEditing ? 'Update Staff' : 'Save Staff'}
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

export default StaffForm;