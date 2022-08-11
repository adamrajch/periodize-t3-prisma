import { Button, Code, Group, Modal, Stack, Stepper, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import ContentFormCheckboxCard from './ContentTypeCheckBox';

const contentTypes = [
  {
    name: 'program',
    description:
      'A multi-block training protocol that usually has one (or multiple) forms of periodization',
  },
  {
    name: 'split',
    description:
      'A basic outline of your weeks training, usually divided by focus on each particular training day',
  },
  {
    name: 'routine',
    description: 'A static list of workouts. yoga/rehab routine',
  },
];

export default function AddContentModal() {
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState(0);

  const mutation = trpc.useMutation(['program.create-program']);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      type: 'program',
    },

    validate: (values) => {
      if (active === 1) {
        return {
          title:
            values.title.trim().length < 2 || values.title.trim.length > 20
              ? 'Title must be between 2 and 20 characters'
              : null,
          description:
            values.description.trim().length > 10
              ? 'Description must be less than 10 characters long'
              : null,
        };
      }

      return {};
    },
  });

  type FormValues = typeof form.values;

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 2 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  function handleCheckBoxChange(title: string) {
    form.setFieldValue('type', title);
  }

  function handleClose() {
    setOpened(false);
    setLoading(false);
    setActive(0);
    form.reset();
  }

  async function handleFormSubmit(values: FormValues) {
    setLoading(true);
    setTimeout(() => {
      console.log(values);
      mutation.mutate({
        title: form.values.title,
        description: form.values.description,
      });
      setLoading(false);
    }, 2000);
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        centered
        lockScroll
        styles={{
          modal: {
            height: '100%',
          },
        }}
      >
        <form onSubmit={form.onSubmit((values: FormValues) => handleFormSubmit(values))}>
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step label="Format">
              <Stack>
                {contentTypes.map((c: any) => (
                  <ContentFormCheckboxCard
                    key={c.name}
                    title={c.name}
                    field={c.name}
                    description={c.description}
                    handleCheckBoxChange={handleCheckBoxChange}
                    isChecked={form.values.type === c.name}
                  />
                ))}
              </Stack>
            </Stepper.Step>

            <Stepper.Step label="Details">
              <TextInput label="title" placeholder="title" {...form.getInputProps('title')} />
              <TextInput
                label="description"
                placeholder="description"
                {...form.getInputProps('description')}
              />
            </Stepper.Step>

            <Stepper.Step label="Finish">yo</Stepper.Step>
            <Stepper.Completed>Completed! Form values:</Stepper.Completed>
          </Stepper>

          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
            {active === 2 && (
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            )}
          </Group>
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </form>
      </Modal>

      <Group position="center">
        <Button leftIcon={<IconPlus size={16} />} onClick={() => setOpened(true)}>
          <Group>
            <Text>Create</Text>
          </Group>
        </Button>
      </Group>
    </>
  );
}
