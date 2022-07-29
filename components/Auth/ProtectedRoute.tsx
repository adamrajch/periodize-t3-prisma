import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      // redirect to login page once completed
      router.push('/');
    }
  }, [router, status]);

  if (status === 'unauthenticated') return null;
  return <div>{children}</div>;
}
