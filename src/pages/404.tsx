import { Button, createStyles, Group, Text, Title } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import Error404Bg from '@/components/Error/404bg';
import Wrapper from '@/components/Layout/Containers/Wrapper';

const useStyles = createStyles((theme) => ({
  inner: {
    position: 'relative',
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function Custom404page() {
  const { classes } = useStyles();

  return (
    <Wrapper withNav>
      <div className={classes.inner}>
        <Error404Bg className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group position="center">
            <Link href="/" passHref>
              <Button component="a">Back to home</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Wrapper>
  );
}
