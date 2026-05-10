// /backend/src/routes/title.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
const router = express.Router();
router.post('/generate', auth, (req: any, res: any) => res.json({ titles: [] }));
export default router;
