import DashboardShell from '@/components/Dashboard';
import EditProgramForm from '@/components/EditProgram';
import DetailsForm from '@/components/EditProgram/DetailsForm';
import { Box, Container, Tabs, Title } from '@mantine/core';
import { IconMessageCircle, IconPhoto } from '@tabler/icons';
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

  console.log('edit page : ', data);
  const { title, description, isPublic, tags } = data;
  return (
    <DashboardShell>
      <Box sx={{ height: '100%' }}>
        <Title
          align="center"
          my={8}
          sx={(theme) => ({
            padding: theme.spacing.xl,
          })}
        >
          Edit: {data.title}
        </Title>
        <Tabs orientation="vertical" defaultValue="gallery" keepMounted={false}>
          <Tabs.List>
            <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>
              Details
            </Tabs.Tab>
            <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>
              Split
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
            <EditProgramForm data={data} />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </DashboardShell>
  );
}

// export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
//   const ssg = await createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//     transformer: superjson, // optional - adds superjson serialization
//   });
//   const id = context.params?.id as string;
//   // prefetch `post.byId`
//   await ssg.fetchQuery('program.getById', {
//     id,
//   });
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       id,
//     },
//     revalidate: 1,
//   };
// }
// export const getStaticPaths: GetStaticPaths = async () => {
//   const programs = await prisma.program.findMany({
//     select: {
//       id: true,
//     },
//   });
//   return {
//     paths: programs.map((program) => ({
//       params: {
//         id: program.id,
//       },
//     })),
//     // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
//     fallback: 'blocking',
//   };
// };
