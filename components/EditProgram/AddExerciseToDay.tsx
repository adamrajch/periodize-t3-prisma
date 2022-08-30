import { Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Exercise } from '@prisma/client';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { ProgramSchema } from 'types/Program';

interface ExerciseSelectProps {
  form: UseFormReturnType<ProgramSchema>;
  bi: number;
  wi: number;
  di: number;
}

export default function AddExerciseToDaySearch({ form, bi, wi, di }: ExerciseSelectProps) {
  const [search, setSearch] = useState<string>('');
  const { data, status, error } = trpc.useQuery(['exercise.searchExercises', { name: search }], {
    enabled: search.length > 2,
  });

  const selectResults = data
    ? data.map((r) => ({
        value: r.id,
        label: r.name,
      }))
    : [];

  return (
    <>
      <Select
        placeholder="Select Exercise"
        searchable
        clearable
        allowDeselect
        data={selectResults}
        maxDropdownHeight={200}
        onSearchChange={(query: string) => {
          setSearch(query);
        }}
        onChange={(e) => {
          const selected = data?.find((exercise: Exercise) => exercise.id === e);
          if (selected?.id) {
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
                  time: selected?.time ? 5 : null,
                },
              ],
            });
          }
        }}
      />
    </>
  );
}
