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
  requestChangePassword,
  successChangePassword,
  failureChangePassword,
  REQUEST_CHANGE_PASSWORD,
} from 'modules/actions/auth';
import { ResponseSuccessData, ResponseFailureData } from 'types/common';
import { API_FETCH, ROUTER_TYPE } from 'utils/constants';
import Toast from 'utils/toast';

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

      yield put(successLogin(user));

      // 쿠키 설정
      ZMSMain.setAccessToken(token);

      if (user.is_init_password) {
        alert('초기 비밀번호이므로 변경해주시기 바랍니다.');
        history.push(ROUTER_TYPE.CHANGE_PASSWORD);

        return;
      } else if (user.is_expired_password) {
        alert('비밀번호가 만료되어 변경해주시기 바랍니다.');
        history.push(ROUTER_TYPE.CHANGE_PASSWORD);

        return;
      }

      // 소켓 연결
      Communicator.getInstance().connectSocket(user.id);

      history.push(ROUTER_TYPE.MONIT);

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureLogin(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureLogin(message));

    Toast.error('요청에 실패했어요..😭');
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

      yield put(successCheckLogin(user));

      // 쿠키 설정
      ZMSMain.setAccessToken(token);

      if (user.is_init_password) {
        alert('초기 비밀번호이므로 변경해주시기 바랍니다.');
        history.push(ROUTER_TYPE.CHANGE_PASSWORD);

        return;
      } else if (user.is_expired_password) {
        alert('비밀번호가 만료되어 변경해주시기 바랍니다.');
        history.push(ROUTER_TYPE.CHANGE_PASSWORD);

        return;
      }

      // 소켓 연결
      Communicator.getInstance().connectSocket(user.id);

      history!.push(ROUTER_TYPE.MONIT);

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureCheckLogin(error_msg));

    if (error_msg !== 'No token provided') {
      // 개선 요망
      Toast.error('요청에 실패했어요..😭');
    }

    history.push(ROUTER_TYPE.LOGIN);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureCheckLogin(message));
    history.push(ROUTER_TYPE.LOGIN);
    ZMSMain.removeAccessToken();

    Toast.error('요청에 실패했어요..😭');
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

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureLogout(message));

    Toast.error('요청에 실패했어요..😭');
  }
}

function* changePasswordProcess(
  action: ReturnType<typeof requestChangePassword>,
) {
  const { current_password, new_password, new_confirm_password } =
    action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSAuth.changePassword,
      current_password,
      new_password,
      new_confirm_password,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      if (data) {
        yield put(successChangePassword());

        alert('다시 로그인해주세요.');
        yield put(requestLogout());
      }

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureChangePassword(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureChangePassword(message));

    Toast.error('요청에 실패했어요..😭');
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

function* watchChangePassword() {
  yield takeLatest(REQUEST_CHANGE_PASSWORD, changePasswordProcess);
}

function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchCheckLogin),
    fork(watchLogout),
    fork(watchChangePassword),
  ]);
}

export default authSaga;
