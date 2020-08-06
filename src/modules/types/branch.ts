import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/branch';
import * as common from 'modules/types/common';

export type BranchAction = ActionType<typeof actions>;

export interface BranchType {
  branch: common.checkFetchType;
  branchInfo: any;
}
