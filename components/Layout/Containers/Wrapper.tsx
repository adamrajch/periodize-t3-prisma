import React from 'react';
import { Container, createStyles } from '@mantine/core';
import { BasicFooterLinks } from 'constants/BasicFooter';
import BasicFooter from '@/components/Footer';

type Props = {
  children: React.ReactNode;
  withNav?: boolean;
};

const useStyles = createStyles(() => ({
  root: {
    height: '100%',
  },
  nav: {
    height: '80px',
  },
  container: {
    height: 'calc(100% - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function Wrapper({ children, withNav = false }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      {withNav ? <div className={classes.nav}>Hello there</div> : null}
      <Container className={classes.container}>{children}</Container>
      <BasicFooter links={BasicFooterLinks} />
    </div>
  );
}
