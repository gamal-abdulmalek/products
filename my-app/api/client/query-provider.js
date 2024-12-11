import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function QueryProvider({
  pageProps,
  children,
}){
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate
        state={
          pageProps.dehydratedState
        }
      >
        {children}
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
