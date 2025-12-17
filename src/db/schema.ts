// src/db/schema.ts
import { pgTable, uuid, text, integer, timestamp, date } from "drizzle-orm/pg-core";

// Tabel Entries (Jurnal)
export const entries = pgTable("entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  // user_id ini nanti akan kita ambil dari Session Supabase Auth
  userId: uuid("user_id").notNull(), 
  contentRaw: text("content_raw").notNull(),
  moodScore: integer("mood_score"), // Skala 1-10
  moodLabel: text("mood_label"), // misal: "Cemas", "Semangat", "Lega"
  aiSummary: text("ai_summary"), // Hasil olahan AI nanti
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Catatan: Untuk tahap awal, kita tidak buat tabel 'users' manual
// karena kita akan 'nebeng' sistem Auth bawaan Supabase (tabel auth.users).
// userId di atas adalah foreign key konseptual ke auth.users.