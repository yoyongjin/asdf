import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from 'App';
import { Toast } from 'components/atoms';
import { GlobalStyle } from 'styles/global-styles';
import { GlobalFonts } from 'styles/global-fonts';
import { dblifeTheme, defaultTheme, linaTheme } from 'styles/theme';
import rootStore, { customHistory } from 'utils/store';

const store = rootStore();

function Root() {
  return (
    <Router history={customHistory}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <GlobalFonts />
        <Provider store={store!}>
          <App />
          <Toast />
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default Root;
