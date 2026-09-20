import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: "TEACHER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: "TEACHER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: "TEACHER" | "ADMIN";
  }
}
