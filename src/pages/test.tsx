import React from 'react';
import AppShellDemo from '@/components/Layout/Shells/DashboardShell';
import LiftManager from '@/components/LiftManager';
import { useSession } from 'next-auth/react';

export default function Test() {
  const { data } = useSession();
  console.log(data);
  return (
    <AppShellDemo>
      <LiftManager />
    </AppShellDemo>
  );
}
