import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestGetUserInfo, requestAddUser, requestUpdateUser } from 'modules/actions/user';
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

  const onClickInsertUser = useCallback(
    (
      branchId: string,
      teamId: string,
      admin: string,
      name: string,
      userId: string,
      password: string,
      tel: string,
      ip: string,
    ) => {
      const payload = {
        branch_id: branchId,
        team_id: teamId,
        admin_id: admin,
        name,
        user_name: userId,
        password,
        number: tel,
        ziboxip: ip,
      };
      dispatch(requestAddUser(payload));
    },
    [dispatch],
  );

  const onClickUpdateUser = useCallback(
    (
      id: string,
      branchId: string,
      teamId: string,
      admin: string,
      name: string,
      userId: string,
      password: string,
      tel: string,
      ip: string,
    ) => {
      const payload = {
        user_id: id,
        branch_id: branchId,
        team_id: teamId,
        admin_id: admin,
        name,
        user_name: userId,
        password,
        number: tel,
        ziboxip: ip,
      };
      dispatch(requestUpdateUser(payload));
    },
    [],
  );

  return {
    consultantInfo,
    getConsultantsInfo,
    onClickInsertUser,
    onClickUpdateUser
  };
}

export default useUser;
