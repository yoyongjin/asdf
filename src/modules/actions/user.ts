import { createAction } from 'typesafe-actions';

import {
  RequestType,
  SuccessUserType,
  UserInfoType,
  UpdateUserInfoType,
  ConsultantInfoType,
  deleteUserType,
  SuccessConsultantType,
  UserInfo,
  callStateType,
  monitoringStateType,
} from 'modules/types/user';
import { failureType } from 'modules/types/common';

export const REQUEST_GET_USER_INFO = 'REQUEST_GET_USER_INFO';
export const SUCCESS_GET_USER_INFO = 'SUCCESS_GET_USER_INFO';
export const FAILURE_GET_USER_INFO = 'FAILURE_GET_USER_INFO';
export const SET_CONSULTANT_STATUS = 'SET_CONSULTANT_STATUS';
export const RUN_TIMER = 'RUN_TIMER';
export const REQUEST_ADD_USER = 'REQUEST_ADD_USER';
export const SUCCESS_ADD_USER = 'SUCCESS_ADD_USER';
export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER';
export const SUCCESS_UPDATE_USER = 'SUCCESS_UPDATE_USER';
export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const SUCCESS_DELETE_USER = 'SUCCESS_DELETE_USER';
export const GET_CALL_STATUS = 'GET_CALL_STATUS';
export const INSERT_USER = 'INSERT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER'
export const SUCCESS_GET_CONSULTANT_INFO= 'SUCCESS_GET_CONSULTANT_INFO'
export const CHANGE_CALL_STATE = 'CHANGE_CALL_STATE'
export const CHANGE_MONITORING_STATE = 'CHANGE_MONITORING_STATE';
export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const SUCCESS_RESET_PASSWORD = 'SUCCESS_RESET_PASSWORD';
export const INSERT_CONSULTANT = 'INSERT_CONSULTANT';
export const UPDATE_CONSULTANT = 'UPDATE_CONSULTANT';

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
export const requestAddUser = createAction(REQUEST_ADD_USER)<UserInfoType>();
export const successAddUser = createAction(SUCCESS_ADD_USER)();
export const requestUpdateUser = createAction(REQUEST_UPDATE_USER)<
  UpdateUserInfoType
>();
export const successUpdateUser = createAction(SUCCESS_UPDATE_USER)();
export const getCallStatus = createAction(GET_CALL_STATUS)<
  any
>();
export const insertUser = createAction(INSERT_USER)<UserInfo>();
export const updateUser = createAction(UPDATE_USER)<UserInfo>();
export const deleteUser = createAction(DELETE_USER)<{id: string}>();
export const requestDeleteUser = createAction(REQUEST_DELETE_USER)<deleteUserType>();
export const successDeleteUser = createAction(SUCCESS_DELETE_USER)();
export const successGetConsultantInfo = createAction(SUCCESS_GET_CONSULTANT_INFO)<SuccessConsultantType>();
export const changeCallState = createAction(CHANGE_CALL_STATE)<callStateType>();
export const changeMonitoringState = createAction(CHANGE_MONITORING_STATE)<monitoringStateType>();
export const requestResetPassword = createAction(REQUEST_RESET_PASSWORD)<{id: number}>();
export const successResetPassword = createAction(SUCCESS_RESET_PASSWORD)();
export const insertConsultant = createAction(INSERT_CONSULTANT)<ConsultantInfoType>();
export const updateConsultant = createAction(UPDATE_CONSULTANT)<ConsultantInfoType>();