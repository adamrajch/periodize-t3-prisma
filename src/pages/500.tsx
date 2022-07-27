import React from 'react';
import { createStyles, Title, Text, Button, Group } from '@mantine/core';
import { Error500Bg } from '@/components/Error/500bg';
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
    opacity: 0.45,
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
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 460,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

export default function Custom500Page() {
  const { classes } = useStyles();

  return (
    <Wrapper withNav>
      <div className={classes.inner}>
        <Error500Bg className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>All of our servers are busy</Title>
          <Text size="lg" align="center" className={classes.description}>
            We cannot handle your request right now, please wait for a couple of minutes and refresh
            the page. Our team is already working on this issue.
          </Text>
          <Group position="center">
            <Button size="md">Refresh the page</Button>
          </Group>
        </div>
      </div>
    </Wrapper>
  );
}
