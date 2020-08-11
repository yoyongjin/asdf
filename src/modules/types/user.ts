import { ActionType } from 'typesafe-actions';
import { Location } from 'history';

import * as actions from 'modules/actions/user';
import * as common from 'modules/types/common';

export type UserAction = ActionType<typeof actions>;

export interface UserType {
  consultant: common.checkFetchType;
  consultantInfo: Array<ConsultantInfoType>;
  insertUser: common.checkFetchType;
  updateUser: common.checkFetchType;
  deleteUser: common.checkFetchType;
  numberOfUsers: number;
}

export interface RequestType {
  location: Location;
  branchId: number;
  teamId: number;
  limit: number;
  page: number;
  search?: string;
}

export interface SuccessUserType {
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
  admin_id: string;
  branch_id: string;
  branch_name: null | string;
  id: number;
  login_at: number;
  name: string;
  number: string;
  team_id: string;
  team_name: null | string;
  user_name: string;
  ziboxip: string;
  call_time?: number;
  call_type?: string;
  diff?: number;
}
