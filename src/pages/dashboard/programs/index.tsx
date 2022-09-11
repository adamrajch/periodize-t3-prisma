import DashboardShell from '@/components/Dashboard';
import { ActionIcon, Button, Container, Group, Stack, Table, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons';
import NextError from 'next/error';
import Link from 'next/link';
import { trpc } from 'src/utils/trpc';

export default function ProgramsHome() {
  const { data, error, isLoading } = trpc.useQuery(['auth.getUser']);

  const utils = trpc.useContext();

  const createActiveProgramMutation = trpc.useMutation(['activeProgram.createActiveProgram'], {
    onSuccess() {
      utils.invalidateQueries(['auth.getUser']);
      utils.invalidateQueries(['activeProgram.getAll']);
    },
  });

  const deleteActiveMutation = trpc.useMutation(['activeProgram.deleteActiveProgram'], {
    onSuccess() {
      utils.invalidateQueries(['auth.getUser']);
      utils.invalidateQueries(['activeProgram.getAll']);
    },
  });

  const deleteProgramMutation = trpc.useMutation(['program.deleteProgram'], {
    onSuccess() {
      utils.invalidateQueries(['auth.getUser']);
    },
  });

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  async function deleteProgram(id: string) {
    try {
      await deleteProgramMutation.mutate({ id });
    } catch (err) {
      alert(err);
    }
  }

  async function createActiveProgram(id: string) {
    try {
      createActiveProgramMutation.mutate({
        programId: id,
      });
    } catch (err) {
      alert(err);
    }
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

  const rows = data?.programs.map((p) => {
    const openModal = () =>
      openConfirmModal({
        title: 'Please confirm your action',
        children: <Text size="sm">Are you sure you want to delete this program?</Text>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => deleteProgram(p.id),
      });

    const activeMatch = data.activePrograms.find((a) => a.programId === p.id);

    return (
      <tr key={p.id}>
        <td>
          <Link href={`/dashboard/program/edit/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </td>
        <td>{p.id}</td>
        <td>{p.createdAt.toLocaleDateString()}</td>
        <td>{p.updatedAt === p.createdAt ? '-' : p.updatedAt.toLocaleDateString()}</td>
        <td>
          <Group>
            {activeMatch ? (
              <Button onClick={() => deleteActiveProgram(activeMatch.id)}>Deactivate</Button>
            ) : (
              <Button onClick={() => createActiveProgram(p.id)}>Activate</Button>
            )}
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

  const activeProgramRows = data?.activePrograms.map((p) => {
    const openModal = () =>
      openConfirmModal({
        title: 'Please confirm your action',
        children: <Text size="sm">Are you sure you want to delete this program?</Text>,
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
          <Title>My Programs</Title>
          <Table verticalSpacing="lg" highlightOnHover>
            <thead>
              <tr>
                <th>title</th>
                <th>ID</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
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
