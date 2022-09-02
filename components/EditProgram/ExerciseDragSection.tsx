 import { Group, TextInput, Box, Text, Code, Button, Center } from '@mantine/core';
 import { useForm, UseFormReturnType } from '@mantine/form';
 import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { ProgramSchema } from 'types/Program';
 
interface DragSectionProps {
    form: UseFormReturnType<ProgramSchema>;
    bi: number;
    wi: number;
    di: number;
    

}
export default function ExerciseDragSection({form}: DragSectionProps) {
  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        form.reorderListItem('blocks', { from: source.index, to: destination.index })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {fields}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
