import { createAction } from 'typesafe-actions';

import { LoginType, LoginInfoType } from 'modules/types/auth';
import { HistoryType, FailureType } from 'modules/types/common';

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

// 액션 생성 함수
export const requestLogin = createAction(REQUEST_LOGIN)<LoginType>();
export const successLogin = createAction(SUCCESS_LOGIN)<LoginInfoType>();
export const failureLogin = createAction(FAILURE_LOGIN)<FailureType>();
export const requestCheckLogin = createAction(REQUEST_CHECK_LOGIN)<
  HistoryType
>();
export const successCheckLogin = createAction(SUCCESS_CHECK_LOGIN)<
  LoginInfoType
>();
export const failureCheckLogin = createAction(FAILURE_CHECK_LOGIN)<
  FailureType
>();
export const requestLogout = createAction(REQUEST_LOGOUT)<HistoryType>();
export const successLogout = createAction(SUCCESS_LOGOUT)();
export const failureLogout = createAction(FAILURE_LOGOUT)<FailureType>();
