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
import { IconSettings, IconX } from '@tabler/icons';

import { useAtom } from 'jotai';
import { Record } from 'types/Program';
import { blockAtom, dayAtom, getPath, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

import LiftMenu from './LiftMenu';

interface LiftSectionProps {
  ei: number;
  li?: number;
}
const useStyles = createStyles((theme) => ({
  liftContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[7],
    borderRadius: theme.radius.md,
  },
}));
export default function LiftSection({ ei, li }: LiftSectionProps) {
  const { classes } = useStyles();
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const path = getPath();

  // might have to test undefined
  const lift = li
    ? form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei].lifts[li]
    : form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei];

  function deleteLift() {
    li === undefined
      ? form.removeListItem(`${path}`, ei)
      : form.removeListItem(`${path}.${ei}.lifts`, li);
  }

  function insertRecord() {
    li === undefined
      ? form.insertListItem(`${path}.${ei}.records`, {
          sets: 5,
          reps: 5,
          rpe: 5,
          percent: undefined,
          distance: undefined,
          load: undefined,
        })
      : form.insertListItem(`${path}.${ei}.lifts.${li}.records`, {
          sets: 5,
          reps: 5,
          rpe: 5,
          percent: undefined,
          distance: undefined,
          load: undefined,
        });
  }

  function deleteRecord(i: number) {
    li === undefined
      ? form.removeListItem(`${path}.${ei}.records`, i)
      : form.removeListItem(`${path}.${ei}.lifts.${li}.records`, i);
  }

  return (
    <Stack className={classes.liftContainer}>
      <Group position="apart">
        <Text transform="uppercase" weight="bold" size="lg">
          {lift.name}
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
          {lift.records.map((rec: Record, ri: number) => (
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
