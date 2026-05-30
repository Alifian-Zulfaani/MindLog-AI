import { BarChart3 } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center selection:bg-indigo-100 selection:text-indigo-900 p-4">
      <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600 shadow-sm">
          <BarChart3 className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Laporan Mood</h1>
        <p className="text-slate-500 max-w-[280px]">
          Fitur analisis mood bulanan dan tracker habit sedang dipersiapkan untukmu.
        </p>
        <div className="mt-8 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium border border-amber-100">
          Segera Hadir 🚀
        </div>
      </div>
    </div>
  );
}
