import type { InferSelectModel } from "drizzle-orm";
import type { entries } from "@/db/schema";

// ========================================
// Database Types
// ========================================

/** Type hasil select dari tabel entries */
export type JournalEntry = InferSelectModel<typeof entries>;

// ========================================
// AI Types
// ========================================

/** Struktur response dari Gemini AI setelah analisis mood */
export type MoodAnalysis = {
  mood_score: number;
  mood_label: string;
  advice: string;
};

// ========================================
// Chart Types
// ========================================

/** Data point untuk grafik mood mingguan */
export type ChartDataPoint = {
  date: string;
  score: number;
  fullDate: string;
};
