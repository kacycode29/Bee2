import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const DEVICE_COOKIE = "bee2_device";

/**
 * Cookies can only be written from middleware, a Route Handler or a Server
 * Action — never from a plain Server Component render (Next.js throws).
 * The device-fingerprint cookie used to gate the per-license device cap
 * (see lib/session.ts) must exist before any protected page renders, so it
 * is minted here, on the response, for every request that doesn't already
 * carry one.
 *
 * `auth()` called this way returns a plain (non-Next) `Response` for the
 * pass-through case, which has no `.cookies` helper — so we always build
 * our own `NextResponse`, only copying the redirect target over when
 * `auth()` actually decided to redirect.
 */
export async function middleware(request: NextRequest) {
  const authResult = (await auth(request as never)) as unknown as Response | undefined;

  const isRedirect = authResult && authResult.status >= 300 && authResult.status < 400;
  const response = isRedirect
    ? NextResponse.redirect(new URL(authResult.headers.get("location") ?? "/login", request.url))
    : NextResponse.next();

  if (!request.cookies.get(DEVICE_COOKIE)) {
    // Edge runtime: the Web Crypto API is available as a global (no
    // import) — Node's `node:crypto` module is not.
    response.cookies.set(DEVICE_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 5,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
