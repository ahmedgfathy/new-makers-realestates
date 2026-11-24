import Link from "next/link";
import UserForm from "@/components/UserForm";
import { PageHeader } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { saveUser } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewUserPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/users" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to users
      </Link>
      <PageHeader
        eyebrow="Team"
        title="New user"
        description="They can sign in immediately with the email and password you set."
      />
      <UserForm action={saveUser} />
    </div>
  );
}
