import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { licenseDurationDays, normalizeLicenseCode } from "@/lib/license";
import { getOrCreateDeviceId, getRequestMeta } from "@/lib/device";

const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "3 caractères minimum.")
    .max(30, "30 caractères maximum.")
    .regex(/^[a-zA-Z0-9._-]+$/, "Lettres, chiffres, points, tirets et underscores uniquement."),
  password: z.string().min(8).max(100),
  licenseCode: z.string().trim().min(6).max(40),
});

/**
 * Creates the account and activates the license key in a single atomic
 * request: there is no "free" account state — a valid key is required to
 * register at all, and nothing is persisted unless the whole operation
 * (username availability + key validity + device slot) succeeds.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return NextResponse.json(
      { error: firstError ?? "Formulaire invalide." },
      { status: 400 }
    );
  }

  const { password, licenseCode } = parsed.data;
  const username = parsed.data.username.toLowerCase();
  const code = normalizeLicenseCode(licenseCode);

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return NextResponse.json(
      { error: "Ce nom d'utilisateur est déjà pris." },
      { status: 409 }
    );
  }

  const license = await prisma.licenseKey.findUnique({ where: { code } });
  if (!license) {
    return NextResponse.json({ error: "Cette clé d'accès n'existe pas." }, { status: 404 });
  }
  if (license.status === "REVOKED") {
    return NextResponse.json({ error: "Cette clé d'accès a été révoquée." }, { status: 403 });
  }
  if (license.expiresAt && license.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Cette clé d'accès a expiré." }, { status: 403 });
  }
  if (license.userId) {
    return NextResponse.json(
      { error: "Cette clé d'accès est déjà utilisée par un autre compte." },
      { status: 403 }
    );
  }

  const deviceFingerprint = await getOrCreateDeviceId();
  const { ipAddress, userAgent } = await getRequestMeta();

  const activeDeviceCount = await prisma.activation.count({
    where: { licenseKeyId: license.id, revoked: false },
  });
  if (activeDeviceCount >= license.maxActivations) {
    return NextResponse.json(
      { error: "Cette clé d'accès a atteint son nombre maximal d'appareils." },
      { status: 403 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const durationDays = licenseDurationDays(license.type);

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { username, passwordHash, role: "TEACHER" },
      });

      await tx.licenseKey.update({
        where: { id: license.id },
        data: {
          status: "ACTIVE",
          userId: user.id,
          activatedAt: new Date(),
          expiresAt: durationDays
            ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
            : null,
        },
      });

      await tx.activation.create({
        data: {
          licenseKeyId: license.id,
          userId: user.id,
          deviceFingerprint,
          ipAddress,
          userAgent,
        },
      });
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de créer le compte. Réessayez." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
