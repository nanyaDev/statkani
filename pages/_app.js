import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import { ConditionalDataProvider } from '@/lib/data';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ConditionalDataProvider exclude={['/']}>
        <Component {...pageProps} />
      </ConditionalDataProvider>
    </AuthProvider>
  );
}

export default MyApp;
