import pandas as pd
import numpy as np
from datetime import datetime
import os

print("=" * 80)
print("DATA QUALITY ANALYSIS - CARESYNC CLINIC MANAGEMENT")
print("=" * 80)

# Load all dataframes
dfs = {}
dfs['appointments'] = pd.read_csv('data/appointments.csv')
dfs['clinics'] = pd.read_csv('data/clinics.csv')
dfs['doctors'] = pd.read_csv('data/doctors.csv')
dfs['patients'] = pd.read_csv('data/patients.csv')
dfs['patient_insurance'] = pd.read_csv('data/patient_insurance.txt', sep='|', header=None,
                                        names=['patient_id', 'insurance_status', 'provider', 'coverage_level'])
dfs['payments'] = pd.read_csv('data/payments.csv')
dfs['prescriptions'] = pd.read_csv('data/prescriptions.csv')
dfs['staff'] = pd.read_csv('data/staff.csv')
dfs['treatments'] = pd.read_csv('data/treatments.csv')

# 1. Row counts and basic info
print("\n1. ROW COUNTS & SCHEMAS")
print("-" * 80)
for name, df in dfs.items():
    print(f"\n{name.upper()}: {len(df)} rows")
    print(f"  Columns: {', '.join(df.columns.tolist())}")
    print(f"  Data types:\n{df.dtypes.to_string().replace(chr(10), chr(10) + '    ')}")

# 2. Missing values
print("\n\n2. MISSING VALUES")
print("-" * 80)
missing_found = False
for name, df in dfs.items():
    missing = df.isnull().sum()
    if missing.sum() > 0:
        missing_found = True
        print(f"\n{name.upper()}:")
        print(missing[missing > 0].to_string())

if not missing_found:
    print("[OK] NO MISSING VALUES FOUND")

# 3. Duplicates
print("\n\n3. DUPLICATE RECORDS")
print("-" * 80)
duplicates_found = False
for name, df in dfs.items():
    # Check for full row duplicates
    dup_count = df.duplicated().sum()
    if dup_count > 0:
        duplicates_found = True
        print(f"\n{name.upper()}: {dup_count} duplicate rows")

    # Check for duplicate IDs (primary key)
    id_col = [col for col in df.columns if col.endswith('_id') and col != 'appointment_id' and col != 'clinic_id' and col != 'doctor_id' and col != 'patient_id' and col != 'payment_id' and col != 'prescription_id' and col != 'staff_id' and col != 'treatment_id']
    if name == 'appointments':
        id_col = ['appointment_id']
    elif name == 'clinics':
        id_col = ['clinic_id']
    elif name == 'doctors':
        id_col = ['doctor_id']
    elif name == 'patients':
        id_col = ['patient_id']
    elif name == 'payments':
        id_col = ['payment_id']
    elif name == 'prescriptions':
        id_col = ['prescription_id']
    elif name == 'staff':
        id_col = ['staff_id']
    elif name == 'treatments':
        id_col = ['treatment_id']
    elif name == 'patient_insurance':
        id_col = ['patient_id']

    if id_col and id_col[0] in df.columns:
        dup_ids = df[id_col[0]].duplicated().sum()
        if dup_ids > 0:
            duplicates_found = True
            print(f"\n{name.upper()}: {dup_ids} duplicate IDs in {id_col[0]}")

if not duplicates_found:
    print("[OK] NO DUPLICATE RECORDS FOUND")

# 4. Date format validation
print("\n\n4. DATE FORMAT VALIDATION")
print("-" * 80)
date_columns = {
    'appointments': ['appointment_date'],
    'patients': ['date_of_birth', 'registration_date'],
    'payments': ['payment_date']
}

for table, cols in date_columns.items():
    for col in cols:
        if col in dfs[table].columns:
            try:
                pd.to_datetime(dfs[table][col], format='%m/%d/%Y')
                print(f"[OK] {table}.{col}: Valid MM/DD/YYYY format")
            except Exception as e:
                print(f"✗ {table}.{col}: Format issue - {str(e)[:50]}")

# 5. Referential Integrity
print("\n\n5. REFERENTIAL INTEGRITY (Foreign Keys)")
print("-" * 80)

# appointments.patient_id -> patients.patient_id
invalid_patients = dfs['appointments']['patient_id'].isin(dfs['patients']['patient_id']).sum()
total_appt = len(dfs['appointments'])
print(f"\n[OK] Appointments -> Patients: {invalid_patients}/{total_appt} valid references")
if invalid_patients < total_appt:
    print(f"  [WARNING] {total_appt - invalid_patients} appointments reference non-existent patients")

# appointments.doctor_id -> doctors.doctor_id
valid_doctors = dfs['appointments']['doctor_id'].isin(dfs['doctors']['doctor_id']).sum()
print(f"[OK] Appointments -> Doctors: {valid_doctors}/{total_appt} valid references")
if valid_doctors < total_appt:
    print(f"  [WARNING] {total_appt - valid_doctors} appointments reference non-existent doctors")

# appointments.clinic_id -> clinics.clinic_id
valid_clinics = dfs['appointments']['clinic_id'].isin(dfs['clinics']['clinic_id']).sum()
print(f"[OK] Appointments -> Clinics: {valid_clinics}/{total_appt} valid references")
if valid_clinics < total_appt:
    print(f"  [WARNING] {total_appt - valid_clinics} appointments reference non-existent clinics")

# doctors.clinic_id -> clinics.clinic_id
valid_doctor_clinics = dfs['doctors']['clinic_id'].isin(dfs['clinics']['clinic_id']).sum()
total_doctors = len(dfs['doctors'])
print(f"[OK] Doctors -> Clinics: {valid_doctor_clinics}/{total_doctors} valid references")
if valid_doctor_clinics < total_doctors:
    print(f"  [WARNING] {total_doctors - valid_doctor_clinics} doctors reference non-existent clinics")

# staff.clinic_id -> clinics.clinic_id
valid_staff_clinics = dfs['staff']['clinic_id'].isin(dfs['clinics']['clinic_id']).sum()
total_staff = len(dfs['staff'])
print(f"[OK] Staff -> Clinics: {valid_staff_clinics}/{total_staff} valid references")
if valid_staff_clinics < total_staff:
    print(f"  [WARNING] {total_staff - valid_staff_clinics} staff reference non-existent clinics")

# payments.appointment_id -> appointments.appointment_id
valid_payments = dfs['payments']['appointment_id'].isin(dfs['appointments']['appointment_id']).sum()
total_payments = len(dfs['payments'])
print(f"[OK] Payments -> Appointments: {valid_payments}/{total_payments} valid references")
if valid_payments < total_payments:
    print(f"  [WARNING] {total_payments - valid_payments} payments reference non-existent appointments")

# prescriptions.appointment_id -> appointments.appointment_id
valid_prescriptions = dfs['prescriptions']['appointment_id'].isin(dfs['appointments']['appointment_id']).sum()
total_prescriptions = len(dfs['prescriptions'])
print(f"[OK] Prescriptions -> Appointments: {valid_prescriptions}/{total_prescriptions} valid references")
if valid_prescriptions < total_prescriptions:
    print(f"  [WARNING] {total_prescriptions - valid_prescriptions} prescriptions reference non-existent appointments")

# treatments.appointment_id -> appointments.appointment_id
valid_treatments = dfs['treatments']['appointment_id'].isin(dfs['appointments']['appointment_id']).sum()
total_treatments = len(dfs['treatments'])
print(f"[OK] Treatments -> Appointments: {valid_treatments}/{total_treatments} valid references")
if valid_treatments < total_treatments:
    print(f"  [WARNING] {total_treatments - valid_treatments} treatments reference non-existent appointments")

# patient_insurance.patient_id -> patients.patient_id
valid_insurance = dfs['patient_insurance']['patient_id'].isin(dfs['patients']['patient_id']).sum()
total_insurance = len(dfs['patient_insurance'])
print(f"[OK] Patient Insurance -> Patients: {valid_insurance}/{total_insurance} valid references")
if valid_insurance < total_insurance:
    print(f"  [WARNING] {total_insurance - valid_insurance} insurance records reference non-existent patients")

# 6. Value validation
print("\n\n6. VALUE VALIDATION")
print("-" * 80)

# Check appointment statuses
print(f"\nAppointment statuses: {dfs['appointments']['status'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['appointments']['status'].value_counts())}")

# Check payment statuses
print(f"\nPayment statuses: {dfs['payments']['payment_status'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['payments']['payment_status'].value_counts())}")

# Check payment methods
print(f"\nPayment methods: {dfs['payments']['payment_method'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['payments']['payment_method'].value_counts())}")

# Check treatment statuses
print(f"\nTreatment statuses: {dfs['treatments']['treatment_status'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['treatments']['treatment_status'].value_counts())}")

# Check treatment types
print(f"\nTreatment types: {dfs['treatments']['treatment_type'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['treatments']['treatment_type'].value_counts())}")

# Check insurance statuses
print(f"\nInsurance statuses: {dfs['patient_insurance']['insurance_status'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['patient_insurance']['insurance_status'].value_counts())}")

# Check staff roles
print(f"\nStaff roles: {dfs['staff']['role'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['staff']['role'].value_counts())}")

# Check specialties
print(f"\nDoctor specialties: {len(dfs['doctors']['specialty'].unique())} unique")
print(f"  Top 10: {dfs['doctors']['specialty'].value_counts().head(10).to_dict()}")

# Check gender
print(f"\nPatient genders: {dfs['patients']['gender'].unique().tolist()}")
print(f"  Value counts: {dict(dfs['patients']['gender'].value_counts())}")

# Check blood groups
print(f"\nBlood groups: {dfs['patients']['blood_group'].unique().tolist()}")

# 7. Data range validation
print("\n\n7. DATA RANGE & STATISTICS")
print("-" * 80)

# Payment amounts
print(f"\nPayment amounts:")
print(f"  Min: ${dfs['payments']['payment_amount'].min():.2f}")
print(f"  Max: ${dfs['payments']['payment_amount'].max():.2f}")
print(f"  Mean: ${dfs['payments']['payment_amount'].mean():.2f}")
print(f"  Median: ${dfs['payments']['payment_amount'].median():.2f}")

# Treatment costs
print(f"\nTreatment costs:")
print(f"  Min: ${dfs['treatments']['treatment_cost'].min():.2f}")
print(f"  Max: ${dfs['treatments']['treatment_cost'].max():.2f}")
print(f"  Mean: ${dfs['treatments']['treatment_cost'].mean():.2f}")
print(f"  Median: ${dfs['treatments']['treatment_cost'].median():.2f}")

# Patient age calculation
dfs['patients']['date_of_birth'] = pd.to_datetime(dfs['patients']['date_of_birth'], format='%m/%d/%Y')
dfs['patients']['age'] = (datetime.now() - dfs['patients']['date_of_birth']).dt.days / 365.25
print(f"\nPatient ages:")
print(f"  Min: {dfs['patients']['age'].min():.1f} years")
print(f"  Max: {dfs['patients']['age'].max():.1f} years")
print(f"  Mean: {dfs['patients']['age'].mean():.1f} years")
print(f"  Median: {dfs['patients']['age'].median():.1f} years")

print("\n" + "=" * 80)
print("DATA QUALITY CHECK COMPLETE")
print("=" * 80)
