import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { LazyMotion } from "framer-motion";
import HeadMeta from "../components/Layout/HeadMeta";
import { SessionProvider } from 'next-auth/react';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: any) {
    return (
        <>
            <HeadMeta />
        <CacheProvider value={emotionCache}>
        <SessionProvider>

            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
                    </ThemeProvider>
                </SessionProvider>

            </CacheProvider>
        </>
    );
}
