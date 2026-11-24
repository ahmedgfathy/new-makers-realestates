import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import UserForm from "@/components/UserForm";
import ConfirmButton from "@/components/ConfirmButton";
import { PageHeader } from "@/components/ui";
import { deleteUser, saveUser } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentUser = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { leads: true } } },
  });

  if (!user) notFound();

  const isSelf = user.id === currentUser.id;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/users" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to users
      </Link>
      <PageHeader
        eyebrow="Team"
        title={`Edit ${user.name}`}
        description={
          isSelf
            ? "Your own account — change your details or password here."
            : `${user._count.leads} lead(s) assigned. Leave the password blank to keep it unchanged.`
        }
      />

      <UserForm action={saveUser} user={user} isSelf={isSelf} />

      {!isSelf && (
        <div className="rounded-sm border border-rose-200 bg-white p-5">
          <h2 className="font-display text-lg text-rose-700">Delete user</h2>
          <p className="mt-1 text-xs text-slate-ink">
            Their {user._count.leads} lead(s) are reassigned to your account so no lead history is
            lost.
          </p>
          <form action={deleteUser} className="mt-4">
            <input type="hidden" name="id" value={user.id} />
            <ConfirmButton
              message={`Delete ${user.name}? Their leads move to you and they lose access immediately.`}
              className="rounded-sm border border-rose-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-700 hover:bg-rose-50"
            >
              Delete this user
            </ConfirmButton>
          </form>
        </div>
      )}
    </div>
  );
}
