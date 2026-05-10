// /src/routes/adminRoutes.ts
import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/adminMiddleware';

const router = Router();

/**
 * All routes in this file are protected by authentication AND admin role check
 */
router.use(authMiddleware);
router.use(isAdmin);

// Dashboard Intelligence
router.get('/stats', AdminController.getDashboardStats);

// User Management
router.get('/users', AdminController.getUsers);
router.patch('/users/:userId', AdminController.updateUser);

// Audit & Intelligence
router.get('/ai-usage', AdminController.getAiUsage);

// Platform Control (Placeholder for expansion)
router.post('/maintenance', (req, res) => res.json({ status: 'success', mode: 'maintenance_active' }));

export default router;
