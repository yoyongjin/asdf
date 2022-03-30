import { all } from 'redux-saga/effects';

import auth from './auth';
import branch from './branch';
import phone from './phone';
import statistics from './statistics';
import user from './user';

function* rootSaga() {
  yield all([auth(), branch(), phone(), statistics(), user()]);
}
// root saga
export default rootSaga;
