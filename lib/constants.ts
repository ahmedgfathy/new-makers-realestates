export const LEAD_STATUSES = [
  { value: "NEW", label: "New", tone: "bg-sky-50 text-sky-700 ring-sky-200" },
  { value: "CONTACTED", label: "Contacted", tone: "bg-indigo-50 text-indigo-700 ring-indigo-200" },
  { value: "QUALIFIED", label: "Qualified", tone: "bg-amber-50 text-amber-700 ring-amber-200" },
  { value: "VISIT", label: "Site visit", tone: "bg-violet-50 text-violet-700 ring-violet-200" },
  { value: "NURTURE", label: "Nurture", tone: "bg-teal-50 text-teal-700 ring-teal-200" },
  { value: "NEGOTIATION", label: "Negotiation", tone: "bg-orange-50 text-orange-700 ring-orange-200" },
  { value: "WON", label: "Won", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  { value: "LOST", label: "Lost", tone: "bg-rose-50 text-rose-700 ring-rose-200" },
] as const;

export const LEAD_SOURCES = [
  "WEBSITE",
  "WHATSAPP",
  "PHONE",
  "REFERRAL",
  "WALK_IN",
  "LEGACY",
  "MANUAL",
] as const;

export const PROJECT_CATEGORIES = [
  "Residential",
  "Commercial",
  "Administrative",
  "Medical",
  "Mixed Use",
  "Coastal",
] as const;

export function statusLabel(status: string) {
  return LEAD_STATUSES.find((s) => s.value === status)?.label ?? status;
}

export function statusTone(status: string) {
  return (
    LEAD_STATUSES.find((s) => s.value === status)?.tone ??
    "bg-slate-100 text-slate-600 ring-slate-200"
  );
}

export function formatEGP(value: number | null | undefined) {
  if (!value) return "Price on request";
  return `EGP ${value.toLocaleString("en-US")}`;
}

export function formatEGPPerSqm(value: number | null | undefined) {
  if (!value) return "Price on request";
  return `EGP ${value.toLocaleString("en-US")} / m²`;
}

export function formatEGPShort(value: number | null | undefined) {
  if (!value) return "On request";
  if (value >= 1_000_000) return `EGP ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  return `EGP ${value.toLocaleString("en-US")}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
