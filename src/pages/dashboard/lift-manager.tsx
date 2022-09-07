import DashboardShell from '@/components/Dashboard';
import LiftManager from '@/components/LiftManager';
import { Container } from '@mantine/core';
import NextError from 'next/error';
import { trpc } from 'src/utils/trpc';

export default function LiftManagerPage() {
  const { data, status, error } = trpc.useQuery(['exercise.getExercises']);

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }

  return (
    <DashboardShell>
      <Container>
        <LiftManager data={data} />
      </Container>
    </DashboardShell>
  );
}
