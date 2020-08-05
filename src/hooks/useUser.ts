import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestGetUserInfo } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { LIMIT, PAGE } from 'utils/constants';

function useUser() {
  const consultantInfo = useSelector(
    (state: RootState) => state.user.consultantInfo,
  );
  const dispatch = useDispatch();

  // 상담원 정보
  const getConsultantsInfo = useCallback(
    (location, branchId = -1, teamId = -1, limit = 0, page = 0) => {
      const payload = {
        location,
        branchId,
        teamId,
        limit: limit || LIMIT,
        page: page || PAGE,
      };
      dispatch(requestGetUserInfo(payload));
    },
    [dispatch],
  );

  return {
    consultantInfo,
    getConsultantsInfo,
  };
}

export default useUser;
