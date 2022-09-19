import { Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import DayHeader from './DayHeader';

export default function DaySection() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const week = form.values.blocks[blockTab].weeks[weekTab];
  return (
    <Stack>
      <DayHeader />
    </Stack>
  );
}
