import { UserNav } from "@/components/shared/UserNav";

interface DashboardHeaderProps {
  email: string | undefined;
}

/**
 * Header sticky untuk halaman dashboard.
 * Menampilkan logo aplikasi dan dropdown navigasi user.
 */
export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md transition-all supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            MindLog
          </h1>
          <p className="text-[10px] font-medium text-slate-500 tracking-wide">
            DAILY AI JOURNAL
          </p>
        </div>
        <UserNav email={email} />
      </div>
    </nav>
  );
}
