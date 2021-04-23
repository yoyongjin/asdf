import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import Communicator from 'lib/communicator';
import MQTT from 'lib/mqtt';
import OCX from 'lib/ocx';
import { setServerTime, setSocketStatus } from 'modules/actions/auth';
import {
  addUser,
  deleteUser,
  resetStatus,
  setUserStatus,
  modifyUser,
  changeCallStatus,
  changeZiboxStatus,
} from 'modules/actions/user';
import {
  ConsultantAllStatusByNumber,
  ConsultantAllStatus,
  ChangeUser,
  UserInfo,
  CallStatus,
  ZiboxStatus,
} from 'types/user';
import Logger from 'utils/log';
import { ZIBOX_EVENT_TYPE, RESPONSE_STATUS_V2 } from 'utils/constants';
import { RootState } from 'modules/reducers';

function useCommunicator() {
  const tappingTargetId = useSelector(
    (state: RootState) => state.auth.tappingTarget.id,
  ); // 로그인 정보
  const tappingTargetNumber = useSelector(
    (state: RootState) => state.auth.tappingTarget.number,
  ); // 로그인 정보
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
        let parseData: ConsultantAllStatusByNumber = {};
        let payload: ChangeUser;
        let userInfo: UserInfo;

        switch (type) {
          case 'all':
            // 전체 유저의 상태 전달
            for (const key in data) {
              const allStatus: ConsultantAllStatus = JSON.parse(data[key]);
              parseData = {
                ...parseData,
                [key]: allStatus,
              };
            }

            dispatch(setUserStatus(parseData));
            break;
          case 'call':
            // 콜 변경 시 상태 전달
            const callStatus = JSON.parse(data) as CallStatus;

            dispatch(changeCallStatus(callStatus));
            break;
          case 'monitoring':
            // 감청 변경 시 상태 전달
            const monitStatus = JSON.parse(data) as ZiboxStatus;

            dispatch(changeZiboxStatus(monitStatus));
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

      const zibox = Communicator.getInstance().getZiboxInstance();

      if (zibox instanceof MQTT) {
        zibox.onChangeAllStatusEventHandler((type: string, data: any) => {
          Logger.log('onChangeAllStatusEventHandler', { type, data });

          switch (type) {
            case ZIBOX_EVENT_TYPE.CONNECTION_INFO:
              if (data.data === 'con') {
                // dispatch(changeMonitStatus(2));
              } else if (data.data === 'discon') {
                // dispatch(changeMonitStatus(0));
              }
              break;
            case ZIBOX_EVENT_TYPE.VOLUME_INFO:
              if (data.mic && data.spk) {
                // const param = {
                //   id: user_id,
                //   ziboxmic: Number(data.mic),
                //   ziboxspk: Number(data.spk),
                // };
                // dispatch(requestZiboxVolume(param));
              }
              break;
            case ZIBOX_EVENT_TYPE.MONITORING_INFO:
              if (data.data === 'start') {
                alert(tappingTargetNumber)
                socket.onEmit('monitoring', {
                  monitoring_state: RESPONSE_STATUS_V2.YES,
                  number: tappingTargetNumber,
                  user_id: tappingTargetId,
                });
              } else if (data.data === 'stop') {
                // Socket.getInstance().onEmit('monitoring', {
                //   monitoring_state: 'n',
                //   number: phone_number,
                //   user_id: -1,
                // });
              } else if (data.data === 'on') {
                zibox.startTapping();
              }
              break;
            default:
              break;
          }
        });
      }

      window.addEventListener('beforeunload', (e) => {
        if (socket instanceof OCX) {
          Communicator.getInstance().disconnectAll();
        }
      });
    },
    [dispatch, tappingTargetId, tappingTargetNumber],
  );

  return {
    registerEventHandler,
  };
}

export default useCommunicator;
