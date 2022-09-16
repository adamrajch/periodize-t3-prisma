import CurrentWorkoutSection from '@/components/ActiveProgramPage/CurrentWorkoutSection';
import SummarySection from '@/components/ActiveProgramPage/SummarySection';
import DashboardShell from '@/components/Dashboard';
import { Code, Container, Grid } from '@mantine/core';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { trpc } from 'src/utils/trpc';

export default function ActiveProgramPage() {
  const id = useRouter().query.id as string;
  const { data, status, error } = trpc.useQuery(['activeProgram.getById', { id }]);

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }

  if (!data) {
    return null;
  }

  // fix typing
  const currWorkout = data.currentWorkout as any;

  return (
    <DashboardShell>
      <Container size="xl">
        <Grid>
          <Grid.Col xs={4}>
            <SummarySection
              title={data.title}
              subtitle={`${data.currentDayIndex + 1} / ${data.numberOfDays}`}
              percent={parseInt(((data.currentDayIndex / data.numberOfDays) * 100).toFixed(2))}
              wdb={`B${currWorkout.block + 1}W${currWorkout.week + 1}D${currWorkout.day + 1}`}
              workoutName={currWorkout.dayName}
            />
          </Grid.Col>
          <Grid.Col xs={8}>
            <CurrentWorkoutSection
              workoutName={currWorkout.dayName}
              wdb={`B${currWorkout.block + 1}W${currWorkout.week + 1}D${currWorkout.day + 1}`}
              exercises={currWorkout.exercises}
            />
          </Grid.Col>
          <Grid.Col xs={4}>
            <CurrentWorkoutSection
              workoutName={currWorkout.dayName}
              wdb={`B${currWorkout.block + 1}W${currWorkout.week + 1}D${currWorkout.day + 1}`}
              exercises={currWorkout.exercises}
            />
          </Grid.Col>
          <Grid.Col xs={8}>
            <Code>{Array.isArray(data.schema) ? JSON.stringify(data.schema, null, 4) : ''}</Code>
          </Grid.Col>
        </Grid>
      </Container>
    </DashboardShell>
  );
}
