'use client';
import { useUsers } from '@/libs/hooks/use-users';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function HomeComponent() {
  const { users } = useUsers();

  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
