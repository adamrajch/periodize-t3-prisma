import { ActionIcon, Box, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Exercise } from '@prisma/client';
import { IconSearch, IconX } from '@tabler/icons';
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

  function handleSearch(e) {
    setSearch(e.currentTarget.value);
  }

  function clearSearch() {
    setSearch('');
  }
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
            {/* <Select
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
            /> */}
          </Group>

          {data?.map((r, ri: number) => (
            <Box
              sx={(theme) => ({
                backgroundColor: theme.colors.dark[8],
                padding: 16,
                borderRadius: theme.radius.md,
              })}
            >
              <Text>{r.name}</Text>
            </Box>
          ))}
        </Stack>

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
