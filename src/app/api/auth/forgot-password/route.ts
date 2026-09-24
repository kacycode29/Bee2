import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { normalizeLicenseCode } from "@/lib/license";
import { getRequestMeta } from "@/lib/device";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  username: z.string().trim().min(3).max(30),
  licenseCode: z.string().trim().min(6).max(40),
  newPassword: z.string().min(8).max(100),
});

const GENERIC_ERROR = "Nom d'utilisateur ou clé d'accès invalide.";

/**
 * Self-service password reset: since accounts have no email, the license
 * key already bound to the account stands in for it as the second proof
 * of identity — only the paying owner of the account has both the exact
 * username and the exact key. Both are checked against the *same* user
 * row so one correct field never leaks whether the other was wrong.
 */
export async function POST(request: Request) {
  const { ipAddress } = await getRequestMeta();
  const rateLimit = checkRateLimit(`forgot-password:${ipAddress ?? "unknown"}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSec) } }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Formulaire invalide." }, { status: 400 });
  }

  const username = parsed.data.username.toLowerCase();
  const code = normalizeLicenseCode(parsed.data.licenseCode);

  const user = await prisma.user.findUnique({
    where: { username },
    include: { licenseKey: true },
  });

  if (!user || !user.licenseKey || user.licenseKey.code !== code) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 403 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return NextResponse.json({ ok: true });
}
