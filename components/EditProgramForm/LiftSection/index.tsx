import { ActionIcon, createStyles, Group, SimpleGrid, Stack, Text } from '@mantine/core';

import { useAtom } from 'jotai';
import { Record } from 'types/Program';
import { blockAtom, dayAtom, getPath, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import RecordSection from '../RecordSection';

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
  const liftPath = li === undefined ? `${path}.${ei}` : `${path}.${ei}.lifts.${li}`;
  const recordsPath = `${liftPath}.records`;
  // might have to test undefined
  const lift =
    li === undefined
      ? form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei]
      : form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei].lifts[li];

  function deleteLift() {
    li === undefined
      ? form.removeListItem(`${path}`, ei)
      : form.removeListItem(`${path}.${ei}.lifts`, li);
  }

  function insertRecord() {
    form.insertListItem(`${liftPath}.records`, {
      sets: 5,
      reps: 5,
      rpe: 5,
      percent: undefined,
      distance: undefined,
      load: undefined,
    });
  }

  function deleteRecord(i: number) {
    form.removeListItem(`${liftPath}.records`, i);
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
          <Group>
            <SimpleGrid cols={4} sx={{ textAlign: 'center', flex: 1 }}>
              <Text>Sets</Text>
              <Text>Reps</Text>
              <Text>RPE</Text>
              <Text>%1RM</Text>

              {/* {lift.time ? <Text>time</Text> : null}
            {lift.distance ? <Text>distance</Text> : null} */}
            </SimpleGrid>
            <ActionIcon />
          </Group>
          {lift.records.map((rec: Record, ri: number) => (
            <RecordSection ri={ri} liftPath={liftPath} lift={lift} deleteRecord={deleteRecord} />
          ))}
        </Stack>
      ) : (
        <> </>
      )}
    </Stack>
  );
}
