'use client';
import { useEffect, useState } from 'react';
import { useMeParams, UserMeType } from './types';
import { useRouter } from 'next/navigation';

export const useMe = (params?: useMeParams) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  return { user: session ? (session as UserMeType) : null, loading };
};
