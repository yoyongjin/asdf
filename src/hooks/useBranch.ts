import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestGetBranchInfo,
  addTemperatureBranchInfo,
  requestAddBranchInfo,
  requestAddTeamInfo,
  changeInput,
} from 'modules/actions/branch';
import { RootState } from 'modules/reducers';

function useBranch() {
  const branchInfo = useSelector((state: RootState) => state.branch.branchInfo);
  const dispatch = useDispatch();

  const getBranchInfo = useCallback(() => {
    dispatch(requestGetBranchInfo());
  }, [dispatch]);

  const onClickAddTempBranch = useCallback(() => {
    // 지점 추가 시, 리덕스에 임시값을 넣는 로직
    dispatch(addTemperatureBranchInfo());
  }, [dispatch]);

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

  const handleAddTeam = useCallback((name: string, id) => {
    // 팀 추가
    const payload = {
      name,
      id,
    };
    dispatch(requestAddTeamInfo(payload));
  }, [dispatch]);

  // const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: number) => {
  //   const payload = {
  //     id,
  //     value: e.target.value
  //   }
  //   dispatch(changeInput(payload));
  // }, [])

  return {
    branchInfo,
    getBranchInfo,
    onClickAddTempBranch,
    handleAddBranch,
    handleAddTeam,
    // onChange,
  };
}

export default useBranch;
