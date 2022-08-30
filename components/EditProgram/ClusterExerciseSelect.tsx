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
  ei: number;
  li?: number;
}

export default function ClusterExerciseSelect({ form, bi, wi, di, ei, li }: ExerciseSelectProps) {
  const [search, setSearch] = useState<string>('');

  const { data, status, error } = trpc.useQuery(['exercise.searchExercises', { name: search }], {
    enabled: search.length > 2,
  });

  const selectResults = data
    ? data.map((r) => ({
        value: r.name,
        label: r.name,
      }))
    : [];
  const namePath = `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}.name`;
  const inputPath = `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts.${li}`;

  return (
    <>
      <Select
        placeholder="Select Exercise"
        searchable
        data={selectResults}
        maxDropdownHeight={200}
        onSearchChange={(query: string) => {
          setSearch(query);
        }}
        {...form.getInputProps(namePath)}
        onChange={(e) => {
          const selected = data?.find((exercise: Exercise) => exercise.name === e);
          if (selected?.id) {
            form.setFieldValue(inputPath, {
              id: selected?.id,
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
