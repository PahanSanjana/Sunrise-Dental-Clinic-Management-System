import React, { useState } from 'react';
import { ChevronDown, LogOut, Sparkles } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({
  roleLabel = 'Administrator',
  clinicName = 'Radiant Dental',
  menuSections = [],
  activePath = '/admin/dashboard',
  onNavigate = () => {},
  userName = 'Dr. Amara Silva',
  userInitials = 'AS',
  onSignOut = () => {},
}) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="sidebar sidebar-scope">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Sparkles className="brand-icon" />
        </div>
        <div className="brand-info">
          <span className="clinic-name">{clinicName}</span>
          <span className="role-tag">{roleLabel}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {menuSections.map((item) => {
          const IconCmp = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isItemActive = activePath === item.path;
          const isChildActive = hasChildren && item.children.some((c) => c.path === activePath);
          const isOpen = openSections[item.id] || isChildActive;

          if (hasChildren) {
            return (
              <div key={item.id} className={`nav-group ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className={`nav-item parent ${isChildActive ? 'child-active' : ''}`}
                  onClick={() => toggleSection(item.id)}
                >
                  <div className="nav-item-left">
                    {IconCmp && <IconCmp className="nav-icon" />}
                    <span className="nav-label">{item.label}</span>
                  </div>
                  <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
                </button>
                {isOpen && (
                  <div className="submenu">
                    {item.children.map((child) => (
                      <button
                        type="button"
                        key={child.id}
                        className={`submenu-item ${activePath === child.path ? 'active' : ''}`}
                        onClick={() => onNavigate(child.path)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              type="button"
              key={item.id}
              className={`nav-item ${isItemActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              <div className="nav-item-left">
                {IconCmp && <IconCmp className="nav-icon" />}
                <span className="nav-label">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Sign Out */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">{userInitials}</div>
          <div className="user-details">
            <span className="user-name">{userName}</span>
            <span className="user-role">{roleLabel}</span>
          </div>
        </div>
        <button
          type="button"
          className="signout-btn"
          onClick={onSignOut}
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
