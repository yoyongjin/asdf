import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MonitorOcx from 'lib/monitorOcx';
import { apiServer, socketServer } from 'utils/constants';
import {
  changeStatus,
  saveStatus,
  insertUser,
  updateUser,
  deleteUser,
  changeMonitStatus,
  resetStatus,
} from 'modules/actions/user';
import { setInitSocket } from 'modules/actions/auth';
import { RootState } from 'modules/reducers';

function useOcx() {
  const dispatch = useDispatch();

  const monit = useSelector((state: RootState) => state.user.monit.tapping);

  const createOcx = useCallback(async () => {
    return await MonitorOcx.getInstance().url(socketServer!);
  }, []);

  const connectServerOcx = useCallback(() => {
    MonitorOcx.getInstance().onMessageConnect((response: number) => {
      dispatch(setInitSocket(response));
    });
  }, [dispatch]);

  const startMonitoringOcx = useCallback(
    (
      ip: string,
      number: string,
      userId: number,
      port?: number,
      mode?: number,
    ) => {
      MonitorOcx.getInstance().startMonitor(ip, number, userId, port, mode);
    },
    [],
  );

  const stopMonitoringOcx = useCallback(() => {
    MonitorOcx.getInstance().stopMonitor();
  }, []);

  const getAllStateOcx = useCallback(
    (branchId: number, adminId: number) => {
      // 모든 정보들이 이쪽으로 들어온다.
      MonitorOcx.getInstance().onMessageStatus(
        (response: string | { type: string; data: any; status: string }) => {
          if (typeof response === 'string') {
            console.error(response);
            return;
          }
          const { data, type, status } = response;

          if (status === 'Y') {
            const _response = JSON.parse(data);
            console.log(data);

            switch (type) {
              case 'initevent':
                dispatch(saveStatus(_response));
                console.log('Init Status', _response);
                break;
              case 'resetevent':
                dispatch(resetStatus(_response));
                console.log('Reset Status', _response);
                break;
              case 'signup':
                let payload1 = {
                  data: _response,
                  branch_id: adminId === 2 ? _response.branch_id : branchId,
                };
                console.log('Sign up user data', data);
                dispatch(insertUser(payload1));
                break;
              case 'update':
                let payload2 = {
                  data: _response,
                  branch_id: adminId === 2 ? _response.branch_id : branchId,
                };
                console.log('Update user data', data);
                dispatch(updateUser(payload2));
                break;
              case 'delete':
                console.log('Delete user data', data);
                dispatch(deleteUser(_response));
                break;
              default:
                dispatch(changeStatus({ data: _response, type }));
                console.log('Change Status', _response);
                break;
            }
          }
        },
      );
    },
    [dispatch],
  );

  const beforeUnload = useCallback(() => {
    console.log('Register Reload Event');
    window.addEventListener('beforeunload', (e) => {
      let number = MonitorOcx.getInstance().getNumber();

      stopMonitoringOcx();

      if (number) {
        const xhr = new XMLHttpRequest();
        const param = {
          number: number!,
          type: 'monitoring_status',
          status: 0,
        };

        xhr.onload = function () {
          if (xhr.status === 200 || xhr.status === 201) {
            console.log(xhr.responseText);
          } else {
            console.error(xhr.responseText);
          }
        };
        xhr.open('POST', `${apiServer}/api/state/zibox`, false);
        xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로
        xhr.send(JSON.stringify(param)); // 데이터를 stringify해서 보냄
      }

      MonitorOcx.getInstance().disconnect();
    });
  }, [stopMonitoringOcx]);

  const getMonitoringStateOcx = useCallback(() => {
    MonitorOcx.getInstance().onMessageMonitorStatus(
      (response: { status: number; number: string; user_id: number }) => {
        // api 호출을 하기 위해 작성
        dispatch(changeMonitStatus(response));
      },
    );
  }, [dispatch]);

  return {
    monit,
    createOcx,
    connectServerOcx,
    getAllStateOcx,
    getMonitoringStateOcx,
    startMonitoringOcx,
    stopMonitoringOcx,
    beforeUnload,
  };
}

export default useOcx;
