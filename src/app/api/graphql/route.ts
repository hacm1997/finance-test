import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Context, Role } from '@/app/api/graphql/interfaces';
import { authOptions } from '../../../libs/authOptions';
import { typeDefs, resolvers } from './resolvers';

const prisma = new PrismaClient();

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res): Promise<Context> => {
    const session = await getServerSession(authOptions);

    return {
      user: session?.user
        ? {
            id: session.user.id,
            name: session.user.name ?? undefined,
            email: session.user.email ?? '',
            role: (session.user.role as Role) ?? Role.USER, // Asegurar un valor válido
          }
        : undefined,
      prisma,
    };
  },
});

// Export handlers for Next.js API routes in App Router
export const GET = async (req: Request) => handler(req);
export const POST = async (req: Request) => handler(req);
