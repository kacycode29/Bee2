import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { licenseDurationDays, normalizeLicenseCode } from "@/lib/license";
import { getOrCreateDeviceId, getRequestMeta } from "@/lib/device";
import { checkRateLimit } from "@/lib/rate-limit";

const activateSchema = z.object({
  code: z.string().min(6).max(40),
  deviceLabel: z.string().max(60).optional(),
});

class LicenseAlreadyClaimedError extends Error {}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const rateLimit = checkRateLimit(`activate:${session.user.id}`, {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSec) } }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = activateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Clé invalide." }, { status: 400 });
  }

  const code = normalizeLicenseCode(parsed.data.code);
  const userId = session.user.id;

  const license = await prisma.licenseKey.findUnique({ where: { code } });
  if (!license) {
    return NextResponse.json({ error: "Cette clé n'existe pas." }, { status: 404 });
  }
  if (license.status === "REVOKED") {
    return NextResponse.json({ error: "Cette clé a été révoquée." }, { status: 403 });
  }
  if (license.expiresAt && license.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Cette clé a expiré." }, { status: 403 });
  }
  if (license.userId && license.userId !== userId) {
    return NextResponse.json(
      { error: "Cette clé est déjà associée à un autre compte." },
      { status: 403 }
    );
  }

  const existingLicenseForUser = await prisma.licenseKey.findUnique({ where: { userId } });
  if (existingLicenseForUser && existingLicenseForUser.id !== license.id) {
    return NextResponse.json(
      { error: "Votre compte a déjà une licence active. Contactez le support pour la changer." },
      { status: 409 }
    );
  }

  const deviceFingerprint = await getOrCreateDeviceId();
  const { ipAddress, userAgent } = await getRequestMeta();

  const activeDeviceCount = await prisma.activation.count({
    where: { licenseKeyId: license.id, revoked: false },
  });

  const alreadyActivatedOnThisDevice = await prisma.activation.findUnique({
    where: {
      licenseKeyId_deviceFingerprint: {
        licenseKeyId: license.id,
        deviceFingerprint,
      },
    },
  });

  if (!alreadyActivatedOnThisDevice && activeDeviceCount >= license.maxActivations) {
    return NextResponse.json(
      {
        error: `Nombre maximal d'appareils atteint pour cette clé (${license.maxActivations}). Désactivez un appareil depuis votre compte pour en ajouter un nouveau.`,
      },
      { status: 403 }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (license.status === "UNUSED") {
        // Atomic claim, re-checked at the database level: two concurrent
        // first-time activations of the same brand-new key (by two
        // different accounts) both pass the plain-SELECT checks above
        // before either has committed. Gating this UPDATE on
        // status = "UNUSED" means only the first to actually commit can
        // ever match; the loser gets count === 0 here instead of silently
        // overwriting the winner's claim.
        const durationDays = licenseDurationDays(license.type);
        const claim = await tx.licenseKey.updateMany({
          where: { id: license.id, status: "UNUSED" },
          data: {
            status: "ACTIVE",
            userId,
            activatedAt: new Date(),
            expiresAt: durationDays
              ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
              : null,
          },
        });
        if (claim.count === 0) {
          throw new LicenseAlreadyClaimedError();
        }
      }

      await tx.activation.upsert({
        where: {
          licenseKeyId_deviceFingerprint: {
            licenseKeyId: license.id,
            deviceFingerprint,
          },
        },
        update: { lastSeenAt: new Date(), ipAddress, userAgent, revoked: false },
        create: {
          licenseKeyId: license.id,
          userId,
          deviceFingerprint,
          deviceLabel: parsed.data.deviceLabel,
          ipAddress,
          userAgent,
        },
      });
    });
  } catch (err) {
    if (err instanceof LicenseAlreadyClaimedError) {
      return NextResponse.json(
        {
          error:
            "Cette clé vient d'être utilisée par quelqu'un d'autre au même moment. Réessayez avec une autre clé.",
        },
        { status: 409 }
      );
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Votre compte a déjà une licence active. Réessayez." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Impossible d'activer cette clé. Réessayez." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
