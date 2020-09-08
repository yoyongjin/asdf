import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from 'App';
import { GlobalStyle } from 'styles/global-styles';
import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';

let middleware: any;

const sagaMiddleware = createSagaMiddleware();

// redux chrome extension 적용 여부
if (process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
} else if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(sagaMiddleware);
}

const store = createStore(rootReducer, middleware);
sagaMiddleware.run(rootSaga);

function Root() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

export default Root;
