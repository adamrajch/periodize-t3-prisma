import DetailsForm from '@/components/EditProgram/DetailsForm';
import DashboardShell from '@/components/Layout/Shells/DashboardShell';
import { Container, Tabs, Title } from '@mantine/core';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { trpc } from 'src/utils/trpc';

export default function EditProgramPage() {
  const id = useRouter().query.id as string;
  const { data, status, error } = trpc.useQuery(['program.getById', { id }]);

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }

  if (!data) {
    return null;
  }

  console.log(data);
  const { title, description, isPublic, tags } = data;
  return (
    <DashboardShell>
      {data ? <Title mb={20}>{data?.title}</Title> : <div>no program</div>}
      <Tabs orientation="vertical" defaultValue="gallery">
        <Tabs.List grow>
          <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>
            Details
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>
            Split
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pl="xs">
          <Container size="sm">
            <DetailsForm
              title={title}
              description={description || ''}
              isPublic={isPublic}
              tags={tags}
            />
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="messages" pl="xs">
          Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value="settings" pl="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </DashboardShell>
  );
}
