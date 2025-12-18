'use client'

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth-actions";
import { Loader2, MailCheck, ArrowLeft } from "lucide-react"; // Pastikan install lucide-react
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  // Hook sakti Next.js 15 untuk handle form state & loading
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* LOGO AREA */}
        <div className="bg-indigo-50 p-6 flex justify-center border-b border-indigo-100">
             {/* Jika gambar logo belum ada, pakai teks dulu biar ga broken image */}
             <div className="text-center">
                <h2 className="text-2xl font-extrabold text-indigo-700 tracking-tight">MindLog AI</h2>
                <p className="text-xs text-indigo-400 font-medium">YOUR DAILY COMPANION</p>
             </div>
             {/* <img src="/logo.png" className="h-12 w-auto" alt="Logo" /> */}
        </div>

        <div className="p-8">
          {/* KONDISI: Jika Sukses Kirim Email */}
          {state.success ? (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <MailCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Cek Email Kamu!</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Kami telah mengirimkan tautan ajaib (Magic Link) ke inbox kamu. Klik tautan tersebut untuk masuk.
              </p>
              <div className="pt-4">
                 <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={() => window.location.reload()}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Masuk dengan email lain
                    </Link>
                 </Button>
              </div>
            </div>
          ) : (
            /* KONDISI: Form Login Normal */
            <>
              <div className="text-center mb-8">
                <h1 className="text-xl font-bold text-gray-900">Selamat Datang</h1>
                <p className="text-sm text-gray-500 mt-2">Masukan email untuk melanjutkan akses jurnalmu.</p>
              </div>

              <form action={formAction} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email</label>
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="nama@contoh.com" 
                    required 
                    className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>

                {state.message && !state.success && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-600 flex items-center gap-2">
                    ⚠️ {state.message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg" 
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
            </>
          )}
        </div>
        
        {/* Footer Kecil */}
        {!state.success && (
            <div className="bg-gray-50 px-8 py-4 text-center">
                <p className="text-xs text-gray-400">MindLog AI &copy; 2026. Aman & Privat.</p>
            </div>
        )}
      </div>
    </div>
  );
}