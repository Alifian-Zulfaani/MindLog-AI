// src/actions/auth-actions.ts
'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  
  // Login simpel pakai Magic Link (Tanpa password) agar cepat dev-nya
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Ganti ini nanti sesuai URL lokalmu saat development
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    return { error: error.message };
  }
  
  // Redirect atau beri notifikasi cek email
  redirect("/?message=check-email");
}