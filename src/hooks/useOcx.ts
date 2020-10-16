import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInitSocket } from 'modules/actions/auth';
import {
  changeStatus,
  saveStatus,
  insertUser,
  updateUser,
  deleteUser,
  changeMonitStatus,
} from 'modules/actions/user';
import MonitorOcx from 'lib/monitorOcx';
import Logger from 'utils/log';
import { RootState } from 'modules/reducers';

function useOcx() {
  const dispatch = useDispatch();

  const monit = useSelector((state: RootState) => state.user.monit.tapping);
  const monitPcIp = useSelector((state: RootState) => state.user.monit.pc_ip);

  const connectServerOcx = useCallback(() => {
    MonitorOcx.getInstance().onMessageConnect((response: number) => {
      dispatch(setInitSocket(response));
    });
  }, [dispatch]);

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

  const getMonitoringStateOcx = useCallback(() => {
    MonitorOcx.getInstance().onMessageMonitorStatus(
      (response: { status: number; number: string; user_id: number }) => {
        // api 호출을 하기 위해 작성
        dispatch(changeMonitStatus(response));
      },
    );
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

  const beforeUnload = useCallback(() => {
    window.onbeforeunload = function() {

      MonitorOcx.getInstance().disconnect();
  
  }
  
  
  
  }, [])

  return {
    monit,
    monitPcIp,
    connectServerOcx,
    getAllStateOcx,
    getMonitoringStateOcx,
    startMonitoringOcx,
    stopMonitoringOcx,
    beforeUnload,
  };
}

export default useOcx;
