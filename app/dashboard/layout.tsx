import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/app/login/actions";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f4f8ff] lg:flex-row">
      <DashboardSidebar adminName={session.name} />

      {/* Main content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
