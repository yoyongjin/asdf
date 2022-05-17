import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects';

import {
  failureGetPhoneHist,
  failureGetPhoneInfo,
  failureGetPhones,
  failureGetPlanByTelecom,
  failureGetTelecom,
  failureModifyPhoneInfo,
  failureRemovePhoneInfo,
  requestGetPhoneHist,
  requestGetPhoneInfo,
  requestGetPhones,
  requestGetPlanByTelecom,
  requestGetTelecom,
  requestModifyPhoneInfo,
  requestRemovePhoneInfo,
  REQUEST_GET_PHONES,
  REQUEST_GET_PHONE_HIST,
  REQUEST_GET_PHONE_INFO,
  REQUEST_GET_PLAN_BY_TELECOM,
  REQUEST_GET_TELECOM,
  REQUEST_MODIFY_PHONE_INFO,
  REQUEST_REMOVE_PHONE_INFO,
  successGetAllPhoneHist,
  successGetAllPhones,
  successGetPhoneHist,
  successGetPhoneInfo,
  successGetPhones,
  successGetPlanByTelecom,
  successGetTelecom,
  successModifyPhoneInfo,
  successRemovePhoneInfo,
} from 'modules/actions/phone';
import ZMSPhone from 'lib/api/zms/phone';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';
import Toast from 'utils/toast';
import { setExcelDownloadStatus } from 'modules/actions/statistics';

function* getPhonesProcess(action: ReturnType<typeof requestGetPhones>) {
  const { is_match, isExcel, page, page_count, search_text } = action.payload;

  Toast.notification('잠시만 기다려주세요..🙄');

  if (isExcel) {
    yield put(setExcelDownloadStatus(true));
    yield delay(500);
    Toast.notification('최대 2분 정도 소요됩니다..😊');
  }

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSPhone.getPhones,
    is_match,
    page,
    page_count,
    isExcel,
    search_text,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (isExcel) {
      yield put(successGetAllPhones());

      Toast.notification('엑셀 만들기를 시작합니다..😊');

      return;
    }

    yield put(successGetPhones(data));

    if (data.cnt < 1) {
      Toast.warning('데이터가 없습니다🙄');
    } else {
      Toast.success('가져오기 완료😊');
    }

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetPhones(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getPhoneInfoProcess(action: ReturnType<typeof requestGetPhoneInfo>) {
  const { number } = action.payload;

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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getPlanByTelecomProcess(
  action: ReturnType<typeof requestGetPlanByTelecom>,
) {
  const { telecom } = action.payload;

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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getTelecomProcess(action: ReturnType<typeof requestGetTelecom>) {
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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* modifyPhoneInfoProcess(
  action: ReturnType<typeof requestModifyPhoneInfo>,
) {
  const { id, number, plan, telecom, used } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSPhone.modifyPhoneInfo,
    id,
    number,
    telecom,
    plan,
    used,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successModifyPhoneInfo());

    Toast.success('수정 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureModifyPhoneInfo(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* removePhoneInfoProcess(
  action: ReturnType<typeof requestRemovePhoneInfo>,
) {
  const { id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSPhone.removePhoneInfo,
    id,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successRemovePhoneInfo());

    Toast.success('삭제 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureRemovePhoneInfo(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getPhoneHistProcess(action: ReturnType<typeof requestGetPhoneHist>) {
  const { id, isExcel, page, page_count } = action.payload;

  Toast.notification('잠시만 기다려주세요..🙄');

  if (isExcel) {
    yield put(setExcelDownloadStatus(true));
    yield delay(500);
    Toast.notification('최대 2분 정도 소요됩니다..😊');
  }

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSPhone.getPhoneHist,
    id,
    page,
    page_count,
    isExcel,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (isExcel) {
      yield put(successGetAllPhoneHist());

      Toast.notification('엑셀 만들기를 시작합니다..😊');

      return;
    }

    yield put(successGetPhoneHist(data));

    if (data.cnt < 1) {
      Toast.warning('데이터가 없습니다🙄');
    } else {
      Toast.success('가져오기 완료😊');
    }

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetPhoneHist(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* watchGetPhones() {
  yield takeLatest(REQUEST_GET_PHONES, getPhonesProcess);
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

function* watchModifyPhoneInfo() {
  yield takeLatest(REQUEST_MODIFY_PHONE_INFO, modifyPhoneInfoProcess);
}

function* watchRemovePhoneInfo() {
  yield takeLatest(REQUEST_REMOVE_PHONE_INFO, removePhoneInfoProcess);
}

function* watchGetPhoneHist() {
  yield takeLatest(REQUEST_GET_PHONE_HIST, getPhoneHistProcess);
}

function* phoneSaga() {
  yield all([
    fork(watchGetPhones),
    fork(watchGetPhoneInfo),
    fork(watchGetPlanByTelecom),
    fork(watchGetTelecom),
    fork(watchModifyPhoneInfo),
    fork(watchRemovePhoneInfo),
    fork(watchGetPhoneHist),
  ]);
}

export default phoneSaga;
