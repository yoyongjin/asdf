import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import ZMSBatch from 'lib/api/zms/batch';

import { ResponseSuccessData, ResponseFailureData } from 'types/common';
import { API_FETCH } from 'utils/constants';
import Toast from 'utils/toast';
import {
  failureSyncBranchUser,
  failureSyncIP,
  failureSyncKSVC,
  failureSyncPhoneInfo,
  requestSyncBranchUser,
  requestSyncIP,
  requestSyncKSVC,
  requestSyncPhoneInfo,
  REQUEST_SYNC_BRANCH_USER,
  REQUEST_SYNC_IP,
  REQUEST_SYNC_KSVC,
  REQUEST_SYNC_PHONE_INFO,
  successSyncBranchUser,
  successSyncIP,
  successSyncKSVC,
  successSyncPhoneInfo,
} from 'modules/actions/batch';

function* syncBranchUserProcess(
  action: ReturnType<typeof requestSyncBranchUser>,
) {
  Toast.notification('잠시만 기다려주세요..🙄');

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSBatch.syncBranchUser,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (data) {
      yield put(successSyncBranchUser());

      Toast.success('처리 완료😊');

      return;
    }

    yield put(failureSyncBranchUser(''));

    Toast.error('처리에 실패했어요..😭');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureSyncBranchUser(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* syncKSVCProcess(action: ReturnType<typeof requestSyncKSVC>) {
  Toast.notification('잠시만 기다려주세요..🙄');

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSBatch.syncKSVC,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (data) {
      yield put(successSyncKSVC());

      Toast.success('처리 완료😊');

      return;
    }

    yield put(failureSyncKSVC(''));

    Toast.error('처리에 실패했어요..😭');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureSyncKSVC(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* syncIPProcess(action: ReturnType<typeof requestSyncIP>) {
  Toast.notification('잠시만 기다려주세요..🙄');

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSBatch.syncIP,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (data) {
      yield put(successSyncIP());

      Toast.success('처리 완료😊');

      return;
    }

    yield put(failureSyncIP(''));

    Toast.error('처리에 실패했어요..😭');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureSyncIP(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* syncPhoneInfoProcess(
  action: ReturnType<typeof requestSyncPhoneInfo>,
) {
  Toast.notification('잠시만 기다려주세요..🙄');

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSBatch.syncPhoneInfo,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (data) {
      yield put(successSyncPhoneInfo());

      Toast.success('처리 완료😊');

      return;
    }

    yield put(failureSyncPhoneInfo(''));

    Toast.error('처리에 실패했어요..😭');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureSyncPhoneInfo(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* watchSyncBranchUser() {
  yield takeLatest(REQUEST_SYNC_BRANCH_USER, syncBranchUserProcess);
}

function* watchSyncKSVC() {
  yield takeLatest(REQUEST_SYNC_KSVC, syncKSVCProcess);
}

function* watchSyncIP() {
  yield takeLatest(REQUEST_SYNC_IP, syncIPProcess);
}

function* watchSyncPhoneInfo() {
  yield takeLatest(REQUEST_SYNC_PHONE_INFO, syncPhoneInfoProcess);
}

function* batchSaga() {
  yield all([
    fork(watchSyncBranchUser),
    fork(watchSyncKSVC),
    fork(watchSyncIP),
    fork(watchSyncPhoneInfo),
  ]);
}

export default batchSaga;
