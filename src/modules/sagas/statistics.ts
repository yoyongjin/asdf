import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { ResponseSuccessData, ResponseFailureData } from 'types/common';
import {
  failureGetAutoMessageStatistics,
  failureGetCallStatisticsByConsultant,
  failureGetCallStatisticsByTeam,
  failureGetMessageStatistics,
  failureGetStatistics,
  requestGetAutoMessageStatistics,
  requestGetCallStatisticsByConsultant,
  requestGetCallStatisticsByTeam,
  requestGetMessageStatistics,
  requestGetStatistics,
  REQUEST_GET_AUTO_MESSAGE_STATISTICS,
  REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT,
  REQUEST_GET_CALL_STATISTICS_BY_TEAM,
  REQUEST_GET_MESSAGE_STATISTICS,
  REQUEST_GET_STATISTICS,
  successGetAutoMessageStatistics,
  successGetCallStatisticsByConsultant,
  successGetCallStatisticsByTeam,
  successGetMessageStatistics,
  successGetStatistics,
} from 'modules/actions/statistics';
import ZMSStatistics from 'lib/api/zms/statistics';
import { API_FETCH } from 'utils/constants';
import Toast from 'utils/toast';

function* getStatisticsProcess(
  action: ReturnType<typeof requestGetStatistics>,
) {
  const { start_date, end_date, search_text, search_type } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSStatistics.getStatistics,
    start_date,
    end_date,
    search_type,
    search_text,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;
    const { stat } = data;

    yield put(successGetStatistics(stat));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetStatistics(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getCallStatisticsByConsultantProcess(
  action: ReturnType<typeof requestGetCallStatisticsByConsultant>,
) {
  const {
    end_date,
    end_time,
    ids,
    include_leaver,
    isExcel,
    page,
    page_count,
    search_type,
    start_date,
    start_time,
  } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSStatistics.getCallStatisticsByConsultant,
    ids,
    include_leaver,
    start_date,
    end_date,
    start_time,
    end_time,
    search_type,
    page,
    page_count,
    isExcel,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    data.page = page;
    data.limit = page_count;

    yield put(successGetCallStatisticsByConsultant(data));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetCallStatisticsByConsultant(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getCallStatisticsByTeamProcess(
  action: ReturnType<typeof requestGetCallStatisticsByTeam>,
) {
  const {
    end_date,
    end_time,
    ids,
    include_leaver,
    isExcel,
    page,
    page_count,
    search_type,
    start_date,
    start_time,
  } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSStatistics.getCallStatisticsByTeam,
    ids,
    include_leaver,
    start_date,
    end_date,
    start_time,
    end_time,
    search_type,
    page,
    page_count,
    isExcel,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    data.page = page;
    data.limit = page_count;

    yield put(successGetCallStatisticsByTeam(data));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetCallStatisticsByTeam(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getAutoMessageStatisticsProcess(
  action: ReturnType<typeof requestGetAutoMessageStatistics>,
) {
  const {
    end_date,
    ids,
    include_leaver,
    isExcel,
    page,
    page_count,
    start_date,
  } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSStatistics.getAutoMessageStatistics,
    ids,
    include_leaver,
    start_date,
    end_date,
    page,
    page_count,
    isExcel,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    data.page = page;
    data.limit = page_count;

    yield put(successGetAutoMessageStatistics(data));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetAutoMessageStatistics(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getMessageStatisticsProcess(
  action: ReturnType<typeof requestGetMessageStatistics>,
) {
  const {
    end_date,
    ids,
    include_leaver,
    isExcel,
    page,
    page_count,
    start_date,
  } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSStatistics.getMessageStatistics,
    ids,
    include_leaver,
    start_date,
    end_date,
    page,
    page_count,
    isExcel,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successGetMessageStatistics(data));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetMessageStatistics(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* watchGetAutoMessageStatistics() {
  yield takeLatest(
    REQUEST_GET_AUTO_MESSAGE_STATISTICS,
    getAutoMessageStatisticsProcess,
  );
}

function* watchGetCallStatisticsByConsultant() {
  yield takeLatest(
    REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT,
    getCallStatisticsByConsultantProcess,
  );
}

function* watchGetCallStatisticsByTeam() {
  yield takeLatest(
    REQUEST_GET_CALL_STATISTICS_BY_TEAM,
    getCallStatisticsByTeamProcess,
  );
}

function* watchGetStatistics() {
  yield takeLatest(REQUEST_GET_STATISTICS, getStatisticsProcess);
}

function* watchGetMessageStatistics() {
  yield takeLatest(REQUEST_GET_MESSAGE_STATISTICS, getMessageStatisticsProcess);
}

function* authSaga() {
  yield all([
    fork(watchGetStatistics),
    fork(watchGetCallStatisticsByConsultant),
    fork(watchGetCallStatisticsByTeam),
    fork(watchGetAutoMessageStatistics),
    fork(watchGetMessageStatistics),
  ]);
}

export default authSaga;
