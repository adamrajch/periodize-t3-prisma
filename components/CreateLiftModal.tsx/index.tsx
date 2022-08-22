import {
  Button,
  Checkbox,
  Group,
  Modal,
  NativeSelect,
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
  const utils = trpc.useContext();
  const id = useRouter().query.id as string;

  const mutation = trpc.useMutation(['program.editProgramSchema'], {
    onSuccess() {
      utils.invalidateQueries(['program.getById', { id }]);
    },
  });

  const form = useForm({
    initialValues: {
      name: '',
      category: 'bodybuilding',
      weight: true,
      distance: false,
      time: false,
    },

    validate: {
      name: (value) =>
        value.trim().length > 20 || value.trim().length === 0 ? 'Name must be between 1-20' : null,
    },
  });

  function handleClose() {
    setOpened(false);
    form.reset();
  }

  type FormValues = typeof form.values;

  function handleSubmit(values: FormValues) {
    setLoading(true);

    try {
      console.log('herro');
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    handleClose();
  }

  const selectOptions = [
    'bodybuilding',
    'powerlifting',
    'weightlifting',
    'armwrestling',
    'strongman',
  ];

  const checkOptions = ['weight', 'distance', 'time'];

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

            <NativeSelect
              required
              label="Category"
              placeholder="Pick one"
              data={[
                { value: 'bodybuilding', label: 'bodybuilding' },
                { value: 'powerlifting', label: 'powerlifting' },
                { value: 'weightlifting', label: 'weightlifting' },
                { value: 'armwrestling', label: 'armwrestling' },
                { value: 'strongman', label: 'strongman' },
                { value: 'general', label: 'general' },
              ]}
              value={form.values.category}
              onChange={(e) => form.setFieldValue('category', e.currentTarget.value)}
            />
            <Group>
              {checkOptions.map((check) => (
                <Checkbox label={check} {...form.getInputProps(check, { type: 'checkbox' })} />
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

      <Button onClick={() => setOpened(true)}>Add Lift</Button>
    </>
  );
}
