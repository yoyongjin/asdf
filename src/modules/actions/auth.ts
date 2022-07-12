import { createAction } from 'typesafe-actions';

import {
  RequestLogin,
  LoginData,
  TappingData,
  TappingTarget,
  RequestChangePassword,
} from 'types/auth';

// 액션 타입
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAILURE_LOGIN = 'FAILURE_LOGIN';
export const REQUEST_CHECK_LOGIN = 'REQUEST_CHECK_LOGIN';
export const SUCCESS_CHECK_LOGIN = 'SUCCESS_CHECK_LOGIN';
export const FAILURE_CHECK_LOGIN = 'FAILURE_CHECK_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const FAILURE_LOGOUT = 'FAILURE_LOGOUT';
export const REQUEST_CHANGE_PASSWORD = 'REQUEST_CHANGE_PASSWORD';
export const SUCCESS_CHANGE_PASSWORD = 'SUCCESS_CHANGE_PASSWORD';
export const FAILURE_CHANGE_PASSWORD = 'FAILURE_CHANGE_PASSWORD';
export const SET_SOCKET_STATUS = 'SET_SOCKET_STATUS';
export const SET_SERVER_TIME = 'SET_SERVER_TIME';
export const SET_TAPPING_DATA = 'SET_TAPPING_DATA';
export const SET_MONITORING_VIEW = 'SET_MONITORING_VIEW';

// 액션 생성 함수
export const requestLogin = createAction(REQUEST_LOGIN)<RequestLogin>();
export const successLogin = createAction(SUCCESS_LOGIN)<LoginData>();
export const failureLogin = createAction(FAILURE_LOGIN)<string>();
export const requestCheckLogin = createAction(REQUEST_CHECK_LOGIN)();
export const successCheckLogin = createAction(SUCCESS_CHECK_LOGIN)<LoginData>();
export const failureCheckLogin = createAction(FAILURE_CHECK_LOGIN)<string>();
export const requestLogout = createAction(REQUEST_LOGOUT)();
export const successLogout = createAction(SUCCESS_LOGOUT)();
export const failureLogout = createAction(FAILURE_LOGOUT)<string>();
export const requestChangePassword = createAction(
  REQUEST_CHANGE_PASSWORD,
)<RequestChangePassword>();
export const successChangePassword = createAction(SUCCESS_CHANGE_PASSWORD)();
export const failureChangePassword = createAction(
  FAILURE_CHANGE_PASSWORD,
)<string>();
export const setSocketStatus = createAction(SET_SOCKET_STATUS)<number>();
export const setServerTime = createAction(SET_SERVER_TIME)<number>();
export const setTappingData = createAction(SET_TAPPING_DATA)<TappingData>();
export const setMonitoringView = createAction(SET_MONITORING_VIEW)<string>();

// 삭제 예정
export const SET_INIT_SOCKET = 'SET_INIT_SOCKET';
export const SET_TAPPING_USER = 'SET_TAPPING_USER';
export const setInitSocket = createAction(SET_INIT_SOCKET)<number>();
export const setTappingUser = createAction(SET_TAPPING_USER)<TappingTarget>();
