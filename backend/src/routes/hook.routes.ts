// /backend/src/routes/hook.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
import prisma from '../config/db';
const router = express.Router();
router.get('/', auth, async (req: any, res: any) => {
  const hooks = await prisma.hook.findMany({ where: { userId: req.user.id } });
  res.json(hooks);
});
export default router;
