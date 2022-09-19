import { Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import DayHeader from './DayHeader';
import DnDContext from './DnDContext';

export default function DaySection() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const day = form.values.blocks[blockTab].weeks[weekTab].days[dayTab];
  return (
    <Stack>
      <DayHeader />
      <Stack>{day.exercises?.length ? <DnDContext /> : <div>no exercises</div>}</Stack>
    </Stack>
  );
}
