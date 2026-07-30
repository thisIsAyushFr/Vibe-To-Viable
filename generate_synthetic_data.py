import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

print("=" * 80)
print("SYNTHETIC DATA GENERATION - CARESYNC CLINIC ANALYTICS")
print("=" * 80)

# Seed for reproducibility
np.random.seed(42)
random.seed(42)

# Load existing data
print("\nLoading existing data...")
appointments = pd.read_csv('data/appointments.csv')
patients = pd.read_csv('data/patients.csv')
doctors = pd.read_csv('data/doctors.csv')
staff = pd.read_csv('data/staff.csv')

print(f"Loaded {len(appointments)} appointments, {len(doctors)} doctors\n")

# 1. APPOINTMENT DURATION (minutes) - varies by reason_for_visit
print("[1/5] Generating appointment durations...")
duration_by_reason = {
    'General Checkup': (15, 30),
    'Fever': (20, 45),
    'Heart Pain': (30, 60),
    'Skin Allergy': (15, 30),
    'Follow-up Visit': (10, 25),
    'Injury': (25, 50),
    'Chronic Disease Management': (20, 40),
    'Mental Health Consultation': (30, 60),
    'Vaccination': (10, 20),
    'Lab Test': (15, 30)
}

def get_duration(reason):
    if reason in duration_by_reason:
        min_d, max_d = duration_by_reason[reason]
    else:
        min_d, max_d = 15, 30
    return np.random.randint(min_d, max_d + 1)

appointments['appointment_duration_minutes'] = appointments['reason_for_visit'].apply(get_duration)

# 2. WAITING TIME (minutes)
print("[2/5] Generating waiting times...")
def get_waiting_time(status):
    if status == 'Cancelled':
        return 0
    elif status == 'Completed':
        return np.random.randint(5, 60)
    else:
        return np.random.randint(10, 90)

appointments['waiting_time_minutes'] = appointments['status'].apply(get_waiting_time)

# 3. DOCTOR CONSULTATION HOURS - shift data
print("[3/5] Generating doctor consultation hours...")
np.random.seed(42)
doctor_ids = doctors['doctor_id'].unique()
doctor_shifts = pd.DataFrame({
    'doctor_id': doctor_ids,
    'days_per_week': np.random.randint(4, 6, len(doctor_ids)),
    'shift_duration_hours': np.random.choice([8, 9, 10], len(doctor_ids)),
    'shift_start_time': np.random.choice(['08:00', '09:00', '09:30'], len(doctor_ids))
})

# Calculate shift end time
doctor_shifts['shift_end_time'] = doctor_shifts.apply(
    lambda row: (datetime.strptime(row['shift_start_time'], '%H:%M') +
                timedelta(hours=row['shift_duration_hours'])).strftime('%H:%M'), axis=1
)

doctor_shifts.to_csv('data/doctor_consultation_hours.csv', index=False)
print(f"   Created: doctor_consultation_hours.csv ({len(doctor_shifts)} records)")

# 4. DOCTOR WORKLOAD METRICS - using groupby (vectorized)
print("[4/5] Generating doctor workload metrics...")
workload_stats = appointments.groupby('doctor_id').agg({
    'appointment_id': 'count',
    'appointment_duration_minutes': 'mean',
    'waiting_time_minutes': 'mean'
}).rename(columns={'appointment_id': 'total_appointments',
                   'appointment_duration_minutes': 'avg_consultation_minutes',
                   'waiting_time_minutes': 'avg_waiting_time_minutes'})

status_counts = appointments.groupby(['doctor_id', 'status']).size().unstack(fill_value=0)
workload_stats = workload_stats.join(status_counts)

# Merge with shift info to calculate weekly metrics
workload_stats = workload_stats.reset_index()
workload_stats = workload_stats.merge(doctor_shifts[['doctor_id', 'days_per_week', 'shift_duration_hours']],
                                       on='doctor_id', how='left')

# Calculate derived metrics
workload_stats['completed_appointments'] = workload_stats.get('Completed', 0).astype(int)
workload_stats['pending_appointments'] = workload_stats.get('Pending', 0).astype(int)
workload_stats['cancelled_appointments'] = workload_stats.get('Cancelled', 0).astype(int)
workload_stats['weekly_appointments'] = (workload_stats['completed_appointments'] / 52).round(1)
workload_stats['hours_per_week'] = (workload_stats['shift_duration_hours'] * workload_stats['days_per_week']).astype(int)
workload_stats['workload_score'] = (
    (workload_stats['weekly_appointments'] / workload_stats['hours_per_week'].clip(lower=1)) * 100
).clip(upper=100).round(1)
workload_stats['burnout_risk_score'] = (
    (workload_stats['workload_score'] * 0.5) +
    ((workload_stats['pending_appointments'] / (workload_stats['completed_appointments'] + 1)) * 30) +
    ((workload_stats['hours_per_week'] / 10) * 20)
).round(1)
workload_stats['burnout_risk_level'] = workload_stats['burnout_risk_score'].apply(
    lambda x: 'High' if x > 70 else ('Medium' if x > 40 else 'Low')
)

# Select final columns
final_cols = ['doctor_id', 'total_appointments', 'completed_appointments', 'pending_appointments',
              'cancelled_appointments', 'avg_consultation_minutes', 'avg_waiting_time_minutes',
              'weekly_appointments', 'hours_per_week', 'workload_score', 'burnout_risk_score', 'burnout_risk_level']
workload_df = workload_stats[final_cols].copy()
workload_df = workload_df.fillna(0)
workload_df.to_csv('data/doctor_workload_metrics.csv', index=False)
print(f"   Created: doctor_workload_metrics.csv ({len(workload_df)} records)")

# 5. APPOINTMENT OUTCOMES
print("[5/5] Generating appointment outcomes...")
np.random.seed(42)
outcome_types = ['Improved', 'Stable', 'Worsened', 'Referred to Specialist', 'Hospitalized']
outcome_probs = [0.4, 0.35, 0.1, 0.1, 0.05]
notes_map = {
    'Improved': 'Patient responded well to treatment. Continue current regimen.',
    'Stable': 'Patient condition stable. Follow-up recommended.',
    'Worsened': 'Patient condition worsened. Medication adjusted. Refer to specialist.',
    'Referred to Specialist': 'Condition requires specialist care. Referral sent.',
    'Hospitalized': 'Patient hospitalized for further care and monitoring.'
}

# Create outcomes based on appointment status
outcomes_list = []
for idx, row in appointments.iterrows():
    if idx % 10000 == 0:
        print(f"   Processing appointment {idx+1}/{len(appointments)}")

    if row['status'] == 'Completed':
        outcome = np.random.choice(outcome_types, p=outcome_probs)
        notes = notes_map[outcome]
        follow_up = np.random.choice([True, False], p=[0.6, 0.4])
        follow_up_days = np.random.randint(7, 90) if follow_up and outcome != 'Hospitalized' else None
    else:
        outcome = 'No Visit' if row['status'] == 'Cancelled' else 'Pending'
        notes = None
        follow_up = False
        follow_up_days = None

    outcomes_list.append({
        'appointment_id': row['appointment_id'],
        'outcome': outcome,
        'clinical_notes': notes,
        'follow_up_required': follow_up,
        'follow_up_days': follow_up_days
    })

outcomes_df = pd.DataFrame(outcomes_list)
outcomes_df.to_csv('data/appointment_outcomes.csv', index=False)
print(f"   Created: appointment_outcomes.csv ({len(outcomes_df)} records)")

# 6. PATIENT MEDICAL HISTORY
print("[6/7] Generating patient medical history...")
np.random.seed(42)
comorbidities_list = [
    'Hypertension', 'Diabetes Type 2', 'Asthma', 'Arthritis', 'Obesity',
    'High Cholesterol', 'Coronary Artery Disease', 'COPD', 'Depression',
    'Anxiety', 'Sleep Apnea', 'Kidney Disease', 'Thyroid Disorder',
    'Migraine', 'Acid Reflux'
]

patient_medical_list = []
for patient_id in patients['patient_id'].unique():
    has_comorbidities = np.random.choice([True, False], p=[0.4, 0.6])
    num_conditions = np.random.randint(1, 4) if has_comorbidities else 0
    conditions = ', '.join(np.random.choice(comorbidities_list, num_conditions, replace=False)) if num_conditions > 0 else None
    medication_count = num_conditions * np.random.randint(1, 3) if num_conditions > 0 else 0

    patient_medical_list.append({
        'patient_id': patient_id,
        'comorbidities': conditions,
        'active_medications_count': medication_count,
        'surgical_history': 'Previous appendectomy' if np.random.choice([True, False], p=[0.15, 0.85]) else None,
        'allergies': 'Penicillin' if np.random.choice([True, False], p=[0.1, 0.9]) else None,
        'last_health_checkup': (datetime.now() - timedelta(days=np.random.randint(30, 365))).strftime('%m/%d/%Y')
    })

patient_medical_df = pd.DataFrame(patient_medical_list)
patient_medical_df.to_csv('data/patient_medical_history.csv', index=False)
print(f"   Created: patient_medical_history.csv ({len(patient_medical_df)} records)")

# 7. HOSPITAL OCCUPANCY (recent 60 days)
print("[7/7] Generating hospital occupancy data...")
clinics = pd.read_csv('data/clinics.csv')
np.random.seed(42)

occupancy_list = []
dates = pd.date_range(start='2026-05-31', end='2026-07-29', freq='D')

for clinic_id in clinics['clinic_id'].unique():
    clinic_type = clinics[clinics['clinic_id'] == clinic_id]['clinic_type'].values[0]
    total_beds = np.random.randint(20, 31) if clinic_type == 'Private' else np.random.randint(40, 101)

    for date in dates:
        day_of_week = date.weekday()
        base_occupancy = [0.4, 0.6, 0.7, 0.75, 0.7, 0.5, 0.35][day_of_week]
        occupied_beds = int(total_beds * base_occupancy + np.random.randint(-3, 4))
        occupied_beds = max(0, min(total_beds, occupied_beds))

        occupancy_list.append({
            'clinic_id': clinic_id,
            'date': date.strftime('%m/%d/%Y'),
            'total_beds': total_beds,
            'occupied_beds': occupied_beds,
            'occupancy_rate': round((occupied_beds / total_beds) * 100, 1),
            'emergency_capacity_used': np.random.randint(0, 6)
        })

occupancy_df = pd.DataFrame(occupancy_list)
occupancy_df.to_csv('data/hospital_occupancy.csv', index=False)
print(f"   Created: hospital_occupancy.csv ({len(occupancy_df)} records)")

# Save updated appointments with new columns
print("\nSaving updated appointments...")
appointments.to_csv('data/appointments.csv', index=False)

print("\n" + "=" * 80)
print("SYNTHETIC DATA GENERATION COMPLETE!")
print("=" * 80)

print("\nNEW FILES CREATED:")
print("-" * 80)
print(f"1. doctor_consultation_hours.csv        ({len(doctor_shifts)} records)")
print(f"2. doctor_workload_metrics.csv          ({len(workload_df)} records)")
print(f"3. appointment_outcomes.csv             ({len(outcomes_df)} records)")
print(f"4. patient_medical_history.csv          ({len(patient_medical_df)} records)")
print(f"5. hospital_occupancy.csv               ({len(occupancy_df)} records)")

print("\nUPDATED FILES:")
print("-" * 80)
print(f"1. appointments.csv (UPDATED with appointment_duration_minutes, waiting_time_minutes)")

print("\n" + "=" * 80)
print("Dataset ready for comprehensive healthcare analytics!")
print("=" * 80)
