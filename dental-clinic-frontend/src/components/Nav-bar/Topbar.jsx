import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import './Topbar.css';

/**
 * Radiant — shared glass topbar
 *
 * Props
 * ------
 * pageEyebrow      : string  e.g. "Admin Dashboard"
 * pageTitle        : string  e.g. "Good morning, Amara"
 * roleLabel        : string  e.g. "Administrator"
 * userName         : string
 * userInitials     : string
 * searchPlaceholder: string
 * notifications    : [{ id, text, time }]
 * onSearch         : (value) => void
 * onViewProfile    : () => void
 * onOpenSettings   : () => void
 * onSignOut        : () => void
 */
const Topbar = ({
  pageEyebrow = 'Dashboard',
  pageTitle = 'Welcome back',
  roleLabel = 'User',
  userName = 'Guest',
  userInitials = 'G',
  searchPlaceholder = 'Search patients, appointments…',
  notifications = [],
  onSearch = () => {},
  onViewProfile = () => {},
  onOpenSettings = () => {},
  onSignOut = () => {},
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar topbar-scope">
      <div className="topbar-context">
        <span className="topbar-eyebrow">{pageEyebrow}</span>
        <span className="topbar-title">{pageTitle}</span>
      </div>

      <div className="topbar-search">
        <Search />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        {/* Notifications */}
        <div className="topbar-popover-wrap" ref={notifRef}>
          <button
            className="topbar-iconbtn"
            aria-label="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
          >
            <Bell />
            {notifications.length > 0 && (
              <span className="topbar-badge">{notifications.length}</span>
            )}
          </button>

          {notifOpen && (
            <div className="topbar-popover wide">
              <div className="popover-heading">Notifications</div>
              {notifications.length === 0 && (
                <div className="notif-item">
                  <span className="notif-text">You're all caught up.</span>
                </div>
              )}
              {notifications.map((n) => (
                <div className="notif-item" key={n.id}>
                  <span className="notif-dot" />
                  <div>
                    <div className="notif-text">{n.text}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="topbar-divider" />

        {/* Profile */}
        <div className="topbar-popover-wrap" ref={profileRef}>
          <button
            className={`topbar-profile ${profileOpen ? 'open' : ''}`}
            onClick={() => setProfileOpen((v) => !v)}
          >
            <div className="topbar-avatar">{userInitials}</div>
            <div className="topbar-profile-info">
              <div className="topbar-profile-name">{userName}</div>
              <div className="topbar-profile-role">{roleLabel}</div>
            </div>
            <ChevronDown className="chevron" />
          </button>

          {profileOpen && (
            <div className="topbar-popover">
              <button className="popover-item" onClick={onViewProfile}>
                <User /> View profile
              </button>
              <button className="popover-item" onClick={onOpenSettings}>
                <Settings /> Account settings
              </button>
              <div className="popover-divider" />
              <button className="popover-item danger" onClick={onSignOut}>
                <LogOut /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
