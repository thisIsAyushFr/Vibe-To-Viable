import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Get doctors - implementation coming soon' });
});

router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Get doctor details', doctorId: req.params.id });
});

router.get('/:id/workload', authenticateToken, (req, res) => {
  res.json({ message: 'Get doctor workload metrics', doctorId: req.params.id });
});

export default router;
