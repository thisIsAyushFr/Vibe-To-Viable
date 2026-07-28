# CareSync - Claude Code Instructions

# Project Identity

You are helping build **CareSync**, an AI-powered hospital intelligence platform.

CareSync solves a major healthcare gap:

Current hospital systems manage patient information, appointments, and records, but they do not actively reduce the workload, cognitive burden, and administrative pressure on doctors.

## Primary Mission

- Reduce doctor workload
- Improve patient experience
- Automate repetitive hospital workflows
- Provide intelligent healthcare insights
- Connect patients, doctors, nurses, and administrators

---

# Core Development Principle

Every feature should answer:

"How does this reduce workload for healthcare professionals while improving patient care?"

Prioritize:

1. Doctor efficiency
2. Patient convenience
3. Hospital operational intelligence
4. Responsible AI assistance

---

# Technology Stack

## Frontend

Preferred:

- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide Icons

---

# Backend Architecture

CareSync uses a hybrid backend architecture.

## Primary Backend API

Preferred:

- Node.js
- Express.js

Used for:

- Authentication
- Authorization
- Patient management
- Doctor management
- Appointment scheduling
- Hospital workflows
- Notifications
- API communication

---

## AI Services Backend

Preferred:

- Python
- FastAPI

Used for:

- Gemini API integration
- Medical report summarization
- Patient history summarization
- Document processing
- Clinical note assistance
- Machine Learning model serving
- Healthcare predictions

Python is preferred because of its ecosystem for:

- Machine Learning
- NLP
- Data Analysis
- AI Deployment

---

## Database

Preferred:

- PostgreSQL

Stores:

- Patient records
- Doctor profiles
- Appointments
- Medical reports metadata
- Hospital workflows
- Workload analytics

---

## Cache

Preferred:

- Redis

Used for:

- Real-time queues
- Waiting time updates
- Notifications
- Temporary AI responses

---

## File Storage

Preferred:

- AWS S3
- Google Cloud Storage
- Azure Blob Storage

Used for:

- Medical reports
- Prescriptions
- Images
- Healthcare documents

Large files should not be stored directly in the database.

---

# AI Platform

Preferred:

- Gemini API
- Machine Learning Services

AI Features:

- Medical document understanding
- Patient-friendly explanations
- Clinical assistance
- Report summarization
- Workflow automation
- Healthcare analytics

Important:

AI provides assistance and decision support only.

AI must never replace professional medical judgment or provide final diagnosis.

---

# Project Architecture

Frontend:

src/
- components/
- pages/
- layouts/
- hooks/
- services/
- utils/
- api/

Backend:

server/
- routes/
- controllers/
- models/
- services/
- middleware/
- database/
- ai/

---

# Development Rules

Before implementing any feature:

1. Understand the user problem.
2. Explain the proposed solution.
3. Identify affected files.
4. Implement modular code.
5. Explain testing steps.

Never:

- Modify unrelated files.
- Create unnecessary dependencies.
- Duplicate components.
- Ignore existing architecture.

---

# UI Design System

## Theme

Aurora Glassmorphism

Design should feel:

- Calm
- Premium
- Futuristic
- Healthcare-focused
- Trustworthy

---

# Color Palette

Primary: #0F766E
Secondary: #14B8A6
Accent: #38BDF8
Background: #F0FDFA
Deep Navy: #0F172A
Secondary Text: #64748B
Success: #22C55E
Warning: #F59E0B
Danger: #EF4444

---

# Glass Style

Use subtle glass effects.

background: rgba(255,255,255,0.65);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.45);
border-radius: 20px;

Use glass for:

- Sidebar
- Navbar
- Dashboard cards
- AI panels
- Appointment cards

Avoid:

- Excessive transparency
- Low contrast
- Glass everywhere

Healthcare readability is the priority.

---

# Dashboard Design

## Doctor Dashboard

Main goal:

Reduce doctor workload.

Features:

- Today's appointments
- Patient queue
- Patient timeline
- Medical history
- AI patient summaries
- Documentation assistance
- Pending tasks
- Workload analytics
- Burnout risk indicators

---

## Patient Dashboard

Features:

- Upcoming appointments
- Medicine reminders
- Medical reports
- Health assistant
- Hospital navigation
- Recovery guidance

---

## Admin Dashboard

Features:

- Hospital occupancy
- Department workload
- Doctor availability
- Patient flow
- Resource monitoring
- Analytics

---

# Data Privacy and RBAC

CareSync handles sensitive healthcare information.

Every user should only access information required for their role.

## Roles

PATIENT
DOCTOR
NURSE
ADMIN
OWNER

---

# Security Requirements

Implement:

- Role-based access control
- Secure authentication
- API authorization middleware
- Backend-level data filtering
- Audit logs

Never:

- Expose unnecessary data
- Allow unauthorized record access
- Share private medical information

---

# Feature Roadmap

## Phase 1

- Authentication
- Patient dashboard
- Doctor dashboard
- Appointment management

## Phase 2

- Gemini report summarizer
- Medical document assistant
- Patient history summarization

## Phase 3

- Workload analytics
- Burnout prediction
- Queue optimization
- Task automation

## Phase 4

- Hospital intelligence
- Resource prediction
- Advanced AI assistant

---

# Coding Philosophy

Write code that is:

- Maintainable
- Scalable
- Secure
- Easy to understand

CareSync should feel like a real healthcare product, not a demo application.
