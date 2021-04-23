import { createAction } from 'typesafe-actions';

import { RequestLogin, SuccessLogin, TappingTarget } from 'types/auth';
import { RouterType } from 'modules/types/common';

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
export const SET_SOCKET_STATUS = 'SET_SOCKET_STATUS';
export const SET_SERVER_TIME = 'SET_SERVER_TIME';
export const SET_TAPPING_STATUS = 'SET_TAPPING_STATUS';
export const SET_TAPPING_USER = 'SET_TAPPING_USER';

// 액션 생성 함수
export const requestLogin = createAction(REQUEST_LOGIN)<RequestLogin>();
export const successLogin = createAction(SUCCESS_LOGIN)<SuccessLogin>();
export const failureLogin = createAction(FAILURE_LOGIN)<string>();
export const requestCheckLogin = createAction(
  REQUEST_CHECK_LOGIN,
)<RouterType>();
export const successCheckLogin = createAction(
  SUCCESS_CHECK_LOGIN,
)<SuccessLogin>();
export const failureCheckLogin = createAction(FAILURE_CHECK_LOGIN)<string>();
export const requestLogout = createAction(REQUEST_LOGOUT)<RouterType>();
export const successLogout = createAction(SUCCESS_LOGOUT)();
export const failureLogout = createAction(FAILURE_LOGOUT)<string>();
export const setSocketStatus = createAction(SET_SOCKET_STATUS)<number>();
export const setServerTime = createAction(SET_SERVER_TIME)<number>();
export const setTappingUser = createAction(SET_TAPPING_USER)<TappingTarget>();
export const setTappingStatus = createAction(SET_TAPPING_STATUS)<number>();

// 삭제 예정
export const SET_INIT_SOCKET = 'SET_INIT_SOCKET';
export const setInitSocket = createAction(SET_INIT_SOCKET)<number>();
