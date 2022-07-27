import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  Title,
} from '@mantine/core';
import { MainLinks } from './DashboardNavLinks';
import { useMediaQuery } from '@mantine/hooks';
import DashboardFooter from '@/components/Footer';

interface ShellProps {
  children: React.ReactNode;
}

export default function AppShellDemo({ children }: ShellProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="sm" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 170, lg: 200 }}>
          <Navbar.Section>
            <Title order={4}>Periodize</Title>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
        </Navbar>
      }
      header={
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Header height={isMobile ? 60 : 0} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
              <Text>Logo</Text>
            </div>
          </Header>
        </MediaQuery>
      }
    >
      <Box>
        {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Header height={60} p="md" fixed>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
              <Text>Logo</Text>
            </div>
          </Header>
        </MediaQuery> */}
        {children}
      </Box>

      <DashboardFooter />
    </AppShell>
  );
}
