import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";
import type { LicenseKey, LicenseStatus, LicenseType } from "@prisma/client";

// Unambiguous alphabet (no 0/O, 1/I) to keep keys easy to type by hand.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const segment = customAlphabet(ALPHABET, 5);

/**
 * 15-character product key, formatted like a Windows product key
 * (XXXXX-XXXXX-XXXXX) for familiarity — 3 groups of 5 unambiguous
 * alphanumeric characters, dashes not counted in the 15.
 */
export function generateLicenseCode(): string {
  return `${segment()}-${segment()}-${segment()}`;
}

/** Normalizes user input (trims, uppercases, strips stray spaces around dashes). */
export function normalizeLicenseCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function licenseDurationDays(type: LicenseType): number | null {
  switch (type) {
    case "TRIAL":
      return 14;
    case "ANNUAL":
      return 365;
    case "LIFETIME":
      return null;
  }
}

export type LicenseCheck =
  | { ok: true }
  | { ok: false; reason: "NONE" | "UNUSED" | "REVOKED" | "EXPIRED" };

/** Pure check, no DB access — used once the key row has been fetched. */
export function evaluateLicense(
  license: Pick<LicenseKey, "status" | "expiresAt"> | null
): LicenseCheck {
  if (!license) return { ok: false, reason: "NONE" };
  if (license.status === "REVOKED") return { ok: false, reason: "REVOKED" };
  if (license.status === "UNUSED") return { ok: false, reason: "UNUSED" };
  if (license.expiresAt && license.expiresAt.getTime() < Date.now()) {
    return { ok: false, reason: "EXPIRED" };
  }
  if (license.status === "EXPIRED") return { ok: false, reason: "EXPIRED" };
  return { ok: true };
}

/**
 * Re-checks a user's license directly against the database. Always called
 * from server components / route handlers (Node runtime) so a revocation
 * by an admin takes effect on the user's very next request, not just at
 * their next login.
 */
export async function getFreshLicenseStatus(userId: string): Promise<{
  status: LicenseStatus | "NONE";
  check: LicenseCheck;
  license: LicenseKey | null;
}> {
  const license = await prisma.licenseKey.findUnique({ where: { userId } });

  if (license && license.status === "ACTIVE" && license.expiresAt && license.expiresAt.getTime() < Date.now()) {
    await prisma.licenseKey.update({
      where: { id: license.id },
      data: { status: "EXPIRED" },
    });
    license.status = "EXPIRED";
  }

  const check = evaluateLicense(license);
  return { status: license?.status ?? "NONE", check, license };
}

export const MAX_LABEL_LENGTH = 60;
