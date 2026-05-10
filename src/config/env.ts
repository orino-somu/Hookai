// /src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  GEMINI_API_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default('HookMind AI <noreply@hookmind.ai>'),
});

// Since process.env might be empty during cold boots or in specific environments,
// we wrap this to handle missing required vars gracefully if needed.
// For AI Studio, typical secrets are set in the environment.
export const env = envSchema.parse(process.env);
