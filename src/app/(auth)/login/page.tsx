'use client'

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth-actions";
import { Loader2, MailCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  // Hook untuk handle form state & loading
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <div className="mx-auto w-full max-w-lg min-h-screen bg-white relative shadow-2xl shadow-slate-200/40 border-x border-slate-100 flex flex-col pt-12 pb-6 px-6">
        
        {/* LOGO AREA - Top */}
        <div className="flex justify-center mb-12">
           <div className="text-center">
              <h2 className="text-2xl font-extrabold text-indigo-700 tracking-tight">MindLog AI</h2>
              <p className="text-[10px] text-indigo-400 font-bold tracking-widest mt-1">YOUR DAILY COMPANION</p>
           </div>
        </div>

        {/* ILLUSTRATION AREA - Center */}
        {!state.success && (
          <div className="flex-1 flex justify-center items-center mb-8">
            <div className="relative w-40 h-40 flex justify-center items-center">
              <img src="/logo.png" alt="MindLog AI Logo" className="w-full h-full object-contain drop-shadow-xl animate-in fade-in zoom-in duration-700" />
            </div>
          </div>
        )}

        <div className="mt-auto">
          {/* KONDISI: Jika Sukses Kirim Email */}
          {state.success ? (
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <MailCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Cek Email Kamu!</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Kami telah mengirimkan tautan ajaib (Magic Link) ke inbox kamu. Klik tautan tersebut untuk masuk.
              </p>
              <div className="pt-4">
                 <Button variant="outline" asChild className="w-full rounded-xl h-12">
                    <Link href="/login" onClick={() => window.location.reload()}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Masuk dengan email lain
                    </Link>
                 </Button>
              </div>
            </div>
          ) : (
            /* KONDISI: Form Login Normal */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
                <p className="text-sm text-gray-500 mt-2 px-4">Masukan email untuk melanjutkan akses jurnalmu.</p>
              </div>

              <form action={formAction} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email</label>
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="nama@contoh.com" 
                    required 
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl text-base px-4"
                  />
                </div>

                {state.message && !state.success && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                    ⚠️ {state.message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg rounded-xl mt-2" 
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengirim Link...
                    </>
                  ) : (
                    "Masuk dengan Magic Link"
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
        
        {/* Footer Kecil */}
        <div className="mt-8 text-center pb-4">
            <p className="text-[11px] text-gray-400">MindLog AI &copy; 2026. Secure & Private.</p>
        </div>
      </div>
    </div>
  );
}