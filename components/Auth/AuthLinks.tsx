import React from 'react';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import { ActionIcon, Avatar, Button, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { Dashboard, Login, Logout, Settings, Trash } from 'tabler-icons-react';

export default function AuthLinks() {
  const { data, status } = useSession();
  console.log('rendered');
  const handleSignIn = async () => {
    await signIn('github', {
      callbackUrl: 'http://localhost:3000/dashboard',
    });
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: 'http://localhost:3000/',
    });
  };

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
                <Menu.Item icon={<Dashboard size={14} />}>Dashboard</Menu.Item>
              </Link>

              <Link href="dashboard" passHref>
                <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
              </Link>
              <Menu.Divider />
              <Menu.Item color="red" icon={<Logout size={14} />} onClick={handleLogout}>
                Logout
              </Menu.Item>
              <Menu.Item color="red" icon={<Trash size={14} />}>
                Delete my account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ) : (
        <ActionIcon component="a" variant="subtle" onClick={handleSignIn}>
          <Login />
        </ActionIcon>
      )}
    </>
  );
}
