import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestGetUserInfo,
  requestAddUser,
  requestUpdateUser,
  requestDeleteUser,
  requestResetPassword,
  resetFilteredUser,
} from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { LIMIT, PAGE } from 'utils/constants';

function useUser() {
  const userInfo = useSelector((state: RootState) => state.user.userList.users); // 전체 유저 정보
  const consultantInfo = useSelector(
    (state: RootState) => state.user.userList.consultants,
  ); // 상담원 정보
  const filterUserInfo = useSelector(
    (state: RootState) => state.user.filterUserList.users,
  ); // 필터링된 전체 유저 정보
  const filterConsultantInfo = useSelector(
    (state: RootState) => state.user.filterUserList.consultants,
  ); // 필터링된 상담원 정보

  const dispatch = useDispatch();

  const getUsersInfo = useCallback(
    (
      branchId = -1,
      teamId = -1,
      limit = 0,
      page = 0,
      search = '',
      url?: string,
      adminId?: number,
    ) => {
      const payload = {
        branchId,
        teamId,
        limit: limit || LIMIT,
        page: page || PAGE,
        search,
        url: url!,
        adminId,
      };
      dispatch(requestGetUserInfo(payload));
    },
    [dispatch],
  );

  const resetFilteredUsers = useCallback(() => {
    dispatch(resetFilteredUser());
  }, [dispatch]);

  const onClickInsertUser = useCallback(
    (
      branchId: number,
      teamId: number,
      admin: number,
      name: string,
      userId: string,
      password: string,
      tel: string,
      ip: string,
    ) => {
      let number = tel.replace(/-/g, '');
      const payload = {
        branch_id: String(branchId),
        team_id: String(teamId),
        admin_id: String(admin),
        name,
        user_name: userId,
        password,
        number: number,
        ziboxip: ip,
      };

      dispatch(requestAddUser(payload));
    },
    [dispatch],
  );

  const onClickUpdateUser = useCallback(
    (
      id: number,
      branchId: number,
      teamId: number,
      admin: number,
      name: string,
      userId: string,
      password: string,
      tel: string,
      ip: string,
    ) => {
      let number = tel.replace(/-/g, '');
      const payload = {
        user_id: String(id),
        branch_id: String(branchId),
        team_id: String(teamId),
        admin_id: String(admin),
        name,
        user_name: userId,
        password,
        number,
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
    (id: number, page: number, branchId = -1, teamId = -1, adminId: number) => {
      const payload = {
        id,
        page,
        branchId,
        teamId,
        adminId,
      };
      dispatch(requestDeleteUser(payload));
    },
    [dispatch],
  );

  return {
    userInfo,
    consultantInfo,
    filterUserInfo,
    filterConsultantInfo,
    getUsersInfo,
    resetFilteredUsers,
    onClickInsertUser,
    onClickUpdateUser,
    onClickDeleteUser,
    onClickResetPassword,
  };
}

export default useUser;
