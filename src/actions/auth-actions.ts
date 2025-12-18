'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  // Validasi sederhana
  if (!email) {
    return { success: false, message: "Email wajib diisi" };
  }
  
  // Login simpel pakai Magic Link (Tanpa password) agar cepat dev-nya
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Pastikan URL ini benar sesuai environment (Local vs Production)
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  
  // JANGAN REDIRECT. Kembalikan success state.
  return { success: true, message: "Link login telah dikirim ke emailmu!" };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}