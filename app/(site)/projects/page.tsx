import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import { PROJECT_CATEGORIES } from "@/lib/constants";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  city?: string;
  category?: string;
  developer?: string;
  q?: string;
}>;

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const { city, category, developer, q } = await searchParams;

  const [cities, projects] = await Promise.all([
    prisma.city.findMany({ orderBy: { projectCount: "desc" } }),
    prisma.project.findMany({
      where: {
        ...(city ? { city: { slug: city } } : {}),
        ...(category ? { category } : {}),
        ...(developer ? { developer: { slug: developer } } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q } },
                { description: { contains: q } },
                { city: { name: { contains: q } } },
              ],
            }
          : {}),
      },
      include: { city: true, developer: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const activeCity = city ? cities.find((c) => c.slug === city) : null;

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <p className="eyebrow text-gold">Portfolio</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">
            {activeCity ? `Projects in ${activeCity.name}` : "Explore every project"}
          </h1>
          {activeCity?.nameAr && (
            <p className="mt-2 text-lg text-gold-soft" dir="rtl">{activeCity.nameAr}</p>
          )}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            {activeCity?.description ??
              "Residential compounds, coastal resorts, malls and administrative towers across Egypt — with verified payment plans and delivery dates."}
          </p>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="container-x py-5">
          <form className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search project, developer or area"
              className="rounded-sm border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            <select
              name="city"
              defaultValue={city ?? ""}
              className="rounded-sm border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-gold"
            >
              <option value="">All cities</option>
              {cities.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.nameAr ? `${item.name} — ${item.nameAr}` : item.name}
                </option>
              ))}
            </select>
            <select
              name="category"
              defaultValue={category ?? ""}
              className="rounded-sm border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-gold"
            >
              <option value="">All types</option>
              {PROJECT_CATEGORIES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-sm bg-ink px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-ink"
            >
              Filter
            </button>
          </form>
          {(city || category || developer || q) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-ink">
              <span>Active filters:</span>
              {city && <span className="rounded-full bg-sand px-3 py-1">{activeCity?.name ?? city}</span>}
              {category && <span className="rounded-full bg-sand px-3 py-1">{category}</span>}
              {developer && <span className="rounded-full bg-sand px-3 py-1">{developer.replace(/-/g, " ")}</span>}
              {q && <span className="rounded-full bg-sand px-3 py-1">&ldquo;{q}&rdquo;</span>}
              <Link href="/projects" className="text-gold underline underline-offset-4">Clear</Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-sand py-14">
        <div className="container-x">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-ink">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>

          {projects.length === 0 ? (
            <div className="mt-8 rounded-sm border border-dashed border-ink/20 bg-white p-12 text-center">
              <p className="font-display text-2xl text-ink">No projects match those filters.</p>
              <p className="mt-2 text-sm text-slate-ink">
                Try a different city or type, or ask a consultant for off-market options.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
              >
                Ask a consultant
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
