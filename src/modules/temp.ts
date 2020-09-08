import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';

const rootStore = () => {
  // redux-saga 적용
  const sagaMiddleware = createSagaMiddleware();

  let middleware = null;

  if (process.env.NODE_ENV === 'development') {
    // 개발툴 적용
    middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
  } else if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware(sagaMiddleware);
  }

  if (!middleware) {
    new Error('NODE_ENV를 확인해주세요.');
    return;
  }

  const store = createStore(rootReducer, middleware);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default rootStore();
