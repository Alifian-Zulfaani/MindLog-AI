import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User, Settings, Bell, Moon, LogOut, ChevronRight } from "lucide-react";
import { signOutAction } from "@/actions/auth-actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="selection:bg-indigo-100 selection:text-indigo-900 flex-1 flex flex-col">
      <main className="px-4 pt-6 pb-6 space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4 flex-1">
        
        {/* Profile Info Section */}
        <section className="flex flex-col items-center text-center relative z-10">
          <div className="h-24 w-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white font-bold text-4xl shadow-xl flex items-center justify-center mb-4 ring-4 ring-white">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Profil Kamu</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">{user.email}</p>
        </section>
        
        {/* Settings List */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">Edit Profil</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>

          <div className="p-4 border-b border-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Bell className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">Notifikasi</span>
            </div>
            <div className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
              Segera
            </div>
          </div>

          <div className="p-4 border-b border-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                <Moon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">Tema Tampilan</span>
            </div>
            <span className="text-xs text-slate-400">Terang</span>
          </div>
          
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                <Settings className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">Pengaturan Lanjutan</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>
        </section>

        {/* Logout Form Action */}
        <section>
          <form action={signOutAction}>
            <button 
              type="submit"
              className="w-full py-4 bg-white border border-red-100 rounded-3xl shadow-sm flex items-center justify-center gap-2 text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98]"
            >
              <LogOut className="h-5 w-5" />
              Keluar Akun
            </button>
          </form>
        </section>

      </main>
    </div>
  );
}
