import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { requestGetBranchInfo } from 'modules/actions/branch';
import { RootState } from 'modules/reducers';

function useBranch() {
  // const branchInfo = useSelector((state): RootState => state.branch.branchInfo);
  const dispatch = useDispatch();

  const getBranchInfo = useCallback(() => {
    dispatch(requestGetBranchInfo());
  }, [dispatch]);

  return {
    // branchInfo,
    getBranchInfo,
  };
}

export default useBranch;
