import { ActionIcon, Group, Menu } from '@mantine/core';
import {
  IconDotsVertical,
  IconMessageCircle,
  IconPlus,
  IconSettings,
  IconTrash,
} from '@tabler/icons';

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
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon>
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconSettings size={14} />}>Generate</Menu.Item>
          <Menu.Item icon={<IconMessageCircle size={14} />}>Templates</Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={deleteLift}>
            Delete Lift
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
