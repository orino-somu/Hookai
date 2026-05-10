// /backend/src/routes/workspace.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
const router = express.Router();
router.get('/', auth, (req: any, res: any) => res.json([]));
export default router;
