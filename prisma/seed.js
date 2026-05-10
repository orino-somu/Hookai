// /prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hookmind.ai' },
    update: {},
    create: {
      email: 'admin@hookmind.ai',
      name: 'Super Admin',
      password: adminPassword,
      role: 'ADMIN',
      plan: 'AGENCY',
      isEmailVerified: true,
      profile: {
        create: {
          niche: 'TECH',
          platforms: JSON.stringify(['YOUTUBE', 'TIKTOK', 'REELS']),
          audienceAgeRange: 'YOUNG_ADULT',
          preferredTone: 'EDUCATIONAL',
          voiceSamples: JSON.stringify([]),
          onboardingCompleted: true,
        },
      },
    },
  });

  console.log('Seeded Admin:', admin.email);

  // Create Sample User
  const userPassword = await bcrypt.hash('user123', 12);
  const tester = await prisma.user.upsert({
    where: { email: 'creator@hookmind.ai' },
    update: {},
    create: {
      email: 'creator@hookmind.ai',
      name: 'Content King',
      password: userPassword,
      role: 'USER',
      plan: 'FREE',
      isEmailVerified: true,
      profile: {
        create: {
          niche: 'FITNESS',
          platforms: JSON.stringify(['TIKTOK']),
          audienceAgeRange: 'TEEN',
          preferredTone: 'MOTIVATIONAL',
          voiceSamples: JSON.stringify([]),
          onboardingCompleted: true,
        },
      },
    },
  });

  console.log('Seeded User:', tester.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
