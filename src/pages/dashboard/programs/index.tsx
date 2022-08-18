import DashboardShell from '@/components/Dashboard';
import { ActionIcon, Container, Group, Table, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons';
import NextError from 'next/error';
import Link from 'next/link';
import { trpc } from 'src/utils/trpc';

export default function ProgramsHome() {
  const { data, status, error } = trpc.useQuery(['program.getUserPrograms']);

  const utils = trpc.useContext();
  const deleteMutation = trpc.useMutation(['program.deleteProgram'], {
    onSuccess({ id }) {
      utils.invalidateQueries(['program.getUserPrograms']);
      // utils.invalidateQueries(['program.getById', id]);
    },
  });

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }

  async function handleDeleteProgram(id: string) {
    try {
      await deleteMutation.mutate({ id });
    } catch (err) {
      alert(err);
    }
  }

  const rows = data.map((p) => {
    const openModal = () =>
      openConfirmModal({
        title: 'Please confirm your action',
        children: <Text size="sm">Are you sure you want to delete this program?</Text>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => handleDeleteProgram(p.id),
      });

    return (
      <tr key={p.id}>
        <td>
          <Link href={`/dashboard/program/edit/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </td>
        <td>{p.createdAt.toLocaleDateString()}</td>
        <td>{p.updatedAt !== p.createdAt ? '-' : p.updatedAt.toISOString()}</td>
        <td>
          <Group position="right">
            <Link passHref href={`/dashboard/program/edit/${p.id}`}>
              <ActionIcon size="sm">
                <IconEdit />
              </ActionIcon>
            </Link>
            <>
              <Group position="center">
                <ActionIcon size="sm" onClick={openModal}>
                  <IconTrash />
                </ActionIcon>
              </Group>
            </>
          </Group>
        </td>
      </tr>
    );
  });
  return (
    <DashboardShell>
      <Container>
        <Title>My Programs</Title>
        <Table verticalSpacing="lg" highlightOnHover>
          <thead>
            <tr>
              <th>title</th>
              <th>createdAt</th>
              <th>updatedAt</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </DashboardShell>
  );
}
