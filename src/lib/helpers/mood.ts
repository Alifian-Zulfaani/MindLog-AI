import { subDays, format } from "date-fns";
import { id } from "date-fns/locale";
import type { JournalEntry, ChartDataPoint } from "@/types";

// ========================================
// Mood Styling Helpers
// ========================================

/**
 * Menentukan style card berdasarkan skor mood.
 * - null: default (belum dianalisis)
 * - 1-4: merah/rose (mood rendah)
 * - 5-7: indigo (mood netral)
 * - 8-10: teal/hijau (mood tinggi)
 */
export function getCardStyle(score: number | null): string {
  if (score === null) return "bg-white border-slate-100 hover:border-indigo-200";
  if (score <= 4) return "bg-rose-50/60 border-rose-100 hover:border-rose-200";
  if (score <= 7) return "bg-indigo-50/60 border-indigo-100 hover:border-indigo-200";
  return "bg-teal-50/60 border-teal-100 hover:border-teal-200";
}

/**
 * Mengembalikan emoji berdasarkan skor mood.
 */
export function getMoodEmoji(score: number): string {
  if (score >= 8) return "🤩";
  if (score >= 5) return "😌";
  return "🥀";
}

// ========================================
// Chart Data Helpers
// ========================================

type DayBucket = {
  dateObj: Date;
  dateLabel: string;
  fullDate: string;
  totalScore: number;
  count: number;
};

/**
 * Menyiapkan data chart mood mingguan dari daftar jurnal.
 * Mengelompokkan entries per hari (7 hari terakhir) dan menghitung rata-rata mood.
 */
export function prepareChartData(journalEntries: JournalEntry[]): ChartDataPoint[] {
  // Siapkan bucket 7 hari terakhir
  const last7Days: DayBucket[] = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    return {
      dateObj: d,
      dateLabel: format(d, "EEE", { locale: id }),
      fullDate: format(d, "dd MMMM yyyy", { locale: id }),
      totalScore: 0,
      count: 0,
    };
  });

  // Isi bucket dengan data dari entries
  for (const entry of journalEntries) {
    if (entry.moodScore) {
      const entryDateStr = entry.createdAt.toDateString();
      const dayBucket = last7Days.find(
        (d) => d.dateObj.toDateString() === entryDateStr
      );

      if (dayBucket) {
        dayBucket.totalScore += entry.moodScore;
        dayBucket.count += 1;
      }
    }
  }

  // Hitung rata-rata & format untuk Recharts
  return last7Days.map((day) => ({
    date: day.dateLabel,
    score: day.count > 0 ? Math.round((day.totalScore / day.count) * 10) / 10 : 0,
    fullDate: day.fullDate,
  }));
}
