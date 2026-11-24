import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui";
import Alert from "@/components/Alert";
import ConfirmButton from "@/components/ConfirmButton";
import { deleteDeveloper } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardDevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

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
        action={
          <Link
            href="/dashboard/developers/new"
            className="rounded-sm bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            + New developer
          </Link>
        }
      />

      {error === "missing" && <Alert kind="error">A developer needs a name.</Alert>}

      <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 font-medium">Developer</th>
                <th className="px-5 py-3 font-medium">Website</th>
                <th className="px-5 py-3 font-medium">Media</th>
                <th className="px-5 py-3 font-medium">Projects</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {developers.map((developer) => (
                <tr key={developer.id} className="transition hover:bg-sand/50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {developer.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={developer.image}
                          alt={developer.name}
                          className="h-10 w-10 shrink-0 rounded-sm border border-ink/10 object-contain p-1"
                        />
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-dashed border-ink/15 text-[10px] text-slate-ink">
                          —
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{developer.name}</p>
                        {developer.description && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-ink">{developer.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-ink">
                    {developer.website ? (
                      <a
                        href={developer.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gold hover:underline"
                      >
                        Visit site
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-ink">
                    {developer.videoUrl ? "Image + video" : developer.image ? "Image" : "None"}
                  </td>
                  <td className="px-5 py-3.5">{developer._count.projects}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/developers/${developer.id}/edit`}
                        className="text-[11px] uppercase tracking-[0.14em] text-gold"
                      >
                        Edit
                      </Link>
                      <form action={deleteDeveloper}>
                        <input type="hidden" name="id" value={developer.id} />
                        <ConfirmButton
                          message={`Delete ${developer.name}? Its ${developer._count.projects} project(s) stay online without a developer.`}
                          className="text-[11px] uppercase tracking-[0.14em] text-rose-600 hover:text-rose-800"
                        >
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {developers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-ink">
                    No developers yet. Add your first partner.
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
