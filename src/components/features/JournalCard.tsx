import { CalendarDays, Sparkles } from "lucide-react";
import { AnalyzeButton } from "@/components/features/AnalyzeButton";
import { getCardStyle, getMoodEmoji } from "@/lib/helpers/mood";
import type { JournalEntry } from "@/types";

interface JournalCardProps {
  entry: JournalEntry;
}

/**
 * Card jurnal individual — menampilkan konten, tanggal, emoji mood, dan AI insight.
 * Jika belum dianalisis, tampilkan tombol Analisis Mood.
 */
export function JournalCard({ entry }: JournalCardProps) {
  return (
    <div
      className={`flex-none w-[85%] sm:w-[320px] snap-center flex flex-col justify-between p-5 rounded-3xl border transition-all shadow-sm ${getCardStyle(entry.moodScore)}`}
    >
      <div>
        {/* Header Card */}
        <div className="flex justify-between items-start mb-3 border-b border-black/5 pb-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <CalendarDays className="h-3.5 w-3.5 opacity-70" />
            <span>
              {entry.createdAt.toLocaleDateString("id-ID", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          {entry.moodScore && (
            <span className="text-xl">{getMoodEmoji(entry.moodScore)}</span>
          )}
        </div>

        {/* Konten Jurnal */}
        <div className="min-h-15">
          <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
            {entry.contentRaw}
          </p>
        </div>
      </div>

      {/* Footer — AI Insight atau Tombol Analisis */}
      <div className="mt-4 pt-2 border-t border-black/5">
        {entry.aiSummary ? (
          <div className="flex gap-2 items-start">
            <Sparkles className="h-3 w-3 text-indigo-500 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 italic leading-snug">
              &quot;{entry.aiSummary}&quot;
            </p>
          </div>
        ) : (
          <div className="w-full">
            <AnalyzeButton id={entry.id} content={entry.contentRaw} />
          </div>
        )}
      </div>
    </div>
  );
}
