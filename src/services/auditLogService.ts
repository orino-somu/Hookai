// /src/services/auditLogService.ts
import { prisma } from '../lib/prisma';

/**
 * Standardized system actions for audit logging
 */
export enum AuditAction {
  USER_LOGIN = 'USER_LOGIN',
  USER_REGISTER = 'USER_REGISTER',
  USER_LOGOUT = 'USER_LOGOUT',
  SCRIPT_GENERATE = 'SCRIPT_GENERATE',
  HOOK_GENERATE = 'HOOK_GENERATE',
  SCRIPT_DELETE = 'SCRIPT_DELETE',
  SUBSCRIPTION_CREATE = 'SUBSCRIPTION_CREATE',
  SUBSCRIPTION_CANCEL = 'SUBSCRIPTION_CANCEL',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  ADMIN_USER_UPDATE = 'ADMIN_USER_UPDATE',
  ADMIN_USER_BAN = 'ADMIN_USER_BAN',
  ADMIN_SETTING_CHANGE = 'ADMIN_SETTING_CHANGE',
  PROFILE_UPDATE = 'PROFILE_UPDATE'
}

interface LogData {
  userId: string;
  action: AuditAction;
  details?: Record<string, any>;
  ipAddress?: string;
  metadata?: Record<string, any>;
}

export class AuditLogService {
  /**
   * Logs a user action to the database.
   * Fails silently to prevent blocking main business logic.
   */
  static async log(data: LogData) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          details: data.details ? JSON.stringify(data.details) : undefined,
          ipAddress: data.ipAddress,
          metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
        },
      });
    } catch (error) {
      console.error('Failed to write audit log:', error);
    }
  }

  /**
   * Retrieves latest logs for admin dashboard
   */
  static async getRecent(limit = 10) {
    return prisma.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }
}
