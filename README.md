# 🧠 MindLog AI

> **Your Daily AI Companion.** Jurnal harian cerdas yang memahami perasaanmu, menganalisis mood, dan memberikan insight berharga menggunakan Google Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=flat-square&logo=supabase)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange?style=flat-square&logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-C5F74F?style=flat-square&logo=drizzle)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=flat-square&logo=vercel)

---

## ✨ Fitur Utama

- **📝 Smart Journaling** — Tulis ceritamu hari ini dengan antarmuka yang bersih dan fokus (Mobile First Design).
- **🤖 AI Mood Analysis** — Google Gemini AI membaca jurnalmu, memberikan skor mood (1-10), label emosi, dan saran singkat yang empati.
- **📊 Weekly Mood Chart** — Visualisasi grafik perubahan emosi mingguanmu, lengkap dengan rata-rata skor.
- **🔐 Secure & Private** — Data tersimpan aman menggunakan Supabase Auth (Magic Link) & PostgreSQL dengan Row Level Security.
- **⚡ Modern Tech Stack** — Dibangun dengan Next.js 15 (App Router), Server Actions, dan Turbopack untuk performa maksimal.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router + Turbopack) |
| **Language** | TypeScript 5 |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Magic Link Auth) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **AI Model** | [Google Gemini 2.5 Flash](https://ai.google.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Struktur Proyek

```
mindlog-ai/
├── src/
│   ├── actions/              # Server Actions (AI, Auth, Journal)
│   │   ├── ai-actions.ts     # Gemini AI mood analysis
│   │   ├── auth-actions.ts   # Login & logout handlers
│   │   └── journal-actions.ts# CRUD operasi jurnal
│   ├── app/
│   │   ├── (auth)/login/     # Halaman login (Magic Link)
│   │   ├── (dashboard)/      # Halaman dashboard (protected)
│   │   ├── auth/callback/    # OAuth callback handler
│   │   ├── globals.css       # Tailwind CSS + theme variables
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Redirect ke /dashboard
│   ├── components/
│   │   ├── features/         # Komponen fitur spesifik
│   │   │   ├── AnalyzeButton.tsx
│   │   │   ├── CreateEntryForm.tsx
│   │   │   ├── JournalCard.tsx
│   │   │   └── MoodChart.tsx
│   │   ├── shared/           # Komponen shared/layout
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── UserNav.tsx
│   │   └── ui/               # shadcn/ui primitives
│   ├── db/
│   │   ├── index.ts          # Database connection (Drizzle)
│   │   └── schema.ts         # Table definitions
│   ├── lib/
│   │   ├── helpers/mood.ts   # Mood utilities & chart data prep
│   │   ├── supabase/server.ts# Supabase server client
│   │   └── utils.ts          # General utilities (cn)
│   └── types/
│       └── index.ts          # Shared TypeScript types
├── middleware.ts              # Supabase Auth session refresh
├── drizzle.config.ts         # Drizzle Kit configuration
└── package.json
```

---

## 🏗️ Architecture Decisions

- **Server Actions** — Semua mutasi data (create entry, analyze mood, auth) menggunakan React Server Actions, bukan API routes. Lebih type-safe dan menghilangkan boilerplate fetch.
- **Route Groups** — `(auth)` dan `(dashboard)` memisahkan layout publik dan protected tanpa mempengaruhi URL path.
- **Drizzle ORM** — Dipilih karena type-safe, ringan, dan SQL-first mindset. Schema didefinisikan sebagai TypeScript, bukan migration files.
- **Component Architecture** — Dibagi 3 layer: `ui/` (primitives dari shadcn), `shared/` (layout/nav), dan `features/` (business logic components).
- **Centralized Types** — Semua type definitions di `src/types/` menggunakan Drizzle `InferSelectModel` agar selalu sinkron dengan schema database.

---

## 🚀 Cara Menjalankan (Local Development)

1. **Clone Repository**

   ```bash
   git clone https://github.com/alifian-zulfaani/mindlog-ai.git
   cd mindlog-ai
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Buat file `.env.local` dan isi dengan kredensial berikut:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_postgres_connection_string
   GOOGLE_AI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Jalankan Database Migration** *(opsional, jika setup awal)*

   ```bash
   npx drizzle-kit push
   ```

5. **Jalankan Development Server**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📸 Preview

| Login Page | Dashboard |
|:---:|:---:|
| ![Login](public/login-preview.png) | ![Dashboard](public/preview.png) |

---

## 📄 License

MIT © 2026 [Alifian Zulfaani](https://github.com/alifian-zulfaani)

---

<p align="center">
  Dibuat dengan ❤️ untuk masa depan <strong>Frontend Development 2026</strong>.
</p>
