import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/phone';
import * as common from 'types/common';

export type TPhoneAction = ActionType<typeof actions>;

export interface IPhoneState {
  request: IRequestType;
  telecoms: Array<ITelecomItem>; // 통신사
  plans: Array<ITelecomPlnaItem>; // 요금제
  info: IPhoneInfoItem; // phone 정보
  phones: Array<IPhoneItem>;
  phonesAllCount: number;
}

export interface IRequestType {
  getTelecom: common.FetchType;
  getPlanByTelecom: common.FetchType;
  getPhoneInfo: common.FetchType;
  getPhones: common.FetchType;
  modifyPhoneInfo: common.FetchType;
  removePhoneInfo: common.FetchType;
}

export interface ITelecomItem {
  id: number;
  telecom: string; // 통신사
}

export interface ITelecomPlnaItem {
  id: number;
  plan: string; // 요금제
}

export interface IPhoneInfoItem {
  serial_number: string;
  telecom: string;
  plan: string;
  used: number;
}

export interface IPhoneItem {
  branch_name: string | null; // 센터명
  id: number; // key 값
  number: string; // 전화번호
  plan: string | null; // 요금제
  team_name: string | null; // 팀명
  telecom: string | null; // 통신사
  tmr_cd: string | null; // 상담원 ID
  tmr_name: string | null; // 상담원명
  updated_at: string; // 최근 변경일시
  used: number; // 개통 상태
}

export interface IRequestGetPlanParams {
  telecom: string;
}

export interface IRequestGetPhoneInfoParams {
  number: string;
}

export interface IRequestGetAllPhoneInfo {
  is_match: boolean; // 미할당 여부
  page: number; // 페이지 수
  page_count: number; // limit
  search_text: string; // 검색어
}

export interface IRequestModifyPhoneInfo {
  id: number;
  number: string;
  plan: string;
  telecom: string;
  used: number;
}

export interface IRequestRemovePhoneInfo {
  id: number;
}

export interface IResponseGetAllPhoneInfo {
  cnt: number;
  list: Array<IPhoneItem>;
}
