# Project

CareSync is a smart hospital management web application that connects
patients, doctors, and hospital administrators in one platform.

Goal: Simplify the patient journey, reduce doctors' administrative workload,
and help hospital administrators manage operations efficiently.

Stack:
- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas + Mongoose
- Authentication: JWT + bcrypt
- AI Integration: Gemini API
- Charts: Chart.js

Main roles:
- Patient
- Doctor
- Hospital Admin


# Core Features

Patient:
- Register/Login
- Patient dashboard
- Search doctors
- Book appointments
- View appointments
- View medical records
- Upload medical reports
- AI report simplification
- Healthcare assistant

Doctor:
- Doctor dashboard
- View daily appointments
- View patient records
- Add consultation notes
- Update appointment status
- Manage schedule

Admin:
- Admin dashboard
- Manage doctors and patients
- Manage departments
- Monitor appointments
- View hospital analytics


# Conventions

- Use React functional components.
- Use reusable components.
- Use Tailwind CSS for styling.
- Use React Router for navigation.
- Keep pages in src/pages/.
- Keep reusable components in src/components/.
- Keep API calls in src/services/.
- Use meaningful variable and function names.
- Avoid duplicate code.
- Use async/await for asynchronous operations.
- Keep components small and readable.
- Build responsive pages for desktop and mobile.
- Follow the existing project structure and coding style.


# Testing

Before considering a feature complete:

- Check for build errors.
- Test important user flows manually.
- Test API success and failure cases.
- Test form validation.
- Test authentication and role-based routes.
- Test responsive layouts.
- Fix existing errors before adding new features.

Important flows to test:

Patient Login → Dashboard → Book Appointment

Doctor Login → View Appointment → View Patient

Admin Login → Dashboard → Hospital Analytics


# Git Workflow

- Create a separate branch for each major feature.
- Use meaningful commit messages.

Examples:

feat: add appointment booking
feat: add patient dashboard
feat: add doctor dashboard
fix: resolve login validation
refactor: improve appointment service

- Do not push directly to main.
- Do not commit .env files.
- Do not commit API keys or passwords.
- Pull latest changes before merging.


# Boundaries

- Do not delete files without asking.
- Do not modify .env without asking.
- Do not install new packages without confirmation.
- Do not change the tech stack without confirmation.
- Do not rewrite working features unnecessarily.
- Do not modify unrelated files.
- Do not expose API keys in frontend code.
- Do not store plain-text passwords.
- Do not remove existing functionality while adding a feature.
- Do not use real patient data.


# AI Safety

The healthcare assistant is for informational assistance only.

- Never claim to provide a definitive medical diagnosis.
- Never present AI output as a replacement for a doctor.
- Clearly label AI-generated medical explanations.
- Encourage professional medical attention for potentially serious symptoms.
- Medical report explanations must be presented as simplified informational
  summaries, not clinical conclusions.


# Development Priority

This is a 3-day MVP.

Priority order:

1. Authentication
2. Patient Dashboard
3. Doctor Dashboard
4. Admin Dashboard
5. Appointment Booking
6. Medical Records
7. AI Assistant
8. Report Simplifier
9. Analytics
10. UI Polish

Working features are more important than having many incomplete features.

Do not over-engineer the project.