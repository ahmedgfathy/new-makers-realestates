import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatEGP, formatEGPPerSqm } from "@/lib/constants";
import { PageHeader, StatusBadge } from "@/components/ui";
import { deleteProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { city: true, developer: true, _count: { select: { leads: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inventory"
        title="Projects"
        description={`${projects.length} projects listed on the public website.`}
        action={
          <Link
            href="/dashboard/projects/new"
            className="rounded-sm bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            + New project
          </Link>
        }
      />

      <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">Developer</th>
                <th className="px-5 py-3 font-medium">From</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Leads</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {projects.map((project) => (
                <tr key={project.id} className="transition hover:bg-sand/50">
                  <td className="px-5 py-3.5">
                    <Link href={`/projects/${project.slug}`} className="font-medium text-ink hover:text-gold">
                      {project.name}
                    </Link>
                    <p className="text-xs text-slate-ink">{project.category}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-ink">{project.city.name}</td>
                  <td className="px-5 py-3.5 text-slate-ink">{project.developer?.name ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    {project.priceFrom != null
                      ? formatEGP(project.priceFrom)
                      : project.pricePerSqm != null
                        ? formatEGPPerSqm(project.pricePerSqm)
                        : formatEGP(null)}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-ink">
                    {project.downPayment != null ? `${project.downPayment}% down` : "—"}
                    {project.installmentYears != null ? ` · ${project.installmentYears} yrs` : ""}
                  </td>
                  <td className="px-5 py-3.5">{project._count.leads}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={project.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/projects/${project.id}/edit`}
                        className="text-[11px] uppercase tracking-[0.14em] text-gold"
                      >
                        Edit
                      </Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <button
                          type="submit"
                          className="text-[11px] uppercase tracking-[0.14em] text-rose-600 hover:text-rose-800"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-ink">
                    No projects yet. Create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
