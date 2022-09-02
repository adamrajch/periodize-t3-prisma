import { ActionIcon, Group, Menu } from '@mantine/core';
import { IconDotsVertical, IconMessageCircle, IconSettings, IconTrash } from '@tabler/icons';

interface ClusterMenuProps {
  addLift: () => void;
  deleteCluster: () => void;
}

export default function ClusterMenu({ addLift, deleteCluster }: ClusterMenuProps) {
  return (
    <Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon>
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />}>Generate</Menu.Item>
          <Menu.Item icon={<IconMessageCircle size={14} />}>Templates</Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={deleteCluster}>
            Delete Cluster
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
