import { Button, Code, Group, Modal, Select, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Exercise } from '@prisma/client';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { ProgramSchema } from 'types/Program';

interface ModalProps {
  form: UseFormReturnType<ProgramSchema>;
  bi: number;
  wi: number;
  di: number;
}

export default function AddExerciseModal({ form, bi, wi, di }: ModalProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [results, setResults] = useState<Exercise[]>([]);
  const [search, setSearch] = useState<string>('');

  const { data, status, error } = trpc.useQuery(['exercise.searchExercises', { name: search }], {
    enabled: search.length > 2,
  });

  function handleClose() {
    setSearch('');
    setOpened(false);
  }
  const selectResults = data
    ? data.map((r) => ({
        value: r.id,
        label: r.name,
      }))
    : [];
  return (
    <>
      <Modal opened={opened} onClose={handleClose} size="lg" centered withCloseButton={false}>
        <Stack sx={{ minHeight: '40vh' }}>
          <Group grow>
            <Select
              placeholder="Select Exercise"
              searchable
              clearable
              allowDeselect
              data={selectResults}
              maxDropdownHeight={200}
              onSearchChange={(query: string) => setSearch(query)}
              onChange={(e) => {
                const selected = data?.find((exercise: Exercise) => exercise.id === e);
                console.log(e, selected);
                form.insertListItem(`blocks.${bi}.weeks.${wi}.days.${di}.exercises`, {
                  name: selected?.name,
                  load: selected?.load,
                  distance: selected?.distance,
                  time: selected?.time,
                  records: [
                    {
                      sets: 5,
                      reps: 5,
                      rpe: null,
                      percentage: null,
                      weight: selected?.load
                        ? {
                            unit: 'lbs',
                            load: 135,
                          }
                        : null,
                      distance: selected?.distance ? 5 : null,
                      //   time: selected?.time ? 5 : null,
                    },
                  ],
                });
              }}
            />
          </Group>

          {data?.map((r, ri: number) => (
            <div>{r.name}</div>
          ))}
        </Stack>
        <Code>{JSON.stringify(search, null, 2)}</Code>
        <Group position="right">
          <Button>Add</Button>
        </Group>
      </Modal>
      <Group position="center" m={0}>
        <Button onClick={() => setOpened(true)}>+Add</Button>
      </Group>
    </>
  );
}
