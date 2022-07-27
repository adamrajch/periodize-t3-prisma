/* eslint-disable @typescript-eslint/quotes */
import { Global } from '@mantine/core';

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        html: {
          minHeight: '100%',
        },

        body: {
          ...theme.fn.fontStyles(),
          height: '100%',
          minHeight: '100%',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
          scrollBehavior: 'smooth',
          '::-webkit-scrollbar': {
            width: 6,
          },

          /* Track */
          '::-webkit-scrollbar-track': {
            background: theme.colors.dark[8],
          },

          /* Handle */
          '::-webkit-scrollbar-thumb': {
            background: '#ea8a03 ',
            borderRadius: '20',
          },

          /* Handle on hover */
          '::-webkit-scrollbar-thumb:hover': {
            background: '#ce7c08 ',
          },
        },

        [`#__next`]: {
          minHeight: '100%',
          height: '100%',
        },
        [`.full`]: {
          height: '100%',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      })}
    />
  );
}
