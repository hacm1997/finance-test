import NextAuth, { AuthOptions, DefaultSession } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { SessionStrategy } from 'next-auth';

// Initialize Prisma
const prisma = new PrismaClient();

// Extend session and user types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
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
    async signIn({ user, account, profile }) {
      if (!user.email || !account?.provider) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (existingUser) {
        // If the user already exists, we check if he/she has an account with this provider.
        const existingAccount = existingUser.accounts.find(
          (acc: { provider: string }) => acc.provider === account.provider
        );

        if (!existingAccount) {
          // If the user does not have an account with this provider, create one.
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: 'oauth',
            },
          });
        }
      }

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return '/dashboard';
    },
  },
  session: {
    strategy: 'database' as SessionStrategy,
  },
};

export const { GET, POST } = NextAuth(authOptions);
