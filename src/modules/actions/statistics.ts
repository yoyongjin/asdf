import { createAction } from 'typesafe-actions';

import { RequestGetStatistics, StatisticsData } from 'types/statistics';

// 통계 가져오기
export const REQUEST_GET_STATISTICS = 'REQUEST_GET_STATISTICS';
export const SUCCESS_GET_STATISTICS = 'SUCCESS_GET_STATISTICS';
export const FAILURE_GET_STATISTICS = 'FAILURE_GET_STATISTICS';

// 액션함수

// 통계 가져오기
export const requestGetStatistics = createAction(
  REQUEST_GET_STATISTICS,
)<RequestGetStatistics>();
export const successGetStatistics = createAction(SUCCESS_GET_STATISTICS)<
  Array<StatisticsData>
>();
export const failureGetStatistics = createAction(
  FAILURE_GET_STATISTICS,
)<string>();
