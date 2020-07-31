import { ActionType } from 'typesafe-actions';
import { History } from 'history';

import * as actions from 'modules/actions/auth';

export type AuthAction = ActionType<typeof actions>;

export interface FetchingType {
  fetching?: boolean;
  error?: boolean | failureType;
}

export interface AuthType {
  login: FetchingType;
  logout: FetchingType;
  checkLogin: FetchingType;
  userInfo: successType;
}

export interface requestType extends historyType{
  id: string;
  password: string;
}

export interface successType {
  id: number; // unique key
  admin_id: string; // 관리자 권한
  branch_id: number; // 해당 관리자의 지점 id
  team_id: string; // 해당 관리자의 팀 id?
  name: string; // 유저 이름
  number: string; // 전화번호
  ziboxip: string; // zibox ip
  login_at: number; // 로그인 시간
  created_at: string; // 회원가입날짜
}

export interface failureType {
  error: Error;
}

export interface historyType {
  history: History;
}
