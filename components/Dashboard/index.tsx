import {
  AppShell,
  Box,
  Burger,
  Center,
  createStyles,
  Divider,
  Header,
  Navbar,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBooks,
  IconCalendar,
  IconClipboardText,
  IconDashboard,
  IconTrophy,
  TablerIcon,
} from '@tabler/icons';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AddContentModal from '../AddContentModal';
import DashboardAuthSection from './DashboardAuthSection';

interface ShellProps {
  children: React.ReactNode;
}

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  href: string;
}
const userLinks: NavbarLinkProps[] = [
  {
    icon: IconDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: IconBooks,
    label: 'Programs',
    href: '/dashboard/programs',
  },
  {
    icon: IconCalendar,
    label: 'Schedule',
    href: '/dashboard/schedule',
  },
  {
    icon: IconTrophy,
    label: 'PRs',
    href: '/dashboard/personal-records',
  },
];

const globalLinks: NavbarLinkProps[] = [
  {
    icon: IconClipboardText,
    label: 'Library',
    href: '/library',
  },
];
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

  link: {
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

function NavbarLink({ icon: Icon, label, href }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        className={cx(classes.link, isActive ? classes.active : '')}
        onClick={() => router.push(href)}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const links = userLinks.map((link, index) => <NavbarLink {...link} key={link.label} />);
const navLinks = globalLinks.map((link, index) => <NavbarLink {...link} key={link.label} />);

export default function DashboardShell({ children }: ShellProps) {
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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ base: 80 }}>
          <Navbar.Section>
            <Center>
              <Text className={classes.title}>P</Text>
            </Center>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={2}>
              {links}
              <Box my={4} mx={0}>
                <AddContentModal />
              </Box>
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Divider my="md" />
          </Navbar.Section>
          <Navbar.Section grow>
            <Stack justify="center" spacing={2}>
              {navLinks}
            </Stack>
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
    </AppShell>
  );
}
