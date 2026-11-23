import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "crypto";
import { cities, developers, projects } from "./data";

const prisma = new PrismaClient();

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${key}`;
}

const leadSeeds = [
  { name: "Ahmed El-Sayed", email: "ahmed.elsayed@gmail.com", phone: "+20 100 234 8811", source: "WEBSITE", status: "NEW", budget: 11000000, project: "azad-new-cairo", city: "fifth-settlement", message: "Looking for a three-bedroom apartment next to the American University, ready to move next year." },
  { name: "Mona Khalil", email: "mona.khalil@outlook.com", phone: "+20 122 774 1290", source: "WHATSAPP", status: "CONTACTED", budget: 9500000, project: "hyde-park-new-cairo", city: "fifth-settlement", message: "Interested in a garden villa, please send the full payment plan." },
  { name: "Omar Farouk", email: "omar.farouk@yahoo.com", phone: "+20 111 908 4477", source: "PHONE", status: "QUALIFIED", budget: 35000000, project: "the-valleys-mostakbal-city-compound", city: "mostakbal-city", message: "Cash buyer, wants a standalone villa with a private pool in Mostakbal City." },
  { name: "Nourhan Adel", email: "nourhan.adel@gmail.com", phone: "+20 106 552 3312", source: "WEBSITE", status: "VISIT", budget: 5200000, project: "celia-new-capital", city: "new-administrative-capital", message: "Site visit booked for Saturday morning at the Celia sales centre." },
  { name: "Karim Mostafa", email: "karim.mostafa@gmail.com", phone: "+20 128 447 9001", source: "REFERRAL", status: "NEGOTIATION", budget: 19000000, project: "compound-97-hills-new-cairo", city: "fifth-settlement", message: "Negotiating a twin house, asking for a longer instalment plan and a corner plot." },
  { name: "Salma Hassan", email: "salma.hassan@gmail.com", phone: "+20 120 118 7765", source: "WEBSITE", status: "WON", budget: 5000000, project: "modon-golf-town-new-cairo", city: "sixth-settlement", message: "Reservation paid for a two-bedroom apartment in Modon Golf Town." },
  { name: "Youssef Ibrahim", email: "youssef.ibrahim@hotmail.com", phone: "+20 109 226 3344", source: "PHONE", status: "LOST", budget: 3000000, project: "talala-new-heliopolis", city: "new-heliopolis-city", message: "Budget below the available units this quarter — will revisit next year." },
  { name: "Dina Sherif", email: "dina.sherif@gmail.com", phone: "+20 127 660 1188", source: "WEBSITE", status: "NEW", budget: 8000000, project: "acasa-alma-new-cairo", city: "sixth-settlement", message: "Asked about school proximity, delivery date and the maintenance deposit." },
  { name: "Hassan Ali", email: "hassan.ali@gmail.com", phone: "+20 100 776 2231", source: "WALK_IN", status: "CONTACTED", budget: 14840000, project: "shark-tank-business-park-taj-city", city: "fifth-settlement", message: "Wants a retail unit facing the main road at Taj City." },
  { name: "Mariam Zaki", email: "mariam.zaki@outlook.com", phone: "+20 114 339 8877", source: "WHATSAPP", status: "QUALIFIED", budget: 8900000, project: "rare-compound-sabbour", city: "mostakbal-city", message: "Comparing Rare with Cityzen, wants a townhouse with a garden." },
  { name: "Tarek Nabil", email: "tarek.nabil@gmail.com", phone: "+20 115 442 6690", source: "REFERRAL", status: "VISIT", budget: 4116000, project: "chapters-new-capital", city: "new-administrative-capital", message: "Visiting the Chapters New Capital sales centre on Friday." },
  { name: "Rana Fouad", email: "rana.fouad@gmail.com", phone: "+20 101 998 4321", source: "WEBSITE", status: "NEW", budget: 25500000, project: "zed-east-new-cairo", city: "fifth-settlement", message: "Requested the Zed East brochure and the latest price list." },
];

async function main() {
  console.log("Seeding Makers Real Estates database…");

  await prisma.activity.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.project.deleteMany();
  await prisma.developer.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Ahmed Hassan",
      email: "admin@makersrealestate.com",
      passwordHash: hashPassword("Admin@12345"),
      role: "ADMIN",
      phone: "+20 100 123 4567",
    },
  });

  const agent = await prisma.user.create({
    data: {
      name: "Sara Mansour",
      email: "sara@makersrealestate.com",
      passwordHash: hashPassword("Agent@12345"),
      role: "AGENT",
      phone: "+20 100 552 7788",
    },
  });

  const cityMap = new Map<string, string>();
  for (const city of cities) {
    const created = await prisma.city.create({ data: city });
    cityMap.set(city.slug, created.id);
  }

  const devMap = new Map<string, string>();
  for (const developer of developers) {
    const created = await prisma.developer.create({ data: developer });
    devMap.set(developer.slug, created.id);
  }

  const projectMap = new Map<string, { id: string; cityId: string }>();
  for (const project of projects) {
    const created = await prisma.project.create({
      data: {
        name: project.name,
        slug: project.slug,
        description: project.description,
        cityId: cityMap.get(project.city)!,
        developerId: project.developer ? devMap.get(project.developer) ?? null : null,
        category: project.category,
        unitTypes: project.unitTypes,
        unitArea: project.unitArea,
        sourceUrl: project.sourceUrl,
        priceFrom: project.priceFrom,
        pricePerSqm: project.pricePerSqm,
        downPayment: project.downPayment,
        installmentYears: project.installmentYears,
        deliveryDate: project.deliveryDate ?? null,
        image: project.image,
        featured: project.featured,
        status: "AVAILABLE",
      },
    });
    projectMap.set(project.slug, { id: created.id, cityId: created.cityId });
  }

  let index = 0;
  for (const lead of leadSeeds) {
    const project = projectMap.get(lead.project);
    const created = await prisma.lead.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: lead.status,
        budget: lead.budget,
        message: lead.message,
        projectId: project?.id ?? null,
        cityId: cityMap.get(lead.city) ?? project?.cityId ?? null,
        assignedToId: index % 3 === 0 ? agent.id : admin.id,
        createdById: admin.id,
        createdAt: new Date(Date.now() - index * 36 * 60 * 60 * 1000),
      },
    });

    await prisma.activity.create({
      data: {
        leadId: created.id,
        type: "NOTE",
        body: `Website inquiry about ${project ? lead.project.replace(/-/g, " ") : "the portfolio"}.`,
      },
    });
    index++;
  }

  console.log(
    `Seeded ${cities.length} cities, ${developers.length} developers, ${projects.length} projects and ${leadSeeds.length} leads.`
  );
  console.log("Admin login: admin@makersrealestate.com / Admin@12345");
  console.log("Agent login: sara@makersrealestate.com / Agent@12345");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
