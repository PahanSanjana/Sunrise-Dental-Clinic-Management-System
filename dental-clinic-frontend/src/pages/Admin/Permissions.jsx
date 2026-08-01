import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Permissions.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    Settings: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    Save: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>),
    RotateCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Info: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>),
};

// ---------------------------------------------------------------
// Permission Definitions
// ---------------------------------------------------------------
const ROLES = ['Admin', 'Receptionist', 'Dentist', 'Patient'];

const PERMISSION_CATEGORIES = [
    {
        id: 'patients',
        label: 'Patients',
        icon: 'User',
        permissions: [
            { id: 'view_patients', label: 'View Patients' },
            { id: 'edit_patients', label: 'Edit Patients' },
            { id: 'delete_patients', label: 'Delete Patients' },
        ]
    },
    {
        id: 'appointments',
        label: 'Appointments',
        icon: 'Calendar',
        permissions: [
            { id: 'view_appointments', label: 'View Appointments' },
            { id: 'book_appointments', label: 'Book Appointments' },
            { id: 'cancel_appointments', label: 'Cancel Appointments' },
        ]
    },
    {
        id: 'billing',
        label: 'Billing',
        icon: 'DollarSign',
        permissions: [
            { id: 'view_bills', label: 'View Bills' },
            { id: 'generate_bills', label: 'Generate Bills' },
            { id: 'delete_bills', label: 'Delete Bills' },
        ]
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: 'FileText',
        permissions: [
            { id: 'view_reports', label: 'View Reports' },
            { id: 'export_reports', label: 'Export Reports' },
        ]
    },
    {
        id: 'staff',
        label: 'Staff Management',
        icon: 'Users',
        permissions: [
            { id: 'manage_staff', label: 'Manage Staff' },
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: 'Settings',
        permissions: [
            { id: 'manage_settings', label: 'Manage Settings' },
        ]
    },
];

// ---------------------------------------------------------------
// Default Permission Matrix
// ---------------------------------------------------------------
const defaultPermissions = {
    Admin: {
        view_patients: true,
        edit_patients: true,
        delete_patients: true,
        view_appointments: true,
        book_appointments: true,
        cancel_appointments: true,
        view_bills: true,
        generate_bills: true,
        delete_bills: true,
        view_reports: true,
        export_reports: true,
        manage_staff: true,
        manage_settings: true,
    },
    Receptionist: {
        view_patients: true,
        edit_patients: true,
        delete_patients: false,
        view_appointments: true,
        book_appointments: true,
        cancel_appointments: true,
        view_bills: true,
        generate_bills: true,
        delete_bills: false,
        view_reports: true,
        export_reports: false,
        manage_staff: false,
        manage_settings: false,
    },
    Dentist: {
        view_patients: true,
        edit_patients: true,
        delete_patients: false,
        view_appointments: true,
        book_appointments: true,
        cancel_appointments: false,
        view_bills: true,
        generate_bills: false,
        delete_bills: false,
        view_reports: true,
        export_reports: false,
        manage_staff: false,
        manage_settings: false,
    },
    Patient: {
        view_patients: false,
        edit_patients: false,
        delete_patients: false,
        view_appointments: true,
        book_appointments: true,
        cancel_appointments: true,
        view_bills: true,
        generate_bills: false,
        delete_bills: false,
        view_reports: false,
        export_reports: false,
        manage_staff: false,
        manage_settings: false,
    },
};

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const Permissions = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [permissions, setPermissions] = useState(defaultPermissions);
    const [originalPermissions, setOriginalPermissions] = useState(defaultPermissions);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Get permissions for selected role
    const rolePermissions = useMemo(() => {
        return permissions[selectedRole] || {};
    }, [selectedRole, permissions]);

    // Handle permission toggle
    const togglePermission = (permissionId) => {
        setPermissions((prev) => ({
            ...prev,
            [selectedRole]: {
                ...prev[selectedRole],
                [permissionId]: !prev[selectedRole][permissionId],
            },
        }));
    };

    // Handle role selection
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    // Check if permissions have changed
    const hasChanges = useMemo(() => {
        return JSON.stringify(permissions) !== JSON.stringify(originalPermissions);
    }, [permissions, originalPermissions]);

    // Handle save
    const handleSave = async () => {
        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setOriginalPermissions(permissions);
            setSuccessMessage('Permissions saved successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setErrors({ form: 'Failed to save permissions. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle reset
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all permissions to defaults?')) {
            setPermissions(defaultPermissions);
            setOriginalPermissions(defaultPermissions);
            setSuccessMessage('Permissions reset to defaults');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/admin/settings/clinic');
    };

    // Get icon component
    const getIcon = (iconName) => {
        return Icon[iconName] || Icon.Shield;
    };

    // Render permission matrix
    const renderPermissionMatrix = () => {
        return (
            <div className="pm-matrix">
                <div className="pm-matrix-header">
                    <div className="pm-matrix-cell pm-matrix-corner">Permissions</div>
                    {ROLES.map(role => (
                        <div key={role} className="pm-matrix-cell pm-matrix-role-header">
                            {role}
                        </div>
                    ))}
                </div>

                {PERMISSION_CATEGORIES.map(category => {
                    const IconComponent = getIcon(category.icon);
                    return (
                        <div key={category.id} className="pm-matrix-category">
                            <div className="pm-matrix-category-header">
                                <div className="pm-matrix-category-icon">
                                    <IconComponent />
                                </div>
                                <span className="pm-matrix-category-label">{category.label}</span>
                            </div>
                            {category.permissions.map(perm => (
                                <div key={perm.id} className="pm-matrix-row">
                                    <div className="pm-matrix-cell pm-matrix-perm-label">
                                        {perm.label}
                                    </div>
                                    {ROLES.map(role => {
                                        const isEnabled = permissions[role]?.[perm.id] || false;
                                        const isChecked = permissions[selectedRole]?.[perm.id] || false;
                                        return (
                                            <div key={`${role}-${perm.id}`} className="pm-matrix-cell pm-matrix-perm-cell">
                                                <label
                                                    className={`pm-checkbox ${role === selectedRole ? 'editable' : 'readonly'}`}
                                                    title={role === selectedRole ? 'Click to toggle' : 'Select this role to edit'}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isEnabled}
                                                        onChange={() => {
                                                            if (role === selectedRole) {
                                                                togglePermission(perm.id);
                                                            }
                                                        }}
                                                        disabled={role !== selectedRole}
                                                    />
                                                    <span className="pm-checkbox-slider">
                                                        <span className="pm-checkbox-indicator">
                                                            {isEnabled ? <Icon.Check /> : <Icon.X />}
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="pm-page">
            <div className="pm-blob pm-blob-1" />
            <div className="pm-blob pm-blob-2" />

            <div className="pm-inner">
                {/* Header */}
                <div className="pm-header">
                    <button className="pm-back-btn" onClick={handleCancel}>
                        <Icon.ArrowLeft /> Back to Settings
                    </button>
                    <div className="pm-title-area">
                        <h1 className="pm-title">User Permissions</h1>
                        <p className="pm-subtitle">Configure role-based permissions and access control</p>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="pm-banner success">
                        <Icon.Check />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Global Error */}
                {errors.form && (
                    <div className="pm-banner error">
                        <Icon.AlertCircle />
                        <span>{errors.form}</span>
                    </div>
                )}

                {/* Main Content */}
                <div className="glass-card pm-content">
                    {/* Role Selection */}
                    <div className="pm-role-selector">
                        <div className="pm-role-selector-header">
                            <span className="pm-role-selector-label">Select Role to Edit</span>
                            <span className="pm-role-selector-hint">
                                <Icon.Info /> Click a role below to edit its permissions
                            </span>
                        </div>
                        <div className="pm-role-buttons">
                            {ROLES.map(role => (
                                <button
                                    key={role}
                                    className={`pm-role-btn ${selectedRole === role ? 'active' : ''}`}
                                    onClick={() => handleRoleSelect(role)}
                                >
                                    <Icon.User />
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Permission Matrix */}
                    <div className="pm-matrix-container">
                        {renderPermissionMatrix()}
                    </div>

                    {/* Legend */}
                    <div className="pm-legend">
                        <div className="pm-legend-item">
                            <span className="pm-legend-dot enabled" />
                            <span>Enabled (Checked)</span>
                        </div>
                        <div className="pm-legend-item">
                            <span className="pm-legend-dot disabled" />
                            <span>Disabled (Unchecked)</span>
                        </div>
                        <div className="pm-legend-item">
                            <span className="pm-legend-dot editable" />
                            <span>Editable (Selected Role)</span>
                        </div>
                        <div className="pm-legend-item">
                            <span className="pm-legend-dot readonly" />
                            <span>Read Only (Other Roles)</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="pm-summary">
                        <div className="pm-summary-item">
                            <span className="pm-summary-label">Selected Role:</span>
                            <span className="pm-summary-value">{selectedRole}</span>
                        </div>
                        <div className="pm-summary-item">
                            <span className="pm-summary-label">Total Permissions:</span>
                            <span className="pm-summary-value">
                                {Object.values(permissions[selectedRole] || {}).filter(v => v).length} / {Object.keys(permissions[selectedRole] || {}).length} enabled
                            </span>
                        </div>
                        {hasChanges && (
                            <div className="pm-summary-item pm-summary-changes">
                                <span className="pm-summary-label">Status:</span>
                                <span className="pm-summary-value pm-changes-indicator">Unsaved Changes</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pm-actions">
                        <button
                            type="button"
                            className="pm-btn secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <div className="pm-actions-right">
                            <button
                                type="button"
                                className="pm-btn secondary"
                                onClick={handleReset}
                                disabled={isSubmitting}
                            >
                                <Icon.RotateCcw /> Reset to Defaults
                            </button>
                            <button
                                type="button"
                                className="pm-btn primary"
                                onClick={handleSave}
                                disabled={isSubmitting || !hasChanges}
                            >
                                {isSubmitting ? (
                                    <span className="pm-spinner" />
                                ) : (
                                    <>
                                        <Icon.Save /> Save Permissions
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Permissions;