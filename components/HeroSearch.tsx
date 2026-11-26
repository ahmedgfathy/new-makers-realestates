"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

type Option = { label: string; value: string };

export default function HeroSearch({
  cities,
  categories,
  locale = "en",
}: {
  cities: Option[];
  categories: Option[];
  locale?: Locale;
}) {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const t = messages[locale];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (category) params.set("category", category);
    router.push(`/projects${params.size ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-sm bg-white/95 p-4 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end lg:p-5"
    >
      <label className="block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-ink">
          {t["hero.destination"]}
        </span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-sm border border-ink/15 bg-transparent px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
        >
          <option value="">{t["hero.allCities"]}</option>
          {cities.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-ink">
          {t["hero.propertyType"]}
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-sm border border-ink/15 bg-transparent px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
        >
          <option value="">{t["hero.allTypes"]}</option>
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="h-[46px] rounded-sm bg-gold px-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-gold-soft"
      >
        {t["hero.search"]}
      </button>
    </form>
  );
}
