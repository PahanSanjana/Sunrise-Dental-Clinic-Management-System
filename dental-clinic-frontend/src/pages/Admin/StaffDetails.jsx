import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Css/StaffDetails.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>),
    Ban: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>),
    UserPlus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>),
    RefreshCcw: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>),
    Lock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
    Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Activity: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const STAFF_DATA = {
    id: 'STF-001',
    fullName: 'Dr. Anura Silva',
    username: 'dr.silva',
    email: 'anura.silva@clinic.com',
    role: 'Dentist',
    status: 'Active',
    lastLogin: '2026-07-31 09:30 AM',
    createdAt: '2024-01-15',
    updatedAt: '2026-07-28 03:20 PM',
    phone: '+94 71 234 5678',
    address: '45/A, Temple Road, Colombo 03, Sri Lanka',
    specialization: 'General Dentistry',
    bio: 'Dr. Anura Silva is a highly experienced general dentist with over 15 years of practice. Specializes in restorative and cosmetic dentistry.',
    permissions: {
        dashboard: true,
        patients: { view: true, create: false, edit: true, delete: false },
        appointments: { view: true, create: true, edit: true, delete: false },
        billing: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, export: false },
        staff: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
    },
    activityLog: [
        {
            id: 'ACT-001',
            action: 'Logged in',
            timestamp: '2026-07-31T09:30:00',
            ip: '192.168.1.100',
            device: 'Chrome on Windows'
        },
        {
            id: 'ACT-002',
            action: 'Viewed patient record #PT-1042',
            timestamp: '2026-07-31T10:15:00',
            ip: '192.168.1.100',
            device: 'Chrome on Windows'
        },
        {
            id: 'ACT-003',
            action: 'Updated appointment #APT-1034',
            timestamp: '2026-07-31T11:30:00',
            ip: '192.168.1.100',
            device: 'Chrome on Windows'
        },
        {
            id: 'ACT-004',
            action: 'Logged out',
            timestamp: '2026-07-31T05:00:00',
            ip: '192.168.1.100',
            device: 'Chrome on Windows'
        },
        {
            id: 'ACT-005',
            action: 'Logged in',
            timestamp: '2026-07-30T08:45:00',
            ip: '192.168.1.101',
            device: 'Firefox on MacOS'
        },
    ],
    upcomingAppointments: [
        { id: 'APT-1034', patient: 'Amara Perera', date: '2026-08-05', time: '09:00', treatment: 'Root Canal' },
        { id: 'APT-1035', patient: 'Nadun Fernando', date: '2026-08-05', time: '10:30', treatment: 'Cleaning' },
        { id: 'APT-1036', patient: 'Ishara Gunaratne', date: '2026-08-06', time: '09:00', treatment: 'Consultation' },
    ],
    stats: {
        totalPatients: 147,
        totalAppointments: 892,
        avgRating: 4.8,
        completionRate: 96,
    },
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

function formatTime(time) {
    if (!time) return 'N/A';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getRoleBadge(role) {
    const classes = {
        'Admin': 'badge-admin',
        'Dentist': 'badge-dentist',
        'Receptionist': 'badge-receptionist',
    };
    return classes[role] || 'badge-neutral';
}

function getStatusBadge(status) {
    const classes = {
        'Active': 'badge-success',
        'Inactive': 'badge-danger',
        'Pending': 'badge-warning',
        'Terminated': 'badge-neutral',
    };
    return classes[status] || 'badge-neutral';
}

function getStatusIcon(status) {
    switch (status) {
        case 'Active': return <Icon.Check />;
        case 'Inactive': return <Icon.X />;
        case 'Pending': return <Icon.AlertCircle />;
        default: return <Icon.X />;
    }
}

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const StaffDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showTerminateModal, setShowTerminateModal] = useState(false);
    const [terminateReason, setTerminateReason] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // In a real app, fetch staff data based on id
    const staff = STAFF_DATA;

    // Handlers
    const handleBack = () => navigate('/admin/staff');
    const handleEdit = () => navigate(`/admin/staff/${id}/edit`);

    const handleStatusChange = (newStatus) => {
        setSelectedStatus(newStatus);
        if (newStatus === 'Terminated') {
            setShowTerminateModal(true);
        } else {
            setShowStatusModal(true);
        }
    };

    const confirmStatusChange = () => {
        setIsUpdating(true);
        // Simulate API call
        setTimeout(() => {
            setIsUpdating(false);
            setShowStatusModal(false);
            alert(`Staff status updated to ${selectedStatus}`);
        }, 500);
    };

    const confirmTerminate = () => {
        if (!terminateReason.trim()) {
            alert('Please provide a reason for termination');
            return;
        }
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            setShowTerminateModal(false);
            setTerminateReason('');
            alert('Staff member terminated successfully');
        }, 500);
    };

    // Render permission tree
    const renderPermission = (category, label, perms) => {
        if (typeof perms === 'boolean') {
            return (
                <div className="sd-perm-item">
                    <span className="sd-perm-label">{label}</span>
                    <span className={`sd-perm-status ${perms ? 'enabled' : 'disabled'}`}>
                        {perms ? <Icon.Check /> : <Icon.X />}
                        {perms ? 'Enabled' : 'Disabled'}
                    </span>
                </div>
            );
        }
        return (
            <div className="sd-perm-group">
                <div className="sd-perm-group-title">{label}</div>
                {Object.entries(perms).map(([key, value]) => {
                    const labelMap = {
                        view: 'View',
                        create: 'Create',
                        edit: 'Edit',
                        delete: 'Delete',
                        export: 'Export',
                    };
                    return (
                        <div key={key} className="sd-perm-subitem">
                            <span>{labelMap[key] || key}</span>
                            <span className={`sd-perm-status ${value ? 'enabled' : 'disabled'}`}>
                                {value ? <Icon.Check /> : <Icon.X />}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="sd-page">
            <div className="sd-blob sd-blob-1" />
            <div className="sd-blob sd-blob-2" />

            <div className="sd-inner">
                {/* Header */}
                <div className="sd-header">
                    <button className="sd-back-btn" onClick={handleBack}>
                        <Icon.ArrowLeft /> Back to Staff
                    </button>
                    <div className="sd-title-area">
                        <div className="sd-title-row">
                            <div className="sd-title-with-avatar">
                                <div className="sd-avatar-large">
                                    {getInitials(staff.fullName)}
                                </div>
                                <div>
                                    <h1 className="sd-title">{staff.fullName}</h1>
                                    <div className="sd-id-row">
                                        <span className="sd-staff-id">{staff.id}</span>
                                        <span className={`sd-status-badge ${getStatusBadge(staff.status)}`}>
                                            {getStatusIcon(staff.status)} {staff.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="sd-actions">
                                <button className="sd-btn primary" onClick={handleEdit}>
                                    <Icon.Edit /> Edit Profile
                                </button>
                                {staff.status === 'Active' && (
                                    <button className="sd-btn danger" onClick={() => handleStatusChange('Inactive')}>
                                        <Icon.Ban /> Deactivate
                                    </button>
                                )}
                                {staff.status === 'Inactive' && (
                                    <button className="sd-btn primary" onClick={() => handleStatusChange('Active')}>
                                        <Icon.RefreshCcw /> Reactivate
                                    </button>
                                )}
                                {staff.status !== 'Terminated' && (
                                    <button className="sd-btn danger" onClick={() => handleStatusChange('Terminated')}>
                                        <Icon.Trash /> Terminate
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="sd-subtitle">
                            {staff.role} • Member since {formatDate(staff.createdAt)} • Last active {formatDateTime(staff.lastLogin)}
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="sd-stats-grid">
                    <div className="glass-card sd-stat-card">
                        <div className="sd-stat-icon tint-sky"><Icon.User /></div>
                        <div className="sd-stat-label">Patients</div>
                        <div className="sd-stat-value">{staff.stats.totalPatients}</div>
                    </div>
                    <div className="glass-card sd-stat-card">
                        <div className="sd-stat-icon tint-mist"><Icon.Calendar /></div>
                        <div className="sd-stat-label">Appointments</div>
                        <div className="sd-stat-value">{staff.stats.totalAppointments}</div>
                    </div>
                    <div className="glass-card sd-stat-card">
                        <div className="sd-stat-icon tint-amber"><Icon.Activity /></div>
                        <div className="sd-stat-label">Completion Rate</div>
                        <div className="sd-stat-value">{staff.stats.completionRate}%</div>
                    </div>
                    <div className="glass-card sd-stat-card">
                        <div className="sd-stat-icon tint-sage"><Icon.Shield /></div>
                        <div className="sd-stat-label">Avg Rating</div>
                        <div className="sd-stat-value">{staff.stats.avgRating} ⭐</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="sd-tabs">
                    <button
                        className={`sd-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <Icon.User /> Profile
                    </button>
                    <button
                        className={`sd-tab ${activeTab === 'permissions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('permissions')}
                    >
                        <Icon.Shield /> Permissions
                    </button>
                    <button
                        className={`sd-tab ${activeTab === 'activity' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activity')}
                    >
                        <Icon.Clock /> Activity Log
                    </button>
                    <button
                        className={`sd-tab ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        <Icon.Calendar /> Appointments
                    </button>
                </div>

                {/* Tab Content */}
                <div className="sd-tab-content">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="sd-profile-grid">
                            {/* Personal Information */}
                            <div className="glass-card sd-info-card">
                                <div className="sd-card-header">
                                    <div className="sd-card-icon"><Icon.User /></div>
                                    <div className="sd-card-title">Personal Information</div>
                                </div>
                                <div className="sd-info-grid">
                                    <div className="sd-info-item span-2">
                                        <span className="sd-info-label">Full Name</span>
                                        <span className="sd-info-value">{staff.fullName}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Username</span>
                                        <span className="sd-info-value">@{staff.username}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Email</span>
                                        <span className="sd-info-value">{staff.email}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Role</span>
                                        <span className={`sd-badge ${getRoleBadge(staff.role)}`}>{staff.role}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Status</span>
                                        <span className={`sd-badge ${getStatusBadge(staff.status)}`}>{staff.status}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Phone</span>
                                        <span className="sd-info-value">{staff.phone}</span>
                                    </div>
                                    <div className="sd-info-item span-2">
                                        <span className="sd-info-label">Address</span>
                                        <span className="sd-info-value">{staff.address}</span>
                                    </div>
                                    <div className="sd-info-item span-2">
                                        <span className="sd-info-label">Specialization</span>
                                        <span className="sd-info-value">{staff.specialization}</span>
                                    </div>
                                    <div className="sd-info-item span-2">
                                        <span className="sd-info-label">Bio</span>
                                        <span className="sd-info-value">{staff.bio}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="glass-card sd-info-card">
                                <div className="sd-card-header">
                                    <div className="sd-card-icon"><Icon.Shield /></div>
                                    <div className="sd-card-title">Account Details</div>
                                </div>
                                <div className="sd-info-grid">
                                    <div className="sd-info-item span-2">
                                        <span className="sd-info-label">Staff ID</span>
                                        <span className="sd-info-value">{staff.id}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Created At</span>
                                        <span className="sd-info-value">{formatDateTime(staff.createdAt)}</span>
                                    </div>
                                    <div className="sd-info-item">
                                        <span className="sd-info-label">Last Updated</span>
                                        <span className="sd-info-value">{formatDateTime(staff.updatedAt)}</span>
                                    </div>
                                    <div className="sd-info-item span-2">
                                        <span className="sd-info-label">Last Login</span>
                                        <span className="sd-info-value">{staff.lastLogin}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Permissions Tab */}
                    {activeTab === 'permissions' && (
                        <div className="glass-card sd-info-card">
                            <div className="sd-card-header">
                                <div className="sd-card-icon"><Icon.Shield /></div>
                                <div className="sd-card-title">Role & Permissions</div>
                            </div>
                            <div className="sd-permissions-container">
                                <div className="sd-perm-header">
                                    <span className="sd-perm-role">Role: {staff.role}</span>
                                    <span className={`sd-perm-role-badge ${getRoleBadge(staff.role)}`}>{staff.role}</span>
                                </div>
                                <div className="sd-perm-grid">
                                    {Object.entries(staff.permissions).map(([category, perms]) => {
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
                                            <div key={category} className="sd-perm-category">
                                                {renderPermission(category, labelMap[category] || category, perms)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Activity Log Tab */}
                    {activeTab === 'activity' && (
                        <div className="glass-card sd-info-card">
                            <div className="sd-card-header">
                                <div className="sd-card-icon"><Icon.Clock /></div>
                                <div className="sd-card-title">Activity Log</div>
                            </div>
                            <div className="sd-activity-list">
                                {staff.activityLog.map((activity, index) => (
                                    <div key={activity.id} className="sd-activity-item">
                                        <div className="sd-activity-dot" />
                                        {index < staff.activityLog.length - 1 && <div className="sd-activity-line" />}
                                        <div className="sd-activity-content">
                                            <div className="sd-activity-action">{activity.action}</div>
                                            <div className="sd-activity-meta">
                                                <span className="sd-activity-time">{formatDateTime(activity.timestamp)}</span>
                                                <span className="sd-activity-device">{activity.device}</span>
                                                <span className="sd-activity-ip">IP: {activity.ip}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="glass-card sd-info-card">
                            <div className="sd-card-header">
                                <div className="sd-card-icon"><Icon.Calendar /></div>
                                <div className="sd-card-title">Upcoming Appointments</div>
                            </div>
                            {staff.upcomingAppointments.length === 0 ? (
                                <div className="sd-empty-state">
                                    <p>No upcoming appointments</p>
                                </div>
                            ) : (
                                <div className="sd-appointment-list">
                                    {staff.upcomingAppointments.map(app => (
                                        <div key={app.id} className="sd-appointment-item">
                                            <div className="sd-appointment-date">
                                                <div className="sd-appointment-day">{formatDate(app.date)}</div>
                                                <div className="sd-appointment-time">{formatTime(app.time)}</div>
                                            </div>
                                            <div className="sd-appointment-info">
                                                <div className="sd-appointment-patient">{app.patient}</div>
                                                <div className="sd-appointment-treatment">{app.treatment}</div>
                                            </div>
                                            <button className="sd-btn small secondary">View</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Status Flow */}
                <div className="glass-card sd-status-flow">
                    <div className="sd-status-flow-title">Staff Status Flow</div>
                    <div className="sd-status-steps">
                        <div className={`sd-status-step ${staff.status === 'Active' ? 'active' : staff.status === 'Inactive' || staff.status === 'Terminated' ? 'completed' : ''}`}>
                            <div className="sd-step-circle">1</div>
                            <div className="sd-step-label">Active</div>
                            <div className="sd-step-date">Working</div>
                        </div>
                        <div className="sd-step-line" />
                        <div className={`sd-status-step ${staff.status === 'Inactive' ? 'active' : staff.status === 'Terminated' ? 'completed' : ''}`}>
                            <div className="sd-step-circle">2</div>
                            <div className="sd-step-label">Inactive</div>
                            <div className="sd-step-date">Temporarily off</div>
                        </div>
                        <div className="sd-step-line" />
                        <div className={`sd-status-step ${staff.status === 'Terminated' ? 'active' : ''}`}>
                            <div className="sd-step-circle">3</div>
                            <div className="sd-step-label">Terminated</div>
                            <div className="sd-step-date">Permanently removed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Change Modal */}
            {showStatusModal && (
                <div className="sd-modal-overlay" onClick={() => setShowStatusModal(false)}>
                    <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="sd-modal-header">
                            <h3>Update Staff Status</h3>
                            <button className="sd-modal-close" onClick={() => setShowStatusModal(false)}>✕</button>
                        </div>
                        <div className="sd-modal-body">
                            <p>Are you sure you want to mark <strong>{staff.fullName}</strong> as <strong>{selectedStatus}</strong>?</p>
                            <div className="sd-modal-status-preview">
                                <span className={`sd-modal-status-badge ${getStatusBadge(selectedStatus)}`}>
                                    {selectedStatus}
                                </span>
                            </div>
                        </div>
                        <div className="sd-modal-footer">
                            <button className="sd-btn secondary" onClick={() => setShowStatusModal(false)}>
                                Cancel
                            </button>
                            <button className="sd-btn primary" onClick={confirmStatusChange} disabled={isUpdating}>
                                {isUpdating ? 'Updating...' : 'Confirm Status Change'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Terminate Modal */}
            {showTerminateModal && (
                <div className="sd-modal-overlay" onClick={() => setShowTerminateModal(false)}>
                    <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="sd-modal-header">
                            <h3>Terminate Staff Member</h3>
                            <button className="sd-modal-close" onClick={() => setShowTerminateModal(false)}>✕</button>
                        </div>
                        <div className="sd-modal-body">
                            <p>You are about to permanently terminate <strong>{staff.fullName}</strong>.</p>
                            <div className="sd-modal-field">
                                <label className="sd-label">Reason for Termination</label>
                                <textarea
                                    className="sd-textarea"
                                    rows="3"
                                    placeholder="Please provide a reason for termination..."
                                    value={terminateReason}
                                    onChange={(e) => setTerminateReason(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="sd-modal-footer">
                            <button className="sd-btn secondary" onClick={() => setShowTerminateModal(false)}>
                                Cancel
                            </button>
                            <button className="sd-btn danger" onClick={confirmTerminate} disabled={isUpdating}>
                                {isUpdating ? 'Processing...' : 'Yes, Terminate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDetails;