import { ActionType } from 'typesafe-actions';
import { Location } from 'history';

import * as actions from 'modules/actions/user';
import * as common from 'modules/types/common';

export type UserAction = ActionType<typeof actions>;

export interface UserType {
  consultant: common.checkFetchType;
  consultantInfo: Array<ConsultantInfoType>;
  numberOfUsers: number;
}

export interface RequestType {
  location: Location;
  branchId: number;
  teamId: number;
  limit: number;
  page: number;
  search?: string;
}

export interface SuccessUserType {
  users: Array<ConsultantInfoType>;
  count: number;
}

export interface ConsultantInfoType {
  admin_id: string;
  branch_name: null | string;
  id: number;
  login_at: number;
  name: string;
  number: string;
  team_name: null | string;
  user_name: string;
  ziboxip: string;
  call_time?: number;
  call_type?: string;
  diff?: number;
}
