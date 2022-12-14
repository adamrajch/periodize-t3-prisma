import LoginForm from '@/components/Auth/LoginForm';
import { Center } from '@mantine/core';
import React from 'react';

export default function LoginAuthPage() {
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <LoginForm />
    </Center>
  );
}
