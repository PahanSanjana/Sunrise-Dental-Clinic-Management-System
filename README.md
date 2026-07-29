# 🦷 Sunrise Dental Clinic Management System

**A Complete Full-Stack Dental Practice Management Solution**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Color Palette](#color-palette)
- [Architecture](#architecture)
- [User Roles & Features](#user-roles--features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Sunrise Dental Clinic Management System** is a comprehensive, full-stack web application designed to modernize dental practice operations. The system streamlines patient management, appointment scheduling, billing, clinical documentation, and reporting through an intuitive, role-based interface.

### Key Features

| Feature | Description |
|---|---|
| **Patient Management** | Register, search, and manage patient records with medical history |
| **Appointment Scheduling** | Book, reschedule, and cancel appointments with real-time availability |
| **Billing System** | Generate invoices, process payments, and track financials |
| **Clinical Documentation** | Add treatment notes, view patient history, and manage medical records |
| **Reporting & Analytics** | Revenue analysis, schedule utilization, and performance metrics |
| **Patient Portal** | Self-service access for appointments, bills, and medical records |
| **Role-Based Access** | Admin, Receptionist, Dentist, and Patient portals |
| **Distributed Architecture** | RESTful API with React frontend and Spring Boot backend |

### Problems Solved

| Problem | Solution |
|---|---|
| ❌ Double Booking | ✅ Real-time availability checking with conflict prevention |
| ❌ Lost Records | ✅ Centralized digital database with secure storage |
| ❌ Long Waiting Times | ✅ Automated scheduling and appointment reminders |
| ❌ Billing Errors | ✅ Automated calculation with accurate invoicing |

---

## Color Palette

**Clean & Fresh Colors — Dental Clinic Theme**

### Primary Colors

| Color | Hex | Swatch |
|---|---|---|
| Dark Teal | `#2F3E3C` | ██████████ |
| Soft Mint | `#BDDBD1` | ██████████ |
| Light Sage | `#E7E9E3` | ██████████ |
| Cream White | `#FBF9F1` | ██████████ |

### Accent Colors

| Color | Hex | Swatch |
|---|---|---|
| Ice Blue | `#E8F0F1` | ██████████ |
| Sky Blue | `#C7E7EC` | ██████████ |

### Color Usage Guide

| Color | Hex | Usage |
|---|---|---|
| Dark Teal | `#2F3E3C` | Primary text, navigation bars, headings, footer backgrounds |
| Soft Mint | `#BDDBD1` | Primary buttons, success states, active elements, highlights |
| Light Sage | `#E7E9E3` | Backgrounds, cards, containers, input fields |
| Cream White | `#FBF9F1` | Main background, content areas, form backgrounds |
| Ice Blue | `#E8F0F1` | Secondary buttons, borders, subtle highlights |
| Sky Blue | `#C7E7EC` | Accents, notifications, hover effects, links |

### Design System

```css
/* Primary Colors */
--color-primary: #2F3E3C;
--color-secondary: #BDDBD1;
--color-accent: #E7E9E3;
--color-background: #FBF9F1;
--color-highlight: #E8F0F1;
--color-highlight-light: #C7E7EC;

/* Typography */
--font-primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-heading: 'SF Pro Display', sans-serif;
--font-body: 'SF Pro Text', sans-serif;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-xxl: 48px;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 2px 8px rgba(47, 62, 60, 0.08);
--shadow-md: 0 4px 16px rgba(47, 62, 60, 0.12);
--shadow-lg: 0 8px 32px rgba(47, 62, 60, 0.16);
--shadow-xl: 0 16px 48px rgba(47, 62, 60, 0.20);
```

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER (React)                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Admin   │  │Reception │  │  Dentist │  │ Patient  │              │
│  │  Portal  │  │  Portal  │  │  Portal  │  │  Portal  │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │             │             │             │                      │
│       └─────────────┼─────────────┼─────────────┘                      │
│                     │             │                                    │
│                     ▼             ▼                                    │
│              ┌─────────────────────────┐                               │
│              │    React Router DOM     │                               │
│              │    State Management     │                               │
│              │    (Context API)        │                               │
│              └─────────────────────────┘                               │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
                           │ REST API / JSON
                           │
┌──────────────────────────▼──────────────────────────────────────────────┐
│                         API GATEWAY LAYER                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Spring Boot Controllers                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │   Auth   │  │ Patient  │  │Appoint-  │  │ Billing  │      │   │
│  │  │Controller│  │Controller│  │ment Ctrl │  │Controller│      │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────────┐
│                       BUSINESS LOGIC LAYER                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         Services                                │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │   User   │  │ Patient  │  │Appoint-  │  │ Billing  │      │   │
│  │  │ Service  │  │ Service  │  │ment Svc  │  │ Service  │      │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────────┐
│                       DATA ACCESS LAYER                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Repositories (JPA)                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │   User   │  │ Patient  │  │Appoint-  │  │   Bill   │      │   │
│  │  │Repository│  │Repository│  │ment Repo │  │Repository│      │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────────┐
│                         DATABASE LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         MySQL                                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │  Users   │  │ Patients │  │Appoint-  │  │  Bills   │      │   │
│  │  │          │  │          │  │ments     │  │          │      │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## User Roles & Features

### Role-Based Feature Matrix

| Feature | Admin | Receptionist | Dentist | Patient |
|---|---|---|---|---|
| Dashboard | ✅ Full Analytics | ✅ Daily Overview | ✅ Schedule View | ✅ Personal Summary |
| Patient Management | ✅ Full CRUD | ✅ Full CRUD | ⚠️ View Only | ⚠️ Self Only |
| Appointment Management | ✅ Full CRUD | ✅ Full CRUD | ✅ Update Status | ⚠️ Request Only |
| Billing | ✅ Full Access | ✅ Generate/Process | ❌ No Access | ⚠️ View & Pay |
| Clinical Notes | ✅ View Only | ❌ No Access | ✅ Write Access | ⚠️ View Only |
| Reports | ✅ All Reports | ⚠️ Limited | ⚠️ Personal Only | ❌ No Access |
| Staff Management | ✅ Full Access | ❌ No Access | ❌ No Access | ❌ No Access |
| Dentist Management | ✅ Full Access | ⚠️ View Only | ❌ No Access | ❌ No Access |
| Treatment Management | ✅ Full Access | ⚠️ View Only | ❌ No Access | ❌ No Access |
| Settings | ✅ Full Access | ❌ No Access | ❌ No Access | ⚠️ Profile Only |
| Audit Logs | ✅ Full Access | ❌ No Access | ❌ No Access | ❌ No Access |
| Profile | ✅ Self Only | ✅ Self Only | ✅ Self Only | ✅ Self Only |

### Page Count by Role

| Role | Pages | Routes |
|---|---|---|
| Admin | 26 | `/admin/*` |
| Receptionist | 17 | `/receptionist/*` |
| Dentist | 14 | `/dentist/*` |
| Patient | 12 | `/patient/*` |

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| 🚀 React 18 | UI Framework |
| 🛣️ React Router DOM | Navigation & Routing |
| 📡 Axios | HTTP Client |
| 🎨 CSS3 | Styling |
| 💅 Custom CSS Variables | Design System |
| 📊 Chart.js | Charts & Graphs |
| 📅 React Calendar | Calendar Components |
| 📄 React PDF | PDF Generation |
| 🎯 React Hook Form | Form Handling |
| 🔐 Context API | State Management |

### Backend

| Technology | Purpose |
|---|---|
| ☕ Java 21 | Programming Language |
| 🍃 Spring Boot 3.4.1 | Framework |
| 🗄️ Spring Data JPA | ORM / Database Access |
| 🔒 Spring Security | Authentication & Authorization |
| 🛡️ JWT | Token-Based Security |
| 🐬 MySQL 8.x | Database |
| 📦 Maven | Build Tool |
| 🔄 Hibernate | ORM Implementation |
| ✅ Validation | Input Validation |
| 🧪 JUnit 5 | Testing |

### Development Tools

| Tool | Purpose |
|---|---|
| 💻 VS Code | Code Editor |
| 🧰 IntelliJ IDEA | Java IDE |
| 🐳 Docker | Containerization (Optional) |
| 📦 npm / Maven | Package Managers |
| 🔧 Postman | API Testing |
| 🗄️ phpMyAdmin | Database Management |
| 🌐 XAMPP / WAMP | Local Development |

---

## Project Structure

### Frontend Structure

```
dental-clinic-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   ├── axiosConfig.js
│   │   └── endpoints.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sidebar.css
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── admin/
│   │   │   ├── Dashboard/
│   │   │   ├── Patients/
│   │   │   ├── Appointments/
│   │   │   ├── Billing/
│   │   │   ├── Reports/
│   │   │   ├── Staff/
│   │   │   ├── Dentists/
│   │   │   ├── Treatments/
│   │   │   ├── Settings/
│   │   │   └── Audit/
│   │   ├── receptionist/
│   │   │   ├── Dashboard/
│   │   │   ├── Patients/
│   │   │   ├── Appointments/
│   │   │   ├── Billing/
│   │   │   └── Reports/
│   │   ├── dentist/
│   │   │   ├── Dashboard/
│   │   │   ├── Schedule/
│   │   │   ├── Patients/
│   │   │   ├── Appointments/
│   │   │   ├── ClinicalNotes/
│   │   │   └── Reports/
│   │   └── patient/
│   │       ├── Dashboard/
│   │       ├── Appointments/
│   │       ├── Bills/
│   │       ├── Profile/
│   │       ├── MedicalRecords/
│   │       └── Help/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

### Backend Structure

```
dental-clinic-backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── sunrise/
│       │           └── dentalclinic/
│       │               ├── DentalClinicApplication.java
│       │               ├── entity/
│       │               │   ├── User.java
│       │               │   ├── Patient.java
│       │               │   ├── Dentist.java
│       │               │   ├── TreatmentType.java
│       │               │   ├── Appointment.java
│       │               │   └── Bill.java
│       │               ├── repository/
│       │               │   ├── UserRepository.java
│       │               │   ├── PatientRepository.java
│       │               │   ├── DentistRepository.java
│       │               │   ├── TreatmentTypeRepository.java
│       │               │   ├── AppointmentRepository.java
│       │               │   └── BillRepository.java
│       │               ├── service/
│       │               │   ├── UserService.java
│       │               │   ├── PatientService.java
│       │               │   ├── DentistService.java
│       │               │   ├── AppointmentService.java
│       │               │   ├── BillingService.java
│       │               │   └── ReportService.java
│       │               ├── controller/
│       │               │   ├── AuthController.java
│       │               │   ├── PatientController.java
│       │               │   ├── AppointmentController.java
│       │               │   ├── BillingController.java
│       │               │   └── ReportController.java
│       │               ├── dto/
│       │               │   ├── LoginRequest.java
│       │               │   ├── LoginResponse.java
│       │               │   ├── AppointmentRequest.java
│       │               │   ├── AppointmentResponse.java
│       │               │   └── ...
│       │               ├── config/
│       │               │   ├── SecurityConfig.java
│       │               │   ├── CorsConfig.java
│       │               │   ├── JwtTokenUtil.java
│       │               │   ├── JwtAuthenticationFilter.java
│       │               │   └── CustomUserDetailsService.java
│       │               ├── exception/
│       │               │   ├── GlobalExceptionHandler.java
│       │               │   └── BusinessRuleException.java
│       │               └── util/
│       │                   └── PasswordValidator.java
│       └── resources/
│           ├── application.properties
│           ├── application-dev.properties
│           └── application-prod.properties
├── pom.xml
└── README.md
```

---

## Pages & Routes

### Full Route Structure

```
PUBLIC ROUTES
├── /login                    → Login Page
└── /register                 → Register Page

ADMIN ROUTES (/admin/*)
├── /dashboard                → Admin Dashboard
├── /patients                 → Patient List
├── /patients/new             → Add Patient
├── /patients/:id             → Patient Details
├── /patients/:id/edit        → Edit Patient
├── /appointments             → Appointment List
├── /appointments/new         → Book Appointment
├── /appointments/:id         → Appointment Details
├── /schedule                 → Daily Schedule
├── /billing                  → Bill List
├── /billing/new              → Generate Bill
├── /billing/:id              → Bill Details
├── /reports                  → Report Dashboard
├── /reports/revenue          → Revenue Report
├── /reports/schedule         → Schedule Report
├── /reports/patients         → Patient Report
├── /staff                    → Staff List
├── /staff/new                → Add Staff
├── /staff/:id                → Staff Details
├── /dentists                 → Dentist List
├── /dentists/new             → Add Dentist
├── /treatments               → Treatment List
├── /treatments/new           → Add Treatment
├── /settings/clinic          → Clinic Settings
├── /settings/permissions     → User Permissions
├── /audit/activity           → Activity Log
└── /audit/login              → Login History

RECEPTIONIST ROUTES (/receptionist/*)
├── /dashboard                → Receptionist Dashboard
├── /patients                 → Patient List
├── /patients/new             → Add Patient
├── /patients/:id             → Patient Details
├── /appointments             → Appointment List
├── /appointments/new         → Book Appointment
├── /appointments/:id         → Appointment Details
├── /schedule                 → Daily Schedule
├── /checkin/:id              → Patient Check-in
├── /billing                  → Bill List
├── /billing/new              → Generate Bill
├── /billing/:id              → Bill Details
├── /reports/daily            → Daily Summary Report
├── /reports/appointments     → Appointment Report
├── /profile                  → View Profile
└── /profile/edit             → Edit Profile

DENTIST ROUTES (/dentist/*)
├── /dashboard                → Dentist Dashboard
├── /schedule/daily           → Daily Schedule
├── /schedule/week            → Week Schedule
├── /appointments/:id         → Appointment Details
├── /patients                 → My Patients
├── /patients/:id             → Patient Details
├── /appointments/today       → Today's Appointments
├── /appointments/upcoming    → Upcoming Appointments
├── /notes/new/:id            → Add Treatment Notes
├── /history/:id              → Patient History
├── /reports/performance      → Performance Report
├── /reports/treatments       → Treatment Report
├── /profile                  → View Profile
└── /profile/edit             → Edit Profile

PATIENT ROUTES (/patient/*)
├── /dashboard                → Patient Dashboard
├── /appointments/upcoming    → Upcoming Appointments
├── /appointments/past        → Past Appointments
├── /appointments/:id         → Appointment Details
├── /bills                    → Bill List
├── /bills/:id                → Bill Details
├── /profile                  → View Profile
├── /profile/edit             → Edit Profile
├── /medical-history          → Medical History
├── /treatments               → Treatment History
├── /faq                      → FAQ
└── /contact                  → Contact Clinic
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js v18+
- Java JDK 21
- MySQL 8.x
- Maven 3.9+
- Git
- XAMPP / WAMP (for local development)

### Installation

**1. Clone the Repository**

```bash
git clone https://github.com/yourusername/sunrise-dental-clinic.git
cd sunrise-dental-clinic
```

**2. Backend Setup**

```bash
# Navigate to backend
cd dental-clinic-backend

# Update application.properties with your MySQL credentials
# Create database: sunrise_dental

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**3. Frontend Setup**

```bash
# Navigate to frontend
cd dental-clinic-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

**4. Database Setup**

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS sunrise_dental;
USE sunrise_dental;

-- Run the schema.sql file
-- This creates all tables and inserts sample data
```

### Running the Application

```bash
# Terminal 1 - Backend (Spring Boot)
cd dental-clinic-backend
mvn spring-boot:run
# Runs on: http://localhost:8080

# Terminal 2 - Frontend (React)
cd dental-clinic-frontend
npm start
# Runs on: http://localhost:3000

# Access the application
# Open: http://localhost:3000
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### Patients

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| POST | `/api/patients` | Create patient |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}` | Delete patient |
| GET | `/api/patients/search` | Search patients |

### Appointments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/{id}` | Get appointment by ID |
| POST | `/api/appointments` | Create appointment |
| PUT | `/api/appointments/{id}` | Update appointment |
| DELETE | `/api/appointments/{id}` | Delete appointment |
| GET | `/api/appointments/daily/{date}` | Get daily schedule |
| GET | `/api/appointments/patient/{id}` | Get patient appointments |
| POST | `/api/appointments/check` | Check availability |

### Billing

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bills` | Get all bills |
| GET | `/api/bills/{id}` | Get bill by ID |
| POST | `/api/bills` | Generate bill |
| PUT | `/api/bills/{id}/pay` | Process payment |
| GET | `/api/bills/patient/{id}` | Get patient bills |

### Reports

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reports/revenue` | Revenue report |
| GET | `/api/reports/schedule` | Schedule report |
| GET | `/api/reports/patients` | Patient report |
| GET | `/api/reports/performance/{id}` | Dentist performance |

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐         ┌─────────────────┐         ┌─────────────┐  │
│  │    users    │         │    patients     │         │  dentists   │  │
│  ├─────────────┤         ├─────────────────┤         ├─────────────┤  │
│  │ user_id (PK)│         │ patient_id (PK) │         │dentist_id(PK)│  │
│  │ username    │◄────────│ patient_id (FK) │         │ name        │  │
│  │ password    │         │ name            │         │specialization│  │
│  │ role        │         │ address         │◄────────│dentist_id(FK)│  │
│  │ full_name   │         │ contact_number  │         │ is_active   │  │
│  │ is_active   │         │ email           │         │ created_at  │  │
│  │ created_at  │         │ password_hash   │         └─────────────┘  │
│  └─────────────┘         │ medical_history │                           │
│                           │ created_at      │         ┌─────────────┐  │
│                           └─────────────────┘         │treatments   │  │
│                                    │                  ├─────────────┤  │
│                                    │                  │treatment_id │  │
│                                    ▼                  │ name        │  │
│                           ┌─────────────────┐         │ base_cost   │  │
│                           │  appointments   │         │consult_fee  │  │
│                           ├─────────────────┤         │ is_active   │  │
│                           │appointment_num  │         └─────────────┘  │
│                           │ patient_id (FK) │                  │       │
│                           │ dentist_id (FK) │◄─────────────────┘       │
│                           │ treatment_id(FK)│                         │
│                           │ appointment_date│         ┌─────────────┐  │
│                           │ appointment_time│         │    bills    │  │
│                           │ status          │         ├─────────────┤  │
│                           │ notes           │◄────────│appointment  │  │
│                           │ created_at      │         │consult_fee  │  │
│                           └─────────────────┘         │treatment_cost│  │
│                                                        │total_amount │  │
│                                                        │is_paid      │  │
│                                                        │payment_date │  │
│                                                        └─────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Color Palette Quick Reference

| Category | Color | Hex | Usage |
|---|---|---|---|
| Primary | Dark Teal | `#2F3E3C` | Text, Headings, Navbar |
| Primary | Soft Mint | `#BDDBD1` | Buttons, Success States |
| Primary | Light Sage | `#E7E9E3` | Cards, Backgrounds |
| Primary | Cream White | `#FBF9F1` | Main Background |
| Accent | Ice Blue | `#E8F0F1` | Secondary Buttons, Borders |
| Accent | Sky Blue | `#C7E7EC` | Accents, Hover Effects |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

<p align="center">Made with 🦷 and ❤️ by the Sunrise Dental Clinic Team</p>
