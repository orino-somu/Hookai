// /backend/src/routes/voice.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
import prisma from '../config/db';
const router = express.Router();
router.get('/profile', auth, async (req: any, res: any) => {
  const profile = await prisma.voiceProfile.findUnique({ where: { userId: req.user.id } });
  res.json(profile);
});
export default router;
