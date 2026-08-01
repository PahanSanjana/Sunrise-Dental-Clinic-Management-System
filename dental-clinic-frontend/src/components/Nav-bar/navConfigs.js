import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Receipt,
  BarChart3,
  UserCog,
  Stethoscope,
  Pill,
  Settings,
  ShieldCheck,
  ClipboardList,
  CalendarCheck,
  FileText,
  TrendingUp,
  UserCircle,
  Home,
  FolderHeart,
  HelpCircle,
} from 'lucide-react';

/* ---------------------------------------------------------- */
/* Shared role metadata — feeds both Sidebar and Topbar        */
/* ---------------------------------------------------------- */
export const roleMeta = {
  admin: {
    roleLabel: 'Administrator',
    userName: 'Dr. Amara Silva',
    userInitials: 'AS',
    pageEyebrow: 'Admin Dashboard',
    pageTitle: 'Good morning, Amara',
    searchPlaceholder: 'Search patients, staff, bills…',
    notifications: [
      { id: 1, text: 'Dr. Rathnayake requested next week off.', time: '10 min ago' },
      { id: 2, text: '3 invoices are overdue by 7+ days.', time: '1 hr ago' },
      { id: 3, text: 'New staff account pending approval.', time: 'Yesterday' },
    ],
  },
  reception: {
    roleLabel: 'Receptionist',
    userName: 'Nadia Perera',
    userInitials: 'NP',
    pageEyebrow: 'Receptionist Dashboard',
    pageTitle: 'Front desk, Nadia',
    searchPlaceholder: 'Search patients or appointments…',
    notifications: [
      { id: 1, text: 'Mr. Fernando confirmed his 2:30 PM visit.', time: '5 min ago' },
      { id: 2, text: '2 appointments still need confirmation.', time: '40 min ago' },
    ],
  },
  dentist: {
    roleLabel: 'Dentist',
    userName: 'Dr. Kavindu Rathnayake',
    userInitials: 'KR',
    pageEyebrow: 'Dentist Dashboard',
    pageTitle: 'Your chairside, Dr. Rathnayake',
    searchPlaceholder: 'Search your patients…',
    notifications: [
      { id: 1, text: 'New patient history uploaded for T. Fernando.', time: '20 min ago' },
      { id: 2, text: 'Your 4:00 PM appointment was rescheduled.', time: '2 hr ago' },
    ],
  },
  patient: {
    roleLabel: 'Patient',
    userName: 'Tharindu Fernando',
    userInitials: 'TF',
    pageEyebrow: 'Patient Portal',
    pageTitle: 'Welcome back, Tharindu',
    searchPlaceholder: 'Search your records…',
    notifications: [
      { id: 1, text: 'Your appointment is confirmed for Friday.', time: '1 hr ago' },
      { id: 2, text: 'A new bill is ready to view.', time: 'Yesterday' },
    ],
  },
};

/* ---------------------------------------------------------- */
/* Admin                                                       */
/* ---------------------------------------------------------- */
export const adminMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  {
    id: 'patients',
    label: 'Patient Management',
    icon: Users,
    children: [
      { id: 'patient-list', label: 'Patient List', path: '/admin/patients' },
      { id: 'patient-add', label: 'Add Patient', path: '/admin/patients/new' },
      { id: 'patient-details', label: 'Patient Details', path: '/admin/patients/details' },
    ],
  },
  {
    id: 'appointments',
    label: 'Appointment Management',
    icon: CalendarDays,
    children: [
      { id: 'appt-list', label: 'Appointment List', path: '/admin/appointments' },
      { id: 'appt-add', label: 'Book Appointment', path: '/admin/appointments/new' },
      { id: 'appt-details', label: 'Appointment Details', path: '/admin/appointments/:id' },
      { id: 'appt-daily', label: 'Daily Schedule', path: '/admin/schedule' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing Management',
    icon: Receipt,
    children: [
      { id: 'bill-list', label: 'Bill List', path: '/admin/billing' },
      { id: 'bill-generate', label: 'Generate Bill', path: '/admin/bills/new' },
      { id: 'bill-details', label: 'Bill Details', path: '/admin/bills/:id' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    children: [
      { id: 'report-dashboard', label: 'Report Dashboard', path: '/admin/reports' },
      { id: 'report-revenue', label: 'Revenue Report', path: '/admin/reports/revenue' },
      { id: 'report-schedule', label: 'Schedule Report', path: '/admin/reports/schedule' },
      { id: 'report-patient', label: 'Patient Report', path: '/admin/reports/patient' },
      { id: 'report-dentist', label: 'Dentist Performance Report', path: '/admin/reports/dentist' },
    ],
  },
  {
    id: 'staff',
    label: 'Staff Management',
    icon: UserCog,
    children: [
      { id: 'staff-list', label: 'Staff List', path: '/admin/staff' },
      { id: 'staff-add', label: 'Add Staff', path: '/admin/staff/new' },
      { id: 'staff-details', label: 'Staff Details', path: '/admin/staff/:id' },
    ],
  },
  {
    id: 'dentists',
    label: 'Dentist Management',
    icon: Stethoscope,
    children: [
      { id: 'dentist-list', label: 'Dentist List', path: '/admin/dentists' },
      { id: 'dentist-add', label: 'Add Dentist', path: '/admin/dentists/new' },
    ],
  },
  {
    id: 'treatments',
    label: 'Treatment Management',
    icon: Pill,
    children: [
      { id: 'treatment-list', label: 'Treatment List', path: '/admin/treatments' },
      { id: 'treatment-add', label: 'Add Treatment', path: '/admin/treatments/new' },
    ],
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: Settings,
    children: [
      { id: 'settings-clinic', label: 'Clinic Settings', path: '/admin/settings/clinic' },
      { id: 'settings-permissions', label: 'User Permissions', path: '/admin/settings/permissions' },
      { id: 'settings-system', label: 'System Configuration', path: '/admin/settings/system' },
    ],
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    icon: ShieldCheck,
    children: [
      { id: 'audit-activity', label: 'Activity Log', path: '/admin/audit/activity' },
      { id: 'audit-login', label: 'Login History', path: '/admin/audit/login' },
    ],
  },
];

/* ---------------------------------------------------------- */
/* Receptionist                                                 */
/* ---------------------------------------------------------- */
export const receptionMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/reception/dashboard' },
  {
    id: 'patients',
    label: 'Patient Management',
    icon: Users,
    children: [
      { id: 'patient-list', label: 'Patient List', path: '/reception/patients' },
      { id: 'patient-add', label: 'Add Patient', path: '/reception/patients/add' },
      { id: 'patient-details', label: 'Patient Details', path: '/reception/patients/details' },
    ],
  },
  {
    id: 'appointments',
    label: 'Appointment Management',
    icon: CalendarDays,
    children: [
      { id: 'appt-list', label: 'Appointment List', path: '/reception/appointments' },
      { id: 'appt-book', label: 'Book Appointment', path: '/reception/appointments/book' },
      { id: 'appt-details', label: 'Appointment Details', path: '/reception/appointments/details' },
      { id: 'appt-daily', label: 'Daily Schedule', path: '/reception/appointments/daily' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing Management',
    icon: Receipt,
    children: [
      { id: 'bill-list', label: 'Bill List', path: '/reception/billing' },
      { id: 'bill-generate', label: 'Generate Bill', path: '/reception/billing/generate' },
      { id: 'bill-details', label: 'Bill Details', path: '/reception/billing/details' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports (Limited Access)',
    icon: BarChart3,
    children: [
      { id: 'report-daily', label: 'Daily Summary Report', path: '/reception/reports/daily' },
      { id: 'report-appt', label: 'Appointment Report', path: '/reception/reports/appointments' },
    ],
  },
  {
    id: 'profile',
    label: 'My Profile',
    icon: UserCircle,
    children: [
      { id: 'profile-view', label: 'View Profile', path: '/reception/profile' },
      { id: 'profile-edit', label: 'Edit Profile', path: '/reception/profile/edit' },
    ],
  },
];

/* ---------------------------------------------------------- */
/* Dentist                                                      */
/* ---------------------------------------------------------- */
export const dentistMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dentist/dashboard' },
  {
    id: 'schedule',
    label: 'My Schedule',
    icon: ClipboardList,
    children: [
      { id: 'schedule-daily', label: 'Daily Schedule View', path: '/dentist/schedule/daily' },
      { id: 'schedule-week', label: 'Week Schedule View', path: '/dentist/schedule/week' },
      { id: 'schedule-appt-details', label: 'Appointment Details', path: '/dentist/schedule/appointment-details' },
    ],
  },
  {
    id: 'patients',
    label: 'Patient Management',
    icon: Users,
    children: [
      { id: 'my-patients', label: 'My Patients', path: '/dentist/patients' },
      { id: 'patient-details-ro', label: 'Patient Details (View Only)', path: '/dentist/patients/details' },
    ],
  },
  {
    id: 'appointments',
    label: 'My Appointments',
    icon: CalendarCheck,
    children: [
      { id: 'appt-today', label: "Today's Appointments", path: '/dentist/appointments/today' },
      { id: 'appt-upcoming', label: 'Upcoming Appointments', path: '/dentist/appointments/upcoming' },
      { id: 'appt-details', label: 'Appointment Details', path: '/dentist/appointments/details' },
    ],
  },
  {
    id: 'clinical-notes',
    label: 'Clinical Notes',
    icon: FileText,
    children: [
      { id: 'notes-add', label: 'Add Treatment Notes', path: '/dentist/notes/add' },
      { id: 'notes-history', label: 'View Patient History', path: '/dentist/notes/history' },
      { id: 'notes-records', label: 'Medical Records (View Only)', path: '/dentist/notes/records' },
    ],
  },
  {
    id: 'my-reports',
    label: 'My Reports',
    icon: TrendingUp,
    children: [
      { id: 'report-performance', label: 'My Performance Report', path: '/dentist/reports/performance' },
      { id: 'report-treatment', label: 'Patient Treatment Report', path: '/dentist/reports/treatment' },
    ],
  },
  {
    id: 'profile',
    label: 'My Profile',
    icon: UserCircle,
    children: [
      { id: 'profile-view', label: 'View Profile', path: '/dentist/profile' },
      { id: 'profile-edit', label: 'Edit Profile', path: '/dentist/profile/edit' },
    ],
  },
];

/* ---------------------------------------------------------- */
/* Patient                                                      */
/* ---------------------------------------------------------- */
export const patientMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/patient/dashboard' },
  {
    id: 'appointments',
    label: 'My Appointments',
    icon: CalendarDays,
    children: [
      { id: 'appt-upcoming', label: 'Upcoming Appointments', path: '/patient/appointments/upcoming' },
      { id: 'appt-past', label: 'Past Appointments', path: '/patient/appointments/past' },
      { id: 'appt-details', label: 'Appointment Details', path: '/patient/appointments/details' },
    ],
  },
  {
    id: 'bills',
    label: 'My Bills',
    icon: Receipt,
    children: [
      { id: 'bill-list', label: 'Bill List', path: '/patient/bills' },
      { id: 'bill-details', label: 'Bill Details', path: '/patient/bills/details' },
    ],
  },
  {
    id: 'profile',
    label: 'My Profile',
    icon: UserCircle,
    children: [
      { id: 'profile-view', label: 'View Profile', path: '/patient/profile' },
      { id: 'profile-edit', label: 'Edit Profile', path: '/patient/profile/edit' },
    ],
  },
  {
    id: 'records',
    label: 'Medical Records',
    icon: FolderHeart,
    children: [
      { id: 'records-history', label: 'View Medical History', path: '/patient/records/history' },
      { id: 'records-treatment', label: 'Treatment History', path: '/patient/records/treatment' },
    ],
  },
  {
    id: 'support',
    label: 'Help & Support',
    icon: HelpCircle,
    children: [
      { id: 'support-faq', label: 'FAQ', path: '/patient/support/faq' },
      { id: 'support-contact', label: 'Contact Clinic', path: '/patient/support/contact' },
    ],
  },
];
