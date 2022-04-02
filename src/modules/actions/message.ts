import { createAction } from 'typesafe-actions';

import { IMaxMessageItem, IRequestModifySmsCount } from 'types/message';

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
