import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import ProjectCard from "@/components/ProjectCard";
import ConsultForm from "@/components/ConsultForm";
import { prisma } from "@/lib/prisma";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { getI18n } from "@/lib/i18n/server";
import { categoryLabel, fill } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

function cityName(locale: Locale, city: { name: string; nameAr?: string | null }) {
  return locale === "ar" && city.nameAr ? city.nameAr : city.name;
}

export default async function HomePage() {
  const [
    { locale, t },
    cities,
    featured,
    developers,
    developerCount,
    projectCount,
    cityCount,
  ] = await Promise.all([
    getI18n(),
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
          alt={t["home.heroAlt"]}
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
          <p className="eyebrow text-gold">{t["home.eyebrow"]}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {t["home.titleLead"]}{" "}
            <span className="text-gold-soft">{t["home.titleAccent"]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            {t["home.body"]}
          </p>

          <div className="mt-10 max-w-4xl">
            <HeroSearch
              locale={locale}
              cities={cities.map((city) => ({
                label: cityName(locale, city),
                value: city.slug,
              }))}
              categories={PROJECT_CATEGORIES.map((category) => ({
                label: categoryLabel(locale, category),
                value: category,
              }))}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm text-white/60">
            <span>
              <strong className="text-white">{cityCount}</strong> {t["home.statDistricts"]}
            </span>
            <span>
              <strong className="text-white">{projectCount}</strong> {t["home.statProjects"]}
            </span>
            <span>
              <strong className="text-white">{developerCount}+</strong>{" "}
              {t["home.statDevelopers"]}
            </span>
          </div>
        </div>
      </section>

      {/* TOP CITIES */}
      <section className="bg-sand py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">{t["home.whereToInvest"]}</p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {t["home.primeAreas"]}
              </h2>
            </div>
            <Link
              href="/projects"
              className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
            >
              {t["home.viewAllDestinations"]}
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
                  alt={cityName(locale, city)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                    {fill(t["home.projectCount"], { count: city.projectCount })}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-white">
                    {locale === "ar" ? cityName(locale, city) : city.name}
                  </h3>
                  {locale === "en" && city.nameAr && (
                    <p className="mt-1 text-xs text-white/60" dir="rtl">
                      {city.nameAr}
                    </p>
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
              <p className="eyebrow text-gold">{t["home.handpicked"]}</p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {t["home.latestProjects"]}
              </h2>
            </div>
            <Link
              href="/projects"
              className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
            >
              {t["home.viewMoreProjects"]}
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY / STATS */}
      <section className="bg-ink py-20 text-white">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-gold">{t["home.journey"]}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              {t["home.journeyTitle"]}
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60">
              {t["home.journeyBody"]}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { value: String(projectCount), label: t["home.liveProjects"] },
                { value: String(developerCount), label: t["home.developerPartners"] },
                { value: String(cityCount), label: t["home.districtsCovered"] },
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
              alt={t["home.villaAlt"]}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="absolute -bottom-6 start-6 hidden bg-gold p-6 text-ink sm:block">
              <p className="font-display text-3xl">{cityCount}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                {t["home.districtsCovered"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MAKERS */}
      <section className="bg-sand py-20">
        <div className="container-x">
          <p className="eyebrow text-gold">{t["home.whyMakers"]}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
            {t["home.whyTitle"]}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: t["home.why1Title"],
                body: fill(t["home.why1Body"], {
                  projects: projectCount,
                  developers: developerCount,
                }),
              },
              { title: t["home.why2Title"], body: t["home.why2Body"] },
              { title: t["home.why3Title"], body: t["home.why3Body"] },
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
              <p className="eyebrow text-gold">{t["home.trustedPartners"]}</p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {t["home.topDevelopers"]}
              </h2>
            </div>
            <Link
              href="/developers"
              className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
            >
              {t["home.allDevelopers"]}
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
            <p className="eyebrow text-gold">{t["home.contactEyebrow"]}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              {t["home.contactTitle"]}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              {t["home.contactBody"]}
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/70">
              <p>
                <span className="text-white/40">{t["home.call"]}</span> ·{" "}
                <a href="tel:+201116204890" className="hover:text-gold">
                  +20 111 620 4890
                </a>
              </p>
              <p>
                <span className="text-white/40">{t["home.whatsapp"]}</span> ·{" "}
                <a href="https://wa.me/201025080764" className="hover:text-gold">
                  +20 102 508 0764
                </a>
              </p>
              <p>
                <span className="text-white/40">{t["home.email"]}</span> ·{" "}
                <a href="mailto:ahmedhassanmakers@gmail.com" className="hover:text-gold">
                  ahmedhassanmakers@gmail.com
                </a>
              </p>
            </div>
          </div>
          <ConsultForm cities={cities} redirectTo="/" locale={locale} />
        </div>
      </section>
    </>
  );
}
