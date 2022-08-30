import { createStyles, Group, NativeSelect, NumberInput, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { Lift, ProgramSchema } from 'types/Program';
import LiftMenu from './Exercise/LiftMenu';
import ExerciseSelect from './ExerciseSelect';

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
          sets: 5,
          reps: 5,
          rpe: 5,
          percentage: null,
          distance: lift.distance ? 5 : null,
          weight: lift.load ? { unit: 'lbs', load: 135 } : null,
        })
      : form.insertListItem(
          `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}.records`,
          {
            sets: 5,
            reps: 5,
            rpe: 5,
            percentage: null,
            distance: lift.distance ? 5 : null,
            weight: lift.load ? { unit: 'lbs', load: 135 } : null,
          }
        );
  }

  return (
    <Stack className={classes.liftContainer}>
      <Group position="apart">
        <ExerciseSelect form={form} bi={bi} wi={wi} di={di} ei={ei} li={li} />
        <LiftMenu deleteLift={deleteLift} insertRecord={insertRecord} lift={lift} li={li} />
      </Group>
      {lift.records?.length ? (
        <Stack>
          <Group grow sx={{ textAlign: 'center' }}>
            <Text>Sets</Text>
            <Text>Reps</Text>
            <Text>RPE</Text>
            <Text>%1RM</Text>
            {lift.load ? <Text>Load</Text> : null}
            {lift.time ? <Text>time</Text> : null}
            {lift.distance ? <Text>distance</Text> : null}
          </Group>
          {lift.records.map((rec, ri) => (
            <Group grow noWrap>
              <NumberInput
                placeholder="5"
                max={100}
                min={0}
                {...form.getInputProps(`${path}.records.${ri}.sets`)}
              />
              <NumberInput
                placeholder="5"
                max={100}
                min={0}
                {...form.getInputProps(`${path}.records.${ri}.reps`)}
              />
              <NumberInput
                placeholder="5"
                max={100}
                min={0}
                {...form.getInputProps(`${path}.records.${ri}.rpe`)}
              />
              <NumberInput
                placeholder="5"
                max={100}
                min={0}
                {...form.getInputProps(`${path}.records.${ri}.percent`)}
              />
              {lift.load ? (
                <NumberInput
                  placeholder="5"
                  max={100}
                  min={0}
                  {...form.getInputProps(`${path}.records.${ri}.weight.load`)}
                  rightSectionWidth={62}
                  rightSection={
                    <NativeSelect
                      data={[
                        { value: 'lbs', label: 'lbs' },
                        { value: 'kgs', label: 'kgs' },
                      ]}
                      onChange={(event) =>
                        form.setFieldValue(
                          `${path}.records.${ri}.weight.unit`,
                          event.currentTarget.value
                        )
                      }
                      styles={{
                        input: {
                          fontWeight: 500,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        },
                      }}
                    />
                  }
                />
              ) : null}
              {lift.time ? (
                <NumberInput
                  placeholder="5"
                  max={100}
                  min={0}
                  {...form.getInputProps(`${path}.records.${ri}.time`)}
                />
              ) : null}
              {lift.distance ? (
                <NumberInput
                  placeholder="5"
                  max={100}
                  min={0}
                  {...form.getInputProps(`${path}.records.${ri}.distance`)}
                  rightSectionWidth={62}
                  rightSection={
                    <NativeSelect
                      data={[
                        { value: 'meter', label: 'm' },
                        { value: 'foot', label: 'foot' },
                        { value: 'yard', label: 'yard' },
                      ]}
                      styles={{
                        input: {
                          fontWeight: 500,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        },
                      }}
                    />
                  }
                />
              ) : null}
            </Group>
          ))}
        </Stack>
      ) : (
        <> </>
      )}
    </Stack>
  );
}
