import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5000',
      'http://172.16.0.2:3000',

      // Vercel frontend
      'https://caresync-vtv.vercel.app',

      // Railway / custom env
      process.env.CORS_ORIGIN
    ].filter(Boolean) as string[];

    console.log('[CORS] Request origin:', origin);
    console.log('[CORS] Allowed origins:', allowedOrigins);

    // Allow requests without origin (Postman, curl, mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log('[CORS] Allowed:', origin);
      return callback(null, true);
    }

    console.log('[CORS] Blocked:', origin);
    return callback(new Error('Not allowed by CORS'));
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

  exposedHeaders: [
    'Content-Length'
  ],

  optionsSuccessStatus: 204,

  maxAge: 86400
};