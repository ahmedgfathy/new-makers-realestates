"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import { messages, type MessageKey } from "@/lib/i18n/messages";

const NAV: { href: string; key: MessageKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/projects", key: "nav.projects" },
  { href: "/developers", key: "nav.developers" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export default function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = messages[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between gap-6 sm:h-24">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/makers-logo.png"
            alt="Makers Real Estate"
            className="h-14 w-auto invert sm:h-20"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition hover:text-gold-soft ${
                  active ? "text-gold" : "text-white/80"
                }`}
              >
                {t[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+201116204890"
            className="text-sm text-white/80 transition hover:text-gold"
          >
            +20 111 620 4890
          </a>
          <Link
            href="/login"
            className="rounded-sm border border-gold/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-ink"
          >
            {t["nav.clientLogin"]}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={t["nav.switchLanguage"]} />
          <button
            type="button"
            aria-label={t["nav.toggleMenu"]}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-white transition ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm text-white/80"
              >
                {t[item.key]}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-sm bg-gold py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              {t["nav.clientLogin"]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
