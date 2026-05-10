// /src/controllers/adminController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { startOfDay, subDays } from 'date-fns';

export class AdminController {
  /**
   * Aggregates platform-wide KPIs
   */
  static async getDashboardStats(req: Request, res: Response) {
    try {
      const today = startOfDay(new Date());
      const ninetyDaysAgo = subDays(new Date(), 90);

      const [
        totalUsers,
        todayUsers,
        activeSubs,
        totalScripts,
        usageData,
        recentActivity
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: { gte: today } } }),
        prisma.user.count({ where: { plan: { not: 'FREE' } } }),
        prisma.script.count(),
        prisma.usageStat.aggregate({
          _sum: { tokensUsed: true }
        }),
        prisma.auditLog.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { name: true, email: true } } }
        })
      ]);

      // Mock revenue for this demo environment as we don't have real Stripe data
      const estimatedMRR = activeSubs * 29; // Estimate $29 per sub

      // Get user growth trend for chart
      const userGrowth = await prisma.user.groupBy({
        by: ['createdAt'],
        _count: true,
        where: { createdAt: { gte: ninetyDaysAgo } },
        orderBy: { createdAt: 'asc' }
      });

      res.json({
        kpis: {
          totalUsers,
          todayUsers,
          activeSubs,
          totalScripts,
          totalAiCalls: usageData._sum.tokensUsed || 0,
          estimatedMRR,
          aiCostEstimate: (usageData._sum.tokensUsed || 0) * 0.0000001, // Mock formula
        },
        recentActivity,
        charts: {
          userGrowth: userGrowth.map(g => ({
            date: g.createdAt.toISOString().split('T')[0],
            count: g._count
          }))
        }
      });
    } catch (error) {
      console.error('Admin Stats Error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch dashboard intelligence' });
    }
  }

  /**
   * Detailed user management with search and filters
   */
  static async getUsers(req: Request, res: Response) {
    try {
      const { page = '1', limit = '10', q, plan, role } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where: any = {};
      if (q) {
        where.OR = [
          { name: { contains: q as string } },
          { email: { contains: q as string } }
        ];
      }
      if (plan) where.plan = plan;
      if (role) where.role = role;

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          orderBy: { createdAt: 'desc' },
          include: {
            _count: { select: { scripts: true } }
          }
        }),
        prisma.user.count({ where })
      ]);

      res.json({
        users,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / parseInt(limit as string))
        }
      });
    } catch (error) {
       res.status(500).json({ status: 'error', message: 'User retrieval failed' });
    }
  }

  /**
   * Admin action to update user (e.g. change plan, ban)
   */
  static async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { plan, role, name } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { plan, role, name }
      });

      res.json({ status: 'success', user: updatedUser });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Update failed' });
    }
  }

  /**
   * AI Usage Analytics
   */
  static async getAiUsage(req: Request, res: Response) {
    try {
      const usage = await prisma.usageStat.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } }
      });
      
      res.json(usage);
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to fetch AI usage stats' });
    }
  }
}
