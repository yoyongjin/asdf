import { all, call, fork, takeLatest, put } from 'redux-saga/effects';

import {
  failureAddAutoMessage,
  failureGetAutoMessage,
  failureGetSmsCount,
  failureModifySmsCount,
  failureRemoveAutoMessage,
  failureSetUsedAutoMessage,
  requestAddAutoMessage,
  requestGetAutoMessage,
  requestGetSmsCount,
  requestModifyAutoMessage,
  requestModifySmsCount,
  requestRemoveAutoMessage,
  requestSetUsedAutoMessage,
  REQUEST_ADD_AUTO_MESSAGE,
  REQUEST_GET_AUTO_MESSAGE,
  REQUEST_GET_SMS_COUNT,
  REQUEST_MODIFY_AUTO_MESSAGE,
  REQUEST_MODIFY_SMS_COUNT,
  REQUEST_REMOVE_AUTO_MESSAGE,
  REQUEST_SET_USED_AUTO_MESSAGE,
  successAddAutoMessage,
  successGetAutoMessage,
  successGetSmsCount,
  successModifyAutoMessage,
  successModifySmsCount,
  successRemoveAutoMessage,
  successSetUsedAutoMessage,
} from 'modules/actions/message';
import ZMSMessage from 'lib/api/zms/message';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { ANSWER_VALUE, API_FETCH } from 'utils/constants';
import Toast from 'utils/toast';

function* addAutoMessageProcess(
  action: ReturnType<typeof requestAddAutoMessage>,
) {
  const {
    branch_id,
    content,
    days,
    end_date,
    end_time,
    start_date,
    start_time,
    title,
  } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSMessage.addAutoMessage,
    branch_id,
    title,
    content,
    start_date,
    end_date,
    start_time,
    end_time,
    days,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successAddAutoMessage());

    Toast.success('추가 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureAddAutoMessage(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getAutoMessageProcess(
  action: ReturnType<typeof requestGetAutoMessage>,
) {
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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getSmsCountProcess(action: ReturnType<typeof requestGetSmsCount>) {
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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* modifyAutoMessageProcess(
  action: ReturnType<typeof requestModifyAutoMessage>,
) {
  const {
    id,
    branch_id,
    content,
    days,
    end_date,
    end_time,
    start_date,
    start_time,
    title,
  } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSMessage.modifyAutoMessage,
    id,
    branch_id,
    title,
    content,
    start_date,
    end_date,
    start_time,
    end_time,
    days,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successModifyAutoMessage());

    Toast.success('수정 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureAddAutoMessage(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* modifySmsCountProcess(
  action: ReturnType<typeof requestModifySmsCount>,
) {
  const { branch_id, max_count_date, max_count_month } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSMessage.modifySmsCount,
    branch_id,
    max_count_date,
    max_count_month,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successModifySmsCount(action.payload));

    Toast.success('수정 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureModifySmsCount(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* removeAutoMessageProcess(
  action: ReturnType<typeof requestRemoveAutoMessage>,
) {
  const { id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSMessage.removeAutoMessage,
    id,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successRemoveAutoMessage());

    Toast.success('삭제 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureRemoveAutoMessage(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* setUsedAutoMessageProcess(
  action: ReturnType<typeof requestSetUsedAutoMessage>,
) {
  const { id, use_yn } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSMessage.setUsedAutoMessage,
    id,
    use_yn,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successSetUsedAutoMessage(action.payload));

    const message =
      use_yn.toLocaleUpperCase() === ANSWER_VALUE.YES
        ? '활성화 완료😊'
        : '비활성화 완료😊';
    Toast.success(message);

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureSetUsedAutoMessage(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* watchAddAutoMessage() {
  yield takeLatest(REQUEST_ADD_AUTO_MESSAGE, addAutoMessageProcess);
}

function* watchGetAutoMessage() {
  yield takeLatest(REQUEST_GET_AUTO_MESSAGE, getAutoMessageProcess);
}

function* watchGetSmsCount() {
  yield takeLatest(REQUEST_GET_SMS_COUNT, getSmsCountProcess);
}

function* watchModifyAutoMessage() {
  yield takeLatest(REQUEST_MODIFY_AUTO_MESSAGE, modifyAutoMessageProcess);
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
    fork(watchAddAutoMessage),
    fork(watchGetAutoMessage),
    fork(watchGetSmsCount),
    fork(watchModifyAutoMessage),
    fork(watchModifySmsCount),
    fork(watchRemoveAutoMessage),
    fork(watchSetUsedAutoMessage),
  ]);
}

export default messageSaga;
