import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Get patients - implementation coming soon' });
});

router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Get patient details', patientId: req.params.id });
});

router.put('/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Update patient', patientId: req.params.id });
});

export default router;
