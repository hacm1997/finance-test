// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, useSuspenseQuery, useInfiniteQuery, useSuspenseInfiniteQuery, UseMutationOptions, UseQueryOptions, UseSuspenseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  createTransaction?: Maybe<Transaction>;
  updateUserRole?: Maybe<User>;
};


export type MutationCreateTransactionArgs = {
  amount: Scalars['Float']['input'];
  concept: Scalars['String']['input'];
  date: Scalars['String']['input'];
};


export type MutationUpdateUserRoleArgs = {
  role: Role;
  userId: Scalars['ID']['input'];
};

export type Query = {
  getReports: Report;
  getTransactions: Array<Maybe<Transaction>>;
  getUsers: Array<Maybe<User>>;
};


export type QueryGetTransactionsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};

export type Report = {
  balance: Scalars['Float']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Transaction = {
  amount: Scalars['Float']['output'];
  concept: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type User = {
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
};

export type TransactionFieldsFragment = { id: string, date: string, concept: string, amount: number, user: { id: string, name?: string | null, email: string, role: Role } };

export type UserFieldsFragment = { id: string, name?: string | null, email: string, role: Role };

export type CreateTransactionMutationVariables = Exact<{
  concept: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
}>;


export type CreateTransactionMutation = { createTransaction?: { id: string, date: string, concept: string, amount: number, user: { id: string, name?: string | null, email: string, role: Role } } | null };

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionsQuery = { getTransactions: Array<{ id: string, date: string, concept: string, amount: number, user: { id: string, name?: string | null, email: string, role: Role } } | null> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { getUsers: Array<{ id: string, name?: string | null, email: string, role: Role } | null> };


export const UserFieldsFragmentDoc = `
    fragment UserFields on User {
  id
  name
  email
  role
}
    `;
export const TransactionFieldsFragmentDoc = `
    fragment TransactionFields on Transaction {
  id
  date
  concept
  amount
  user {
    ...UserFields
  }
}
    `;
export const CreateTransactionDocument = `
    mutation CreateTransaction($concept: String!, $amount: Float!, $date: String!) {
  createTransaction(concept: $concept, amount: $amount, date: $date) {
    ...TransactionFields
  }
}
    ${TransactionFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;

export const useCreateTransactionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateTransactionMutation, TError, CreateTransactionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateTransactionMutation, TError, CreateTransactionMutationVariables, TContext>(
      {
    mutationKey: ['CreateTransaction'],
    mutationFn: (variables?: CreateTransactionMutationVariables) => fetcher<CreateTransactionMutation, CreateTransactionMutationVariables>(client, CreateTransactionDocument, variables, headers)(),
    ...options
  }
    )};


useCreateTransactionMutation.fetcher = (client: GraphQLClient, variables: CreateTransactionMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateTransactionMutation, CreateTransactionMutationVariables>(client, CreateTransactionDocument, variables, headers);

export const GetTransactionsDocument = `
    query GetTransactions {
  getTransactions {
    ...TransactionFields
  }
}
    ${TransactionFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;

export const useGetTransactionsQuery = <
      TData = GetTransactionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetTransactionsQueryVariables,
      options?: Omit<UseQueryOptions<GetTransactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTransactionsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetTransactionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTransactions'] : ['GetTransactions', variables],
    queryFn: fetcher<GetTransactionsQuery, GetTransactionsQueryVariables>(client, GetTransactionsDocument, variables, headers),
    ...options
  }
    )};

useGetTransactionsQuery.getKey = (variables?: GetTransactionsQueryVariables) => variables === undefined ? ['GetTransactions'] : ['GetTransactions', variables];

export const useSuspenseGetTransactionsQuery = <
      TData = GetTransactionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetTransactionsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetTransactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetTransactionsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useSuspenseQuery<GetTransactionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTransactionsSuspense'] : ['GetTransactionsSuspense', variables],
    queryFn: fetcher<GetTransactionsQuery, GetTransactionsQueryVariables>(client, GetTransactionsDocument, variables, headers),
    ...options
  }
    )};

useSuspenseGetTransactionsQuery.getKey = (variables?: GetTransactionsQueryVariables) => variables === undefined ? ['GetTransactionsSuspense'] : ['GetTransactionsSuspense', variables];

export const useInfiniteGetTransactionsQuery = <
      TData = InfiniteData<GetTransactionsQuery>,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetTransactionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTransactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTransactionsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<GetTransactionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTransactions.infinite'] : ['GetTransactions.infinite', variables],
      queryFn: (metaData) => fetcher<GetTransactionsQuery, GetTransactionsQueryVariables>(client, GetTransactionsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTransactionsQuery.getKey = (variables?: GetTransactionsQueryVariables) => variables === undefined ? ['GetTransactions.infinite'] : ['GetTransactions.infinite', variables];

export const useSuspenseInfiniteGetTransactionsQuery = <
      TData = InfiniteData<GetTransactionsQuery>,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetTransactionsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetTransactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetTransactionsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useSuspenseInfiniteQuery<GetTransactionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTransactions.infiniteSuspense'] : ['GetTransactions.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetTransactionsQuery, GetTransactionsQueryVariables>(client, GetTransactionsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetTransactionsQuery.getKey = (variables?: GetTransactionsQueryVariables) => variables === undefined ? ['GetTransactions.infiniteSuspense'] : ['GetTransactions.infiniteSuspense', variables];


useGetTransactionsQuery.fetcher = (client: GraphQLClient, variables?: GetTransactionsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetTransactionsQuery, GetTransactionsQueryVariables>(client, GetTransactionsDocument, variables, headers);

export const GetUsersDocument = `
    query GetUsers {
  getUsers {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUsersQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetUsersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
    queryFn: fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers),
    ...options
  }
    )};

useGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers'] : ['GetUsers', variables];

export const useSuspenseGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUsersQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetUsersQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useSuspenseQuery<GetUsersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsersSuspense'] : ['GetUsersSuspense', variables],
    queryFn: fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers),
    ...options
  }
    )};

useSuspenseGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsersSuspense'] : ['GetUsersSuspense', variables];

export const useInfiniteGetUsersQuery = <
      TData = InfiniteData<GetUsersQuery>,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUsersQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUsersQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<GetUsersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsers.infinite'] : ['GetUsers.infinite', variables],
      queryFn: (metaData) => fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers.infinite'] : ['GetUsers.infinite', variables];

export const useSuspenseInfiniteGetUsersQuery = <
      TData = InfiniteData<GetUsersQuery>,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUsersQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetUsersQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useSuspenseInfiniteQuery<GetUsersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsers.infiniteSuspense'] : ['GetUsers.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers.infiniteSuspense'] : ['GetUsers.infiniteSuspense', variables];


useGetUsersQuery.fetcher = (client: GraphQLClient, variables?: GetUsersQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers);
