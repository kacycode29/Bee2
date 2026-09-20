import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getFreshLicenseStatus } from "@/lib/license";

/** Any logged-in user, no license check. Used on /activate, /account. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}

/**
 * Logged-in user with a currently valid (non-revoked, non-expired,
 * activated) license. Re-checked against the DB on every call so a
 * revocation by an admin takes effect immediately, not at next login.
 * Admins bypass the license requirement.
 */
export async function requireActiveLicense() {
  const user = await requireUser();
  if (user.role === "ADMIN") return user;

  const { check } = await getFreshLicenseStatus(user.id);
  if (!check.ok) redirect(`/activate?reason=${check.reason}`);
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
