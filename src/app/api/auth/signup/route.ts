import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Prisma } from "@prisma/client";
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

class LicenseAlreadyClaimedError extends Error {}

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
  if (license.userId || license.status !== "UNUSED") {
    return NextResponse.json(
      { error: "Cette clé d'accès est déjà utilisée par un autre compte." },
      { status: 403 }
    );
  }

  const deviceFingerprint = await getOrCreateDeviceId();
  const { ipAddress, userAgent } = await getRequestMeta();

  const passwordHash = await bcrypt.hash(password, 12);
  const durationDays = licenseDurationDays(license.type);

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { username, passwordHash, role: "TEACHER" },
      });

      // Atomic "claim": the WHERE clause re-checks status = UNUSED at the
      // database level, not just in the earlier plain SELECT above. Two
      // concurrent signups for the same brand-new key both pass that
      // earlier check (neither has committed yet), so without this guard
      // both would go on to "successfully" bind the same key to two
      // different accounts — the second write would silently overwrite
      // the first's, leaving one account signed up but license-less.
      // Postgres serializes concurrent UPDATEs on the same row, so only
      // one of these ever matches and updates a row; the loser gets
      // count === 0 and the whole transaction (including its user
      // creation) is rolled back below.
      const claim = await tx.licenseKey.updateMany({
        where: { id: license.id, status: "UNUSED" },
        data: {
          status: "ACTIVE",
          userId: user.id,
          activatedAt: new Date(),
          expiresAt: durationDays
            ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
            : null,
        },
      });
      if (claim.count === 0) {
        throw new LicenseAlreadyClaimedError();
      }

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
  } catch (err) {
    if (err instanceof LicenseAlreadyClaimedError) {
      return NextResponse.json(
        {
          error:
            "Cette clé d'accès vient d'être utilisée par quelqu'un d'autre au même moment. Réessayez avec une autre clé.",
        },
        { status: 409 }
      );
    }
    // A concurrent duplicate request (e.g. a double click, or the form
    // being submitted twice before the button's disabled state applies)
    // can race past the username pre-check and hit its unique constraint
    // inside the transaction — that's an ordinary conflict, not a server
    // failure, so it gets a proper 409 instead of a generic 500.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const target = (err.meta?.target as string[] | undefined)?.join(",") ?? "";
      if (target.includes("username")) {
        return NextResponse.json(
          { error: "Ce nom d'utilisateur est déjà pris." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Cette clé d'accès vient d'être utilisée. Réessayez avec une autre clé." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Impossible de créer le compte. Réessayez." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
