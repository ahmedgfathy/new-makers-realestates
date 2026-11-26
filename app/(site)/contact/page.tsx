import Alert from "@/components/Alert";
import ConsultForm from "@/components/ConsultForm";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n/server";
import { contact as contactStrings } from "@/lib/i18n/pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const [{ locale, t }, { sent, error }, cities] = await Promise.all([
    getI18n(),
    searchParams,
    prisma.city.findMany({ orderBy: { projectCount: "desc" } }),
  ]);
  const s = contactStrings[locale];

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <p className="eyebrow text-gold">{s.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            {s.body}
          </p>
        </div>
      </section>

      <section className="bg-sand py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            {[
              { label: s.phone, value: "+20 111 620 4890", href: "tel:+201116204890" },
              { label: s.whatsapp, value: "+20 102 508 0764", href: "https://wa.me/201025080764" },
              {
                label: s.email,
                value: "ahmedhassanmakers@gmail.com",
                href: "mailto:ahmedhassanmakers@gmail.com",
              },
            ].map((item) => (
              <div key={item.label} className="border-b border-ink/10 pb-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-ink">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="mt-2 block font-display text-2xl text-ink hover:text-gold"
                >
                  {item.value}
                </a>
              </div>
            ))}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-ink">
                {s.headOffice}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-ink">{s.address}</p>
              <p className="mt-1 text-xs text-slate-ink/60">{s.hours}</p>
            </div>
          </div>
          <div className="rounded-sm bg-ink p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl">{s.formTitle}</h2>
            <p className="mt-2 text-xs text-white/50">{s.formSub}</p>
            {sent === "1" && (
              <div className="mt-4">
                <Alert kind="success">{s.success}</Alert>
              </div>
            )}
            {error && (
              <div className="mt-4">
                <Alert kind="error">
                  {error === "missing" ? s.errMissing : s.errGeneric}
                </Alert>
              </div>
            )}
            <div className="mt-6">
              <ConsultForm cities={cities} redirectTo="/contact" locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
