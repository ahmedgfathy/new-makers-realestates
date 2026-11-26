import type { Locale } from "./config";

const en = {
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.developers": "Developers",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.clientLogin": "Client Login",
  "nav.toggleMenu": "Toggle menu",
  "nav.switchLanguage": "Switch to Arabic",

  "footer.blurb":
    "Your real estate consultant for the optimal decision, promising opportunities and a profitable investment across Egypt's prime districts and new cities.",
  "footer.explore": "Explore",
  "footer.allProjects": "All projects",
  "footer.coastal": "Coastal projects",
  "footer.residential": "Residential projects",
  "footer.developers": "Developers",
  "footer.company": "Company",
  "footer.about": "About us",
  "footer.contact": "Contact us",
  "footer.clientPortal": "Client portal",
  "footer.crm": "CRM dashboard",
  "footer.getInTouch": "Get in touch",
  "footer.location": "New Cairo, Egypt",
  "footer.whatsapp": "WhatsApp us",
  "footer.rights": "© {year} Makers Real Estates. All rights reserved.",
  "footer.services":
    "Real estate consultancy · Fifth Settlement · Mostakbal City · New Capital",

  "home.eyebrow": "Egypt's trusted real estate consultancy",
  "home.heroAlt": "Waterfront villas with private pools and lake views",
  "home.titleLead": "Your real estate consultant for the",
  "home.titleAccent": "optimal decision.",
  "home.body":
    "Promising opportunities and a profitable investment across Egypt's fastest-growing districts — Fifth Settlement, Mostakbal City, New Heliopolis, the New Capital and the Sixth Settlement.",
  "home.statDistricts": "{count} prime districts covered",
  "home.statProjects": "{count} live projects",
  "home.statDevelopers": "{count}+ developer partners",
  "home.whereToInvest": "Where to invest",
  "home.primeAreas": "Prime areas we cover",
  "home.viewAllDestinations": "View all destinations",
  "home.projectCount": "{count} projects",
  "home.handpicked": "Handpicked for you",
  "home.latestProjects": "Latest projects",
  "home.viewMoreProjects": "View more projects",
  "home.journey": "Our journey",
  "home.journeyTitle":
    "Over the years we have built in-depth knowledge of every corner of the Egyptian real estate market — and of the five districts we know best.",
  "home.journeyBody":
    "Today we use that expertise to guide you to the best deals, ensuring you make a carefully considered decision — from the first shortlist to handover and resale.",
  "home.liveProjects": "Live projects",
  "home.developerPartners": "Developer partners",
  "home.districtsCovered": "Districts covered",
  "home.villaAlt": "Luxury villa at dusk",
  "home.whyMakers": "Why Makers",
  "home.whyTitle":
    "A consultant on your side, not a salesperson on theirs.",
  "home.why1Title": "Market intelligence",
  "home.why1Body":
    "Live pricing, delivery records and payment-plan comparisons across {projects} projects and {developers} developers.",
  "home.why2Title": "Negotiation power",
  "home.why2Body":
    "Direct developer relationships let us unlock discounts, extended installments and better unit positions.",
  "home.why3Title": "End-to-end service",
  "home.why3Body":
    "Shortlisting, site visits, contracts, mortgage coordination and resale support under one roof.",
  "home.trustedPartners": "Trusted partners",
  "home.topDevelopers": "Top developers",
  "home.allDevelopers": "All developers",
  "home.contactEyebrow": "Contact us",
  "home.contactTitle": "Get a consultation from top real estate experts.",
  "home.contactBody":
    "Tell us your budget and preferred destination. A senior consultant will call you back with a shortlist, payment plans and honest advice on delivery risk.",
  "home.call": "Call",
  "home.whatsapp": "WhatsApp",
  "home.email": "Email",

  "hero.destination": "Destination",
  "hero.propertyType": "Property type",
  "hero.search": "Search",
  "hero.allCities": "All cities",
  "hero.allTypes": "All types",

  "card.perSqm": "Price per m²",
  "card.startingFrom": "Starting from",
  "card.down": "{value}% down",
  "card.years": "{value} yrs",
  "card.makersSelection": "Makers Selection",
  "card.onRequest": "On request",
  "card.priceOnRequest": "Price on request",

  "cat.Residential": "Residential",
  "cat.Commercial": "Commercial",
  "cat.Administrative": "Administrative",
  "cat.Medical": "Medical",
  "cat.Mixed Use": "Mixed Use",
  "cat.Coastal": "Coastal",
} as const extends never ? never : Record<string, string>;

export type MessageKey = keyof typeof en;
export type Messages = { [K in keyof typeof en]: string };

const ar: Messages = {
  "nav.home": "الرئيسية",
  "nav.projects": "المشاريع",
  "nav.developers": "المطورون",
  "nav.about": "من نحن",
  "nav.contact": "تواصل معنا",
  "nav.clientLogin": "دخول العملاء",
  "nav.toggleMenu": "فتح القائمة",
  "nav.switchLanguage": "التبديل إلى الإنجليزية",

  "footer.blurb":
    "استشارتك العقارية عشان تاخد القرار الصح — فرص واعدة واستثمار مربح في أرقى مناطق ومشروعات مصر.",
  "footer.explore": "تصفح",
  "footer.allProjects": "كل المشاريع",
  "footer.coastal": "مشاريع ساحلية",
  "footer.residential": "مشاريع سكنية",
  "footer.developers": "المطورون",
  "footer.company": "الشركة",
  "footer.about": "من نحن",
  "footer.contact": "تواصل معنا",
  "footer.clientPortal": "بوابة العملاء",
  "footer.crm": "لوحة التحكم",
  "footer.getInTouch": "خليك على تواصل",
  "footer.location": "القاهرة الجديدة، مصر",
  "footer.whatsapp": "كلمنا على واتساب",
  "footer.rights": "© {year} ميكرز للعقارات. جميع الحقوق محفوظة.",
  "footer.services":
    "استشارات عقارية · التجمع الخامس · مستقبل سيتي · العاصمة الإدارية",

  "home.eyebrow": "استشارتك العقارية الموثوقة في مصر",
  "home.heroAlt": "فيلات على المياه بحمامات سباحة خاصة وإطلالة على البحيرة",
  "home.titleLead": "استشاري عقاري في صفك عشان تاخد",
  "home.titleAccent": "القرار الصح.",
  "home.body":
    "فرص واعدة واستثمار مربح في أسرع مناطق مصر نموًا — التجمع الخامس، مستقبل سيتي، هليوبوليس الجديدة، العاصمة الإدارية والسادس من أكتوبر.",
  "home.statDistricts": "{count} مناطق رئيسية بنغطيها",
  "home.statProjects": "{count} مشروع متاح",
  "home.statDevelopers": "{count}+ مطور شريك",
  "home.whereToInvest": "تستثمر فين؟",
  "home.primeAreas": "أهم المناطق اللي بنشتغل فيها",
  "home.viewAllDestinations": "شوف كل المناطق",
  "home.projectCount": "{count} مشروع",
  "home.handpicked": "اخترناها ليك",
  "home.latestProjects": "أحدث المشاريع",
  "home.viewMoreProjects": "شوف مشاريع أكتر",
  "home.journey": "رحلتنا",
  "home.journeyTitle":
    "على مدار السنين بنينا معرفة عميقة بكل ركن في سوق العقارات المصري — وبالمناطق الخمسة اللي بنعرفها أحسن من غيرنا.",
  "home.journeyBody":
    "النهاردة بنستخدم الخبرة دي إننا نوصلك لأحسن العروض، وتاخد قرار مدروس من أول الترشيحات لحد التسليم وإعادة البيع.",
  "home.liveProjects": "مشروع متاح",
  "home.developerPartners": "مطور شريك",
  "home.districtsCovered": "منطقة بنغطيها",
  "home.villaAlt": "فيلا فاخرة وقت الغروب",
  "home.whyMakers": "ليه ميكرز؟",
  "home.whyTitle": "استشاري في صفك، مش مندوب بيع في صف المطور.",
  "home.why1Title": "معرفة حقيقية بالسوق",
  "home.why1Body":
    "أسعار متاحة، سجلات تسليم ومقارنات خطط سداد في {projects} مشروع و{developers} مطور.",
  "home.why2Title": "قوة تفاوض",
  "home.why2Body":
    "علاقتنا المباشرة بالمطورين بتفتحلك خصومات وأقساط أطول ووحدات في مواقع أحسن.",
  "home.why3Title": "خدمة من أول لآخر",
  "home.why3Body":
    "ترشيحات، زيارات للموقع، عقود، تنسيق تمويل عقاري ودعم إعادة البيع — كله في مكان واحد.",
  "home.trustedPartners": "شركاء موثوقون",
  "home.topDevelopers": "أكبر المطورين",
  "home.allDevelopers": "كل المطورين",
  "home.contactEyebrow": "تواصل معنا",
  "home.contactTitle": "استشارة من خبراء عقاريين متخصصين.",
  "home.contactBody":
    "قولنا ميزانيتك والمنطقة اللي تفضلها، واستشاري كبير هيكلمك بقائمة ترشيحات وخطط سداد ورأي صريح في مخاطر التسليم.",
  "home.call": "اتصل",
  "home.whatsapp": "واتساب",
  "home.email": "الإيميل",

  "hero.destination": "المنطقة",
  "hero.propertyType": "نوع العقار",
  "hero.search": "ابحث",
  "hero.allCities": "كل المناطق",
  "hero.allTypes": "كل الأنواع",

  "card.perSqm": "سعر المتر",
  "card.startingFrom": "يبدأ من",
  "card.down": "{value}% مقدم",
  "card.years": "{value} سنة",
  "card.makersSelection": "اختيار ميكرز",
  "card.onRequest": "عند الطلب",
  "card.priceOnRequest": "السعر عند الطلب",

  "cat.Residential": "سكني",
  "cat.Commercial": "تجاري",
  "cat.Administrative": "إداري",
  "cat.Medical": "طبي",
  "cat.Mixed Use": "متعدد الاستخدامات",
  "cat.Coastal": "ساحلي",
};

export const messages: Record<Locale, Messages> = { en, ar };

export function fill(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_match, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export function categoryLabel(locale: Locale, category: string): string {
  const dict = messages[locale] as Record<string, string>;
  return dict[`cat.${category}`] ?? category;
}
