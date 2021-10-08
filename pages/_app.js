import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import { ConditionalDataProvider } from '@/lib/data';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  const path = pathname.split('/')[1];
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <AuthProvider>
      <ConditionalDataProvider exclude={['/']}>
        <DefaultSeo {...SEO} title={title} />
        <Component {...pageProps} />
      </ConditionalDataProvider>
    </AuthProvider>
  );
}

export default MyApp;
