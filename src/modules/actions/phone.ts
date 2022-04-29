import { createAction } from 'typesafe-actions';

import {
  IPhoneInfoItem,
  IRequestGetAllPhoneInfo,
  IRequestGetPhoneInfoParams,
  IRequestGetPlanParams,
  ITelecomItem,
  ITelecomPlnaItem,
} from 'types/phone';

// 통신사 가져오기
export const REQUEST_GET_TELECOM = 'REQUEST_GET_TELECOM';
export const SUCCESS_GET_TELECOM = 'SUCCESS_GET_TELECOM';
export const FAILURE_GET_TELECOM = 'FAILURE_GET_TELECOM';

// 통신사 가져오기 Action
export const requestGetTelecom = createAction(REQUEST_GET_TELECOM)();
export const successGetTelecom =
  createAction(SUCCESS_GET_TELECOM)<Array<ITelecomItem>>();
export const failureGetTelecom = createAction(FAILURE_GET_TELECOM)<string>();

// 통신사별 요금제 가져오기
export const REQUEST_GET_PLAN_BY_TELECOM = 'REQUEST_GET_PLAN_BY_TELECOM';
export const SUCCESS_GET_PLAN_BY_TELECOM = 'SUCCESS_GET_PLAN_BY_TELECOM';
export const FAILURE_GET_PLAN_BY_TELECOM = 'FAILURE_GET_PLAN_BY_TELECOM';

// 통신사별 요금제 가져오기 Action
export const requestGetPlanByTelecom = createAction(
  REQUEST_GET_PLAN_BY_TELECOM,
)<IRequestGetPlanParams>();
export const successGetPlanByTelecom = createAction(
  SUCCESS_GET_PLAN_BY_TELECOM,
)<Array<ITelecomPlnaItem>>();
export const failureGetPlanByTelecom = createAction(
  FAILURE_GET_PLAN_BY_TELECOM,
)<string>();

// 휴대폰에 대한 정보 가져오기
export const REQUEST_GET_PHONE_INFO = 'REQUEST_GET_PHONE_INFO';
export const SUCCESS_GET_PHONE_INFO = 'SUCCESS_GET_PHONE_INFO';
export const FAILURE_GET_PHONE_INFO = 'FAILURE_GET_PHONE_INFO';

// 휴대폰에 대한 가져오기 Action
export const requestGetPhoneInfo = createAction(
  REQUEST_GET_PHONE_INFO,
)<IRequestGetPhoneInfoParams>();
export const successGetPhoneInfo = createAction(
  SUCCESS_GET_PHONE_INFO,
)<IPhoneInfoItem>();
export const failureGetPhoneInfo = createAction(
  FAILURE_GET_PHONE_INFO,
)<string>();

// 전체 휴대폰에 대한 정보 가져오기
export const REQUEST_GET_PHONES = 'REQUEST_GET_PHONES';
export const SUCCESS_GET_PHONES = 'SUCCESS_GET_PHONES';
export const FAILURE_GET_PHONES = 'FAILURE_GET_PHONES';

// 전체 휴대폰에 대한 정보 가져오기 Action
export const requestGetPhones =
  createAction(REQUEST_GET_PHONES)<IRequestGetAllPhoneInfo>();
export const successGetPhones = createAction(SUCCESS_GET_PHONES)<any>();
export const failureGetPhones = createAction(FAILURE_GET_PHONES)<string>();

// 아래는 내부적으로 사용될 Actions

// phone info 초기화하기
export const SET_INITIALIZE_PHONE_INFO = 'SET_INITIALIZE_PHONE_INFO';
export const setInitializePhoneInfo = createAction(SET_INITIALIZE_PHONE_INFO)();
