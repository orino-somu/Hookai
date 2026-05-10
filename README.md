# HookMind AI - The Viral Content Architecture

HookMind AI is a professional SaaS platform designed to translate abstract ideas into high-retention video scripts. Built for the attention economy, it leverages Gemini 2.0 Flash to generate scroll-stopping hooks and psychologically optimized content structures.

## 🚀 Key Features

- **Script Studio™ Engine**: Generate full-length video architectures with retention markers and B-roll cues.
- **Hook Lab**: Instant generation of viral hooks based on proven attention patterns.
- **Tone Scaling**: Adjust psychological resonance (Aggressive, Educational, Storyteller, etc.).
- **Intelligence Dashboard**: Real-time analytics on script performance and retention arcs.
- **Admin Command Center**: Complete platform oversight including user management, AI usage diagnostics, and revenue tracking.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS (v4), Motion (Framer), Recharts, Lucide React, Zustand.
- **Backend**: Express, Prisma (ORM), SQLite (Development), JWT Authentication, Helmet Security.
- **AI**: Google Gemini 2.0 Flash.

## 📋 Prerequisites

- Node.js (v18+)
- npm / yarn
- Google Gemini API Key

## ⚙️ Setup Instructions

1. **Clone & Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Configuration**
   Initialize the Prisma client and push the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Initial Data**
   Create an admin account and sample data:
   ```bash
   node prisma/seed.js
   ```
   *Default Admin: admin@hookmind.ai / password: admin123*

4. **Environment Variables**
   Create a `.env` file based on `.env.example`:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-development-secret-here"
   GEMINI_API_KEY="your-api-key"
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Security & Architecture

- **Role-Based Access Control (RBAC)**: Strict separation between `USER` and `ADMIN` flows.
- **Audit Logging**: Every critical inference and administrative action is logged for transparency.
- **Token Budgeting**: Built-in usage tracking to monitor and estimate AI infrastructure costs.
- **API Hygiene**: Rate limiting and helmet protection on all endpoints.

## 📦 Deployment Guide

- **Database**: Use Prisma with PlanetScale (MySQL) or Neon (PostgreSQL) for production.
- **Backend**: Deploys seamlessly to Cloud Run, Heroku, or Railway.
- **Frontend**: Optimized for Vercel, Netlify, or as part of the monolithic build.

---
*Created by HookMind Studio. Built for creators who demand retention.*
