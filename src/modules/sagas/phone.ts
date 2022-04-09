import { all, call, fork, takeLatest, put } from 'redux-saga/effects';

import {
  failureGetPhoneInfo,
  failureGetPlanByTelecom,
  failureGetTelecom,
  requestGetPhoneInfo,
  requestGetPlanByTelecom,
  requestGetTelecom,
  REQUEST_GET_PHONE_INFO,
  REQUEST_GET_PLAN_BY_TELECOM,
  REQUEST_GET_TELECOM,
  successGetPhoneInfo,
  successGetPlanByTelecom,
  successGetTelecom,
} from 'modules/actions/phone';
import ZMSPhone from 'lib/api/zms/phone';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';

function* getPhoneInfoProcess(action: ReturnType<typeof requestGetPhoneInfo>) {
  const { number } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSPhone.getPhoneInfo,
      number,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successGetPhoneInfo(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetPhoneInfo(error_msg));
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetPhoneInfo(message));
  }
}

function* getPlanByTelecomProcess(
  action: ReturnType<typeof requestGetPlanByTelecom>,
) {
  const { telecom } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSPhone.getPlanByTelcom,
      telecom,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successGetPlanByTelecom(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetPlanByTelecom(error_msg));
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetPlanByTelecom(message));
  }
}

function* getTelecomProcess(action: ReturnType<typeof requestGetTelecom>) {
  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSPhone.getTelecom,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successGetTelecom(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetTelecom(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetTelecom(message));
  }
}

function* watchGetPhoneInfo() {
  yield takeLatest(REQUEST_GET_PHONE_INFO, getPhoneInfoProcess);
}

function* watchGetPlanByTelecom() {
  yield takeLatest(REQUEST_GET_PLAN_BY_TELECOM, getPlanByTelecomProcess);
}

function* watchGetTelecom() {
  yield takeLatest(REQUEST_GET_TELECOM, getTelecomProcess);
}

function* phoneSaga() {
  yield all([
    fork(watchGetPhoneInfo),
    fork(watchGetPlanByTelecom),
    fork(watchGetTelecom),
  ]);
}

export default phoneSaga;
