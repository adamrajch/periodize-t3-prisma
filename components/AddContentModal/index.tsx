import {
  ActionIcon,
  Box,
  Button,
  Center,
  Code,
  Group,
  Modal,
  Stack,
  Stepper,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons';
import { useRouter } from 'next/router';
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
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(['program.create-program'], {
    onSuccess() {
      utils.invalidateQueries(['program.getUserPrograms']);
    },
  });
  const router = useRouter();
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
    try {
      await mutation.mutate({
        title: form.values.title,
        description: form.values.description,
      });
      const newProgramId = mutation.data?.id;
      handleClose();
      router.push('/dashboard/programs');
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
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
                {contentTypes.map((c: any, i: number) => (
                  <Box key={i}>
                    <ContentFormCheckboxCard
                      title={c.name}
                      field={c.name}
                      description={c.description}
                      handleCheckBoxChange={handleCheckBoxChange}
                      isChecked={form.values.type === c.name}
                    />
                  </Box>
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

      <Center>
        <ActionIcon
          onClick={() => setOpened(true)}
          variant="filled"
          sx={(theme) => ({
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
              .background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            borderRadius: theme.radius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <IconPlus stroke={1.5} />
        </ActionIcon>
      </Center>
    </>
  );
}
