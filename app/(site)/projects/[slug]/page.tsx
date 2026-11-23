import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultForm from "@/components/ConsultForm";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import { formatEGP, formatEGPPerSqm } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sent?: string }>;
}) {
  const { slug } = await params;
  const { sent } = await searchParams;

  const [project, cities] = await Promise.all([
    prisma.project.findUnique({
      where: { slug },
      include: { city: true, developer: true },
    }),
    prisma.city.findMany({ orderBy: { projectCount: "desc" } }),
  ]);

  if (!project) notFound();

  const related = await prisma.project.findMany({
    where: { cityId: project.cityId, NOT: { id: project.id } },
    include: { city: true, developer: true },
    take: 3,
  });

  const priceFact =
    project.priceFrom != null
      ? { label: "Starting price", value: formatEGP(project.priceFrom) }
      : project.pricePerSqm != null
        ? { label: "Price per m²", value: formatEGPPerSqm(project.pricePerSqm) }
        : { label: "Starting price", value: formatEGP(null) };

  const facts = [
    priceFact,
    { label: "Down payment", value: project.downPayment != null ? `${project.downPayment}%` : "On request" },
    {
      label: "Instalments",
      value: project.installmentYears != null ? `${project.installmentYears} years` : "On request",
    },
    {
      label: project.deliveryDate ? "Delivery" : "Unit area",
      value: project.deliveryDate ?? project.unitArea ?? "On request",
    },
  ];

  return (
    <>
      <section className="relative isolate bg-ink text-white">
        <img
          src={project.image ?? "/images/capital.jpg"}
          alt={project.name}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="container-x py-16 md:py-24">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/50">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-gold">Projects</Link>
            <span>/</span>
            <Link href={`/projects?city=${project.city.slug}`} className="hover:text-gold">
              {project.city.name}
            </Link>
          </nav>
          <p className="mt-8 eyebrow text-gold">
            {project.developer?.name ?? "Makers Selection"} · {project.category}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70">
            {project.unitTypes}
          </p>
        </div>
      </section>

      <section className="bg-sand py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-white p-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">{fact.label}</p>
                  <p className="mt-2 font-display text-lg text-ink">{fact.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-sm border border-ink/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl text-ink">About the project</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-ink">
                {project.description}
              </p>

              <h3 className="mt-8 font-display text-xl text-ink">Unit types</h3>
              <p className="mt-2 text-sm leading-7 text-slate-ink">{project.unitTypes}</p>
              {project.unitArea && (
                <p className="mt-1 text-sm leading-7 text-slate-ink">
                  <span className="text-ink">Unit area:</span> {project.unitArea}
                </p>
              )}

              <h3 className="mt-8 font-display text-xl text-ink">Location</h3>
              <p className="mt-2 text-sm leading-7 text-slate-ink">
                {project.city.name}
                {project.city.nameAr ? ` (${project.city.nameAr})` : ""} — {project.city.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/201025080764?text=${encodeURIComponent(
                    `I would like to know more about ${project.name}`
                  )}`}
                  className="rounded-sm bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-ink"
                >
                  WhatsApp about this project
                </a>
                <a
                  href="tel:+201116204890"
                  className="rounded-sm border border-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
                >
                  Call +20 111 620 4890
                </a>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-ink p-6 text-white sm:p-8">
              <p className="eyebrow text-gold">Request the full brochure</p>
              <h2 className="mt-3 font-display text-2xl">Speak to a Makers consultant</h2>
              <p className="mt-2 text-xs text-white/50">
                Payment plans, unit availability and negotiation handled for you.
              </p>
              {sent === "1" && (
                <p className="mt-4 rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-200">
                  Thank you — your request is with our team. We will call you shortly.
                </p>
              )}
              <div className="mt-6">
                <ConsultForm
                  cities={cities}
                  projectSlug={project.slug}
                  projectName={project.name}
                  redirectTo={`/projects/${project.slug}`}
                  compact
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-white py-16">
          <div className="container-x">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                More in {project.city.name}
              </h2>
              <Link href={`/projects?city=${project.city.slug}`} className="text-xs uppercase tracking-[0.18em] text-gold">
                View all
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
