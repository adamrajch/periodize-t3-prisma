import LoginForm from '@/components/Auth/LoginForm';
import { Center } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      // redirect to login page once completed
      router.push('/dashboard');
    }
  }, [router, status]);

  if (status === 'authenticated') return null;
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <LoginForm />
    </Center>
  );
}
