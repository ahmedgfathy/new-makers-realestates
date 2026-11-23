import DashboardShell from "@/components/DashboardShell";
import { requireUser } from "@/lib/auth";
import { logout } from "@/app/login/actions";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <DashboardShell
      user={{ name: user.name, email: user.email, role: user.role }}
      logout={logout}
    >
      {children}
    </DashboardShell>
  );
}
