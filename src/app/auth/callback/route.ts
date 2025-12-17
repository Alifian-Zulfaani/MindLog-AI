// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Jika sukses tukar code, redirect ke dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Jika error, kembalikan ke login dengan pesan error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}