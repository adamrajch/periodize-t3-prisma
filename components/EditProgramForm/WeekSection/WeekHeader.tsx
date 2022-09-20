import { Button, Group, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import WeekMenu from './WeekMenu';

export default function WeekHeader() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const week = form.values.blocks[blockTab].weeks[weekTab];
  return (
    <Group position="apart" grow noWrap>
      <Group noWrap>
        <TextInput
          required
          withAsterisk
          placeholder={`Week ${weekTab + 1}`}
          variant="unstyled"
          size="lg"
          sx={{ borderBottom: '1px solid white' }}
          {...form.getInputProps(`blocks.${blockTab}.weeks.${weekTab}.name`)}
        />
      </Group>
      <Group position="right" spacing="xs">
        <Button
          leftIcon={<IconPlus />}
          disabled={week.days.length >= 7}
          onClick={() => {
            form.insertListItem(`blocks.${blockTab}.weeks.${weekTab}.days`, {
              name: `Day ${week.days.length + 1}`,
              summary: '',
              exercises: [],
            });
            setDay(week.days.length);
          }}
        >
          Day
        </Button>
        <WeekMenu />
      </Group>
    </Group>
  );
}
