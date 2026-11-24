import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DevelopersPage() {
  const developers = await prisma.developer.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <p className="eyebrow text-gold">Partners</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Top developers</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            We work directly with Egypt&apos;s most credible developers, so you get verified
            inventory, real delivery records and negotiated payment plans.
          </p>
        </div>
      </section>

      <section className="bg-sand py-14">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="card-hover flex flex-col justify-between rounded-sm border border-ink/10 bg-white p-6"
            >
              <div>
                {developer.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={developer.image}
                    alt={developer.name}
                    className="mb-4 h-12 w-auto max-w-[10rem] object-contain"
                  />
                )}
                <p className="font-display text-xl text-ink">{developer.name}</p>
                <p className="mt-2 text-sm text-slate-ink">
                  {developer.description ??
                    "A trusted Makers partner with delivered projects across Egypt."}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-xs uppercase tracking-[0.16em] text-slate-ink">
                <span>{developer._count.projects} listed projects</span>
                <span className="flex items-center gap-4">
                  {developer.videoUrl && (
                    <a
                      href={developer.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold hover:underline"
                    >
                      Video ↗
                    </a>
                  )}
                  <Link href={`/projects?developer=${developer.slug}`} className="text-gold">
                    View →
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
