import { all, call, fork, takeLatest, put } from 'redux-saga/effects';

import {
  failureGetAutoMessage,
  failureGetSmsCount,
  failureModifySmsCount,
  failureRemoveAutoMessage,
  failureSetUsedAutoMessage,
  requestGetAutoMessage,
  requestGetSmsCount,
  requestModifySmsCount,
  requestRemoveAutoMessage,
  requestSetUsedAutoMessage,
  REQUEST_GET_AUTO_MESSAGE,
  REQUEST_GET_SMS_COUNT,
  REQUEST_MODIFY_SMS_COUNT,
  REQUEST_REMOVE_AUTO_MESSAGE,
  REQUEST_SET_USED_AUTO_MESSAGE,
  successGetAutoMessage,
  successGetSmsCount,
  successModifySmsCount,
  successRemoveAutoMessage,
  successSetUsedAutoMessage,
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

function* removeAutoMessageProcess(
  action: ReturnType<typeof requestRemoveAutoMessage>,
) {
  try {
    const { id } = action.payload;

    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSMessage.removeAutoMessage,
      id,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successRemoveAutoMessage());

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveAutoMessage(error_msg));
  } catch (error) {
    yield put(failureRemoveAutoMessage(error.message));
  }
}

function* setUsedAutoMessageProcess(
  action: ReturnType<typeof requestSetUsedAutoMessage>,
) {
  try {
    const { id, use_yn } = action.payload;

    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSMessage.setUsedAutoMessage,
      id,
      use_yn,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successSetUsedAutoMessage(action.payload));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureSetUsedAutoMessage(error_msg));
  } catch (error) {
    yield put(failureSetUsedAutoMessage(error.message));
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

function* watchRemoveAutoMessage() {
  yield takeLatest(REQUEST_REMOVE_AUTO_MESSAGE, removeAutoMessageProcess);
}

function* watchSetUsedAutoMessage() {
  yield takeLatest(REQUEST_SET_USED_AUTO_MESSAGE, setUsedAutoMessageProcess);
}

function* messageSaga() {
  yield all([
    fork(watchGetAutoMessage),
    fork(watchGetSmsCount),
    fork(watchModifySmsCount),
    fork(watchRemoveAutoMessage),
    fork(watchSetUsedAutoMessage),
  ]);
}

export default messageSaga;
