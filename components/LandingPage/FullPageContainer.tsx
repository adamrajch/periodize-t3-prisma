import { Container, MantineNumberSize } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
  align?: string;
  center?: boolean;
  height?: string;
  size?: MantineNumberSize | undefined;
};

export default function FullPageContainer({
  children,
  center = true,
  align = 'center',
  height = '100vh',
  size = 'lg',
  ...rest
}: Props) {
  return (
    <Container
      size={size}
      style={{
        height,
        display: 'flex',
        justifyContent: center ? 'center' : 'flex-start',
        alignItems: align,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
}
