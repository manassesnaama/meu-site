import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  username: z.string().trim().min(3),
  password: z.string().min(6)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: parsed.data.username }
        });

        if (!user || !(await compare(parsed.data.password, user.passwordHash))) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          role: user.role,
          username: user.username,
          mustChangePassword: user.mustChangePassword
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.mustChangePassword = user.mustChangePassword;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "STUDENT" | "TEACHER" | "ADMIN";
      session.user.username = token.username as string;
      session.user.mustChangePassword = Boolean(token.mustChangePassword);
      return session;
    }
  }
});
