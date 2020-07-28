import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import { GlobalStyle } from 'styles/global-styles';

function Root() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  );
}

export default Root;
