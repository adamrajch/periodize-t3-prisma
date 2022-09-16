import { Button, createStyles, Group, Paper, Stack, Text } from '@mantine/core';
import { Cluster, Lift, Record } from 'types/Program';

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface SummarySectionProps {
  workoutName: string;
  wdb: string;
  exercises: (Lift | Cluster)[];
}

export default function CurrentWorkoutSection({
  workoutName,
  wdb,
  exercises,
}: SummarySectionProps) {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Group position="apart">
        <Text align="center" weight={700} className={classes.title} size="xl">
          {workoutName}
        </Text>
        <Text size="xs">{wdb}</Text>
      </Group>
      <Stack spacing={0} mt="md">
        {exercises.map((e, i) => (
          <Stack mt="xs">
            {Object.hasOwn(e, 'lifts') ? (
              <Group>{e.name}</Group>
            ) : (
              <Stack>
                {e.records.map((r: Record) => (
                  <Group>
                    <Text>{e.name}</Text>
                    <Text>{`${r.sets} x ${r.reps}`}</Text>
                    {r.weight ? <Text>{`${r.weight?.load}${r.weight.unit}`}</Text> : null}
                    {r.rpe ? <Text>{`@${r.rpe}RPE`}</Text> : null}
                    {r.percentage ? <Text>{`${r.percentage}%`}</Text> : null}
                    {r.distance ? <Text>{`${r.distance.length}%`}</Text> : null}
                    {r.time ? <Text>{`${r.time}%`}</Text> : null}
                  </Group>
                ))}
              </Stack>
            )}
          </Stack>
        ))}
        <Group position="center">
          <Button mt="sm">Log Workout</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
