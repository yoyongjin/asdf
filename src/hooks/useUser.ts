import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestGetUsers,
  requestAddUser,
  requestUpdateUser,
  requestDeleteUser,
  requestResetPassword,
  resetFilteredUser,
  resetFilteredConsultant,
  disconnectForce,
} from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { LIMIT, PAGE } from 'utils/constants';

function useUser() {
  const userInfo = useSelector((state: RootState) => state.user.user); // 전체 유저 정보
  const consultantInfo = useSelector(
    (state: RootState) => state.user.consultant,
  ); // 상담원 정보
  const filterUserInfo = useSelector(
    (state: RootState) => state.user.filterUserList.users,
  ); // 필터링된 전체 유저 정보
  const filterConsultantInfo = useSelector(
    (state: RootState) => state.user.filterUserList.consultants,
  ); // 필터링된 상담원 정보

  const dispatch = useDispatch();

  const getUsers = useCallback(
    (
      branchId = -1,
      teamId = -1,
      limit = 0,
      page = 0,
      search = '',
      url?: string,
      adminId?: number,
      loginId?: number,
    ) => {
      const payload = {
        branchId,
        teamId,
        limit: limit || LIMIT,
        page: page || PAGE,
        search,
        url: url!,
        adminId,
        loginId,
      };
      dispatch(requestGetUsers(payload));
    },
    [dispatch],
  );

  const resetFilteredList = useCallback(
    (type: number) => {
      if (type === 1) {
        dispatch(resetFilteredUser());
      } else if (type === 2) {
        dispatch(resetFilteredConsultant());
      }
    },
    [dispatch],
  );

  const onClickAddUser = useCallback(
    (
      branchId: number,
      teamId: number,
      adminId: number,
      name: string,
      userName?: string,
      number?: string,
      ip?: string,
      mac?: string,
      mic?: number,
      spk?: number,
    ) => {
      // let number = tel.replace(/-/g, '');
      const payload = {
        branch_id: branchId,
        team_id: teamId,
        admin_id: adminId,
        name,
        user_name: userName,
        number,
        zibox_ip: ip,
        zibox_mac: mac,
        zibox_mic: mic,
        zibox_spk: spk,
      };

      console.log(payload);

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
      mic: number,
      spk: number,
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
        ziboxmic: mic,
        ziboxspk: spk,
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

  const onClickDisconnect = useCallback(
    (number: string) => {
      const payload = {
        number,
      };
      dispatch(disconnectForce(payload));
    },
    [dispatch],
  );

  return {
    userInfo,
    consultantInfo,
    filterUserInfo,
    filterConsultantInfo,
    getUsers,
    resetFilteredList,
    onClickAddUser,
    onClickUpdateUser,
    onClickDeleteUser,
    onClickResetPassword,
    onClickDisconnect,
  };
}

export type OnClickAddUser = (
  branchId: number,
  teamId: number,
  adminId: number,
  name: string,
  userName?: string,
  number?: string,
  ip?: string,
  mac?: string,
  mic?: number,
  spk?: number,
) => void;

export default useUser;
