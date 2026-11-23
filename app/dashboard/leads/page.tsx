import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LEAD_SOURCES, LEAD_STATUSES, formatDate, formatEGP } from "@/lib/constants";
import { Field, PageHeader, StatusBadge, inputClass } from "@/components/ui";
import { createLead } from "../actions";

export const dynamic = "force-dynamic";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; error?: string }>;
}) {
  const { status, q, error } = await searchParams;

  const [leads, users, projects] = await Promise.all([
    prisma.lead.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q } },
                { phone: { contains: q } },
                { email: { contains: q } },
              ],
            }
          : {}),
      },
      include: { project: true, assignedTo: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ include: { city: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Pipeline"
        title="Leads"
        description={`${leads.length} ${leads.length === 1 ? "record" : "records"} matching your view.`}
      />

      {error === "missing" && (
        <p className="rounded-sm border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          A lead needs at least a name and a phone number.
        </p>
      )}

      <div className="rounded-sm border border-ink/10 bg-white">
        <form className="flex flex-wrap items-center gap-3 border-b border-ink/10 p-4">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, phone or email"
            className={`${inputClass} max-w-xs`}
          />
          <select name="status" defaultValue={status ?? ""} className={`${inputClass} max-w-[180px]`}>
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-sm bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            Filter
          </button>
          {(status || q) && (
            <Link href="/dashboard/leads" className="text-xs text-gold underline underline-offset-4">
              Reset
            </Link>
          )}
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Interest</th>
                <th className="px-5 py-3 font-medium">Budget</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Owner</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="transition hover:bg-sand/50">
                  <td className="px-5 py-3.5">
                    <Link href={`/dashboard/leads/${lead.id}`} className="font-medium text-ink hover:text-gold">
                      {lead.name}
                    </Link>
                    <p className="text-xs text-slate-ink">{lead.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-ink">
                    {lead.project?.name ?? "General inquiry"}
                  </td>
                  <td className="px-5 py-3.5">{formatEGP(lead.budget)}</td>
                  <td className="px-5 py-3.5 text-xs uppercase tracking-wide text-slate-ink">{lead.source}</td>
                  <td className="px-5 py-3.5 text-slate-ink">{lead.assignedTo.name}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                  <td className="px-5 py-3.5 text-xs text-slate-ink">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-ink">
                    No leads match this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <details className="rounded-sm border border-ink/10 bg-white">
        <summary className="cursor-pointer px-5 py-4 font-display text-lg">Add a lead manually</summary>
        <form action={createLead} className="grid gap-4 border-t border-ink/10 p-5 md:grid-cols-2">
          <Field label="Full name"><input name="name" required className={inputClass} /></Field>
          <Field label="Phone"><input name="phone" required className={inputClass} /></Field>
          <Field label="Email"><input name="email" type="email" className={inputClass} /></Field>
          <Field label="Budget (EGP)"><input name="budget" inputMode="numeric" className={inputClass} /></Field>
          <Field label="Project of interest">
            <select name="projectId" className={inputClass}>
              <option value="">General inquiry</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name} — {project.city.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Source">
            <select name="source" className={inputClass}>
              {LEAD_SOURCES.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select name="status" className={inputClass}>
              {LEAD_STATUSES.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Assign to">
            <select name="assignedToId" className={inputClass}>
              {users.map((member) => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Message">
              <textarea name="message" rows={3} className={inputClass} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-sm bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Save lead
            </button>
          </div>
        </form>
      </details>
    </div>
  );
}
