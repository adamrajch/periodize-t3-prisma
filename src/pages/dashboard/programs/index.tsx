import DashboardShell from '@/components/Dashboard';
import SubscribedPrograms from '@/components/DashboardPrograms/SubscribedPrograms';
import UserPrograms from '@/components/DashboardPrograms/UserPrograms';
import { Container, Stack } from '@mantine/core';

export default function ProgramsHome() {
  return (
    <DashboardShell>
      <Container>
        <Stack>
          <UserPrograms />

          <SubscribedPrograms />
        </Stack>
      </Container>
    </DashboardShell>
  );
}
