import { Group, Tabs, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

export default function DayController() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const week = form.values.blocks[blockTab].weeks[weekTab];
  return (
    <Group
      position="center"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[6],
      })}
    >
      <Text size="lg" weight="bold">
        DAY
      </Text>
      <Tabs.List position="center">
        {week.days.map((day, di: number) => (
          <Tabs.Tab
            value={`${di}`}
            onClick={() => setDay(di)}
            sx={{ padding: '16px 20px' }}
            key={di}
          >
            {di + 1}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Group>
  );
}
