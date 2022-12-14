import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NativeSelect,
  ScrollArea,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconPlus, IconTrash } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';

interface AddBlockModalProps {
  blocks: any;
  trigger?: 'icon' | 'button';
  highlight?: boolean;
}

export default function AddBlockModal({ blocks, trigger, highlight }: AddBlockModalProps) {
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
      summary: '',
      phase: 'hypertrophy',
      weeks: [
        {
          name: 'Week 1',
          summary: '',
          days: [
            {
              name: 'Day 1',
              summary: '',
              exercises: [],
            },
          ],
        },
      ],
    },

    validate: {
      name: (value) =>
        value.trim().length > 20 || value.trim().length === 0 ? 'Name must be between 1-20' : null,
      summary: (value) =>
        value.trim().length > 30 ? 'Name must be less than 30 characters' : null,
    },
  });

  function handleClose() {
    setOpened(false);
    form.reset();
  }

  type FormValues = typeof form.values;

  function handleSubmit(values: FormValues) {
    setLoading(true);
    const arr = blocks;
    arr.push(values);
    console.log(arr);
    try {
      mutation.mutate({
        id,
        data: arr,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    handleClose();
  }

  return (
    <>
      <Modal opened={opened} onClose={handleClose} size="lg" centered withCloseButton={false}>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          style={{ padding: '0 10px' }}
        >
          <Stack>
            <Group grow>
              <TextInput
                required
                label="Block Name"
                placeholder=""
                {...form.getInputProps('name')}
              />
              <NativeSelect
                label="Phase"
                placeholder="Pick one"
                data={[
                  { value: 'hyptertrophy', label: 'hyptertrophy' },
                  { value: 'strength', label: 'strength' },
                  { value: 'peaking', label: 'peaking' },
                ]}
                value={form.values.phase}
                onChange={(e) => form.setFieldValue('phase', e.currentTarget.value)}
              />
            </Group>

            <Textarea label="Summary" placeholder="" {...form.getInputProps('summary')} />

            <Group align="end">
              <Button
                onClick={() =>
                  form.insertListItem('weeks', {
                    name: `Week ${form.values.weeks.length + 1}`,
                    summary: '',
                    days: [
                      {
                        name: 'Day 1',
                        summary: '',
                        exercises: [],
                      },
                    ],
                    key: randomId(),
                  })
                }
              >
                Add Week
              </Button>
            </Group>
            <ScrollArea style={{ height: '30vh' }} offsetScrollbars scrollbarSize={8}>
              <Stack>
                {form.values.weeks.map((t, ti) => (
                  <div key={ti}>
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
                      {form.values.weeks.length !== 1 ? (
                        <ActionIcon onClick={() => form.removeListItem('weeks', ti)}>
                          <IconTrash />
                        </ActionIcon>
                      ) : null}
                    </Group>
                  </div>
                ))}
              </Stack>
            </ScrollArea>
            <Group position="right" my="md">
              <Button type="submit" loading={loading}>
                Save
              </Button>
            </Group>
          </Stack>
          {/* <Code>{JSON.stringify(form.values, null, 2)}</Code> */}
        </form>
      </Modal>
      <Group position="center" m={0}>
        {trigger === 'icon' ? (
          <ActionIcon onClick={() => setOpened(true)}>
            <IconPlus color={highlight && !blocks.length ? 'gold' : 'white'} />
          </ActionIcon>
        ) : (
          <Button onClick={() => setOpened(true)} leftIcon={<IconPlus size={14} />}>
            Block
          </Button>
        )}
      </Group>
    </>
  );
}
