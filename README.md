# 🧠 MindLog AI

> **Your Daily AI Companion.** Jurnal harian cerdas yang memahami perasaanmu, menganalisis mood, dan memberikan insight berharga menggunakan Google Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=flat-square&logo=supabase)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%20Flash-orange?style=flat-square&logo=google)
![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Fitur Utama

- **📝 Smart Journaling:** Tulis ceritamu hari ini dengan antarmuka yang bersih dan fokus (Mobile First Design).
- **🤖 AI Mood Analysis:** Google Gemini AI membaca jurnalmu, memberikan skor mood (1-10), dan memberikan saran singkat yang empati.
- **📊 Mood Tracking:** (Segera Hadir) Visualisasi grafik perubahan emosi mingguanmu.
- **🔐 Secure & Private:** Data tersimpan aman menggunakan Supabase Auth & PostgreSQL (Row Level Security).
- **⚡ Modern Tech Stack:** Dibangun dengan Next.js 15 (App Router) & Server Actions untuk performa maksimal.

## 🛠️ Teknologi yang Digunakan

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database & Auth:** [Supabase](https://supabase.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **AI Model:** Google Gemini 1.5 Flash / 2.0 Flash Lite
- **Styling:** Tailwind CSS + Shadcn/UI
- **Deployment:** Vercel

## 🚀 Cara Menjalankan (Local Development)

Ikuti langkah ini untuk menjalankan proyek di komputer lokalmu:

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/username-kamu/mindlog-ai.git](https://github.com/username-kamu/mindlog-ai.git)
    cd mindlog-ai
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env.local` dan isi dengan kredensial berikut:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    DATABASE_URL=your_postgres_connection_string
    GOOGLE_AI_API_KEY=your_gemini_api_key
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  **Jalankan Server**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📸 Preview

![Login Preview](/public/login-preview.png)
![Preview](/public/preview.png)

---

Dibuat dengan ❤️ oleh Alifian Zulfaani untuk Masa Depan Frontend Development 2026.
