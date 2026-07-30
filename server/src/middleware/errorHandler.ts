import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    status: error.status || 500,
    path: req.path,
    method: req.method
  });

  // Determine status code
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  // Send response
  res.status(status).json({
    error: {
      message,
      status,
      code: error.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    },
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

// Create an API error class
export class AppError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Common error types
export const ErrorTypes = {
  VALIDATION_ERROR: (message: string) => new AppError(message, 400, 'VALIDATION_ERROR'),
  UNAUTHORIZED: (message: string = 'Unauthorized') => new AppError(message, 401, 'UNAUTHORIZED'),
  FORBIDDEN: (message: string = 'Forbidden') => new AppError(message, 403, 'FORBIDDEN'),
  NOT_FOUND: (resource: string) => new AppError(`${resource} not found`, 404, 'NOT_FOUND'),
  CONFLICT: (message: string) => new AppError(message, 409, 'CONFLICT'),
  INTERNAL_ERROR: (message: string = 'Internal Server Error') => new AppError(message, 500, 'INTERNAL_ERROR')
};
