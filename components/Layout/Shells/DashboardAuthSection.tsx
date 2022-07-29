import { ActionIcon, Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { handleLogout } from 'src/utils/auth';
import { Dashboard, Settings, Logout, Trash } from 'tabler-icons-react';

export default function DashboardAuthSection() {
  const { data, status } = useSession();
  return (
    <UnstyledButton
      sx={(theme) => ({
        padding: theme.spacing.xs,
      })}
    >
      <Group noWrap spacing="md">
        {data?.user?.image && data?.user.name ? (
          <Avatar src={data?.user.image} alt={data?.user.name} size="sm" />
        ) : (
          <Avatar radius="sm" />
        )}
        <Text>{data?.user?.name}</Text>
        <Menu shadow="md" width={150} position="right-end" withArrow>
          <Menu.Target>
            <ActionIcon>
              <Settings size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Link href="dashboard" passHref>
              <Menu.Item icon={<Settings size={14} />} component="a">
                Settings
              </Menu.Item>
            </Link>
            <Link href="dashboard" passHref>
              <Menu.Item icon={<Dashboard size={14} />} component="a">
                Dashboard
              </Menu.Item>
            </Link>
            <Menu.Divider />
            <Menu.Item color="red" icon={<Logout size={14} />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
