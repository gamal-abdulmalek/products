import "@/styles/globals.css";
import QueryProvider from '../api/client/query-provider';

export default function App({ Component, pageProps }) {
  return (
    <QueryProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </QueryProvider>
  );
}
