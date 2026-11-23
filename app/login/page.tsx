import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { login } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="grid min-h-screen bg-ink text-white lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden lg:block">
        <img src="/images/hero.jpg" alt="Makers Real Estates" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/makers-logo.png"
              alt="Makers Real Estate"
              className="h-20 w-auto invert"
            />
          </Link>
          <div>
            <p className="eyebrow text-gold">Makers CRM</p>
            <h1 className="mt-4 max-w-md font-display text-4xl leading-tight">
              Every lead, project and payment plan in one place.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Manage inquiries from the website, track your pipeline and keep the sales team aligned.
            </p>
          </div>
          <p className="text-xs text-white/35">© {new Date().getFullYear()} Makers Real Estates</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-sand px-5 py-16 text-ink">
        <div className="w-full max-w-md">
          <Link href="/" className="text-xs uppercase tracking-[0.18em] text-gold">
            ← Back to website
          </Link>
          <h2 className="mt-6 font-display text-3xl">Sign in to your dashboard</h2>
          <p className="mt-2 text-sm text-slate-ink">Use your team account to access the CRM.</p>

          {error && (
            <p className="mt-5 rounded-sm border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Incorrect email or password. Try the demo account below.
            </p>
          )}

          <form action={login} className="mt-7 space-y-4">
            {next && <input type="hidden" name="next" value={next} />}
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-ink">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                defaultValue="admin@makersrealestate.com"
                className="w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-ink">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                defaultValue="Admin@12345"
                className="w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-sm bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-ink"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 rounded-sm border border-ink/10 bg-white p-5 text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-ink">Demo accounts</p>
            <div className="mt-3 space-y-2 text-slate-ink">
              <p>Admin · <span className="text-ink">admin@makersrealestate.com</span> / Admin@12345</p>
              <p>Agent · <span className="text-ink">sara@makersrealestate.com</span> / Agent@12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
