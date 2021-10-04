import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import { DataProvider } from '@/lib/data';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
