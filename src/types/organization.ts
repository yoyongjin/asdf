import { ActionType } from 'typesafe-actions';

import * as actions from 'modules/actions/branch';
import * as common from 'modules/types/common';

export type OrganizationAction = ActionType<typeof actions>;

export interface OrganizationState<T> {
  request: RequestType;
  organizations: OrganizationData<T> | object;
  numberOfBranch: number;
  branch: EachBranch;
  team: EachTeam;
}

export interface RequestType {
  getOrganization: common.FetchType;
  getBranch: common.FetchType;
  getTeam: common.FetchType;
  addBranch: common.FetchType;
  addTeam: common.FetchType;
  modifyBranch: common.FetchType;
  modifyTeam: common.FetchType;
  removeBranch: common.FetchType;
  removeTeam: common.FetchType;
}

export interface OrganizationData<T> {
  T: Array<BranchData | TeamData>;
}

export interface BranchData {
  id: number;
  branch_name: string;
}

export interface TeamData {
  id: number;
  team_name: string;
  branch_id: number;
}

export interface EachBranch {
  all: Array<BranchData>;
  user: Array<BranchData>;
}

export interface EachTeam {
  all: Array<TeamData>;
  user: Array<TeamData>;
}

export interface RequestGetBranch {
  isIndividual: boolean;
}

export interface RequestGetTeam {
  isIndividual: boolean;
  branch_id: number;
}

export interface RequestAddBranch {
  name: string;
}

export interface SuccessAddBranch extends RequestAddBranch {
  id: number;
}

export interface RequestModifyBranch {
  id: number;
  name: string;
}

export interface SuccessModifyBranch extends RequestModifyBranch {}

export interface RequestRemoveBranch {
  id: number;
}

export interface SuccessRemoveBranch {
  branch_id: number;
  team_id: number;
  count?: number;
}

export interface RequestAddTeam {
  branch_id: number;
  team_id: number;
  name: string;
}

export interface SuccessAddTeam {
  branch_id: number;
  before_id: number;
  next_id: number;
  name: string;
}

export interface RequestModifyTeam {
  id: number;
  branch_id: number;
  name: string;
}

export interface SuccessModifyTeam extends RequestModifyTeam {}

export interface RequestRemoveTeam {
  branch_id: number;
  team_id: number;
}

export interface SuccessRemoveTeam extends RequestRemoveTeam {
  count?: number;
}
