import { Group, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import DayMenu from './DayMenu';
import ExerciseSearch from './ExerciseSearch';

export default function DayHeader() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  return (
    <Group position="apart" noWrap>
      <TextInput
        withAsterisk
        required
        placeholder={`Day ${dayTab + 1}`}
        variant="unstyled"
        sx={{ borderBottom: '1px solid white' }}
        {...form.getInputProps(`blocks.${blockTab}.weeks.${weekTab}.days.${dayTab}.name`)}
      />

      <Group noWrap spacing="xs">
        <ExerciseSearch />
        <DayMenu />
      </Group>
    </Group>
  );
}
