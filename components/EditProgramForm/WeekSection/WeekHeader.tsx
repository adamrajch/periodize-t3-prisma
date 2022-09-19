import { Button, Group, Text, TextInput } from '@mantine/core';
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
    <Group position="apart" grow>
      <Group align="flex-start">
        <Text size="lg" color="grape">
          {weekTab + 1 > 9 ? weekTab : `0${weekTab + 1}`}
        </Text>
        <Text size="lg">Week {weekTab + 1}</Text>
        <TextInput
          required
          withAsterisk
          label="Week Name"
          placeholder={`Week ${weekTab + 1}`}
          variant="unstyled"
          size="lg"
          sx={{ borderBottom: '1px solid white' }}
          {...form.getInputProps(`blocks.${blockTab}.weeks.${weekTab}.name`)}
        />
      </Group>
      <Group position="right">
        <Button
          leftIcon={<IconPlus />}
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
