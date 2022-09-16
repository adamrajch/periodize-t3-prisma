import DashboardShell from '@/components/Dashboard';
import SubscribedPrograms from '@/components/DashboardPrograms/SubscribedPrograms';
import { Container, Stack, Title } from '@mantine/core';

export default function ProgramsHome() {
  return (
    <DashboardShell>
      <Container>
        <Stack>
          <Title>Subscribed Programs</Title>
          <SubscribedPrograms />
        </Stack>
      </Container>
    </DashboardShell>
  );
}
