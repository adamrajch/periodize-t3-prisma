import { createStyles, Group, SegmentedControl, Tabs, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: 'pink', to: 'orange' }),
  },

  control: {
    border: '0 !important',
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));
export default function DayController() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const week = form.values.blocks[blockTab].weeks[weekTab];

  const { classes } = useStyles();

  const options = week.days.map((day, di: number) => (
    <Tabs.Tab value={`${di}`} onClick={() => setDay(di)} sx={{ padding: '16px 20px' }} key={di}>
      {di + 1}
    </Tabs.Tab>
  ));

  const data = week.days.map((day, di: number) => ({
    label: (di + 1).toString(),
    value: di.toString(),
  }));
  return (
    <Group position="center">
      <Text size="lg" weight="bold">
        DAY
      </Text>

      <SegmentedControl
        value={dayTab.toString()}
        radius="xl"
        size="md"
        data={data}
        onChange={(val) => setDay(parseInt(val))}
        classNames={classes}
      />
    </Group>
  );
}
