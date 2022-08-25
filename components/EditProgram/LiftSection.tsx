import { createStyles, Group, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconSearch } from '@tabler/icons';

import { Lift, ProgramSchema } from 'types/Program';
import LiftMenu from './Exercise/LiftMenu';

interface ExerciseSectionProps {
  form: UseFormReturnType<ProgramSchema>;
  lift: Lift;
  ei: number;
  bi: number;
  wi: number;
  di: number;
  li?: number;
  path: string;
}
const useStyles = createStyles((theme) => ({
  liftContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[7],
    borderRadius: theme.radius.md,
  },
}));
export default function LiftSection({
  form,
  lift,
  ei,
  bi,
  wi,
  di,
  li,
  path,
}: ExerciseSectionProps) {
  const { classes } = useStyles();

  function deleteLift() {
    li === undefined
      ? form.removeListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises`, ei)
      : form.removeListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts`, li);
  }

  function insertRecord() {
    li === undefined
      ? form.insertListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.records`, {
          sets: 0,
          reps: 0,
          rpe: 5,
        })
      : form.insertListItem(
          `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}.records`,
          {
            sets: 0,
            reps: 0,
            rpe: 5,
          }
        );
  }

  return (
    <Stack className={classes.liftContainer}>
      <Group position="apart">
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          radius="xl"
          size="md"
          placeholder="Search Lift"
          rightSectionWidth={42}
          {...form.getInputProps(`${path}.name`)}
        />
        <LiftMenu deleteLift={deleteLift} insertRecord={insertRecord} />
      </Group>
      {lift.records.length ? (
        <Stack>
          <Group>
            <Text>Sets</Text>
            <Text>Reps</Text>
            <Text>RPE/%</Text>
            <Text>Time</Text>
            <Text>Dist.</Text>
          </Group>
          {lift.records.map((rec, ri) => (
            <Group>{/* <RecordNumberInput increment={} decrement={} path={} /> */}</Group>
          ))}
        </Stack>
      ) : (
        <>no records</>
      )}
    </Stack>
  );
}
