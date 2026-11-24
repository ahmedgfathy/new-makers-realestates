import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui";
import Alert from "@/components/Alert";
import ConfirmButton from "@/components/ConfirmButton";
import { deleteCity } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardAreasPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const areas = await prisma.city.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Coverage"
        title="Areas & regions"
        description={`${areas.length} districts shown on the website.`}
        action={
          <Link
            href="/dashboard/areas/new"
            className="rounded-sm bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            + New area
          </Link>
        }
      />

      {error === "missing" && <Alert kind="error">An area needs a name.</Alert>}
      {error === "in-use" && (
        <Alert kind="error">
          That area still has projects. Move or delete its projects first, then delete the area.
        </Alert>
      )}

      <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Area</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Projects</th>
                <th className="px-5 py-3 font-medium">Cover</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {areas.map((area) => (
                <tr key={area.id} className="transition hover:bg-sand/50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-ink">{area.name}</p>
                    {area.nameAr && (
                      <p className="mt-0.5 text-xs text-slate-ink" dir="rtl">
                        {area.nameAr}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-ink">/{area.slug}</td>
                  <td className="px-5 py-3.5">{area._count.projects}</td>
                  <td className="px-5 py-3.5">
                    {area.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={area.image}
                        alt={area.name}
                        className="h-10 w-16 rounded-sm border border-ink/10 object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-ink">Default</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/areas/${area.id}/edit`}
                        className="text-[11px] uppercase tracking-[0.14em] text-gold"
                      >
                        Edit
                      </Link>
                      <form action={deleteCity}>
                        <input type="hidden" name="id" value={area.id} />
                        <ConfirmButton
                          message={`Delete ${area.name}? It disappears from the website.`}
                          className="text-[11px] uppercase tracking-[0.14em] text-rose-600 hover:text-rose-800"
                        >
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {areas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-ink">
                    No areas yet. Add the districts you cover.
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
