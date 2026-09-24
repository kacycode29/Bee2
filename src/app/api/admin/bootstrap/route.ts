import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getRequestMeta } from "@/lib/device";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  username: z.string().min(3),
  token: z.string().min(1),
});

/**
 * One-time-use-style endpoint to promote an existing account to ADMIN in
 * production, without ever hardcoding admin credentials. Requires
 * ADMIN_SETUP_TOKEN (server-only secret) — rotate/remove it after use.
 */
export async function POST(request: Request) {
  const { ipAddress } = await getRequestMeta();
  const rateLimit = checkRateLimit(`admin-bootstrap:${ipAddress ?? "unknown"}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSec) } }
    );
  }

  const configuredToken = process.env.ADMIN_SETUP_TOKEN;
  if (!configuredToken) {
    return NextResponse.json(
      { error: "ADMIN_SETUP_TOKEN n'est pas configuré sur le serveur." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const provided = Buffer.from(parsed.data.token);
  const expected = Buffer.from(configuredToken);
  const tokenValid =
    provided.length === expected.length && timingSafeEqual(provided, expected);
  if (!tokenValid) {
    return NextResponse.json({ error: "Jeton invalide." }, { status: 403 });
  }

  const user = await prisma.user
    .update({
      where: { username: parsed.data.username.toLowerCase() },
      data: { role: "ADMIN" },
    })
    .catch(() => null);

  if (!user) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, username: user.username });
}
