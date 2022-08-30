import { ActionIcon, Group, SegmentedControl, Table } from '@mantine/core';
import { Exercise } from '@prisma/client';
import { IconCheck, IconTrash, IconX } from '@tabler/icons';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import CreateLiftModal from '../CreateLiftModal.tsx';

export default function LiftManager({ data }: { data: any }) {
  const [value, setValue] = useState('all');
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(['exercise.delete-exercise'], {
    onSuccess() {
      utils.invalidateQueries(['exercise.getExercises']);
    },
  });

  async function handleDelete(id: string) {
    try {
      mutation.mutate({
        id,
      });
    } catch (err) {
      alert(err);
    }
  }

  const rows = data.map((p: Exercise) => (
    <tr key={p.id}>
      <td>
        <a>{p.name}</a>
      </td>
      <td>{p.load ? <IconCheck /> : <IconX />}</td>
      <td>{p.distance ? <IconCheck /> : <IconX />}</td>
      <td>{p.time ? <IconCheck /> : <IconX />}</td>
      <td>{p.createdAt.toLocaleDateString()}</td>
      <td>
        <ActionIcon onClick={() => handleDelete(p.id)}>
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));
  return (
    <>
      <Group>
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { label: 'all', value: 'all' },
            { label: 'category', value: 'category' },
            { label: 'user created', value: 'user' },
          ]}
          sx={{ flex: 1 }}
        />
        <CreateLiftModal />
      </Group>
      <Table verticalSpacing="lg" highlightOnHover>
        <thead>
          <tr>
            <th>title</th>
            <th>load</th>
            <th>distance</th>
            <th>time</th>
            <th>createdAt</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {value === 'user' ? <>user lifts</> : null}
    </>
  );
}
