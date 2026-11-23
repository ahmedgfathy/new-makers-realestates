import { prisma } from "@/lib/prisma";
import { Field, PageHeader, inputClass } from "@/components/ui";
import { createDeveloper } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardDevelopersPage() {
  const developers = await prisma.developer.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Partners"
        title="Developers"
        description={`${developers.length} developers in the directory.`}
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Developer</th>
                <th className="px-5 py-3 font-medium">Projects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {developers.map((developer) => (
                <tr key={developer.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink">{developer.name}</p>
                    {developer.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-ink">{developer.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-ink">{developer._count.projects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form action={createDeveloper} className="h-fit space-y-4 rounded-sm border border-ink/10 bg-white p-5">
          <h2 className="font-display text-lg">Add a developer</h2>
          <Field label="Name"><input name="name" required className={inputClass} /></Field>
          <Field label="Description"><textarea name="description" rows={3} className={inputClass} /></Field>
          <Field label="Website"><input name="website" placeholder="https://" className={inputClass} /></Field>
          <button
            type="submit"
            className="w-full rounded-sm bg-gold py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Add developer
          </button>
        </form>
      </div>
    </div>
  );
}
