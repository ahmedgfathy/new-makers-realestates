import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LEAD_STATUSES, formatDate, formatEGP } from "@/lib/constants";
import { Field, StatusBadge, inputClass } from "@/components/ui";
import { addLeadNote, deleteLead, updateLeadStatus } from "../../actions";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      project: { include: { city: true } },
      city: true,
      assignedTo: true,
      createdBy: true,
      activities: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <Link href="/dashboard/leads" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to leads
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">{lead.name}</h1>
          <p className="mt-1 text-sm text-slate-ink">
            {lead.project ? lead.project.name : "General inquiry"} · Created {formatDate(lead.createdAt)} by {lead.createdBy.name}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-sm border border-ink/10 bg-white p-5">
            <h2 className="font-display text-lg">Deal details</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Phone", value: lead.phone },
                { label: "Email", value: lead.email ?? "—" },
                { label: "Budget", value: formatEGP(lead.budget) },
                { label: "Source", value: lead.source },
                { label: "City", value: lead.city?.name ?? lead.project?.city.name ?? "—" },
                { label: "Assigned to", value: lead.assignedTo.name },
              ].map((item) => (
                <div key={item.label} className="border-b border-ink/5 pb-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">{item.label}</dt>
                  <dd className="mt-1 text-sm text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
            {lead.message && (
              <div className="mt-4 rounded-sm bg-sand p-4 text-sm leading-relaxed text-slate-ink">
                {lead.message}
              </div>
            )}
          </section>

          <section className="rounded-sm border border-ink/10 bg-white p-5">
            <h2 className="font-display text-lg">Activity timeline</h2>

            <form action={addLeadNote} className="mt-4 grid gap-3 sm:grid-cols-[1fr_150px_auto]">
              <input type="hidden" name="leadId" value={lead.id} />
              <input name="body" required placeholder="Log a call, meeting or note…" className={inputClass} />
              <select name="type" className={inputClass}>
                <option value="NOTE">Note</option>
                <option value="CALL">Call</option>
                <option value="EMAIL">Email</option>
                <option value="MEETING">Meeting</option>
              </select>
              <button
                type="submit"
                className="rounded-sm bg-ink px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
              >
                Add
              </button>
            </form>

            <ul className="mt-6 space-y-4">
              {lead.activities.map((activity) => (
                <li key={activity.id} className="relative border-l border-ink/10 pl-4">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
                    {activity.type} · {formatDate(activity.createdAt)}
                  </p>
                  <p className="mt-1 text-sm text-ink">{activity.body}</p>
                </li>
              ))}
              {lead.activities.length === 0 && (
                <li className="text-sm text-slate-ink">No activity recorded yet.</li>
              )}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-sm border border-ink/10 bg-white p-5">
            <h2 className="font-display text-lg">Move the deal</h2>
            <form action={updateLeadStatus} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={lead.id} />
              <Field label="Status">
                <select name="status" defaultValue={lead.status} className={inputClass}>
                  {LEAD_STATUSES.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Note (optional)">
                <textarea name="note" rows={2} className={inputClass} placeholder="Why the status changed" />
              </Field>
              <button
                type="submit"
                className="w-full rounded-sm bg-gold py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
              >
                Update status
              </button>
            </form>
          </section>

          {lead.project && (
            <section className="rounded-sm bg-ink p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold">Project</p>
              <p className="mt-2 font-display text-xl">{lead.project.name}</p>
              <p className="mt-1 text-xs text-white/50">{lead.project.city.name}</p>
              <Link
                href={`/projects/${lead.project.slug}`}
                className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em] text-gold"
              >
                Open project page →
              </Link>
            </section>
          )}

          <section className="rounded-sm border border-rose-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-rose-700">Danger zone</h2>
            <p className="mt-1 text-xs text-slate-ink">Deleting a lead also removes its activity history.</p>
            <form action={deleteLead} className="mt-3">
              <input type="hidden" name="id" value={lead.id} />
              <button
                type="submit"
                className="w-full rounded-sm border border-rose-300 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700 transition hover:bg-rose-50"
              >
                Delete lead
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
