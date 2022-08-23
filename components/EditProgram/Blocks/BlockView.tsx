import { ActionIcon, Group, Tabs } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import { useState } from 'react';
import { Block } from 'types/Program';

type Props = {
  blocks: any;
};

export default function BlockView({ blocks }: Props) {
  const [activeTab, setActiveTab] = useState<string | null>('0');
  const aT: number = activeTab ? Number(activeTab) : 0;
  function nextBlock() {
    setActiveTab(Number(activeTab) + 1);
  }
  function prevBlock() {
    setActiveTab(Number(activeTab) - 1);
  }
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Group>
        {Number(activeTab) !== 0 ? (
          <ActionIcon onClick={prevBlock}>
            <IconArrowLeft />
          </ActionIcon>
        ) : null}
        <div>{blocks[activeTab].name}</div>
        {Number(activeTab) < blocks.length - 1 ? (
          <ActionIcon onClick={nextBlock}>
            <IconArrowRight />
          </ActionIcon>
        ) : null}
      </Group>
      {/* Block section */}
      {blocks.map((block: Block, bi: number) => (
        <Tabs.Panel value={`${bi}`}>{/* {block.weeks.length ? :} */}</Tabs.Panel>
      ))}
    </Tabs>
  );
}
