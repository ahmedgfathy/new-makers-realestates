import { statusTone } from "@/lib/constants";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ${statusTone(status)}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h1 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-slate-ink">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-sm border p-5 ${
        accent ? "border-ink bg-ink text-white" : "border-ink/10 bg-white"
      }`}
    >
      <p className={`text-[10px] uppercase tracking-[0.18em] ${accent ? "text-white/50" : "text-slate-ink"}`}>
        {label}
      </p>
      <p className="mt-2 font-display text-2xl">{value}</p>
      {hint && (
        <p className={`mt-1 text-[11px] ${accent ? "text-white/45" : "text-slate-ink"}`}>{hint}</p>
      )}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold";
