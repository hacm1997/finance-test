'use client';
import { Reports } from '@/libs/domain/components/dashboard/reports';
import { MainLayout } from '@/libs/domain/components/layout';

export default async function Home() {
  return (
    <MainLayout>
      <Reports />
    </MainLayout>
  );
}
