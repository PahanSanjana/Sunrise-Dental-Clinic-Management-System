import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

// Import Auth Context (to be created later)
// import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock user data - Replace with actual auth context later
  const user = {
    fullName: 'Sarah Johnson',
    role: 'RECEPTIONIST', // ADMIN, RECEPTIONIST, DENTIST, PATIENT
    email: 'sarah@clinic.com',
    avatar: '👩‍⚕️'
  };

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    ];

    const roleItems = {
      ADMIN: [
        ...baseItems,
        { path: '/patients', label: 'Patients', icon: '👤' },
        { path: '/appointments', label: 'Appointments', icon: '📅' },
        { path: '/schedule', label: 'Schedule', icon: '📋' },
        { path: '/billing', label: 'Billing', icon: '💰' },
        { path: '/reports', label: 'Reports', icon: '📈' },
        { path: '/staff', label: 'Staff', icon: '👥' },
        { path: '/dentists', label: 'Dentists', icon: '🦷' },
        { path: '/treatments', label: 'Treatments', icon: '💊' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
      ],
      RECEPTIONIST: [
        ...baseItems,
        { path: '/patients', label: 'Patients', icon: '👤' },
        { path: '/appointments', label: 'Appointments', icon: '📅' },
        { path: '/schedule', label: 'Schedule', icon: '📋' },
        { path: '/billing', label: 'Billing', icon: '💰' },
        { path: '/reports', label: 'Reports', icon: '📈' },
        { path: '/dentists', label: 'Dentists', icon: '🦷' },
        { path: '/treatments', label: 'Treatments', icon: '💊' },
      ],
      DENTIST: [
        ...baseItems,
        { path: '/schedule', label: 'My Schedule', icon: '📋' },
        { path: '/patients', label: 'Patients', icon: '👤' },
        { path: '/appointments', label: 'Appointments', icon: '📅' },
        { path: '/reports', label: 'Reports', icon: '📈' },
      ],
      PATIENT: [
        { path: '/portal', label: 'Dashboard', icon: '🏠' },
        { path: '/portal/appointments', label: 'My Appointments', icon: '📅' },
        { path: '/portal/bills', label: 'My Bills', icon: '💰' },
        { path: '/profile', label: 'Profile', icon: '👤' },
      ],
    };

    return roleItems[user.role] || baseItems;
  };

  const navItems = getNavItems();

  // Handle logout
  const handleLogout = () => {
    // Clear token and user data
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    navigate('/login');
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    const colors = {
      ADMIN: 'role-badge-admin',
      RECEPTIONIST: 'role-badge-receptionist',
      DENTIST: 'role-badge-dentist',
      PATIENT: 'role-badge-patient',
    };
    return colors[role] || 'role-badge-default';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to="/dashboard" className="brand-link">
            <span className="brand-icon">🦷</span>
            <span className="brand-text">Sunrise Dental</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop-nav">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile / Actions */}
        <div className="nav-actions">
          {/* Notification Bell */}
          <button className="nav-icon-btn notification-btn" title="Notifications">
            <span className="icon-bell">🔔</span>
            <span className="notification-dot"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="profile-dropdown">
            <button
              className="profile-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="profile-avatar">
                {user.avatar}
              </span>
              <span className="profile-name">{user.fullName}</span>
              <span className="profile-chevron">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">{user.avatar}</div>
                  <div className="dropdown-user-info">
                    <div className="dropdown-name">{user.fullName}</div>
                    <div className={`dropdown-role ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </div>
                    <div className="dropdown-email">{user.email}</div>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <Link to="/profile" className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  My Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <span className="dropdown-icon">⚙️</span>
                  Settings
                </Link>
                <Link to="/help" className="dropdown-item">
                  <span className="dropdown-icon">❓</span>
                  Help & Support
                </Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-menu">
            {navItems.map((item) => (
              <li key={item.path} className="mobile-nav-item">
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <button className="mobile-logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;