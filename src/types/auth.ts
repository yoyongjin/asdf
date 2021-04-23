import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/auth';
import * as common from 'modules/types/common';

export type AuthAction = ActionType<typeof actions>;

export interface AuthType {
  request: RequestType;
  loginInfo: SuccessLogin;
  socketConnectionStatus: number;
  tappingStatus: number;
  serverTime: number;
  localTime: number;
  tappingTarget: TappingTarget;
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
}

export interface RequestLogin extends common.RouterType {
  id: string;
  password: string;
}

/**
 * admin_id: 관리자 권한 (0 - 상담원, 1 - 일반 관리자, 2 - 슈퍼 관리자)
 * branch_id: 해당 관리자의 지점 id
 * branch_name: 지점명
 * created_at: 회원가입 날짜
 * id: unique id
 * login_at: 마지막 로그인한 시간
 * name: 이름
 * number: 전화번호
 * team_id: 해당 관리자의 팀 id
 * zibox_ip: zibox ip
 */
export interface SuccessLogin {
  admin_id: number;
  branch_id: number;
  branch_name?: string;
  created_at: string;
  id: number;
  login_at: number;
  name: string;
  number: string;
  team_id: string;
  ziboxip: string;
}
