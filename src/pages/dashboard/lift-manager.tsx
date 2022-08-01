import React from 'react';
import DashboardShell from '@/components/Layout/Shells/DashboardShell';
import LiftManager from '@/components/LiftManager';

export default function LiftManagerPage() {
  return (
    <DashboardShell>
      <LiftManager />
    </DashboardShell>
  );
}
