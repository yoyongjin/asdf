import { createAction } from 'typesafe-actions';

import { RequestType, SuccessUserType } from 'modules/types/user';
import { failureType } from 'modules/types/common';

export const REQUEST_GET_USER_INFO = 'REQUEST_GET_USER_INFO';
export const SUCCESS_GET_USER_INFO = 'SUCCESS_GET_USER_INFO';
export const FAILURE_GET_USER_INFO = 'FAILURE_GET_USER_INFO';
export const SET_CONSULTANT_STATUS = 'SET_CONSULTANT_STATUS';
export const RUN_TIMER = 'RUN_TIMER';

export const requestGetUserInfo = createAction(REQUEST_GET_USER_INFO)<
  RequestType
>();
export const successGetUserInfo = createAction(SUCCESS_GET_USER_INFO)<
  SuccessUserType
>();
export const failureGetUserInfo = createAction(FAILURE_GET_USER_INFO)<
  failureType
>();
export const runTimer = createAction(RUN_TIMER)();
