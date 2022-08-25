import {
  ActionIcon,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  Text,
  Transition,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons';
import { AuthHeaderLinks, HomeHeaderLinks } from 'constants/HomeHeader';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleLogout } from 'src/utils/auth';
import AuthLinks from '../Auth/AuthLinks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const HEADER_HEIGHT = 80;

interface HeaderProps {
  visible: boolean;
  isTop: boolean;
  opened: boolean;
}

const useStyles = createStyles((theme, { visible, isTop, opened }: HeaderProps) => ({
  root: {
    position: 'fixed',
    top: 0,
    zIndex: 1,
    height: isTop ? HEADER_HEIGHT : 50,
    border: 'none',
    display: visible ? 'flex' : 'none',
    backgroundColor: 'rgba(5, 21, 126, 0.2)',
    boxShadow: opened && !isTop ? 'none' : ' 0px 0px 5px #000',
    backdropFilter: 'blur(16px) contrast(.99)',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(9, 18, 68, 0.98)',
    backdropFilter: 'blur(16px) contrast(.99)',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    letterSpacing: 3,
    color: 'white',
    textAlign: 'center',
    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

export default function HomeHeader() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [opened, toggleOpened] = useToggle([false, true]);
  const { data, status } = useSession();
  const { classes, cx } = useStyles({ visible, isTop, opened });

  const router = useRouter();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (window.scrollY > 120) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
    // set state to new scroll position
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 40);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, prevScrollPos, handleScroll]);

  const items = HomeHeaderLinks.map((link) => (
    <Link href={link.href} key={link.href} passHref>
      <a
        key={link.label}
        className={cx(classes.link, { [classes.linkActive]: router.asPath === link.href })}
      >
        {link.label}
      </a>
    </Link>
  ));

  const authItems = AuthHeaderLinks.map((link) => (
    <Link href={link.href} key={link.href} passHref>
      <a
        key={link.label}
        className={cx(classes.link, { [classes.linkActive]: router.asPath === link.href })}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <div>My Logo</div>
        <Group spacing={5} className={classes.links}>
          {items}
          <ColorSchemeToggle />
          <AuthLinks />
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {status === 'authenticated' ? (
                <>
                  {authItems}
                  <Group onClick={handleLogout} position="center" spacing="xs">
                    <Text className={cx(classes.link)}>Logout</Text>
                    <ActionIcon>
                      <IconLogout />
                    </ActionIcon>
                  </Group>
                </>
              ) : null}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
