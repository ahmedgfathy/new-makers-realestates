"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, requireUser, verifyPassword } from "@/lib/auth";
import { slugify } from "@/lib/constants";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function numberOrNull(formData: FormData, key: string) {
  const raw = text(formData, key);
  if (!raw) return null;
  const parsed = Number(raw.replace(/,/g, ""));
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

/* ------------------------------- LEADS ------------------------------- */

export async function createLead(formData: FormData) {
  const user = await requireUser();

  const name = text(formData, "name");
  const phone = text(formData, "phone");
  if (!name || !phone) redirect("/dashboard/leads?error=missing");

  const projectId = text(formData, "projectId") || null;
  const project = projectId ? await prisma.project.findUnique({ where: { id: projectId } }) : null;

  await prisma.lead.create({
    data: {
      name,
      phone,
      email: text(formData, "email") || null,
      message: text(formData, "message") || null,
      source: text(formData, "source") || "WEBSITE",
      status: text(formData, "status") || "NEW",
      budget: numberOrNull(formData, "budget"),
      projectId: project?.id ?? null,
      cityId: project?.cityId ?? (text(formData, "cityId") || null),
      assignedToId: text(formData, "assignedToId") || user.id,
      createdById: user.id,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  redirect("/dashboard/leads");
}

export async function updateLeadStatus(formData: FormData) {
  await requireUser();
  const id = text(formData, "id");
  const status = text(formData, "status");
  const note = text(formData, "note");
  if (!id || !status) redirect("/dashboard/leads");

  await prisma.lead.update({ where: { id }, data: { status } });
  await prisma.activity.create({
    data: {
      leadId: id,
      type: "STATUS",
      body: `Status moved to ${status}${note ? ` — ${note}` : ""}.`,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${id}`);
  redirect(`/dashboard/leads/${id}`);
}

export async function addLeadNote(formData: FormData) {
  await requireUser();
  const leadId = text(formData, "leadId");
  const body = text(formData, "body");
  const type = text(formData, "type") || "NOTE";
  if (!leadId || !body) redirect(`/dashboard/leads/${leadId}`);

  await prisma.activity.create({ data: { leadId, type, body } });
  await prisma.lead.update({ where: { id: leadId }, data: { updatedAt: new Date() } });

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/leads");
  redirect(`/dashboard/leads/${leadId}`);
}

export async function deleteLead(formData: FormData) {
  await requireUser();
  const id = text(formData, "id");
  if (id) await prisma.lead.delete({ where: { id } });
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");
  redirect("/dashboard/leads");
}

/* ------------------------------ PROJECTS ----------------------------- */

async function uniqueProjectSlug(base: string, ignoreId?: string) {
  let slug = slugify(base) || `project-${Date.now()}`;
  let suffix = 2;
  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${slugify(base)}-${suffix++}`;
  }
}

export async function saveProject(formData: FormData) {
  await requireUser();

  const id = text(formData, "id");
  const name = text(formData, "name");
  const cityId = text(formData, "cityId");
  if (!name || !cityId) redirect("/dashboard/projects?error=missing");

  const data = {
    name,
    cityId,
    developerId: text(formData, "developerId") || null,
    category: text(formData, "category") || "Residential",
    unitTypes: text(formData, "unitTypes") || null,
    unitArea: text(formData, "unitArea") || null,
    priceFrom: numberOrNull(formData, "priceFrom"),
    pricePerSqm: numberOrNull(formData, "pricePerSqm"),
    downPayment: numberOrNull(formData, "downPayment"),
    installmentYears: numberOrNull(formData, "installmentYears"),
    deliveryDate: text(formData, "deliveryDate") || null,
    description: text(formData, "description") || null,
    image: text(formData, "image") || "/images/capital.jpg",
    status: text(formData, "status") || "AVAILABLE",
    featured: text(formData, "featured") === "on",
  };

  if (id) {
    await prisma.project.update({
      where: { id },
      data: { ...data, slug: await uniqueProjectSlug(name, id) },
    });
  } else {
    await prisma.project.create({
      data: { ...data, slug: await uniqueProjectSlug(name) },
    });
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(formData: FormData) {
  await requireUser();
  const id = text(formData, "id");
  if (id) await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

/* ----------------------------- DEVELOPERS ---------------------------- */

export async function createDeveloper(formData: FormData) {
  await requireUser();
  const name = text(formData, "name");
  if (!name) redirect("/dashboard/developers?error=missing");

  await prisma.developer.create({
    data: {
      name,
      slug: slugify(name),
      description: text(formData, "description") || null,
      website: text(formData, "website") || null,
    },
  });

  revalidatePath("/developers");
  revalidatePath("/dashboard/developers");
  redirect("/dashboard/developers");
}

/* ------------------------------ PROFILE ------------------------------ */

export async function updateProfile(formData: FormData) {
  const user = await requireUser();
  await prisma.user.update({
    where: { id: user.id },
    data: { name: text(formData, "name") || user.name, phone: text(formData, "phone") || null },
  });
  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings?saved=profile");
}

export async function changePassword(formData: FormData) {
  const user = await requireUser();
  const current = text(formData, "current");
  const next = text(formData, "next");

  if (next.length < 8) redirect("/dashboard/settings?error=short");
  if (!verifyPassword(current, user.passwordHash)) redirect("/dashboard/settings?error=invalid");

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hashPassword(next) },
  });
  redirect("/dashboard/settings?saved=password");
}
