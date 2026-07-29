import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * Radiant — dashboard shell
 * Wraps any page content with the role's sidebar + matching topbar.
 *
 * Usage:
 *   <DashboardLayout
 *     roleLabel="Administrator"
 *     menuSections={adminMenu}
 *     meta={roleMeta.admin}
 *     activePath={activePath}
 *     onNavigate={setActivePath}
 *   >
 *     <YourPageContent />
 *   </DashboardLayout>
 */
const DashboardLayout = ({
  roleLabel,
  clinicName = 'Radiant Dental',
  menuSections,
  meta,
  activePath,
  onNavigate,
  onSignOut = () => {},
  children,
}) => {
  const [, setSearch] = useState('');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        roleLabel={roleLabel}
        clinicName={clinicName}
        menuSections={menuSections}
        activePath={activePath}
        onNavigate={onNavigate}
        userName={meta.userName}
        userInitials={meta.userInitials}
        onSignOut={onSignOut}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          pageEyebrow={meta.pageEyebrow}
          pageTitle={meta.pageTitle}
          roleLabel={roleLabel}
          userName={meta.userName}
          userInitials={meta.userInitials}
          searchPlaceholder={meta.searchPlaceholder}
          notifications={meta.notifications}
          onSearch={setSearch}
          onViewProfile={() => onNavigate(`${activePath?.split('/')[1] ? '/' + activePath.split('/')[1] : ''}/profile`)}
          onOpenSettings={() => {}}
          onSignOut={onSignOut}
        />

        <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
