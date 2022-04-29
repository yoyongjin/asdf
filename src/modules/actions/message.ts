import { createAction } from 'typesafe-actions';

import {
  IMaxMessageItem,
  IRequestAddAutoMessage,
  IRequestGetAutoMessage,
  IRequestModifyAutoMessage,
  IRequestModifyMessageCount,
  IRequestRemoveAutoMessage,
  IRequestSetUsedAutoMessage,
  IResponseGetAutoMessage,
  IResponseModifyMessageCount,
  IResponseSetUsedAutoMessage,
} from 'types/message';

// 발송 수량 가져오기
export const REQUEST_GET_MESSAGE_COUNT = 'REQUEST_GET_MESSAGE_COUNT';
export const SUCCESS_GET_MESSAGE_COUNT = 'SUCCESS_GET_MESSAGE_COUNT';
export const FAILURE_GET_MESSAGE_COUNT = 'FAILURE_GET_MESSAGE_COUNT';

// 발송 수량 가져오기 Action
export const requestGetMessageCount = createAction(REQUEST_GET_MESSAGE_COUNT)();
export const successGetMessageCount = createAction(SUCCESS_GET_MESSAGE_COUNT)<
  Array<IMaxMessageItem>
>();
export const failureGetMessageCount = createAction(
  FAILURE_GET_MESSAGE_COUNT,
)<string>();

// 발송 수량 수정하기
export const REQUEST_MODIFY_MESSAGE_COUNT = 'REQUEST_MODIFY_MESSAGE_COUNT';
export const SUCCESS_MODIFY_MESSAGE_COUNT = 'SUCCESS_MODIFY_MESSAGE_COUNT';
export const FAILURE_MODIFY_MESSAGE_COUNT = 'FAILURE_MODIFY_MESSAGE_COUNT';

// 발송 수량 수정하기 Action
export const requestModifyMessageCount = createAction(
  REQUEST_MODIFY_MESSAGE_COUNT,
)<IRequestModifyMessageCount>();
export const successModifyMessageCount = createAction(
  SUCCESS_MODIFY_MESSAGE_COUNT,
)<IResponseModifyMessageCount>();
export const failureModifyMessageCount = createAction(
  FAILURE_MODIFY_MESSAGE_COUNT,
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

// 자동 문자 추가하기
export const REQUEST_ADD_AUTO_MESSAGE = 'REQUEST_ADD_AUTO_MESSAGE';
export const SUCCESS_ADD_AUTO_MESSAGE = 'SUCCESS_ADD_AUTO_MESSAGE';
export const FAILURE_ADD_AUTO_MESSAGE = 'FAILURE_ADD_AUTO_MESSAGE';

// 자동 문자 추가 Action
export const requestAddAutoMessage = createAction(
  REQUEST_ADD_AUTO_MESSAGE,
)<IRequestAddAutoMessage>();
export const successAddAutoMessage = createAction(SUCCESS_ADD_AUTO_MESSAGE)();
export const failureAddAutoMessage = createAction(
  FAILURE_ADD_AUTO_MESSAGE,
)<string>();

// 자동 문자 수정하기
export const REQUEST_MODIFY_AUTO_MESSAGE = 'REQUEST_MODIFY_AUTO_MESSAGE';
export const SUCCESS_MODIFY_AUTO_MESSAGE = 'SUCCESS_MODIFY_AUTO_MESSAGE';
export const FAILURE_MODIFY_AUTO_MESSAGE = 'FAILURE_MODIFY_AUTO_MESSAGE';

// 자동 문자 추가 Action
export const requestModifyAutoMessage = createAction(
  REQUEST_MODIFY_AUTO_MESSAGE,
)<IRequestModifyAutoMessage>();
export const successModifyAutoMessage = createAction(
  SUCCESS_MODIFY_AUTO_MESSAGE,
)();
export const failureModifyAutoMessage = createAction(
  FAILURE_MODIFY_AUTO_MESSAGE,
)<string>();
