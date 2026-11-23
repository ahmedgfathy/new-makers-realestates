import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "About" };

export default async function AboutPage() {
  const [projectCount, developerCount, cityCount] = await Promise.all([
    prisma.project.count(),
    prisma.developer.count(),
    prisma.city.count(),
  ]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img src="/images/hero.jpg" alt="Egyptian compound" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="container-x py-20">
          <p className="eyebrow text-gold">Makers Real Estates</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            A consultancy built around five districts we know street by street.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70">
            Makers Real Estates began in New Cairo and grew into a full-service advisory covering the
            Fifth Settlement, Mostakbal City, New Heliopolis and the Sixth Settlement, with a
            dedicated desk for the New Administrative Capital.
          </p>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Our vision</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              To be the leading destination for real estate consulting in the region.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-ink">
              <p>
                We are committed to translating that vision into tangible reality through effective
                communication, unwavering commitment and exceptional client care.
              </p>
              <p>
                Every recommendation starts with the numbers: price per square metre, delivery
                track record, resale liquidity and the real cost of the payment plan. Only then do
                we talk about the view.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Book a consultation
            </Link>
          </div>

          <div className="grid gap-px self-start border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { value: String(projectCount), label: "Live projects" },
              { value: String(developerCount), label: "Developer partners" },
              { value: String(cityCount), label: "Districts covered" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-8">
                <p className="font-display text-3xl text-gold">{stat.value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-ink">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white py-20">
        <div className="container-x">
          <p className="eyebrow text-gold">How we work</p>
          <div className="mt-8 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery", body: "Budget, financing, timeline and the non-negotiables." },
              { step: "02", title: "Shortlist", body: "Three to five projects scored on price, delivery and liquidity." },
              { step: "03", title: "Site visits", body: "We accompany you, compare units and check the developer's record." },
              { step: "04", title: "Close", body: "Negotiation, contract review, instalments and handover follow-up." },
            ].map((item) => (
              <div key={item.step} className="border-t border-ink/15 pt-6">
                <p className="font-display text-sm text-gold">{item.step}</p>
                <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
