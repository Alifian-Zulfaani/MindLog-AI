'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

// Schema validasi untuk response AI
const aiResponseSchema = z.object({
  mood_score: z.number().min(1).max(10),
  mood_label: z.string().min(1),
  advice: z.string().min(1),
});

/**
 * Menganalisis konten jurnal menggunakan Gemini AI.
 * Hasilnya: skor mood (1-10), label mood, dan saran singkat.
 * moodLabel dan aiSummary disimpan terpisah sesuai kolom di schema.
 */
export async function analyzeEntry(entryId: string, content: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Bertindaklah sebagai teman curhat yang bijak. Analisis jurnal ini: "${content}"
      
      Tugasmu:
      1. Berikan skor mood 1-10.
      2. Berikan label mood satu kata (misal: "Lega", "Capek", "Semangat").
      3. Berikan saran singkat (max 20 kata) yang hangat.

      Output MURNI JSON string saja tanpa markdown:
      {
        "mood_score": number,
        "mood_label": "string",
        "advice": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Bersihkan response dari markdown formatting
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    const rawData = JSON.parse(cleanedJson);

    // Validasi structure response AI dengan Zod
    const data = aiResponseSchema.parse(rawData);

    // Simpan moodLabel dan aiSummary terpisah (opsi 2)
    await db.update(entries)
      .set({
        moodScore: data.mood_score,
        moodLabel: data.mood_label,
        aiSummary: data.advice,
      })
      .where(eq(entries.id, entryId));

    revalidatePath("/dashboard");
    return { success: true };

  } catch (error: unknown) {
    console.error("AI Error:", error);
    
    const err = error as { status?: number; message?: string };

    if (err.status === 429 || err.message?.includes('429')) {
      return { success: false, error: "AI lagi sibuk (Quota Exceeded). Tunggu sebentar ya." };
    }

    if (error instanceof z.ZodError) {
      return { success: false, error: "Format AI response tidak valid. Coba lagi." };
    }

    return { success: false, error: "Gagal memproses AI. Coba lagi nanti." };
  }
}