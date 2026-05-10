// /backend/src/routes/analytics.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
const router = express.Router();
router.get('/usage', auth, (req: any, res: any) => res.json([]));
export default router;
