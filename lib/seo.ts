/**
 * Keyword map for makersegypt.com.
 *
 * Only target keywords live here: the negative keywords from the campaign plan
 * stay inside Google Ads, because publishing them on the site would read as
 * page content instead of filtering traffic.
 */

type KeywordGroup = { aliases: string[]; keywords: string[] };

function dedupeKeywords(items: (string | null | undefined)[]): string[] {
  return Array.from(new Set(items.filter((item): item is string => Boolean(item))));
}

export { dedupeKeywords };

export const BRAND_KEYWORDS = [
  "Makers Real Estates",
  "Makers Real Estate",
  "Makers Egypt",
  "ميكرز للعقارات",
];

export const CORE_KEYWORDS = [
  "Real estate consultant Egypt",
  "Primary real estate Egypt",
  "بيع أولي من المطور",
  "Official developer prices",
  "أسعار المطور الرسمية",
  "Written payment plans",
  "جدول سداد المطور",
  "Authorized sales partner",
  "شريك بيع معتمد",
  "Profitable real estate investment Egypt",
  "استثمار عقاري في مصر",
  "Primary homes",
  "عقارات برايمري",
  "تقسيط عقاري طويل الأجل",
];

export const LOCATION_KEYWORDS = [
  "East Cairo",
  "شرق القاهرة",
  "Mostakbal City",
  "مدينة المستقبل",
  "New Cairo",
  "القاهرة الجديدة",
  "طريق السويس",
  "العاصمة الإدارية الجديدة",
  "هليوبوليس الجديدة",
  "العاشر من رمضان",
];

export const APARTMENT_KEYWORDS = [
  "شقق للبيع بالتقسيط",
  "شقق للبيع بدون فوائد",
  "شقق للبيع بمقدم",
  "شقق للبيع القاهرة الجديدة",
  "شقق للبيع مدينة المستقبل",
  "شقق للبيع طريق السويس",
  "شقق للبيع العاصمة الإدارية الجديدة",
  "شقق للبيع العاشر من رمضان",
  "استوديوهات للبيع بالتقسيط",
  "شقق متشطبة للبيع بالتقسيط",
  "Apartments for sale in Egypt",
  "Apartments for sale in New Cairo",
  "Apartments for sale in Mostakbal City",
  "Studios for sale in Egypt",
];

export const VILLA_KEYWORDS = [
  "فيلات للبيع بالتقسيط",
  "تاون هاوس للبيع بالتقسيط",
  "توين هاوس للبيع بالتقسيط",
  "فيلات مستقلة للبيع ستاند ألون",
  "S Villa للبيع",
  "فيلات للبيع القاهرة الجديدة",
  "فيلات للبيع مدينة المستقبل",
  "فيلات للبيع طريق السويس",
  "فيلات للبيع العاصمة الإدارية الجديدة",
  "Villas for sale in Egypt",
  "Townhouses for sale in New Cairo",
  "Twin houses for sale in Mostakbal City",
  "Standalone villas for sale Egypt",
];

export const DUPLEX_KEYWORDS = [
  "دوبلكس للبيع بالتقسيط",
  "بنتهاوس للبيع بالتقسيط",
  "دوبلكس بحديقة للبيع",
  "بنتهاوس بروف للبيع",
  "Duplexes for sale in Egypt",
  "Penthouses for sale in New Cairo",
];

export const COMMERCIAL_KEYWORDS = [
  "محلات تجارية للبيع بالتقسيط",
  "وحدات تجارية وإدارية للبيع",
  "Commercial units for sale Egypt",
  "Commercial space for sale East Cairo",
];

export const ADMIN_KEYWORDS = [
  "مكاتب إدارية للبيع بالتقسيط",
  "Administrative offices for sale New Cairo",
];

export const MEDICAL_KEYWORDS = [
  "عيادات طبية للبيع بالتقسيط",
  "Medical clinics for sale Egypt",
];

export const LAND_KEYWORDS = [
  "أراضي للبيع",
  "أراضي سكنية للبيع",
  "أراضي تجارية وصناعية للبيع",
  "Land plots for sale in Egypt",
];

export const HIGH_INTENT_KEYWORDS = [
  "شقق للبيع بالتقسيط على 12 سنة القاهرة الجديدة",
  "شقق بمقدم 5% طريق السويس",
  "فيلات بالتقسيط مدينة المستقبل",
  "تاج سيتي مدينة مصر اسعار",
];

export const FEATURED_PROJECT_NAMES = [
  "Sarai",
  "The Butterfly",
  "Talala",
  "Taj City",
  "TERRASIDE Business Park",
  "Village de la Capitale",
  "SODIC East",
  "The Lakes",
  "EastVale",
  "Sleek",
];

/** Brand, positioning and location terms shared by every page-level keyword set. */
export const BASE_KEYWORDS = dedupeKeywords([
  ...BRAND_KEYWORDS,
  ...CORE_KEYWORDS,
  ...LOCATION_KEYWORDS,
]);

const PROJECT_GROUPS: KeywordGroup[] = [
  {
    aliases: ["sarai", "سراي"],
    keywords: [
      "كمبوند سراي",
      "كمبوند سراي طريق السويس",
      "كمبوند سراي مدينة مصر",
      "أسعار كمبوند سراي",
      "شقق للبيع في سراي",
      "فيلات للبيع في سراي",
      "S Villa سراي",
      "Sarai compound",
      "Sarai Madinet Masr",
      "Sarai Mostakbal City",
      "سراي القاهرة الجديدة",
      "مبيعات كمبوند سراي",
    ],
  },
  {
    aliases: ["butterfly", "باترفلاي", "بتيرفلاي"],
    keywords: [
      "كمبوند ذا باترفلاي",
      "ذا باترفلاي مدينة مصر",
      "ذا باترفلاي مدينة المستقبل",
      "أسعار ذا باترفلاي",
      "شقق وفيلات ذا باترفلاي",
      "The Butterfly Madinet Masr",
      "The Butterfly Mostakbal City",
      "اسعار باترفلاي المستقبل",
    ],
  },
  {
    aliases: ["talala", "طلالة"],
    keywords: [
      "كمبوند طلالة",
      "طلالة مدينة مصر",
      "طلالة هليوبوليس الجديدة",
      "أسعار كمبوند طلالة",
      "فيلات طلالة بالتقسيط",
      "Talala Madinet Masr",
      "Talala New Heliopolis",
    ],
  },
  {
    aliases: ["taj-city", "taj city", "تاج سيتي", "تاج"],
    keywords: [
      "كمبوند تاج سيتي",
      "تاج سيتي مدينة مصر",
      "أسعار تاج سيتي",
      "شقق تاج سيتي بالتقسيط",
      "Taj City Madinet Masr",
    ],
  },
  {
    aliases: ["terraside", "تيراسايد"],
    keywords: [
      "تيراسايد بيزنس بارك",
      "TERRASIDE Business Park",
      "مكاتب إدارية في الحي المالي العاصمة الإدارية",
      "TERRASIDE New Capital",
    ],
  },
  {
    aliases: ["village", "فيلاج"],
    keywords: [
      "فيلاج دو لا كابيتال العاصمة الإدارية",
      "Village de la Capitale Palm Hills",
      "Village de la Capitale New Capital",
    ],
  },
  {
    aliases: ["sodic", "سوديك"],
    keywords: ["SODIC East", "سوديك إيست", "SODIC East New Cairo"],
  },
  {
    aliases: ["the-lakes", "the lakes", "ذا ليكس", "ليكس"],
    keywords: ["The Lakes", "ذا ليكس", "The Lakes New Cairo"],
  },
  {
    aliases: ["eastvale", "إيست فيل", "ايست فيل"],
    keywords: ["EastVale", "إيست فيل", "EastVale New Cairo"],
  },
  {
    aliases: ["sleek", "سليك"],
    keywords: ["Sleek", "سليك", "Sleek New Cairo"],
  },
];

const DEVELOPER_GROUPS: KeywordGroup[] = [
  {
    aliases: ["madinet masr", "madinet-masr", "مدينة مصر", "مدينه مصر"],
    keywords: [
      "شركة مدينة مصر",
      "مطور مدينة مصر العقاري",
      "مشاريع شركة مدينة مصر",
      "Madinet Masr",
      "Madinet Masr developments",
    ],
  },
  {
    aliases: ["palm hills", "palm-hills", "بالم هيلز"],
    keywords: [
      "شركة بالم هيلز",
      "مشاريع بالم هيلز",
      "Palm Hills Developments",
      "Palm Hills projects Egypt",
    ],
  },
  {
    aliases: ["sodic", "سوديك"],
    keywords: [
      "شركة سوديك العقارية",
      "مشاريع سوديك",
      "SODIC Egypt",
      "SODIC developments",
    ],
  },
];

function matchGroups(groups: KeywordGroup[], values: (string | null | undefined)[]) {
  const haystack = values.filter(Boolean).join(" ").toLowerCase();
  return groups
    .filter((group) => group.aliases.some((alias) => haystack.includes(alias.toLowerCase())))
    .flatMap((group) => group.keywords);
}

/** Keywords for the project listing page, based on its active filters. */
export function categoryKeywords(category?: string | null) {
  switch (category) {
    case "Residential":
      return [...APARTMENT_KEYWORDS, ...VILLA_KEYWORDS, ...DUPLEX_KEYWORDS];
    case "Commercial":
      return COMMERCIAL_KEYWORDS;
    case "Administrative":
      return ADMIN_KEYWORDS;
    case "Medical":
      return MEDICAL_KEYWORDS;
    case "Mixed Use":
      return [...COMMERCIAL_KEYWORDS, ...ADMIN_KEYWORDS, ...APARTMENT_KEYWORDS];
    case "Coastal":
      return [...VILLA_KEYWORDS, ...APARTMENT_KEYWORDS];
    default:
      return [];
  }
}

esport type ProjectKeywordInput = {
  name: string;
  slug: string;
  cityName: string;
  cityNameAr?: string | null;
  developerName?: string | null;
  category?: string | null;
};

/** Project page keywords: the project's own terms plus its developer and unit type. */
export function projectKeywords({
  name,
  slug,
  cityName,
  cityNameAr,
  developerName,
  category,
}: ProjectKeywordInput) {
  return dedupeKeywords([
    ...BASE_KEYWORDS,
    name,
    `${name} ${cityName}`,
    cityNameAr ? `${name} ${cityNameAr}` : null,
    `${name} prices`,
    `${name} payment plan`,
    `${name} للبيع`,
    developerName ? `${name} ${developerName}` : null,
    category ? `${category} in ${cityName}` : null,
    cityNameAr && category ? `${category} في ${cityNameAr}` : null,
    ...categoryKeywords(category),
    ...matchGroups(PROJECT_GROUPS, [name, slug]),
    ...matchGroups(DEVELOPER_GROUPS, [developerName]),
  ]);
}

/** Developer page keywords: every developer group plus the featured projects. */
export function developerPageKeywords() {
  return dedupeKeywords([
    ...BASE_KEYWORDS,
    "Real estate developers in Egypt",
    "مطورين عقاريين في مصر",
    ...FEATURED_PROJECT_NAMES,
    ...DEVELOPER_GROUPS.flatMap((group) => group.keywords),
    ...PROJECT_GROUPS.flatMap((group) => group.keywords),
  ]);
}

export function developerGroupKeywords(name?: string | null, slug?: string | null) {
  return matchGroups(DEVELOPER_GROUPS, [name, slug]);
}

/** Curated social hashtags, kept here so ad and social copy use one source. */
export const HASHTAGS = [
  "#MakersRealEstate",
  "#MakersEgypt",
  "#EastCairo",
  "#MostakbalCity",
  "#EgyptRealEstate",
  "#PrimaryRealEstate",
  "#RealEstateInvestment",
  "#Sarai",
  "#SODICEast",
  "#TheLakes",
  "#EastVale",
  "#Sleek",
  "#NewCairo",
  "#CommercialRealEstate",
  "#CairoHomes",
  "#ميكرز_للعقارات",
  "#عقارات_مصر",
  "#شرق_القاهرة",
  "#مدينة_المستقبل",
  "#استثمار_عقاري",
  "#كمبوند_سراي",
  "#سوديك_ايست",
  "#عقارات_للبيع",
  "#شقق_للبيع",
  "#بالتقسيط",
  "#القاهرة_الجديدة",
];

/** Every target keyword, applied site-wide from the root layout. */
export const SITE_KEYWORDS = dedupeKeywords([
  ...BASE_KEYWORDS,
  ...APARTMENT_KEYWORDS,
  ...VILLA_KEYWORDS,
  ...DUPLEX_KEYWORDS,
  ...COMMERCIAL_KEYWORDS,
  ...ADMIN_KEYWORDS,
  ...MEDICAL_KEYWORDS,
  ...LAND_KEYWORDS,
  ...HIGH_INTENT_KEYWORDS,
]);
