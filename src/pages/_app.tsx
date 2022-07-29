import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { SessionProvider } from 'next-auth/react';
import GlobalStyles from 'styles/Global';
import { rtlCache } from 'styles/rtl-cache';
import AuthWrapper from '@/components/Auth/AuthWrapper';

export default function App(props: AppProps & { colorScheme: any }) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<any>(props.colorScheme);

  const toggleColorScheme = (value?: any) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const myCache = createEmotionCache({ key: 'mantine' });

  return (
    <>
      <Head>
        <title>Periodize</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme, dir: 'rtl' }}
          withGlobalStyles
          withNormalizeCSS
          emotionCache={myCache}
        >
          <GlobalStyles />
          <NotificationsProvider>
            <SessionProvider session={pageProps?.session}>
              <AuthWrapper>
                <Component {...pageProps} />
              </AuthWrapper>
            </SessionProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});
