import { all } from 'redux-saga/effects';

import auth from './auth';
import message from './message';
import organization from './organization';
import phone from './phone';
import statistics from './statistics';
import user from './user';

function* rootSaga() {
  yield all([auth(), message(), organization(), phone(), statistics(), user()]);
}
// root saga
export default rootSaga;
