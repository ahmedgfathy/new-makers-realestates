import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { projectKeywords } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { city: true, developer: true },
  });

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: `${project.name} in ${project.city.name}${
      project.developer ? ` by ${project.developer.name}` : ""
    } — prices, payment plans, unit types and delivery dates, explained by Makers Real Estates consultants.`,
    keywords: projectKeywords({
      name: project.name,
      slug: project.slug,
      cityName: project.city.name,
      cityNameAr: project.city.nameAr,
      developerName: project.developer?.name,
      category: project.category,
    }),
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
