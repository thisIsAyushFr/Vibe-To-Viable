import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError, ErrorTypes } from './errorHandler.js';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: 'PATIENT' | 'DOCTOR' | 'NURSE' | 'ADMIN' | 'OWNER';
    permissions: string[];
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw ErrorTypes.UNAUTHORIZED('No token provided');
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    const decoded = jwt.verify(token, secret) as any;

    req.user = {
      userId: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      permissions: decoded.permissions || []
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw ErrorTypes.UNAUTHORIZED('Invalid token');
    }
    throw error;
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw ErrorTypes.UNAUTHORIZED('User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      throw ErrorTypes.FORBIDDEN(`This action requires one of roles: ${roles.join(', ')}`);
    }

    next();
  };
};

export const requirePermission = (...permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw ErrorTypes.UNAUTHORIZED('User not authenticated');
    }

    const hasPermission = permissions.some(p => req.user!.permissions.includes(p) || req.user!.role === 'OWNER');

    if (!hasPermission) {
      throw ErrorTypes.FORBIDDEN(`This action requires one of permissions: ${permissions.join(', ')}`);
    }

    next();
  };
};
