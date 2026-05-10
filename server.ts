// /server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import authRoutes from './backend/src/routes/auth.routes';
import userRoutes from './backend/src/routes/user.routes';
import scriptRoutes from './backend/src/routes/script.routes';
import hookRoutes from './backend/src/routes/hook.routes';
import voiceRoutes from './backend/src/routes/voice.routes';
import titleRoutes from './backend/src/routes/title.routes';
import workspaceRoutes from './backend/src/routes/workspace.routes';
import subscriptionRoutes from './backend/src/routes/subscription.routes';
import adminRoutes from './backend/src/routes/admin.routes';
import analyticsRoutes from './backend/src/routes/analytics.routes';
import { errorHandler } from './backend/src/middleware/errorHandler';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

async function startServer() {
  app.use(helmet({
    contentSecurityPolicy: false, // For development and preview
  }));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/scripts', scriptRoutes);
  app.use('/api/hooks', hookRoutes);
  app.use('/api/voice', voiceRoutes);
  app.use('/api/titles', titleRoutes);
  app.use('/api/workspaces', workspaceRoutes);
  app.use('/api/subscription', subscriptionRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/analytics', analyticsRoutes);

  // Error Handler
  app.use(errorHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HookMind AI server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
