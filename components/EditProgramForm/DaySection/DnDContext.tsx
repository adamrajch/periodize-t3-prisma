import { Box } from '@mantine/core';

import { useAtom } from 'jotai';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Cluster, Lift } from 'types/Program';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import ExerciseSection from '../ExerciseSection';
import { useProgramFormContext } from '../FormContext';

export default function DnDContext() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const day = form.values.blocks[blockTab].weeks[weekTab].days[dayTab];
  const path = `blocks.${blockTab}.weeks.${weekTab}.days.${dayTab}.exercises`;
  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination && !result.combine) {
          return;
        }

        if (result.type === 'EXERCISES') {
          if (result.combine) {
            console.log('combining: ', result);
            if ('lifts' in day.exercises[parseInt(result.combine.draggableId, 10)]) {
              //is going in cluster
              form.insertListItem(
                `${path}.${result.combine.draggableId}.lifts`,
                form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[
                  result.source.index
                ]
              );
            } else {
              //creating cluster
              form.setFieldValue(`${path}.${result.combine.draggableId}`, {
                type: 'cluster',
                name: '',
                sets: 1,
                summary: '',
                rest: undefined,
                lifts: [
                  {
                    ...form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[
                      parseInt(result.combine.draggableId, 10)
                    ],
                  },
                  {
                    ...form.values.blocks[blockTab].weeks[weekTab].days[dayTab].exercises[
                      result.source.index
                    ],
                  },
                ],
              });
            }
            //delete the dragged element
            form.removeListItem(path, result.source.index);
          } else {
            //reorder logic , find if reordering exercises, or lifts in cluster (type is the index)
            // eslint-disable-next-line no-lonely-if
            if (result.destination) {
              form.reorderListItem(path, {
                from: result.source.index,
                to: result.destination.index,
              });
            }
          }
        } else {
          // moving in superset
          // eslint-disable-next-line no-lonely-if
          if (result.destination) {
            form.reorderListItem(`${path}.${result.draggableId[0]}.lifts`, {
              from: result.source.index,
              to: result.destination?.index,
            });
          }
        }
      }}
    >
      <Droppable droppableId="droppable" direction="vertical" isCombineEnabled type="EXERCISES">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {day.exercises.map((ex: Lift | Cluster, ei: number) => (
              <Draggable key={`${path}.${ei}`} index={ei} draggableId={ei.toString()}>
                {(provided2) => (
                  <Box mt="xs" ref={provided2.innerRef} {...provided2.draggableProps}>
                    <div {...provided2.dragHandleProps}>
                      <ExerciseSection ei={ei} />
                    </div>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
