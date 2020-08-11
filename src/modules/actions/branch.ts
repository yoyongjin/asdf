import { createAction } from 'typesafe-actions';

import {
  BranchInfoType,
  RequestAddBranch,
  RequestAddTeam,
  AddBranch,
  AddTeam,
  ChangeInput,
  TemporaryTeam,
  RequestUpdateTeam,
  SuccessUpdateTeam,
  RequestUpdateBranch,
  BranchInfo,
  TeamInfo,
  BranchId,
} from 'modules/types/branch';

export const REQUEST_GET_BRANCH_INFO = 'REQUEST_GET_BRANCH_INFO';
export const SUCCESS_GET_BRANCH_INFO = 'SUCCESS_GET_BRANCH_INFO';
export const FAILURE_GET_BRANCH_INFO = 'FAILURE_GET_BRANCH_INFO';
export const ADD_TEMPERATURE_BRANCH_INFO = 'ADD_TEMPERATURE_BRANCH_INFO';
export const ADD_TEMPERATURE_TEAM_INFO = 'ADD_TEMPERATURE_TEAM_INFO';
export const REQUEST_ADD_BRANCH_INFO = 'REQUEST_ADD_BRANCH_INFO';
export const REQUEST_ADD_TEAM_INFO = 'REQUEST_ADD_TEAM_INFO';
export const SUCCESS_ADD_BRANCH_INFO = 'SUCCESS_ADD_BRANCH_INFO';
export const SUCCESS_ADD_TEAM_INFO = 'SUCCESS_ADD_TEAM_INFO';
export const CHANGE_INPUT = 'CAHNGE_INPUT';
export const REQEUST_UPDATE_TEAM_INFO = 'REQEUST_UPDATE_TEAM_INFO';
export const SUCCESS_UPDATE_TEAM_INFO = 'SUCCESS_UPDATE_TEAM_INFO';
export const REQUEST_UPDATE_BRANCH_INFO = 'REQUEST_UPDATE_BRANCH_INFO';
export const SUCCESS_UPDATE_BRANCH_INFO = 'SUCCESS_UPDATE_BRANCH_INFO';
export const REQUEST_GET_BRANCH_LIST = 'REQUEST_GET_BRANCH_LIST';
export const SUCCESS_GET_BRANCH_LIST = 'SUCCESS_GET_BRANCH_LIST';
export const REQUEST_GET_TEAM_LIST = 'REQUEST_GET_TEAM_LIST';
export const SUCCESS_GET_TEAM_LIST = 'SUCCESS_GET_TEAM_LIST';

export const requestGetBranchInfo = createAction(REQUEST_GET_BRANCH_INFO)();
export const successGetBranchInfo = createAction(SUCCESS_GET_BRANCH_INFO)<
  BranchInfoType<number>
>();
export const failureGetBrnachInfo = createAction(FAILURE_GET_BRANCH_INFO)();
export const addTemperatureBranchInfo = createAction(
  ADD_TEMPERATURE_BRANCH_INFO,
)();
export const addTemperatureTeamInfo = createAction(ADD_TEMPERATURE_TEAM_INFO)<
  TemporaryTeam
>();
export const requestAddBranchInfo = createAction(REQUEST_ADD_BRANCH_INFO)<
  RequestAddBranch
>();
export const requestAddTeamInfo = createAction(REQUEST_ADD_TEAM_INFO)<
  RequestAddTeam
>();
export const successAddBranchInfo = createAction(SUCCESS_ADD_BRANCH_INFO)<
  AddBranch
>();
export const successAddTeamInfo = createAction(SUCCESS_ADD_TEAM_INFO)<
  AddTeam
>();
export const changeInput = createAction(CHANGE_INPUT)<ChangeInput>();
export const requestUpdateTeamInfo = createAction(REQEUST_UPDATE_TEAM_INFO)<
  RequestUpdateTeam
>();
export const successUpdateTeamInfo = createAction(SUCCESS_UPDATE_TEAM_INFO)<
  SuccessUpdateTeam
>();
export const requestUpdateBranchInfo = createAction(REQUEST_UPDATE_BRANCH_INFO)<
  RequestUpdateBranch
>();
export const successUpdateBranchInfo = createAction(SUCCESS_UPDATE_BRANCH_INFO)<
  RequestUpdateBranch
>();
export const requestGetBranchList = createAction(REQUEST_GET_BRANCH_LIST)();
export const successGetBranchList = createAction(SUCCESS_GET_BRANCH_LIST)<Array<BranchInfo>>();
export const requestGetTeamList = createAction(REQUEST_GET_TEAM_LIST)<BranchId>();
export const successGetTeamList = createAction(SUCCESS_GET_TEAM_LIST)<Array<TeamInfo>>();
