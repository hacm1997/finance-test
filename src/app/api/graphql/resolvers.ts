import { Prisma, PrismaClient } from '@prisma/client';
import {
  Context,
  CreateTransactionArgs,
  Role,
  Transaction,
  TransactionArgs,
  UpdateUserRoleArgs,
} from '@/app/api/graphql/interfaces';

const prisma = new PrismaClient();

export const typeDefs = `#graphql
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

type ReportTransaction {
  concept: String!
  amount: Float!
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
  getReportTransactions: [ReportTransaction!]!
}

type Mutation {
  createTransaction(concept: String!, amount: Float!, date: String!): Transaction
  updateUserRole(userId: ID!, role: Role!): User
}
`;

// Define resolvers
export const resolvers = {
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
        .filter(({ amount }) => amount > 0)
        .reduce((sum, { amount }) => sum + amount, 0);

      const totalExpenses = transactions
        .filter(({ amount }) => amount < 0)
        .reduce((sum, { amount }) => sum + Math.abs(amount), 0);

      const balance = totalIncome - totalExpenses;

      return { totalIncome, totalExpenses, balance };
    },

    getReportTransactions: async (
      _: unknown,
      __: unknown,
      context: Context
    ) => {
      if (!context.user || context.user.role !== Role.ADMIN)
        throw new Error('Access Denied');

      const transactions: Transaction[] =
        await context.prisma.transaction.findMany();

      // Agrupar transacciones por concepto y sumar sus montos
      const mergedData = Object.values(
        transactions.reduce<
          Record<string, { concept: string; amount: number }>
        >((acc, { concept, amount }) => {
          if (!acc[concept]) {
            acc[concept] = { concept, amount: 0 };
          }
          acc[concept].amount += amount ?? 0; // Asegurar que amount nunca sea null
          return acc;
        }, {})
      );
      console.log('mergedData => ', mergedData);

      return mergedData.map(({ concept, amount }) => ({
        concept,
        amount: Number(amount) || 0, // Asegurar que siempre sea un número válido
      }));
    },
  },

  Mutation: {
    createTransaction: async (
      _: unknown,
      { concept, amount, date }: CreateTransactionArgs,
      context: Context
    ) => {
      if (!context.user || context.user.role !== 'ADMIN')
        throw new Error('Access Denied');

      return await prisma.transaction.create({
        data: { concept, amount, date, userId: context.user.id },
        include: {
          user: true,
        },
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
