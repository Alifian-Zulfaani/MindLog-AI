'use client'

import { useActionState, useEffect, useRef, useState } from "react";
import { createEntry } from "@/actions/journal-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const initialState = {
  message: "",
  success: false,
};

export function CreateEntryForm() {
  const [state, formAction, isPending] = useActionState(createEntry, initialState);
  // Ref untuk akses elemen form HTML
  const formRef = useRef<HTMLFormElement>(null);
  // State lokal untuk kontrol visibilitas pesan sukses
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      // 1. Tampilkan pesan sukses
      setShowSuccess(true);
      // 2. Reset Textarea
      formRef.current?.reset();
      
      // 3. Sembunyikan pesan setelah 3 detik
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <form 
      ref={formRef} 
      action={formAction} 
      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group focus-within:ring-2 focus-within:ring-indigo-100 transition-all"
    >
      {/* Overlay Sukses (Muncul 3 Detik) */}
      {showSuccess && (
        <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-green-600 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="h-8 w-8 mb-2" />
          <p className="font-semibold text-sm">Jurnal Tersimpan!</p>
        </div>
      )}

      <div className="relative">
        <Textarea 
          name="content" 
          placeholder="Apa yang ada di pikiranmu saat ini?" 
          className="min-h-25 border-none shadow-none resize-none p-0 text-base focus-visible:ring-0 placeholder:text-slate-400 bg-transparent"
          required
          // Disable kalau sedang sukses agar user tidak spam
          disabled={showSuccess} 
        />
      </div>
      
      {/* Tombol & Error Message */}
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-50">
         <div className="text-xs text-slate-400">
           {state.message && !state.success && (
            <span className="text-red-500">{state.message}</span>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isPending || showSuccess} // Disable saat loading atau sukses
          size="sm"
          className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 transition-all"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>Simpan <Send className="ml-2 h-3 w-3" /></>
          )}
        </Button>
      </div>
    </form>
  );
}