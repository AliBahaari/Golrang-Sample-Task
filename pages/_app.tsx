import "../styles/globals.css";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  typography: {
    fontFamily: "Vazirmatn FD",
  },
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Component {...pageProps} />
          <Toaster />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
