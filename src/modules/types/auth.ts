import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/auth';
import * as common from 'modules/types/common';

export type AuthAction = ActionType<typeof actions>;

export interface AuthType {
  login: common.checkFetchType;
  logout: common.checkFetchType;
  checkLogin: common.checkFetchType;
  loginInfo: loginInfoType;
}

export interface requestType extends common.historyType {
  id: string;
  password: string;
}

export interface loginInfoType {
  id: number; // unique key
  admin_id: number; // 관리자 권한
  branch_id: number; // 해당 관리자의 지점 id
  team_id: string; // 해당 관리자의 팀 id?
  name: string; // 유저 이름
  number: string; // 전화번호
  ziboxip: string; // zibox ip
  login_at: number; // 로그인 시간
  created_at: string; // 회원가입날짜
}
