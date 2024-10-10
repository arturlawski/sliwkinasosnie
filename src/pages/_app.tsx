import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { LazyMotion } from "framer-motion";
import HeadMeta from "../components/Layout/HeadMeta";
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from "../store/index";
import Layout from 'src/components/Layout/Layout';
const loadFeatures = () =>
    import("../utils/animations/features").then((res) => res.default);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: any) {
    return (
        <>
      <HeadMeta />
      <Provider store={store}>
        <LazyMotion features={loadFeatures} strict>
        <SessionProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            </SessionProvider>
        </LazyMotion>
      </Provider>
        </>
    );
}
