import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/ui";
import Alert from "@/components/Alert";
import ConfirmButton from "@/components/ConfirmButton";
import { deleteUser } from "../actions";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  self: "You cannot delete the account you are signed in with.",
  "last-admin": "At least one admin must stay on the team.",
  missing: "A user needs a name and an email.",
  email: "Enter a valid email address.",
  duplicate: "Another user already uses that email.",
  short: "Passwords must be at least 8 characters.",
  selfrole: "You cannot remove your own admin role.",
};

export default async function DashboardUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { error, saved } = await searchParams;
  const currentUser = await requireAdmin();

  const users = await prisma.user.findMany({
    include: { _count: { select: { leads: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Team"
        title="Users"
        description={`${users.length} accounts can sign in to the CRM.`}
        action={
          <Link
            href="/dashboard/users/new"
            className="rounded-sm bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            + New user
          </Link>
        }
      />

      {saved === "created" && (
        <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          User created — share the email and password with them.
        </p>
      )}
      {saved === "updated" && (
        <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          User updated.
        </p>
      )}
      {error && <Alert kind="error">{ERRORS[error] ?? "Something went wrong."}</Alert>}

      <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Assigned leads</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {users.map((member) => {
                const isSelf = member.id === currentUser.id;
                return (
                  <tr key={member.id} className="transition hover:bg-sand/50">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-ink">
                        {member.name}
                        {isSelf && (
                          <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-slate-ink">
                            You
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-ink">{member.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ${
                          member.role === "ADMIN"
                            ? "bg-ink text-white ring-ink"
                            : "bg-sand text-slate-ink ring-ink/10"
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-ink">{member.phone ?? "—"}</td>
                    <td className="px-5 py-3.5">{member._count.leads}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-ink">
                      {member.createdAt.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/dashboard/users/${member.id}/edit`}
                          className="text-[11px] uppercase tracking-[0.14em] text-gold"
                        >
                          Edit
                        </Link>
                        {!isSelf && (
                          <form action={deleteUser}>
                            <input type="hidden" name="id" value={member.id} />
                            <ConfirmButton
                              message={`Delete ${member.name}? Their ${member._count.leads} lead(s) move to your account.`}
                              className="text-[11px] uppercase tracking-[0.14em] text-rose-600 hover:text-rose-800"
                            >
                              Delete
                            </ConfirmButton>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-ink">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-ink">
        Agents can manage leads, projects, developers and areas. Only admins can open this page,
        create accounts or reset passwords. Everyone can edit their own profile and password in{" "}
        <Link href="/dashboard/settings" className="text-gold hover:underline">
          Settings
        </Link>
        .
      </p>
    </div>
  );
}
