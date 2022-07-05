import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './app/styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Cat energy</title>
        <meta name="description" content="some desc...." />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <div className="modal-root" />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
