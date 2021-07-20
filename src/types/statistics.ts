import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/statistics';
import * as common from 'types/common';

export type StatisticsAction = ActionType<typeof actions>;

export interface StatisticsState {
  request: RequestType;
  statistics: Array<StatisticsData>;
}

export interface RequestType {
  getStatistics: common.FetchType;
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

export interface RequestGetStatistics {
  start_date: string;
  end_date: string;
  search_type?: number;
  search_text?: string;
}
