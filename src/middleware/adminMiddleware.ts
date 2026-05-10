// /src/middleware/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

/**
 * Middleware to verify if the authenticated user has the ADMIN role.
 * Should be used AFTER authMiddleware.
 */
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Authentication required' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ 
        status: 'error',
        message: 'Access denied: Admin privileges required' 
      });
    }

    next();
  } catch (error) {
    console.error('Admin Check Error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal server error while verifying privileges' 
    });
  }
};
