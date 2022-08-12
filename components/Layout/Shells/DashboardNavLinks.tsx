import { Anchor, createStyles, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AlertCircle, Books, Dashboard, Database } from 'tabler-icons-react';

interface DashboardLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

const useStyles = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  link: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    whiteSpace: 'nowrap',
  },
}));
function MainLink({ icon, color, label, href }: DashboardLinkProps) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const active = href === router.asPath;
  return (
    <UnstyledButton className={classes.button}>
      <Group noWrap>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Link href={href} passHref>
          <Anchor size="sm" className={classes.link}>
            {label}
          </Anchor>
        </Link>
      </Group>
    </UnstyledButton>
  );
}

const data: DashboardLinkProps[] = [
  {
    icon: <Dashboard size={16} />,
    color: 'blue',
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <AlertCircle size={16} />,
    color: 'teal',
    label: 'Programs',
    href: 'programs',
  },

  {
    icon: <Database size={16} />,
    color: 'grape',
    label: 'Workouts',
    href: '/dashboard/workouts',
  },
  {
    icon: <Books size={16} />,
    color: 'blue',
    label: 'Library',
    href: '/library',
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
