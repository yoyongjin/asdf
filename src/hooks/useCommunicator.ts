import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Communicator from 'lib/communicator';
import MQTT from 'lib/mqtt';
import Player from 'lib/player';
import Socket from 'lib/socket';
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
  requestZiboxVolume,
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
import constants, {
  ZIBOX_MONIT_STATUS,
  SOCKET_EVENT_TYPE,
  USER_TYPE,
  RESPONSE_STATUS_V2,
  API_FETCH,
  ROUTER_TYPE,
} from 'utils/constants';
import Logger from 'utils/log';
import SocketOCX from 'lib/socketOCX';
import MonitorOcx from 'lib/monitorOCX';
import _ from 'lodash';
import { setExcelDownloadStatus } from 'modules/actions/statistics';
import Toast from 'utils/toast';
import ZMSMain from 'lib/api/zms/main';
import { useHistory } from 'react-router-dom';
import { setKSVCProcessStatus } from 'modules/actions/batch';

function useCommunicator() {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const setServerData = useCallback(
    (connectionStatus: number, timestamp: number) => {
      dispatch(setSocketStatus(connectionStatus));
      dispatch(setServerTime(timestamp));
    },
    [dispatch],
  );

  const setChangedStatus = useCallback(
    (
      loginId: number,
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
            // 같은 센터의 사용자가 아닌 경우
            break;
          }

          if (
            adminId === USER_TYPE.TEAM_ADMIN &&
            (branchId !== userInfo.branch_id || teamId !== userInfo.team_id)
          ) {
            // 같은 센터의 같은 팀의 사용자가 아닌 경우
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
            // 같은 센터의 사용자가 아닌 경우
            break;
          }

          if (
            adminId === USER_TYPE.TEAM_ADMIN &&
            (branchId !== userInfo.branch_id || teamId !== userInfo.team_id)
          ) {
            // 같은 센터의 같은 팀의 사용자가 아닌 경우
            break;
          }

          payload = {
            userInfo,
          };
          dispatch(modifyUser(payload));
          break;
        case 'excel':
          const { status, fileName } = data.result;

          if (data.user_id !== loginId) {
            // 방어 코드
            break;
          }

          if (status === API_FETCH.SUCCESS) {
            const url = constants.API_SERVER + '/' + fileName;

            const windowPopup = window.open(url); // 팝업 허용 해줘야 함
            // windowPopup?.close(); // 사설 인증서라서 잠시 제거

            dispatch(setExcelDownloadStatus(false));
            // 아래는 beforeunload 이벤트 호출 시 소켓이 끊어짐 (아래 beforeunload 이벤트 호출됨)
            // window.location.replace(url);
            // window.location.href = url;
            // window.location.assign(url);
          } else {
            dispatch(setExcelDownloadStatus(false));
          }

          break;
        case 'login': {
          // 로그인 시 이미 로그인된 유저 강제 로그아웃
          if (data.user_id === loginId) {
            Toast.notification('다른 곳에서 로그인되어 로그아웃 처리됩니다.');

            setTimeout(() => {
              ZMSMain.removeAccessToken();

              push(ROUTER_TYPE.LOGIN);

              window.location.reload();
            }, 2000);
          }
          break;
        }
        case 'ksvc': {
          dispatch(setKSVCProcessStatus(false));

          Toast.success('KSVC 처리 완료😊');
          break;
        }
        default:
          break;
      }
    },
    [dispatch, push],
  );

  const beforeUnloadEvent = useCallback(() => {
    const zibox = Communicator.getInstance().getZiboxInstance();

    window.addEventListener('beforeunload', function (event) {
      console.log('--catch beforeunload--');
      if (zibox instanceof MQTT) {
        const targetData = zibox.getTargetData();
        if (targetData.id > -1) {
          Communicator.getInstance().disconnectAll();
        }
      } else {
        Communicator.getInstance().disconnectAll();
      }
    });
  }, []);

  const ziboxEvnetHandler = useCallback(() => {
    const zibox = Communicator.getInstance().getZiboxInstance();

    if (zibox instanceof MonitorOcx) {
      zibox.onChangeMonitorEventHandler((status: number, message: string) => {
        const targetData = zibox.getTargetData();

        let data = {};

        switch (status) {
          case 0:
            // 감청 종료
            data = {
              monitoring_state: ZIBOX_MONIT_STATUS.DISABLE,
              number: targetData.key,
              user_id: -1,
              zibox_ip: targetData.ip,
            };

            zibox.setInitialTargetData();
            break;
          case 1:
            // 감청 시작
            data = {
              monitoring_state: ZIBOX_MONIT_STATUS.ENABLE,
              number: targetData.key,
              user_id: targetData.id,
              zibox_ip: targetData.ip,
            };
            break;
          case 2:
            // 버퍼링 시작
            break;
          case 3:
            // 버퍼링 종료
            break;
          case 4:
            // 타임아웃
            alert(`${status}, ${message}`);
            break;
          default:
            break;
        }

        if (!_.isEmpty(data)) {
          Communicator.getInstance().emitMessage(
            SOCKET_EVENT_TYPE.MONITORING,
            data,
          );
        }
      });
    }

    if (zibox instanceof MQTT) {
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

            zibox.setInitialTargetData();
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
                zibox.setInitialZiBox();
              }

              break;
            case 'vol_info':
              if (data.mic && data.spk) {
                const targetData = zibox.getTargetData();

                if (
                  targetData.mic !== Number(data.mic) ||
                  targetData.spk !== Number(data.spk)
                ) {
                  const payload = {
                    number: targetData.key,
                    ziboxmic: Number(data.mic),
                    ziboxspk: Number(data.spk),
                  };
                  dispatch(requestZiboxVolume(payload));
                }
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

    if (zibox instanceof Player && socket instanceof Socket) {
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
  }, [dispatch]);

  return {
    beforeUnloadEvent,
    setChangedStatus,
    setServerData,
    ziboxEvnetHandler,
  };
}

export default useCommunicator;
