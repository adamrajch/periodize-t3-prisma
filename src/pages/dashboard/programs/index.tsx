import DashboardShell from '@/components/Dashboard';
import SubscribedPrograms from '@/components/DashboardPrograms/SubscribedPrograms';
import UserPrograms from '@/components/DashboardPrograms/UserPrograms';
import { Container, Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function ProgramsHome() {
  return (
    <DashboardShell>
      <Container>
        <Stack>
          <Title>My Programs</Title>
          <UserPrograms />
          <Link href="/dashboard/active-programs">
            <Title>Subscribed Programs</Title>
          </Link>

          <SubscribedPrograms />
        </Stack>
      </Container>
    </DashboardShell>
  );
}
