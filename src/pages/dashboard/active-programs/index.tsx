import DashboardShell from '@/components/Dashboard';
import { ActionIcon, Container, Group, Stack, Table, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons';
import NextError from 'next/error';
import Link from 'next/link';
import { useEffect } from 'react';
import { trpc } from 'src/utils/trpc';

export default function ProgramsHome() {
  const { data, error, isLoading } = trpc.useQuery(['activeProgram.getAll']);
  const utils = trpc.useContext();

  useEffect(() => {
    console.log('get user: ', data);
  }, [data]);

  const deleteActiveMutation = trpc.useMutation(['activeProgram.deleteActiveProgram'], {
    onSuccess() {
      utils.invalidateQueries(['auth.getUser']);
      utils.invalidateQueries(['activeProgram.getAll']);
    },
  });

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  async function deleteActiveProgram(id: string) {
    try {
      deleteActiveMutation.mutate({
        programId: id,
      });
    } catch (err) {
      alert(err);
    }
  }

  const activeProgramRows = data?.map((p) => {
    const openModal = () =>
      openConfirmModal({
        title: 'Please confirm your action',
        children: <Text size="sm">Are you sure you want to deactivate this program?</Text>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => deleteActiveProgram(p.id),
      });

    return (
      <tr key={p.id}>
        <td>
          <Link href={`/dashboard/active-programs/${p.id}`}>
            <a>{p.id}</a>
          </Link>
        </td>
        <td>{p.programId}</td>
        <td>{p.createdAt.toLocaleDateString()}</td>
        <td>{p.updatedAt === p.createdAt ? '-' : p.updatedAt.toLocaleDateString()}</td>
        <td>
          <Group position="right">
            <Link href={`/dashboard/active-programs/${p.id}`}>
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
        <Stack>
          <Title>Subscribed Programs</Title>
          <Table verticalSpacing="lg" highlightOnHover>
            <thead>
              <tr>
                <th>title</th>
                <th>ProgramID</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th />
              </tr>
            </thead>
            <tbody>{activeProgramRows}</tbody>
          </Table>
        </Stack>
      </Container>
    </DashboardShell>
  );
}
