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
          <div>
            <Link href="/dashboard/active-programs">
              <Title sx={{ cursor: 'pointer', display: 'inline' }}>My Programs</Title>
            </Link>
          </div>

          <UserPrograms />
          <div>
            <Link href="/dashboard/active-programs">
              <Title sx={{ cursor: 'pointer' }}>Subscribed Programs</Title>
            </Link>
          </div>

          <SubscribedPrograms />
        </Stack>
      </Container>
    </DashboardShell>
  );
}
