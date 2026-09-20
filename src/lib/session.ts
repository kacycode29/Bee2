import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getFreshLicenseStatus } from "@/lib/license";
import { getDeviceId, getRequestMeta } from "@/lib/device";

/** Any logged-in user, no license check. Used on /activate, /account. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}

/**
 * Logged-in user with a currently valid (non-revoked, non-expired,
 * activated) license, on a device that counts against — or is within —
 * that license's device cap.
 *
 * Re-checked against the DB on every call (license status AND device),
 * so a revocation by an admin, or a device cap reached on another
 * browser, takes effect immediately rather than only at next login: a
 * plain username/password session is not enough on its own to bypass the
 * per-device limit. A first-seen device is auto-registered as long as
 * the cap isn't reached, so legitimate multi-device use needs no manual
 * re-entry of the key. Admins bypass all of this.
 */
export async function requireActiveLicense() {
  const user = await requireUser();
  if (user.role === "ADMIN") return user;

  const { check, license } = await getFreshLicenseStatus(user.id);
  if (!check.ok) redirect(`/activate?reason=${check.reason}`);

  const deviceFingerprint = await getDeviceId();
  if (!deviceFingerprint) redirect("/activate?reason=DEVICE_UNKNOWN");

  const activation = await prisma.activation.findUnique({
    where: {
      licenseKeyId_deviceFingerprint: { licenseKeyId: license!.id, deviceFingerprint },
    },
  });

  if (activation) {
    if (activation.revoked) redirect("/activate?reason=DEVICE_REVOKED");
    await prisma.activation.update({
      where: { id: activation.id },
      data: { lastSeenAt: new Date() },
    });
  } else {
    const activeDeviceCount = await prisma.activation.count({
      where: { licenseKeyId: license!.id, revoked: false },
    });
    if (activeDeviceCount >= license!.maxActivations) {
      redirect("/activate?reason=DEVICE_LIMIT");
    }
    const { ipAddress, userAgent } = await getRequestMeta();
    // Upsert, not create: Next.js can invoke a layout more than once for a
    // single navigation, so two concurrent first-sight requests for the
    // same new device are possible — a plain create() would then throw on
    // the unique (licenseKeyId, deviceFingerprint) constraint.
    await prisma.activation.upsert({
      where: {
        licenseKeyId_deviceFingerprint: { licenseKeyId: license!.id, deviceFingerprint },
      },
      update: { lastSeenAt: new Date(), revoked: false, ipAddress, userAgent },
      create: { licenseKeyId: license!.id, userId: user.id, deviceFingerprint, ipAddress, userAgent },
    });
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
