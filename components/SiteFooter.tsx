import Link from "next/link";

export default function SiteFooter() {
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
            Your real estate consultant for the optimal decision, promising opportunities and a
            profitable investment across Egypt's prime districts and new cities.
          </p>
          <div className="mt-6 flex gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
            <a href="https://www.facebook.com/makersrealestate" className="hover:text-gold">FB</a>
            <a href="https://www.instagram.com/makersrealestate" className="hover:text-gold">IG</a>
            <a href="https://wa.me/+201001234567" className="hover:text-gold">WA</a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link href="/projects" className="hover:text-gold">All projects</Link></li>
            <li><Link href="/projects?category=Coastal" className="hover:text-gold">Coastal projects</Link></li>
            <li><Link href="/projects?category=Residential" className="hover:text-gold">Residential projects</Link></li>
            <li><Link href="/developers" className="hover:text-gold">Developers</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Company</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-gold">About us</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact us</Link></li>
            <li><Link href="/login" className="hover:text-gold">Client portal</Link></li>
            <li><Link href="/dashboard" className="hover:text-gold">CRM dashboard</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><a href="tel:+201001234567" className="hover:text-gold">+20 100 123 4567</a></li>
            <li><a href="mailto:hello@makersrealestate.com" className="hover:text-gold">hello@makersrealestate.com</a></li>
            <li className="text-white/50">New Cairo, Egypt</li>
          </ul>
          <a
            href="https://wa.me/+201001234567"
            className="mt-6 inline-block rounded-sm bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
          >
            WhatsApp us
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Makers Real Estates. All rights reserved.</p>
          <p>Real estate consultancy · Fifth Settlement · Mostakbal City · New Capital</p>
        </div>
      </div>
    </footer>
  );
}
