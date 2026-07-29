import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { dentistMenu, roleMeta } from './navConfigs';

const DentistNavbar = ({ children }) => {
  const [activePath, setActivePath] = useState('/dentist/dashboard');

  return (
    <DashboardLayout
      roleLabel="Dentist"
      menuSections={dentistMenu}
      meta={roleMeta.dentist}
      activePath={activePath}
      onNavigate={setActivePath}
      onSignOut={() => console.log('Dentist signed out')}
    >
      {children}
    </DashboardLayout>
  );
};

export default DentistNavbar;
