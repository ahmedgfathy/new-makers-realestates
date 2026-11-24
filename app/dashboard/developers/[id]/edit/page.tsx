import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeveloperForm from "@/components/DeveloperForm";
import { PageHeader } from "@/components/ui";
import { saveDeveloper } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditDeveloperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const developer = await prisma.developer.findUnique({ where: { id } });

  if (!developer) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/developers" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to developers
      </Link>
      <PageHeader eyebrow="Partners" title={`Edit ${developer.name}`} />
      <DeveloperForm action={saveDeveloper} developer={developer} />
    </div>
  );
}
