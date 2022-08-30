import { createStyles, Group, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { Cluster, Lift, ProgramSchema } from 'types/Program';
import LiftSection from './LiftSection';
import ClusterMenu from './Menus/ClusterMenu';

interface ExerciseSectionProps {
  form: UseFormReturnType<ProgramSchema>;
  ex: Cluster;
  ei: number;
  bi: number;
  wi: number;
  di: number;
}

const useStyles = createStyles((theme) => ({
  clusterContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
  },
}));

export default function ClusterSection({ form, ex, ei, bi, wi, di }: ExerciseSectionProps) {
  const { classes } = useStyles();

  function addLift() {
    form.insertListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts`, {
      name: '',
      weight: {
        load: 135,
      },
      records: [],
    });
  }
  function deleteCluster() {
    form.removeListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises`, ei);
  }

  return (
    <Stack className={classes.clusterContainer}>
      <Group position="apart">
        <TextInput
          radius="md"
          size="md"
          placeholder="Cluster"
          rightSectionWidth={42}
          required
          withAsterisk
          {...form.getInputProps(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.name`)}
        />

        <ClusterMenu addLift={addLift} deleteCluster={deleteCluster} />
      </Group>
      <Stack>
        {ex.lifts.length ? (
          <>
            {ex.lifts.map((lift: Lift, li: number) => (
              <LiftSection
                form={form}
                lift={lift}
                ei={ei}
                bi={bi}
                wi={wi}
                di={di}
                li={li}
                path={`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}`}
              />
            ))}
          </>
        ) : null}
      </Stack>
    </Stack>
  );
}
