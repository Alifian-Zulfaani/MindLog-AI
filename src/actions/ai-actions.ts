'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function analyzeEntry(entryId: string, content: string) {
  try {
    // SAYA KEMBALIKAN KE 1.5 DULU AGAR STABIL (2.5 belum rilis publik)
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
    
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanedJson);

    await db.update(entries)
      .set({
        moodScore: data.mood_score,
        aiSummary: `[${data.mood_label}] ${data.advice}`, 
      })
      .where(eq(entries.id, entryId));

    revalidatePath("/dashboard");
    return { success: true };

  // PERBAIKAN: Disable linter untuk error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("AI Error Full Log:", error);
    
    if (error.status === 429 || error.message?.includes('429')) {
      return { success: false, error: "AI lagi sibuk (Quota Exceeded). Tunggu sebentar ya." };
    }

    return { success: false, error: "Gagal memproses AI. Coba lagi nanti." };
  }
}