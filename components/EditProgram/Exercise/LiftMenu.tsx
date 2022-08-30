import { ActionIcon, Group } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons';
import { Lift } from 'types/Program';

interface LiftMenuProps {
  deleteLift: () => void;
  insertRecord?: () => void;
  lift: Lift;
  li?: number;
}
export default function LiftMenu({ deleteLift, insertRecord, lift, li }: LiftMenuProps) {
  return (
    <Group>
      {lift.id ? (
        <ActionIcon onClick={insertRecord}>
          <IconPlus />
        </ActionIcon>
      ) : null}

      <ActionIcon onClick={deleteLift}>
        <IconX />
      </ActionIcon>
    </Group>
  );
}
