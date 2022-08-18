import { Code, SimpleGrid, Stack, Text } from '@mantine/core';
import { inferQueryOutput } from 'src/utils/trpc';
import AddBlockModal from './Blocks/AddBlockModal';

// type NonNullable<T> = Exclude<T, null | undefined>;
interface FormProps {
  data: inferQueryOutput<'program.getById'>;
}
export default function EditProgramForm({ data }: FormProps) {
  const schema = data?.schema as any;

  return (
    <div>
      <AddBlockModal blocks={schema} />
      <SimpleGrid cols={4} my={12}>
        {schema.blocks &&
          schema.blocks.map((block: any) => (
            <Stack
              align="center"
              justify="center"
              sx={{ height: 200, border: '1px solid grey', flex: 1, borderRadius: 12 }}
              spacing={1}
            >
              <Text sx={{ textTransform: 'uppercase' }} size="lg">
                {block.name}
              </Text>
              <Text color="cyan" sx={{ textTransform: 'uppercase' }} size="sm">
                {block.phase} Phase
              </Text>
            </Stack>
          ))}
      </SimpleGrid>
      <Code>hi {JSON.stringify(data, null, 2)}</Code>
      <br /> <br /> <br />
      <Code>{JSON.stringify(schema, null, 2)}</Code>
    </div>
  );
}
