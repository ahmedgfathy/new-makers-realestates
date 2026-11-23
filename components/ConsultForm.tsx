import { createInquiry } from "@/app/inquiry-action";

type ConsultFormProps = {
  cities: { slug: string; name: string }[];
  projectSlug?: string;
  projectName?: string;
  redirectTo: string;
  compact?: boolean;
};

const inputClass =
  "w-full rounded-sm border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-gold";

export default function ConsultForm({
  cities,
  projectSlug,
  projectName,
  redirectTo,
  compact = false,
}: ConsultFormProps) {
  return (
    <form action={createInquiry} className="grid gap-3">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      {projectSlug && <input type="hidden" name="project" value={projectSlug} />}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            Full name
          </span>
          <input name="name" required placeholder="Your name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            Phone
          </span>
          <input name="phone" required placeholder="+20 1xx xxx xxxx" className={inputClass} />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            Email
          </span>
          <input name="email" type="email" placeholder="you@email.com" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {projectName ? "Project" : "Preferred city"}
          </span>
          {projectName ? (
            <input readOnly value={projectName} className={inputClass} />
          ) : (
            <select name="city" className={inputClass}>
              <option value="">Any city</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug} className="text-ink">
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </label>
      </div>

      {!compact && (
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            Budget (EGP)
          </span>
          <input name="budget" inputMode="numeric" placeholder="e.g. 6000000" className={inputClass} />
        </label>
      )}

      <label className="block">
        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
          Message
        </span>
        <textarea
          name="message"
          rows={compact ? 2 : 3}
          placeholder="Tell us what you are looking for"
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        className="mt-1 rounded-sm bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-soft"
      >
        Request a consultation
      </button>
      <p className="text-[11px] leading-relaxed text-white/40">
        By submitting, you agree to be contacted by a Makers consultant. We never share your details.
      </p>
    </form>
  );
}
