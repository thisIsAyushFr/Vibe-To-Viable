# CareSync - Claude Code Instructions

## Project Identity

You are helping build **CareSync**, an AI-powered hospital intelligence platform.

CareSync focuses on solving a major healthcare gap:

Current hospital systems manage patient information, appointments, and records, but they do not actively reduce the workload, cognitive burden, and administrative pressure on doctors.

The primary mission of CareSync:

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

# AI Integration

## Gemini API

CareSync uses Google Gemini API for intelligent healthcare assistance.

Gemini-powered features:

- Medical report summarization
- Patient history summarization
- Clinical note assistance
- Patient-friendly medical explanations
- Healthcare chatbot assistance
- Document understanding
- Medical information extraction

Important:

AI must never provide a final medical diagnosis.

AI output should be:

- Information support
- Clinical assistance
- Decision support

Doctors remain responsible for medical decisions.

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

# Backend Architecture

CareSync uses a hybrid backend architecture to support both hospital operations and AI-powered healthcare features.

---

## Primary Backend API

Preferred:

- Node.js
- Express.js

Responsibilities:

- User authentication and authorization
- Patient management
- Doctor management
- Appointment scheduling
- Hospital workflow APIs
- Notifications
- Role-based access control
- Communication between frontend and services

Node.js handles the main application logic and real-time hospital interactions.

---

## AI Services Backend

Preferred:

- Python
- FastAPI

Responsibilities:

- Gemini API integration
- Medical report summarization
- Patient history summarization
- Clinical note assistance
- Document processing
- Machine Learning model serving
- Healthcare prediction services

Python is used because of its strong ecosystem for:

- Machine Learning
- Natural Language Processing
- Data Analysis
- AI Model Deployment

---

## Database

Preferred:

- PostgreSQL

Responsibilities:

- Patient records
- Doctor profiles
- Appointment data
- Medical reports metadata
- Hospital workflows
- Workload analytics data

PostgreSQL is preferred because healthcare data is highly structured and requires reliable relational storage.

---

## Cache Layer

Preferred:

- Redis

Responsibilities:

- Real-time patient queues
- Waiting time updates
- Notifications
- Frequently accessed data
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
- Documents
- Images
- Healthcare files

Large files should not be stored directly inside the database.

---

## AI Platform

Preferred:

- Gemini API
- Machine Learning Services

AI capabilities:

- Medical document understanding
- Patient-friendly explanations
- Clinical assistance
- Report summarization
- Workflow automation
- Healthcare analytics

Important:

AI provides assistance and decision support only.

AI must never replace professional medical judgment.

---

## Final Architecture

Frontend:
- React.js
- TypeScript
- Tailwind CSS

Backend:
- Node.js
- Express.js

AI Backend:
- Python
- FastAPI

Database:
- PostgreSQL

Cache:
- Redis

Storage:
- Cloud Object Storage

AI:
- Gemini API
- Machine Learning Models

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
4. Implement clean modular code.
5. Explain testing steps.

Never:

- Modify unrelated files.
- Create unnecessary dependencies.
- Duplicate components.
- Ignore existing architecture.

---

# UI Design System

## Theme

CareSync uses:

# Aurora Glassmorphism

The design should feel:

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

Recommended:

background: rgba(255,255,255,0.65);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.45);
border-radius: 20px;

Use glass for:

- Sidebar
- Navbar
- Dashboard cards
- AI assistant panels
- Appointment cards
- Floating widgets

Avoid:

- Excessive transparency
- Low contrast
- Glass effects everywhere

Healthcare readability is more important than visual effects.

---

# Dashboard Design

## Doctor Dashboard

Priority: Reducing workload.

Features:

- Today's appointments
- Patient queue
- Patient timeline
- Previous reports
- AI generated summaries
- Pending tasks
- Documentation assistance
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

# Healthcare Data Rules

Always:

- Protect patient privacy.
- Avoid unnecessary personal information.
- Use secure data handling.
- Use consent-based workflows.

---

# Animation Rules

Use subtle animations only:

Allowed:

- Hover elevation
- Smooth transitions
- Sidebar animation
- Page entrance effects

Avoid:

- Gaming-style effects
- Excessive motion
- Distracting animations

---

# Feature Priority

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
- Burnout risk prediction
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
