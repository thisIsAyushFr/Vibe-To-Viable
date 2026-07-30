import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// All analytics routes require authentication and admin/owner role
router.use(authenticateToken);
router.use(requireRole('ADMIN', 'OWNER'));

router.get('/doctor-workload', (req, res) => {
  res.json({ message: 'Get doctor workload analytics - implementation coming soon' });
});

router.get('/clinic-occupancy', (req, res) => {
  res.json({ message: 'Get clinic occupancy analytics - implementation coming soon' });
});

router.get('/patient-outcomes', (req, res) => {
  res.json({ message: 'Get patient outcomes analytics - implementation coming soon' });
});

router.get('/financial', (req, res) => {
  res.json({ message: 'Get financial analytics - implementation coming soon' });
});

export default router;
