import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/auth';
import * as common from 'modules/types/common';

export type AuthAction = ActionType<typeof actions>;

export interface AuthType {
  request: RequestType;
  loginInfo: LoginInfoType;
  socket: number;
}

export interface RequestType {
  login: common.FetchType;
  logout: common.FetchType;
  checkLogin: common.FetchType;
}

export interface LoginType extends common.RouterType {
  id: string;
  password: string;
}

/**
 * id: unique id
 * admin_id: 관리자 권한 (0 - 상담원, 1 - 일반 관리자, 2 - 슈퍼 관리자)
 * branch_id: 해당 관리자의 지점 id
 * branch_name: 지점명
 * team_id: 해당 관리자의 팀 id
 * name: 이름
 * number: 전화번호
 * zibox_ip: zibox ip
 * login_at: 마지막 로그인한 시간
 * created_at: 회원가입 날짜
 */
export interface LoginInfoType {
  id: number;
  admin_id: number;
  branch_id: number;
  branch_name?: string;
  team_id: string;
  name: string;
  number: string;
  ziboxip: string;
  login_at: number;
  created_at: string;
}
