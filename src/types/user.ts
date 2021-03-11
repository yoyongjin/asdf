import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/user';
import * as common from 'modules/types/common';

export type UserAction = ActionType<typeof actions>;

export interface UserType {
  request: RequestType;
  userList: UsersData;
  filterUserList: UsersData;
  status: ConsultantStatusByNumber;
}

export interface RequestType {
  getUser: common.FetchType;
  insertUser: common.FetchType;
  updateUser: common.FetchType;
  deleteUser: common.FetchType;
  resetPassword: common.FetchType;
}

export interface UsersData {
  users: Array<UserInfo>;
  consultants: Array<ConsultantInfoType>;
  numberOfUsers: number;
}

export interface ConsultantStatusByNumber {
  [number: string]: ConsultantStatus;
}

export interface ConsultantStatus {
  number: string;
  time: number;
  type: string;
  monitoring_state?: string;
  user_id?: number;
}

export interface ConsultantStatus_v2 {
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

export interface ConsultantInfoType extends UserInfo {
  call_status?: string;
  consultant_status?: number;
  phone_status?: number;
  ats_status?: number;
  zibox_status?: number;
  monit_status?: number;
  record_status?: number;
  call_start_time?: number;
  calling_time?: number;
  pc_ip?: string;
  zibox_ip?: string;
  zibox_mac?: string;
  monit_user?: number;
  // 밑에는 삭제 예정
  monitoring?: boolean;
  call_type?: string;
  user_id?: number;
}

export interface ChangeUser {
  branch_id: number;
  userInfo: UserInfo;
}

export interface SuccessGetUsers {
  users: Array<UserInfo>;
  count: number;
  url: string;
  loginId: number;
}
