'use client';
import React from 'react';
import { gqlClient } from '@/libs/shared/api/client/interceptor';
import {
  useGetTransactionsQuery,
  Transaction,
} from '@/libs/shared/api/requests/react-query';
import { useUsersParams } from './types';

export const useTransactions = (params?: useUsersParams) => {
  const { data, refetch } = useGetTransactionsQuery(
    gqlClient,
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  const refetchTransactions = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    transactions: data?.getTransactions as Transaction[],
    refetch: refetchTransactions,
  };
};
