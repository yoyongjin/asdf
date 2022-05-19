import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/batch';
import * as common from 'types/common';

export type TBatchAction = ActionType<typeof actions>;

export interface IBatchState {
  request: IRequest;
  ksvc_process_status: boolean;
}

export interface IRequest {
  syncBatchUser: common.FetchType;
  syncKSVC: common.FetchType;
  syncPhoneInfo: common.FetchType;
  syncIP: common.FetchType;
}
