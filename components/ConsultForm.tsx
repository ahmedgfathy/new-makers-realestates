import { createInquiry } from "@/app/inquiry-action";
import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

type ConsultFormProps = {
  cities: { slug: string; name: string; nameAr?: string | null }[];
  projectSlug?: string;
  projectName?: string;
  redirectTo: string;
  compact?: boolean;
  locale?: Locale;
};

const inputClass =
  "w-full rounded-sm border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-gold";

export default function ConsultForm({
  cities,
  projectSlug,
  projectName,
  redirectTo,
  compact = false,
  locale = "en",
}: ConsultFormProps) {
  const t = messages[locale];

  return (
    <form action={createInquiry} className="grid gap-3">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      {projectSlug && <input type="hidden" name="project" value={projectSlug} />}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {t["form.fullName"]}
          </span>
          <input name="name" required placeholder={t["form.yourName"]} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {t["form.phone"]}
          </span>
          <input name="phone" required placeholder="+20 1xx xxx xxxx" className={inputClass} />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {t["form.email"]}
          </span>
          <input
            name="email"
            type="email"
            placeholder={t["form.emailPlaceholder"]}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {projectName ? t["form.project"] : t["form.preferredCity"]}
          </span>
          {projectName ? (
            <input readOnly value={projectName} className={inputClass} />
          ) : (
            <select name="city" className={inputClass}>
              <option value="">{t["form.anyCity"]}</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug} className="text-ink">
                  {locale === "ar" && city.nameAr ? city.nameAr : city.name}
                </option>
              ))}
            </select>
          )}
        </label>
      </div>

      {!compact && (
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {t["form.budget"]}
          </span>
          <input
            name="budget"
            inputMode="numeric"
            placeholder={t["form.budgetPlaceholder"]}
            className={inputClass}
          />
        </label>
      )}

      <label className="block">
        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
          {t["form.message"]}
        </span>
        <textarea
          name="message"
          rows={compact ? 2 : 3}
          placeholder={t["form.messagePlaceholder"]}
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        className="mt-1 rounded-sm bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-soft"
      >
        {t["form.submit"]}
      </button>
      <p className="text-[11px] leading-relaxed text-white/40">{t["form.disclaimer"]}</p>
    </form>
  );
}
