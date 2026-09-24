/**
 * In-memory sliding-window rate limiter, keyed by an arbitrary string
 * (IP + route). Good enough for a single-process deployment; if this app
 * ever runs across multiple server instances, swap the Map for a shared
 * store (e.g. Redis) — the limiter's job is only to slow down brute-force
 * attempts on auth endpoints, not to be a distributed system.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Opportunistic cleanup so the map doesn't grow unbounded between hits.
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

const DEVICE_COOKIE_NAME = "bee2_device";

/**
 * Builds a rate-limit key from a raw Request, without depending on
 * next/headers (so it works identically inside NextAuth's `authorize`,
 * which hands us the Request directly, and inside Route Handlers).
 *
 * IP alone is not a safe key on its own: `X-Forwarded-For` is only
 * trustworthy behind a reverse proxy that overwrites it, and when it's
 * absent every anonymous client falls back to the same "unknown" bucket —
 * which would mean one user's failed logins could lock out every other
 * anonymous visitor sharing that fallback. Folding in the httpOnly device
 * cookie (minted by src/proxy.ts on first visit, not something a normal
 * client can omit without losing the cookie jar) gives each browser its
 * own bucket even when the IP can't be trusted or resolved.
 */
export function buildRateLimitKey(request: Request, prefix: string): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${DEVICE_COOKIE_NAME}=([^;]+)`));
  const device = match ? decodeURIComponent(match[1]) : "no-device";

  return `${prefix}:${ip}:${device}`;
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}
