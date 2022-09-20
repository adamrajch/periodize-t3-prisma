import { ActionIcon, Select } from '@mantine/core';
import { Exercise } from '@prisma/client';
import { IconX } from '@tabler/icons';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

export default function ExerciseSearch() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const [search, setSearch] = useState<string>('');
  const { data, status, error } = trpc.useQuery(['exercise.searchExercises', { name: search }], {
    enabled: search.length > 2,
  });

  function handleSearch(e: any) {
    setSearch(e.currentTarget.value);
  }

  function clearSearch() {
    setSearch('');
  }
  const selectResults = data
    ? data.map((r) => ({
        value: r.id,
        label: r.name,
      }))
    : [];

  return (
    <Select
      placeholder="Search Exercises"
      radius="xl"
      size="sm"
      searchable
      clearable
      allowDeselect
      data={selectResults}
      maxDropdownHeight={200}
      rightSection={
        search.length ? (
          <ActionIcon size={32} radius="xl" onClick={clearSearch}>
            <IconX size={18} stroke={1.5} />
          </ActionIcon>
        ) : null
      }
      rightSectionWidth={42}
      onSearchChange={(query: string) => {
        setSearch(query);
      }}
      onChange={(e) => {
        const selected = data?.find((exercise: Exercise) => exercise.id === e);
        if (selected?.id) {
          form.insertListItem(`blocks.${blockTab}.weeks.${weekTab}.days.${dayTab}.exercises`, {
            type: 'single',
            id: selected.id,
            name: selected.name,
            load: selected.load,
            distance: selected.distance,
            time: selected.time,
            records: [
              {
                sets: 5,
                reps: 5,
                rpe: undefined,
                percentage: undefined,
                weight: undefined,
                distance: selected?.distance ? 5 : undefined,
                time: selected?.time ? 5 : undefined,
              },
            ],
          });
        }
        setSearch('');
      }}
    />
  );
}
