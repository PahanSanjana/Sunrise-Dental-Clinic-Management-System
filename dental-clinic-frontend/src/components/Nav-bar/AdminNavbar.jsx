import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { adminMenu, roleMeta } from './navConfigs';

/**
 * Admin Dashboard shell — sidebar + topbar.
 * Drop your page components inside as `children`, and wire
 * `activePath` / `onNavigate` to your router.
 */
const AdminNavbar = ({ children }) => {
  const [activePath, setActivePath] = useState('/admin/dashboard');

  return (
    <DashboardLayout
      roleLabel="Administrator"
      menuSections={adminMenu}
      meta={roleMeta.admin}
      activePath={activePath}
      onNavigate={setActivePath}
      onSignOut={() => console.log('Admin signed out')}
    >
      {children}
    </DashboardLayout>
  );
};

export default AdminNavbar;
