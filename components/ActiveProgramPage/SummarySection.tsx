import { Badge, createStyles, Group, Paper, Progress, Text } from '@mantine/core';

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
  title: string;
  subtitle: string;
  percent: number;
  wdb: string;
  workoutName?: string;
}

export default function SummarySection({
  title,
  subtitle,
  percent,
  wdb,
  workoutName,
}: SummarySectionProps) {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} className={classes.title} size="xl">
        {title}
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Day {subtitle}
      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Progress
        </Text>
        <Text size="sm" color="dimmed">
          {`${percent}%`}
        </Text>
      </Group>

      <Progress value={percent} mt={5} />

      <Group position="apart" mt="md">
        <Text size="sm">{wdb}</Text>
        <Badge size="sm">{workoutName}</Badge>
      </Group>
    </Paper>
  );
}
