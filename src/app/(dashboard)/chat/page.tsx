import { BotMessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 flex flex-col items-center justify-center selection:bg-indigo-100 selection:text-indigo-900">
      <div className="mx-auto max-w-lg px-4 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600 shadow-sm">
          <BotMessageSquare className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">AI Chat Reflection</h1>
        <p className="text-slate-500 max-w-[280px]">
          Fitur ngobrol dengan AI untuk membahas jurnal dan perasaanmu sedang dalam tahap pengembangan.
        </p>
        <div className="mt-8 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium border border-indigo-100">
          Segera Hadir 🚀
        </div>
      </div>
    </div>
  );
}
