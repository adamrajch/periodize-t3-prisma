import DashboardShell from '@/components/Dashboard';
import LiftManager from '@/components/LiftManager';
import { Container } from '@mantine/core';

export default function LiftManagerPage() {
  return (
    <DashboardShell>
      <Container>
        <LiftManager />
      </Container>
    </DashboardShell>
  );
}
