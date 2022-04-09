import { createAction } from 'typesafe-actions';

import {
  OrganizationData,
  TeamItem,
  RequestAddBranch,
  SuccessAddBranch,
  SuccessModifyBranch,
  RequestRemoveBranch,
  SuccessRemoveBranch,
  BranchItem,
  RequestGetBranch,
  RequestGetTeam,
  RequestAddTeam,
  SuccessAddTeam,
  RequestModifyBranch,
  RequestModifyTeam,
  SuccessModifyTeam,
  SuccessRemoveTeam,
  RequestRemoveTeam,
  AddTemporaryTeam,
} from 'types/organization';

// 조직 가져오기
export const REQUEST_GET_ORGANIZATION = 'REQUEST_GET_ORGANIZATION';
export const SUCCESS_GET_ORGANIZATION = 'SUCCESS_GET_ORGANIZATION';
export const FAILURE_GET_ORGANIZATION = 'FAILURE_GET_ORGANIZATION';

// 지점 가져오기
export const REQUEST_GET_BRANCH = 'REQUEST_GET_BRANCH';
export const SUCCESS_GET_BRANCH = 'SUCCESS_GET_BRANCH';
export const SUCCESS_GET_USER_BRANCH = 'SUCCESS_GET_USER_BRANCH';
export const FAILURE_GET_BRANCH = 'FAILURE_GET_BRANCH';

// 팀 가져오기
export const REQUEST_GET_TEAM = 'REQUEST_GET_TEAM';
export const SUCCESS_GET_TEAM = 'SUCCESS_GET_TEAM';
export const SUCCESS_GET_USER_TEAM = 'SUCCESS_GET_USER_TEAM';
export const FAILURE_GET_TEAM = 'FAILURE_GET_TEAM';

// 지점 추가
export const ADD_TEMPERATURE_BRANCH = 'ADD_TEMPERATURE_BRANCH';
export const REQUEST_ADD_BRANCH = 'REQUEST_ADD_BRANCH';
export const SUCCESS_ADD_BRANCH = 'SUCCESS_ADD_BRANCH';
export const FAILURE_ADD_BRANCH = 'FAILURE_ADD_BRANCH';

// 지점 변경
export const REQUEST_MODIFY_BRANCH = 'REQUEST_MODIFY_BRANCH';
export const SUCCESS_MODIFY_BRANCH = 'SUCCESS_MODIFY_BRANCH';
export const FAILURE_MODIFY_BRANCH = 'FAILURE_MODIFY_BRANCH';

// 지점 삭제
export const REQUEST_REMOVE_BRANCH = 'REQUEST_REMOVE_BRANCH';
export const SUCCESS_REMOVE_BRANCH = 'SUCCESS_REMOVE_BRANCH';
export const FAILURE_REMOVE_BRANCH = 'FAILURE_REMOVE_BRANCH';

// 팀 추가
export const ADD_TEMPERATURE_TEAM = 'ADD_TEMPERATURE_TEAM';
export const REQUEST_ADD_TEAM = 'REQUEST_ADD_TEAM';
export const SUCCESS_ADD_TEAM = 'SUCCESS_ADD_TEAM';
export const FAILURE_ADD_TEAM = 'FAILURE_ADD_TEAM';

// 팀 변경
export const REQEUST_MODIFY_TEAM = 'REQEUST_MODIFY_TEAM';
export const SUCCESS_MODIFY_TEAM = 'SUCCESS_MODIFY_TEAM';
export const FAILURE_MODIFY_TEAM = 'FAILURE_MODIFY_TEAM';

// 팀 삭제
export const REQUEST_REMOVE_TEAM = 'REQUEST_REMOVE_TEAM';
export const SUCCESS_REMOVE_TEAM = 'SUCCESS_REMOVE_TEAM';
export const FAILURE_REMOVE_TEAM = 'FAILURE_REMOVE_TEAM';

// 액션함수

// 조직 가져오기
export const requestGetOrganization = createAction(REQUEST_GET_ORGANIZATION)();
export const successGetOrganization = createAction(SUCCESS_GET_ORGANIZATION)<
  OrganizationData<number>
>();
export const failureGetOrganization = createAction(
  FAILURE_GET_ORGANIZATION,
)<string>();

// 지점 가져오기
export const requestGetBranch =
  createAction(REQUEST_GET_BRANCH)<RequestGetBranch>();
export const successGetBranch =
  createAction(SUCCESS_GET_BRANCH)<Array<BranchItem>>();
export const successGetUserBranch = createAction(SUCCESS_GET_USER_BRANCH)<
  Array<BranchItem>
>();
export const failureGetBranch = createAction(FAILURE_GET_BRANCH)<string>();

// 팀 가져오기
export const requestGetTeam = createAction(REQUEST_GET_TEAM)<RequestGetTeam>();
export const successGetTeam = createAction(SUCCESS_GET_TEAM)<Array<TeamItem>>();
export const successGetUserTeam = createAction(SUCCESS_GET_USER_TEAM)<
  Array<TeamItem>
>();
export const failureGetTema = createAction(FAILURE_GET_TEAM)<string>();

// 조직 추가
export const addTemperatureBranch = createAction(ADD_TEMPERATURE_BRANCH)();
export const requestAddBranch =
  createAction(REQUEST_ADD_BRANCH)<RequestAddBranch>();
export const successAddBranch =
  createAction(SUCCESS_ADD_BRANCH)<SuccessAddBranch>();
export const failureAddBranch = createAction(FAILURE_ADD_BRANCH)<string>();

// 팀 추가
export const addTemperatureTeam =
  createAction(ADD_TEMPERATURE_TEAM)<AddTemporaryTeam>();
export const requestAddTeam = createAction(REQUEST_ADD_TEAM)<RequestAddTeam>();
export const successAddTeam = createAction(SUCCESS_ADD_TEAM)<SuccessAddTeam>();
export const failureAddTeam = createAction(FAILURE_ADD_TEAM)<string>();

// 조직 수정
export const requestModifyBranch = createAction(
  REQUEST_MODIFY_BRANCH,
)<RequestModifyBranch>();
export const successModifyBranch = createAction(
  SUCCESS_MODIFY_BRANCH,
)<SuccessModifyBranch>();
export const failureModifyBranch = createAction(
  FAILURE_MODIFY_BRANCH,
)<string>();

// 팀 수정
export const requestModifyTeam =
  createAction(REQEUST_MODIFY_TEAM)<RequestModifyTeam>();
export const successModifyTeam =
  createAction(SUCCESS_MODIFY_TEAM)<SuccessModifyTeam>();
export const failureModifyTeam = createAction(FAILURE_MODIFY_TEAM)<string>();

// 조직 삭제
export const requestRemoveBranch = createAction(
  REQUEST_REMOVE_BRANCH,
)<RequestRemoveBranch>();
export const successRemoveBranch = createAction(
  SUCCESS_REMOVE_BRANCH,
)<SuccessRemoveBranch>();
export const failureRemoveBranch = createAction(
  FAILURE_REMOVE_BRANCH,
)<string>();

// 팀 삭제
export const requestRemoveTeam =
  createAction(REQUEST_REMOVE_TEAM)<RequestRemoveTeam>();
export const successRemoveTeam =
  createAction(SUCCESS_REMOVE_TEAM)<SuccessRemoveTeam>();
export const failureRemoveTeam = createAction(FAILURE_REMOVE_TEAM)<string>();

// 조직 여러개 가져오기
export const REQUEST_GET_PLURAL_BRANCH = 'REQUEST_GET_PLURAL_BRANCH';
export const SUCCESS_GET_PLURAL_BRANCH = 'SUCCESS_GET_PLURAL_BRANCH';
export const FAILURE_GET_PLURAL_BRANCH = 'FAILURE_GET_PLURAL_BRANCH';

// 조직 여러개 가져오기
export const requestGetPluralBranch = createAction(REQUEST_GET_PLURAL_BRANCH)();
export const successGetPluralBranch = createAction(SUCCESS_GET_PLURAL_BRANCH)<
  Array<BranchItem>
>();
export const failureGetPluralBranch = createAction(
  FAILURE_GET_PLURAL_BRANCH,
)<string>();
