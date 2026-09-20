import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "bee2_device";

/**
 * Read-only lookup, safe to call from a plain Server Component render
 * (Next.js forbids writing cookies there). Middleware (src/middleware.ts)
 * mints this cookie on every request before the page tree renders, so this
 * should always resolve; undefined is only a defensive fallback.
 */
export async function getDeviceId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value;
}

/**
 * Persistent per-browser id, used to bind a license activation to a device.
 * Only call this from a Route Handler or Server Action (where writing
 * cookies is legal) — use `getDeviceId()` from Server Components.
 */
export async function getOrCreateDeviceId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(COOKIE_NAME)?.value;
  if (existing) return existing;

  const id = randomUUID();
  store.set(COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365 * 5,
    path: "/",
  });
  return id;
}

export async function getRequestMeta() {
  const h = await headers();
  const ipAddress =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? undefined;
  const userAgent = h.get("user-agent") ?? undefined;
  return { ipAddress, userAgent };
}
