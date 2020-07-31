import { all } from 'redux-saga/effects';

import auth from './auth';

function* rootSaga() {
    yield all([auth()]);
  }
// root saga
export default rootSaga;
  