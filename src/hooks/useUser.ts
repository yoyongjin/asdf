import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestGetUsers,
  requestAddUser,
  requestModifyUser,
  requestRemoveUser,
  requestResetPassword,
  disconnectForce,
  changeUsersCount,
} from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import constants from 'utils/constants';

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
    ) => {
      const payload = {
        branch_id: branchId,
        team_id: teamId,
        limit: limit || constants.LIMIT,
        page: page || constants.PAGE,
        search,
        url: url!,
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
      availableTime?: string,
      inMessage?: string,
      outMessage?: string,
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
        available_time: availableTime,
        in_message: inMessage,
        out_message: outMessage,
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

  const onChangeUserCount = useCallback(
    (count: number) => {
      dispatch(changeUsersCount(count));
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
    onChangeUserCount,
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
  availableTime?: string,
  inMessage?: string,
  outMessage?: string,
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

export type OnClickDisconnect = (number: string) => void;

export default useUser;
