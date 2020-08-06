import { createAction } from 'typesafe-actions';

export const REQUEST_GET_BRANCH_INFO = 'REQUEST_GET_BRANCH_INFO';
export const SUCCESS_GET_BRANCH_INFO = 'SUCCESS_GET_BRANCH_INFO';
export const FAILURE_GET_BRANCH_INFO = 'FAILURE_GET_BRANCH_INFO';

export const requestGetBranchInfo = createAction(REQUEST_GET_BRANCH_INFO)();
export const successGetBranchInfo = createAction(SUCCESS_GET_BRANCH_INFO)();
export const failureGetBrnachInfo = createAction(FAILURE_GET_BRANCH_INFO)();
