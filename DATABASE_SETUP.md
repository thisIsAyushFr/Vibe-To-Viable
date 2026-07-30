# CareSync Database Setup Guide

## Prerequisites

Install PostgreSQL 14+ from: https://www.postgresql.org/download/

Verify installation:
```bash
psql --version
```

## Step 1: Create Database

```bash
# Create the caresync database
createdb -U postgres caresync

# Or if using psql directly:
psql -U postgres -c "CREATE DATABASE caresync;"

# Verify creation
psql -U postgres -c "\l" | grep caresync
```

## Step 2: Configure Environment

Create `.env` file in `/server` directory:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/caresync
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=caresync
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=3600
CORS_ORIGIN=http://localhost:5173
```

## Step 3: Run Migrations

Create the schema and all tables:

```bash
cd server
npm run db:migrate
```

**Expected Output:**
```
========================================
  CareSync Database Migration
========================================

🔄 Executing schema...
✓ Schema created successfully
✓ All tables created
✓ All indexes created

========================================
  Migration Complete
========================================
```

**Verify tables were created:**
```bash
psql -U postgres -d caresync -c "\dt"
```

Should show 19 tables:
- clinics, patients, doctors, staff
- patient_insurance, patient_medical_history
- appointments, appointment_outcomes
- prescriptions, treatments, payments
- doctor_consultation_hours, doctor_workload_metrics
- hospital_occupancy
- users, audit_logs

## Step 4: Seed Data

Load all 441,558 records from CSV files:

```bash
cd server
npm run db:seed
```

**Expected Output:**
```
========================================
  CareSync Data Seeding
========================================

Seeding data files...

  ✓ clinics: 50 rows (XXms)
  ✓ patients: 20,000 rows (XXms)
  ✓ doctors: 500 rows (XXms)
  ✓ staff: 1,000 rows (XXms)
  ✓ patient_insurance: 20,000 rows (XXms)
  ✓ patient_medical_history: 20,000 rows (XXms)
  ✓ doctor_consultation_hours: 500 rows (XXms)
  ✓ doctor_workload_metrics: 500 rows (XXms)
  ✓ appointments: 100,000 rows (XXms)
  ✓ appointment_outcomes: 100,000 rows (XXms)
  ✓ prescriptions: 100,000 rows (XXms)
  ✓ treatments: 100,000 rows (XXms)
  ✓ payments: 100,000 rows (XXms)
  ✓ hospital_occupancy: 3,000 rows (XXms)

========================================
  Seeding Summary
========================================
  clinics                          50 rows
  patients                      20,000 rows
  doctors                          500 rows
  staff                          1,000 rows
  patient_insurance             20,000 rows
  patient_medical_history       20,000 rows
  doctor_consultation_hours        500 rows
  doctor_workload_metrics          500 rows
  appointments                100,000 rows
  appointment_outcomes         100,000 rows
  prescriptions                100,000 rows
  treatments                   100,000 rows
  payments                     100,000 rows
  hospital_occupancy             3,000 rows
  ----------------------------------------
  TOTAL: 441,558 rows in XXms
========================================

Verifying referential integrity...

  ✓ appointments.patient_id → patients.patient_id
  ✓ appointments.doctor_id → doctors.doctor_id
  ✓ appointments.clinic_id → clinics.clinic_id
  ✓ doctors.clinic_id → clinics.clinic_id
  ✓ staff.clinic_id → clinics.clinic_id
  ✓ patient_insurance.patient_id → patients.patient_id
  ✓ patient_medical_history.patient_id → patients.patient_id
  ✓ doctor_consultation_hours.doctor_id → doctors.doctor_id
  ✓ doctor_workload_metrics.doctor_id → doctors.doctor_id
  ✓ appointment_outcomes.appointment_id → appointments.appointment_id
  ✓ prescriptions.appointment_id → appointments.appointment_id
  ✓ treatments.appointment_id → appointments.appointment_id
  ✓ payments.appointment_id → appointments.appointment_id
  ✓ hospital_occupancy.clinic_id → clinics.clinic_id

✓ All referential integrity checks passed
```

**Verify data was loaded:**
```bash
psql -U postgres -d caresync -c "SELECT COUNT(*) as total_records FROM (
  SELECT COUNT(*) FROM patients UNION ALL
  SELECT COUNT(*) FROM doctors UNION ALL
  SELECT COUNT(*) FROM appointments UNION ALL
  SELECT COUNT(*) FROM payments UNION ALL
  SELECT COUNT(*) FROM treatments UNION ALL
  SELECT COUNT(*) FROM prescriptions UNION ALL
  SELECT COUNT(*) FROM clinics UNION ALL
  SELECT COUNT(*) FROM staff UNION ALL
  SELECT COUNT(*) FROM patient_insurance UNION ALL
  SELECT COUNT(*) FROM patient_medical_history UNION ALL
  SELECT COUNT(*) FROM doctor_consultation_hours UNION ALL
  SELECT COUNT(*) FROM doctor_workload_metrics UNION ALL
  SELECT COUNT(*) FROM appointment_outcomes UNION ALL
  SELECT COUNT(*) FROM hospital_occupancy
) t;"
```

Should return: **441,558 rows**

## Step 5: Verify Specific Counts

```bash
psql -U postgres -d caresync -c "
SELECT 'clinics' as table_name, COUNT(*) as count FROM clinics
UNION ALL
SELECT 'patients', COUNT(*) FROM patients
UNION ALL
SELECT 'doctors', COUNT(*) FROM doctors
UNION ALL
SELECT 'staff', COUNT(*) FROM staff
UNION ALL
SELECT 'appointments', COUNT(*) FROM appointments
UNION ALL
SELECT 'payments', COUNT(*) FROM payments
UNION ALL
SELECT 'treatments', COUNT(*) FROM treatments
UNION ALL
SELECT 'prescriptions', COUNT(*) FROM prescriptions
UNION ALL
SELECT 'patient_insurance', COUNT(*) FROM patient_insurance
UNION ALL
SELECT 'patient_medical_history', COUNT(*) FROM patient_medical_history
UNION ALL
SELECT 'doctor_consultation_hours', COUNT(*) FROM doctor_consultation_hours
UNION ALL
SELECT 'doctor_workload_metrics', COUNT(*) FROM doctor_workload_metrics
UNION ALL
SELECT 'appointment_outcomes', COUNT(*) FROM appointment_outcomes
UNION ALL
SELECT 'hospital_occupancy', COUNT(*) FROM hospital_occupancy
ORDER BY table_name;
"
```

Expected:
```
           table_name            | count
---------------------------------+--------
 appointment_outcomes            | 100000
 appointments                    | 100000
 clinics                         |     50
 doctor_consultation_hours       |    500
 doctor_workload_metrics         |    500
 doctor_medical_history          |  20000
 doctors                         |    500
 hospital_occupancy              |   3000
 patient_insurance               |  20000
 patient_medical_history         |  20000
 patients                        |  20000
 payments                        | 100000
 prescriptions                   | 100000
 staff                           |   1000
 treatments                      | 100000
---------------------------------+--------
TOTAL                            | 441558
```

## Step 6: Troubleshooting

### Database Connection Error
```
error: no pg_hba.conf entry for host "127.0.0.1", user "postgres"
```

Solution: Check PostgreSQL is running
```bash
# Windows: Restart PostgreSQL service
# Mac: brew services restart postgresql
# Linux: sudo systemctl restart postgresql
```

### Schema Creation Failed
```
ERROR: relation "clinics" already exists
```

Solution: Drop and recreate database
```bash
dropdb -U postgres caresync
createdb -U postgres caresync
npm run db:migrate
```

### Foreign Key Constraint Violation
```
ERROR: insert or update on table "appointments" violates foreign key constraint
```

Solution: Seeding scripts handle this by disabling/enabling foreign key checks

### CSV Parse Error
```
Error: ENOENT: no such file or directory, open 'data/appointments.csv'
```

Solution: Make sure data files exist in `/data` directory relative to server working directory

## Testing the Setup

Once seeding is complete, test with a simple query:

```bash
psql -U postgres -d caresync -c "
SELECT 
  d.full_name,
  COUNT(a.appointment_id) as total_appointments,
  COUNT(CASE WHEN a.status = 'Completed' THEN 1 END) as completed,
  COUNT(CASE WHEN a.status = 'Pending' THEN 1 END) as pending,
  w.burnout_risk_level
FROM doctors d
JOIN appointments a ON d.doctor_id = a.doctor_id
JOIN doctor_workload_metrics w ON d.doctor_id = w.doctor_id
GROUP BY d.full_name, w.burnout_risk_level
ORDER BY total_appointments DESC
LIMIT 10;
"
```

This query shows the top 10 busiest doctors with their workload metrics.

## Next Steps

Once database is set up and seeded:

1. Start the backend server: `npm run dev` (from server directory)
2. Proceed to STEP 2: Authentication implementation
3. Build API controllers and services

## Database Schema Reference

See `DATA_DICTIONARY.md` for complete field definitions and `server/src/database/schema.sql` for exact DDL.

### Key Relationships

```
patients ←─┐
           ├─ appointments ─┬─ payments
patients ← ┤               ├─ prescriptions
doctors  ← ┤               ├─ treatments
clinics  ← ┤               └─ appointment_outcomes
           └─ staff

patients → patient_insurance
patients → patient_medical_history

doctors → doctor_consultation_hours
doctors → doctor_workload_metrics

clinics → hospital_occupancy
```

## Common Queries

### Doctor Workload Analysis
```sql
SELECT 
  d.full_name,
  w.completed_appointments,
  w.pending_appointments,
  w.workload_score,
  w.burnout_risk_level
FROM doctors d
JOIN doctor_workload_metrics w ON d.doctor_id = w.doctor_id
WHERE w.burnout_risk_level = 'High'
ORDER BY w.burnout_risk_score DESC;
```

### Patient Appointment History
```sql
SELECT 
  p.full_name,
  a.appointment_date,
  d.full_name as doctor_name,
  a.status,
  ao.outcome
FROM patients p
JOIN appointments a ON p.patient_id = a.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id
LEFT JOIN appointment_outcomes ao ON a.appointment_id = ao.appointment_id
WHERE p.patient_id = 'P1'
ORDER BY a.appointment_date DESC;
```

### Revenue Analysis
```sql
SELECT 
  DATE_TRUNC('month', p.payment_date) as month,
  p.payment_method,
  COUNT(*) as transaction_count,
  SUM(p.payment_amount) as total_revenue
FROM payments p
GROUP BY DATE_TRUNC('month', p.payment_date), p.payment_method
ORDER BY month DESC;
```
