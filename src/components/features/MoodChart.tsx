"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  date: string;
  score: number;
  fullDate: string;
};

export function MoodChart({ data }: { data: ChartData[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Untuk menghindari masalah hidrasi, kita tunggu sampai komponen ter-mount di klien
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return (
      <div className="h-52 w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs text-slate-300">Memuat grafik...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm text-slate-400">
        Belum cukup data untuk grafik
      </div>
    );
  }

  return (
    <div className="h-52 w-full" style={{ width: '100%', height: 208 }}> 
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={undefined} aspect={undefined}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            domain={[0, 10]}
            hide={false}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            cursor={{
              stroke: "#6366f1",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorScore)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}