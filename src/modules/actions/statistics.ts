import { createAction } from 'typesafe-actions';

import {
  IRequestGetAutoMessageStatistics,
  IRequestGetCallStatisticsByConsultant,
  IRequestGetMessageStatistics,
  IResponseGetAutoMessageStatistics,
  IResponseGetCallStatisticsByConsultant,
  IResponseGetMessageStatistics,
  RequestGetStatistics,
  StatisticsData,
} from 'types/statistics';

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

// v2 상담원별 통화 통계 가져오기
export const REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT =
  'REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT';
export const SUCCESS_GET_CALL_STATISTICS_BY_CONSULTANT =
  'SUCCESS_GET_CALL_STATISTICS_BY_CONSULTANT';
export const FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT =
  'FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT';

// v2 상담원별 통화 통계 가져오기 Action
export const requestGetCallStatisticsByConsultant = createAction(
  REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT,
)<IRequestGetCallStatisticsByConsultant>();
export const successGetCallStatisticsByConsultant = createAction(
  SUCCESS_GET_CALL_STATISTICS_BY_CONSULTANT,
)<IResponseGetCallStatisticsByConsultant>();
export const failureGetCallStatisticsByConsultant = createAction(
  FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT,
)<string>();

// v2 자동 문자 통계 가져오기
export const REQUEST_GET_AUTO_MESSAGE_STATISTICS =
  'REQUEST_GET_AUTO_MESSAGE_STATISTICS';
export const SUCCESS_GET_AUTO_MESSAGE_STATISTICS =
  'SUCCESS_GET_AUTO_MESSAGE_STATISTICS';
export const FAILURE_GET_AUTO_MESSAGE_STATISTICS =
  'FAILURE_GET_AUTO_MESSAGE_STATISTICS';

// v2 자동 문자 통계 가져오기 Action
export const requestGetAutoMessageStatistics = createAction(
  REQUEST_GET_AUTO_MESSAGE_STATISTICS,
)<IRequestGetAutoMessageStatistics>();
export const successGetAutoMessageStatistics = createAction(
  SUCCESS_GET_AUTO_MESSAGE_STATISTICS,
)<IResponseGetAutoMessageStatistics>();
export const failureGetAutoMessageStatistics = createAction(
  FAILURE_GET_AUTO_MESSAGE_STATISTICS,
)<string>();

// v2 문자 통계 가져오기
export const REQUEST_GET_MESSAGE_STATISTICS = 'REQUEST_GET_MESSAGE_STATISTICS';
export const SUCCESS_GET_MESSAGE_STATISTICS = 'SUCCESS_GET_MESSAGE_STATISTICS';
export const FAILURE_GET_MESSAGE_STATISTICS = 'FAILURE_GET_MESSAGE_STATISTICS';

// v2 문자 통계 가져오기 Action
export const requestGetMessageStatistics = createAction(
  REQUEST_GET_MESSAGE_STATISTICS,
)<IRequestGetMessageStatistics>();
export const successGetMessageStatistics = createAction(
  SUCCESS_GET_MESSAGE_STATISTICS,
)<IResponseGetMessageStatistics>();
export const failureGetMessageStatistics = createAction(
  FAILURE_GET_MESSAGE_STATISTICS,
)<string>();

// v2 상담원별 통화 통계 데이터 초기화하기
export const SET_INITIALIZE_CALL_STATISTICS_BY_CONSULTANT =
  'SET_INITIALIZE_CALL_STATISTICS_BY_CONSULTANT';

// v2 상담원별 통계 데이터 초기화하기 Action
export const setInitializeCallStatisticsByConsultant = createAction(
  SET_INITIALIZE_CALL_STATISTICS_BY_CONSULTANT,
)();

// v2 자동 문자 통계 데이터 초기화하기
export const SET_INITIALIZE_AUTO_MESSAGE_STATISTICS =
  'SET_INITIALIZE_AUTO_MESSAGE_STATISTICS';

// v2 자동 문자 통계 데이터 초기화하기 Action
export const setInitializeAutoMessageStatistics = createAction(
  SET_INITIALIZE_AUTO_MESSAGE_STATISTICS,
)();

// v2 문자 통계 데이터 초기화하기
export const SET_INITIALIZE_MESSAGE_STATISTICS =
  'SET_INITIALIZE_MESSAGE_STATISTICS';

// v2 문자 통계 데이터 초기화하기 Action
export const setInitializeMessageStatistics = createAction(
  SET_INITIALIZE_MESSAGE_STATISTICS,
)();
