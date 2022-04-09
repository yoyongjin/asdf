import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestGetOrganization,
  requestAddBranch,
  requestAddTeam,
  addTemperatureBranch,
  requestModifyBranch,
  requestModifyTeam,
  requestRemoveBranch,
  requestRemoveTeam,
  requestGetBranch,
  requestGetTeam,
  requestGetPluralBranch,
} from 'modules/actions/organization';
import { RootState } from 'modules/reducers';

function useOrganization() {
  const organizations = useSelector(
    (state: RootState) => state.organization.organizations,
  ); // 지점 정보
  const branches = useSelector(
    (state: RootState) => state.organization.branch.all,
  ); // 지점명 리스트
  const teams = useSelector((state: RootState) => state.organization.team.all); // 팀명 리스트
  const userBranches = useSelector(
    (state: RootState) => state.organization.branch.user,
  ); // 지점명 리스트
  const userTeams = useSelector(
    (state: RootState) => state.organization.team.user,
  ); // 지점명 리스트
  const pluralBranch = useSelector(
    (state: RootState) => state.organization.plural_branch,
  ); // 지점명 여러개 리스트

  const dispatch = useDispatch();

  const getOrganizations = useCallback(() => {
    dispatch(requestGetOrganization());
  }, [dispatch]);

  const getPluralBranch = useCallback(() => {
    dispatch(requestGetPluralBranch());
  }, [dispatch]);

  const getBranches = useCallback(() => {
    const payload = {
      isIndividual: false,
    };

    dispatch(requestGetBranch(payload));
  }, [dispatch]);

  const getTeams = useCallback(
    (branchId: number) => {
      const payload = {
        branch_id: branchId,
        isIndividual: false,
      };

      dispatch(requestGetTeam(payload));
    },
    [dispatch],
  );

  const getUserBranches = useCallback(() => {
    const payload = {
      isIndividual: true,
    };

    dispatch(requestGetBranch(payload));
  }, [dispatch]);

  const getUserTeams = useCallback(
    (branchId: number) => {
      const payload = {
        branch_id: branchId,
        isIndividual: true,
      };

      dispatch(requestGetTeam(payload));
    },
    [dispatch],
  );

  const handleAddBranch = useCallback(
    (name: string) => {
      // 지점 추가
      const payload = {
        name,
      };

      dispatch(requestAddBranch(payload));
    },
    [dispatch],
  );

  const handleAddTeam = useCallback(
    (branchId: number, teamId: number, name: string) => {
      // 팀 추가
      const payload = {
        name,
        branch_id: branchId,
        team_id: teamId,
      };
      dispatch(requestAddTeam(payload));
    },
    [dispatch],
  );

  const handleModifyBranch = useCallback(
    (id: number, name: string) => {
      // 지점 수정
      const payload = {
        id,
        name,
      };

      dispatch(requestModifyBranch(payload));
    },
    [dispatch],
  );

  const handleModifyTeam = useCallback(
    (id: number, name: string, branchId: number) => {
      const payload = {
        id,
        name,
        branch_id: branchId,
      };
      dispatch(requestModifyTeam(payload));
    },
    [dispatch],
  );

  const handleRemoveBranch = useCallback(
    (id) => {
      const payload = {
        id,
      };

      dispatch(requestRemoveBranch(payload));
    },
    [dispatch],
  );

  const handleRemoveTeam = useCallback(
    (branchId: number, teamId: number) => {
      const payload = {
        branch_id: branchId,
        team_id: teamId,
      };
      dispatch(requestRemoveTeam(payload));
    },
    [dispatch],
  );

  const onClickAddTempBranch = useCallback(() => {
    // 지점 추가 시, 리덕스에 임시값을 넣는 로직
    const branchKeys = Object.getOwnPropertyNames(organizations);
    const findKey = branchKeys.find((key) => key === '-1');
    if (findKey) {
      return;
    }
    dispatch(addTemperatureBranch());
  }, [dispatch, organizations]);

  return {
    organizations,
    branches,
    teams,
    userBranches,
    userTeams,
    pluralBranch,
    getOrganizations,
    getPluralBranch,
    getBranches,
    getTeams,
    getUserBranches,
    getUserTeams,
    handleAddBranch,
    handleAddTeam,
    handleModifyBranch,
    handleModifyTeam,
    handleRemoveBranch,
    handleRemoveTeam,
    onClickAddTempBranch,
  };
}

export type HandleAddBranch = (name: string) => void;
export type HandleAddTeam = (
  branchId: number,
  teamId: number,
  name: string,
) => void;
export type HandleModifyBranch = (id: number, name: string) => void;
export type HandleModifyTeam = (
  id: number,
  name: string,
  branchId: number,
) => void;
export type HandleRemoveBranch = (id: number) => void;
export type HandleRemoveTeam = (branchId: number, teamId: number) => void;

export default useOrganization;
