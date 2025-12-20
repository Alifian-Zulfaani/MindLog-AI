import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { AnalyzeButton } from "@/components/features/AnalyzeButton";
import { CreateEntryForm } from "@/components/features/CreateEntryForm";
import { UserNav } from "@/components/shared/UserNav";
import { BookHeart, CalendarDays, Sparkles, TrendingUp } from "lucide-react";

const getCardStyle = (score: number | null) => {
  if (score === null) return "bg-white border-slate-100 hover:border-indigo-200";
  if (score <= 4) return "bg-rose-50/60 border-rose-100 hover:border-rose-200";
  if (score <= 7) return "bg-indigo-50/60 border-indigo-100 hover:border-indigo-200";
  return "bg-teal-50/60 border-teal-100 hover:border-teal-200";
};

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const journalEntries = await db
    .select()
    .from(entries)
    .where(eq(entries.userId, user.id))
    .orderBy(desc(entries.createdAt));

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. HEADER */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md transition-all supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              MindLog
            </h1>
            <p className="text-[10px] font-medium text-slate-500 tracking-wide">
              DAILY AI JOURNAL
            </p>
          </div>
          <UserNav email={user.email} />
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="mx-auto max-w-lg px-4 mt-8 space-y-10 animate-in fade-in duration-500 slide-in-from-bottom-4">
        
        {/* SECTION 1: INPUT FORM */}
        <section className="relative z-10">
          <div className="mb-3 pl-1">
             <h2 className="text-lg font-semibold text-gray-800">Apa Kabar Hari Ini?</h2>
             <p className="text-xs text-gray-500">Ceritakan harimu, biarkan AI menyimaknya.</p>
          </div>
          <CreateEntryForm />
        </section>

        {/* SECTION 2: HORIZONTAL LIST (CAROUSEL) */}
        <section>
          <div className="flex items-center justify-between mb-4 pl-1 pr-2">
            <div className="flex items-center gap-2 text-slate-700">
              <BookHeart className="h-4 w-4 text-indigo-500" />
              <h2 className="text-sm font-bold tracking-tight">Terbaru</h2>
            </div>
            {/* Indikator Swipe */}
            {journalEntries.length > 1 && (
              <span className="text-[10px] text-slate-400 font-medium animate-pulse">
                Geser ke samping &rarr;
              </span>
            )}
          </div>

          {/* Wrapper Carousel */}
          <div className="relative -mx-4 px-4">
            {journalEntries.length === 0 ? (
              <div className="mx-4 flex flex-col items-center justify-center py-12 px-4 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/50">
                <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center mb-3 text-indigo-500">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-500">Belum ada cerita hari ini.</p>
              </div>
            ) : (
              // HORIZONTAL SCROLL AREA
              <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                {journalEntries.map((entry) => (
                  // KARTU ITEM
                  <div
                    key={entry.id}
                    className={`flex-none w-[85%] sm:w-[320px] snap-center flex flex-col justify-between p-5 rounded-3xl border transition-all shadow-sm ${getCardStyle(entry.moodScore)}`}
                  >
                    <div>
                      {/* Header Kartu */}
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
                          <span className="text-xl">{entry.moodScore >= 8 ? "🤩" : entry.moodScore >= 5 ? "😌" : "🥀"}</span>
                        )}
                      </div>

                      {/* Konten */}
                      <div className="min-h-[60px]">
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {entry.contentRaw}
                        </p>
                      </div>
                    </div>

                    {/* Footer / AI Insight */}
                    <div className="mt-4 pt-2 border-t border-black/5">
                      {entry.aiSummary ? (
                        <div className="flex gap-2 items-start">
                          <Sparkles className="h-3 w-3 text-indigo-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-slate-600 italic leading-snug">
                            {/* PERBAIKAN DI SINI: Ganti " dengan &quot; */}
                            &quot;{entry.aiSummary.replace(/^\[.*?\]\s*/, "")}&quot;
                          </p>
                        </div>
                      ) : (
                        <div className="w-full">
                           <AnalyzeButton id={entry.id} content={entry.contentRaw} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Spacer di ujung kanan */}
                <div className="w-2 shrink-0"></div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: AREA KOSONG */}
        <section className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-slate-800">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                <h3 className="font-bold">Weekly Mood Insight</h3>
            </div>
            <p className="text-sm text-slate-400">
                Fitur ini akan segera hadir untuk melacak grafik emosimu minggu ini!
            </p>
            <div className="mt-4 h-24 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-300">
                Grafik akan muncul di sini
            </div>
        </section>

      </main>
    </div>
  );
}