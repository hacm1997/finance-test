'use client';
import { HomeComponent } from '@/libs/domain/components/dashboard/home';
import { MainLayout } from '@/libs/domain/components/layout';

export default async function Home() {
  return (
    <MainLayout>
      <HomeComponent />
    </MainLayout>
  );
}
