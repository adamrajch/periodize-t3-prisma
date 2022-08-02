import React from 'react';
import {
  IconBarbell,
  IconCalendar,
  IconCirclePlus,
  IconDashboard,
  IconEdit,
  IconTrophy,
} from '@tabler/icons';
import { createStyles, Box, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DashboardCreateProgram from './DashboardCreateProgram';
import AddContentModal from '@/components/AddContentModal';

interface DashboardChildLinkProps {
  icon?: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

interface DashboardLinkProps {
  icon?: React.ReactNode;
  color: string;
  label: string;
  href?: string;
  children?: DashboardChildLinkProps[];
}

const useStyles = createStyles((theme) => ({
  navLink: {
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

function MainLink({ icon, color, label, href, children }: DashboardLinkProps) {
  const router = useRouter();
  const { classes } = useStyles();
  const active = href === router.asPath;

  if (href) {
    return (
      <Link href={href} passHref>
        <NavLink
          label={label}
          icon={icon}
          childrenOffset={28}
          component="a"
          className={classes.navLink}
        >
          {children?.map((child) => (
            <Link href={child.href} key={child.href} passHref>
              <NavLink label={child.label} icon={child.icon} className={classes.link} />
            </Link>
          ))}
        </NavLink>
      </Link>
    );
  }
  return (
    <NavLink label={label} icon={icon} childrenOffset={28}>
      {children?.map((child) => (
        <Link href={child.href} key={child.href} passHref>
          <NavLink label={child.label} icon={child.icon} component="a" className={classes.link} />
        </Link>
      ))}
    </NavLink>
  );
}

const data: DashboardLinkProps[] = [
  {
    icon: <IconDashboard size={16} stroke={1.5} />,
    color: 'blue',
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <IconEdit size={16} stroke={1.5} />,
    color: 'teal',
    label: 'Editor',
    href: '/dashboard/collection',
    children: [
      {
        color: 'teal',
        label: 'My Stuff',
        href: '/dashboard/collection',
      },
    ],
  },
  {
    icon: <IconCalendar size={16} stroke={1.5} />,
    color: 'violet',
    label: 'Calendar',
    href: '/dashboard/calender',
  },
  {
    icon: <IconTrophy size={16} stroke={1.5} />,
    color: 'grape',
    label: 'PRs',
    href: '/dashboard/personal-records',
  },
  {
    icon: <IconBarbell size={16} stroke={1.5} />,
    color: 'grape',
    label: 'Lift Manager',
    href: '/dashboard/lift-manager',
  },
];

export default function DashboardUserLinks() {
  const links = data.map((link) => <MainLink key={link.href} {...link} />);
  return (
    <Box>
      {links}
      <AddContentModal />
    </Box>
  );
}
