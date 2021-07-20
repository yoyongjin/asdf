import { all } from 'redux-saga/effects';

import auth from './auth';
import branch from './branch';
import statistics from './statistics';
import user from './user';

function* rootSaga() {
  yield all([auth(), branch(), statistics(), user()]);
}
// root saga
export default rootSaga;
