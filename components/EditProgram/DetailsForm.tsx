import { Button, Checkbox, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';

interface DetailsFormProps {
  title: string;
  description?: string;
  isPublic: boolean;
  tags: any;
}

export default function DetailsForm({ title, description, isPublic, tags }: DetailsFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(['program.editProgram'], {
    onSuccess() {
      utils.invalidateQueries(['program.getUserPrograms']);
    },
  });
  const id = useRouter().query.id as string;
  const form = useForm({
    initialValues: {
      title,
      description,
      isPublic,
      tags,
    },
  });

  type FormValues = typeof form.values;

  async function handleFormSubmit(values: FormValues) {
    setLoading(true);

    try {
      mutation.mutate({
        id,
        data: {
          ...values,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form onSubmit={form.onSubmit((values: FormValues) => handleFormSubmit(values))}>
      <Stack>
        <TextInput required label="Title" {...form.getInputProps('title')} />
        <Textarea required label="Description" {...form.getInputProps('description')} />
        <Checkbox
          mt="md"
          label="Allow public to view"
          {...form.getInputProps('isPublic', { type: 'checkbox' })}
        />
        {/* <pre>{JSON.stringify(form.values)}</pre> */}
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
