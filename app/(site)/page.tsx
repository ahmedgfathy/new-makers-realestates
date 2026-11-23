import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import ProjectCard from "@/components/ProjectCard";
import ConsultForm from "@/components/ConsultForm";
import { prisma } from "@/lib/prisma";
import { PROJECT_CATEGORIES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [cities, featured, developers, developerCount, projectCount, cityCount] = await Promise.all([
    prisma.city.findMany({ orderBy: { projectCount: "desc" }, take: 8 }),
    prisma.project.findMany({
      where: { featured: true },
      include: { city: true, developer: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.developer.findMany({ orderBy: { name: "asc" }, take: 12 }),
    prisma.developer.count(),
    prisma.project.count(),
    prisma.city.count(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img
          src="/images/hero-video-poster.jpg"
          alt="Waterfront villas with private pools and lake views"
          className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-video-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/videos/hero-waterfront.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="container-x pb-16 pt-20 md:pb-24 md:pt-28">
          <p className="eyebrow text-gold">Egypt&apos;s trusted real estate consultancy</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Your real estate consultant for the <span className="text-gold-soft">optimal decision.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            Promising opportunities and a profitable investment across Egypt&apos;s fastest-growing
            districts — Fifth Settlement, Mostakbal City, New Heliopolis, the New Capital and the
            Sixth Settlement.
          </p>

          <div className="mt-10 max-w-4xl">
            <HeroSearch
              cities={cities.map((city) => ({ label: city.name, value: city.slug }))}
              categories={PROJECT_CATEGORIES.map((category) => ({ label: category, value: category }))}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm text-white/60">
            <span><strong className="text-white">{cityCount}</strong> prime districts covered</span>
            <span><strong className="text-white">{projectCount}</strong> live projects</span>
            <span><strong className="text-white">{developerCount}+</strong> developer partners</span>
          </div>
        </div>
      </section>

      {/* TOP CITIES */}
      <section className="bg-sand py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">Where to invest</p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Prime areas we cover</h2>
            </div>
            <Link
              href="/projects"
              className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
            >
              View all destinations
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/projects?city=${city.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                <img
                  src={city.image ?? "/images/capital.jpg"}
                  alt={city.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                    {city.projectCount} {city.projectCount === 1 ? "project" : "projects"}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-white">{city.name}</h3>
                  {city.nameAr && (
                    <p className="mt-1 text-xs text-white/60" dir="rtl">{city.nameAr}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-t border-ink/10 bg-white py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">Handpicked for you</p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Latest projects</h2>
            </div>
            <Link
              href="/projects"
              className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
            >
              View more projects
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY / STATS */}
      <section className="bg-ink py-20 text-white">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-gold">Our journey</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Over the years we have built in-depth knowledge of every corner of the Egyptian real
              estate market — and of the five districts we know best.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60">
              Today we use that expertise to guide you to the best deals, ensuring you make a
              carefully considered decision — from the first shortlist to handover and resale.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { value: String(projectCount), label: "Live projects" },
                { value: String(developerCount), label: "Developer partners" },
                { value: String(cityCount), label: "Districts covered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-gold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/villa.jpg"
              alt="Luxury villa at dusk"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="absolute -bottom-6 -left-6 hidden bg-gold p-6 text-ink sm:block">
              <p className="font-display text-3xl">{cityCount}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]">Districts covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY Makers */}
      <section className="bg-sand py-20">
        <div className="container-x">
          <p className="eyebrow text-gold">Why Makers</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
            A consultant on your side, not a salesperson on theirs.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Market intelligence",
                body: `Live pricing, delivery records and payment-plan comparisons across ${projectCount} projects and ${developerCount} developers.`,
              },
              {
                title: "Negotiation power",
                body: "Direct developer relationships let us unlock discounts, extended instalments and better unit positions.",
              },
              {
                title: "End-to-end service",
                body: "Shortlisting, site visits, contracts, mortgage coordination and resale support under one roof.",
              },
            ].map((item, index) => (
              <div key={item.title} className="border-t border-ink/15 pt-6">
                <p className="font-display text-sm text-gold">0{index + 1}</p>
                <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section className="border-t border-ink/10 bg-white py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">Trusted partners</p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Top developers</h2>
            </div>
            <Link
              href="/developers"
              className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
            >
              All developers
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-4">
            {developers.map((developer) => (
              <Link
                key={developer.id}
                href={`/projects?developer=${developer.slug}`}
                className="flex items-center justify-center bg-white px-4 py-8 text-center text-sm font-medium text-ink/70 transition hover:text-gold"
              >
                {developer.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="relative overflow-hidden bg-ink-soft py-20 text-white">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Contact us</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Get a consultation from top real estate experts.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              Tell us your budget and preferred destination. A senior consultant will call you back
              with a shortlist, payment plans and honest advice on delivery risk.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/70">
              <p><span className="text-white/40">Call</span> · <a href="tel:+201116204890" className="hover:text-gold">+20 111 620 4890</a></p>
              <p><span className="text-white/40">WhatsApp</span> · <a href="https://wa.me/201025080764" className="hover:text-gold">+20 102 508 0764</a></p>
              <p><span className="text-white/40">Email</span> · <a href="mailto:hello@makersrealestate.com" className="hover:text-gold">hello@makersrealestate.com</a></p>
            </div>
          </div>
          <ConsultForm cities={cities} redirectTo="/" />
        </div>
      </section>
    </>
  );
}
