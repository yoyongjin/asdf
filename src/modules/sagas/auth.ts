import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  requestLogin,
  REQUEST_LOGIN,
  successLogin,
  failureLogin,
  requestCheckLogin,
  REQUEST_CHECK_LOGIN,
  requestLogout,
  REQUEST_LOGOUT,
  successLogout,
  successCheckLogin,
  failureCheckLogin,
  failureLogout,
} from 'modules/actions/auth';
import * as API from 'lib/api';

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password, history } = action.payload;

  try {
    const response = yield call(API.login, id, password);
    const { status, data } = response.data;

    if (status === 'success') {
      const { user } = data;
      console.log(user);
      yield put(successLogin(user));
      history.push('/main');
    }
  } catch (error) {
    yield put(failureLogin(error));
    alert('Wrong ID or password.');
  }
}

function* checkLoginProcess(action: ReturnType<typeof requestCheckLogin>) {
  const { history } = action.payload;

  try {
    const response = yield call(API.checkLogin);
    const { status, data } = response.data;

    if (status === 'success') {
      const { user } = data;
      console.log(user);
      yield put(successCheckLogin(user));
      history.push('/main');
    }
  } catch (error) {
    yield put(failureCheckLogin(error));
    history.push('/auth/login');
  }
}
// ReturnType<typeof requestLogout>
function* logoutProcess(action: ReturnType<typeof requestLogout>){
  const { history } = action.payload;

  try{
    const response = yield call(API.logout);
    const { status } = response.data;

    if (status === 'success') {
      yield put(successLogout());
      history.push('/auth/login');
    }
  }catch(error){
    yield put(failureLogout(error));
  }
  
}

function* watchLogin() {
  yield takeLatest(REQUEST_LOGIN, loginProcess);
}

function* watchCheckLogin() {
  yield takeLatest(REQUEST_CHECK_LOGIN, checkLoginProcess);
}

function* watchLogout() {
  yield takeLatest(REQUEST_LOGOUT, logoutProcess)
}

function* authSaga() {
  yield all([fork(watchLogin), fork(watchCheckLogin), fork(watchLogout)]);
}

export default authSaga;
