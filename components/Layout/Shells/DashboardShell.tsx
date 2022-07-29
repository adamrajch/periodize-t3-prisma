import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Burger,
  useMantineTheme,
  Box,
  Divider,
  createStyles,
} from '@mantine/core';
import { MainLinks } from './DashboardNavLinks';
import { useMediaQuery } from '@mantine/hooks';
import DashboardFooter from '@/components/Footer';
import DashboardUserLinks from './DashboardUserLinks';
import DashboardAuthSection from './DashboardAuthSection';

interface ShellProps {
  children: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  title: {
    display: 'none',
    padding: `0px ${theme.spacing.xs}px`,
    marginBottom: theme.spacing.sm,
    [theme.fn.largerThan('sm')]: {
      display: 'block',
    },
  },
  header: {
    height: 60,
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  content: {
    minHeight: '80vh',
  },
}));

export default function AppShellDemo({ children }: ShellProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          height: '100%',
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 170, lg: 200 }}>
          <Navbar.Section>
            <Text className={classes.title}>Periodize</Text>
          </Navbar.Section>
          <Navbar.Section>
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <Divider my="md" />
          </Navbar.Section>
          <Navbar.Section grow>
            <DashboardUserLinks />
          </Navbar.Section>
          <Navbar.Section>
            <DashboardAuthSection />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={isMobile ? 60 : 0} p="md" className={classes.header}>
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
      }
    >
      <Box className={classes.content}>{children}</Box>
      <DashboardFooter />
    </AppShell>
  );
}
