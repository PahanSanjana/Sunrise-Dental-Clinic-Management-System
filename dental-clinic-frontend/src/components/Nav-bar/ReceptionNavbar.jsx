import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { receptionMenu, roleMeta } from './navConfigs';

const ReceptionNavbar = ({ children }) => {
  const [activePath, setActivePath] = useState('/reception/dashboard');

  return (
    <DashboardLayout
      roleLabel="Receptionist"
      menuSections={receptionMenu}
      meta={roleMeta.reception}
      activePath={activePath}
      onNavigate={setActivePath}
      onSignOut={() => console.log('Receptionist signed out')}
    >
      {children}
    </DashboardLayout>
  );
};

export default ReceptionNavbar;
