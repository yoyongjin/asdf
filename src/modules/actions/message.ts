import { createAction } from 'typesafe-actions';

import {
  IMaxMessageItem,
  IRequestGetAutoMessage,
  IRequestModifySmsCount,
  IRequestRemoveAutoMessage,
  IRequestSetUsedAutoMessage,
  IResponseGetAutoMessage,
  IResponseSetUsedAutoMessage,
} from 'types/message';

// 발송 수량 가져오기
export const REQUEST_GET_SMS_COUNT = 'REQUEST_GET_SMS_COUNT';
export const SUCCESS_GET_SMS_COUNT = 'SUCCESS_GET_SMS_COUNT';
export const FAILURE_GET_SMS_COUNT = 'FAILURE_GET_SMS_COUNT';

// 발송 수량 가져오기 Action
export const requestGetSmsCount = createAction(REQUEST_GET_SMS_COUNT)();
export const successGetSmsCount = createAction(SUCCESS_GET_SMS_COUNT)<
  Array<IMaxMessageItem>
>();
export const failureGetSmsCount = createAction(FAILURE_GET_SMS_COUNT)<string>();

// 발송 수량 수정하기
export const REQUEST_MODIFY_SMS_COUNT = 'REQUEST_MODIFY_SMS_COUNT';
export const SUCCESS_MODIFY_SMS_COUNT = 'SUCCESS_MODIFY_SMS_COUNT';
export const FAILURE_MODIFY_SMS_COUNT = 'FAILURE_MODIFY_SMS_COUNT';

// 발송 수량 수정하기 Action
export const requestModifySmsCount = createAction(
  REQUEST_MODIFY_SMS_COUNT,
)<IRequestModifySmsCount>();
export const successModifySmsCount = createAction(SUCCESS_MODIFY_SMS_COUNT)();
export const failureModifySmsCount = createAction(
  FAILURE_MODIFY_SMS_COUNT,
)<string>();

// 자동 문자 데이터 가져오기
export const REQUEST_GET_AUTO_MESSAGE = 'REQUEST_GET_AUTO_MESSAGE';
export const SUCCESS_GET_AUTO_MESSAGE = 'SUCCESS_GET_AUTO_MESSAGE';
export const FAILURE_GET_AUTO_MESSAGE = 'FAILURE_GET_AUTO_MESSAGE';

// 자동 문자 데이터 Action
export const requestGetAutoMessage = createAction(
  REQUEST_GET_AUTO_MESSAGE,
)<IRequestGetAutoMessage>();
export const successGetAutoMessage = createAction(
  SUCCESS_GET_AUTO_MESSAGE,
)<IResponseGetAutoMessage>();
export const failureGetAutoMessage = createAction(
  FAILURE_GET_AUTO_MESSAGE,
)<string>();

// 자동 문자 사용 유무 설정하기
export const REQUEST_SET_USED_AUTO_MESSAGE = 'REQUEST_SET_USED_AUTO_MESSAGE';
export const SUCCESS_SET_USED_AUTO_MESSAGE = 'SUCCESS_SET_USED_AUTO_MESSAGE';
export const FAILURE_SET_USED_AUTO_MESSAGE = 'FAILURE_SET_USED_AUTO_MESSAGE';

// 자동 문자 사용 유무 Action
export const requestSetUsedAutoMessage = createAction(
  REQUEST_SET_USED_AUTO_MESSAGE,
)<IRequestSetUsedAutoMessage>();
export const successSetUsedAutoMessage = createAction(
  SUCCESS_SET_USED_AUTO_MESSAGE,
)<IResponseSetUsedAutoMessage>();
export const failureSetUsedAutoMessage = createAction(
  FAILURE_SET_USED_AUTO_MESSAGE,
)<string>();

// 자동 문자 삭제하기
export const REQUEST_REMOVE_AUTO_MESSAGE = 'REQUEST_REMOVE_AUTO_MESSAGE';
export const SUCCESS_REMOVE_AUTO_MESSAGE = 'SUCCESS_REMOVE_AUTO_MESSAGE';
export const FAILURE_REMOVE_AUTO_MESSAGE = 'FAILURE_REMOVE_AUTO_MESSAGE';

// 자동 문자 삭제 Action
export const requestRemoveAutoMessage = createAction(
  REQUEST_REMOVE_AUTO_MESSAGE,
)<IRequestRemoveAutoMessage>();
export const successRemoveAutoMessage = createAction(
  SUCCESS_REMOVE_AUTO_MESSAGE,
)();
export const failureRemoveAutoMessage = createAction(
  FAILURE_REMOVE_AUTO_MESSAGE,
)<string>();
