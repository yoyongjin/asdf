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
  callStatisticsByTeam: Array<ICustomCallStatisticeByTeamItem>; // 팀별 통화 통계
  callStatisticsByTeamAllCount: number; // 팀별 통화 통계 총 수
  autoMessageStatistics: Array<IAutoMessageStatisticsItem>; // 자동 문자 통계
  autoMessageStatisticsAllCount: number; // 자동 문자 통계
  messageStatistics: Array<IMessageStatisticsItem>; // 문자 통계
  messageStatisticsAllCount: number; // 문자 통계 총 수
  allAutoMessageStatistics: Array<IAutoMessageStatisticsItem>; // 자동 문자 통계 전체 데이터
  allMessageStatistics: Array<IMessageStatisticsItem>; // 문자 통계 전체 데이터
}

export interface IRequestType {
  getStatistics: common.FetchType;
  getCallStatisticsByConsultant: common.FetchType;
  getCallStatisticsByTeam: common.FetchType;
  getAutoMessageStatistics: common.FetchType;
  getMessageStatistics: common.FetchType;
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

export interface IExcelItem {
  isExcel: boolean;
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

export interface ICustomCallStatisticeByTeamItem {
  branch_name: string;
  team_name: string;
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
  branch_name: string; // 센터명
  id: number; // key
  incoming: Array<ICallStatisticsItem>; // 수신 통화 통계
  name: string; // 이름
  outcoming: Array<ICallStatisticsItem>; // 발신 통화 통계
  sub_total: ICallStatisticTotalItem; // 소계
  team_name: string; // 팀명
  tmr_cd: string; // 유저 ID
}

// 팀별 통계 item
export interface ICallStatisticeByTeamItem {
  all: Array<ICallStatisticsItem>; // 총 통화 통계
  branch_name: string; // 센터명
  id: number; // key
  incoming: Array<ICallStatisticsItem>; // 수신 통화 통계
  outcoming: Array<ICallStatisticsItem>; // 발신 통화 통계
  sub_total: ICallStatisticTotalItem; // 소계
  team_name: string; // 팀명
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

// 자동 문자 통계 item
export interface IAutoMessageStatisticsItem {
  branch_name: string; // 센터명
  cnt: number; // 발송 건수
  date: string; // 일자
  days: string; // 자동 문자 발송 요일
  end_date: string | null; // 자동 문자 종료 날짜
  end_time: string | null; // 자동 문자 종료 시각
  start_date: string | null; // 자동 문자 시작 날짜
  start_time: string | null; // 자동 문자 시작 시간
  team_name: string; // 팀명
  title: string; // 자동 문자 제목
  tmr_cd: string | null; // 상담원 ID
  tmr_name: string; // 상담원명
}

// 문자 통계 item
export interface IMessageStatisticsItem {
  branch_name: string; // 센터명
  daily_cnt_auto_message: number; // 일 자동문자 발송 수량
  daily_cnt_message: number; // 일 발송 수량
  daily_cnt_mms: number; // 일 MMS 발송 수량
  date: string; // 날짜
  max_count_date: number; // 일 최대발송 수량
  max_count_month: number; // 월 최대발송 수량
  monthly_cnt_auto_message: number; // 월 자동문자 발송 수량
  monthly_cnt_message: number; // 월 발송 수량
  monthly_cnt_mms: number; // 월 MMS 발송 수량
  team_name: string; // 팀명
  tmr_cd: string | null; // 상담원 ID
  tmr_name: string; // 상담원명
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
  isExcel: boolean; // 엑셀 여부(전체 데이터)
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

// 팀별 통화 통계 요청 파라미터
export interface IRequestGetCallStatisticsByTeam {
  end_date: string; // 끝 날짜 ex) 2022-04-11
  end_time: string; // 끝 시간 ex) 00:00
  ids: string; // 팀 id 복수개 ex) 1,2,3
  include_leaver: string; // 해촉 여부 ex) 1
  isExcel: boolean; // 엑셀 여부(전체 데이터)
  start_date: string; // 시작 날짜 ex) 2022-04-11
  start_time: string; // 시작 시간 ex) 00:00
  search_type: number; // 검색 조건
  page: number; // 페이지
  page_count: number; // 페이지당 노출 개수
}

// 팀별 통화 통계 응답 파라미터
export interface IResponseGetCallStatisticsByTeam extends IPageItem {
  common: IResponseGetCallStatisticsByTeamCommonItem;
  list: Array<ICallStatisticeByTeamItem>;
}

interface IResponseGetCallStatisticsByTeamCommonItem {
  cnt: number;
  total: ICallStatisticTotalItem;
}

// 자동 문자 통계 요청 파라미터
export interface IRequestGetAutoMessageStatistics {
  end_date: string; // 끝 날짜 ex) 2022-04-11
  ids: string; // 상담원 id 복수개 ex) 1,2,3
  include_leaver: string; // 해촉 여부 ex) 1
  isExcel: boolean; // 엑셀 여부(전체 데이터)
  start_date: string; // 시작 날짜 ex) 2022-04-11
  page: number; // 페이지
  page_count: number; // 페이지당 노출 개수
}

export interface IResponseGetAutoMessageStatistics extends IExcelItem {
  cnt: number;
  list: Array<IAutoMessageStatisticsItem>;
}

// 문자 통계 요청 파라미터
export interface IRequestGetMessageStatistics {
  end_date: string; // 끝 날짜 ex) 2022-04-11
  ids: string; // 상담원 id 복수개 ex) 1,2,3
  include_leaver: string; // 해촉 여부 ex) 1
  isExcel: boolean; // 엑셀 여부(전체 데이터)
  start_date: string; // 시작 날짜 ex) 2022-04-11
  page: number; // 페이지
  page_count: number; // 페이지당 노출 개수
}

export interface IResponseGetMessageStatistics extends IExcelItem {
  cnt: number;
  list: Array<IMessageStatisticsItem>;
}
