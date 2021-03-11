import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import Communicator from 'lib/communicator';
import OCX from 'lib/ocx';
import Socket from 'lib/socket';
import { setServerTime, setSocketStatus } from 'modules/actions/auth';
import {
  addUser,
  deleteUser,
  insertUser,
  resetStatus,
  setUserStatus,
  updateUser,
  modifyUser,
} from 'modules/actions/user';
import {
  ConsultantStatusByNumber,
  ConsultantStatus,
  ChangeUser,
  UserInfo,
} from 'types/user';
import Logger from 'utils/log';

function useCommunicator() {
  const dispatch = useDispatch();

  const registerEventHandler = useCallback(
    (branchId: number, adminId: number) => {
      const socket = Communicator.getInstance().getSocketInstance();
      socket.onConnectEventHandler((connection: number, timestamp: number) => {
        dispatch(setSocketStatus(connection));
        dispatch(setServerTime(timestamp));
      });

      socket.onChangeStatusEventHandler((type: string, data: any) => {
        Logger.log('onChangeStatusEventHandler', { type, data });
        let parseData: ConsultantStatusByNumber = {};
        let payload: ChangeUser;
        let userInfo: UserInfo;

        switch (type) {
          case 'all':
            // 전체 유저의 상태 전달
            for (const key in data) {
              const value: ConsultantStatus = JSON.parse(data[key]);
              value.time = Number(value.time);
              parseData = {
                ...parseData,
                [key]: value,
              };
            }

            dispatch(setUserStatus(parseData));
            break;
          case 'call':
          case 'monitoring':
            // 콜 변경 시 상태 전달
            const value: ConsultantStatus = JSON.parse(data);
            value.time = Number(value.time);

            parseData = {
              [value.number]: value,
            };

            dispatch(setUserStatus(parseData));
            break;
          case 'signup':
            // 회원 추가 시 회원 정보 전달
            userInfo = JSON.parse(data);
            payload = {
              branch_id: adminId === 2 ? userInfo.branch_id : branchId,
              userInfo,
            };
            dispatch(addUser(payload));
            break;
          case 'update':
            userInfo = JSON.parse(data);
            payload = {
              branch_id: adminId === 2 ? userInfo.branch_id : branchId,
              userInfo,
            };
            dispatch(modifyUser(payload));
            break;
          case 'delete':
            dispatch(deleteUser(data));
            break;
          case 'reset':
            dispatch(resetStatus(data));
            break;
          default:
            break;
        }
      });

      window.addEventListener('beforeunload', (e) => {
        if (socket instanceof OCX) {
          Communicator.getInstance().disconnectAll();
        }
      });
    },
    [],
  );

  return {
    registerEventHandler,
  };
}

export default useCommunicator;
