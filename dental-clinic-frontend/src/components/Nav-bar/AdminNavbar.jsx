import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { adminMenu, roleMeta } from './navConfigs';

/**
 * Admin Dashboard shell — sidebar + topbar.
 * Wraps page components with Admin navigation and handles routing.
 */
const AdminNavbar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <DashboardLayout
      roleLabel="Administrator"
      menuSections={adminMenu}
      meta={roleMeta.admin}
      activePath={location.pathname || '/admin/dashboard'}
      onNavigate={handleNavigate}
      onSignOut={handleSignOut}
    >
      {children}
    </DashboardLayout>
  );
};

export default AdminNavbar;
