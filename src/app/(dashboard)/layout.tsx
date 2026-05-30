import { BottomNav } from "@/components/shared/BottomNav";
import { TopNav } from "@/components/shared/TopNav";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="mx-auto w-full max-w-lg min-h-screen bg-gray-50/50 relative shadow-2xl shadow-slate-200/40 border-x border-slate-100 flex flex-col">
      <TopNav email={user?.email} />
      <div className="flex-1 flex flex-col pb-24">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
