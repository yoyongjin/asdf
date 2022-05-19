import { createAction } from 'typesafe-actions';

// 조직 인사 배치
export const REQUEST_SYNC_BRANCH_USER = 'REQUEST_SYNC_BRANCH_USER';
export const SUCCESS_SYNC_BRANCH_USER = 'SUCCESS_SYNC_BRANCH_USER';
export const FAILURE_SYNC_BRANCH_USER = 'FAILURE_SYNC_BRANCH_USER';

// 조직 인사 배치 Action
export const requestSyncBranchUser = createAction(REQUEST_SYNC_BRANCH_USER)();
export const successSyncBranchUser = createAction(SUCCESS_SYNC_BRANCH_USER)();
export const failureSyncBranchUser = createAction(
  FAILURE_SYNC_BRANCH_USER,
)<string>();

// KSVC 배치
export const REQUEST_SYNC_KSVC = 'REQUEST_SYNC_KSVC';
export const SUCCESS_SYNC_KSVC = 'SUCCESS_SYNC_KSVC';
export const FAILURE_SYNC_KSVC = 'FAILURE_SYNC_KSVC';

// KSVC 배치 Action
export const requestSyncKSVC = createAction(REQUEST_SYNC_KSVC)();
export const successSyncKSVC = createAction(SUCCESS_SYNC_KSVC)();
export const failureSyncKSVC = createAction(FAILURE_SYNC_KSVC)<string>();

// VDI IP 배치
export const REQUEST_SYNC_IP = 'REQUEST_SYNC_IP';
export const SUCCESS_SYNC_IP = 'SUCCESS_SYNC_IP';
export const FAILURE_SYNC_IP = 'FAILURE_SYNC_IP';

// VDI IP 배치 Action
export const requestSyncIP = createAction(REQUEST_SYNC_IP)();
export const successSyncIP = createAction(SUCCESS_SYNC_IP)();
export const failureSyncIP = createAction(FAILURE_SYNC_IP)<string>();

// phone info 배치
export const REQUEST_SYNC_PHONE_INFO = 'REQUEST_SYNC_PHONE_INFO';
export const SUCCESS_SYNC_PHONE_INFO = 'SUCCESS_SYNC_PHONE_INFO';
export const FAILURE_SYNC_PHONE_INFO = 'FAILURE_SYNC_PHONE_INFO';

// phone info 배치 Action
export const requestSyncPhoneInfo = createAction(REQUEST_SYNC_PHONE_INFO)();
export const successSyncPhoneInfo = createAction(SUCCESS_SYNC_PHONE_INFO)();
export const failureSyncPhoneInfo = createAction(
  FAILURE_SYNC_PHONE_INFO,
)<string>();

export const SET_KSVC_PROCESS_STATUS = 'SET_KSVC_PROCESS_STATUS';
export const setKSVCProcessStatus = createAction(
  SET_KSVC_PROCESS_STATUS,
)<boolean>();
