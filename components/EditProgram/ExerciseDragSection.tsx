type Props = {};

export default function ExerciseDragSection({}: Props) {
  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        form.reorderListItem('employees', { from: source.index, to: destination.index })
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
