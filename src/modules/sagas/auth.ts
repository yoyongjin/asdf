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

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password, history } = action.payload;

  try {
    const response = yield call(API.login, id, password);
    const { status, data } = response.data;

    if (status === 'success') {
      Socket.getInstance().url(socketServer!).onEmit('initialize');
      Zibox.getInstance().createZibox();

      const { user, token } = data;
      console.log('Login Data => ', user);

      Cookies.set(TOKEN_NAME, token, {
        expires: 1000 * 24 * 60 * 60,
        domain: DOMAIN,
      });
      API.instance.defaults.headers.common['token'] = token;

      yield put(successLogin(user));

      history!.push('/main');
    }
  } catch (error) {
    console.log(error);
    yield put(failureLogin(error));
    alert('Wrong ID or password.');
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
      console.log('Login Check Data => ', user);

      Cookies.set(TOKEN_NAME, token, {
        expires: 1000 * 24 * 60 * 60,
        domain: DOMAIN,
      });
      API.instance.defaults.headers.common['token'] = token;

      yield put(successCheckLogin(user));

      history!.push(history!.location.pathname);
    }
  } catch (error) {
    console.log(error);
    yield put(failureCheckLogin(error));
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
      console.log('Logout Data => ', isSuccess);

      Cookies.remove(TOKEN_NAME, { domain: DOMAIN });
      yield put(successLogout());

      history!.push('/auth/login');
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
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
