'use server'

import { db } from "@/db";
import { entries } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const journalSchema = z.object({
  content: z.string().min(10, { message: "Cerita dong, minimal 10 karakter ya!" }),
});

// Fungsi untuk membuat entri jurnal baru
export async function createEntry(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Unauthorized", success: false };
  }

  const rawContent = formData.get("content");
  const validatedFields = journalSchema.safeParse({ content: rawContent });

  if (!validatedFields.success) {
    return { 
      message: validatedFields.error.flatten().fieldErrors.content?.[0], 
      success: false 
    };
  }

  try {
    await db.insert(entries).values({
      userId: user.id,
      contentRaw: validatedFields.data.content,
    });

    revalidatePath("/dashboard");
    return { message: "Jurnal berhasil disimpan!", success: true };
    
  } catch { 
    return { message: "Gagal menyimpan database", success: false };
  }
}