-- CareSync Database Schema
-- Complete healthcare clinic management system

-- ============================================================================
-- CORE ENTITIES
-- ============================================================================

-- Clinics/Hospitals
CREATE TABLE IF NOT EXISTS clinics (
    clinic_id VARCHAR(20) PRIMARY KEY,
    clinic_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    opening_hours VARCHAR(50) NOT NULL,
    clinic_type VARCHAR(50) NOT NULL CHECK (clinic_type IN ('Private', 'Public')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients
CREATE TABLE IF NOT EXISTS patients (
    patient_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    gender CHAR(1) NOT NULL CHECK (gender IN ('M', 'F', 'O')),
    date_of_birth DATE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address VARCHAR(255),
    registration_date DATE NOT NULL,
    blood_group VARCHAR(10),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors
CREATE TABLE IF NOT EXISTS doctors (
    doctor_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    clinic_id VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id)
);

-- Staff (Nurses, Receptionists, etc.)
CREATE TABLE IF NOT EXISTS staff (
    staff_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Nurse', 'Receptionist', 'Manager', 'Admin')),
    clinic_id VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id)
);

-- ============================================================================
-- INSURANCE & MEDICAL HISTORY
-- ============================================================================

-- Patient Insurance
CREATE TABLE IF NOT EXISTS patient_insurance (
    patient_id VARCHAR(20) PRIMARY KEY,
    insurance_status VARCHAR(50) NOT NULL CHECK (insurance_status IN ('Insured', 'Not Insured')),
    provider VARCHAR(100),
    coverage_level VARCHAR(50) CHECK (coverage_level IN ('High', 'Medium', 'Low')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- Patient Medical History
CREATE TABLE IF NOT EXISTS patient_medical_history (
    patient_id VARCHAR(20) PRIMARY KEY,
    comorbidities TEXT,
    active_medications_count INTEGER DEFAULT 0,
    surgical_history TEXT,
    allergies TEXT,
    last_health_checkup DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- ============================================================================
-- APPOINTMENTS & CLINICAL DATA
-- ============================================================================

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20) NOT NULL,
    doctor_id VARCHAR(20) NOT NULL,
    clinic_id VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Completed', 'Pending', 'Cancelled')),
    reason_for_visit VARCHAR(255),
    appointment_duration_minutes INTEGER,
    waiting_time_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id)
);

-- Appointment Outcomes
CREATE TABLE IF NOT EXISTS appointment_outcomes (
    appointment_id VARCHAR(20) PRIMARY KEY,
    outcome VARCHAR(100) CHECK (outcome IN ('Improved', 'Stable', 'Worsened', 'Referred to Specialist', 'Hospitalized', 'No Visit', 'Pending')),
    clinical_notes TEXT,
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_days INTEGER,
    follow_up_appointment_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
    FOREIGN KEY (follow_up_appointment_id) REFERENCES appointments(appointment_id)
);

-- Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
    prescription_id VARCHAR(20) PRIMARY KEY,
    appointment_id VARCHAR(20) NOT NULL,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    instructions TEXT NOT NULL,
    quantity INTEGER,
    duration_days INTEGER,
    refills_remaining INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

-- Treatments
CREATE TABLE IF NOT EXISTS treatments (
    treatment_id VARCHAR(20) PRIMARY KEY,
    appointment_id VARCHAR(20) NOT NULL,
    treatment_type VARCHAR(100) NOT NULL CHECK (treatment_type IN ('Surgery', 'Therapy', 'Checkup', 'Diagnosis', 'Monitoring')),
    treatment_description TEXT,
    treatment_cost DECIMAL(10, 2) NOT NULL,
    treatment_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (treatment_status IN ('Pending', 'Ongoing', 'Completed', 'Cancelled')),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

-- ============================================================================
-- FINANCIAL DATA
-- ============================================================================

-- Payments
CREATE TABLE IF NOT EXISTS payments (
    payment_id VARCHAR(20) PRIMARY KEY,
    appointment_id VARCHAR(20) NOT NULL,
    payment_date DATE NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Card', 'Cash', 'Insurance', 'UPI', 'Cheque')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

-- ============================================================================
-- DOCTOR ANALYTICS & SCHEDULING
-- ============================================================================

-- Doctor Consultation Hours
CREATE TABLE IF NOT EXISTS doctor_consultation_hours (
    doctor_id VARCHAR(20) PRIMARY KEY,
    days_per_week INTEGER DEFAULT 5 CHECK (days_per_week BETWEEN 1 AND 7),
    shift_duration_hours INTEGER DEFAULT 8 CHECK (shift_duration_hours BETWEEN 1 AND 24),
    shift_start_time TIME DEFAULT '09:00',
    shift_end_time TIME DEFAULT '17:00',
    break_start_time TIME,
    break_end_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- Doctor Workload Metrics
CREATE TABLE IF NOT EXISTS doctor_workload_metrics (
    doctor_id VARCHAR(20) PRIMARY KEY,
    total_appointments INTEGER DEFAULT 0,
    completed_appointments INTEGER DEFAULT 0,
    pending_appointments INTEGER DEFAULT 0,
    cancelled_appointments INTEGER DEFAULT 0,
    avg_consultation_minutes DECIMAL(5, 2),
    avg_waiting_time_minutes DECIMAL(5, 2),
    weekly_appointments DECIMAL(5, 2),
    hours_per_week INTEGER,
    workload_score DECIMAL(5, 2) DEFAULT 0 CHECK (workload_score BETWEEN 0 AND 100),
    burnout_risk_score DECIMAL(6, 2) DEFAULT 0,
    burnout_risk_level VARCHAR(50) CHECK (burnout_risk_level IN ('Low', 'Medium', 'High')),
    last_updated DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- ============================================================================
-- HOSPITAL OPERATIONS
-- ============================================================================

-- Hospital Occupancy
CREATE TABLE IF NOT EXISTS hospital_occupancy (
    occupancy_id SERIAL PRIMARY KEY,
    clinic_id VARCHAR(20) NOT NULL,
    occupancy_date DATE NOT NULL,
    total_beds INTEGER NOT NULL,
    occupied_beds INTEGER NOT NULL,
    occupancy_rate DECIMAL(5, 2),
    emergency_capacity_used INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id),
    UNIQUE (clinic_id, occupancy_date)
);

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

-- Users (for system access: doctors, staff, patients, admins)
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN', 'OWNER')),
    patient_id VARCHAR(20),
    doctor_id VARCHAR(20),
    staff_id VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

-- ============================================================================
-- AUDIT & LOGGING
-- ============================================================================

-- Audit Log
CREATE TABLE IF NOT EXISTS audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id UUID,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(255),
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_clinic ON appointments(clinic_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

CREATE INDEX IF NOT EXISTS idx_doctors_clinic ON doctors(clinic_id);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);

CREATE INDEX IF NOT EXISTS idx_staff_clinic ON staff(clinic_id);

CREATE INDEX IF NOT EXISTS idx_payments_appointment ON payments(appointment_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

CREATE INDEX IF NOT EXISTS idx_prescriptions_appointment ON prescriptions(appointment_id);

CREATE INDEX IF NOT EXISTS idx_treatments_appointment ON treatments(appointment_id);
CREATE INDEX IF NOT EXISTS idx_treatments_status ON treatments(treatment_status);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE INDEX IF NOT EXISTS idx_occupancy_clinic_date ON hospital_occupancy(clinic_id, occupancy_date);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

-- Doctor Performance View
CREATE OR REPLACE VIEW doctor_performance_view AS
SELECT
    d.doctor_id,
    d.full_name,
    d.specialty,
    c.clinic_name,
    COUNT(CASE WHEN a.status = 'Completed' THEN 1 END) as completed_count,
    COUNT(CASE WHEN a.status = 'Pending' THEN 1 END) as pending_count,
    AVG(CASE WHEN a.appointment_duration_minutes IS NOT NULL THEN a.appointment_duration_minutes END) as avg_duration,
    AVG(CASE WHEN a.waiting_time_minutes IS NOT NULL THEN a.waiting_time_minutes END) as avg_waiting_time,
    COUNT(DISTINCT a.appointment_id) as total_appointments
FROM doctors d
LEFT JOIN clinics c ON d.clinic_id = c.clinic_id
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id, d.full_name, d.specialty, c.clinic_name;

-- Patient Visit History View
CREATE OR REPLACE VIEW patient_visit_history_view AS
SELECT
    p.patient_id,
    p.full_name,
    COUNT(a.appointment_id) as total_visits,
    COUNT(CASE WHEN a.status = 'Completed' THEN 1 END) as completed_visits,
    MAX(a.appointment_date) as last_visit_date,
    COUNT(DISTINCT d.specialty) as specialties_visited
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id
LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
GROUP BY p.patient_id, p.full_name;

-- Clinic Operations View
CREATE OR REPLACE VIEW clinic_operations_view AS
SELECT
    c.clinic_id,
    c.clinic_name,
    c.clinic_type,
    COUNT(DISTINCT d.doctor_id) as doctor_count,
    COUNT(DISTINCT s.staff_id) as staff_count,
    COUNT(DISTINCT a.patient_id) as unique_patients,
    COUNT(a.appointment_id) as total_appointments,
    SUM(CASE WHEN a.status = 'Completed' THEN 1 ELSE 0 END) as completed_appointments
FROM clinics c
LEFT JOIN doctors d ON c.clinic_id = d.clinic_id
LEFT JOIN staff s ON c.clinic_id = s.clinic_id
LEFT JOIN appointments a ON c.clinic_id = a.clinic_id
GROUP BY c.clinic_id, c.clinic_name, c.clinic_type;
