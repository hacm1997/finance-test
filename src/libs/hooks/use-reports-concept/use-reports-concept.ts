'use client';
import React from 'react';
import { gqlClient } from '@/libs/shared/api/client/interceptor';
import {
  ReportTransaction,
  useGetReportsConcetpQuery,
} from '@/libs/shared/api/requests/react-query';
import { useReportsConcepParams } from './types';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export const useReportConcept = (params?: useReportsConcepParams) => {
  const { data, refetch } = useGetReportsConcetpQuery(
    gqlClient,
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  const refetchReportConcept = React.useCallback(() => {
    refetch();
  }, [refetch]);

  const exportToCSV = () => {
    if (!data?.getReportTransactions) return;

    const csv = Papa.unparse(data.getReportTransactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'report_transactions.csv');
  };

  return {
    reportConcept: data?.getReportTransactions as ReportTransaction[],
    refetch: refetchReportConcept,
    exportToCSV,
  };
};
