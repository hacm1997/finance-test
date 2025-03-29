'use client';
import { Transaction } from '@/libs/domain/components/dashboard/home';
import { MainLayout } from '@/libs/domain/components/layout';

export default function Home() {
  return (
    <MainLayout>
      <Transaction />
    </MainLayout>
  );
}
