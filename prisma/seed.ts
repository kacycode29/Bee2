import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SEED_TEXTS } from "./seed-data";

const prisma = new PrismaClient();

function countWords(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

function segment() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function generateCode() {
  return `BEE2-${segment()}-${segment()}-${segment()}`;
}

async function main() {
  console.log("Seeding admin account...");
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@bee2.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administrateur Bee2",
      role: "ADMIN",
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });
  console.log(`  admin: ${admin.email} / ${adminPassword} (à changer en production)`);

  console.log("Seeding demo license keys...");
  const existingKeys = await prisma.licenseKey.count();
  if (existingKeys === 0) {
    await prisma.licenseKey.createMany({
      data: Array.from({ length: 5 }, () => ({
        code: generateCode(),
        type: "LIFETIME",
        maxActivations: 3,
        notes: "Clé de démonstration (seed)",
      })),
    });
  }
  const demoKeys = await prisma.licenseKey.findMany({ take: 5 });
  demoKeys.forEach((k) => console.log(`  clé démo: ${k.code}`));

  console.log(`Seeding ${SEED_TEXTS.length} texts...`);
  for (const seedText of SEED_TEXTS) {
    const existing = await prisma.text.findFirst({ where: { title: seedText.title } });
    if (existing) {
      console.log(`  skip (exists): ${seedText.title}`);
      continue;
    }

    const text = await prisma.text.create({
      data: {
        title: seedText.title,
        level: seedText.level,
        theme: seedText.theme,
        ageGroup: seedText.ageGroup,
        tags: seedText.tags,
        body: seedText.body.trim(),
        wordCount: countWords(seedText.body),
        source: "ORIGINAL",
        createdById: admin.id,
        exercises: {
          create: [
            { type: "VOCAB_MATCH", order: 0, data: seedText.vocab },
            { type: "TRUE_FALSE", order: 1, data: seedText.trueFalse },
            {
              type: "COMPREHENSION",
              order: 2,
              data: seedText.questions.map((q) => ({ question: q })),
            },
          ],
        },
      },
    });
    console.log(`  created: ${text.title} (${text.level})`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
