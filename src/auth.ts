import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

class TooManyAttemptsError extends CredentialsSignin {
  code = "too_many_attempts";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(rawCredentials, request) {
        const rateLimit = checkRateLimit(buildRateLimitKey(request, "login"), {
          limit: 10,
          windowMs: 15 * 60 * 1000,
        });
        if (!rateLimit.ok) throw new TooManyAttemptsError();

        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        const { username, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { username: username.toLowerCase() },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as { username: string }).username;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as "TEACHER" | "ADMIN";
      }
      return session;
    },
  },
});
