🦷 Sunrise Dental Clinic Management System
A Complete Full-Stack Dental Practice Management Solution
📋 Table of Contents
Project Overview

Color Palette

Architecture

User Roles & Features

Technology Stack

Project Structure

Pages & Routes

Getting Started

Development Guidelines

API Endpoints

Database Schema

Contributing

License

Project Overview
Sunrise Dental Clinic Management System is a comprehensive, full-stack web application designed to modernize dental practice operations. The system streamlines patient management, appointment scheduling, billing, clinical documentation, and reporting through an intuitive, role-based interface.

Key Features
Feature	Description
Patient Management	Register, search, and manage patient records with medical history
Appointment Scheduling	Book, reschedule, and cancel appointments with real-time availability
Billing System	Generate invoices, process payments, and track financials
Clinical Documentation	Add treatment notes, view patient history, and manage medical records
Reporting & Analytics	Revenue analysis, schedule utilization, and performance metrics
Patient Portal	Self-service access for appointments, bills, and medical records
Role-Based Access	Admin, Receptionist, Dentist, and Patient portals
Distributed Architecture	RESTful API with React frontend and Spring Boot backend
Problems Solved
❌ Double Booking → ✅ Real-time availability checking with conflict prevention

❌ Lost Records → ✅ Centralized digital database with secure storage

❌ Long Waiting Times → ✅ Automated scheduling and appointment reminders

❌ Billing Errors → ✅ Automated calculation with accurate invoicing


Color Palette
Clean & Fresh Colors - Dental Clinic Theme
┌─────────────────────────────────────────────────────────────────────┐
│                    SUNRISE DENTAL COLOR PALETTE                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PRIMARY COLORS                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  #2F3E3C       #BDDBD1       #E7E9E3       #FBF9F1            │ │
│  │  ████████████  ████████████  ████████████  ████████████       │ │
│  │  Dark Teal     Soft Mint     Light Sage    Cream White        │ │
│  │                                                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ACCENT COLORS                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  #E8F0F1       #C7E7EC                                        │ │
│  │  ████████████  ████████████                                   │ │
│  │  Ice Blue      Sky Blue                                       │ │
│  │                                                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

Color Usage Guide
Color	Hex	Usage
Dark Teal	#2F3E3C	Primary text, navigation bars, headings, footer backgrounds
Soft Mint	#BDDBD1	Primary buttons, success states, active elements, highlights
Light Sage	#E7E9E3	Backgrounds, cards, containers, input fields
Cream White	#FBF9F1	Main background, content areas, form backgrounds
Ice Blue	#E8F0F1	Secondary buttons, borders, subtle highlights
Sky Blue	#C7E7EC	Accents, notifications, hover effects, links

Design System
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

Architecture
System Architecture Diagram

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

User Roles & Features
Role-Based Feature Matrix
Feature	Admin	Receptionist	Dentist	Patient
Dashboard	✅ Full Analytics	✅ Daily Overview	✅ Schedule View	✅ Personal Summary
Patient Management	✅ Full CRUD	✅ Full CRUD	⚠️ View Only	⚠️ Self Only
Appointment Management	✅ Full CRUD	✅ Full CRUD	✅ Update Status	⚠️ Request Only
Billing	✅ Full Access	✅ Generate/Process	❌ No Access	⚠️ View & Pay
Clinical Notes	✅ View Only	❌ No Access	✅ Write Access	⚠️ View Only
Reports	✅ All Reports	⚠️ Limited	⚠️ Personal Only	❌ No Access
Staff Management	✅ Full Access	❌ No Access	❌ No Access	❌ No Access
Dentist Management	✅ Full Access	⚠️ View Only	❌ No Access	❌ No Access
Treatment Management	✅ Full Access	⚠️ View Only	❌ No Access	❌ No Access
Settings	✅ Full Access	❌ No Access	❌ No Access	⚠️ Profile Only
Audit Logs	✅ Full Access	❌ No Access	❌ No Access	❌ No Access
Profile	✅ Self Only	✅ Self Only	✅ Self Only	✅ Self Only
Page Count by Role
Role	Pages	Routes
Admin	26	/admin/*
Receptionist	17	/receptionist/*
Dentist	14	/dentist/*
Patient	12	/patient/*
Technology Stack
Frontend

┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND STACK                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🚀 React 18               - UI Framework                  │
│  🛣️ React Router DOM       - Navigation & Routing          │
│  📡 Axios                   - HTTP Client                  │
│  🎨 CSS3                    - Styling                     │
│  💅 Custom CSS Variables    - Design System               │
│  📊 Chart.js               - Charts & Graphs              │
│  📅 React Calendar          - Calendar Components          │
│  📄 React PDF              - PDF Generation               │
│  🎯 React Hook Form        - Form Handling                │
│  🔐 Context API            - State Management             │
│                                                             │
└─────────────────────────────────────────────────────────────┘


