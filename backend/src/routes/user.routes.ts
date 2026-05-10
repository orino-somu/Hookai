// /backend/src/routes/user.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
import prisma from '../config/db';

const router = express.Router();

router.get('/me', auth, async (req: any, res: any) => {
  res.json(req.user);
});

router.get('/stats', auth, async (req: any, res: any) => {
  const month = new Date().toISOString().slice(0, 7);
  const stats = await prisma.usageStat.upsert({
    where: { id: req.user.id + month }, // Simplified composite ID logic
    update: {},
    create: {
      id: req.user.id + month,
      userId: req.user.id,
      month
    }
  });

  const totalScripts = await prisma.script.count({ where: { userId: req.user.id } });
  const totalHooks = await prisma.hook.count({ where: { userId: req.user.id } });

  res.json({
    monthlyStats: stats,
    totals: { totalScripts, totalHooks }
  });
});

export default router;
