"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS: { href: string; label: string; icon: string; adminOnly?: boolean }[] = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/dashboard/leads", label: "Leads", icon: "◈" },
  { href: "/dashboard/projects", label: "Projects", icon: "▤" },
  { href: "/dashboard/developers", label: "Developers", icon: "◍" },
  { href: "/dashboard/areas", label: "Areas", icon: "◫" },
  { href: "/dashboard/users", label: "Users", icon: "◔", adminOnly: true },
  { href: "/dashboard/settings", label: "Settings", icon: "◎" },
];

export default function DashboardShell({
  user,
  logout,
  children,
}: {
  user: { name: string; email: string; role: string };
  logout: () => Promise<void>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = LINKS.filter((link) => !link.adminOnly || user.role === "ADMIN");

  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const active =
          link.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-sm px-4 py-3 text-sm transition ${
              active
                ? "bg-gold text-ink"
                : "text-white/65 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="text-xs opacity-70">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-ink lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col justify-between bg-ink p-5 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div>
          <Link href="/dashboard" className="flex items-center gap-3 px-2 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/makers-logo.png"
              alt="Makers Real Estate"
              className="h-11 w-auto invert"
            />
          </Link>
          <div className="mt-6">{nav}</div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <Link href="/" className="block px-3 py-2 text-xs text-white/45 hover:text-gold">
            ← View website
          </Link>
          <div className="mt-3 px-3">
            <p className="truncate text-sm text-white">{user.name}</p>
            <p className="truncate text-[11px] text-white/40">{user.email}</p>
            <p className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-gold-soft">
              {user.role}
            </p>
          </div>
          <form action={logout} className="mt-3 px-3">
            <button
              type="submit"
              className="w-full rounded-sm border border-white/15 py-2 text-[11px] uppercase tracking-[0.16em] text-white/60 transition hover:border-gold hover:text-gold"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-white px-5 lg:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/makers-logo.png"
              alt="Makers Real Estate"
              className="h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-xs uppercase tracking-[0.16em] text-slate-ink"
          >
            {open ? "Close" : "Menu"}
          </button>
        </header>

        {open && (
          <div className="border-b border-white/10 bg-ink p-4 lg:hidden">
            {nav}
            <form action={logout} className="mt-3">
              <button
                type="submit"
                className="w-full rounded-sm border border-white/15 py-2 text-[11px] uppercase tracking-[0.16em] text-white/60"
              >
                Sign out
              </button>
            </form>
          </div>
        )}

        <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
