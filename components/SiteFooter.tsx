import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { fill, messages } from "@/lib/i18n/messages";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = messages[locale];

  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/makers-logo.png"
              alt="Makers Real Estate"
              className="h-20 w-auto invert"
            />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {t["footer.blurb"]}
          </p>
          <div className="mt-6 flex gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
            <a href="https://www.facebook.com/makersrealestate" className="hover:text-gold">
              FB
            </a>
            <a href="https://www.instagram.com/makersrealestate" className="hover:text-gold">
              IG
            </a>
            <a href="https://wa.me/201025080764" className="hover:text-gold">
              WA
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold">{t["footer.explore"]}</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <Link href="/projects" className="hover:text-gold">
                {t["footer.allProjects"]}
              </Link>
            </li>
            <li>
              <Link href="/projects?category=Coastal" className="hover:text-gold">
                {t["footer.coastal"]}
              </Link>
            </li>
            <li>
              <Link href="/projects?category=Residential" className="hover:text-gold">
                {t["footer.residential"]}
              </Link>
            </li>
            <li>
              <Link href="/developers" className="hover:text-gold">
                {t["footer.developers"]}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">{t["footer.company"]}</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-gold">
                {t["footer.about"]}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                {t["footer.contact"]}
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gold">
                {t["footer.clientPortal"]}
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-gold">
                {t["footer.crm"]}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">{t["footer.getInTouch"]}</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a href="tel:+201116204890" className="hover:text-gold">
                +20 111 620 4890
              </a>
            </li>
            <li>
              <a href="mailto:ahmedhassanmakers@gmail.com" className="hover:text-gold">
                ahmedhassanmakers@gmail.com
              </a>
            </li>
            <li className="text-white/50">{t["footer.location"]}</li>
          </ul>
          <a
            href="https://wa.me/201025080764"
            className="mt-6 inline-block rounded-sm bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
          >
            {t["footer.whatsapp"]}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{fill(t["footer.rights"], { year: new Date().getFullYear() })}</p>
          <p>{t["footer.services"]}</p>
        </div>
      </div>
    </footer>
  );
}
