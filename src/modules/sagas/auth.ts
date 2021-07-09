import { History } from 'history';
import {
  all,
  call,
  fork,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects';

import ZMSAuth from 'lib/api/zms/auth';
import ZMSMain from 'lib/api/zms/main';
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
import { ResponseSuccessData, ResponseFailureData } from 'types/common';
import { API_FETCH, ROUTER_TYPE } from 'utils/constants';

function* loginProcess(action: ReturnType<typeof requestLogin>) {
  const { id, password } = action.payload;
  const history: History = yield getContext('history');

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSAuth.login,
      id,
      password,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;
      const { user, token } = data;

      // 소켓 연결
      Communicator.getInstance().connectSocket(user.id);

      // 쿠키 설정
      ZMSMain.setAccessToken(token);

      yield put(successLogin(user));

      history.push(ROUTER_TYPE.MONIT);

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureLogin(error_msg));

    alert(error_msg);
  } catch (error) {
    yield put(failureLogin(error.message));
  }
}

function* checkLoginProcess(action: ReturnType<typeof requestCheckLogin>) {
  const history: History = yield getContext('history');

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSAuth.autoLogin,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;
      const { user, token } = data;

      // 소켓 연결
      Communicator.getInstance().connectSocket(user.id);

      // 쿠키 설정
      ZMSMain.setAccessToken(token);

      yield put(successCheckLogin(user));

      history!.push(ROUTER_TYPE.MONIT);

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureCheckLogin(error_msg));

    alert(error_msg);

    history.push(ROUTER_TYPE.LOGIN);
  } catch (error) {
    yield put(failureCheckLogin(error.message));
    history.push(ROUTER_TYPE.LOGIN);
    ZMSMain.removeAccessToken();
  }
}

function* logoutProcess(action: ReturnType<typeof requestLogout>) {
  const history: History = yield getContext('history');

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSAuth.logout,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      if (data) {
        yield put(successLogout());

        // 쿠키 제거
        ZMSMain.removeAccessToken();

        history.push(ROUTER_TYPE.LOGIN);

        // 데이터를 비우기 위해 강제 새로고침 (개선 요망)
        window.location.reload();
      }

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureCheckLogin(error_msg));

    alert(error_msg);
  } catch (error) {
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
