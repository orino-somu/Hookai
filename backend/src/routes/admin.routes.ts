// /backend/src/routes/admin.routes.ts
import express from 'express';
import { auth, adminAuth } from '../middleware/auth';
import prisma from '../config/db';
import { startOfDay, subDays } from 'date-fns';

const router = express.Router();

router.use(auth);
router.use(adminAuth);

/**
 * Platform Overview Stats
 */
router.get('/dashboard', async (req, res) => {
  try {
    const today = startOfDay(new Date());
    const [
      totalUsers,
      todayUsers,
      activeSubs,
      totalScripts,
      totalUsage,
      lastPayments
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.user.count({ where: { plan: { not: 'FREE' } } }),
      prisma.script.count(),
      prisma.usageStat.aggregate({ _sum: { tokensUsed: true } }),
      prisma.auditLog.findMany({
        where: { action: 'PAYMENT_SUCCESS' },
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    // Mock revenue calculation
    const estimatedMRR = activeSubs * 29;

    res.json({
      stats: {
        totalUsers,
        todayUsers,
        activeSubs,
        totalScripts,
        totalTokens: totalUsage._sum.tokensUsed || 0,
        estimatedMRR,
        aiCost: (totalUsage._sum.tokensUsed || 0) * 0.0000001 // Mock cost coefficient
      },
      recentPayments: lastPayments
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to aggregate dashboard intelligence' });
  }
});

/**
 * User Management with Filters
 */
router.get('/users', async (req, res) => {
  try {
    const { q, plan, status } = req.query;
    
    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: String(q) } },
        { email: { contains: String(q) } },
      ];
    }
    if (plan) where.plan = plan;

    const users = await prisma.user.findMany({
      where,
      include: { 
        _count: { select: { scripts: true } },
        subscription: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user directory' });
  }
});

/**
 * Update User (Ban, Change Plan, etc)
 */
router.patch('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan, role, name } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { plan, role, name }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * Global AI Usage Analytics
 */
router.get('/ai-usage', async (req, res) => {
  try {
    const usage = await prisma.usageStat.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } }
    });
    res.json(usage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AI diagnostics' });
  }
});

export default router;
