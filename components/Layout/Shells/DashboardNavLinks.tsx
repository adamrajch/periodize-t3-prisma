import React from 'react';
import { GitPullRequest, AlertCircle, Messages, Database } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Anchor } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

function MainLink({ icon, color, label, href }: MainLinkProps) {
  const router = useRouter();
  const active = href === router.asPath;
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRight: active ? '2px solid blue' : '',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group noWrap>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Link href={href} passHref>
          <Anchor size="sm" style={{ whiteSpace: 'nowrap' }}>
            {label}
          </Anchor>
        </Link>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <GitPullRequest size={16} />,
    color: 'blue',
    label: 'Pull Requests',
    href: '/dashboard',
  },
  {
    icon: <AlertCircle size={16} />,
    color: 'teal',
    label: 'Open Issues',
    href: '/dashboard/calendar',
  },
  {
    icon: <Messages size={16} />,
    color: 'violet',
    label: 'Discussions',
    href: '/dashboard/programs',
  },
  {
    icon: <Database size={16} />,
    color: 'grape',
    label: 'Databases',
    href: '/dashboard/log',
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
