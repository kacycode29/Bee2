import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

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

  if (parsed.data.token !== configuredToken) {
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
