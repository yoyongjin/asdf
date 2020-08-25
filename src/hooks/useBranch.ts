import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestGetBranchInfo,
  addTemperatureBranchInfo,
  requestAddBranchInfo,
  requestAddTeamInfo,
  requestUpdateTeamInfo,
  requestUpdateBranchInfo,
  requestGetBranchList,
  requestGetTeamList,
  initBranchList,
  initTeamList,
  requestDeleteTeamInfo,
  requestDeleteBranchInfo,
} from 'modules/actions/branch';
import { RootState } from 'modules/reducers';

function useBranch() {
  const branchInfo = useSelector((state: RootState) => state.branch.branchInfo);
  const branchList = useSelector(
    (state: RootState) => state.branch.namesList.branch,
  );
  const teamList = useSelector(
    (state: RootState) => state.branch.namesList.team,
  );
  const userBranchList = useSelector(
    (state: RootState) => state.branch.namesList.userBranch,
  );
  const userTeamList = useSelector(
    (state: RootState) => state.branch.namesList.userTeam,
  );
  const dispatch = useDispatch();

  const getBranchInfo = useCallback(() => {
    dispatch(requestGetBranchInfo());
  }, [dispatch]);

  const getBranchList = useCallback(() => {
    const payload = {
      type: true,
    };
    dispatch(requestGetBranchList(payload));
  }, [dispatch]);

  const getTeamList = useCallback(
    (branchId: number) => {
      const payload = {
        branch_id: branchId,
        type: true,
      };
      dispatch(requestGetTeamList(payload));
    },
    [dispatch],
  );

  const getUserBranchList = useCallback(() => {
    const payload = {
      type: false,
    };
    dispatch(requestGetBranchList(payload));
  }, [dispatch]);

  const initUserBranchList = useCallback(
    (id, name) => {
      const payload = {
        id,
        branch_name: name,
        created_at: '',
      };
      dispatch(initBranchList(payload));
    },
    [dispatch],
  );

  const initUserTeamList = useCallback(() => {
    dispatch(initTeamList());
  }, [dispatch]);

  const getUserTeamList = useCallback(
    (branchId: number) => {
      const payload = {
        branch_id: branchId,
        type: false,
      };
      dispatch(requestGetTeamList(payload));
    },
    [dispatch],
  );

  const onClickAddTempBranch = useCallback(() => {
    // 지점 추가 시, 리덕스에 임시값을 넣는 로직
    const branchKeys = Object.getOwnPropertyNames(branchInfo);
    const findKey = branchKeys.find((key) => key === 'temp');
    if (findKey) {
      return;
    }
    dispatch(addTemperatureBranchInfo());
  }, [dispatch, branchInfo]);

  const handleAddBranch = useCallback(
    (name: string) => {
      // 지점 추가
      const payload = {
        name,
      };
      dispatch(requestAddBranchInfo(payload));
    },
    [dispatch],
  );

  const handleUpdateBranch = useCallback(
    (id: number, name: string) => {
      // 지점 수정
      const payload = {
        id,
        name,
      };
      dispatch(requestUpdateBranchInfo(payload));
    },
    [dispatch],
  );

  const handleAddTeam = useCallback(
    (name: string, branchId: number, teamId: number) => {
      // 팀 추가
      const payload = {
        name,
        branch_id: branchId,
        team_id: teamId,
      };
      dispatch(requestAddTeamInfo(payload));
    },
    [dispatch],
  );

  const handleUpdateTeam = useCallback(
    (id: number, name: string, branchId: number) => {
      const payload = {
        id,
        name,
        branch_id: branchId,
      };
      dispatch(requestUpdateTeamInfo(payload));
    },
    [dispatch],
  );

  const handleDeleteTeam = useCallback((branchId:number, teamId: number) => {
    const payload = {
        branch_id: branchId,
        team_id: teamId,
      };
      dispatch(requestDeleteTeamInfo(payload));
  }, [dispatch])

  const handleDeleteBranch = useCallback((id) => {
    const payload = {
      branch_id: id,
    }

    dispatch(requestDeleteBranchInfo(payload))
  }, [dispatch])

  return {
    branchInfo,
    branchList,
    teamList,
    userBranchList,
    userTeamList,
    getBranchInfo,
    getBranchList,
    getTeamList,
    getUserBranchList,
    getUserTeamList,
    onClickAddTempBranch,
    handleAddBranch,
    handleAddTeam,
    handleUpdateTeam,
    handleUpdateBranch,
    initUserBranchList,
    initUserTeamList,
    handleDeleteTeam,
    handleDeleteBranch,
  };
}

export default useBranch;
