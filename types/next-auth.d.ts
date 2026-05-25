import type { DefaultSession } from "next-auth";

type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

declare module "next-auth" {
  interface User {
    role: UserRole;
    username: string;
    mustChangePassword: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      username: string;
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    username?: string;
    mustChangePassword?: boolean;
  }
}
