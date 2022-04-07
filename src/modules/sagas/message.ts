import { all, call, fork, takeLatest, put } from 'redux-saga/effects';

import {
  failureGetAutoMessage,
  failureGetSmsCount,
  failureModifySmsCount,
  requestGetAutoMessage,
  requestGetSmsCount,
  requestModifySmsCount,
  REQUEST_GET_AUTO_MESSAGE,
  REQUEST_GET_SMS_COUNT,
  REQUEST_MODIFY_SMS_COUNT,
  successGetAutoMessage,
  successGetSmsCount,
  successModifySmsCount,
} from 'modules/actions/message';
import ZMSMessage from 'lib/api/zms/message';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';

function* getAutoMessageProcess(
  action: ReturnType<typeof requestGetAutoMessage>,
) {
  try {
    const { count, id, page } = action.payload;
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSMessage.getAutoMessage,
      id,
      page,
      count,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successGetAutoMessage(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetAutoMessage(error_msg));
  } catch (error) {
    yield put(failureGetAutoMessage(error.message));
  }
}

function* getSmsCountProcess(action: ReturnType<typeof requestGetSmsCount>) {
  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSMessage.getSmsCount,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successGetSmsCount(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetSmsCount(error_msg));
  } catch (error) {
    yield put(failureGetSmsCount(error.message));
  }
}

function* modifySmsCountProcess(
  action: ReturnType<typeof requestModifySmsCount>,
) {
  try {
    const { branch_id, max_count_date, max_count_mouth } = action.payload;
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSMessage.modifySmsCount,
      branch_id,
      max_count_date,
      max_count_mouth,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successModifySmsCount());

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureModifySmsCount(error_msg));
  } catch (error) {
    yield put(failureModifySmsCount(error.message));
  }
}

function* watchGetAutoMessage() {
  yield takeLatest(REQUEST_GET_AUTO_MESSAGE, getAutoMessageProcess);
}

function* watchGetSmsCount() {
  yield takeLatest(REQUEST_GET_SMS_COUNT, getSmsCountProcess);
}

function* watchModifySmsCount() {
  yield takeLatest(REQUEST_MODIFY_SMS_COUNT, modifySmsCountProcess);
}

function* messageSaga() {
  yield all([
    fork(watchGetAutoMessage),
    fork(watchGetSmsCount),
    fork(watchModifySmsCount),
  ]);
}

export default messageSaga;
