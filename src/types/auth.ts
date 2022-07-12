import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/auth';
import * as common from 'types/common';

export type AuthAction = ActionType<typeof actions>;

export interface AuthState {
  request: RequestType;
  loginInfo: LoginData;
  socketConnectionStatus: number;
  tappingStatus: number;
  serverTime: number;
  localTime: number;
  tappingTarget: TappingTarget;
  monitoringView: string;
}

export interface TappingTarget {
  id: number;
  ip: string;
  number: string;
}

export interface TappingData {
  status: number;
  id?: number;
  ip?: string;
  number?: string;
}

export interface RequestType {
  login: common.FetchType;
  logout: common.FetchType;
  checkLogin: common.FetchType;
  changePassword: common.FetchType;
}

export interface RequestLogin {
  id: string;
  password: string;
}

export interface LoginData {
  id: number;
  branch_id: number;
  team_id: number;
  branch_name: string | null;
  team_name: string | null;
  admin_id: number;
  name: string;
  user_name: string;
  login_at: number;
  is_init_password: boolean;
  is_expired_password: boolean;
}

export interface RequestChangePassword {
  current_password: string;
  new_password: string;
  new_confirm_password: string;
}
