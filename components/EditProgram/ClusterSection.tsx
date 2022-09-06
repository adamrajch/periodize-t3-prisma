import { createStyles, Group, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Cluster, Lift, ProgramSchema } from 'types/Program';
import LiftSection from './LiftSection';
import ClusterMenu from './Menus/ClusterMenu';

interface ExerciseSectionProps {
  form: UseFormReturnType<ProgramSchema>;
  ex: Cluster;
  ei: number;
  bi: number;
  wi: number;
  di: number;
}

const useStyles = createStyles((theme) => ({
  clusterContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
  },
}));

export default function ClusterSection({ form, ex, ei, bi, wi, di }: ExerciseSectionProps) {
  const { classes } = useStyles();

  function addLift() {
    form.insertListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts`, {
      name: '',
      weight: {
        load: 135,
      },
      records: [],
    });
  }
  function deleteCluster() {
    form.removeListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises`, ei);
  }

  function flatten() {
    //spread the cluster lifts as exercises
    const arr = form.values.blocks[bi].weeks[wi].days[di].exercises;
    const liftsArr = form.values.blocks[bi].weeks[wi].days[di].exercises[ei].lifts;
    form.setFieldValue(`blocks.${bi}.weeks.${wi}.days.${di}.exercises`, [
      ...form.values.blocks[bi].weeks[wi].days[di].exercises.slice(0, ei),
      ...liftsArr,
      ...form.values.blocks[bi].weeks[wi].days[di].exercises.slice(ei + 1),
    ]);
  }
  return (
    <Stack className={classes.clusterContainer}>
      <Group position="apart">
        <TextInput
          radius="md"
          size="md"
          placeholder="Cluster"
          rightSectionWidth={42}
          required
          withAsterisk
          {...form.getInputProps(`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.name`)}
        />

        <ClusterMenu addLift={addLift} deleteCluster={deleteCluster} flatten={flatten} />
      </Group>
      <Stack>
        <Droppable droppableId={`droppable${ei}`} type={`${ei}`}>
          {(provided) => (
            <Stack ref={provided.innerRef}>
              {ex.lifts?.map((lift: Lift, li: number) => (
                <Draggable key={`${ei}${li}`} draggableId={`${ei}${li}`} index={li}>
                  {(provided2) => (
                    <div ref={provided2.innerRef} {...provided2.draggableProps}>
                      <div {...provided2.dragHandleProps}>
                        <LiftSection
                          form={form}
                          lift={lift}
                          ei={ei}
                          bi={bi}
                          wi={wi}
                          di={di}
                          li={li}
                          path={`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}`}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </Stack>
    </Stack>
  );
}
