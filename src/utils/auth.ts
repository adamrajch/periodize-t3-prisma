import { signIn, signOut } from 'next-auth/react';

export const handleSignIn = async (provider: string) => {
  await signIn(provider, {
    callbackUrl: 'http://localhost:3000/dashboard',
  });
};

export const handleLogout = async () => {
  await signOut({
    callbackUrl: 'http://localhost:3000/',
  });
};
