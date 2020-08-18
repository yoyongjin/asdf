import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestGetUserInfo,
  requestAddUser,
  requestUpdateUser,
  requestDeleteUser,
  requestResetPassword,
} from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { LIMIT, PAGE } from 'utils/constants';

function useUser() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const consultantInfo = useSelector(
    (state: RootState) => state.user.consultantInfo,
  );

  const dispatch = useDispatch();

  // 상담원 정보
  const getConsultantsInfo = useCallback(
    (
      branchId = -1,
      teamId = -1,
      limit = 0,
      page = 0,
      search = '',
      location?,
    ) => {
      const payload = {
        location: location!,
        branchId,
        teamId,
        search,
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
    [dispatch],
  );

  const onClickResetPassword = useCallback(
    (id: number) => {
      const payload = {
        id,
      };
      dispatch(requestResetPassword(payload));
    },
    [dispatch],
  );

  const onClickDeleteUser = useCallback(
    (id: string, page: number, branchId = -1, teamId = -1) => {
      const payload = {
        id,
        page,
        branchId,
        teamId,
      };
      dispatch(requestDeleteUser(payload));
    },
    [dispatch],
  );

  return {
    userInfo,
    consultantInfo,
    getConsultantsInfo,
    onClickInsertUser,
    onClickUpdateUser,
    onClickDeleteUser,
    onClickResetPassword,
  };
}

export default useUser;
