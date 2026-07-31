import { Router } from 'express';
import { Pool } from 'pg';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();
const pool = new Pool();

// All analytics routes require authentication and admin/owner role
router.use(authenticateToken);
router.use(requireRole('ADMIN', 'OWNER'));

router.get('/doctor-workload', (req, res) => {
  res.json({ message: 'Get doctor workload analytics - implementation coming soon' });
});

router.get('/clinic-occupancy', (req, res) => {
  res.json({ message: 'Get clinic occupancy analytics - implementation coming soon' });
});

router.post('/add-beds', async (req, res) => {
  try {
    const { clinic_id, bed_count } = req.body;
    if (!clinic_id || !bed_count || bed_count <= 0) {
      return res.status(400).json({ error: 'Invalid clinic_id or bed_count' });
    }
    const today = new Date().toISOString().split('T')[0];
    const result = await pool.query(
      `INSERT INTO hospital_occupancy (clinic_id, occupancy_date, total_beds, occupied_beds)
       VALUES ($1, $2, $3, 0)
       ON CONFLICT (clinic_id, occupancy_date) DO UPDATE SET total_beds = total_beds + $3
       RETURNING *`,
      [clinic_id, today, parseInt(bed_count, 10)]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error adding beds:', error);
    res.status(500).json({ error: 'Failed to add beds' });
  }
});

router.post('/allocate-bed', async (req, res) => {
  try {
    const { clinic_id } = req.body;
    if (!clinic_id) {
      return res.status(400).json({ error: 'Invalid clinic_id' });
    }
    const today = new Date().toISOString().split('T')[0];
    const checkResult = await pool.query(
      `SELECT total_beds, occupied_beds FROM hospital_occupancy
       WHERE clinic_id = $1 AND occupancy_date = $2`,
      [clinic_id, today]
    );

    if (checkResult.rows.length === 0 || checkResult.rows[0].occupied_beds >= checkResult.rows[0].total_beds) {
      return res.status(400).json({ error: 'No beds available in this clinic' });
    }

    const result = await pool.query(
      `UPDATE hospital_occupancy SET occupied_beds = occupied_beds + 1
       WHERE clinic_id = $1 AND occupancy_date = $2
       RETURNING *`,
      [clinic_id, today]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error allocating bed:', error);
    res.status(500).json({ error: 'Failed to allocate bed' });
  }
});

router.get('/patient-outcomes', (req, res) => {
  res.json({ message: 'Get patient outcomes analytics - implementation coming soon' });
});

router.get('/financial', (req, res) => {
  res.json({ message: 'Get financial analytics - implementation coming soon' });
});

export default router;
