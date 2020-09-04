import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/branch';
import * as common from 'modules/types/common';

export type BranchAction = ActionType<typeof actions>;

export interface BranchType<T> {
  branch: common.FetchType;
  insertBranch: common.FetchType;
  updateBranch: common.FetchType;
  deleteBranch: common.FetchType;
  insertTeam: common.FetchType;
  updateTeam: common.FetchType;
  deleteTeam: common.FetchType;
  branchName: common.FetchType;
  branchInfo: object | BranchInfoType<T>;
  numberOfBranch: number;
  namesList: NameListType;
}

export interface NameListType {
  branch: Array<BranchInfo> | null;
  team: Array<TeamInfo> | null;
  userBranch: Array<BranchInfo> | null;
  userTeam: Array<TeamInfo> | null;
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

export interface TemporaryTeam {
  branch_id: number;
}

export interface RequestUpdateTeam {
  id: number;
  name: string;
  branch_id: number;
}

export interface SuccessUpdateTeam {
  id: number;
  name: string;
  branch_id: number;
}

export interface RequestUpdateBranch {
  id: number;
  name: string;
}

export interface BranchId {
  branch_id: number;
  type?: boolean;
}

export interface DelelteData {
  branch_id: number;
  team_id: number;
  count?: number;
}

export interface SuccessDeleteBranch {
  branch_id: number;
  count?: number;
}
