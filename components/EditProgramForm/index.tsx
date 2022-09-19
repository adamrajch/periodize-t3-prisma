/* eslint-disable max-len */

import { Code, Container, Group, Tabs } from '@mantine/core';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Block } from 'types/Program';
import { blockAtom, weekAtom } from './ControlAtoms';
import { ProgramFormProvider, useProgramForm } from './FormContext';
import TabControls from './TabControls';
import WeekSection from './WeekSection';

interface EditProgramFormProps {
  blocks: Block[];
}

export default function EditProgramForm({ blocks }: EditProgramFormProps) {
  const [blockTab] = useAtom(blockAtom);
  const [weekTab, setWeekTab] = useAtom(weekAtom);
  const form = useProgramForm({
    initialValues: {
      blocks,
    },
  });

  useEffect(() => {
    //when switching to a block that doesnt have current Week index
    if (!blocks[blockTab].weeks[weekTab]) {
      setWeekTab(0);
    }
  }, [blockTab]);

  return (
    <ProgramFormProvider form={form}>
      <Container size="xl">
        <Group align="flex-start" noWrap>
          <div style={{ flex: 'none' }}>
            <TabControls />
          </div>
          <form onSubmit={form.onSubmit(() => {})} style={{ width: '100%' }}>
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
        </Group>
        <Code>Refactored: {JSON.stringify(form.values, null, 2)}</Code>
      </Container>
    </ProgramFormProvider>
  );
}
