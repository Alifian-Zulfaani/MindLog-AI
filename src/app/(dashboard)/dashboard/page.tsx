import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { AnalyzeButton } from "@/components/features/AnalyzeButton";
import { CreateEntryForm } from "@/components/features/CreateEntryForm";

// Helper warna background kartu berdasarkan mood
const getCardStyle = (score: number | null) => {
  if (score === null) return "bg-white border-slate-100"; // Belum dianalisis
  if (score <= 4) return "bg-rose-50/80 border-rose-100"; // Mood buruk
  if (score <= 7) return "bg-sky-50/80 border-sky-100";   // Mood biasa
  return "bg-emerald-50/80 border-emerald-100";          // Mood bagus
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
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER STICKY */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              MindLog
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">YOUR DAILY AI COMPANION</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
             {user.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 mt-6 space-y-8">
        
        {/* INPUT FORM SECTION */}
        <section>
          <CreateEntryForm />
        </section>

        {/* LIST SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold text-slate-700">Riwayat Jurnal</h2>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
              {journalEntries.length} Entries
            </span>
          </div>

          <div className="space-y-4">
            {journalEntries.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200 bg-white/50">
                <p className="text-4xl mb-2">🍃</p>
                <p className="text-slate-500 text-sm">Halaman ini masih kosong.<br/>Mulai tulis ceritamu hari ini.</p>
              </div>
            ) : (
              journalEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${getCardStyle(entry.moodScore)}`}
                >
                  {/* Header Kartu: Tanggal & Mood Emoji */}
                  <div className="flex justify-between items-start mb-3 border-b border-black/5 pb-3">
                    <span className="text-xs font-semibold text-slate-500 tracking-wide">
                      {entry.createdAt.toLocaleDateString('id-ID', { 
                        weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' 
                      })}
                    </span>
                    {entry.moodScore && (
                      <span className="text-xl animate-in zoom-in spin-in-3" title={`Score: ${entry.moodScore}`}>
                        {entry.moodScore >= 8 ? "🤩" : entry.moodScore >= 5 ? "😌" : "🌧️"}
                      </span>
                    )}
                  </div>

                  {/* Konten User */}
                  <p className="text-slate-800 text-[15px] leading-relaxed whitespace-pre-wrap font-normal">
                    {entry.contentRaw}
                  </p>

                  {/* AI Section */}
                  <div className="mt-4 pt-1">
                    {entry.aiSummary ? (
                      <div className="bg-white/60 p-3 rounded-xl border border-black/5 backdrop-blur-sm">
                        <div className="flex gap-2 items-start">
                          <div className="mt-1 text-indigo-500">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                          </div>
                          <p className="text-xs text-slate-600 italic leading-5">
                            <span className="font-semibold text-indigo-600 not-italic block mb-1">
                              {entry.aiSummary.match(/^\[(.*?)\]/)?.[1] || "Insight"}
                            </span>
                            {entry.aiSummary.replace(/^\[.*?\]\s*/, "")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <AnalyzeButton id={entry.id} content={entry.contentRaw} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}