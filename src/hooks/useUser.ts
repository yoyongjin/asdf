import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestGetUsers,
  requestAddUser,
  requestModifyUser,
  requestRemoveUser,
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
        branch_id: branchId,
        team_id: teamId,
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
      const payload = {
        branch_id: branchId,
        team_id: teamId,
        admin_id: adminId,
        name,
        user_name: userName,
        number: number?.replace(/-/g, ''),
        ziboxip: ip,
        ziboxmac: mac,
        ziboxmic: mic,
        ziboxspk: spk,
      };

      dispatch(requestAddUser(payload));
    },
    [dispatch],
  );

  const onClickModifyUser = useCallback(
    (
      id: number,
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
      const payload = {
        id,
        branch_id: branchId,
        team_id: teamId,
        admin_id: adminId,
        name,
        user_name: userName,
        number: number?.replace(/-/g, ''),
        ziboxip: ip,
        ziboxmac: mac,
        ziboxmic: mic,
        ziboxspk: spk,
      };

      dispatch(requestModifyUser(payload));
    },
    [dispatch],
  );

  const onClickRemoveUser = useCallback(
    (
      id: number,
      branchId: number,
      teamId: number,
      limit: number,
      page: number,
      search: string,
    ) => {
      const payload = {
        id,
        branch_id: branchId,
        team_id: teamId,
        limit,
        page,
        search,
      };

      dispatch(requestRemoveUser(payload));
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
    getUsers,
    onClickAddUser,
    onClickModifyUser,
    onClickRemoveUser,
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

export type OnClickModifyUser = (
  id: number,
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

export type OnClickRemoveUser = (
  id: number,
  branchId: number,
  teamId: number,
  limit: number,
  page: number,
  search: string,
) => void;

export type OnClickResetPassword = (id: number) => void;

export default useUser;
