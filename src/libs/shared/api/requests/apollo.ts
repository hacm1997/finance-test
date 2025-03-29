import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
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
  __typename?: 'Query';
  getReportTransactions: Array<ReportTransaction>;
  getReports: Report;
  getTransactions: Array<Maybe<Transaction>>;
  getUsers: Array<Maybe<User>>;
};


export type QueryGetTransactionsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};

export type Report = {
  __typename?: 'Report';
  balance: Scalars['Float']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
};

export type ReportTransaction = {
  __typename?: 'ReportTransaction';
  amount: Scalars['Float']['output'];
  concept: Scalars['String']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  concept: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
};

export type ReportFieldsFragment = { __typename?: 'Report', balance: number, totalExpenses: number, totalIncome: number };

export type ReportConceptFieldsFragment = { __typename?: 'ReportTransaction', amount: number, concept: string };

export type TransactionFieldsFragment = { __typename?: 'Transaction', id: string, date: string, concept: string, amount: number, user: { __typename?: 'User', id: string, name?: string | null, email: string, role: Role } };

export type UserFieldsFragment = { __typename?: 'User', id: string, name?: string | null, email: string, role: Role };

export type CreateTransactionMutationVariables = Exact<{
  concept: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction?: { __typename?: 'Transaction', id: string, date: string, concept: string, amount: number, user: { __typename?: 'User', id: string, name?: string | null, email: string, role: Role } } | null };

export type GetReportsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReportsQuery = { __typename?: 'Query', getReports: { __typename?: 'Report', balance: number, totalExpenses: number, totalIncome: number } };

export type GetReportsConcetpQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReportsConcetpQuery = { __typename?: 'Query', getReportTransactions: Array<{ __typename?: 'ReportTransaction', amount: number, concept: string }> };

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', id: string, date: string, concept: string, amount: number, user: { __typename?: 'User', id: string, name?: string | null, email: string, role: Role } } | null> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, role: Role } | null> };

export const ReportFieldsFragmentDoc = gql`
    fragment ReportFields on Report {
  balance
  totalExpenses
  totalIncome
}
    `;
export const ReportConceptFieldsFragmentDoc = gql`
    fragment ReportConceptFields on ReportTransaction {
  amount
  concept
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
  email
  role
}
    `;
export const TransactionFieldsFragmentDoc = gql`
    fragment TransactionFields on Transaction {
  id
  date
  concept
  amount
  user {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($concept: String!, $amount: Float!, $date: String!) {
  createTransaction(concept: $concept, amount: $amount, date: $date) {
    ...TransactionFields
  }
}
    ${TransactionFieldsFragmentDoc}`;
export type CreateTransactionMutationFn = Apollo.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      concept: // value for 'concept'
 *      amount: // value for 'amount'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, options);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const GetReportsDocument = gql`
    query GetReports {
  getReports {
    ...ReportFields
  }
}
    ${ReportFieldsFragmentDoc}`;

/**
 * __useGetReportsQuery__
 *
 * To run a query within a React component, call `useGetReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReportsQuery(baseOptions?: Apollo.QueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, options);
      }
export function useGetReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, options);
        }
export function useGetReportsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, options);
        }
export type GetReportsQueryHookResult = ReturnType<typeof useGetReportsQuery>;
export type GetReportsLazyQueryHookResult = ReturnType<typeof useGetReportsLazyQuery>;
export type GetReportsSuspenseQueryHookResult = ReturnType<typeof useGetReportsSuspenseQuery>;
export type GetReportsQueryResult = Apollo.QueryResult<GetReportsQuery, GetReportsQueryVariables>;
export const GetReportsConcetpDocument = gql`
    query GetReportsConcetp {
  getReportTransactions {
    ...ReportConceptFields
  }
}
    ${ReportConceptFieldsFragmentDoc}`;

/**
 * __useGetReportsConcetpQuery__
 *
 * To run a query within a React component, call `useGetReportsConcetpQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportsConcetpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportsConcetpQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReportsConcetpQuery(baseOptions?: Apollo.QueryHookOptions<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>(GetReportsConcetpDocument, options);
      }
export function useGetReportsConcetpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>(GetReportsConcetpDocument, options);
        }
export function useGetReportsConcetpSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>(GetReportsConcetpDocument, options);
        }
export type GetReportsConcetpQueryHookResult = ReturnType<typeof useGetReportsConcetpQuery>;
export type GetReportsConcetpLazyQueryHookResult = ReturnType<typeof useGetReportsConcetpLazyQuery>;
export type GetReportsConcetpSuspenseQueryHookResult = ReturnType<typeof useGetReportsConcetpSuspenseQuery>;
export type GetReportsConcetpQueryResult = Apollo.QueryResult<GetReportsConcetpQuery, GetReportsConcetpQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions {
  getTransactions {
    ...TransactionFields
  }
}
    ${TransactionFieldsFragmentDoc}`;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export function useGetTransactionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetTransactionsSuspenseQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;