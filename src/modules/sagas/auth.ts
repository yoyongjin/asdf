import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import {
  requestLogin,
  REQUEST_LOGIN,
  successLogin,
  failureLogin,
  requestCheckLogin,
  REQUEST_CHECK_LOGIN,
  successCheckLogin,
  failureCheckLogin,
  requestLogout,
  REQUEST_LOGOUT,
  successLogout,
  failureLogout,
} from 'modules/actions/auth';
import * as API from 'lib/api';
import Socket from 'lib/socket';
import Zibox from 'lib/zibox';
import { socketServer, TOKEN_NAME, DOMAIN } from 'utils/constants';
import Logger from 'utils/log';

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password, history } = action.payload;

  try {
    const response = yield call(API.login, id, password);
    const { status, data } = response.data;

    if (status === 'success') {
      Socket.getInstance().url(socketServer!).onEmit('initialize');
      Zibox.getInstance().createZibox();

      const { user, token } = data;
      Logger.log('Login data => ', user);

      Cookies.set(TOKEN_NAME, token, {
        expires: 1000 * 24 * 60 * 60,
      });
      API.instance.defaults.headers.common['token'] = token;

      yield put(successLogin(user));

      history!.push('/main');
    }
  } catch (error) {
    Logger.log('Login failure', error);
    yield put(failureLogin(error.message));
    alert('아이디와 비밀번호를 확인해주세요.');
  }
}

function* checkLoginProcess(action: ReturnType<typeof requestCheckLogin>) {
  API.instance.defaults.headers.common['token'] = Cookies.get(TOKEN_NAME);
  const { history } = action.payload;

  try {
    const response = yield call(API.checkLogin);
    const { status, data } = response.data;

    if (status === 'success') {
      Socket.getInstance().url(socketServer!).onEmit('initialize');
      Zibox.getInstance().createZibox();

      const { user, token } = data;
      Logger.log('Login data => ', user);

      Cookies.set(TOKEN_NAME, token, {
        expires: 1000 * 24 * 60 * 60,
      });
      API.instance.defaults.headers.common['token'] = token;

      yield put(successCheckLogin(user));

      history!.push(history!.location.pathname);
    }
  } catch (error) {
    Logger.log('Check login failure', error);
    yield put(failureCheckLogin(error.message));
    history!.push('/auth/login');
  }
}

function* logoutProcess(action: ReturnType<typeof requestLogout>) {
  const { history } = action.payload;

  try {
    const response = yield call(API.logout);
    const { status, data } = response.data;

    if (status === 'success') {
      const { data: isSuccess } = data;
      Logger.log('Logout data => ', isSuccess);

      Cookies.remove(TOKEN_NAME);
      yield put(successLogout());

      history!.push('/auth/login');
      window.location.reload();
    }
  } catch (error) {
    Logger.log('Logout failure', error);
    yield put(failureLogout(error.message));
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
