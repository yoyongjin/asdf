import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, Store, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';
import constants from './constants';

const customHistory = createBrowserHistory();

const rootStore = () => {
  // redux-saga 적용
  const sagaMiddleware = createSagaMiddleware({
    context: {
      history: customHistory,
    },
  });

  // redux 레거시(createStore)
  // let middleware: StoreEnhancer | undefined;

  // if (constants.NODE_ENV === 'development') {
  //   // 개발툴 적용
  //   middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
  // } else if (constants.NODE_ENV === 'production') {
  //   middleware = applyMiddleware(sagaMiddleware);
  // }

  // if (!middleware) {
  //   return;
  // }

  // const store = createStore(rootReducer, middleware) as Store;
  // sagaMiddleware.run(rootSaga);

  // redux-toolkit(configureStore)
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    // devTools 옵션: devlopment|productioni|test
    devTools: process.env.NODE_ENV !== 'development',
  });
  sagaMiddleware?.run(rootSaga);

  return store;
};

export default rootStore;

export { customHistory };
