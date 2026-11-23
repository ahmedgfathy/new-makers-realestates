import Alert from "@/components/Alert";
import ConsultForm from "@/components/ConsultForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;
  const cities = await prisma.city.findMany({ orderBy: { projectCount: "desc" } });

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <p className="eyebrow text-gold">Contact us</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Get a consultation from top real estate experts.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            Whether you are buying your first home or adding to a portfolio, our consultants will
            give you a straight answer.
          </p>
        </div>
      </section>

      <section className="bg-sand py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            {[
              { label: "Phone", value: "+20 111 620 4890", href: "tel:+201116204890" },
              { label: "WhatsApp", value: "+20 102 508 0764", href: "https://wa.me/201025080764" },
              { label: "Email", value: "hello@makersrealestate.com", href: "mailto:hello@makersrealestate.com" },
            ].map((item) => (
              <div key={item.label} className="border-b border-ink/10 pb-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-ink">{item.label}</p>
                <a href={item.href} className="mt-2 block font-display text-2xl text-ink hover:text-gold">
                  {item.value}
                </a>
              </div>
            ))}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-ink">Head office</p>
              <p className="mt-2 text-sm leading-7 text-slate-ink">
                Makers Real Estates, Fifth Settlement, New Cairo, Cairo Governorate, Egypt.
                <br />
                Saturday – Thursday, 10:00 – 19:00.
              </p>
            </div>
          </div>

          <div className="rounded-sm bg-ink p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl">Tell us what you need</h2>
            <p className="mt-2 text-xs text-white/50">We reply within one business day.</p>
            {sent === "1" && (
              <div className="mt-4">
                <Alert kind="success">Thank you — your inquiry is now with our consultants.</Alert>
              </div>
            )}
            {error && (
              <div className="mt-4">
                <Alert kind="error">
                  {error === "missing"
                    ? "Please add your name and phone number."
                    : "We could not submit your request. Please call us instead."}
                </Alert>
              </div>
            )}
            <div className="mt-6">
              <ConsultForm cities={cities} redirectTo="/contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
