# CareSync Platform - Complete Implementation Guide

## Project Status

✅ **Phase 1 Foundation Complete**
- Project structure initialized
- Database schema designed (PostgreSQL)
- Server middleware configured
- Route structure established
- Data files validated (441K+ records)
- Comprehensive implementation plan documented

---

## Quick Start

### 1. Prerequisites

```bash
# Verify installations
node --version      # v18+ required
npm --version       # v8+ required
```

### 2. Install Dependencies

```bash
# From project root
cd server && npm install
cd ../client && npm install
cd ..
```

### 3. Configure Environment

```bash
# Backend configuration
cp server/.env.example server/.env

# Edit server/.env with your settings:
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/caresync
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:5173

# Frontend configuration  
cp client/.env.example client/.env

# Edit client/.env:
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### 4. Database Setup

```bash
# Create PostgreSQL database
createdb caresync

# Or if using Docker:
docker run --name postgres-caresync \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=caresync \
  -p 5432:5432 \
  -d postgres:15
```

### 5. Database Migrations

```bash
cd server

# Run migrations (coming soon)
npm run db:migrate

# Seed with CSV data
npm run db:seed

# Verify connection
npm run db:status
```

### 6. Run Development Servers

```bash
# From project root - start both concurrently
npm run dev

# Or separately:
# Terminal 1 - Backend
cd server && npm run dev
# Expected: Server running at http://localhost:5000

# Terminal 2 - Frontend
cd client && npm run dev
# Expected: App running at http://localhost:5173
```

### 7. Verify Setup

```bash
# Check backend health
curl http://localhost:5000/health

# Should return:
# {"status":"ok","timestamp":"2024-01-01T00:00:00Z","environment":"development"}

# Check frontend
open http://localhost:5173
```

---

## Project Structure Reference

### Backend (`/server`)

```
server/
├── src/
│   ├── server.ts                  # Express app entry point
│   ├── middleware/
│   │   ├── auth.ts               # JWT authentication
│   │   ├── errorHandler.ts       # Error handling
│   │   ├── requestLogger.ts      # Request logging
│   │   └── corsConfig.ts         # CORS configuration
│   ├── routes/
│   │   ├── auth.ts               # /api/auth endpoints
│   │   ├── appointments.ts       # /api/appointments endpoints
│   │   ├── patients.ts           # /api/patients endpoints
│   │   ├── doctors.ts            # /api/doctors endpoints
│   │   └── analytics.ts          # /api/analytics endpoints
│   ├── controllers/              # (To be implemented)
│   │   ├── authController.ts
│   │   ├── appointmentController.ts
│   │   ├── patientController.ts
│   │   ├── doctorController.ts
│   │   └── analyticsController.ts
│   ├── services/                 # (To be implemented)
│   │   ├── authService.ts
│   │   ├── appointmentService.ts
│   │   ├── patientService.ts
│   │   ├── doctorService.ts
│   │   └── analyticsService.ts
│   ├── database/
│   │   ├── schema.sql            # PostgreSQL schema
│   │   ├── migrations/           # Migration files
│   │   ├── migrate.ts            # Migration runner
│   │   ├── seed.ts               # Data seeding from CSVs
│   │   └── connection.ts         # DB connection pool
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Utilities
│       ├── jwt.ts
│       ├── password.ts
│       └── validators.ts
├── tests/                        # Test files
├── package.json
├── tsconfig.json
└── .env.example
```

### Frontend (`/client`)

```
client/
├── src/
│   ├── pages/                    # (To be implemented)
│   │   ├── LoginPage.tsx
│   │   ├── DoctorDashboardPage.tsx
│   │   ├── PatientDashboardPage.tsx
│   │   └── AdminDashboardPage.tsx
│   ├── components/               # (To be implemented)
│   │   ├── layouts/
│   │   ├── auth/
│   │   ├── doctor/
│   │   ├── patient/
│   │   ├── admin/
│   │   └── common/
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # API service layer
│   │   └── api.ts
│   ├── stores/                   # State management
│   ├── types/                    # TypeScript types
│   ├── utils/                    # Utility functions
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── .env.example
```

### Data (`/data`)

```
data/
├── appointments.csv              # 100K records
├── patients.csv                  # 20K records
├── doctors.csv                   # 500 records
├── clinics.csv                   # 50 records
├── staff.csv                     # 1K records
├── payments.csv                  # 100K records
├── prescriptions.csv             # 100K records
├── treatments.csv                # 100K records
├── patient_insurance.txt         # 20K records
├── doctor_consultation_hours.csv # 500 records [SYNTHETIC]
├── doctor_workload_metrics.csv   # 500 records [SYNTHETIC]
├── appointment_outcomes.csv      # 100K records [SYNTHETIC]
├── patient_medical_history.csv   # 20K records [SYNTHETIC]
└── hospital_occupancy.csv        # 3K records [SYNTHETIC]
```

---

## API Endpoints Reference

### Health Check
- `GET /health` - Check server status (no auth required)

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout (requires auth)

### Appointments
- `GET /api/appointments` - List appointments (role-filtered)
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Patients
- `GET /api/patients` - List patients (admin/doctor)
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient
- `GET /api/patients/:id/appointments` - Patient's appointments
- `GET /api/patients/:id/medical-history` - Medical records

### Doctors
- `GET /api/doctors` - List doctors
- `GET /api/doctors/:id` - Get doctor profile
- `GET /api/doctors/:id/workload` - Workload metrics
- `GET /api/doctors/:id/appointments` - Doctor's appointments

### Analytics (Admin/Owner only)
- `GET /api/analytics/doctor-workload` - Doctor workload trends
- `GET /api/analytics/clinic-occupancy` - Clinic occupancy data
- `GET /api/analytics/patient-outcomes` - Treatment outcomes
- `GET /api/analytics/financial` - Revenue reports

---

## Implementation Roadmap

### Phase 1A: Foundation (Weeks 1-2) - **IN PROGRESS**
- [x] Project structure
- [x] Database schema design
- [x] Server middleware setup
- [x] Route structure
- [ ] Database migrations
- [ ] CSV data seeding
- [ ] Authentication implementation

**Next Task:** Run `npm run db:migrate` and `npm run db:seed`

### Phase 1B: Core Features (Weeks 3-5)
- [ ] Authentication controller & JWT logic
- [ ] User registration & login flows
- [ ] Patient model & API endpoints
- [ ] Doctor model & API endpoints  
- [ ] Appointment CRUD operations
- [ ] Patient dashboard UI
- [ ] Doctor dashboard UI

### Phase 1C: Admin & Analytics (Weeks 6-7)
- [ ] Admin dashboard UI
- [ ] Analytics service & endpoints
- [ ] Hospital overview charts
- [ ] Doctor workload visualization
- [ ] Financial reporting

### Phase 1D: Polish & Deploy (Week 8)
- [ ] UI/UX refinement
- [ ] Performance optimization
- [ ] Security audit
- [ ] Full test coverage
- [ ] Production deployment

---

## Database Schema Overview

### Core Tables

**users** - System authentication
- user_id (UUID)
- email, password_hash
- role (PATIENT|DOCTOR|NURSE|ADMIN|OWNER)
- status (ACTIVE|INACTIVE|SUSPENDED)

**patients** - Patient profiles
- patient_id (UUID)
- user_id (FK → users)
- full_name, date_of_birth, gender
- phone, email, address
- blood_group, emergency_contact

**doctors** - Doctor profiles
- doctor_id (UUID)
- user_id (FK → users)
- full_name, specialty
- clinic_id (FK → clinics)
- license_number, qualifications

**appointments** - Appointment records
- appointment_id (UUID)
- patient_id, doctor_id, clinic_id (FKs)
- appointment_date, appointment_time
- status (PENDING|CONFIRMED|IN_PROGRESS|COMPLETED|CANCELLED)
- reason_for_visit, appointment_duration_minutes

**payments** - Financial transactions
- payment_id (UUID)
- patient_id, appointment_id, treatment_id (FKs)
- amount_paid, payment_method, payment_date
- status (PENDING|COMPLETED|FAILED|REFUNDED)

### Analytics Tables

**doctor_workload_metrics** - Doctor performance data
- doctor_id (FK)
- completed_appointments, pending_appointments
- burnout_risk_level, workload_intensity_score
- average_consultation_time_minutes

**appointment_outcomes** - Treatment results
- appointment_id (FK)
- outcome (IMPROVED|STABLE|WORSENED|REFERRED|HOSPITALIZED)
- clinical_notes, follow_up_required

**hospital_occupancy** - Capacity tracking
- clinic_id, occupancy_date
- total_beds, occupied_beds, occupancy_rate

---

## Authentication & Authorization

### User Roles & Permissions

**PATIENT**
- View own appointments, medical records, prescriptions
- Book, reschedule, cancel own appointments
- View own profile

**DOCTOR**
- View assigned patients
- View own appointments & patient queue
- Record appointment outcomes
- View own workload metrics
- Update own availability

**NURSE**
- View patients (clinic-scoped)
- Manage patient tasks
- Send notifications

**ADMIN**
- Full clinic management
- View all analytics
- Manage users (clinic-scoped)
- Generate reports

**OWNER**
- Full system access
- Multi-clinic oversight
- System administration

### JWT Token Format

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "DOCTOR",
  "permissions": ["READ_OWN_APPOINTMENTS", "RECORD_OUTCOMES"],
  "iat": 1234567890,
  "exp": 1234571490
}
```

---

## Testing Strategy

### Running Tests

```bash
# Backend unit tests
cd server
npm run test

# Backend integration tests  
npm run test:integration

# Frontend component tests
cd ../client
npm run test

# E2E tests (coming soon)
npm run test:e2e
```

### Test Coverage Goals

- Backend: 80%+ coverage on services/controllers
- Frontend: 70%+ coverage on components
- Integration: Full appointment lifecycle
- E2E: Critical user journeys

---

## Deployment

### Local Development

```bash
npm run dev  # Runs both frontend and backend
```

### Production Build

```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd ../client
npm run build
# Deploy dist/ folder to CDN/static host
```

### Environment Variables

**Backend (.env)**
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/caresync
JWT_SECRET=<strong-random-key>
JWT_EXPIRY=3600
REDIS_URL=redis://host:6379
CORS_ORIGIN=https://caresync.app
GEMINI_API_KEY=<api-key>
```

**Frontend (.env)**
```
VITE_API_URL=https://api.caresync.app
VITE_ENV=production
```

---

## Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -U postgres -h localhost -c "SELECT 1"

# Check database exists
psql -U postgres -l | grep caresync

# Reset database (warning: destructive)
dropdb caresync
createdb caresync
npm run db:migrate
npm run db:seed
```

### Backend Won't Start

```bash
# Check port 5000 availability
lsof -i :5000

# Clear node_modules and reinstall
rm -rf server/node_modules package-lock.json
npm install
```

### Frontend Dev Server Issues

```bash
# Vite port conflict - use different port
npm run dev -- --port 3000

# Clear cache
rm -rf client/.vite
npm run dev
```

### JWT/Auth Errors

- Verify JWT_SECRET matches between server and test
- Check token expiration: `JWT_EXPIRY=3600` (1 hour)
- Ensure Authorization header format: `Bearer <token>`

---

## Key Files to Review

1. **server/src/server.ts** - Server entry point, middleware setup
2. **server/src/database/schema.sql** - Complete database schema
3. **server/src/middleware/auth.ts** - Authentication & RBAC
4. **server/src/middleware/errorHandler.ts** - Error handling patterns
5. **DATA_DICTIONARY.md** - Data structure reference
6. **DATA_SUMMARY.md** - Analytics use cases

---

## Next Immediate Steps

1. **Install dependencies**: `npm install` in both server/ and client/
2. **Set up database**: Create PostgreSQL database, run migrations
3. **Load data**: Seed database with CSV files
4. **Test API**: Verify endpoints with curl/Postman
5. **Build auth**: Implement login/register flows
6. **Create dashboards**: Start with doctor dashboard

---

## Resources

- **CLAUDE.md** - Project mission & architecture decisions
- **IMPLEMENTATION_GUIDE.md** (this file) - Setup & development guide
- **DATA_DICTIONARY.md** - Complete data schema reference
- **data_quality_check.py** - Data validation script
- **generate_synthetic_data.py** - Synthetic data generation

---

## Support & Questions

For implementation details, refer to the comprehensive **implementation plan** generated earlier which includes:
- Complete API endpoint specifications
- Controller/service layer architecture
- Frontend component hierarchy
- Testing strategy
- Deployment pipeline

The plan covers Phases 1A-1D with 8-week timeline to production MVP.

---

**Last Updated:** 2026-07-29  
**Status:** Phase 1A Foundation Complete - Ready for Database Setup  
**Next Phase:** Database Migrations & Data Seeding
