import { createAction } from 'typesafe-actions';

import {
  IPhoneInfoItem,
  IRequestGetAllPhoneInfo,
  IRequestGetPhoneHist,
  IRequestGetPhoneInfoParams,
  IRequestGetPlanParams,
  IRequestModifyPhoneInfo,
  IRequestRemovePhoneInfo,
  IResponseGetAllPhoneInfo,
  IResponseGetPhoneHist,
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
export const SUCCESS_GET_ALL_PHONES = 'SUCCESS_GET_ALL_PHONES';
export const FAILURE_GET_PHONES = 'FAILURE_GET_PHONES';

// 전체 휴대폰에 대한 정보 가져오기 Action
export const requestGetPhones =
  createAction(REQUEST_GET_PHONES)<IRequestGetAllPhoneInfo>();
export const successGetPhones =
  createAction(SUCCESS_GET_PHONES)<IResponseGetAllPhoneInfo>();
export const successGetAllPhones = createAction(SUCCESS_GET_ALL_PHONES)();
export const failureGetPhones = createAction(FAILURE_GET_PHONES)<string>();

// 휴대폰에 대한 정보 변경하기
export const REQUEST_MODIFY_PHONE_INFO = 'REQUEST_MODIFY_PHONE_INFO';
export const SUCCESS_MODIFY_PHONE_INFO = 'SUCCESS_MODIFY_PHONE_INFO';
export const FAILURE_MODIFY_PHONE_INFO = 'FAILURE_MODIFY_PHONE_INFO';

// 휴대폰에 대한 정보 변경하기 Action
export const requestModifyPhoneInfo = createAction(
  REQUEST_MODIFY_PHONE_INFO,
)<IRequestModifyPhoneInfo>();
export const successModifyPhoneInfo = createAction(SUCCESS_MODIFY_PHONE_INFO)();
export const failureModifyPhoneInfo = createAction(
  FAILURE_MODIFY_PHONE_INFO,
)<string>();

// 휴대폰에 대한 정보 삭제하기
export const REQUEST_REMOVE_PHONE_INFO = 'REQUEST_REMOVE_PHONE_INFO';
export const SUCCESS_REMOVE_PHONE_INFO = 'SUCCESS_REMOVE_PHONE_INFO';
export const FAILURE_REMOVE_PHONE_INFO = 'FAILURE_REMOVE_PHONE_INFO';

// 휴대폰에 대한 정보 삭제하기 Action
export const requestRemovePhoneInfo = createAction(
  REQUEST_REMOVE_PHONE_INFO,
)<IRequestRemovePhoneInfo>();
export const successRemovePhoneInfo = createAction(SUCCESS_REMOVE_PHONE_INFO)();
export const failureRemovePhoneInfo = createAction(
  FAILURE_REMOVE_PHONE_INFO,
)<string>();

// 휴대폰에 대한 이력 가져오기
export const REQUEST_GET_PHONE_HIST = 'REQUEST_GET_PHONE_HIST';
export const SUCCESS_GET_PHONE_HIST = 'SUCCESS_GET_PHONE_HIST';
export const SUCCESS_GET_ALL_PHONE_HIST = 'SUCCESS_GET_ALL_PHONE_HIST';
export const FAILURE_GET_PHONE_HIST = 'FAILURE_GET_PHONE_HIST';

// 휴대폰에 대한 이력 가져오기 Action
export const requestGetPhoneHist = createAction(
  REQUEST_GET_PHONE_HIST,
)<IRequestGetPhoneHist>();
export const successGetPhoneHist = createAction(
  SUCCESS_GET_PHONE_HIST,
)<IResponseGetPhoneHist>();
export const successGetAllPhoneHist = createAction(
  SUCCESS_GET_ALL_PHONE_HIST,
)();
export const failureGetPhoneHist = createAction(
  FAILURE_GET_PHONE_HIST,
)<string>();

// 아래는 내부적으로 사용될 Actions

// phone info 초기화하기
export const SET_INITIALIZE_PHONE_INFO = 'SET_INITIALIZE_PHONE_INFO';
export const setInitializePhoneInfo = createAction(SET_INITIALIZE_PHONE_INFO)();

export const SET_INITIALIZE_PHONE_HISTORY = 'SET_INITIALIZE_PHONE_HISTORY';
export const setInitializePhoneHistory = createAction(
  SET_INITIALIZE_PHONE_HISTORY,
)();
