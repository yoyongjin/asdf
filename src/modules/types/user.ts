import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/user';
import * as common from 'types/common';

export type UserAction = ActionType<typeof actions>;

export interface UserType {
  request: RequestType;
  userList: UserListType;
  filterUserList: UserListType;
  status: { [key: string]: StatusType };
  monit: {
    tapping: boolean;
    pc_ip: string;
  };
}

export interface StatusType {
  call?: {
    call: string;
    connection: number;
    number: string;
    time: number;
  };
  consultant?: {
    number: string;
    tmr: number;
  };
  zibox?: {
    ats: number;
    connection: number;
    monitoring: number;
    number: string;
    pc_ip: string;
    record: number;
    zibox_ip: string;
    zibox_mac: string;
    monit_user: number;
  };
}

export interface RequestType {
  getUser: common.FetchType;
  insertUser: common.FetchType;
  updateUser: common.FetchType;
  deleteUser: common.FetchType;
  resetPassword: common.FetchType;
}

export interface UserListType {
  users: Array<UserInfo>;
  consultants: Array<ConsultantInfoType>;
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
  ziboxmic: number;
  ziboxspk: number;
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
  ziboxmic: number;
  ziboxspk: number;
  call_status?: string;
  consultant_status?: number;
  phone_status?: number;
  ats_status?: number;
  zibox_status?: number;
  monit_status?: number;
  record_status?: number;
  call_time?: number;
  diff?: number;
  pc_ip?: string;
  zibox_ip?: string;
  zibox_mac?: string;
  monit_user?: number;
  // 밑에는 삭제 예정
  monitoring?: boolean;
  call_type?: string;
  user_id?: number;
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
  ziboxmic?: number;
  ziboxspk?: number;
}

export interface getRequestType {
  branchId: number;
  teamId: number;
  limit: number;
  page: number;
  search?: string;
  url: string;
  adminId?: number;
  loginId?: number;
}

export interface SuccessUserType {
  users: Array<UserInfo>;
  count: number;
  url: string;
  loginId: number;
}

export interface SuccessConsultantType {
  users: Array<ConsultantInfoType>;
  count: number;
}

export interface UpdateUserInfoType extends UserInfoType {
  user_id: string;
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
  id: number;
  page: number;
  branchId: number;
  teamId: number;
  adminId: number;
}

export interface callStateType {
  status: string;
  number: string;
  time: string;
}

export interface monitoringStateType extends callStateType {
  monitoring_state: string;
  user_id: number;
}
