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
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import superjson from 'superjson';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';

function App(props: AppProps & { colorScheme: any }) {
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

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const url = `${getBaseUrl()}/api/trpc`;

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
      url,
      links,
      transformer: superjson,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(App);
