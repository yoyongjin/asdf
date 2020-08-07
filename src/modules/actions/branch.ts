import { createAction } from 'typesafe-actions';

import {
  BranchInfoType,
  RequestAddBranch,
  RequestAddTeam,
  AddBranch,
  ChangeInput
} from 'modules/types/branch';

export const REQUEST_GET_BRANCH_INFO = 'REQUEST_GET_BRANCH_INFO';
export const SUCCESS_GET_BRANCH_INFO = 'SUCCESS_GET_BRANCH_INFO';
export const FAILURE_GET_BRANCH_INFO = 'FAILURE_GET_BRANCH_INFO';
export const ADD_TEMPERATURE_BRANCH_INFO = 'ADD_TEMPERATURE_BRANCH_INFO';
export const REQUEST_ADD_BRANCH_INFO = 'ADD_BRANCH_INFO';
export const REQUEST_ADD_TEAM_INFO = 'ADD_TEAM_INFO';
export const SUCCESS_ADD_BRANCH_INFO = 'SUCCESS_ADD_BRANCH_INFO';
export const SUCCESS_ADD_TEAM_INFO = 'SUCCESS_ADD_TEAM_INFO';
export const CHANGE_INPUT = 'CAHNGE_INPUT'

export const requestGetBranchInfo = createAction(REQUEST_GET_BRANCH_INFO)();
export const successGetBranchInfo = createAction(SUCCESS_GET_BRANCH_INFO)<
  BranchInfoType<number>
>();
export const failureGetBrnachInfo = createAction(FAILURE_GET_BRANCH_INFO)();
export const addTemperatureBranchInfo = createAction(
  ADD_TEMPERATURE_BRANCH_INFO,
)();
export const requestAddBranchInfo = createAction(REQUEST_ADD_BRANCH_INFO)<
  RequestAddBranch
>();
export const requestAddTeamInfo = createAction(REQUEST_ADD_TEAM_INFO)<
  RequestAddTeam
>();
export const successAddBranchInfo = createAction(SUCCESS_ADD_BRANCH_INFO)<
  AddBranch
>();
export const successAddTeamInfo = createAction(SUCCESS_ADD_TEAM_INFO)();
export const changeInput = createAction(CHANGE_INPUT)<ChangeInput>();