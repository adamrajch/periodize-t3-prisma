import {
  ActionIcon,
  Box,
  Button,
  Center,
  Code,
  Group,
  Modal,
  Popover,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, UseFormReturnType, zodResolver } from '@mantine/form';

import { IconGripVertical, IconPlus, IconSearch, IconX } from '@tabler/icons';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ProgramLiftSchema } from 'src/schema/program.schema';
import { trpc } from 'src/utils/trpc';
import { Cluster, Lift, ProgramSchema } from 'types/Program';
import { z } from 'zod';

interface ModalProps {
  form: UseFormReturnType<ProgramSchema>;
  bi: number;
  wi: number;
  di: number;
}

export default function AddClusterModal({ form, bi, wi, di }: ModalProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [results, setResults] = useState<(Lift | Cluster)[]>([]);
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<any>([]);

  const { data, status, error } = trpc.useQuery(['exercise.searchExercises', { name: search }], {
    enabled: search.length > 2,
  });

  const schema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name should have at least 2 letters' })
      .max(20, { message: 'Name should have no more than 20 letters' }),
    summary: z.string().max(50, { message: 'Name should have no more than 50 letters' }),
    lifts: ProgramLiftSchema,
  });

  interface FormValues {
    name: string;
    rest: number | null;
    summary: string;
    lifts: Lift[];
  }

  const clusterForm = useForm<FormValues>({
    initialValues: {
      name: '',
      rest: null,
      summary: '',
      lifts: [],
    },

    validate: zodResolver(schema),
  });

  const fields = clusterForm.values.lifts.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical size={18} />
          </Center>
          <Text>{clusterForm.values.lifts[index].name}</Text>
        </Group>
      )}
    </Draggable>
  ));

  function handleSearch(e: any) {
    setSearch(e.currentTarget.value);
  }

  function clearSearch() {
    setSearch('');
  }

  function handleClose() {
    setSearch('');
    setResults([]);
    setList([]);
    setOpened(false);
  }
  const selectResults = data
    ? data.map((r) => ({
        value: r.id,
        label: r.name,
      }))
    : [];

  const popoverIsOpen = data && data.length > 0;
  return (
    <>
      <Modal opened={opened} onClose={handleClose} size="lg" centered withCloseButton={false}>
        <Stack sx={{ minHeight: '40vh' }} spacing={0}>
          <Group grow>
            <TextInput
              icon={<IconSearch size={18} stroke={1.5} />}
              radius="xl"
              size="md"
              placeholder="Search Exercises"
              value={search}
              onChange={(e) => handleSearch(e)}
              rightSection={
                search.length ? (
                  <ActionIcon size={32} radius="xl" onClick={clearSearch}>
                    <IconX size={18} stroke={1.5} />
                  </ActionIcon>
                ) : null
              }
              rightSectionWidth={42}
            />
          </Group>
          {data ? (
            <Popover position="bottom" shadow="md" opened={popoverIsOpen} width="90%">
              <Popover.Target>
                <div />
              </Popover.Target>
              <Popover.Dropdown>
                {data?.map((r, ri: number) => (
                  <Box
                    sx={(theme) => ({
                      padding: 12,
                      borderRadius: theme.radius.md,
                      cursor: 'pointer',
                    })}
                    onClick={() => {
                      clusterForm.insertListItem('lifts', r);
                      setSearch('');
                    }}
                  >
                    <Text>{r.name}</Text>
                  </Box>
                ))}
              </Popover.Dropdown>
            </Popover>
          ) : null}

          <DragDropContext
            onDragEnd={({ destination, source }) =>
              form.reorderListItem('lifts', { from: source.index, to: destination.index })
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
        </Stack>

        <Code>{JSON.stringify(clusterForm.values, null, 2)}</Code>
        <Group position="right">
          <Button>Add Cluster</Button>
        </Group>
      </Modal>
      <Group position="center" m={0}>
        <Button
          onClick={() => setOpened(true)}
          leftIcon={
            <ActionIcon>
              <IconPlus />
            </ActionIcon>
          }
        >
          Cluster
        </Button>
      </Group>
    </>
  );
}
