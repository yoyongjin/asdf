import { all } from 'redux-saga/effects';

import auth from './auth';
import branch from './branch';
import user from './user';

function* rootSaga() {
  yield all([auth(), branch(), user()]);
}
// root saga
export default rootSaga;
