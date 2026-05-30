import { UserNav } from "@/components/shared/UserNav";

interface TopNavProps {
  email: string | undefined;
}

/**
 * Header sticky untuk halaman dashboard dan menu lainnya.
 * Menampilkan logo aplikasi dan dropdown navigasi user.
 */
export function TopNav({ email }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-40 mx-auto w-full max-w-lg border-b border-gray-200/60 bg-white/80 backdrop-blur-md transition-all supports-backdrop-filter:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4">
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
