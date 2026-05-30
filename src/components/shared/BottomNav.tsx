"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, BarChart2, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Beranda",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Chat AI",
      href: "/chat",
      icon: MessageCircle,
    },
    {
      name: "Laporan",
      href: "/report",
      icon: BarChart2,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-lg z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 pb-safe">
      <div className="max-w-lg mx-auto px-6 py-2 pb-4 sm:pb-2 flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Exact match for dashboard, startswith for others if they have subpages
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-colors",
                isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive ? "bg-indigo-50" : "bg-transparent"
                )}
              >
                <Icon 
                  className={cn(
                    "h-5 w-5 transition-transform duration-300", 
                    isActive && "scale-110"
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={cn(
                "text-[10px] tracking-wide transition-all duration-300",
                isActive ? "font-bold" : "font-medium"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
