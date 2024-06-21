import { Router } from 'express';
import { getAll } from '../services/TestService.js';

const router = Router();

router.get('/health-check', async (req, res) => {
  try {
    const result = await getAll(req);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

export default router;
