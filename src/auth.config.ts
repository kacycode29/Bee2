import type { NextAuthConfig } from "next-auth";

/**
 * Lightweight config used by Proxy (src/proxy.ts). Must not import
 * Prisma/bcrypt — the actual credential check and license re-validation
 * happen in server components/route handlers (see src/auth.ts and
 * src/lib/session.ts).
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const publicPaths = [
        "/",
        "/login",
        "/signup",
        "/forgot-password",
        "/acheter",
        "/api/auth",
        "/api/checkout",
        "/api/webhooks/stripe",
      ];
      const isPublic = publicPaths.some(
        (p) => nextUrl.pathname === p || nextUrl.pathname.startsWith(p + "/")
      );
      if (isPublic) return true;
      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
