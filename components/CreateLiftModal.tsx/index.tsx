import {
  Button,
  Checkbox,
  Group,
  Modal,
  MultiSelect,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { trpc } from 'src/utils/trpc';

export default function CreateLiftModal() {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const utils = trpc.useContext();
  const id = useRouter().query.id as string;

  const mutation = trpc.useMutation(['exercise.create-exercise'], {
    onSuccess() {
      utils.invalidateQueries(['exercise.getExercises']);
    },
  });

  const form = useForm({
    initialValues: {
      name: '',
      category: [],
      load: true,
      distance: false,
      time: false,
    },

    validate: {
      name: (value) =>
        value.trim().length > 20 || value.trim().length === 0 ? 'Name must be between 1-20' : null,
    },
  });

  function handleClose() {
    setCategory([]);
    setOpened(false);
    form.reset();
  }

  type FormValues = typeof form.values;

  function handleSubmit(values: FormValues) {
    setLoading(true);

    try {
      mutation.mutate({
        ...form.values,
        category,
      });
      console.log(mutation.data?.id);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    handleClose();
  }

  const checkOptions = ['load', 'distance', 'time'];

  return (
    <>
      <Modal opened={opened} onClose={handleClose} centered withCloseButton={false}>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          style={{ padding: '0 10px' }}
        >
          <Stack>
            <Title order={3} align="center">
              Add Exercise
            </Title>
            <TextInput
              required
              label="Exercise name"
              placeholder=""
              {...form.getInputProps('name')}
            />
            <MultiSelect
              data={[
                { value: 'abs', label: 'abs' },
                { value: 'back', label: 'back' },
                { value: 'biceps', label: 'biceps' },
                { value: 'chest', label: 'chest' },
                { value: 'forearm/hand', label: 'forearm/hand' },
                { value: 'legs', label: 'legs' },
                { value: 'triceps', label: 'triceps' },
                { value: 'shoulders', label: 'shoulders' },
              ]}
              label="Select Anatomy"
              placeholder="Select Body Part"
              searchable
              clearable
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              value={category}
              onChange={setCategory}
            />

            <Group>
              {checkOptions.map((check) => (
                <Checkbox
                  key={check}
                  label={check}
                  {...form.getInputProps(check, { type: 'checkbox' })}
                />
              ))}
            </Group>

            <Group position="right" my="md">
              <Button type="submit" loading={loading}>
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button onClick={() => setOpened(true)}>Create Exercise</Button>
    </>
  );
}
