/**
 * Copies the local SQLite data (prisma/dev.db) into the Postgres database that
 * DATABASE_URL points at. Run with bun once DATABASE_URL is a Postgres URL:
 *
 *   bun scripts/migrate-to-postgres.ts
 *
 * It always writes a JSON backup to .tmp-migration/sqlite-data.json first, and
 * exits without touching Postgres when DATABASE_URL is not a Postgres URL.
 */
import { Database } from "bun:sqlite";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Prisma, PrismaClient } from "@prisma/client";

const SQLITE_PATH = path.join(process.cwd(), "prisma", "dev.db");
const BACKUP_DIR = path.join(process.cwd(), ".tmp-migration");
const BACKUP_FILE = path.join(BACKUP_DIR, "sqlite-data.json");

type Row = Record<string, unknown>;

const str = (value: unknown) => (value === null || value === undefined ? null : String(value));
const required = (value: unknown, fallback = "") => str(value) ?? fallback;
const int = (value: unknown) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
const bool = (value: unknown) => value === 1 || value === true || value === "1" || value === "true";

function date(value: unknown, fallback?: Date): Date | null {
  if (value === null || value === undefined) return fallback ?? null;
  const parsed = typeof value === "number" ? new Date(value) : new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? fallback ?? null : parsed;
}

function readAll(db: Database, table: string): Row[] {
  return db.query(`SELECT * FROM "${table}"`).all() as Row[];
}

const db = new Database(SQLITE_PATH, { readonly: true });
const raw = {
  users: readAll(db, "User"),
  cities: readAll(db, "City"),
  developers: readAll(db, "Developer"),
  projects: readAll(db, "Project"),
  leads: readAll(db, "Lead"),
  activities: readAll(db, "Activity"),
};
db.close();

await mkdir(BACKUP_DIR, { recursive: true });
await writeFile(BACKUP_FILE, JSON.stringify(raw, null, 2));
console.log(
  `Exported ${raw.users.length} users, ${raw.cities.length} cities, ${raw.developers.length} developers, ` +
    `${raw.projects.length} projects, ${raw.leads.length} leads, ${raw.activities.length} activities to ${BACKUP_FILE}`
);

const url = process.env.DATABASE_URL ?? "";
if (!/^postgres(ql)?:\/\//.test(url)) {
  console.log("DATABASE_URL is not a Postgres URL — backup written, nothing imported.");
  process.exit(0);
}

const users: Prisma.UserCreateManyInput[] = raw.users.map((row) => ({
  id: required(row.id),
  name: required(row.name),
  email: required(row.email),
  passwordHash: required(row.passwordHash),
  role: required(row.role, "AGENT"),
  phone: str(row.phone),
  createdAt: date(row.createdAt, new Date())!,
}));

const cities: Prisma.CityCreateManyInput[] = raw.cities.map((row) => ({
  id: required(row.id),
  name: required(row.name),
  nameAr: str(row.nameAr),
  slug: required(row.slug),
  projectCount: int(row.projectCount) ?? 0,
  description: str(row.description),
  image: str(row.image),
}));

const developers: Prisma.DeveloperCreateManyInput[] = raw.developers.map((row) => ({
  id: required(row.id),
  name: required(row.name),
  slug: required(row.slug),
  description: str(row.description),
  website: str(row.website),
}));

const projects: Prisma.ProjectCreateManyInput[] = raw.projects.map((row) => ({
  id: required(row.id),
  name: required(row.name),
  slug: required(row.slug),
  description: str(row.description),
  cityId: required(row.cityId),
  developerId: str(row.developerId),
  category: required(row.category, "Residential"),
  unitTypes: str(row.unitTypes),
  unitArea: str(row.unitArea),
  sourceUrl: str(row.sourceUrl),
  priceFrom: int(row.priceFrom),
  pricePerSqm: int(row.pricePerSqm),
  downPayment: int(row.downPayment),
  installmentYears: int(row.installmentYears),
  deliveryDate: str(row.deliveryDate),
  image: str(row.image),
  featured: bool(row.featured),
  status: required(row.status, "AVAILABLE"),
  createdAt: date(row.createdAt, new Date())!,
}));

const leads: Prisma.LeadCreateManyInput[] = raw.leads.map((row) => ({
  id: required(row.id),
  name: required(row.name),
  email: str(row.email),
  phone: required(row.phone),
  source: required(row.source, "WEBSITE"),
  status: required(row.status, "NEW"),
  budget: int(row.budget),
  message: str(row.message),
  projectId: str(row.projectId),
  cityId: str(row.cityId),
  assignedToId: required(row.assignedToId),
  createdById: required(row.createdById),
  createdAt: date(row.createdAt, new Date())!,
  updatedAt: date(row.updatedAt, new Date())!,
}));

const activities: Prisma.ActivityCreateManyInput[] = raw.activities.map((row) => ({
  id: required(row.id),
  leadId: required(row.leadId),
  type: required(row.type, "NOTE"),
  body: required(row.body),
  createdAt: date(row.createdAt, new Date())!,
}));

const prisma = new PrismaClient();

try {
  await prisma.$transaction([
    prisma.activity.deleteMany(),
    prisma.lead.deleteMany(),
    prisma.project.deleteMany(),
    prisma.developer.deleteMany(),
    prisma.city.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  await prisma.user.createMany({ data: users });
  await prisma.city.createMany({ data: cities });
  await prisma.developer.createMany({ data: developers });
  await prisma.project.createMany({ data: projects });
  await prisma.lead.createMany({ data: leads });
  await prisma.activity.createMany({ data: activities });

  const counts = {
    users: await prisma.user.count(),
    cities: await prisma.city.count(),
    developers: await prisma.developer.count(),
    projects: await prisma.project.count(),
    leads: await prisma.lead.count(),
    activities: await prisma.activity.count(),
  };
  console.log("Imported into Postgres:", counts);
} finally {
  await prisma.$disconnect();
}
