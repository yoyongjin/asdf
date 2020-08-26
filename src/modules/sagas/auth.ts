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
import Socket from 'lib/socket';
import Zibox from 'lib/zibox';
import { socketServer } from 'utils/constants';

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password, history } = action.payload;

  try {
    const response = yield call(API.login, id, password);
    console.log('Login Data => ', response);
    const { status, data } = response.data;

    if (status === 'success') {
      Socket.getInstance().url(socketServer!);
      Socket.getInstance().onEmit('initialize');
      Zibox.getInstance().createZibox();
      const { user, token } = data;
      console.log(user);

      yield put(successLogin(user));
      history.push('/main');
    }
  } catch (error) {
    console.log(error)
    yield put(failureLogin(error));
    alert('Wrong ID or password.');
  }
}

function* checkLoginProcess(action: ReturnType<typeof requestCheckLogin>) {
  const { history, location } = action.payload;

  try {
    const response = yield call(API.checkLogin);
    console.log('Login Check Data => ', response);
    const { status, data } = response.data;

    if (status === 'success') {
      Socket.getInstance().url(socketServer!);
      Socket.getInstance().onEmit('initialize');
      Zibox.getInstance().createZibox();

      const { user, token } = data;
      console.log(user);
      yield put(successCheckLogin(user));
      history.push(location!.pathname);
    }
  } catch (error) {
    console.log(error)
    yield put(failureCheckLogin(error));
    history.push('/auth/login');
  }
}

function* logoutProcess(action: ReturnType<typeof requestLogout>) {
  const { history } = action.payload;

  try {
    const response = yield call(API.logout);
    console.log('Logout Data => ', response);
    const { status } = response.data;

    if (status === 'success') {
      yield put(successLogout());
      history.push('/auth/login');
      window.location.reload();
    }
  } catch (error) {
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
  yield takeLatest(REQUEST_LOGOUT, logoutProcess);
}

function* authSaga() {
  yield all([fork(watchLogin), fork(watchCheckLogin), fork(watchLogout)]);
}

export default authSaga;
