import { blockAtom, dayAtom, weekAtom } from '@/components/EditProgramForm/ControlAtoms';
import { useProgramFormContext } from '@/components/EditProgramForm/FormContext';
import { useAtom } from 'jotai';
import { Lift } from 'types/Program';
import ClusterSection from '../ClusterSection';

import LiftSection from '../LiftSection';

interface ExerciseSectionProps {
  ei: number;
}

export default function ExerciseSection({ ei }: ExerciseSectionProps) {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const isSingle =
    form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei].type === 'single';
  if (isSingle) {
    return (
      <LiftSection
        ei={ei}
        lift={form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei] as Lift}
      />
    );
  }
  return <ClusterSection ei={ei} />;
}
