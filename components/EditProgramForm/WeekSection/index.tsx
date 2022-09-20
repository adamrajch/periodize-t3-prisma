import { Group, Stack, Tabs, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import DaySection from '../DaySection';
import { useProgramFormContext } from '../FormContext';
import DayController from './DayController';
import WeekHeader from './WeekHeader';

export default function WeekSection() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const week = form.values.blocks[blockTab].weeks[weekTab];
  return (
    <Stack>
      <WeekHeader />
      {week.days.length ? (
        <Tabs value={`${dayTab}`} keepMounted={false} variant="pills">
          <Stack>
            <DayController />
            {week.days.map((day, di) => (
              <Tabs.Panel value={`${di}`} key={di}>
                <DaySection />
              </Tabs.Panel>
            ))}
          </Stack>
        </Tabs>
      ) : (
        <Group position="center" mt="xl">
          <Text size="xl">NO DAYS</Text>
        </Group>
      )}
    </Stack>
  );
}
