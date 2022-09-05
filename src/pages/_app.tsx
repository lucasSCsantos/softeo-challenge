import { ThemeProvider } from 'styled-components';

import { SSRProvider } from 'react-bootstrap';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <SSRProvider>
        <Component {...pageProps} />
        <GlobalStyles />
      </SSRProvider>
    </ThemeProvider>
  );
}

export default MyApp;
