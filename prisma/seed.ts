import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { SEED_TEXTS } from "./seed-data";

const prisma = new PrismaClient();

const STARTER_KEY_COUNT = 100;

function countWords(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

// Same unambiguous alphabet as src/lib/license.ts (no 0/O, 1/I).
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function segment() {
  return Array.from({ length: 5 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");
}

/** 15-character product key, Windows-style: XXXXX-XXXXX-XXXXX. */
function generateCode() {
  return `${segment()}-${segment()}-${segment()}`;
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

  console.log(`Seeding ${STARTER_KEY_COUNT} starter license keys...`);
  const existingKeys = await prisma.licenseKey.count();
  let starterKeys: string[] = [];
  if (existingKeys === 0) {
    const codes = new Set<string>();
    while (codes.size < STARTER_KEY_COUNT) codes.add(generateCode());
    starterKeys = Array.from(codes);

    await prisma.licenseKey.createMany({
      data: starterKeys.map((code) => ({
        code,
        type: "ANNUAL",
        maxActivations: 2,
        notes: "Clé de démarrage (seed)",
      })),
      skipDuplicates: true,
    });
  } else {
    starterKeys = (await prisma.licenseKey.findMany({ select: { code: true } })).map((k) => k.code);
  }

  const outPath = path.join(__dirname, "..", "starter-license-keys.txt");
  fs.writeFileSync(
    outPath,
    `Bee2 — ${starterKeys.length} clés de licence (format XXXXX-XXXXX-XXXXX)\n` +
      `Générées le ${new Date().toISOString().slice(0, 10)}\n\n` +
      starterKeys.join("\n") +
      "\n"
  );
  console.log(`  ${starterKeys.length} clés écrites dans ${outPath}`);
  console.log(`  exemple : ${starterKeys[0]}`);

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
