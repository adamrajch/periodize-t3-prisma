import { createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Cluster, Lift, ProgramSchema } from 'types/Program';
import ClusterSection from '../ClusterSection';
import LiftSection from '../LiftSection';

interface ExerciseSectionProps {
  form: UseFormReturnType<ProgramSchema>;
  ex: Lift | Cluster;
  ei: number;
  bi: number;
  wi: number;
  di: number;
}

const useStyles = createStyles((theme) => ({
  liftContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[7],
    borderRadius: theme.radius.md,
  },

  clusterContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
  },
}));
export default function ExerciseSection({ form, ex, ei, bi, wi, di }: ExerciseSectionProps) {
  const { classes } = useStyles();
  if (!('type' in ex)) {
    return (
      <LiftSection
        form={form}
        lift={ex}
        ei={ei}
        bi={bi}
        wi={wi}
        di={di}
        path={`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}`}
      />
    );
  }
  return <ClusterSection form={form} ex={ex} ei={ei} bi={bi} wi={wi} di={di} />;
}
