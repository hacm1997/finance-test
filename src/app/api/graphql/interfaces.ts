import { PrismaClient } from '@prisma/client';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: Role;
}

export interface Context {
  user?: User;
  prisma: PrismaClient;
}

export interface Transaction {
  id: string;
  concept: string;
  amount: number;
  date: Date;
  userId: string;
}

export interface TransactionArgs {
  filter?: string;
}

export interface CreateTransactionArgs {
  concept: string;
  amount: number;
  date: Date;
}

export interface UpdateUserRoleArgs {
  userId: string;
  role: Role;
}

export interface Context {
  user?: { id: string; name?: string; email: string; role: Role };
}
