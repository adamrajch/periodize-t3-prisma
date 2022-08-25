import { ActionIcon, Avatar, Group, Menu, UnstyledButton } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { IconDashboard, IconLogin, IconLogout, IconSettings, IconTrash } from '@tabler/icons';

import { handleLogout, handleSignIn } from 'src/utils/auth';

export default function AuthLinks() {
  const { data, status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                {data.user?.image && data.user.name ? (
                  <Avatar src={data.user.image} alt={data.user.name} size="sm" />
                ) : (
                  <Avatar radius="sm" />
                )}
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Link href="dashboard" passHref>
                <Menu.Item icon={<IconDashboard size={14} />} component="a">
                  Dashboard
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
              <Menu.Item color="red" icon={<IconTrash size={14} />}>
                Delete my account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ) : (
        <ActionIcon component="a" variant="subtle" onClick={() => handleSignIn('github')}>
          <IconLogin />
        </ActionIcon>
      )}
    </>
  );
}
