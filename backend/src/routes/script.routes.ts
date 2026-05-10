// /backend/src/routes/script.routes.ts
import express from 'express';
import { auth } from '../middleware/auth';
import prisma from '../config/db';
import { generateFullScript } from '../services/gemini.service';

const router = express.Router();

router.post('/generate', auth, async (req: any, res: any) => {
  try {
    const { topic, niche, platform, tone, scriptLength, psychTriggers, audienceAge, voiceProfile } = req.body;
    
    // Check usage limits (simplified)
    const usage = await prisma.usageStat.findFirst({
      where: { userId: req.user.id, month: new Date().toISOString().slice(0, 7) }
    });
    
    // TODO: Implement actual plan limit checks here

    const aiResult = await generateFullScript({
      topic, niche, platform, tone, scriptLength, psychTriggers, audienceAge, voiceProfile
    });

    const script = await prisma.script.create({
      data: {
        userId: req.user.id,
        title: aiResult.metadata.titles[0] || 'Untitled Script',
        topic,
        platform,
        niche: niche as any,
        tone: tone as any,
        scriptLength,
        psychTriggers: JSON.stringify(psychTriggers),
        audienceAge,
        fullScript: JSON.stringify(aiResult.fullScript),
        hookVariations: JSON.stringify(aiResult.hookVariations),
        retentionArc: JSON.stringify(aiResult.retentionArc),
        metadata: JSON.stringify(aiResult.metadata),
        hookScore: aiResult.hookScore,
        viralScore: aiResult.viralScore,
      }
    });

    res.json(script);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Script generation failed' });
  }
});

router.get('/', auth, async (req: any, res: any) => {
  const scripts = await prisma.script.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(scripts);
});

router.get('/:id', auth, async (req: any, res: any) => {
  const script = await prisma.script.findUnique({
    where: { id: req.params.id }
  });
  if (!script || script.userId !== req.user.id) return res.status(404).json({ message: 'Script not found' });
  res.json(script);
});

router.put('/:id', auth, async (req: any, res: any) => {
  const script = await prisma.script.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(script);
});

router.delete('/:id', auth, async (req: any, res: any) => {
  await prisma.script.delete({ where: { id: req.params.id } });
  res.json({ message: 'Deleted' });
});

export default router;
