import {
  ActionIcon,
  Box,
  createStyles,
  Group,
  Menu,
  NativeSelect,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconSettings, IconX } from '@tabler/icons';

import { Lift, ProgramSchema } from 'types/Program';
import LiftMenu from './Exercise/LiftMenu';

interface LiftSectionProps {
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
export default function LiftSection({ form, lift, ei, bi, wi, di, li, path }: LiftSectionProps) {
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
          percent: undefined,
          distance: undefined,
          load: undefined,
        })
      : form.insertListItem(
          `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}.records`,
          {
            sets: 5,
            reps: 5,
            rpe: 5,
            percent: undefined,
            distance: undefined,
            load: undefined,
          }
        );
  }

  function deleteRecord(i: number) {
    li === undefined
      ? form.removeListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.records`, i)
      : form.removeListItem(
          `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}.records`,
          i
        );
  }

  return (
    <Stack className={classes.liftContainer}>
      <Group position="apart">
        <Text transform="uppercase" weight="bold" size="lg">
          {li !== undefined
            ? form.values.blocks[bi].weeks[wi].days[di].exercises[ei].lifts[li].name
            : form.values.blocks[bi].weeks[wi].days[di].exercises[ei].name}
        </Text>

        <LiftMenu deleteLift={deleteLift} insertRecord={insertRecord} lift={lift} li={li} />
      </Group>
      {lift.records?.length ? (
        <Stack>
          <Group noWrap sx={{ textAlign: 'center' }}>
            <Text sx={{ flex: 2 }}>Sets</Text>
            <Text sx={{ flex: 2 }}>Reps</Text>
            <Text sx={{ flex: 2 }}>RPE</Text>
            <Text sx={{ flex: 2 }}>%1RM</Text>
            {lift.load ? <Text sx={{ flex: 2 }}>Load</Text> : null}
            {lift.time ? <Text sx={{ flex: 2 }}>time</Text> : null}
            {lift.distance ? <Text sx={{ flex: 2 }}>distance</Text> : null}
            <Box sx={{ flex: 0 }}>
              <Menu shadow="md" width={120} withArrow>
                <Menu.Target>
                  <ActionIcon>
                    <IconSettings />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Toggle RPE</Menu.Item>
                  <Menu.Item>Messages</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Group>
          {lift.records.map((rec, ri) => (
            <Group noWrap key={ri}>
              <NumberInput
                placeholder="5"
                max={1000}
                min={0}
                {...form.getInputProps(`${path}.records.${ri}.sets`)}
              />
              <NumberInput
                placeholder="5"
                max={1000}
                min={0}
                {...form.getInputProps(`${path}.records.${ri}.reps`)}
              />
              <NumberInput
                placeholder="5"
                max={10}
                min={1}
                {...form.getInputProps(`${path}.records.${ri}.rpe`)}
              />
              <NumberInput
                placeholder="5"
                max={100}
                min={1}
                step={10}
                {...form.getInputProps(`${path}.records.${ri}.percent`)}
              />
              {lift.load ? (
                <NumberInput
                  sx={{ flexShrink: 2 }}
                  placeholder="5"
                  max={100}
                  min={0}
                  {...form.getInputProps(`${path}.records.${ri}.load`)}
                  rightSectionWidth={62}
                  rightSection={
                    <NativeSelect
                      data={[
                        { value: 'lbs', label: 'lbs' },
                        { value: 'kgs', label: 'kgs' },
                      ]}
                      onChange={(event) =>
                        form.setFieldValue(
                          `${path}.records.${ri}.loadUnit`,
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
              <ActionIcon onClick={() => deleteRecord(ri)} sx={{ flexShrink: 2 }}>
                <IconX />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      ) : (
        <> </>
      )}
    </Stack>
  );
}
