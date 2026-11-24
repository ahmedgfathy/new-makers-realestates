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

async function uniqueSlug(
  base: string,
  find: (slug: string) => Promise<{ id: string } | null>,
  ignoreId?: string
) {
  const root = slugify(base) || `item-${Date.now()}`;
  let slug = root;
  let suffix = 2;
  while (true) {
    const existing = await find(slug);
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${root}-${suffix++}`;
  }
}

const uniqueProjectSlug = (base: string, ignoreId?: string) =>
  uniqueSlug(base, (slug) => prisma.project.findUnique({ where: { slug }, select: { id: true } }), ignoreId);

const uniqueDeveloperSlug = (base: string, ignoreId?: string) =>
  uniqueSlug(base, (slug) => prisma.developer.findUnique({ where: { slug }, select: { id: true } }), ignoreId);

const uniqueCitySlug = (base: string, ignoreId?: string) =>
  uniqueSlug(base, (slug) => prisma.city.findUnique({ where: { slug }, select: { id: true } }), ignoreId);

/** Keeps City.projectCount (shown on the homepage) in step with real listings. */
async function syncCityCounts() {
  const cities = await prisma.city.findMany({
    select: { id: true, _count: { select: { projects: true } } },
  });
  await prisma.$transaction(
    cities.map((city) =>
      prisma.city.update({
        where: { id: city.id },
        data: { projectCount: city._count.projects },
      })
    )
  );
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
    videoUrl: text(formData, "videoUrl") || null,
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

  await syncCityCounts();

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(formData: FormData) {
  await requireUser();
  const id = text(formData, "id");
  if (id) {
    // Leads keep their history when a listing is removed.
    await prisma.lead.updateMany({ where: { projectId: id }, data: { projectId: null } });
    await prisma.project.delete({ where: { id } });
    await syncCityCounts();
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

/* ----------------------------- DEVELOPERS ---------------------------- */

export async function saveDeveloper(formData: FormData) {
  await requireUser();

  const id = text(formData, "id");
  const name = text(formData, "name");
  if (!name) redirect("/dashboard/developers?error=missing");

  const data = {
    name,
    description: text(formData, "description") || null,
    website: text(formData, "website") || null,
    image: text(formData, "image") || null,
    videoUrl: text(formData, "videoUrl") || null,
  };

  if (id) {
    await prisma.developer.update({
      where: { id },
      data: { ...data, slug: await uniqueDeveloperSlug(name, id) },
    });
  } else {
    await prisma.developer.create({
      data: { ...data, slug: await uniqueDeveloperSlug(name) },
    });
  }

  revalidatePath("/");
  revalidatePath("/developers");
  revalidatePath("/projects");
  revalidatePath("/dashboard/developers");
  redirect("/dashboard/developers");
}

export async function deleteDeveloper(formData: FormData) {
  await requireUser();
  const id = text(formData, "id");
  if (id) {
    // Listings stay online, just without a developer attached.
    await prisma.project.updateMany({ where: { developerId: id }, data: { developerId: null } });
    await prisma.developer.delete({ where: { id } });
  }
  revalidatePath("/");
  revalidatePath("/developers");
  revalidatePath("/projects");
  revalidatePath("/dashboard/developers");
  redirect("/dashboard/developers");
}

/* -------------------------------- AREAS ------------------------------ */

export async function saveCity(formData: FormData) {
  await requireUser();

  const id = text(formData, "id");
  const name = text(formData, "name");
  if (!name) redirect("/dashboard/areas?error=missing");

  const data = {
    name,
    nameAr: text(formData, "nameAr") || null,
    description: text(formData, "description") || null,
    image: text(formData, "image") || null,
  };

  if (id) {
    await prisma.city.update({
      where: { id },
      data: { ...data, slug: await uniqueCitySlug(name, id) },
    });
  } else {
    await prisma.city.create({
      data: { ...data, slug: await uniqueCitySlug(name), projectCount: 0 },
    });
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/dashboard/areas");
  redirect("/dashboard/areas");
}

export async function deleteCity(formData: FormData) {
  await requireUser();
  const id = text(formData, "id");
  if (!id) redirect("/dashboard/areas");

  const projectCount = await prisma.project.count({ where: { cityId: id } });
  if (projectCount > 0) redirect("/dashboard/areas?error=in-use");

  // Leads can outlive the area they were interested in.
  await prisma.lead.updateMany({ where: { cityId: id }, data: { cityId: null } });
  await prisma.city.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/dashboard/areas");
  redirect("/dashboard/areas");
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
