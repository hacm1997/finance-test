'use client';
import React from 'react';
import { gqlClient } from '@/libs/shared/api/client/interceptor';
import {
  useGetReportsQuery,
  Report,
} from '@/libs/shared/api/requests/react-query';
import { useReportsParams } from './types';

export const useReports = (params?: useReportsParams) => {
  const { data, refetch } = useGetReportsQuery(
    gqlClient,
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  const refetchReport = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    report: data?.getReports as Report,
    refetch: refetchReport,
  };
};
