import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

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
// import MonitorOcx from 'lib/monitorOcx';
import Socket from 'lib/socket';
// import Zibox from 'lib/zibox';
// import Zibox from 'lib/zibox';
import constants, {
  API_FETCH_TYPE,
  ROUTER_TYPE,
  SOCKET_EVENT_TYPE,
} from 'utils/constants';
import Cookie from 'utils/cookie';
import Logger from 'utils/log';
import Communicator from 'lib/communicator';

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password, history } = action.payload;

  try {
    const response = yield call(API.login, id, password);
    const { status, data } = response.data;
    Logger.log('Login Data => ', data);

    if (status === API_FETCH_TYPE.SUCCESS) {
      const { user, token } = data;
      // MonitorOcx.getInstance().connect(user.id);
      // Zibox.getInstance().connect(options);
      Communicator.create();
      Socket.getInstance()
        .url(constants.SOCKET_SERVER!)
        .onEmit(SOCKET_EVENT_TYPE.INITIALIZE, { user_id: user.id });
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
  const { history } = action.payload;

  const token = Cookie.getCookie(constants.COOKIE_NAME) as string;
  API.setHeader(token);

  try {
    const response = yield call(API.checkLogin);
    const { status, data } = response.data;
    Logger.log('Check Login Data => ', data);

    if (status === API_FETCH_TYPE.SUCCESS) {
      const { user, token } = data;
      // MonitorOcx.getInstance().connect(user.id);

      Communicator.create();
      Cookie.setCookie(constants.COOKIE_NAME, token);
      API.setHeader(token);

      yield put(successCheckLogin(user));

      history!.push(history!.location.pathname);
    }
  } catch (error) {
    Logger.log('Check Login Failure', error);
    yield put(failureCheckLogin(error.message));
    history!.push(ROUTER_TYPE.LOGIN);
  }
}

function* logoutProcess(action: ReturnType<typeof requestLogout>) {
  const { history } = action.payload;

  try {
    const response = yield call(API.logout);
    const { status, data } = response.data;
    Logger.log('Logout Data => ', data);

    if (status === 'success') {
      const { data: isSuccess } = data;

      // MonitorOcx.getInstance().disconnect();

      Cookie.removeCookie(constants.COOKIE_NAME);
      yield put(successLogout());

      history!.push(ROUTER_TYPE.LOGIN);
      // window.location.reload();
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
