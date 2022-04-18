import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/statistics';
import * as common from 'types/common';

export type TStatisticsAction = ActionType<typeof actions>;

export interface IStatisticsState {
  request: IRequestType;
  statistics: Array<StatisticsData>;
  // v2 통계
  callStatisticsByConsultant: Array<ICustomCallStatisticeByConsultantItem>; // 상담원별 통화 통계
  callStatisticsByConsultantAllCount: number; // 상담원별 통화 통계 총 수
}

export interface IRequestType {
  getStatistics: common.FetchType;
  getCallStatisticsByConsultant: common.FetchType;
}

export interface StatisticsData {
  id: number;
  branch_name: string;
  team_name: string;
  name: string;
  number: string;
  outbound_count: number;
  success_count: number;
  success_ratio: number;
  inbound_count: number;
  all_call_time: number;
}

export interface IPageItem {
  page: number;
  limit: number;
}

export interface ICustomCallStatisticeByConsultantItem {
  branch_name: string;
  team_name: string;
  name: string;
  tmr_cd: string;
  date: string;
  all_total_call: number;
  all_connect_call: number;
  all_fail_call: number;
  all_total_time: number;
  all_ring_time: number;
  all_talk_time: number;
  incoming_total_call: number;
  incoming_connect_call: number;
  incoming_fail_call: number;
  incoming_total_time: number;
  incoming_ring_time: number;
  incoming_talk_time: number;
  outcoming_total_call: number;
  outcoming_connect_call: number;
  outcoming_fail_call: number;
  outcoming_total_time: number;
  outcoming_ring_time: number;
  outcoming_talk_time: number;
}

// 상담원별 통계 item
export interface ICallStatisticeByConsultantItem {
  all: Array<ICallStatisticsItem>; // 총 통화 통계
  branch_name: string; // 지점명
  id: number; // key
  incoming: Array<ICallStatisticsItem>; // 수신 통화 통계
  name: string; // 이름
  outcoming: Array<ICallStatisticsItem>; // 발신 통화 통계
  sub_total: ICallStatisticTotalItem; // 소계
  team_name: string; // 팀명
  tmr_cd: string; // 유저 ID
}

// 통화 통계 합게 item
export interface ICallStatisticTotalItem {
  all: ICallStatisticsItem;
  incoming: ICallStatisticsItem;
  outcoming: ICallStatisticsItem;
}

// 통화 통계 item
export interface ICallStatisticsItem {
  connect_call: number; // 성공 통화 수
  date: string; // 통화 날짜
  fail_call: number; // 실패 통화 수
  ring_time: number; // 벨이 울린 시간
  talk_time: number; // 통화가 연결된 후 시간
  total_call: number; // 총 통화 수
  total_time: number; // 총 콜 시간
}

export interface RequestGetStatistics {
  start_date: string;
  end_date: string;
  search_type?: number;
  search_text?: string;
}

// 상담원별 통화 통계 요청 파라미터
export interface IRequestGetCallStatisticsByConsultant {
  end_date: string; // 끝 날짜 ex) 2022-04-11
  end_time: string; // 끝 시간 ex) 00:00
  ids: string; // 상담원 id 복수개 ex) 1,2,3
  include_leaver: string; // 해촉 여부 ex) 1
  start_date: string; // 시작 날짜 ex) 2022-04-11
  start_time: string; // 시작 시간 ex) 00:00
  search_type: number; // 검색 조건
  page: number; // 페이지
  page_count: number; // 페이지당 노출 개수
}

// 상담원별 통화 통계 응답 파라미터
export interface IResponseGetCallStatisticsByConsultant extends IPageItem {
  common: IResponseGetCallStatisticsByConsultantCommonItem;
  list: Array<ICallStatisticeByConsultantItem>;
}

interface IResponseGetCallStatisticsByConsultantCommonItem {
  cnt: number;
  total: ICallStatisticTotalItem;
}
