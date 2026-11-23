import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/ProjectForm";
import { PageHeader } from "@/components/ui";
import { saveProject } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const [cities, developers] = await Promise.all([
    prisma.city.findMany({ orderBy: { name: "asc" } }),
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard/projects" className="text-[11px] uppercase tracking-[0.16em] text-gold">
        ← Back to projects
      </Link>
      <PageHeader eyebrow="Inventory" title="New project" description="It goes live on the website immediately." />
      <ProjectForm action={saveProject} cities={cities} developers={developers} />
    </div>
  );
}
