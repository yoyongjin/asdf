import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Communicator from 'lib/communicator';
import MQTT from 'lib/mqtt';
import OCX from 'lib/ocx';
import Player from 'lib/player';
import {
  setServerTime,
  setSocketStatus,
  setTappingData,
} from 'modules/actions/auth';
import {
  addUser,
  setUserStatus,
  modifyUser,
  changeCallStatus,
  changeZiboxStatus,
  changeConsultantStatus,
  changeAllResetStatus,
  changePhoneStatus,
} from 'modules/actions/user';
import { ResponseType } from 'types/common';
import {
  ConsultantAllStatusByNumber,
  ConsultantAllStatus,
  ChangeUser,
  CallStatus,
  ZiboxStatus,
  ConsultantStatus,
  PhoneStatus,
  UserData,
} from 'types/user';
import {
  ZIBOX_MONIT_STATUS,
  SOCKET_EVENT_TYPE,
  USER_TYPE,
  RESPONSE_STATUS_V2,
} from 'utils/constants';
import Logger from 'utils/log';

function useCommunicator() {
  const dispatch = useDispatch();

  const setServerData = useCallback(
    (connectionStatus: number, timestamp: number) => {
      dispatch(setSocketStatus(connectionStatus));
      dispatch(setServerTime(timestamp));
    },
    [dispatch],
  );

  const setChangedStatus = useCallback(
    (
      branchId: number,
      teamId: number,
      adminId: number,
      type: string,
      data: any,
    ) => {
      Logger.log('onChangeStatusEventHandler', { type, data });
      let parseData: ConsultantAllStatusByNumber = {};
      let payload: ChangeUser;
      let userInfo: UserData;

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
        case 'zibox':
        case 'monitoring':
          // 지박스 상태 전달
          const ziboxStatus = JSON.parse(data) as ZiboxStatus;

          dispatch(changeZiboxStatus(ziboxStatus));
          break;
        case 'consultant':
          // 상담원 상태 전달
          const consultantStatus = JSON.parse(data) as ConsultantStatus;

          dispatch(changeConsultantStatus(consultantStatus));
          break;
        case 'phone':
          // 상담원 상태 전달
          const phoneStatus = JSON.parse(data) as PhoneStatus;

          dispatch(changePhoneStatus(phoneStatus));
          break;
        case 'reset':
          const allStatus = JSON.parse(data) as ConsultantAllStatus;
          dispatch(changeAllResetStatus(allStatus));
          break;
        case 'signup':
          // 회원 추가 시 회원 정보 전달
          userInfo = JSON.parse(data);

          if (
            adminId === USER_TYPE.BRANCH_ADMIN &&
            branchId !== userInfo.branch_id
          ) {
            // 같은 지점의 사용자가 아닌 경우
            break;
          }

          if (
            adminId === USER_TYPE.TEAM_ADMIN &&
            (branchId !== userInfo.branch_id || teamId !== userInfo.team_id)
          ) {
            // 같은 지점의 같은 팀의 사용자가 아닌 경우
            break;
          }

          payload = {
            userInfo,
          };
          dispatch(addUser(payload));
          break;
        case 'update':
          userInfo = JSON.parse(data);

          if (
            adminId === USER_TYPE.BRANCH_ADMIN &&
            branchId !== userInfo.branch_id
          ) {
            // 같은 지점의 사용자가 아닌 경우
            break;
          }

          if (
            adminId === USER_TYPE.TEAM_ADMIN &&
            (branchId !== userInfo.branch_id || teamId !== userInfo.team_id)
          ) {
            // 같은 지점의 같은 팀의 사용자가 아닌 경우
            break;
          }

          payload = {
            userInfo,
          };
          dispatch(modifyUser(payload));
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  const ziboxEvnetHandler = useCallback(() => {
    const zibox = Communicator.getInstance().getZiboxInstance();

    if (zibox instanceof MQTT) {
      window.addEventListener('beforeunload', function (event) {
        const targetData = zibox.getTargetData();
        if (targetData.id > -1) {
          zibox.disconnect();
        }
      });

      zibox.onChangeProtocolEventHandler((data: string) => {
        switch (data) {
          case 'close': {
            const targetData = zibox.getTargetData();
            const data = {
              monitoring_state: ZIBOX_MONIT_STATUS.DISABLE,
              number: targetData.key,
              user_id: -1,
              zibox_ip: targetData.ip,
            };
            Communicator.getInstance().emitMessage(
              SOCKET_EVENT_TYPE.MONITORING,
              data,
            );

            zibox.setInitTargetData();
            break;
          }
          default:
            break;
        }
      });

      zibox.onChangeAllStatusEventHandler(async (response: ResponseType) => {
        const { status, data, type } = response;

        if (status === 'y') {
          switch (type) {
            case 'connection_info':
              if (data.data === 'connection') {
                zibox.initialize();
              }

              break;
            case 'vol_info':
              if (data.mic && data.spk) {
                // const id = zibox.getTargetId();
                // const param = {
                //   id,
                //   ziboxmic: Number(data.mic),
                //   ziboxspk: Number(data.spk),
                // };
                // dispatch(requestZiboxVolume(param));
              }
              break;
            case 'mon_info':
              if (data.data === 'start') {
                const targetData = zibox.getTargetData();
                const data = {
                  monitoring_state: ZIBOX_MONIT_STATUS.ENABLE,
                  number: targetData.key,
                  user_id: targetData.id,
                  zibox_ip: targetData.ip,
                };
                Communicator.getInstance().emitMessage(
                  SOCKET_EVENT_TYPE.MONITORING,
                  data,
                );
              } else if (data.data === 'stop') {
              } else if (data.data === 'on') {
                zibox.startTapping();
              }
              break;
            case 'rec_info':
              if (data.data === 'stop') {
                zibox.disconnect();
              }
              break;
            default:
              break;
          }
        } else {
          if (type === 'connection_info') {
            if (data.data === 'connection' && data.error === 'ret2') {
              zibox.disconnect();
            }
          } else {
            console.log(
              `해당 type[${type}]에서 ${data.data} / ${data.error} 문제가 발생하여 지박스 연결을 끊습니다.`,
            );
            zibox.disconnect();
          }
        }
      });
    }
  }, []);

  const registerEventHandler = useCallback(() => {
    const socket = Communicator.getInstance().getSocketInstance();
    const zibox = Communicator.getInstance().getZiboxInstance();

    if (zibox instanceof Player) {
      socket.onMonitorEventHandler((packet: any) => {
        Communicator.getInstance().play(packet);
      });

      zibox.onChangeAllEventHandler((event: string, data: any) => {
        Logger.log('onChangeAllEventHandler', { event, data });

        switch (event) {
          case 'connect':
            break;
          case 'initialize':
            break;
          case 'dataRelay':
            if (data.type === 'disconnect') {
              // 감청 중 상대가 연결이 끊겼을 경우(새로고침)
              const _data = {
                monitoring_state: ZIBOX_MONIT_STATUS.DISABLE,
                number: data.number,
                user_id: -1,
              };
              Communicator.getInstance().emitMessage(
                SOCKET_EVENT_TYPE.MONITORING,
                _data,
              );
              const payload = {
                status: 0,
                ip: '',
                number: '',
                id: -1,
              };
              dispatch(setTappingData(payload));

              return;
            }

            if (data.status === RESPONSE_STATUS_V2.NO) {
              const payload = {
                status: 0,
              };
              dispatch(setTappingData(payload));
            } else if (data.status === RESPONSE_STATUS_V2.YES) {
              if (data.data.data === 'start') {
                const payload = {
                  status: 2,
                };
                dispatch(setTappingData(payload));
              } else if (data.data.data === 'stop') {
                const payload = {
                  status: 0,
                  ip: '',
                  number: '',
                  id: -1,
                };
                dispatch(setTappingData(payload));
              }
            }
        }
      });
    }

    window.addEventListener('beforeunload', (e) => {
      if (socket instanceof OCX) {
        Communicator.getInstance().disconnectAll();
      }
    });
  }, [dispatch]);

  return {
    registerEventHandler,
    setChangedStatus,
    setServerData,
    ziboxEvnetHandler,
  };
}

export default useCommunicator;
