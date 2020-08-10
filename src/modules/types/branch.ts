import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/branch';
import * as common from 'modules/types/common';

export type BranchAction = ActionType<typeof actions>;

export interface BranchType<T> {
  branch: common.checkFetchType;
  insertBranch: common.checkFetchType;
  updateBranch: common.checkFetchType;
  deleteBranch: common.checkFetchType;
  insertTeam: common.checkFetchType;
  updateTeam: common.checkFetchType;
  deleteTeam: common.checkFetchType;
  branchInfo: object | BranchInfoType<T>;
}

export interface BranchInfoType<T> {
  T: Array<BranchInfo | TeamInfo>;
}

export interface BranchInfo {
  branch_name: string;
  created_at: string;
  id: number;
}

export interface TeamInfo {
  branch_id: number;
  id: number;
  team_name: string;
}

export interface RequestAddBranch {
  name: string;
}

export interface RequestAddTeam {
  name: string;
  branch_id: number;
  team_id: number;
}

export interface AddBranch {
  id: number;
  name: string;
}

export interface AddTeam {
  branch_id: number;
  before_id: number;
  next_id: number;
  name: string;
}

export interface ChangeInput {
  id: number;
  value: string;
}