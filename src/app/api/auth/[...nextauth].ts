import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { SessionStrategy } from "next-auth";

// Initialize Prisma
const prisma = new PrismaClient();

// Extend session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
  session: {
    strategy: "database" as SessionStrategy,
  },
};

export default NextAuth(authOptions);
