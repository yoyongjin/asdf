import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { ResponseSuccessData, ResponseFailureData } from 'types/common';
import {
  failureGetCallStatisticsByConsultant,
  failureGetStatistics,
  requestGetCallStatisticsByConsultant,
  requestGetStatistics,
  REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT,
  REQUEST_GET_STATISTICS,
  successGetCallStatisticsByConsultant,
  successGetStatistics,
} from 'modules/actions/statistics';
import ZMSStatistics from 'lib/api/zms/statistics';
import { API_FETCH } from 'utils/constants';

function* getStatisticsProcess(
  action: ReturnType<typeof requestGetStatistics>,
) {
  const { start_date, end_date, search_text, search_type } = action.payload;

  try {
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

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetStatistics(message));
  }
}

function* getCallStatisticsByConsultantProcess(
  action: ReturnType<typeof requestGetCallStatisticsByConsultant>,
) {
  const {
    end_date,
    end_time,
    ids,
    include_leaver,
    page,
    page_count,
    search_type,
    start_date,
    start_time,
  } = action.payload;

  try {
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
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;
      // const { stat } = data;
      console.log(data);

      yield put(successGetCallStatisticsByConsultant(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetCallStatisticsByConsultant(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetCallStatisticsByConsultant(message));
  }
}

function* watchGetCallStatisticsByConsultant() {
  yield takeLatest(
    REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT,
    getCallStatisticsByConsultantProcess,
  );
}

function* watchGetStatistics() {
  yield takeLatest(REQUEST_GET_STATISTICS, getStatisticsProcess);
}

function* authSaga() {
  yield all([
    fork(watchGetStatistics),
    fork(watchGetCallStatisticsByConsultant),
  ]);
}

export default authSaga;
