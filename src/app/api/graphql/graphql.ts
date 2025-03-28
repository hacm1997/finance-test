import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Context,
  CreateTransactionArgs,
  Role,
  Transaction,
  TransactionArgs,
  UpdateUserRoleArgs,
} from "./interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

// Define Graphql Scheme
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

// Resolve querys y mutations
const resolvers = {
  Query: {
    getTransactions: async (
      _: unknown,
      { filter }: TransactionArgs,
      context: Context
    ) => {
      if (!context.user) throw new Error("Not authenticated");

      const where = filter
        ? { concept: { contains: filter, mode: "insensitive" } }
        : {};

      return await prisma.transaction.findMany({
        where,
        include: { user: true },
      });
    },

    getUsers: async (_: unknown, __: unknown, context: Context) => {
      if (!context.user || context.user.role !== "ADMIN")
        throw new Error("Access Denied");
      return await prisma.user.findMany();
    },

    getReports: async (_: unknown, __: unknown, context: Context) => {
      if (!context.user || context.user.role !== Role.ADMIN)
        throw new Error("Access Denied");

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
      if (!context.user || context.user.role !== "ADMIN")
        throw new Error("Access Denied");

      return await prisma.transaction.create({
        data: { concept, amount, userId: context.user.id },
      });
    },

    updateUserRole: async (
      _: unknown,
      { userId, role }: UpdateUserRoleArgs,
      context: Context
    ) => {
      if (!context.user || context.user.role !== "ADMIN")
        throw new Error("Access Denied");

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

export default startServerAndCreateNextHandler<NextApiRequest, Context>(
  server,
  {
    context: async (
      req: NextApiRequest,
      res: NextApiResponse
    ): Promise<Context> => {
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user) return { prisma };

      return {
        user: {
          id: session.user.id,
          name: session.user.name ?? undefined,
          email: session.user.email ?? "",
          role: session.user.role as Role,
        },
        prisma,
      };
    },
  }
);

// export default startServerAndCreateNextHandler<NextApiRequest, Context>(
//     server,
//     {
//       context: async (req: NextApiRequest): Promise<Context> => {
//         const authHeader = req.headers.authorization;
//         let user: User | undefined;

//         if (authHeader) {
//           const token = authHeader.split(" ")[1];
//           const decoded = verifyToken(token);
//           if (decoded) {
//             user = decoded as User;
//           }
//         }

//         return { user, prisma };
//       },
//     }
//   );
