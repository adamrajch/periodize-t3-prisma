import { createStyles, Group, Stack, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Cluster, Lift } from 'types/Program';
import { blockAtom, dayAtom, getPath, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import LiftSection from '../LiftSection';
import ClusterMenu from './ClusterMenu';

interface ExerciseSectionProps {
  ei: number;
}

const useStyles = createStyles((theme) => ({
  clusterContainer: {
    padding: '6px',
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
  },
}));

export default function ClusterSection({ ei }: ExerciseSectionProps) {
  const { classes } = useStyles();
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const path = getPath();
  const ex = form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[ei] as Cluster;
  function addLift() {
    form.insertListItem(`${path}.${ei}.lifts`, {
      name: '',
      weight: {
        load: 135,
      },
      records: [],
    });
  }
  function deleteCluster() {
    form.removeListItem(path, ei);
  }

  function flatten() {
    //spread the cluster lifts as exercises

    const liftsArr = ex.lifts;
    form.setFieldValue(path, [
      ...form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises.slice(0, ei),
      ...liftsArr,
      ...form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises.slice(ei + 1),
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
          {...form.getInputProps(`${path}.${ei}.name`)}
        />
        {/* <ClusterLiftControl /> */}
        <ClusterMenu addLift={addLift} deleteCluster={deleteCluster} flatten={flatten} />
      </Group>
      <Stack>
        <Droppable droppableId="lift" type="CLUSTER">
          {(provided) => (
            <Stack ref={provided.innerRef}>
              {ex.lifts?.map((lift: Lift, li: number) => (
                <Draggable key={`${ei}${li}`} draggableId={`${ei}${li}`} index={li}>
                  {(provided2) => (
                    <div ref={provided2.innerRef} {...provided2.draggableProps}>
                      <div {...provided2.dragHandleProps}>
                        <LiftSection ei={ei} li={li} lift={lift} />
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
