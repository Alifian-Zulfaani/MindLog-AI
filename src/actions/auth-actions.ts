'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// PERBAIKAN: Disable linter untuk prevState: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, message: "Email wajib diisi" };
  }
  
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  
  return { success: true, message: "Link login telah dikirim ke emailmu!" };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}