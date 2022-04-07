import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/message';
import * as common from 'types/common';

export type TMessageAction = ActionType<typeof actions>;

export interface IMessageState {
  request: IRequestType;
  max_count_data: Array<IMaxMessageItem>;
  autoMessageData: Array<IAutoMessageItem>;
  autoMessageAllCount: number;
}

export interface IRequestType {
  getAutoMessage: common.FetchType;
  getSmsCount: common.FetchType;
  modifySmsCount: common.FetchType;
}

export interface IAutoMessageItem {
  id: number;
  branch_id: number; // 지점 ID
  title: string; // 제목
  content: string; // 내용
  start_date: string | null; // 시작 날짜
  end_date: string | null; // 종료 날짜
  start_time: string | null; // 시작 시간
  end_time: string | null; // 종료 시간
  days: string | null; // 요일
  use_yn: string; // 사용 유무
  code: string | null; // 특정값 (사용 x)
  priority: string | null; // 우선순위 (사용 x)
  created_at: string; // 생성 시간
}

export interface IMaxMessageItem {
  branch_id: number;
  branch_name: string;
  max_count_date: number;
  max_count_mouth: number;
}

export interface IRequestModifySmsCount {
  branch_id: number;
  max_count_date: number;
  max_count_mouth: number;
}

export interface IRequestGetAutoMessage {
  id: number; // 지점 ID
  page: number; // 페이지
  count: number; // 갯수
}

export interface IResponseGetAutoMessage {
  data: Array<IAutoMessageItem>;
  count: number;
}
