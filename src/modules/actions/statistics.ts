import { createAction } from 'typesafe-actions';

import {
  IRequestGetAutoMessageStatistics,
  IRequestGetCallStatisticsByConsultant,
  IRequestGetCallStatisticsByTeam,
  IRequestGetMessageStatistics,
  IResponseGetAutoMessageStatistics,
  IResponseGetCallStatisticsByConsultant,
  IResponseGetCallStatisticsByTeam,
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
export const SUCCESS_GET_ALL_CALL_STATISTICS_BY_CONSULTANT =
  'SUCCESS_GET_ALL_CALL_STATISTICS_BY_CONSULTANT';
export const FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT =
  'FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT';

// v2 상담원별 통화 통계 가져오기 Action
export const requestGetCallStatisticsByConsultant = createAction(
  REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT,
)<IRequestGetCallStatisticsByConsultant>();
export const successGetCallStatisticsByConsultant = createAction(
  SUCCESS_GET_CALL_STATISTICS_BY_CONSULTANT,
)<IResponseGetCallStatisticsByConsultant>();
export const successGetAllCallStatisticsByConsultant = createAction(
  SUCCESS_GET_ALL_CALL_STATISTICS_BY_CONSULTANT,
)();
export const failureGetCallStatisticsByConsultant = createAction(
  FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT,
)<string>();

// v2 팀별 통화 통계 가져오기
export const REQUEST_GET_CALL_STATISTICS_BY_TEAM =
  'REQUEST_GET_CALL_STATISTICS_BY_TEAM';
export const SUCCESS_GET_CALL_STATISTICS_BY_TEAM =
  'SUCCESS_GET_CALL_STATISTICS_BY_TEAM';
export const SUCCESS_GET_ALL_CALL_STATISTICS_BY_TEAM =
  'SUCCESS_GET_ALL_CALL_STATISTICS_BY_TEAM';
export const FAILURE_GET_CALL_STATISTICS_BY_TEAM =
  'FAILURE_GET_CALL_STATISTICS_BY_TEAM';

// v2 팀별 통화 통계 가져오기 Action
export const requestGetCallStatisticsByTeam = createAction(
  REQUEST_GET_CALL_STATISTICS_BY_TEAM,
)<IRequestGetCallStatisticsByTeam>();
export const successGetCallStatisticsByTeam = createAction(
  SUCCESS_GET_CALL_STATISTICS_BY_TEAM,
)<IResponseGetCallStatisticsByTeam>();
export const successGetAllCallStatisticsByTeam = createAction(
  SUCCESS_GET_ALL_CALL_STATISTICS_BY_TEAM,
)();
export const failureGetCallStatisticsByTeam = createAction(
  FAILURE_GET_CALL_STATISTICS_BY_TEAM,
)<string>();

// v2 자동 문자 통계 가져오기
export const REQUEST_GET_AUTO_MESSAGE_STATISTICS =
  'REQUEST_GET_AUTO_MESSAGE_STATISTICS';
export const SUCCESS_GET_AUTO_MESSAGE_STATISTICS =
  'SUCCESS_GET_AUTO_MESSAGE_STATISTICS';
export const SUCCESS_GET_ALL_AUTO_MESSAGE_STATISTICS =
  'SUCCESS_GET_ALL_AUTO_MESSAGE_STATISTICS';
export const FAILURE_GET_AUTO_MESSAGE_STATISTICS =
  'FAILURE_GET_AUTO_MESSAGE_STATISTICS';

// v2 자동 문자 통계 가져오기 Action
export const requestGetAutoMessageStatistics = createAction(
  REQUEST_GET_AUTO_MESSAGE_STATISTICS,
)<IRequestGetAutoMessageStatistics>();
export const successGetAutoMessageStatistics = createAction(
  SUCCESS_GET_AUTO_MESSAGE_STATISTICS,
)<IResponseGetAutoMessageStatistics>();
export const successGetAllAutoMessageStatistics = createAction(
  SUCCESS_GET_ALL_AUTO_MESSAGE_STATISTICS,
)();
export const failureGetAutoMessageStatistics = createAction(
  FAILURE_GET_AUTO_MESSAGE_STATISTICS,
)<string>();

// v2 문자 통계 가져오기
export const REQUEST_GET_MESSAGE_STATISTICS = 'REQUEST_GET_MESSAGE_STATISTICS';
export const SUCCESS_GET_MESSAGE_STATISTICS = 'SUCCESS_GET_MESSAGE_STATISTICS';
export const SUCCESS_GET_ALL_MESSAGE_STATISTICS =
  'SUCCESS_GET_ALL_MESSAGE_STATISTICS';
export const FAILURE_GET_MESSAGE_STATISTICS = 'FAILURE_GET_MESSAGE_STATISTICS';

// v2 문자 통계 가져오기 Action
export const requestGetMessageStatistics = createAction(
  REQUEST_GET_MESSAGE_STATISTICS,
)<IRequestGetMessageStatistics>();
export const successGetMessageStatistics = createAction(
  SUCCESS_GET_MESSAGE_STATISTICS,
)<IResponseGetMessageStatistics>();
export const successGetAllMessageStatistics = createAction(
  SUCCESS_GET_ALL_MESSAGE_STATISTICS,
)();
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

// v2 팀별 통화 통계 데이터 초기화하기
export const SET_INITIALIZE_CALL_STATISTICS_BY_TEAM =
  'SET_INITIALIZE_CALL_STATISTICS_BY_TEAM';

// v2 팀별 통계 데이터 초기화하기 Action
export const setInitializeCallStatisticsByTeam = createAction(
  SET_INITIALIZE_CALL_STATISTICS_BY_TEAM,
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

// 엑셀 다운로드 여부
export const SET_EXCEL_DOWNLOAD_STATUS = 'SET_EXCEL_DOWNLOAD_STATUS';
export const setExcelDownloadStatus = createAction(
  SET_EXCEL_DOWNLOAD_STATUS,
)<boolean>();
