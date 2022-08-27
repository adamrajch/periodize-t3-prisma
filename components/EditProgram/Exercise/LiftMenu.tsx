import { ActionIcon, Group } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons';

interface LiftMenuProps {
  deleteLift: () => void;
  insertRecord?: () => void;
}
export default function LiftMenu({ deleteLift, insertRecord }: LiftMenuProps) {
  return (
    <Group>
      <ActionIcon onClick={insertRecord}>
        <IconPlus />
      </ActionIcon>
      <ActionIcon onClick={deleteLift}>
        <IconX />
      </ActionIcon>
    </Group>
  );
}
