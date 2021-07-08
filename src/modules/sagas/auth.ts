import {
  all,
  call,
  fork,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects';

import * as API from 'lib/api';
import Communicator from 'lib/communicator';
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
import constants, { API_FETCH, ROUTER_TYPE } from 'utils/constants';
import Cookie from 'utils/cookie';
import Logger from 'utils/log';
import { ResponseType } from 'types/common';

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password } = action.payload;

  const history = yield getContext('history');
  try {
    const response = yield call(API.login, id, password);

    const { status, data } = response.data as ResponseType;
    Logger.log('Login Data => ', data);

    if (status === API_FETCH.SUCCESS) {
      const { user, token } = data;
      Communicator.getInstance().connectSocket(user.id);
      Cookie.setCookie(constants.COOKIE_NAME, token);
      API.setHeader(token);

      yield put(successLogin(user));

      history!.push(ROUTER_TYPE.MONIT);
    }
  } catch (error) {
    Logger.log('Login Failure', error);
    yield put(failureLogin(error.message));

    if (error.message.indexOf('400') > -1) {
      alert('아이디와 비밀번호를 확인해주세요.');
    } else if (error.message.indexOf('403') > -1) {
      alert('이미 로그인 중입니다.');
    }
  }
}

function* checkLoginProcess(action: ReturnType<typeof requestCheckLogin>) {
  const history = yield getContext('history');

  const preToken = Cookie.getCookie(constants.COOKIE_NAME) as string;
  API.setHeader(preToken);

  try {
    const response = yield call(API.checkLogin);
    const { status, data } = response.data;
    Logger.log('Check Login Data => ', data);

    if (status === API_FETCH.SUCCESS) {
      const { user, token: newToken } = data;
      Communicator.getInstance().connectSocket(user.id);
      Cookie.setCookie(constants.COOKIE_NAME, newToken);
      API.setHeader(newToken);

      yield put(successCheckLogin(user));
      history!.push('/main');
    }
  } catch (error) {
    Logger.log('Check Login Failure', error);
    yield put(failureCheckLogin(error.message));
    history!.push(ROUTER_TYPE.LOGIN);
    Cookie.removeCookie(constants.COOKIE_NAME);
  }
}

function* logoutProcess(action: ReturnType<typeof requestLogout>) {
  const history = yield getContext('history');

  try {
    const response = yield call(API.logout);
    const { status, data } = response.data;
    Logger.log('Logout Data => ', data);

    if (status === 'success') {
      if (data) {
        Cookie.removeCookie(constants.COOKIE_NAME);
        yield put(successLogout());
        history!.push(ROUTER_TYPE.LOGIN);
        window.location.reload();
      }
      // MonitorOcx.getInstance().disconnect();
    }
  } catch (error) {
    Logger.log('Logout Failure', error);
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
