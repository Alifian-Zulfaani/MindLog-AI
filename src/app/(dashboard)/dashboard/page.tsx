import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { BookHeart, Sparkles, TrendingUp } from "lucide-react";

import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { CreateEntryForm } from "@/components/features/CreateEntryForm";
import { JournalCard } from "@/components/features/JournalCard";
import { MoodChart } from "@/components/features/MoodChart";
import { prepareChartData } from "@/lib/helpers/mood";

export default async function Dashboard() {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch journal entries
  const journalEntries = await db
    .select()
    .from(entries)
    .where(eq(entries.userId, user.id))
    .orderBy(desc(entries.createdAt));

  // Prepare chart data
  const chartData = prepareChartData(journalEntries);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. HEADER */}
      <DashboardHeader email={user.email} />

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

        {/* SECTION 2: JOURNAL CARDS CAROUSEL */}
        <section>
          <div className="flex items-center justify-between mb-4 pl-1 pr-2">
            <div className="flex items-center gap-2 text-slate-700">
              <BookHeart className="h-4 w-4 text-indigo-500" />
              <h2 className="text-sm font-bold tracking-tight">Terbaru</h2>
            </div>
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
              <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                {journalEntries.map((entry) => (
                  <JournalCard key={entry.id} entry={entry} />
                ))}
                {/* Spacer di ujung kanan */}
                <div className="w-2 shrink-0"></div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: WEEKLY MOOD CHART */}
        <section className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-800">
                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h3 className="font-bold text-sm">Grafik Mood Mingguan</h3>
                      <p className="text-[10px] text-slate-400">7 hari terakhir</p>
                    </div>
                </div>
                {/* Indikator Rata-rata */}
                 {chartData.some(d => d.score > 0) && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Rata-rata</span>
                    <p className="font-bold text-indigo-600 text-lg">
                      {(chartData.reduce((acc, curr) => acc + curr.score, 0) / (chartData.filter(d => d.score > 0).length || 1)).toFixed(1)}
                    </p>
                  </div>
                )}
            </div>

            {/* KOMPONEN CHART */}
            <div className="w-full">
              <MoodChart data={chartData} />
            </div>
        </section>

      </main>
    </div>
  );
}