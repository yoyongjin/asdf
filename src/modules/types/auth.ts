import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/auth';
import * as common from 'modules/types/common';

export type AuthAction = ActionType<typeof actions>;

export interface AuthType {
  request: RequestType;
  loginInfo: LoginInfoType;
}

export interface RequestType {
  login: common.FetchType;
  logout: common.FetchType;
  checkLogin: common.FetchType;
}

export interface LoginType extends common.HistoryType {
  id: string;
  password: string;
}

export interface LoginInfoType {
  id: number; // unique key
  admin_id: number; // 관리자 권한
  branch_id: number; // 해당 관리자의 지점 id
  team_id: string; // 해당 관리자의 팀 id?
  name: string; // 유저 이름
  number: string; // 전화번호
  ziboxip: string; // zibox ip
  login_at: number; // 로그인 시간
  created_at: string; // 회원가입날짜
  branch_name: string; // 지점명
}
