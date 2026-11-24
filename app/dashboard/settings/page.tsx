import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Field, PageHeader, inputClass } from "@/components/ui";
import { changePassword, updateProfile } from "../actions";

export const dynamic = "force-dynamic";

const ERROR_MESSAGES: Record<string, string> = {
  short: "The new password must be at least 8 characters.",
  invalid: "Your current password is incorrect.",
  email: "Enter a valid email address.",
  taken: "That email is already used by another account.",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const user = await requireUser();
  const team = await prisma.user.findMany({
    include: { _count: { select: { leads: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your profile, password and team access."
        action={
          user.role === "ADMIN" ? (
            <Link
              href="/dashboard/users"
              className="rounded-sm border border-ink/20 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-gold hover:text-gold"
            >
              Manage users
            </Link>
          ) : undefined
        }
      />

      {saved && (
        <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {saved === "password" ? "Password updated." : "Profile saved."}
        </p>
      )}
      {error && (
        <p className="rounded-sm border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {ERROR_MESSAGES[error] ?? "Something went wrong."}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <form action={updateProfile} className="space-y-4 rounded-sm border border-ink/10 bg-white p-5">
          <h2 className="font-display text-lg">Profile</h2>
          <Field label="Name"><input name="name" defaultValue={user.name} className={inputClass} /></Field>
          <Field label="Email (used to sign in)">
            <input name="email" type="email" defaultValue={user.email} className={inputClass} />
          </Field>
          <Field label="Phone"><input name="phone" defaultValue={user.phone ?? ""} className={inputClass} /></Field>
          <p className="text-xs text-slate-ink">
            Role: <span className="font-semibold text-ink">{user.role}</span>
            {user.role !== "ADMIN" && " — ask an admin to change it."}
          </p>
          <button
            type="submit"
            className="rounded-sm bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Save profile
          </button>
        </form>

        <form action={changePassword} className="space-y-4 rounded-sm border border-ink/10 bg-white p-5">
          <h2 className="font-display text-lg">Change password</h2>
          <Field label="Current password">
            <input name="current" type="password" required autoComplete="current-password" className={inputClass} />
          </Field>
          <Field label="New password">
            <input name="next" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
          </Field>
          <button
            type="submit"
            className="rounded-sm bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            Update password
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
        <div className="border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-lg">Team</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
            <tr className="border-b border-ink/10">
              <th className="px-5 py-3 font-medium">Member</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Assigned leads</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {team.map((member) => (
              <tr key={member.id}>
                <td className="px-5 py-3">{member.name}</td>
                <td className="px-5 py-3 text-slate-ink">{member.email}</td>
                <td className="px-5 py-3 text-xs uppercase tracking-wide text-slate-ink">{member.role}</td>
                <td className="px-5 py-3">{member._count.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
