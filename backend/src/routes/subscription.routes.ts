// /backend/src/routes/subscription.routes.ts
import express from 'express';
const router = express.Router();
router.get('/current', (req, res) => res.json({ plan: 'FREE' }));
export default router;
