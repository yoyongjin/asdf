import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'App';
import { GlobalStyle } from 'styles/global-styles';
import rootStore from 'utils/store';

const store = rootStore();

function Root() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Provider store={store!}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

export default Root;
