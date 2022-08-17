import {
  ActionIcon,
  Button,
  Code,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';
import { useState } from 'react';

export default function AddBlockModal() {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
      summary: '',
      weeks: [
        {
          name: '',
          summary: '',
        },
      ],
    },

    validate: {
      name: (value) => (value.trim().length < 20 ? null : 'Too long'),
    },
  });

  function handleClose() {
    setOpened(false);
    form.reset();
  }
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Introduce yourself!" size="lg">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <TextInput required label="Name" placeholder="" {...form.getInputProps('name')} />
            <Textarea required label="Summary" placeholder="" {...form.getInputProps('summary')} />

            <Button
              onClick={() =>
                form.insertListItem('weeks', {
                  name: `Week ${form.values.weeks.length + 1}`,
                  summary: '',
                  key: randomId(),
                })
              }
            >
              Add Week
            </Button>
            <Stack>
              <div>Weeks</div>
              {form.values.weeks.map((t, ti) => (
                <div>
                  <Group>
                    <TextInput
                      required
                      {...form.getInputProps(`weeks.${ti}.name`)}
                      sx={{ flex: 1 }}
                    />
                    <Select
                      placeholder="Pick one"
                      data={[
                        { value: 'react', label: 'React' },
                        { value: 'ng', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'vue', label: 'Vue' },
                      ]}
                    />
                    <ActionIcon onClick={() => form.removeListItem('weeks', ti)}>
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </div>
              ))}
            </Stack>
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
          <Code>{JSON.stringify(form.values)}</Code>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add Block</Button>
      </Group>
    </>
  );
}
