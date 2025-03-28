import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { Prisma, PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import {
  Context,
  CreateTransactionArgs,
  Role,
  Transaction,
  TransactionArgs,
  UpdateUserRoleArgs,
} from '@/app/api/graphql/interfaces';
import { authOptions } from '../../../libs/authOptions';

const prisma = new PrismaClient();

// Define GraphQL schema
const typeDefs = `#graphql
type User {
  id: ID!
  name: String
  email: String!
  role: Role!
}

type Transaction {
  id: ID!
  concept: String!
  amount: Float!
  date: String!
  user: User!
}

enum Role {
  USER
  ADMIN
}

type Report {
  totalIncome: Float!
  totalExpenses: Float!
  balance: Float!
}

type Query {
  getTransactions(filter: String): [Transaction]!
  getUsers: [User]!
  getReports: Report!
}

type Mutation {
  createTransaction(concept: String!, amount: Float!): Transaction
  updateUserRole(userId: ID!, role: Role!): User
}
`;

// Define resolvers
const resolvers = {
  Query: {
    getTransactions: async (
      _: unknown,
      { filter }: TransactionArgs,
      context: Context
    ) => {
      if (!context.user) throw new Error('Not authenticated');

      const where = filter
        ? { concept: { contains: filter, mode: Prisma.QueryMode.insensitive } }
        : {};

      return await prisma.transaction.findMany({
        where,
        include: { user: true },
      });
    },

    getUsers: async (_: unknown, __: unknown, context: Context) => {
      if (!context.user || context.user.role !== 'ADMIN')
        throw new Error('Access Denied');
      return await prisma.user.findMany();
    },

    getReports: async (_: unknown, __: unknown, context: Context) => {
      if (!context.user || context.user.role !== Role.ADMIN)
        throw new Error('Access Denied');

      const transactions: Transaction[] = await prisma.transaction.findMany();

      const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const balance = totalIncome - totalExpenses;

      return { totalIncome, totalExpenses, balance };
    },
  },

  Mutation: {
    createTransaction: async (
      _: unknown,
      { concept, amount }: CreateTransactionArgs,
      context: Context
    ) => {
      if (!context.user || context.user.role !== 'ADMIN')
        throw new Error('Access Denied');

      return await prisma.transaction.create({
        data: { concept, amount, userId: context.user.id },
      });
    },

    updateUserRole: async (
      _: unknown,
      { userId, role }: UpdateUserRoleArgs,
      context: Context
    ) => {
      if (!context.user || context.user.role !== 'ADMIN')
        throw new Error('Access Denied');

      return await prisma.user.update({
        where: { id: userId },
        data: { role },
      });
    },
  },
};

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
