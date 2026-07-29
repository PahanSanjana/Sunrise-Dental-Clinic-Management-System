import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { patientMenu, roleMeta } from './navConfigs';

const PatientNavbar = ({ children }) => {
  const [activePath, setActivePath] = useState('/patient/dashboard');

  return (
    <DashboardLayout
      roleLabel="Patient"
      menuSections={patientMenu}
      meta={roleMeta.patient}
      activePath={activePath}
      onNavigate={setActivePath}
      onSignOut={() => console.log('Patient signed out')}
    >
      {children}
    </DashboardLayout>
  );
};

export default PatientNavbar;
