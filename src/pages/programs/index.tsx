import DashboardShell from '@/components/Layout/Shells/DashboardShell';
import { DnDLiftList } from '@/components/ProgramForm/DnDLiftList';
import DndListHandle from '@/components/ProgramForm/DnDLiftList/test';
import { Button, Card, Container, Group, Image, SimpleGrid, Text } from '@mantine/core';
import NextError from 'next/error';
import Link from 'next/link';
import { trpc } from 'src/utils/trpc';

const mockData = [
  {
    position: 6,
    mass: 12.011,
    symbol: 'C',
    name: 'Carbon',
  },
  {
    position: 7,
    mass: 14.007,
    symbol: 'N',
    name: 'Nitrogen',
  },
  {
    position: 39,
    mass: 88.906,
    symbol: 'Y',
    name: 'Yttrium',
  },
  {
    position: 56,
    mass: 137.33,
    symbol: 'Ba',
    name: 'Barium',
  },
  {
    position: 58,
    mass: 140.12,
    symbol: 'Ce',
    name: 'Cerium',
  },
];

export default function ProgramsHome() {
  const { data, status, error } = trpc.useQuery(['program.getHome']);

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }
  console.log(data);
  return (
    <DashboardShell>
      <SimpleGrid cols={3}>
        {data.map((p) => (
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{p.title}</Text>
            </Group>

            <Text size="sm" color="dimmed">
              {p.description}
            </Text>
            <Link passHref href={`programs/${p.id}`}>
              <Button component="a" variant="light" color="blue" fullWidth mt="md" radius="md">
                Check it out
              </Button>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
      <Container>
        <DnDLiftList data={mockData} />
        <DndListHandle data={mockData} />
      </Container>
    </DashboardShell>
  );
}
