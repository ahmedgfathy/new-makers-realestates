import Link from "next/link";
import { formatEGP, formatEGPPerSqm } from "@/lib/constants";

type ProjectCardProps = {
  project: {
    name: string;
    slug: string;
    category: string;
    unitTypes: string | null;
    priceFrom: number | null;
    pricePerSqm: number | null;
    downPayment: number | null;
    installmentYears: number | null;
    image: string | null;
    city: { name: string };
    developer: { name: string } | null;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card-hover flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image ?? "/images/capital.jpg"}
          alt={project.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
          {project.category}
        </span>
        <span className="absolute bottom-4 left-4 text-xs tracking-wide text-white">
          {project.city.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-ink">
          {project.developer?.name ?? "Makers Selection"}
        </p>
        <h3 className="mt-2 font-display text-lg leading-snug text-ink group-hover:text-gold">
          {project.name}
        </h3>
        {project.unitTypes && (
          <p className="mt-2 line-clamp-1 text-xs text-slate-ink">{project.unitTypes}</p>
        )}
        <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-ink">
              {project.priceFrom == null && project.pricePerSqm != null ? "Price per m²" : "Starting from"}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              {project.priceFrom != null
                ? formatEGP(project.priceFrom)
                : project.pricePerSqm != null
                  ? formatEGPPerSqm(project.pricePerSqm)
                  : formatEGP(null)}
            </p>
          </div>
          <div className="text-right text-[11px] leading-relaxed text-slate-ink">
            {project.downPayment != null && <p>{project.downPayment}% down</p>}
            {project.installmentYears != null && <p>{project.installmentYears} yrs</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}
