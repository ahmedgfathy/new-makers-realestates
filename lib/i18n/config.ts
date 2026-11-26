export type Locale = "en" | "ar";

export const LOCALE_COOKIE = "makers_locale";
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}

export function textDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}
