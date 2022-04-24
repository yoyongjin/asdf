import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/user';
import * as common from 'types/common';

export type UserAction = ActionType<typeof actions>;

export interface UserState {
  request: RequestType;
  user: Array<UserData>;
  consultant: Array<UserData>;
  numberOfUsers: number;
  userCount: number;
  realTimeStatus: ConsultantAllStatusByNumberV2;
  plural_consultant: Array<IConsultantItem>;
}

export interface RequestType {
  getPluralConsultant: common.FetchType;
  getUser: common.FetchType;
  addUser: common.FetchType;
  modifyUser: common.FetchType;
  removeUser: common.FetchType;
  resetPassword: common.FetchType;
  modifyZiBoxVolume: common.FetchType;
}

export interface UsersData {
  users: Array<UserInfo>;
  consultants: Array<ConsultantInfo>;
  numberOfUsers: number;
}

export interface UserInfo extends ConsultantAllStatus {
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

export interface ConsultantInfo extends UserInfo {
  calling_time?: number;
  call?: CallStatus;
  consultant?: ConsultantStatus;
  phone?: PhoneStatus;
  zibox?: ZiboxStatus;
}

export interface ConsultantAllStatusByNumber {
  [number: string]: ConsultantAllStatus;
}

export interface ConsultantAllStatus {
  call?: CallStatus;
  consultant?: ConsultantStatus;
  phone?: PhoneStatus;
  zibox?: ZiboxStatus;
  number: string;
}

export interface CallStatus {
  number?: string;
  status: number;
  time: number;
}

export interface ConsultantStatus {
  number?: string;
  status: number;
}

export interface PhoneStatus {
  connection: number;
  number?: string;
}

export interface ZiboxStatus {
  ats: number;
  connection: number;
  monitoring: number;
  monit_user: number;
  number: string;
  pc_ip: string;
  record: number;
  zibox_mac: string;
  zibox_ip: string;
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
  status?: ConsultantStatus;
  // 밑에는 삭제 예정
  monitoring?: boolean;
  call_type?: string;
  user_id?: number;
}

export interface ChangeUser {
  userInfo: UserData;
}

export interface IConsultantItem {
  id: number;
  name: string;
}

/**
 * @deprecated
 */
// export interface SuccessGetUsers {
//   users: Array<UserInfo>;
//   count: number;
//   url: string;
// }

export interface TimeData {
  server_time: number;
  local_time: number;
}

// 새로 만듬
export interface UserData extends ConsultantAllStatus_V2 {
  id: number;
  branch_id: number;
  team_id: number;
  branch_name: string;
  team_name: string;
  admin_id: number;
  name: string;
  user_name: string | null;
  number: string | null;
  pc_ip: string | null;
  zibox_id: number | null;
  zibox_ip: string | null;
  zibox_mac: string | null;
  zibox_mic: number | null;
  zibox_spk: number | null;
  zibox_ip_type: string | null;
  zibox_fw_version: string | null;
  call_available_id: number | null;
  available_time: string | null;
  in_time: string | null;
  out_time: string | null;
  login_at: number | null;
}

export interface ConsultantAllStatus_V2 {
  call?: CallStatus;
  consultant?: ConsultantStatus;
  phone?: PhoneStatus;
  zibox?: ZiboxStatus;
  calling_time?: number;
}

export interface SuccessGetUsers {
  users: Array<UserData>;
  count: number;
  url: string;
}

export interface ConsultantAllStatusByNumberV2 {
  [number: string]: ConsultantAllStatus_V2;
}

export interface RequestZiBoxVolume {
  number: string;
  ziboxmic: number;
  ziboxspk: number;
}

export interface RequestGetUsers {
  branch_id: number;
  team_id: number;
  limit: number;
  page: number;
  search?: string;
  url: string;
  include_leaver: boolean; // 해촉 여부
}

export interface RequestAddUser {
  branch_id: number;
  team_id: number;
  admin_id: number;
  name: string;
  user_name?: string;
  number?: string;
  pc_ip?: string;
  ziboxip?: string;
  ziboxmac?: string;
  ziboxmic?: number;
  ziboxspk?: number;
}

export interface RequestModifyUser extends RequestAddUser {
  id: number;
  origin_number?: string;
  available_time?: string;
  in_message?: string;
  out_message?: string;
  telecom?: string;
  plan?: string;
  used?: number;
  serial_number?: string;
}

export interface RequestRemoveUser {
  id: number;
  branch_id: number;
  team_id: number;
  limit: number;
  page: number;
  search: string;
}

export interface RequestResetPassword {
  id: number;
}

export interface IRequestGetPluralConsultant {
  ids: string;
}
