/**
 * Target keywords from the Google Ads plan, grouped by ad group.
 *
 * These are the only keyword lists that belong on the website. The negative
 * keywords from the campaign plan stay in Google Ads — publishing them on the
 * site would read as content and hurt relevance rather than help it.
 */
export const BRAND_KEYWORDS = [
  "Makers Real Estates",
  "Makers Real Estate Egypt",
  "ميكرز للعقارات",
];

export const SARAI_KEYWORDS = [
  "كمبوند سراي طريق السويس",
  "اسعار شقق سراي مدينة مصر",
  "Sarai Madinet Masr",
  "مبيعات كمبوند سراي",
  "فيلات للبيع في سراي",
  "سراي القاهرة الجديدة",
];

export const BUTTERFLY_KEYWORDS = [
  "كمبوند ذا باترفلاي مدينة مصر",
  "The Butterfly Mostakbal City",
  "اسعار باترفلاي المستقبل",
];

export const TALALA_KEYWORDS = [
  "كمبوند طلالة هليوبوليس الجديدة",
  "Talala Madinet Masr",
];

export const HIGH_INTENT_KEYWORDS = [
  "شقق للبيع بالتقسيط على 12 سنة القاهرة الجديدة",
  "شقق بمقدم 5% طريق السويس",
  "فيلات بالتقسيط مدينة المستقبل",
  "تاج سيتي مدينة مصر اسعار",
];

/** Every target keyword, applied site-wide from the root layout. */
export const SITE_KEYWORDS = [
  ...BRAND_KEYWORDS,
  ...SARAI_KEYWORDS,
  ...BUTTERFLY_KEYWORDS,
  ...TALALA_KEYWORDS,
  ...HIGH_INTENT_KEYWORDS,
];

type ProjectKeywordInput = {
  name: string;
  slug: string;
  cityName: string;
  cityNameAr?: string | null;
  developerName?: string | null;
  category?: string | null;
};

/** Project page keywords: its own name and area plus the matching ad group. */
export function projectKeywords({
  name,
  slug,
  cityName,
  cityNameAr,
  developerName,
  category,
}: ProjectKeywordInput) {
  const haystack = `${slug} ${name}`.toLowerCase();

  const keywords = [
    name,
    `${name} ${cityName}`,
    cityNameAr ? `${name} ${cityNameAr}` : null,
    `${name} prices`,
    `${name} payment plan`,
    `${name} للبيع`,
    developerName ? `${name} ${developerName}` : null,
    category ? `${category} in ${cityName}` : null,
    cityNameAr ? `${category ?? "عقارات"} في ${cityNameAr}` : null,
  ].filter((keyword): keyword is string => Boolean(keyword));

  if (haystack.includes("sarai") || haystack.includes("سراي")) {
    keywords.push(...SARAI_KEYWORDS);
  }
  if (haystack.includes("butterfly") || haystack.includes("باترفلاي")) {
    keywords.push(...BUTTERFLY_KEYWORDS);
  }
  if (haystack.includes("talala") || haystack.includes("طلالة")) {
    keywords.push(...TALALA_KEYWORDS);
  }

  return Array.from(new Set(keywords));
}
