import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AreaForm from "@/components/AreaForm";
import { PageHeader } from "@/components/ui";
import { saveCity } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditAreaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const area = await prisma.city.findUnique({ where: { id } });

  if (!area) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/areas" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to areas
      </Link>
      <PageHeader eyebrow="Coverage" title={`Edit ${area.name}`} />
      <AreaForm action={saveCity} area={area} />
    </div>
  );
}
