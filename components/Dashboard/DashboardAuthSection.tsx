import { ActionIcon, Avatar, Menu, UnstyledButton } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { handleLogout } from 'src/utils/auth';

export default function DashboardAuthSection() {
  const { data, status } = useSession();
  return (
    <UnstyledButton
      sx={(theme) => ({
        padding: theme.spacing.xs,
      })}
    >
      <Menu shadow="md" width={150} position="right-end" withArrow>
        <Menu.Target>
          <ActionIcon>
            {data?.user?.image && data?.user.name ? (
              <Avatar src={data?.user.image} alt={data?.user.name} size="sm" />
            ) : (
              <Avatar radius="sm" />
            )}
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Link href="dashboard" passHref>
            <Menu.Item icon={<IconSettings size={14} />} component="a">
              Profile
            </Menu.Item>
          </Link>
          <Link href="dashboard" passHref>
            <Menu.Item icon={<IconSettings size={14} />} component="a">
              Settings
            </Menu.Item>
          </Link>
          <Menu.Divider />
          <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </UnstyledButton>
  );
}
