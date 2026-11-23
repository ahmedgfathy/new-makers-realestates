import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { LEAD_STATUSES, formatDate, formatEGP, statusLabel } from "@/lib/constants";
import { KpiCard, PageHeader, StatusBadge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  const [leadCount, projectCount, cityCount, developerCount, grouped, recentLeads, pipeline, topProjects] =
    await Promise.all([
      prisma.lead.count(),
      prisma.project.count(),
      prisma.city.count(),
      prisma.developer.count(),
      prisma.lead.groupBy({ by: ["status"], _count: { _all: true }, _sum: { budget: true } }),
      prisma.lead.findMany({
        include: { project: true, assignedTo: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.lead.aggregate({
        where: { status: { notIn: ["WON", "LOST"] } },
        _sum: { budget: true },
        _count: { _all: true },
      }),
      prisma.project.findMany({
        include: { _count: { select: { leads: true } }, city: true },
        orderBy: { leads: { _count: "desc" } },
        take: 5,
      }),
    ]);

  const byStatus = new Map(grouped.map((row) => [row.status, row._count._all]));
  const won = byStatus.get("WON") ?? 0;
  const closed = won + (byStatus.get("LOST") ?? 0);
  const conversion = closed > 0 ? Math.round((won / closed) * 100) : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description="Here is how the pipeline looks today."
        action={
          <Link
            href="/dashboard/leads"
            className="rounded-sm bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            + New lead
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total leads" value={String(leadCount)} hint={`${byStatus.get("NEW") ?? 0} new this period`} />
        <KpiCard label="Open pipeline value" value={formatEGP(pipeline._sum.budget)} hint={`${pipeline._count._all} active opportunities`} accent />
        <KpiCard label="Win rate" value={`${conversion}%`} hint={`${won} won of ${closed || 0} closed`} />
        <KpiCard label="Inventory" value={String(projectCount)} hint={`${cityCount} cities · ${developerCount} developers`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-sm border border-ink/10 bg-white">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <h2 className="font-display text-lg">Recent inquiries</h2>
            <Link href="/dashboard/leads" className="text-[11px] uppercase tracking-[0.16em] text-gold">
              All leads
            </Link>
          </div>
          <div className="divide-y divide-ink/5">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href={`/dashboard/leads/${lead.id}`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-sand/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{lead.name}</p>
                  <p className="truncate text-xs text-slate-ink">
                    {lead.project?.name ?? "No project"} · {formatDate(lead.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-slate-ink sm:block">
                    {lead.budget ? formatEGP(lead.budget) : "—"}
                  </span>
                  <StatusBadge status={lead.status} />
                </div>
              </Link>
            ))}
            {recentLeads.length === 0 && (
              <p className="px-5 py-8 text-sm text-slate-ink">No leads yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-sm border border-ink/10 bg-white p-5">
          <h2 className="font-display text-lg">Pipeline</h2>
          <div className="mt-5 space-y-3">
            {LEAD_STATUSES.map((status) => {
              const count = byStatus.get(status.value) ?? 0;
              const percent = leadCount > 0 ? Math.round((count / leadCount) * 100) : 0;
              return (
                <div key={status.value}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink">{status.label}</span>
                    <span className="text-slate-ink">{count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/5">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-sm border border-ink/10 bg-white">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-lg">Projects generating interest</h2>
          <Link href="/dashboard/projects" className="text-[11px] uppercase tracking-[0.16em] text-gold">
            Manage
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">Leads</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {topProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-5 py-3.5">
                    <Link href={`/projects/${project.slug}`} className="hover:text-gold">
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-slate-ink">{project.city.name}</td>
                  <td className="px-5 py-3.5">{project._count.leads}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-ink">{statusLabel(project.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
