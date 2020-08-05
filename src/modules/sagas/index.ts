import { all } from 'redux-saga/effects';

import auth from './auth';
import user from './user';

function* rootSaga() {
  yield all([auth(), user()]);
}
// root saga
export default rootSaga;
