"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/developers", label: "Developers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent backdrop-blur-sm"
          : "border-b border-white/10 bg-ink/95 backdrop-blur"
      }`}
    >
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
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition hover:text-gold-soft ${
                  active ? "text-gold" : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+201116204890" className="text-sm text-white/80 transition hover:text-gold">
            +20 111 620 4890
          </a>
          <Link
            href="/login"
            className="rounded-sm border border-gold/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-ink"
          >
            Client Login
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-white transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-white transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
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
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-sm bg-gold py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Client Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
