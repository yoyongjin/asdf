import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from 'App';
import { GlobalStyle } from 'styles/global-styles';
import { dblifeTheme, defaultTheme, linaTheme } from 'styles/theme';
import rootStore from 'utils/store';

const store = rootStore();

function Root() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Provider store={store!}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Root;
