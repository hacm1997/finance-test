'use client';
import { Reports } from '@/libs/domain/components/dashboard/reports';
import { MainLayout } from '@/libs/domain/components/layout';
import { useMe } from '@/libs/hooks/use-me';
import { ROLES } from '@/libs/utils/constant';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function Home() {
  const { user } = useMe();
  const router = useRouter();

  React.useEffect(() => {
    if (user && user.user.role !== ROLES.ADMIN) {
      router.push('/dashboard');
      toast.error('No tiene permisos para acceder a esta sección')
      return;
    }
  }, [router, user])
  return (
    <MainLayout>
      <Reports user_role={user?.user.role} />
    </MainLayout>
  );
}
