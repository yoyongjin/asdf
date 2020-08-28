import { ActionType } from 'typesafe-actions';
import { Location } from 'history';

import * as actions from 'modules/actions/user';
import * as common from 'modules/types/common';

export type UserAction = ActionType<typeof actions>;

export interface UserType {
  consultant: common.FetchType;
  consultantInfo: Array<ConsultantInfoType>;
  userInfo: Array<UserInfo>;
  insertUser: common.FetchType;
  updateUser: common.FetchType;
  deleteUser: common.FetchType;
  resetPassword: common.FetchType;
  numberOfUsers: number;
}

export interface UserInfo {
  id: number;
  branch_id: number;
  branch_name: string;
  admin_id: number;
  login_at: number;
  name: string;
  number: string;
  team_id: number;
  team_name: string;
  user_name: string;
  ziboxip: string;
}

export interface RequestType {
  location?: Location;
  branchId: number;
  teamId: number;
  limit: number;
  page: number;
  search?: string;
}

export interface SuccessUserType {
  users: Array<UserInfo>;
  count: number;
}

export interface SuccessConsultantType {
  users: Array<ConsultantInfoType>;
  count: number;
}

export interface UserInfoType {
  branch_id: string;
  team_id: string;
  admin_id: string;
  name: string;
  user_name: string;
  password: string;
  number: string;
  ziboxip: string;
}

export interface UpdateUserInfoType extends UserInfoType {
  user_id: string;
}

export interface ConsultantInfoType {
  admin_id: number;
  branch_id: number;
  branch_name: null | string;
  id: number;
  login_at?: number;
  name: string;
  number: string;
  team_id: number;
  team_name: null | string;
  user_name: string;
  ziboxip: string;
  call_time?: number;
  call_type?: string;
  diff?: number;
  monitoring?: boolean;
  user_id?: number;
}

export interface TestUser {
  id: number;
  branch_id: string;
  team_id: string;
  admin_id: string;
  name: string;
  user_name: string;
  password: string;
  number: string;
  ziboxip: string;
}

export interface deleteUserType {
  id: string;
  page: number;
  branchId: number;
  teamId: number
}

export interface callStateType {
  type: string;
  number: string;
  time: string;
}

export interface monitoringStateType extends callStateType {
  monitoring_state: string;
  user_id: number;
}