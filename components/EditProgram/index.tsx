import { Button, Code, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Prisma } from '@prisma/client';
import { useState } from 'react';
import { inferQueryOutput } from 'src/utils/trpc';
import { ProgramSchema } from 'types/Program';
import AddBlockModal from './Blocks/AddBlockModal';

// type NonNullable<T> = Exclude<T, null | undefined>;
interface FormProps {
  data: inferQueryOutput<'program.getById'>;
}
export default function EditProgramForm({ data }: FormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const schema = data?.schema as Prisma.JsonObject;

  const defaultSchema: ProgramSchema = {
    meta: {},
    blocks: [
      {
        name: '',
        summary: '',
        weeks: [
          {
            name: '',
            summary: '',
            days: [],
          },
        ],
      },
    ],
  };
  const form = useForm({
    initialValues: {
      schema: schema || defaultSchema,
    },
  });
  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <SimpleGrid cols={4}>
          <AddBlockModal />
        </SimpleGrid>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </form>
      <Code>{JSON.stringify(data, null, 2)}</Code>
      <Code>{JSON.stringify(schema)}</Code>
    </div>
  );
}
