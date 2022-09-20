/* eslint-disable max-len */

import { Button, Container, Group, Stack, Tabs } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { Block } from 'types/Program';
import { blockAtom, weekAtom } from './ControlAtoms';
import { ProgramFormProvider, useProgramForm } from './FormContext';
import TabControls from './TabControls';
import WeekSection from './WeekSection';

interface EditProgramFormProps {
  blocks: Block[];
}

export default function EditProgramForm({ blocks }: EditProgramFormProps) {
  const [loading, setLoading] = useState(false);
  const [blockTab] = useAtom(blockAtom);
  const [weekTab, setWeekTab] = useAtom(weekAtom);
  const form = useProgramForm({
    initialValues: {
      blocks,
    },
  });

  const utils = trpc.useContext();
  const id = useRouter().query.id as string;
  const mutation = trpc.useMutation(['program.editProgramSchema'], {
    onSuccess() {
      utils.invalidateQueries(['program.getById', { id }]);
      showNotification({
        title: 'Program saved!',
        message: 'Hehe 🤥',
      });
    },
  });

  useEffect(() => {
    //when switching to a block that doesnt have current Week index
    if (!blocks[blockTab].weeks[weekTab]) {
      setWeekTab(0);
    }
  }, [blockTab]);

  async function handleSubmit() {
    setLoading(true);

    try {
      console.log('mutating');
      await mutation.mutate({
        id,
        data: form.values.blocks,
      });
      console.log(mutation.data);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ProgramFormProvider form={form}>
      <Container size="xl" sx={{ padding: 0 }}>
        <Stack>
          <TabControls />

          <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
            <Tabs value={`${blockTab}`} keepMounted={false}>
              {form.values.blocks.map((block, bi) => (
                <Tabs.Panel value={`${bi}`}>
                  <Tabs value={`${weekTab}`} keepMounted={false}>
                    {block.weeks.map((week, wi) => (
                      <Tabs.Panel value={`${wi}`}>
                        <WeekSection />
                      </Tabs.Panel>
                    ))}
                  </Tabs>
                </Tabs.Panel>
              ))}
            </Tabs>
          </form>

          <Group position="right">
            <Button
              loading={loading}
              disabled={form.values.blocks === blocks}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Group>
        </Stack>

        {/* <Code>Refactored: {JSON.stringify(form.values, null, 2)}</Code> */}
      </Container>
    </ProgramFormProvider>
  );
}
