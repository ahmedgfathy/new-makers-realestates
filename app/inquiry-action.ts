"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createInquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const citySlug = String(formData.get("city") ?? "").trim();
  const projectSlug = String(formData.get("project") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "/contact");

  if (!name || !phone) {
    redirect(`${redirectTo}?error=missing`);
  }

  const [admin, project, city] = await Promise.all([
    prisma.user.findFirst({ where: { role: "ADMIN" } }),
    projectSlug ? prisma.project.findUnique({ where: { slug: projectSlug } }) : null,
    citySlug ? prisma.city.findUnique({ where: { slug: citySlug } }) : null,
  ]);

  if (!admin) {
    redirect(`${redirectTo}?error=unavailable`);
  }

  const budgetValue = Number(formData.get("budget") ?? 0);

  const lead = await prisma.lead.create({
    data: {
      name,
      phone,
      email: email || null,
      message: message || null,
      source: "WEBSITE",
      status: "NEW",
      budget: Number.isFinite(budgetValue) && budgetValue > 0 ? Math.round(budgetValue) : null,
      projectId: project?.id ?? null,
      cityId: city?.id ?? project?.cityId ?? null,
      assignedToId: admin.id,
      createdById: admin.id,
    },
  });

  await prisma.activity.create({
    data: {
      leadId: lead.id,
      type: "NOTE",
      body: `Website inquiry${project ? ` about ${project.name}` : ""} submitted.`,
    },
  });

  redirect(`${redirectTo}?sent=1`);
}
