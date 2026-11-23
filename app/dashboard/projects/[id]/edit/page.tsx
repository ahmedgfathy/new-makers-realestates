import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/ProjectForm";
import { PageHeader } from "@/components/ui";
import { saveProject } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [project, cities, developers] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.city.findMany({ orderBy: { name: "asc" } }),
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/projects" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to projects
      </Link>
      <PageHeader eyebrow="Inventory" title={`Edit ${project.name}`} />
      <ProjectForm action={saveProject} cities={cities} developers={developers} project={project} />
    </div>
  );
}
