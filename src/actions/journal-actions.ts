'use server'

import { db } from "@/db";
import { entries } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// 1. Definisikan Schema Validasi
const journalSchema = z.object({
  content: z.string().min(10, { message: "Cerita dong, minimal 10 karakter ya!" }),
});

export async function createEntry(prevState: any, formData: FormData) {
  // 2. Cek Autentikasi (Security Layer)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Unauthorized", success: false };
  }

  // 3. Validasi Input dengan Zod
  const rawContent = formData.get("content");
  const validatedFields = journalSchema.safeParse({ content: rawContent });

  if (!validatedFields.success) {
    return { 
      message: validatedFields.error.flatten().fieldErrors.content?.[0], 
      success: false 
    };
  }

  // 4. Simpan ke Database (Drizzle)
  try {
    await db.insert(entries).values({
      userId: user.id,
      contentRaw: validatedFields.data.content,
      // moodScore & aiSummary kita biarkan null dulu
    });

    // 5. Revalidate (Refresh data tanpa reload page browser)
    revalidatePath("/dashboard");
    return { message: "Jurnal berhasil disimpan!", success: true };
    
  } catch (e) {
    return { message: "Gagal menyimpan database", success: false };
  }
}