import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/message';
import * as common from 'types/common';

export type TMessageAction = ActionType<typeof actions>;

export interface IMessageState {
  request: IRequestType;
  max_count_data: Array<IMaxMessageItem>;
}

export interface IRequestType {
  getSmsCount: common.FetchType;
  modifySmsCount: common.FetchType;
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
