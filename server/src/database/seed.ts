import { createReadStream } from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { query, getClient, closePool } from './connection.js';

const BATCH_SIZE = 1000;
const DATA_DIR = path.resolve('./data');

interface SeedStats {
  table: string;
  count: number;
  duration: number;
}

const stats: SeedStats[] = [];

const seedTable = async (
  filename: string,
  tableName: string,
  columns: string[],
  options: any = {}
) => {
  return new Promise<number>(async (resolve, reject) => {
    const startTime = Date.now();
    let rowCount = 0;
    let batchBuffer: any[] = [];
    let isProcessing = false;

    const flush = async () => {
      if (batchBuffer.length === 0) return;
      if (isProcessing) return;

      isProcessing = true;
      try {
        const placeholders = batchBuffer
          .map((_, i) => {
            const start = i * columns.length + 1;
            const nums = columns.map((_, j) => `$${start + j}`).join(', ');
            return `(${nums})`;
          })
          .join(', ');

        const values = batchBuffer.flat();
        const columnStr = columns.join(', ');
        const sql = `INSERT INTO ${tableName} (${columnStr}) VALUES ${placeholders}`;

        await query(sql, values);
      } catch (error) {
        console.error(`  ❌ Batch insert error for ${tableName}:`, error instanceof Error ? error.message : error);
        throw error;
      } finally {
        batchBuffer = [];
        isProcessing = false;
      }
    };

    const filepath = path.join(DATA_DIR, filename);
    const delimiter = options.delimiter || ',';

    createReadStream(filepath)
      .pipe(parse({ delimiter, skip_empty_lines: true }))
      .on('data', async (row) => {
        rowCount++;

        // Transform data
        const transformedRow = columns.map((col, i) => {
          const value = row[i];

          // Handle null/empty values
          if (value === '' || value === null) {
            return null;
          }

          // Handle date conversions (MM/DD/YYYY to YYYY-MM-DD)
          if (col.includes('date') && typeof value === 'string' && value.match(/\d{2}\/\d{2}\/\d{4}/)) {
            const [month, day, year] = value.split('/');
            return `${year}-${month}-${day}`;
          }

          // Handle numeric conversions
          if (col.includes('_count') || col.includes('minutes') || col.includes('hours') || col.includes('days')) {
            const num = parseInt(value, 10);
            return isNaN(num) ? null : num;
          }

          // Handle decimal conversions (currency)
          if (col.includes('amount') || col.includes('cost')) {
            const num = parseFloat(value);
            return isNaN(num) ? null : num;
          }

          // Handle boolean conversions
          if (col === 'follow_up_required') {
            return value === 'true' || value === '1' || value === 'True';
          }

          return value;
        });

        batchBuffer.push(transformedRow);

        if (batchBuffer.length >= BATCH_SIZE) {
          await flush();
        }
      })
      .on('end', async () => {
        await flush();
        const duration = Date.now() - startTime;
        stats.push({ table: tableName, count: rowCount, duration });
        console.log(`  ✓ ${tableName}: ${rowCount.toLocaleString()} rows (${duration}ms)`);
        resolve(rowCount);
      })
      .on('error', (error) => {
        console.error(`  ❌ Error reading ${filename}:`, error instanceof Error ? error.message : error);
        reject(error);
      });
  });
};

const seed = async () => {
  try {
    console.log('\n========================================');
    console.log('  CareSync Data Seeding');
    console.log('========================================\n');

    const client = await getClient();
    const startTime = Date.now();

    try {
      // Disable foreign key checks temporarily for faster insertion
      await query('SET CONSTRAINTS ALL DEFERRED');
      console.log('Seeding data files...\n');

      // 1. Clinics (must come first - no dependencies)
      await seedTable('clinics.csv', 'clinics', [
        'clinic_id', 'clinic_name', 'address', 'city', 'state', 'phone', 'opening_hours', 'clinic_type'
      ]);

      // 2. Patients (depends on nothing)
      await seedTable('patients.csv', 'patients', [
        'patient_id', 'full_name', 'gender', 'date_of_birth', 'phone', 'email', 'address', 'registration_date', 'blood_group', 'emergency_contact'
      ]);

      // 3. Doctors (depends on clinics)
      await seedTable('doctors.csv', 'doctors', [
        'doctor_id', 'full_name', 'specialty', 'phone', 'email', 'clinic_id'
      ]);

      // 4. Staff (depends on clinics)
      await seedTable('staff.csv', 'staff', [
        'staff_id', 'full_name', 'role', 'clinic_id', 'phone', 'email'
      ]);

      // 5. Patient Insurance (depends on patients)
      await seedTable('patient_insurance.txt', 'patient_insurance', [
        'patient_id', 'insurance_status', 'provider', 'coverage_level'
      ], { delimiter: '|' });

      // 6. Patient Medical History (depends on patients)
      await seedTable('patient_medical_history.csv', 'patient_medical_history', [
        'patient_id', 'comorbidities', 'active_medications_count', 'surgical_history', 'allergies', 'last_health_checkup'
      ]);

      // 7. Doctor Consultation Hours (depends on doctors)
      await seedTable('doctor_consultation_hours.csv', 'doctor_consultation_hours', [
        'doctor_id', 'days_per_week', 'shift_duration_hours', 'shift_start_time', 'shift_end_time'
      ]);

      // 8. Doctor Workload Metrics (depends on doctors)
      await seedTable('doctor_workload_metrics.csv', 'doctor_workload_metrics', [
        'doctor_id', 'total_appointments', 'completed_appointments', 'pending_appointments', 'cancelled_appointments',
        'avg_consultation_minutes', 'avg_waiting_time_minutes', 'weekly_appointments', 'hours_per_week', 'workload_score',
        'burnout_risk_score', 'burnout_risk_level'
      ]);

      // 9. Appointments (depends on patients, doctors, clinics)
      await seedTable('appointments.csv', 'appointments', [
        'appointment_id', 'patient_id', 'doctor_id', 'clinic_id', 'appointment_date', 'status', 'reason_for_visit',
        'appointment_duration_minutes', 'waiting_time_minutes'
      ]);

      // 10. Appointment Outcomes (depends on appointments)
      await seedTable('appointment_outcomes.csv', 'appointment_outcomes', [
        'appointment_id', 'outcome', 'clinical_notes', 'follow_up_required', 'follow_up_days'
      ]);

      // 11. Prescriptions (depends on appointments)
      await seedTable('prescriptions.csv', 'prescriptions', [
        'prescription_id', 'appointment_id', 'medicine_name', 'instructions'
      ]);

      // 12. Treatments (depends on appointments)
      await seedTable('treatments.csv', 'treatments', [
        'treatment_id', 'appointment_id', 'treatment_type', 'treatment_cost', 'treatment_status'
      ]);

      // 13. Payments (depends on appointments)
      await seedTable('payments.csv', 'payments', [
        'payment_id', 'appointment_id', 'payment_date', 'payment_amount', 'payment_method', 'payment_status'
      ]);

      // 14. Hospital Occupancy (depends on clinics)
      await seedTable('hospital_occupancy.csv', 'hospital_occupancy', [
        'clinic_id', 'occupancy_date', 'total_beds', 'occupied_beds', 'occupancy_rate', 'emergency_capacity_used'
      ]);

      // Re-enable foreign key checks
      await query('SET CONSTRAINTS ALL IMMEDIATE');

      const totalDuration = Date.now() - startTime;
      const totalRecords = stats.reduce((sum, s) => sum + s.count, 0);

      console.log('\n========================================');
      console.log('  Seeding Summary');
      console.log('========================================');
      stats.forEach(s => {
        console.log(`  ${s.table.padEnd(30)} ${s.count.toString().padStart(10)} rows`);
      });
      console.log('  ' + '-'.repeat(40));
      console.log(`  TOTAL: ${totalRecords.toLocaleString()} rows in ${totalDuration}ms`);
      console.log('========================================\n');

      // Verify referential integrity
      console.log('Verifying referential integrity...\n');

      const checks = [
        { table: 'appointments', fk: 'patient_id', ref: 'patients', pk: 'patient_id' },
        { table: 'appointments', fk: 'doctor_id', ref: 'doctors', pk: 'doctor_id' },
        { table: 'appointments', fk: 'clinic_id', ref: 'clinics', pk: 'clinic_id' },
        { table: 'doctors', fk: 'clinic_id', ref: 'clinics', pk: 'clinic_id' },
        { table: 'staff', fk: 'clinic_id', ref: 'clinics', pk: 'clinic_id' },
        { table: 'patient_insurance', fk: 'patient_id', ref: 'patients', pk: 'patient_id' },
        { table: 'patient_medical_history', fk: 'patient_id', ref: 'patients', pk: 'patient_id' },
        { table: 'doctor_consultation_hours', fk: 'doctor_id', ref: 'doctors', pk: 'doctor_id' },
        { table: 'doctor_workload_metrics', fk: 'doctor_id', ref: 'doctors', pk: 'doctor_id' },
        { table: 'appointment_outcomes', fk: 'appointment_id', ref: 'appointments', pk: 'appointment_id' },
        { table: 'prescriptions', fk: 'appointment_id', ref: 'appointments', pk: 'appointment_id' },
        { table: 'treatments', fk: 'appointment_id', ref: 'appointments', pk: 'appointment_id' },
        { table: 'payments', fk: 'appointment_id', ref: 'appointments', pk: 'appointment_id' },
        { table: 'hospital_occupancy', fk: 'clinic_id', ref: 'clinics', pk: 'clinic_id' },
      ];

      let integrityIssues = 0;
      for (const check of checks) {
        const result = await query(
          `SELECT COUNT(*) as orphaned FROM ${check.table} t
           WHERE t.${check.fk} IS NOT NULL
           AND NOT EXISTS (SELECT 1 FROM ${check.ref} r WHERE r.${check.pk} = t.${check.fk})`
        );
        const orphanedCount = result.rows[0].orphaned;
        if (orphanedCount > 0) {
          console.log(`  ❌ ${check.table}.${check.fk} → ${check.ref}.${check.pk}: ${orphanedCount} orphaned records`);
          integrityIssues++;
        } else {
          console.log(`  ✓ ${check.table}.${check.fk} → ${check.ref}.${check.pk}`);
        }
      }

      if (integrityIssues > 0) {
        console.log(`\n❌ Found ${integrityIssues} referential integrity issues`);
        process.exit(1);
      } else {
        console.log('\n✓ All referential integrity checks passed\n');
      }

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('\n❌ Seeding failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await closePool();
  }
};

seed();
