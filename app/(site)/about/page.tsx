import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n/server";
import { about as aboutStrings } from "@/lib/i18n/pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "About" };

export default async function AboutPage() {
  const [{ locale, t }, projectCount, developerCount, cityCount] =
    await Promise.all([
      getI18n(),
      prisma.project.count(),
      prisma.developer.count(),
      prisma.city.count(),
    ]);
  const s = aboutStrings[locale];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img
          src="/images/hero.jpg"
          alt={s.heroAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="container-x py-20">
          <p className="eyebrow text-gold">{s.eyebrow}</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            {s.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            {s.body}
          </p>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">{s.vision}</p>
            <h2 className="mt-3 font-display text-3xl text-ink">{s.visionTitle}</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-ink">
              <p>{s.visionP1}</p>
              <p>{s.visionP2}</p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-sm bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              {s.book}
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 self-start border border-ink/10 bg-white p-6">
            {[
              { value: String(projectCount), label: s.liveProjects },
              { value: String(developerCount), label: s.developerPartners },
              { value: String(cityCount), label: s.districtsCovered },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-gold">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-ink">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <p className="eyebrow text-gold">{s.howWeWork}</p>
          <div className="mt-8 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: s.step1Title, body: s.step1Body },
              { step: "02", title: s.step2Title, body: s.step2Body },
              { step: "03", title: s.step3Title, body: s.step3Body },
              { step: "04", title: s.step4Title, body: s.step4Body },
            ].map((item) => (
              <div key={item.step} className="border-t border-ink/15 pt-6">
                <p className="font-display text-sm text-gold">{item.step}</p>
                <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
