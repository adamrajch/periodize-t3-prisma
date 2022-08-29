import DashboardShell from '@/components/Dashboard';
import LiftManager from '@/components/LiftManager';
import { Container } from '@mantine/core';
import NextError from 'next/error';
import { useEffect } from 'react';
import { trpc } from 'src/utils/trpc';

export default function LiftManagerPage() {
  const { data, status, error } = trpc.useQuery(['exercise.getExercises']);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }

  const utils = trpc.useContext();
  // const deleteMutation = trpc.useMutation(['program.deleteProgram'], {
  //   onSuccess({ id }) {
  //     utils.invalidateQueries(['program.getUserPrograms']);
  //     // utils.invalidateQueries(['program.getById', id]);
  //   },
  // });
  return (
    <DashboardShell>
      <Container>
        <LiftManager data={data} />
      </Container>
    </DashboardShell>
  );
}
