'use client';
import React from 'react';
import { gqlClient } from '@/libs/shared/api/client/interceptor';
import { useGetUsersQuery, User } from '@/libs/shared/api/requests/react-query';
import { useUsersParams } from './types';

export const useUsers = (params?: useUsersParams) => {
  const { data, refetch } = useGetUsersQuery(
    gqlClient,
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  const refetchUsers = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    users: data?.getUsers as User[],
    refetch: refetchUsers,
  };
};
