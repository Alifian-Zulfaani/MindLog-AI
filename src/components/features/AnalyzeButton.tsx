'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeEntry } from "@/actions/ai-actions";
import { Sparkles, Loader2 } from "lucide-react";

export function AnalyzeButton({ id, content }: { id: string, content: string }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setErrorMsg("");
    
    const res = await analyzeEntry(id, content);
    
    if (!res.success) {
      setErrorMsg(res.error || "Gagal");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end">
      {errorMsg && <p className="text-xs text-red-500 mb-2">{errorMsg}</p>}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleAnalyze} 
        disabled={loading}
        className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full px-4 border border-indigo-100 transition-all shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" /> 
            Sedang membaca...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-3 w-3" /> 
            Analisis Mood
          </>
        )}
      </Button>
    </div>
  );
}